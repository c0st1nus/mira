import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  type Language,
  landingContent,
  languages,
} from "@/lib/landing-content";
import { getLandingHref, getRegistrationHref } from "@/lib/language-routing";
import { getRegistrationContent } from "@/lib/registration-content";
import { cn } from "@/lib/utils";
import { CountdownTimer } from "./countdown-timer";
import { LanguageSync } from "./language-sync";
import { RegistrationForm } from "./registration-form";
import { ThemeToggle } from "./theme-toggle";

const pageCopy: Record<Language, { back: string; languageNav: string }> = {
  ru: {
    back: "Назад к лендингу",
    languageNav: "Выбор языка",
  },
  en: {
    back: "Back to landing",
    languageNav: "Language selector",
  },
  kk: {
    back: "Лендингке қайту",
    languageNav: "Тіл таңдау",
  },
};

const registrationCountdownLabels: Record<Language, string> = {
  ru: "До конца регистрации осталось",
  en: "Registration closes in",
  kk: "Тіркелудің аяқталуына қалды",
};

export function RegistrationPageShell({ language }: { language: Language }) {
  const content = getRegistrationContent(language);
  const landing = landingContent[language];
  const countdownContent = {
    ...landing,
    countdown: {
      ...landing.countdown,
      label: registrationCountdownLabels[language],
    },
  };
  const copy = pageCopy[language];

  return (
    <div className="relative isolate min-h-screen overflow-x-clip">
      <LanguageSync language={language} />
      <div aria-hidden="true" className="ambient-bg" />
      <div className="relative z-10">
        <header className="border-b border-border/70 bg-background/96 px-4 supports-backdrop-filter:sm:bg-background/86 supports-backdrop-filter:sm:backdrop-blur-xl sm:px-6 lg:px-8">
          <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 py-2">
            <Link
              href={getLandingHref(language)}
              className="inline-flex min-h-10 items-center rounded-full font-heading text-base font-extrabold tracking-[-0.04em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:text-lg"
            >
              Mira Growth Hack
            </Link>

            <div className="flex items-center gap-2">
              <nav
                aria-label={copy.languageNav}
                className="flex rounded-full border border-border bg-card p-1"
              >
                {languages.map((item) => (
                  <Link
                    key={item.code}
                    href={getRegistrationHref(item.code)}
                    aria-current={language === item.code ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-8 items-center rounded-full px-3 font-mono text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      language === item.code
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground hover:text-foreground",
                    )}
                  >
                    {item.label}
                  </Link>
                ))}
              </nav>
              <ThemeToggle />
            </div>
          </div>
        </header>

        <main className="px-4 pb-16 pt-8 sm:px-6 sm:pb-20 sm:pt-10 lg:px-8 lg:py-14">
          <div className="mx-auto grid max-w-7xl gap-8 lg:grid-cols-[0.84fr_1.16fr] lg:items-start lg:gap-10">
            <aside className="lg:sticky lg:top-24">
              <Link
                href={getLandingHref(language)}
                className="mb-6 inline-flex min-h-10 items-center gap-2 rounded-full border border-border bg-card px-4 text-sm font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
              >
                <ArrowLeft aria-hidden="true" className="size-4" />
                {copy.back}
              </Link>

              <p className="mb-4 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
                {content.section.eyebrow}
              </p>
              <h1 className="max-w-3xl font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl">
                {content.section.title}
              </h1>
              <p className="mt-5 max-w-2xl text-base leading-8 text-muted-foreground sm:text-lg">
                {content.section.description}
              </p>

              <CountdownTimer content={countdownContent} />
            </aside>

            <div className="rounded-[2rem] border border-border bg-card/92 p-4 text-card-foreground soft-shadow sm:p-6 lg:p-8">
              <RegistrationForm content={content.form} language={language} />
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}
