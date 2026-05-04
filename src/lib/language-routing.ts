import type { Language } from "./landing-content";

export type UrlLanguage = "ru" | "en" | "kz";

export function parseLanguageParam(
  value: string | string[] | undefined,
): Language {
  const language = Array.isArray(value) ? value[0] : value;

  if (language === "en") {
    return "en";
  }

  if (language === "kz" || language === "kk") {
    return "kk";
  }

  return "ru";
}

export function getLanguageParam(language: Language): UrlLanguage {
  return language === "kk" ? "kz" : language;
}

function getLanguageQuery(language: Language) {
  return language === "ru" ? "" : `?language=${getLanguageParam(language)}`;
}

export function getLandingHref(language: Language, hash?: string) {
  const normalizedHash = hash ? `#${hash.replace(/^#/, "")}` : "";

  return `/${getLanguageQuery(language)}${normalizedHash}`;
}

export function getRegistrationHref(language: Language) {
  return `/registration${getLanguageQuery(language)}`;
}
