"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "@/lib/ThemeProvider";

export function ThemeToggle({ lightNav }: { lightNav: boolean }) {
  const { theme, toggle } = useTheme();

  return (
    <button
      type="button"
      onClick={toggle}
      aria-label={theme === "dark" ? "Switch to light theme" : "Switch to dark theme"}
      className={`flex h-10 w-10 items-center justify-center rounded-full border transition-colors ${
        lightNav ? "border-black/15 text-ink hover:bg-black/5" : "border-white/15 text-white hover:bg-white/10"
      }`}
      data-cursor="link"
    >
      {theme === "dark" ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
    </button>
  );
}
