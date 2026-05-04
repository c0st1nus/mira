import type { Language } from "@/lib/landing-content";
import { getRegistrationContent } from "@/lib/registration-content";
import { RegistrationForm } from "./registration-form";
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
      <div className="gap-6 lg:items-start">
        <div className="rounded-[2rem] border border-border bg-card/92 p-4 text-card-foreground soft-shadow sm:p-6 lg:p-8">
          <RegistrationForm content={content.form} language={language} />
        </div>
      </div>
    </Section>
  );
}
