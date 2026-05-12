import { getTelegramPublicSettings } from "@/lib/telegram";

export const runtime = "nodejs";

export function GET() {
  return Response.json(getTelegramPublicSettings());
}
