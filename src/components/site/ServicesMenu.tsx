import Link from "next/link";
import { services } from "@/lib/data/services";
import { headingFont, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function ServicesMenu({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  return (
    <section id="services" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        locale={locale}
        eyebrow={dict.services.eyebrow}
        title={dict.services.title}
        subtitle={dict.services.subtitle}
      />

      <div className="mt-12 divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-ink-raised">
        {services.map((s) => (
          <div
            key={s.id}
            className={`group grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-1.5 px-6 py-5 transition-colors hover:bg-white/[0.04] sm:grid-cols-[1fr_auto_auto] ${
              s.featured ? "bg-gold/[0.06]" : ""
            }`}
          >
            <p
              className={`${headingFont(locale)} text-lg font-medium text-ivory transition-colors group-hover:text-gold sm:text-xl`}
            >
              {s.name[locale]}
            </p>
            <p className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ivory/50 sm:block">
              {s.durationMin} {dict.services.durationUnit}
            </p>
            <p className="justify-self-end font-mono text-base font-medium text-gold">
              {s.price.toLocaleString("ru-RU")} {dict.booking.tenge}
            </p>
            {s.note && (
              <p className="col-span-full text-sm text-ivory/55 sm:col-span-2">{s.note[locale]}</p>
            )}
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link
          href={`/${locale}/booking`}
          className="rounded-full bg-gold px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-gold-bright"
        >
          {dict.services.cta}
        </Link>
      </div>
    </section>
  );
}

export function SectionHeading({
  locale,
  eyebrow,
  title,
  subtitle,
}: {
  locale: Locale;
  eyebrow: string;
  title: string;
  subtitle: string;
}) {
  return (
    <div className="max-w-xl">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-gold">{eyebrow}</p>
      <h2 className={`mt-4 ${headingFont(locale)} text-3xl font-bold text-ivory sm:text-4xl`}>{title}</h2>
      <p className="mt-4 text-ivory/60">{subtitle}</p>
    </div>
  );
}
