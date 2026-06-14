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
        className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border bg-card text-foreground lg:hidden"
        aria-label="Open menu"
        aria-expanded={menuOpen}
        onClick={() => setMenuOpen((value) => !value)}
      >
        {menuOpen ? <X className="h-5 w-5" aria-hidden /> : <Menu className="h-5 w-5" aria-hidden />}
      </button>

      {menuOpen ? (
        <div className="card mt-3 p-4 lg:hidden">
          <nav className="grid gap-2">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-2xl px-4 py-3 text-sm font-semibold text-muted transition hover:bg-card-2 hover:text-foreground"
                onClick={() => setMenuOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href="/choose-role"
              className="btn-primary mt-2 h-11 justify-center text-sm"
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
