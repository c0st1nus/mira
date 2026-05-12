import {
  parseTelegramAuthPayload,
  TelegramVerificationError,
  verifyTelegramSubscription,
} from "@/lib/telegram";

export const runtime = "nodejs";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as { telegram_auth?: unknown };
    const telegramAuth = parseTelegramAuthPayload(body.telegram_auth);

    if (!telegramAuth) {
      return Response.json(
        {
          error: "invalid_telegram_auth",
          message: "Telegram authorization payload is required.",
        },
        { status: 400 },
      );
    }

    const result = await verifyTelegramSubscription(telegramAuth);

    return Response.json({
      subscribed: result.subscribed,
      user_id: result.userId,
    });
  } catch (error) {
    if (error instanceof TelegramVerificationError) {
      return Response.json(
        {
          error: error.code,
          message: error.message,
        },
        { status: error.status },
      );
    }

    return Response.json(
      {
        error: "telegram_verification_failed",
        message: "Telegram subscription verification failed.",
      },
      { status: 500 },
    );
  }
}
