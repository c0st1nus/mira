"use client";

import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";
import type { LandingContent } from "@/lib/landing-content";

const targetDate = new Date("2026-05-12T00:00:00+05:00").getTime();

function getCountdown() {
  const diff = Math.max(0, targetDate - Date.now());

  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

type CountdownTimerProps = {
  content: LandingContent;
};

export function CountdownTimer({ content }: CountdownTimerProps) {
  const [time, setTime] = useState(getCountdown);

  useEffect(() => {
    const interval = window.setInterval(() => setTime(getCountdown()), 1000);

    return () => window.clearInterval(interval);
  }, []);

  const values = [
    { label: content.countdown.days, value: time.days },
    { label: content.countdown.hours, value: time.hours },
    { label: content.countdown.minutes, value: time.minutes },
    { label: content.countdown.seconds, value: time.seconds },
  ];

  return (
    <div className="soft-shadow rounded-[2rem] border border-border bg-card/90 p-5 backdrop-blur sm:p-7">
      <p className="mb-5 font-mono text-xs font-semibold uppercase tracking-[0.28em] text-primary">
        {content.countdown.label}
      </p>
      <div className="grid grid-cols-2 gap-3 min-[420px]:grid-cols-4">
        {values.map((item) => (
          <div
            key={item.label}
            className="rounded-2xl bg-secondary/70 p-3 text-center"
          >
            <div className="font-mono text-3xl font-bold tracking-[-0.08em] text-foreground sm:text-5xl">
              {String(item.value).padStart(2, "0")}
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
