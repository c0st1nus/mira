import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";

type TimelineSectionProps = {
  content: LandingContent;
};

export function TimelineSection({ content }: TimelineSectionProps) {
  return (
    <Section
      id="timeline"
      eyebrow={content.timeline.eyebrow}
      title={content.timeline.title}
    >
      <div className="relative grid gap-5 lg:grid-cols-4 lg:gap-0">
        <div className="absolute left-6 top-8 hidden h-px w-[calc(100%-3rem)] bg-border lg:block" />
        {content.timeline.items.map((item, index) => (
          <article
            key={item.date}
            className="relative rounded-[2rem] border border-border bg-card p-6 lg:mx-2"
          >
            <div className="mb-6 flex size-12 items-center justify-center rounded-full bg-primary font-mono text-sm font-bold text-primary-foreground">
              {index + 1}
            </div>
            <p className="font-mono text-sm font-bold text-primary">
              {item.date}
            </p>
            <h3 className="mt-3 font-heading text-2xl font-extrabold tracking-[-0.04em] text-foreground">
              {item.title}
            </h3>
            <p className="mt-4 leading-7 text-muted-foreground">
              {item.description}
            </p>
          </article>
        ))}
      </div>
    </Section>
  );
}
