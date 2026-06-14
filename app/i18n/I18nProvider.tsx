"use client";

import { type ReactNode, useEffect, useMemo, useState } from "react";
import { usePathname } from "next/navigation";
import { I18nextProvider, useTranslation } from "react-i18next";
import { ensureI18n } from "./i18n";
import {
  getLanguageDir,
  LANGUAGE_COOKIE,
  normalizeAppLanguage,
  type AppLanguage,
} from "./shared";

function I18nEffects({ children }: { children: ReactNode }) {
  const { t, i18n } = useTranslation();
  const pathname = usePathname();
  const [lang, setLang] = useState<AppLanguage>(() => {
    const l = (i18n.resolvedLanguage ?? i18n.language) as AppLanguage;
    return l === "ar" || l === "en" || l === "fr" ? l : "ar";
  });

  useEffect(() => {
    // Multilingual UX: react to language changes without reloading, and keep UI state consistent.
    const onChange = (lng: string) => {
      const next = (lng as AppLanguage) || "ar";
      setLang(next === "ar" || next === "en" || next === "fr" ? next : "ar");
    };
    i18n.on("languageChanged", onChange);
    return () => {
      i18n.off("languageChanged", onChange);
    };
  }, [i18n]);

  useEffect(() => {
    const maxAge = 60 * 60 * 24 * 365;
    document.cookie = `${LANGUAGE_COOKIE}=${lang}; path=/; max-age=${maxAge}; samesite=lax`;
  }, [lang]);

  useEffect(() => {
    // RTL/LTR: update the document direction and language attributes dynamically.
    const dir = getLanguageDir(lang);
    document.documentElement.lang = lang;
    document.documentElement.dir = dir;
  }, [lang]);

  useEffect(() => {
    // SEO/meta: update title + description to match the selected language (client-side).
    const key = getPageTitleKey(pathname);
    document.title = key ? t(key) : t("meta.title");

    const descValue = t("meta.description");
    const head = document.head;
    const el =
      head.querySelector('meta[name="description"]') ??
      (() => {
        const m = document.createElement("meta");
        m.setAttribute("name", "description");
        head.appendChild(m);
        return m;
      })();
    el.setAttribute("content", descValue);
  }, [lang, pathname, t]);

  return <>{children}</>;
}

function getPageTitleKey(pathname: string | null) {
  if (!pathname) return null;
  if (pathname === "/" || pathname.startsWith("/landing")) return "meta.pages.landing";
  if (pathname.startsWith("/choose-role")) return "meta.pages.chooseRole";
  if (pathname.startsWith("/auth/login")) return "meta.pages.login";
  if (pathname.startsWith("/auth/register")) return "meta.pages.register";
  if (pathname.startsWith("/customer/onboarding/car")) return "meta.pages.carInfo";
  if (pathname.startsWith("/customer/find")) return "meta.pages.customerFind";
  if (pathname.startsWith("/customer/request")) return "meta.pages.customerRequest";
  if (pathname.startsWith("/customer")) return "meta.pages.customer";
  if (pathname.startsWith("/mechanic/requests")) return "meta.pages.mechanicRequests";
  if (pathname.startsWith("/mechanic/earnings")) return "meta.pages.mechanicEarnings";
  if (pathname.startsWith("/mechanic")) return "meta.pages.mechanic";
  return null;
}

export default function I18nProvider({
  children,
  initialLanguage,
}: {
  children: ReactNode;
  initialLanguage: AppLanguage;
}) {
  const resolvedInitial = normalizeAppLanguage(initialLanguage) ?? "ar";
  const instance = useMemo(() => ensureI18n(resolvedInitial), [resolvedInitial]);

  return (
    <I18nextProvider i18n={instance}>
      <I18nEffects>{children}</I18nEffects>
    </I18nextProvider>
  );
}
