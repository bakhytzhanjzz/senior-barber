import Link from "next/link";
import { headingFont, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function CTASection({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden border-t border-ink-line/70">
      <div
        aria-hidden
        className="pointer-events-none absolute left-1/2 top-0 h-full w-[900px] -translate-x-1/2 opacity-[0.12] blur-[100px]"
        style={{ background: "radial-gradient(circle, #C9A227 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-3xl px-5 py-20 text-center sm:px-8 sm:py-28">
        <h2 className={`${headingFont(locale)} text-3xl font-bold text-ivory sm:text-4xl`}>{dict.cta.title}</h2>
        <p className="mt-4 text-ivory/60">{dict.cta.subtitle}</p>
        <Link
          href={`/${locale}/booking`}
          className="mt-9 inline-block rounded-full bg-gold px-8 py-4 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-gold-bright"
        >
          {dict.cta.button}
        </Link>
      </div>
    </section>
  );
}
