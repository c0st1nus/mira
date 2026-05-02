"use client";

import { ChevronDown } from "lucide-react";
import { useState } from "react";
import type { LandingContent } from "@/lib/landing-content";
import { cn } from "@/lib/utils";
import { Section } from "./section";

type FaqSectionProps = {
  content: LandingContent;
};

export function FaqSection({ content }: FaqSectionProps) {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <Section
      id="faq"
      eyebrow={content.faq.eyebrow}
      title={content.faq.title}
      className="bg-secondary/45"
    >
      <div className="mx-auto max-w-4xl space-y-3">
        {content.faq.items.map((item, index) => {
          const isOpen = openIndex === index;
          const panelId = `faq-panel-${index}`;

          return (
            <div
              key={item.question}
              className="rounded-[1.5rem] border border-border bg-card transition-colors hover:bg-accent/35"
            >
              <button
                type="button"
                aria-expanded={isOpen}
                aria-controls={panelId}
                className="flex min-h-16 w-full items-center justify-between gap-4 rounded-[1.5rem] px-5 py-4 text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                onClick={() => setOpenIndex(isOpen ? -1 : index)}
              >
                <h3 className="font-heading text-lg font-extrabold tracking-[-0.03em] text-foreground sm:text-xl">
                  {item.question}
                </h3>
                <ChevronDown
                  aria-hidden="true"
                  className={cn(
                    "size-5 shrink-0 text-primary transition-transform duration-150 ease-out motion-reduce:transition-none",
                    isOpen && "rotate-180",
                  )}
                />
              </button>
              <div
                id={panelId}
                className={cn(
                  "grid overflow-hidden transition-[grid-template-rows,opacity] duration-200 ease-out motion-reduce:transition-none",
                  isOpen
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0",
                )}
              >
                <div className="min-h-0 overflow-hidden">
                  <p className="px-5 pb-5 leading-8 text-muted-foreground">
                    {item.answer}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </Section>
  );
}
