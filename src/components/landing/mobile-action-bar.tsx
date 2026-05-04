import { ArrowRight } from "lucide-react";
import type { LandingContent, Language } from "@/lib/landing-content";
import { getRegistrationHref } from "@/lib/language-routing";

type MobileActionBarProps = {
  content: LandingContent;
  language: Language;
};

export function MobileActionBar({ content, language }: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 h-14 border-t border-border bg-background/96 px-4 sm:hidden">
      <div className="mx-auto flex h-full max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-sm font-bold uppercase leading-5 tracking-[0.1em] text-primary">
            {content.hero.badge}
          </p>
          <p className="truncate text-xs font-semibold leading-4 text-muted-foreground">
            {content.hero.meta[0]} · {content.hero.meta[1]}
          </p>
        </div>
        <a
          href={getRegistrationHref(language)}
          className="inline-flex h-10 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {content.cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
