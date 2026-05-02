import {
  Award,
  BadgeDollarSign,
  BriefcaseBusiness,
  Rocket,
  Sparkles,
} from "lucide-react";
import type { LandingContent } from "@/lib/landing-content";
import { Section } from "./section";

const icons = [Rocket, BadgeDollarSign, Sparkles, BriefcaseBusiness, Award];

type BenefitsSectionProps = {
  content: LandingContent;
};

export function BenefitsSection({ content }: BenefitsSectionProps) {
  return (
    <Section
      id="benefits"
      eyebrow={content.benefits.eyebrow}
      title={content.benefits.title}
    >
      <div className="grid gap-4 lg:grid-cols-6">
        {content.benefits.items.map((benefit, index) => {
          const Icon = icons[index];
          const isLarge = index === 0;

          return (
            <article
              key={benefit.title}
              className={
                isLarge
                  ? "soft-shadow rounded-[2rem] border border-primary/20 bg-primary p-6 text-primary-foreground lg:col-span-2 lg:row-span-2 lg:p-8"
                  : "rounded-[2rem] border border-border bg-card p-6 lg:col-span-2"
              }
            >
              <div
                className={
                  isLarge
                    ? "mb-8 flex size-12 items-center justify-center rounded-2xl bg-primary-foreground/18"
                    : "mb-8 flex size-12 items-center justify-center rounded-2xl bg-brand-blue-soft"
                }
              >
                <Icon
                  aria-hidden="true"
                  className={isLarge ? "size-6" : "size-6 text-primary"}
                />
              </div>
              <h3 className="font-heading text-2xl font-extrabold tracking-[-0.04em]">
                {benefit.title}
              </h3>
              <p
                className={
                  isLarge
                    ? "mt-4 leading-7 text-primary-foreground/84"
                    : "mt-4 leading-7 text-muted-foreground"
                }
              >
                {benefit.description}
              </p>
            </article>
          );
        })}
      </div>
    </Section>
  );
}
