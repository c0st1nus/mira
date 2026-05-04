import { ArrowRight, CheckCircle2 } from "lucide-react";
import Link from "next/link";
import type { Language } from "@/lib/landing-content";
import { getRegistrationHref } from "@/lib/language-routing";
import { getRegistrationContent } from "@/lib/registration-content";
import { Section } from "./section";

export function RegistrationSection({ language }: { language: Language }) {
  const content = getRegistrationContent(language);

  return (
    <Section
      id="registration"
      eyebrow={content.section.eyebrow}
      title={content.section.title}
      description={content.section.description}
    >
      <div className="mx-auto max-w-5xl overflow-hidden rounded-[2rem] border border-border bg-card/92 p-5 text-card-foreground soft-shadow sm:p-7 lg:p-9">
        <div className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:items-center">
          <div>
            <div className="mb-5 inline-flex min-h-11 items-center rounded-2xl border border-primary/20 bg-background/80 px-4 font-mono text-sm font-bold uppercase tracking-[0.12em] text-primary sm:rounded-full">
              {content.section.badge}
            </div>
            <h3 className="font-heading text-3xl font-extrabold tracking-tighter text-foreground sm:text-4xl">
              {content.section.asideTitle}
            </h3>
            <p className="mt-4 max-w-2xl text-base leading-7 text-muted-foreground">
              {content.section.asideText}
            </p>
            <Link
              href={getRegistrationHref(language)}
              className="mt-6 inline-flex min-h-13 w-full items-center justify-center gap-2 rounded-2xl bg-primary px-6 text-base font-bold text-primary-foreground shadow-sm transition-colors hover:bg-primary/90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-card sm:w-auto sm:min-h-12 sm:rounded-full"
            >
              {content.form.submitLabel}
              <ArrowRight aria-hidden="true" className="size-5" />
            </Link>
          </div>

          <div className="grid gap-3">
            {content.section.notes.map((note) => (
              <div
                key={note.title}
                className="rounded-[1.5rem] border border-border bg-background/80 p-4 sm:p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex size-8 shrink-0 items-center justify-center rounded-full bg-brand-blue-soft text-primary">
                    <CheckCircle2 aria-hidden="true" className="size-4" />
                  </span>
                  <div>
                    <h4 className="font-heading text-lg font-extrabold tracking-[-0.04em] text-foreground">
                      {note.title}
                    </h4>
                    <p className="mt-1 text-sm leading-6 text-muted-foreground">
                      {note.text}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Section>
  );
}
