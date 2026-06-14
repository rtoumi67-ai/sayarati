"use client";

import { createInstance } from "i18next";
import { initReactI18next } from "react-i18next";

import ar from "../../locales/ar.json";
import en from "../../locales/en.json";
import fr from "../../locales/fr.json";
import { SUPPORTED_LANGUAGES, type AppLanguage } from "./shared";

export function ensureI18n(initialLanguage: AppLanguage) {
  const instance = createInstance();
  instance
    .use(initReactI18next)
    .init({
      resources: {
        ar: { translation: ar },
        en: { translation: en },
        fr: { translation: fr },
      },
      supportedLngs: [...SUPPORTED_LANGUAGES],
      fallbackLng: "ar",
      lng: initialLanguage,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
      initImmediate: false,
    })
    .catch(() => {});
  return instance;
}
