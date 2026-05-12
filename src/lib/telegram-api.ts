import type {
  ApiErrorBody,
  TelegramAuthPayload,
  TelegramSettingsResponse,
  TelegramSubscriptionResponse,
} from "./telegram-types";

export async function getTelegramSettings() {
  const response = await fetch("/api/telegram/settings");
  const data = await parseJson<TelegramSettingsResponse | ApiErrorBody>(
    response,
  );

  return { data, response };
}

export async function verifySubscription(telegramAuth: TelegramAuthPayload) {
  const response = await fetch("/api/telegram/verify-subscription", {
    body: JSON.stringify({ telegram_auth: telegramAuth }),
    headers: { "Content-Type": "application/json" },
    method: "POST",
  });
  const data = await parseJson<TelegramSubscriptionResponse | ApiErrorBody>(
    response,
  );

  return { data, response };
}

async function parseJson<T>(response: Response): Promise<T | null> {
  try {
    return (await response.json()) as T;
  } catch {
    return null;
  }
}
