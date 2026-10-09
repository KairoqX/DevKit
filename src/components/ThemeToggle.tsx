"use client";

import { useEffect, useState } from "react";
import { Moon, Sun } from "lucide-react";

// Switches between the light and dark theme. The theme is just a "dark" class on the <html>
// element; the colours for each theme are defined in globals.css.
// The first choice follows your device setting; after you click, your choice is remembered
// in this browser (see the Privacy page).
export default function ThemeToggle() {
  // null until the page has loaded in the browser, because the server can't know the theme.
  const [isDark, setIsDark] = useState<boolean | null>(null);

  useEffect(() => {
    setIsDark(document.documentElement.classList.contains("dark"));
  }, []);

  function toggle() {
    const next = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", next);
    setIsDark(next);
    try {
      localStorage.setItem("theme", next ? "dark" : "light");
    } catch {
      // Storage can be blocked (for example in private browsing). The theme still changes.
    }
  }

  return (
    <button
      type="button"
      onClick={toggle}
      aria-pressed={isDark === null ? undefined : isDark}
      aria-label="Dark theme"
      title="Toggle dark theme"
      className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-md border border-line bg-surface text-ink hover:bg-canvas"
    >
      {/* Both icons are in the page; CSS shows the right one, so there is no flash on load. */}
      <Moon size={18} aria-hidden className="dark:hidden" />
      <Sun size={18} aria-hidden className="hidden dark:block" />
    </button>
  );
}
