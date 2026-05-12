"use client";

import type { ReactNode } from "react";
import { TelegramProvider } from "./telegram-provider";

export function Providers({ children }: { children: ReactNode }) {
  return <TelegramProvider>{children}</TelegramProvider>;
}
