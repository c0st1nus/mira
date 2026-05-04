"use client";

import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

const themeKey = "mira-growth-hack-theme";

type ThemeMode = "light" | "dark";

function isTheme(value: string | null): value is ThemeMode {
  return value === "light" || value === "dark";
}

function applyTheme(theme: ThemeMode) {
  document.documentElement.classList.toggle("dark", theme === "dark");
  window.localStorage.setItem(themeKey, theme);
}

export function ThemeToggle() {
  const [theme, setTheme] = useState<ThemeMode | null>(null);

  useEffect(() => {
    const storedTheme = window.localStorage.getItem(themeKey);

    if (isTheme(storedTheme)) {
      setTheme(storedTheme);
      applyTheme(storedTheme);
      return;
    }

    if (window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark");
      applyTheme("dark");
      return;
    }

    setTheme("light");
    applyTheme("light");
  }, []);

  const activeTheme = theme ?? "light";

  return (
    <button
      type="button"
      aria-label={
        activeTheme === "dark"
          ? "Включить светлую тему"
          : "Включить темную тему"
      }
      className="inline-flex size-10 items-center justify-center rounded-full border border-border bg-card text-foreground transition-colors hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      onClick={() => {
        const nextTheme = activeTheme === "dark" ? "light" : "dark";

        setTheme(nextTheme);
        applyTheme(nextTheme);
      }}
    >
      {activeTheme === "dark" ? (
        <Sun aria-hidden="true" className="size-4" />
      ) : (
        <Moon aria-hidden="true" className="size-4" />
      )}
    </button>
  );
}
