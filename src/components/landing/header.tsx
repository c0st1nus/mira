import Link from "next/link";
import {
  type LandingContent,
  type Language,
  languages,
  navHrefs,
  registrationHref,
} from "@/lib/landing-content";
import { cn } from "@/lib/utils";
import { MobileNav } from "./mobile-nav";
import { getLanguageHref } from "./routing";
import { ThemeToggle } from "./theme-toggle";

type HeaderProps = {
  content: LandingContent;
  language: Language;
};

export function Header({ content, language }: HeaderProps) {
  const navItems = content.nav.map((label, index) => ({
    label,
    href: navHrefs[index],
  }));

  return (
    <header className="sticky top-0 z-50 border-b border-border/70 bg-background/96 px-4 supports-backdrop-filter:sm:bg-background/86 supports-backdrop-filter:sm:backdrop-blur-xl sm:px-6 lg:px-8">
      <div className="mx-auto flex min-h-16 max-w-7xl items-center justify-between gap-3 py-2">
        <a
          href="#hero"
          className="inline-flex min-h-10 max-w-40 items-center rounded-full font-heading text-base font-extrabold tracking-[-0.04em] text-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:max-w-none sm:text-lg"
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
              <Link
                key={item.code}
                href={getLanguageHref(item.code)}
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
          </div>
          <ThemeToggle />
          <a
            href={registrationHref}
            className="hidden min-h-10 items-center justify-center rounded-full bg-primary px-5 text-sm font-semibold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:inline-flex"
          >
            {content.cta}
          </a>
          <MobileNav content={content} language={language} />
        </div>
      </div>
    </header>
  );
}
