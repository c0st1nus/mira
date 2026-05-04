import { ArrowRight, CalendarDays, MapPin, UsersRound } from "lucide-react";
import {
  communityHref,
  type LandingContent,
  registrationHref,
} from "@/lib/landing-content";
import { CountdownTimer } from "./countdown-timer";

const metaIcons = [CalendarDays, MapPin, UsersRound];

type HeroSectionProps = {
  content: LandingContent;
};

export function HeroSection({ content }: HeroSectionProps) {
  const meta = content.hero.meta.map((label, index) => ({
    icon: metaIcons[index],
    label,
  }));

  return (
    <section
      id="hero"
      className="overflow-hidden px-4 pb-12 pt-8 sm:px-6 sm:py-14 lg:px-8 lg:py-20"
    >
      <div className="mx-auto grid max-w-7xl gap-7 lg:grid-cols-[1.08fr_0.92fr] lg:items-center lg:gap-10">
        <div className="relative">
          <div className="mb-5 inline-flex rounded-full border border-primary/20 bg-card/90 px-6 py-3 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary shadow-sm sm:mb-8 sm:bg-card/80 sm:text-lg sm:backdrop-blur">
            {content.hero.badge}
          </div>
          <h1 className="max-w-5xl break-words font-heading text-[2.85rem] font-extrabold leading-[0.9] tracking-[-0.075em] text-foreground min-[420px]:text-[3.35rem] sm:text-7xl sm:leading-[0.88] lg:text-8xl">
            {content.hero.titleBefore}{" "}
            <span className="text-primary">{content.hero.accent}</span>{" "}
            {content.hero.titleAfter}
          </h1>
          <p className="mt-5 max-w-2xl text-base leading-7 text-muted-foreground sm:mt-7 sm:text-xl sm:leading-9">
            {content.hero.description}
          </p>

          <div className="mt-6 grid grid-cols-1 gap-2 min-[420px]:grid-cols-3 sm:mt-8 sm:flex sm:flex-wrap sm:gap-3">
            {meta.map((item) => (
              <div
                key={item.label}
                className="inline-flex min-h-11 items-center gap-2 rounded-2xl border border-border bg-card/92 px-3 text-sm font-semibold text-foreground sm:rounded-full sm:bg-card/86 sm:px-4 sm:backdrop-blur"
              >
                <item.icon aria-hidden="true" className="size-4 text-primary" />
                {item.label}
              </div>
            ))}
          </div>

          <div className="mt-7 grid gap-3 sm:mt-9 sm:flex sm:flex-row">
            <a
              href={registrationHref}
              className="inline-flex min-h-13 items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-12 sm:rounded-full"
            >
              {content.cta}
              <ArrowRight aria-hidden="true" className="size-5" />
            </a>
            <a
              href={communityHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-13 items-center justify-center rounded-2xl border border-border bg-card/80 px-6 text-base font-bold text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 sm:min-h-12 sm:rounded-full"
            >
              {content.community}
            </a>
          </div>
        </div>

        <div className="relative lg:pl-8">
          <div className="absolute -right-24 -top-20 hidden h-56 w-56 rounded-full bg-primary/16 blur-3xl lg:block" />
          <div className="relative rounded-[2rem] border border-border bg-card/92 p-3 sm:rounded-[2.5rem] sm:bg-card/72 sm:p-6 sm:backdrop-blur-xl">
            <CountdownTimer content={content} />
            <div className="mt-4 rounded-[1.5rem] border border-border bg-background/80 p-4 sm:mt-5 sm:rounded-[1.75rem] sm:p-5">
              <p className="font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
                {content.hero.target}
              </p>
              <div className="mt-4 space-y-2 sm:mt-5 sm:space-y-3">
                {content.hero.targetSteps.map((item, index) => (
                  <div
                    key={item}
                    className="flex items-center gap-3 rounded-2xl bg-card px-3 py-3 sm:px-4"
                  >
                    <span className="flex size-8 items-center justify-center rounded-full bg-brand-blue-soft font-mono text-sm font-bold text-primary">
                      {index + 1}
                    </span>
                    <span className="font-semibold text-foreground">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
