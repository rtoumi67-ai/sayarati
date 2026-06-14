"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  getLanguageDir,
  LANGUAGE_COOKIE,
  SUPPORTED_LANGUAGES,
  type AppLanguage,
} from "../i18n/shared";

const LANGS: Array<{ code: AppLanguage; flag: string }> = [
  { code: "ar", flag: "🇸🇦" },
  { code: "en", flag: "🇺🇸" },
  { code: "fr", flag: "🇫🇷" },
];

export default function LanguageSwitcher({ className }: { className?: string }) {
  const { i18n, t } = useTranslation();
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement | null>(null);

  const lang = useMemo(() => {
    const l = (i18n.resolvedLanguage ?? i18n.language) as AppLanguage;
    return SUPPORTED_LANGUAGES.includes(l) ? l : "ar";
  }, [i18n.language, i18n.resolvedLanguage]);

  const dir = getLanguageDir(lang);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  useEffect(() => {
    const onPointerDown = (e: PointerEvent) => {
      if (!open) return;
      const el = ref.current;
      if (!el) return;
      if (e.target instanceof Node && el.contains(e.target)) return;
      setOpen(false);
    };
    window.addEventListener("pointerdown", onPointerDown);
    return () => window.removeEventListener("pointerdown", onPointerDown);
  }, [open]);

  const current = LANGS.find((x) => x.code === lang) ?? LANGS[0];

  return (
    <div ref={ref} className={["relative", className ?? ""].join(" ")}>
      {/* Multilingual UI: language button + animated dropdown */}
      <button
        type="button"
        className="btn-secondary h-10 gap-2 rounded-full px-3 text-sm"
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="text-base leading-none">{current.flag}</span>
        <span className="font-semibold">{t(`language.${current.code}`)}</span>
        <span className="text-muted">▾</span>
      </button>

      <div
        className={[
          "absolute top-full z-50 mt-2 min-w-[180px]",
          dir === "rtl" ? "left-0" : "right-0",
          open ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0",
          "transition duration-200 ease-out",
        ].join(" ")}
      >
        <div
          className={[
            "glass-panel neon-border overflow-hidden rounded-2xl p-1",
            open ? "translate-y-0 scale-100" : "-translate-y-1 scale-[0.98]",
            "origin-top transition duration-200 ease-out",
          ].join(" ")}
          role="menu"
        >
          {LANGS.map((x) => (
            <button
              key={x.code}
              type="button"
              className={[
                "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-sm transition",
                x.code === lang
                  ? "bg-card-2/70 text-foreground"
                  : "text-muted hover:bg-card-2 hover:text-foreground",
              ].join(" ")}
              onClick={() => {
                const maxAge = 60 * 60 * 24 * 365;
                document.cookie = `${LANGUAGE_COOKIE}=${x.code}; path=/; max-age=${maxAge}; samesite=lax`;
                i18n.changeLanguage(x.code).catch(() => {});
                setOpen(false);
              }}
              role="menuitem"
            >
              <span className="text-base leading-none">{x.flag}</span>
              <span className="font-semibold">{t(`language.${x.code}`)}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
