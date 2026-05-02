"use client";

import { useEffect, useMemo, useState } from "react";
import { type Language, landingContent } from "@/lib/landing-content";
import { AboutChallengeSection } from "./about-challenge-section";
import { BenefitsSection } from "./benefits-section";
import { FaqSection } from "./faq-section";
import { FinalCta } from "./final-cta";
import { Footer } from "./footer";
import { Header } from "./header";
import { HeroSection } from "./hero-section";
import { MiraSection } from "./mira-section";
import { MobileActionBar } from "./mobile-action-bar";
import { StepsSection } from "./steps-section";
import { TimelineSection } from "./timeline-section";
import { TracksSection } from "./tracks-section";

const languageKey = "mira-growth-hack-language";
const themeKey = "mira-growth-hack-theme";

export type ThemeMode = "light" | "dark";

function isLanguage(value: string | null): value is Language {
  return value === "ru" || value === "en" || value === "kk";
}

function isTheme(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

export function LandingShell() {
  const [language, setLanguage] = useState<Language>("ru");
  const [theme, setTheme] = useState<ThemeMode>("light");
  const content = useMemo(() => landingContent[language], [language]);

  useEffect(() => {
    const storedLanguage = window.localStorage.getItem(languageKey);
    const storedTheme = window.localStorage.getItem(themeKey);

    if (isLanguage(storedLanguage)) {
      setLanguage(storedLanguage);
    }

    if (isTheme(storedTheme)) {
      setTheme(storedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = language;
    window.localStorage.setItem(languageKey, language);
  }, [language]);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    window.localStorage.setItem(themeKey, theme);
  }, [theme]);

  return (
    <div className="relative isolate min-h-screen overflow-hidden">
      <div aria-hidden="true" className="ambient-bg" />
      <div className="relative z-10">
        <Header
          content={content}
          language={language}
          setLanguage={setLanguage}
          theme={theme}
          toggleTheme={() =>
            setTheme((value) => (value === "dark" ? "light" : "dark"))
          }
        />
        <main>
          <HeroSection content={content} />
          <AboutChallengeSection content={content} />
          <BenefitsSection content={content} />
          <TracksSection content={content} />
          <StepsSection content={content} />
          <MiraSection content={content} />
          <TimelineSection content={content} />
          <FaqSection content={content} />
          <FinalCta content={content} />
        </main>
        <Footer content={content} />
        <MobileActionBar content={content} />
      </div>
    </div>
  );
}
