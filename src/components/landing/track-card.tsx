"use client";

import { ArrowUpRight } from "lucide-react";
import { useState } from "react";

type TrackCardProps = {
  title: string;
  label: string;
  description: string;
  index: number;
  mechanicLabel: string;
  closeLabel: string;
  srLabel: string;
};

export function TrackCard({
  title,
  label,
  description,
  index,
  mechanicLabel,
  closeLabel,
  srLabel,
}: TrackCardProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <button
      type="button"
      aria-expanded={isOpen}
      data-open={isOpen}
      className="flip-card min-h-72 w-full rounded-[2rem] text-left focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={() => setIsOpen((value) => !value)}
    >
      <span className="sr-only">
        {srLabel} {title}
      </span>
      <span className="flip-card-inner relative block min-h-72 rounded-[2rem]">
        <span className="flip-card-face absolute inset-0 flex flex-col justify-between rounded-[2rem] border border-border bg-card p-6 soft-shadow">
          <span className="flex items-start justify-between gap-4">
            <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary">
              {String(index + 1).padStart(2, "0")} / {label}
            </span>
            <span className="flex size-10 items-center justify-center rounded-full bg-brand-blue-soft text-primary">
              <ArrowUpRight aria-hidden="true" className="size-5" />
            </span>
          </span>
          <span className="font-heading text-3xl font-extrabold leading-tight tracking-[-0.05em] text-foreground">
            {title}
          </span>
        </span>

        <span className="flip-card-face flip-card-back absolute inset-0 flex flex-col justify-between rounded-[2rem] border border-primary/20 bg-primary p-6 text-primary-foreground soft-shadow">
          <span className="font-mono text-xs font-semibold uppercase tracking-[0.24em] text-primary-foreground/78">
            {mechanicLabel}
          </span>
          <span className="text-lg font-semibold leading-8">{description}</span>
          <span className="text-sm font-semibold text-primary-foreground/78">
            {closeLabel}
          </span>
        </span>
      </span>
    </button>
  );
}
