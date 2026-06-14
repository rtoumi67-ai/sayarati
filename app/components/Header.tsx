"use client";

import { useEffect, useMemo, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowRight, Menu, Sparkles, X } from "lucide-react";
import { getRole, isAuthed, type Role } from "./auth";
import { SITE } from "./site";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeSwitcher from "./ThemeSwitcher";

type NavItem = { href: string; label: string };
type AuthState = { role: Role | null; authed: boolean };

const HEADER_COPY = {
  navigation: "التنقل",
  menu: "القائمة",
  openMenu: "فتح القائمة",
  closeMenu: "إغلاق القائمة",
  skipToContent: "الانتقال إلى المحتوى",
  startNow: "ابدأ الآن",
  logout: "تسجيل الخروج",
  customer: "مالك سيارة",
  mechanic: "ميكانيكي",
  customerDashboard: "لوحتي",
  mechanicDashboard: "لوحة الميكانيكي",
  requests: "الطلبات",
  earnings: "الأرباح",
  nearbyMechanics: "الميكانيكيون القريبون",
  requestService: "طلب خدمة",
} as const;

const STATIC_NAV_ITEMS: NavItem[] = [
  { href: "/choose-role", label: "اختيار الدور" },
  { href: "/auth/login", label: "تسجيل الدخول" },
  { href: "/auth/register", label: "إنشاء حساب" },
];

function roleLabel(role: Role) {
  return role === "customer" ? HEADER_COPY.customer : HEADER_COPY.mechanic;
}

function getRoleShortcuts(role: Role | null): NavItem[] {
  if (role === "mechanic") {
    return [
      { href: "/mechanic", label: HEADER_COPY.mechanicDashboard },
      { href: "/mechanic/requests", label: HEADER_COPY.requests },
      { href: "/mechanic/earnings", label: HEADER_COPY.earnings },
    ];
  }

  if (role === "customer") {
    return [
      { href: "/customer", label: HEADER_COPY.customerDashboard },
      { href: "/customer/find", label: HEADER_COPY.nearbyMechanics },
      { href: "/customer/request", label: HEADER_COPY.requestService },
    ];
  }

  return [];
}

function readAuthState(): AuthState {
  return { role: getRole(), authed: isAuthed() };
}

export default function Header() {
  const router = useRouter();
  const pathname = usePathname();

  const [mounted, setMounted] = useState(false);
  const [open, setOpen] = useState(false);
  const [{ role, authed }, setAuthState] = useState<AuthState>({ role: null, authed: false });

  const effectiveRole = mounted ? role : null;
  const effectiveAuthed = mounted ? authed : false;
  const roleShortcuts = useMemo(
    () => (effectiveAuthed ? getRoleShortcuts(effectiveRole) : []),
    [effectiveAuthed, effectiveRole],
  );

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

  if (pathname === "/" || pathname === "/landing") {
    return null;
  }

  return (
    <header className="sticky top-0 z-50" data-pathname={pathname}>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[60] focus:rounded-2xl focus:bg-card focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:ring-1 focus:ring-border"
      >
        {HEADER_COPY.skipToContent}
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

            <nav className="hidden items-center gap-1 md:flex" aria-label={HEADER_COPY.navigation}>
            {STATIC_NAV_ITEMS.map((it) => (
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
              {roleShortcuts.map((it) => (
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

              <LanguageSwitcher />
              <ThemeSwitcher />

              {!effectiveAuthed ? (
                <Link href="/choose-role" className="btn-primary h-10 gap-2 px-4 text-sm">
                  <Sparkles className="h-4 w-4" aria-hidden />
                  {HEADER_COPY.startNow}
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
                  {HEADER_COPY.logout}
                  {effectiveRole ? ` (${roleLabel(effectiveRole)})` : ""}
                </button>
              )}
            </div>

            <button
              type="button"
              className="btn-secondary h-10 w-10 rounded-full md:hidden"
              aria-label={open ? HEADER_COPY.closeMenu : HEADER_COPY.openMenu}
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
                <nav className="flex flex-col gap-2" aria-label={HEADER_COPY.menu}>
                  <div className="mb-1 flex items-center justify-between">
                    <LanguageSwitcher />
                    <ThemeSwitcher />
                  </div>

                  {STATIC_NAV_ITEMS.map((it) => (
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

                  {roleShortcuts.map((it) => (
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
                      {HEADER_COPY.startNow}
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
                      {HEADER_COPY.logout}
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
