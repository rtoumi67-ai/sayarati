"use client";

import { ArrowLeft, Menu, X } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

type NavItem = {
  href: string;
  label: string;
};

export default function LandingMobileMenu({ navItems }: { navItems: NavItem[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-slate-200/80 bg-white/80 text-slate-950 backdrop-blur-xl lg:hidden dark:border-white/10 dark:bg-white/5 dark:text-white"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {menuOpen ? (
        <div className="mt-3 rounded-[28px] border border-slate-200/80 bg-white/85 p-4 shadow-[0_22px_60px_-34px_rgba(15,23,42,0.22)] backdrop-blur-2xl dark:border-white/10 dark:bg-slate-950/80 lg:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-slate-600 transition hover:bg-sky-50 hover:text-slate-950 dark:text-slate-300 dark:hover:bg-white/5 dark:hover:text-white"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/choose-role"
              className="mt-2 inline-flex h-11 items-center justify-center gap-2 rounded-full bg-sky-600 px-5 text-sm font-semibold text-white transition hover:bg-sky-500 dark:bg-sky-500 dark:hover:bg-sky-400"
              onClick={() => setMenuOpen(false)}
            >
              ابدأ الآن
              <ArrowLeft className="h-4 w-4" aria-hidden />
            </Link>
          </nav>
        </div>
      ) : null}
    </>
  );
}
