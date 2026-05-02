import { ArrowRight } from "lucide-react";
import { type LandingContent, registrationHref } from "@/lib/landing-content";

type MobileActionBarProps = {
  content: LandingContent;
};

export function MobileActionBar({ content }: MobileActionBarProps) {
  return (
    <div className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-background/88 px-4 py-3 backdrop-blur-xl sm:hidden">
      <div className="mx-auto flex max-w-md items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="truncate font-mono text-[0.68rem] font-bold uppercase tracking-[0.18em] text-primary">
            {content.hero.badge}
          </p>
          <p className="truncate text-xs font-semibold text-muted-foreground">
            {content.hero.meta[0]} · {content.hero.meta[1]}
          </p>
        </div>
        <a
          href={registrationHref}
          className="inline-flex min-h-11 items-center justify-center gap-2 rounded-2xl bg-primary px-4 text-sm font-bold text-primary-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
        >
          {content.cta}
          <ArrowRight aria-hidden="true" className="size-4" />
        </a>
      </div>
    </div>
  );
}
