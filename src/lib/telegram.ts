import { createHmac, timingSafeEqual } from "node:crypto";
import { createRemoteJWKSet, type JWTPayload, jwtVerify } from "jose";
import { communityHref } from "./landing-content";
import type {
  TelegramAuthPayload,
  TelegramSettingsResponse,
} from "./telegram-types";

const TELEGRAM_OAUTH_JWKS_URL =
  "https://oauth.telegram.org/.well-known/jwks.json";
const TELEGRAM_BOT_API_BASE = "https://api.telegram.org/bot";
const telegramJwks = createRemoteJWKSet(new URL(TELEGRAM_OAUTH_JWKS_URL));

type TelegramUser = {
  id: number;
  firstName?: string;
  lastName?: string;
  username?: string;
};

type BotApiResponse = {
  ok: boolean;
  result?: {
    status?: string;
  };
  description?: string;
};

export class TelegramVerificationError extends Error {
  status: number;
  code: string;

  constructor(status: number, code: string, message: string) {
    super(message);
    this.name = "TelegramVerificationError";
    this.status = status;
    this.code = code;
  }
}

export function getTelegramPublicSettings(): TelegramSettingsResponse {
  return {
    channel_url: getTelegramChannelUrl(),
    subscription_required: isTelegramSubscriptionRequired(),
    client_id: getOptionalEnv("TELEGRAM_CLIENT_ID"),
  };
}

export function isTelegramSubscriptionRequired() {
  const value = process.env.TELEGRAM_SUBSCRIPTION_REQUIRED;

  return value?.trim().toLowerCase() !== "false";
}

export function readTelegramAuthFromFormData(formData: FormData) {
  const authType = formData.get("telegramAuthType");
  const value = formData.get("telegramAuthValue");

  if (typeof authType !== "string" || typeof value !== "string") {
    return null;
  }

  return parseTelegramAuthPayload({ auth_type: authType, value });
}

export function parseTelegramAuthPayload(
  input: unknown,
): TelegramAuthPayload | null {
  if (!input || typeof input !== "object") {
    return null;
  }

  const auth = input as Record<string, unknown>;
  if (
    (auth.auth_type !== "init_data" && auth.auth_type !== "id_token") ||
    typeof auth.value !== "string" ||
    auth.value.trim().length === 0
  ) {
    return null;
  }

  return {
    auth_type: auth.auth_type,
    value: auth.value.trim(),
  };
}

export async function verifyTelegramSubscription(auth: TelegramAuthPayload) {
  const botToken = getRequiredEnv("TELEGRAM_BOT_TOKEN");
  const channelId = getRequiredEnv("TELEGRAM_CHANNEL_ID");
  const user = await validateTelegramAuth(auth, botToken);
  const subscribed = await checkChannelSubscription(
    user.id,
    channelId,
    botToken,
  );

  return {
    subscribed,
    userId: user.id,
  };
}

async function validateTelegramAuth(
  auth: TelegramAuthPayload,
  botToken: string,
) {
  if (auth.auth_type === "init_data") {
    return validateInitData(auth.value, botToken);
  }

  if (auth.auth_type === "id_token") {
    const clientId = getRequiredEnv("TELEGRAM_CLIENT_ID");

    return validateIdToken(auth.value, clientId);
  }

  throw new TelegramVerificationError(
    400,
    "unsupported_auth_type",
    "Unsupported Telegram auth type.",
  );
}

function validateInitData(initData: string, botToken: string): TelegramUser {
  const params = new URLSearchParams(initData);
  const hash = params.get("hash");

  if (!hash) {
    throw new TelegramVerificationError(
      400,
      "invalid_init_data",
      "Telegram did not pass a valid initData hash.",
    );
  }

  params.delete("hash");
  const dataCheckString = [...params.entries()]
    .sort(([left], [right]) => left.localeCompare(right))
    .map(([key, value]) => `${key}=${value}`)
    .join("\n");
  const secretKey = createHmac("sha256", "WebAppData")
    .update(botToken)
    .digest();
  const calculatedHash = createHmac("sha256", secretKey)
    .update(dataCheckString)
    .digest("hex");

  if (!safeCompareHex(calculatedHash, hash)) {
    throw new TelegramVerificationError(
      400,
      "invalid_init_data",
      "Telegram initData signature mismatch.",
    );
  }

  const userJson = params.get("user");
  if (!userJson) {
    throw new TelegramVerificationError(
      400,
      "invalid_init_data",
      "Telegram initData does not contain a user.",
    );
  }

  const user = parseTelegramUserJson(userJson);
  if (!user) {
    throw new TelegramVerificationError(
      400,
      "invalid_init_data",
      "Telegram initData user is invalid.",
    );
  }

  return user;
}

async function validateIdToken(
  idToken: string,
  clientId: string,
): Promise<TelegramUser> {
  try {
    const { payload } = await jwtVerify(idToken, telegramJwks, {
      audience: clientId,
      issuer: "https://oauth.telegram.org",
    });
    const user = parseTelegramJwtPayload(payload);

    if (!user) {
      throw new Error("missing user id");
    }

    return user;
  } catch (error) {
    if (error instanceof TelegramVerificationError) {
      throw error;
    }

    throw new TelegramVerificationError(
      400,
      "invalid_id_token",
      "Telegram id_token is invalid.",
    );
  }
}

async function checkChannelSubscription(
  userId: number,
  channelId: string,
  botToken: string,
) {
  const url = new URL(`${TELEGRAM_BOT_API_BASE}${botToken}/getChatMember`);
  url.searchParams.set("chat_id", channelId);
  url.searchParams.set("user_id", String(userId));

  let body: BotApiResponse;
  try {
    const response = await fetch(url, { cache: "no-store" });
    body = (await response.json()) as BotApiResponse;
  } catch {
    throw new TelegramVerificationError(
      502,
      "telegram_api_unavailable",
      "Telegram API is temporarily unavailable.",
    );
  }

  if (!body.ok) {
    throw new TelegramVerificationError(
      502,
      "telegram_api_error",
      body.description || "Telegram API returned an error.",
    );
  }

  const status = body.result?.status || "unknown";

  return (
    status === "member" || status === "administrator" || status === "creator"
  );
}

function parseTelegramUserJson(userJson: string): TelegramUser | null {
  try {
    const user = JSON.parse(userJson) as Record<string, unknown>;
    const id = parseUserId(user.id);

    if (id === null) {
      return null;
    }

    return {
      id,
      firstName:
        typeof user.first_name === "string" ? user.first_name : undefined,
      lastName: typeof user.last_name === "string" ? user.last_name : undefined,
      username: typeof user.username === "string" ? user.username : undefined,
    };
  } catch {
    return null;
  }
}

function parseTelegramJwtPayload(payload: JWTPayload): TelegramUser | null {
  const telegramPayload = payload as JWTPayload & Record<string, unknown>;
  const id = parseUserId(telegramPayload.id);

  if (id === null) {
    return null;
  }

  return {
    id,
    firstName:
      typeof telegramPayload.name === "string"
        ? telegramPayload.name
        : undefined,
    username:
      typeof telegramPayload.preferred_username === "string"
        ? telegramPayload.preferred_username
        : undefined,
  };
}

function parseUserId(value: unknown) {
  if (typeof value === "number" && Number.isSafeInteger(value)) {
    return value;
  }

  if (typeof value === "string" && /^\d+$/.test(value)) {
    const parsed = Number(value);

    return Number.isSafeInteger(parsed) ? parsed : null;
  }

  return null;
}

function safeCompareHex(left: string, right: string) {
  try {
    const leftBuffer = Buffer.from(left, "hex");
    const rightBuffer = Buffer.from(right, "hex");

    return (
      leftBuffer.length === rightBuffer.length &&
      timingSafeEqual(leftBuffer, rightBuffer)
    );
  } catch {
    return false;
  }
}

function getTelegramChannelUrl() {
  return process.env.TELEGRAM_CHANNEL_URL?.trim() || communityHref;
}

function getOptionalEnv(key: string) {
  const value = process.env[key]?.trim();

  return value ? value : null;
}

function getRequiredEnv(key: string) {
  const value = getOptionalEnv(key);

  if (!value) {
    throw new TelegramVerificationError(
      500,
      "telegram_not_configured",
      `${key} is not configured.`,
    );
  }

  return value;
}
