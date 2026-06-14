"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useTranslation } from "react-i18next";
import { Instagram, Linkedin, Mail, MapPin, Phone, Twitter } from "lucide-react";
import { SITE } from "./site";

export default function Footer() {
  const { t } = useTranslation();
  const pathname = usePathname();
  const year = new Date().getUTCFullYear();

  if (
    pathname === "/" ||
    pathname === "/landing" ||
    pathname === "/choose-role" ||
    pathname.startsWith("/auth/")
  ) {
    return null;
  }

  return (
    <footer className="mt-20 border-t border-border/70">
      <div className="container-app py-12">
        <div className="rounded-[36px] border border-border/70 bg-card p-8 shadow-[0_28px_90px_-54px_var(--shadow-ambient-strong)] backdrop-blur-xl sm:p-10">
          <div className="grid gap-10 lg:grid-cols-12">
            <div className="space-y-5 lg:col-span-5">
              <div className="flex items-center gap-3 font-semibold">
                <span className="inline-flex h-12 w-12 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-[0_14px_36px_-20px_var(--glow-primary)]">
                  س
                </span>
                <div className="leading-none">
                  <div className="text-[11px] font-medium uppercase tracking-[0.26em] text-muted">
                    Automotive technology platform
                  </div>
                  <div className="mt-1 text-lg">{SITE.nameEn}</div>
                </div>
              </div>
              <p className="max-w-md text-sm leading-8 text-muted">{t("footer.about")}</p>

              <div className="flex flex-wrap items-center gap-2 pt-1">
                <a
                  className="btn-secondary h-10 w-10 rounded-2xl p-0"
                  href="https://x.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="X"
                  title="X"
                >
                  <Twitter className="h-4 w-4" aria-hidden />
                </a>
                <a
                  className="btn-secondary h-10 w-10 rounded-2xl p-0"
                  href="https://www.instagram.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="Instagram"
                  title="Instagram"
                >
                  <Instagram className="h-4 w-4" aria-hidden />
                </a>
                <a
                  className="btn-secondary h-10 w-10 rounded-2xl p-0"
                  href="https://www.linkedin.com/"
                  target="_blank"
                  rel="noreferrer"
                  aria-label="LinkedIn"
                  title="LinkedIn"
                >
                  <Linkedin className="h-4 w-4" aria-hidden />
                </a>
              </div>
            </div>

            <div className="grid gap-10 sm:grid-cols-2 lg:col-span-7 lg:grid-cols-3">
              <div className="space-y-3 text-sm">
                <h3 className="font-semibold text-foreground">{t("footer.linksTitle")}</h3>
                <div className="flex flex-col gap-3 text-muted">
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/landing#services">
                    {t("footer.services")}
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/landing#faq">
                    {t("footer.faq")}
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/privacy">
                    {t("footer.privacy")}
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/terms">
                    {t("footer.terms")}
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/assistant">
                    AI Assistant
                  </Link>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <h3 className="font-semibold text-foreground">Platform</h3>
                <div className="flex flex-col gap-3 text-muted">
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/parts">
                    Parts
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/garages">
                    Garages
                  </Link>
                  <Link className="hover:text-foreground hover:underline underline-offset-4" href="/dashboard">
                    Dashboard
                  </Link>
                </div>
              </div>

              <div className="space-y-3 text-sm">
                <h3 className="font-semibold text-foreground">{t("footer.contactTitle")}</h3>
                <div className="space-y-3 text-muted">
                  <div className="flex items-start gap-3">
                    <Mail className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <a className="hover:text-foreground hover:underline underline-offset-4" href={`mailto:${SITE.email}`}>
                      {SITE.email}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <Phone className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <a className="hover:text-foreground hover:underline underline-offset-4" href={`tel:${SITE.phone}`}>
                      {SITE.phone}
                    </a>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="mt-0.5 h-4 w-4 text-primary" aria-hidden />
                    <div className="text-sm">{t("site.city")}</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-3 border-t border-border/70 pt-6 text-xs text-muted sm:flex-row sm:items-center sm:justify-between">
            <p>{t("footer.rights", { year })}</p>
            <p>{t("footer.responsive")}</p>
          </div>
        </div>
      </div>
    </footer>
  );
}
