"use client";

import { useTheme } from "@/context/theme";
import { Moon, Sun } from "lucide-react";
import { useMemo } from "react";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  const icon = useMemo(
    () =>
      theme === "dark" ? (
        <Sun className="h-4 w-4" />
      ) : (
        <Moon className="h-4 w-4" />
      ),
    [theme]
  );

  return (
    <button
      onClick={toggleTheme}
      aria-label="Toggle theme"
      className="inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-3 py-2 text-xs font-semibold text-foreground shadow-sm backdrop-blur transition hover:shadow-md"
    >
      {icon}
      <span className="hidden sm:inline">{theme === "dark" ? "Light" : "Dark"} mode</span>
    </button>
  );
}
