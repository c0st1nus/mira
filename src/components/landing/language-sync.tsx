"use client";

import { useEffect } from "react";
import type { Language } from "@/lib/landing-content";

export function LanguageSync({ language }: { language: Language }) {
  useEffect(() => {
    document.documentElement.lang = language;
  }, [language]);

  return null;
}
