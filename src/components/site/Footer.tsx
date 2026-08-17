import Link from "next/link";
import { Logo } from "./Logo";
import { locations } from "@/lib/data/locations";
import { formatKzPhoneDisplay } from "@/lib/format-phone";
import type { Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

export function Footer({ locale, dict }: { locale: Locale; dict: Dictionary }) {
  const location = locations[0];

  return (
    <footer className="border-t border-ink-line/70 bg-ink">
      <div className="mx-auto max-w-6xl px-5 py-14 sm:px-8">
        <div className="grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <Logo className="text-xl" />
            <p className="mt-4 font-mono text-xs uppercase tracking-[0.16em] text-ivory/45">
              {dict.footer.tagline}
            </p>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold/80">{dict.nav.locations}</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li>{location.address}</li>
              <li>{location.hours[locale]}</li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold/80">{dict.nav.services}</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li>
                <a href="#services" className="hover:text-gold">
                  {dict.services.title}
                </a>
              </li>
              <li>
                <Link href={`/${locale}/booking`} className="hover:text-gold">
                  {dict.nav.book}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-gold/80">{dict.locations.callLabel}</p>
            <ul className="mt-4 space-y-2 text-sm text-ivory/70">
              <li>
                <a href={`tel:+${location.whatsapp}`} className="hover:text-gold">
                  {formatKzPhoneDisplay(location.whatsapp.slice(1))}
                </a>
              </li>
              <li>
                <a
                  href={`https://wa.me/${location.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-gold"
                >
                  {dict.locations.whatsappLabel}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 flex flex-col items-start justify-between gap-4 border-t border-ink-line/70 pt-6 sm:flex-row sm:items-center">
          <p className="font-mono text-[11px] uppercase tracking-[0.14em] text-ivory/35">
            © {new Date().getFullYear()} Senior Barbershop. {dict.footer.rights}
          </p>
          <Link
            href="/admin"
            className="font-mono text-[11px] uppercase tracking-[0.14em] text-ivory/35 hover:text-gold"
          >
            {dict.footer.admin}
          </Link>
        </div>
      </div>
    </footer>
  );
}
