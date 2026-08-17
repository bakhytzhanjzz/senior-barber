"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";

export function LocaleSwitcher({ locale, label }: { locale: Locale; label: string }) {
  const pathname = usePathname();
  const other: Locale = locale === "ru" ? "kk" : "ru";
  const rest = pathname.split("/").slice(2).join("/");
  const target = `/${other}${rest ? `/${rest}` : ""}`;

  return (
    <Link
      href={target}
      onClick={() => {
        document.cookie = `NEXT_LOCALE=${other};path=/;max-age=31536000`;
      }}
      className="font-mono text-xs tracking-[0.2em] text-ivory/70 hover:text-gold transition-colors"
    >
      {label}
    </Link>
  );
}
