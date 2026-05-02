import { Trophy } from "lucide-react";
import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";

type StepsSectionProps = {
  content: LandingContent;
};

export function StepsSection({ content }: StepsSectionProps) {
  return (
    <Section
      id="steps"
      eyebrow={content.steps.eyebrow}
      title={content.steps.title}
    >
      <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-start">
        <div className="space-y-5">
          {content.steps.items.map((step, index) => (
            <article
              key={step.title}
              className="grid grid-cols-[3rem_1fr] gap-4"
            >
              <div className="flex flex-col items-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
                  {index + 1}
                </div>
                {index < content.steps.items.length - 1 && (
                  <div className="mt-3 h-full min-h-12 w-px bg-border" />
                )}
              </div>
              <div className="pb-7">
                <h3 className="font-heading text-2xl font-extrabold tracking-[-0.04em] text-foreground">
                  {step.title}
                </h3>
                <p className="mt-3 max-w-xl leading-8 text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </article>
          ))}
        </div>

        <div className="soft-shadow rounded-[2.5rem] border border-border bg-card p-5 sm:p-7">
          <div className="mb-6 flex items-center justify-between gap-4">
            <div>
              <p className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
                {content.steps.leaderboardLabel}
              </p>
              <h3 className="mt-2 font-heading text-3xl font-extrabold tracking-[-0.05em]">
                {content.steps.leaderboard}
              </h3>
            </div>
            <div className="flex size-12 items-center justify-center rounded-2xl bg-brand-blue-soft text-primary">
              <Trophy aria-hidden="true" className="size-6" />
            </div>
          </div>
          <div className="space-y-3">
            {content.steps.rows
              .map((name, index) => ({
                name,
                users: ["248", "193", "141"][index],
                active: index === 1,
              }))
              .map((row, index) => (
                <div
                  key={row.name}
                  className={
                    row.active
                      ? "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-2xl bg-primary px-4 py-4 text-primary-foreground"
                      : "grid grid-cols-[2.5rem_1fr_auto] items-center gap-3 rounded-2xl bg-secondary px-4 py-4"
                  }
                >
                  <span className="font-mono text-sm font-bold">
                    #{index + 1}
                  </span>
                  <span className="font-semibold">{row.name}</span>
                  <span className="font-mono text-lg font-bold">
                    {row.users}
                  </span>
                </div>
              ))}
          </div>
          <div className="mt-5 rounded-2xl border border-dashed border-primary/35 bg-brand-blue-soft p-4 text-sm font-semibold text-accent-foreground">
            {content.steps.leaderboardHint}
          </div>
        </div>
      </div>
    </Section>
  );
}
