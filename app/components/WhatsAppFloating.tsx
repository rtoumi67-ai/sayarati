"use client";

import { useMemo } from "react";
import { useTranslation } from "react-i18next";
import { SITE } from "./site";

function normalizePhone(phone: string) {
  // WhatsApp uses international digits only
  const digits = phone.replace(/[^\d]/g, "");
  return digits.startsWith("0") ? digits.slice(1) : digits;
}

export default function WhatsAppFloating() {
  const { t, i18n } = useTranslation();
  const phone = normalizePhone(SITE.phone);
  const href = phone ? `https://wa.me/${phone}` : "https://wa.me/";
  const lang = useMemo(() => (i18n.resolvedLanguage ?? i18n.language) || "ar", [i18n.language, i18n.resolvedLanguage]);
  const isRtl = lang === "ar";

  return (
    <a
      href={href}
      target="_blank"
      rel="noreferrer"
      className={["fixed bottom-6 z-50", isRtl ? "right-6" : "left-6"].join(" ")}
      aria-label={t("whatsapp.aria")}
      title={t("whatsapp.title")}
    >
      <span className="group neon-border neon-ring animate-glow inline-flex h-14 w-14 items-center justify-center rounded-2xl border border-border bg-card text-foreground shadow-lg backdrop-blur-xl transition duration-200 ease-out hover:-translate-y-1">
        <span className="text-sm font-semibold tracking-wide">WA</span>
      </span>
    </a>
  );
}
