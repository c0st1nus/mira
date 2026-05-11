"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import type { LandingContent } from "@/lib/landing-content";

const targetDate = new Date("2026-05-18T00:00:00+05:00").getTime();

function getCountdown() {
  const diff = Math.max(0, targetDate - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
  };
}

type CountdownTime = ReturnType<typeof getCountdown>;

type CountdownTimerProps = {
  content: LandingContent;
};

export function CountdownTimer({ content }: CountdownTimerProps) {
  const [time, setTime] = useState<CountdownTime | null>(null);

  useEffect(() => {
    setTime(getCountdown());
    const interval = window.setInterval(() => setTime(getCountdown()), 60_000);

    return () => window.clearInterval(interval);
  }, []);

  const values = [
    { label: content.countdown.days, value: time?.days },
    { label: content.countdown.hours, value: time?.hours },
    { label: content.countdown.minutes, value: time?.minutes },
  ];

  return (
    <div className="soft-shadow rounded-[2rem] border border-border bg-card/95 p-5 sm:bg-card/90 sm:p-7 sm:backdrop-blur">
      <p className="mb-5 font-mono text-base font-semibold uppercase tracking-[0.14em] text-primary sm:text-lg">
        {content.countdown.label}
      </p>
      <div className="grid grid-cols-3 gap-3">
        {values.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-secondary/70 p-3 text-center"
          >
            <div className="font-mono text-3xl font-bold tracking-[-0.08em] text-foreground sm:text-5xl">
              {item.value === undefined
                ? "--"
                : String(item.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-muted-foreground">
              {item.label}
            </div>
          </div>
        ))}
      </div>
      <div className="mt-5 inline-flex min-h-10 items-center gap-2 rounded-full bg-brand-blue-soft px-4 text-sm font-semibold text-accent-foreground">
        <CalendarDays aria-hidden="true" className="size-4 text-primary" />
        {content.countdown.date}
      </div>
    </div>
  );
}
