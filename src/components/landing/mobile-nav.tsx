"use client";

import { Menu, X } from "lucide-react";
import { useState } from "react";
import {
  type LandingContent,
  type Language,
  languages,
  navHrefs,
  registrationHref,
} from "@/lib/landing-content";
import { cn } from "@/lib/utils";
import { getLanguageHref } from "./routing";

type MobileNavProps = {
  content: LandingContent;
  language: Language;
};

export function MobileNav({ content, language }: MobileNavProps) {
  const [isOpen, setIsOpen] = useState(false);
  const navItems = content.nav.map((label, index) => ({
    label,
    href: navHrefs[index],
  }));

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={isOpen}
        aria-controls="mobile-nav"
        className="inline-flex size-11 items-center justify-center rounded-full border border-border bg-card text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        onClick={() => setIsOpen((value) => !value)}
      >
        <span className="sr-only">{content.menu}</span>
        {isOpen ? (
          <X aria-hidden="true" className="size-5" />
        ) : (
          <Menu aria-hidden="true" className="size-5" />
        )}
      </button>

      <div
        id="mobile-nav"
        className="absolute inset-x-4 top-full mx-auto max-w-7xl"
      >
        {isOpen && (
          <nav
            aria-label="Мобильная навигация"
            className="rounded-b-[1.5rem] border-x border-b border-border bg-background/98 p-3 shadow-lg supports-backdrop-filter:bg-background/94 supports-backdrop-filter:backdrop-blur-xl motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-top-2 motion-safe:duration-150"
          >
            <div className="grid gap-2">
              <div className="mb-1 flex rounded-2xl border border-border bg-card p-1 sm:hidden">
                {languages.map((item) => (
                  <a
                    key={item.code}
                    href={getLanguageHref(item.code)}
                    aria-current={language === item.code ? "page" : undefined}
                    className={cn(
                      "inline-flex min-h-10 flex-1 items-center justify-center rounded-xl font-mono text-xs font-bold transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
                      language === item.code
                        ? "bg-primary text-primary-foreground"
                        : "text-muted-foreground",
                    )}
                    onClick={() => setIsOpen(false)}
                  >
                    {item.label}
                  </a>
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
    </div>
  );
}
