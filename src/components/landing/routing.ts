import type { Language } from "@/lib/landing-content";

export function getLanguageHref(language: Language) {
  return language === "ru" ? "/" : `/${language}`;
}
