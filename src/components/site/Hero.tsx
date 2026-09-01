import Link from "next/link";
import { headingFont, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function Hero({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section className="relative overflow-hidden">
      <div
        aria-hidden
        className="pointer-events-none absolute -top-40 right-[-10%] h-[560px] w-[560px] rounded-full opacity-20 blur-[120px]"
        style={{ background: "radial-gradient(circle, #8F99A3 0%, transparent 70%)" }}
      />
      <div className="relative mx-auto max-w-6xl px-5 pb-20 pt-16 sm:px-8 sm:pb-28 sm:pt-24">
        <div className="fade-up">
          <p className="font-mono text-[11px] uppercase tracking-[0.3em] text-ivory/55">
            {dict.hero.eyebrow}
          </p>
        </div>

        <h1
          className={`mt-8 max-w-3xl break-words ${headingFont(locale)} text-[clamp(1.75rem,8.2vw,4.4rem)] font-bold leading-[0.95] tracking-tight`}
        >
          <span
            className="fade-up foil-sweep bg-clip-text text-transparent [animation-delay:120ms]"
            style={{
              backgroundImage:
                "linear-gradient(100deg, #4A525C 0%, #EAEEF1 25%, #8F99A3 45%, #EAEEF1 65%, #4A525C 100%)",
            }}
          >
            {dict.hero.headline}
          </span>
          <br />
          <span className="fade-up text-ivory [animation-delay:220ms]">{dict.hero.headlineAccent}</span>
        </h1>

        <p className="fade-up mt-7 max-w-xl text-balance text-base leading-relaxed text-ivory/70 [animation-delay:320ms] sm:text-lg">
          {dict.hero.sub}
        </p>

        <div className="fade-up mt-9 flex flex-wrap items-center gap-4 [animation-delay:420ms]">
          <Link
            href={`/${locale}/booking`}
            className="rounded-full bg-steel px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-steel-bright"
          >
            {dict.hero.ctaPrimary}
          </Link>
          <a
            href="#services"
            className="rounded-full border border-ivory/20 px-7 py-3.5 font-mono text-sm uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:border-steel hover:text-steel"
          >
            {dict.hero.ctaSecondary}
          </a>
        </div>

        <div className="fade-up mt-16 flex flex-wrap gap-x-10 gap-y-6 border-t border-ink-line/70 pt-8 [animation-delay:520ms]">
          <div>
            <p className="font-display text-3xl font-bold text-steel">{dict.hero.stat1Value}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">
              {dict.hero.stat1Label}
            </p>
          </div>
          <div>
            <p className="font-display text-3xl font-bold text-steel">{dict.hero.stat2Value}</p>
            <p className="mt-1 font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">
              {dict.hero.stat2Label}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
