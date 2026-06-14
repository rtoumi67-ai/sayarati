export const SUPPORTED_LANGUAGES = ["ar", "en", "fr"] as const;
export type AppLanguage = (typeof SUPPORTED_LANGUAGES)[number];

export const LANGUAGE_COOKIE = "sayarati.lang";
export const LANGUAGE_STORAGE_KEY = "sayarati.lang";

export function normalizeAppLanguage(value: string | null | undefined): AppLanguage | null {
  if (!value) return null;
  if (value === "ar" || value === "en" || value === "fr") return value;
  return null;
}

export function getLanguageDir(lang: AppLanguage) {
  return lang === "ar" ? "rtl" : "ltr";
}

