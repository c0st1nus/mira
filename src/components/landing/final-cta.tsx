import { ArrowRight } from "lucide-react";
import { type LandingContent, registrationHref } from "@/lib/landing-content";

type FinalCtaProps = {
  content: LandingContent;
};

export function FinalCta({ content }: FinalCtaProps) {
  return (
    <section className="px-4 py-16 sm:px-6 lg:px-8 lg:py-24">
      <div className="mx-auto max-w-7xl overflow-hidden rounded-[2.5rem] border border-border bg-card p-7 text-card-foreground soft-shadow sm:p-10 lg:p-14">
        <div className="grid gap-8 lg:grid-cols-[1fr_auto] lg:items-end">
          <div>
            <p className="mb-4 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
              {content.finalCta.eyebrow}
            </p>
            <h2 className="max-w-4xl font-heading text-4xl font-extrabold leading-[1.02] tracking-[-0.06em] sm:text-6xl">
              {content.finalCta.title}
            </h2>
            <p className="mt-5 max-w-2xl text-lg leading-8 text-muted-foreground">
              {content.finalCta.description}
            </p>
          </div>
          <a
            href={registrationHref}
            className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-primary px-6 text-base font-bold text-primary-foreground transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card"
          >
            {content.cta}
            <ArrowRight aria-hidden="true" className="size-5" />
          </a>
        </div>
      </div>
    </section>
  );
}
