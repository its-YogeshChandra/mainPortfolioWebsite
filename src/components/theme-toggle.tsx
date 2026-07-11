"use client";

import { Moon, Sun } from "lucide-react";
import { useTheme } from "./theme-provider";

export function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();
  const isDark = theme === "dark";

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? "light" : "dark"} mode`}
      className="flex h-10 w-10 items-center justify-center rounded-full transition-colors hover:bg-[#f5f5f5] dark:hover:bg-[#262626]"
    >
      {isDark ? (
        <Sun className="h-5 w-5 text-[#f5f5f5]" strokeWidth={1.8} />
      ) : (
        <Moon className="h-5 w-5 text-[#171717]" strokeWidth={1.8} />
      )}
    </button>
  );
}
