var theme;
var prefersDark;

try {
  theme = window.localStorage.getItem("mira-growth-hack-theme");
  prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

  if (theme === "dark" || (!theme && prefersDark)) {
    document.documentElement.classList.add("dark");
  }
} catch (_) {}
