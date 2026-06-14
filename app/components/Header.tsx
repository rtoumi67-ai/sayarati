"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import type { TFunction } from "i18next";
import { useTranslation } from "react-i18next";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { getRole, isAuthed, type Role } from "./auth";
import { SITE } from "./site";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

type NavItem = { href: string; label: string };
type AuthState = { role: Role | null; authed: boolean };

function roleLabel(role: Role, t: TFunction) {
  return role === "customer" ? t("roles.customer") : t("roles.mechanic");
}

function readAuthState(): AuthState {
  return { role: getRole(), authed: isAuthed() };
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();
  const { t } = useTranslation();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [{ role, authed }, setAuthState] = useState<AuthState>({ role: null, authed: false });

  const effectiveRole = mounted ? role : null;
  const effectiveAuthed = mounted ? authed : false;

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const sync = () => {
      setAuthState((prev) => {
        const next = readAuthState();
        if (prev.role === next.role && prev.authed === next.authed) return prev;
        return next;
      });
    };

    sync();

    const onStorage = () => sync();
    const onFocus = () => sync();

    window.addEventListener("storage", onStorage);
    window.addEventListener("focus", onFocus);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener("focus", onFocus);
    };
  }, []);

  useEffect(() => {
    if (!open) return;

    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [open]);

  const items: NavItem[] = useMemo(() => {
    if (!effectiveAuthed) {
      return [
        { href: "/choose-role", label: t("nav.chooseRole") },
        { href: "/auth/login", label: t("nav.login") },
        { href: "/auth/register", label: t("nav.register") },
      ];
    }

    if (effectiveRole === "mechanic") {
      return [
        { href: "/mechanic", label: t("nav.dashboard") },
        { href: "/mechanic/requests", label: t("nav.requests") },
        { href: "/mechanic/earnings", label: t("nav.earnings") },
      ];
    }

    return [
      { href: "/customer", label: t("nav.dashboard") },
      { href: "/customer/find", label: t("nav.nearbyMechanic") },
      { href: "/customer/request", label: t("nav.requestService") },
    ];
  }, [effectiveAuthed, effectiveRole, t]);

  if (pathname === "/" || pathname === "/landing") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50" data-pathname={pathname}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-2xl focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:ring-1 focus:ring-border"
      >
        Skip to content
      </a>

      <div className="container-app py-4">
        <div className="rounded-full border border-border/70 bg-card/80 px-4 shadow-[0_24px_70px_-42px_var(--shadow-ambient-strong)] backdrop-blur-2xl">
          <div className="flex h-16 items-center justify-between gap-3">
            <Link href="/" className="flex items-center gap-3 font-semibold">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-sm text-primary shadow-[0_14px_36px_-20px_var(--glow-primary)]">
                س
              </span>

              <span className="leading-none">
                <span className="block text-[11px] font-medium uppercase tracking-[0.28em] text-muted">
                  Premium automotive OS
                </span>
                <span className="mt-1 block text-base tracking-[0.08em] text-foreground">{SITE.nameEn}</span>
              </span>
            </Link>

            <nav className="hidden items-center gap-1 md:flex" aria-label={t("nav.navigation")}>
            {items.map((it) => (
              <Link
                key={it.href}
                href={it.href}
                className={[
                  "rounded-full px-4 py-2 text-sm font-medium transition duration-200 ease-out",
                  pathname?.startsWith(it.href)
                    ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                    : "text-muted hover:bg-card-2 hover:text-foreground",
                ].join(" ")}
              >
                {it.label}
              </Link>
            ))}
            </nav>

            <div className="hidden items-center gap-2 md:flex">
              <LanguageSwitcher />
              <ThemeSwitcher />

              {!effectiveAuthed ? (
                <Link href="/choose-role" className="btn-primary h-10 gap-2 px-4 text-sm">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {t("nav.startNow")}
                  <ArrowRight className="h-4 w-4" aria-hidden />
                </Link>
              ) : (
                <button
                  type="button"
                  className="btn-secondary h-10 px-4 text-sm"
                  onClick={() => {
                    router.replace("/choose-role");
                  }}
                >
                  {t("nav.logout")}
                  {effectiveRole ? ` (${roleLabel(effectiveRole, t)})` : ""}
                </button>
              )}
            </div>

            <button
              type="button"
              className="btn-secondary h-10 w-10 rounded-full md:hidden"
              aria-label={t("nav.openMenu")}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
            >
              {open ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
            </button>
          </div>
        </div>
      </div>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-overlay/40 backdrop-blur-sm md:hidden"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          />

          <div className="fixed left-0 right-0 top-16 z-50 md:hidden">
            <div className="container-app py-3">
              <div className="rounded-[28px] border border-border/70 bg-card/88 p-4 shadow-[0_28px_80px_-44px_var(--shadow-ambient-strong)] backdrop-blur-2xl">
                <nav className="flex flex-col gap-2" aria-label={t("nav.menu")}>
                  <div className="mb-1 flex items-center justify-between">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                  </div>

                  {items.map((it) => (
                    <Link
                      key={it.href}
                      href={it.href}
                      className={[
                        "rounded-2xl px-4 py-3 text-sm font-semibold transition duration-200 ease-out",
                        pathname?.startsWith(it.href)
                          ? "bg-primary/10 text-primary ring-1 ring-primary/20"
                          : "text-muted hover:bg-card-2 hover:text-foreground",
                      ].join(" ")}
                      onClick={() => setOpen(false)}
                    >
                      {it.label}
                    </Link>
                  ))}

                  {!effectiveAuthed ? (
                    <Link
                      href="/choose-role"
                      className="btn-primary neon-ring mt-2 h-11 gap-2 rounded-2xl px-4 text-sm"
                      onClick={() => setOpen(false)}
                    >
                      <Sparkles className="h-4 w-4" aria-hidden />
                      {t("nav.startNow")}
                      <ArrowRight className="h-4 w-4" aria-hidden />
                    </Link>
                  ) : (
                    <button
                      type="button"
                      className="btn-secondary mt-2 h-11 rounded-2xl px-4 text-sm"
                      onClick={() => {
                        setOpen(false);
                        router.replace("/choose-role");
                      }}
                    >
                      {t("nav.logout")}
                    </button>
                  )}
                </nav>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
}
