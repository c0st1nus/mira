import { Bot, CheckCircle2 } from "lucide-react";
import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";

type MiraSectionProps = {
  content: LandingContent;
};

export function MiraSection({ content }: MiraSectionProps) {
  return (
    <Section id="mira" className="bg-background">
      <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
        <div className="rounded-[2.5rem] border border-border bg-card p-7 text-card-foreground soft-shadow sm:p-9">
          <div className="mb-10 flex size-14 items-center justify-center rounded-2xl bg-primary text-primary-foreground">
            <Bot aria-hidden="true" className="size-7" />
          </div>
          <p className="mb-4 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
            {content.mira.eyebrow}
          </p>
          <h2 className="font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-6xl">
            {content.mira.title}
          </h2>
          <p className="mt-6 text-lg leading-8 text-muted-foreground">
            {content.mira.description}
          </p>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          {content.mira.features.map((feature) => (
            <article
              key={feature.title}
              className="rounded-[2rem] border border-border bg-card p-6"
            >
              <CheckCircle2
                aria-hidden="true"
                className="mb-7 size-7 text-primary"
              />
              <h3 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-foreground">
                {feature.title}
              </h3>
              <p className="mt-4 leading-7 text-muted-foreground">
                {feature.description}
              </p>
            </article>
          ))}
        </div>
      </div>
    </Section>
  );
}
