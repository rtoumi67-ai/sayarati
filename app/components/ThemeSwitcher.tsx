"use client";

import { useSyncExternalStore } from "react";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "../theme/ThemeProvider";

function withThemeTransition(fn: () => void) {
  const root = document.documentElement;
  root.classList.add("theme-transition");
  window.setTimeout(() => {
    root.classList.remove("theme-transition");
  }, 260);
  fn();
}

function subscribeToClientReady() {
  return () => {};
}

export default function ThemeSwitcher({ className }: { className?: string }) {
  const mounted = useSyncExternalStore(subscribeToClientReady, () => true, () => false);

  if (!mounted) {
    return null;
  }

  return <ThemeSwitcherMounted className={className} />;
}

function ThemeSwitcherMounted({ className }: { className?: string }) {
  const { theme, setTheme, toggleTheme } = useTheme();
  const effective = theme === "dark" ? "dark" : "light";

  return (
    <div className={["inline-flex items-center", className ?? ""].join(" ")}>
      <button
        type="button"
        className="btn-secondary h-10 gap-2 rounded-full px-2.5"
        aria-label={effective === "dark" ? "Switch to light mode" : "Switch to dark mode"}
        aria-pressed={effective === "dark"}
        onClick={() => {
          withThemeTransition(() => toggleTheme());
        }}
      >
        <span
          className={[
            "inline-flex items-center rounded-full border p-0.5 transition",
            effective === "dark"
              ? "border-primary/20 bg-primary/10 text-primary"
              : "border-transparent bg-transparent text-muted",
          ].join(" ")}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full">
            <Moon className="h-4 w-4" aria-hidden />
          </span>
        </span>
        <span
          className={[
            "inline-flex items-center rounded-full border p-0.5 transition",
            effective === "light"
              ? "border-primary/20 bg-primary/10 text-primary"
              : "border-transparent bg-transparent text-muted",
          ].join(" ")}
        >
          <span className="inline-flex h-7 w-7 items-center justify-center rounded-full">
            <Sun className="h-4 w-4" aria-hidden />
          </span>
        </span>

        <span className="sr-only">Theme toggle</span>
      </button>

      <div className="hidden sm:flex sm:ml-2 sm:items-center sm:rounded-full sm:border sm:border-border sm:bg-card sm:p-1">
        {(["light", "dark"] as const).map((mode) => {
          const selected = theme === mode;
          return (
            <button
              key={mode}
              type="button"
              className={[
                "rounded-full px-3 py-1.5 text-xs font-semibold capitalize transition",
                selected ? "bg-primary text-primary-foreground shadow-sm" : "text-muted hover:text-foreground",
              ].join(" ")}
              onClick={() => {
                withThemeTransition(() => setTheme(mode));
              }}
            >
              {mode}
            </button>
          );
        })}
      </div>
    </div>
  );
}
