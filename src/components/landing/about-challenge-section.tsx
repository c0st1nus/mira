import { Sparkles } from "lucide-react";
import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";

type AboutChallengeSectionProps = {
  content: LandingContent;
};

export function AboutChallengeSection({ content }: AboutChallengeSectionProps) {
  return (
    <Section id="about">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
        <div>
          <p className="mb-4 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
            {content.about.eyebrow}
          </p>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] text-foreground sm:text-6xl">
            {content.about.title}
          </h2>
        </div>
        <div className="soft-shadow rounded-[2rem] border border-border bg-card p-6 sm:p-8">
          <p className="text-xl font-semibold leading-9 text-foreground sm:text-2xl">
            {content.about.lead}
          </p>
          <p className="mt-5 text-base leading-8 text-muted-foreground">
            {content.about.text}
          </p>
          <p className="mt-5 rounded-[1.25rem] bg-brand-blue-soft px-5 py-4 text-lg font-extrabold leading-7 text-accent-foreground sm:text-xl">
            {content.about.highlight}
          </p>
          <div className="mt-7 flex flex-wrap gap-2">
            {content.about.tags.map((tag) => (
              <span
                key={tag}
                className="inline-flex min-h-9 items-center gap-2 rounded-full bg-secondary px-4 text-sm font-semibold text-secondary-foreground"
              >
                <Sparkles
                  aria-hidden="true"
                  className="size-3.5 text-primary"
                />
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
