"use client";

import { Menu, Moon, Sun, X } from "lucide-react";
import { useState } from "react";
import {
  type LandingContent,
  type Language,
  languages,
  navHrefs,
  registrationHref,
} from "@/lib/landing-content";
import { cn } from "@/lib/utils";
import type { ThemeMode } from "./landing-shell";

type HeaderProps = {
  content: LandingContent;
  language: Language;
  setLanguage: (language: Language) => void;
  theme: ThemeMode;
  toggleTheme: () => void;
};

export function Header({
  content,
  language,
  setLanguage,
  theme,
  toggleTheme,
}: HeaderProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = content.nav.map((label, index) => ({
    label,
    href: navHrefs[index],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/86 px-4 backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 py-2">
        <a
          href="#hero"
          className="inline-flex min-h-10 max-w-[10rem] items-center rounded-full font-heading text-base font-extrabold tracking-[-0.04em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-none sm:text-lg"
        >
          Mira Growth Hack
        </a>

        <nav
          aria-label="Основная навигация"
          className="hidden items-center gap-1 lg:flex"
        >
          {navItems.map((item) => (
            <a
              key={item.href}
              href={item.href}
              className="rounded-full px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            >
              {item.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <div className="hidden rounded-full border border-border bg-card p-1 sm:flex">
            {languages.map((item) => (
              <button
                key={item.code}
                type="button"
                aria-pressed={language === item.code}
                className={cn(
                  "min-h-8 rounded-full px-3 font-mono text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                  language === item.code
                    ? "bg-primary text-primary-foreground"
                    : "text-muted-foreground hover:text-foreground",
                )}
                onClick={() => setLanguage(item.code)}
              >
                {item.label}
              </button>
            ))}
          </div>
          <button
            type="button"
            aria-label={
              theme === "dark"
                ? "Включить светлую тему"
                : "Включить темную тему"
            }
            className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            onClick={toggleTheme}
          >
            {theme === "dark" ? (
              <Sun aria-hidden="true" className="size-4" />
            ) : (
              <Moon aria-hidden="true" className="size-4" />
            )}
          </button>
          <a
            href={registrationHref}
            className="hidden min-h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            {content.cta}
          </a>
          <button
            type="button"
            aria-expanded={isOpen}
            aria-controls="mobile-nav"
            className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 lg:hidden"
            onClick={() => setIsOpen((value) => !value)}
          >
            <span className="sr-only">{content.menu}</span>
            {isOpen ? (
              <X aria-hidden="true" className="size-5" />
            ) : (
              <Menu aria-hidden="true" className="size-5" />
            )}
          </button>
        </div>
      </div>

      <div id="mobile-nav" className="mx-auto max-w-7xl lg:hidden">
        {isOpen && (
          <nav
            aria-label="Мобильная навигация"
            className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-150"
          >
            <div className="grid gap-2 py-4">
              <div className="mb-1 flex rounded-2xl border border-border bg-card p-1 sm:hidden">
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    aria-pressed={language === item.code}
                    className={cn(
                      "min-h-10 flex-1 rounded-xl font-mono text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      language === item.code
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setLanguage(item.code)}
                  >
                    {item.label}
                  </button>
                ))}
              </div>
              {navItems.map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="min-h-11 rounded-2xl px-4 py-3 text-base font-semibold text-foreground hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </a>
              ))}
              <a
                href={registrationHref}
                className="mt-2 inline-flex min-h-11 items-center justify-center rounded-2xl bg-primary px-5 text-base font-semibold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setIsOpen(false)}
              >
                {content.cta}
              </a>
            </div>
          </nav>
        )}
      </div>
    </header>
  );
}
