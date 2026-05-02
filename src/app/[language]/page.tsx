import { notFound } from "next/navigation";
import { LandingShell } from "@/components/landing/landing-shell";
import { type Language, languages } from "@/lib/landing-content";

const languageCodes = languages.map((item) => item.code);

function isLanguage(value: string): value is Language {
  return languageCodes.includes(value as Language);
}

export function generateStaticParams() {
  return languageCodes
    .filter((language) => language !== "ru")
    .map((language) => ({ language }));
}

export default async function LocalizedHome({
  params,
}: {
  params: Promise<{ language: string }>;
}) {
  const { language } = await params;

  if (!isLanguage(language) || language === "ru") {
    notFound();
  }

  return <LandingShell language={language} />;
}
