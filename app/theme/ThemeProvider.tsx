"use client";

import {
  createContext,
  type ReactNode,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

type ThemeMode = "light" | "dark";

type ThemeContextValue = {
  theme: ThemeMode;
  setTheme: (value: ThemeMode) => void;
  toggleTheme: () => void;
};

const STORAGE_KEY = "sayarati.theme";
const ThemeContext = createContext<ThemeContextValue | null>(null);

function isThemeMode(value: unknown): value is ThemeMode {
  return value === "light" || value === "dark";
}

function getSystemTheme(): ThemeMode {
  if (typeof window === "undefined") {
    return "light";
  }

  return window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";
}

function getStoredTheme(): ThemeMode | null {
  if (typeof window === "undefined") {
    return null;
  }

  try {
    const storedTheme = window.localStorage.getItem(STORAGE_KEY);
    return isThemeMode(storedTheme) ? storedTheme : null;
  } catch {
    return null;
  }
}

function applyTheme(theme: ThemeMode) {
  const root = document.documentElement;
  root.classList.toggle("dark", theme === "dark");
  root.setAttribute("data-theme", theme);
  root.style.colorScheme = theme;
}

function persistTheme(theme: ThemeMode) {
  try {
    window.localStorage.setItem(STORAGE_KEY, theme);
  } catch {
    // Ignore storage errors and keep the in-memory theme state in sync.
  }
}

export function useTheme() {
  const context = useContext(ThemeContext);

  if (!context) {
    throw new Error("useTheme must be used within ThemeProvider");
  }

  return context;
}

export default function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setThemeState] = useState<ThemeMode>(() => {
    if (typeof window === "undefined") {
      return "light";
    }

    const storedTheme = getStoredTheme();
    if (storedTheme) {
      return storedTheme;
    }

    return document.documentElement.classList.contains("dark") ? "dark" : getSystemTheme();
  });

  useEffect(() => {
    applyTheme(theme);
  }, [theme]);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const mediaQuery = window.matchMedia("(prefers-color-scheme: dark)");
    const syncWithSystemTheme = () => {
      if (getStoredTheme()) {
        return;
      }

      setThemeState(mediaQuery.matches ? "dark" : "light");
    };

    const syncWithStorage = (event: StorageEvent) => {
      if (event.key !== STORAGE_KEY) {
        return;
      }

      const nextTheme = isThemeMode(event.newValue) ? event.newValue : getSystemTheme();
      setThemeState((currentTheme) => (currentTheme === nextTheme ? currentTheme : nextTheme));
      applyTheme(nextTheme);
    };

    mediaQuery.addEventListener("change", syncWithSystemTheme);
    window.addEventListener("storage", syncWithStorage);

    return () => {
      mediaQuery.removeEventListener("change", syncWithSystemTheme);
      window.removeEventListener("storage", syncWithStorage);
    };
  }, []);

  const setTheme = useCallback((nextTheme: ThemeMode) => {
    applyTheme(nextTheme);
    setThemeState(nextTheme);
    persistTheme(nextTheme);
  }, []);

  const toggleTheme = useCallback(() => {
    setThemeState((currentTheme) => {
      const nextTheme = currentTheme === "dark" ? "light" : "dark";
      applyTheme(nextTheme);
      persistTheme(nextTheme);
      return nextTheme;
    });
  }, []);

  const value = useMemo<ThemeContextValue>(
    () => ({
      theme,
      setTheme,
      toggleTheme,
    }),
    [setTheme, theme, toggleTheme],
  );

  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>;
}
