"use client";

import { useState } from "react";
import Link from "next/link";
import { Logo } from "./Logo";
import { LocaleSwitcher } from "./LocaleSwitcher";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function Header({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const [open, setOpen] = useState(false);

  const links = [
    { href: `#services`, label: dict.nav.services },
    { href: `#locations`, label: dict.nav.locations },
  ];

  return (
    <header className="sticky top-0 z-50 border-b border-ink-line/70 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-5 py-4 sm:px-8">
        <Link href={`/${locale}`} aria-label="Senior Barbershop">
          <Logo className="text-xl sm:text-2xl" />
        </Link>

        <nav className="hidden items-center gap-8 md:flex">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="font-mono text-xs uppercase tracking-[0.18em] text-ivory/70 transition-colors hover:text-gold"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="hidden items-center gap-6 md:flex">
          <LocaleSwitcher locale={locale} label={dict.nav.switchLocale} />
          <Link
            href={`/${locale}/booking`}
            className="rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-gold-bright"
          >
            {dict.nav.book}
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((v) => !v)}
          className="flex h-9 w-9 flex-col items-center justify-center gap-1.5 md:hidden"
          aria-label="Menu"
          aria-expanded={open}
        >
          <span className={`h-px w-6 bg-gold transition-transform ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
          <span className={`h-px w-6 bg-gold transition-transform ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-line/70 bg-ink px-5 pb-6 pt-2 md:hidden">
          <nav className="flex flex-col gap-4 py-4">
            {links.map((l) => (
              <a
                key={l.href}
                href={l.href}
                onClick={() => setOpen(false)}
                className="font-mono text-sm uppercase tracking-[0.18em] text-ivory/80"
              >
                {l.label}
              </a>
            ))}
          </nav>
          <div className="flex items-center justify-between border-t border-ink-line/70 pt-4">
            <LocaleSwitcher locale={locale} label={dict.nav.switchLocale} />
            <Link
              href={`/${locale}/booking`}
              className="rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink"
            >
              {dict.nav.book}
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
