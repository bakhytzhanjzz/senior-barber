import Link from "next/link";
import { locations } from "@/lib/data/locations";
import { formatKzPhoneDisplay } from "@/lib/format-phone";
import { SectionHeading } from "./ServicesMenu";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function LocationsGrid({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const location = locations[0];

  return (
    <section id="locations" className="mx-auto max-w-6xl scroll-mt-24 px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        locale={locale}
        eyebrow={dict.locations.eyebrow}
        title={dict.locations.title}
        subtitle={dict.locations.subtitle}
      />

      <div className="mt-12 flex flex-col justify-between gap-8 rounded-2xl border border-white/10 bg-ink-raised p-8 sm:flex-row sm:items-center sm:p-10">
        <div>
          {/* Always font-body: "Мәңгілік Ел" is a Kazakh place name even on the ru page,
              and Unbounded is missing several of its letters (see headingFont). */}
          <p className="font-body text-2xl font-semibold text-ivory">{location.address}</p>
          <p className="mt-2 text-sm text-ivory/55">
            {dict.locations.hoursLabel}: {location.hours[locale]}
          </p>
          <p className="mt-1 font-mono text-sm text-gold">{formatKzPhoneDisplay(location.whatsapp.slice(1))}</p>
        </div>

        <div className="flex flex-wrap gap-3">
          <Link
            href={`/${locale}/booking`}
            className="rounded-full bg-gold px-5 py-2.5 font-mono text-xs font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-gold-bright"
          >
            {dict.locations.bookLabel}
          </Link>

          <a
            href={`https://wa.me/${location.whatsapp}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ivory/20 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:border-gold hover:text-gold"
          >
            {dict.locations.whatsappLabel}
          </a>

          <a
            href={`tel:+${location.whatsapp}`}
            className="rounded-full border border-ivory/20 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:border-gold hover:text-gold"
          >
            {dict.locations.callLabel}
          </a>

          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(location.mapQuery)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-full border border-ivory/20 px-5 py-2.5 font-mono text-xs uppercase tracking-[0.14em] text-ivory/80 transition-colors hover:border-gold hover:text-gold"
          >
            {dict.locations.mapLabel}
          </a>
        </div>
      </div>
    </section>
  );
}
