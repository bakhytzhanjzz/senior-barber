"use client";

import { useEffect, useMemo, useRef, useState, useTransition } from "react";
import Link from "next/link";
import { locations } from "@/lib/data/locations";
import { services } from "@/lib/data/services";
import { addDays, dayOption, generateDaySlots, nowInAstana, type Slot } from "@/lib/booking/slots";
import { createBooking, fetchBookedRanges, isSupabaseConfigured } from "@/lib/booking/queries";
import { KZ_PHONE_DIGITS, formatKzPhoneDisplay, parseKzPhoneInput } from "@/lib/format-phone";
import { headingFont, type Locale } from "@/lib/i18n/config";
import type { Dictionary } from "@/lib/i18n/dictionary";

const DAYS_AHEAD = 10;

type Props = { locale: Locale; dict: Dictionary };

const location = locations[0];

export function BookingWizard({ locale, dict }: Props) {
  const [step, setStep] = useState(0);
  const [serviceId, setServiceId] = useState<string | null>(null);
  const [dateStr, setDateStr] = useState(() => nowInAstana().dateStr);
  const [slot, setSlot] = useState<Slot | null>(null);

  const [name, setName] = useState("");
  const [phoneDigits, setPhoneDigits] = useState("");
  const [note, setNote] = useState("");

  const [slots, setSlots] = useState<Slot[]>([]);
  const [loadingSlots, startSlotsTransition] = useTransition();
  const slotsRequestId = useRef(0);
  const [submitting, setSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState(false);
  const [result, setResult] = useState<"idle" | "success" | "demo">("idle");

  const service = services.find((s) => s.id === serviceId) ?? null;
  const days = useMemo(() => Array.from({ length: DAYS_AHEAD }, (_, i) => dayOption(addDays(nowInAstana().dateStr, i))), []);

  useEffect(() => {
    if (!service || step !== 1) return;
    const requestId = ++slotsRequestId.current;

    startSlotsTransition(async () => {
      const booked = await fetchBookedRanges(location.id, dateStr);
      if (slotsRequestId.current !== requestId) return;
      setSlot(null);
      setSlots(generateDaySlots(dateStr, service.durationMin, location.openMin, location.closeMin, booked));
    });
  }, [service, dateStr, step]);

  async function handleSubmit() {
    if (!service || !slot || !name.trim() || phoneDigits.length < KZ_PHONE_DIGITS) return;
    setSubmitting(true);
    setSubmitError(false);

    const res = await createBooking({
      locationId: location.id,
      serviceId: service.id,
      customerName: name.trim(),
      customerPhone: formatKzPhoneDisplay(phoneDigits),
      note,
      startsAtIso: slot.startIso,
      endsAtIso: slot.endIso,
      locale,
    });

    setSubmitting(false);
    if (!res.ok) {
      setSubmitError(true);
      return;
    }
    setResult(res.demo ? "demo" : "success");
  }

  if (result !== "idle") {
    return (
      <div className="mx-auto max-w-lg px-5 py-24 text-center sm:px-8">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border border-steel/50 text-2xl text-steel">
          ✓
        </div>
        <h1 className={`mt-8 ${headingFont(locale)} text-3xl font-bold text-ivory`}>{dict.booking.successTitle}</h1>
        <p className="mt-4 text-ivory/65">{dict.booking.successBody}</p>

        {result === "demo" && (
          <p className="mt-6 rounded-xl border border-steel/25 bg-steel/5 px-4 py-3 font-mono text-xs uppercase tracking-[0.1em] text-steel/80">
            Demo mode — Supabase не подключён, запись не сохранена
          </p>
        )}

        {service && (
          <div className="mt-8 rounded-2xl border border-white/10 bg-ink-raised p-6 text-left">
            <SummaryRow label={dict.booking.addressLabel} value={location.address} />
            <SummaryRow label={dict.booking.steps.service} value={service.name[locale]} />
            <SummaryRow label={dict.booking.steps.time} value={slot?.label ?? ""} />
          </div>
        )}

        <Link
          href={`/${locale}`}
          className="mt-10 inline-block rounded-full bg-steel px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.03] hover:bg-steel-bright"
        >
          {dict.booking.successBack}
        </Link>
      </div>
    );
  }

  const stepLabels = [dict.booking.steps.service, dict.booking.steps.time, dict.booking.steps.contact];

  return (
    <div className="mx-auto max-w-2xl px-5 py-16 sm:px-8 sm:py-20">
      <p className="font-mono text-xs uppercase tracking-[0.3em] text-steel">{dict.booking.title}</p>
      <h1 className={`mt-4 ${headingFont(locale)} text-3xl font-bold text-ivory sm:text-4xl`}>{dict.booking.subtitle}</h1>

      <ol className="mt-10 flex flex-wrap gap-x-6 gap-y-3">
        {stepLabels.map((label, i) => (
          <li
            key={label}
            className={`flex items-center gap-2 font-mono text-xs uppercase tracking-[0.12em] ${
              i === step ? "text-steel" : i < step ? "text-ivory/60" : "text-ivory/25"
            }`}
          >
            <span
              className={`flex h-6 w-6 items-center justify-center rounded-full border text-[10px] ${
                i <= step ? "border-steel text-steel" : "border-ivory/25"
              }`}
            >
              {String(i + 1).padStart(2, "0")}
            </span>
            {label}
          </li>
        ))}
      </ol>

      <div className="mt-10">
        {step === 0 && (
          <div className="divide-y divide-white/10 overflow-hidden rounded-2xl border border-white/10 bg-ink-raised">
            {services.map((s) => (
              <button
                key={s.id}
                type="button"
                onClick={() => {
                  setServiceId(s.id);
                  setStep(1);
                }}
                className={`grid w-full grid-cols-[1fr_auto_auto] items-center gap-4 px-6 py-5 text-left transition-colors hover:bg-white/[0.04] ${
                  serviceId === s.id ? "bg-steel/5" : ""
                }`}
              >
                <span className={`${headingFont(locale)} text-lg font-medium text-ivory`}>{s.name[locale]}</span>
                <span className="hidden font-mono text-xs uppercase tracking-[0.1em] text-ivory/50 sm:block">
                  {s.durationMin} {dict.services.durationUnit}
                </span>
                <span className="justify-self-end font-mono text-base font-medium text-steel">
                  {s.price.toLocaleString("ru-RU")} {dict.booking.tenge}
                </span>
              </button>
            ))}
          </div>
        )}

        {step === 1 && (
          <div>
            <p className="font-mono text-xs uppercase tracking-[0.2em] text-ivory/50">{dict.booking.chooseDate}</p>
            <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
              {days.map((d) => (
                <button
                  key={d.dateStr}
                  type="button"
                  onClick={() => setDateStr(d.dateStr)}
                  className={`flex shrink-0 flex-col items-center rounded-xl border px-4 py-3 transition-colors ${
                    dateStr === d.dateStr ? "border-steel bg-steel/10 text-steel" : "border-white/10 text-ivory/70 hover:border-steel/40"
                  }`}
                >
                  <span className="font-mono text-[10px] uppercase tracking-[0.1em]">
                    {dict.booking.weekdaysShort[d.weekdayIdx]}
                  </span>
                  <span className="mt-1 font-display text-lg font-semibold">{d.day}</span>
                </button>
              ))}
            </div>

            <p className="mt-8 font-mono text-xs uppercase tracking-[0.2em] text-ivory/50">{dict.booking.chooseTime}</p>
            <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
              {loadingSlots &&
                Array.from({ length: 8 }).map((_, i) => (
                  <div key={i} className="h-11 animate-pulse rounded-xl bg-white/5" />
                ))}
              {!loadingSlots && slots.length === 0 && (
                <p className="col-span-full rounded-xl border border-white/10 bg-ink-raised px-4 py-6 text-center text-sm text-ivory/50">
                  {dict.booking.noSlots}
                </p>
              )}
              {!loadingSlots &&
                slots.map((s) => (
                  <button
                    key={s.startIso}
                    type="button"
                    onClick={() => {
                      setSlot(s);
                      setStep(2);
                    }}
                    className={`rounded-xl border px-3 py-2.5 font-mono text-sm transition-colors ${
                      slot?.startIso === s.startIso
                        ? "border-steel bg-steel/10 text-steel"
                        : "border-white/10 text-ivory/80 hover:border-steel/40"
                    }`}
                  >
                    {s.label}
                  </button>
                ))}
            </div>
          </div>
        )}

        {step === 2 && service && slot && (
          <div className="grid gap-8 sm:grid-cols-[1fr_1.1fr]">
            <div className="rounded-2xl border border-white/10 bg-ink-raised p-6">
              <p className="font-mono text-xs uppercase tracking-[0.2em] text-steel/80">{dict.booking.summaryTitle}</p>
              <div className="mt-4 space-y-3">
                <SummaryRow label={dict.booking.addressLabel} value={location.address} />
                <SummaryRow label={dict.booking.steps.service} value={service.name[locale]} />
                <SummaryRow
                  label={dict.booking.steps.time}
                  value={`${dayOption(dateStr).day} ${dict.booking.months[dayOption(dateStr).monthIdx]}, ${slot.label}`}
                />
                <SummaryRow label={dict.booking.priceLabel} value={`${service.price.toLocaleString("ru-RU")} ${dict.booking.tenge}`} />
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSubmit();
              }}
              className="space-y-4"
            >
              <Field label={dict.booking.nameLabel}>
                <input
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={dict.booking.namePlaceholder}
                  className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-ivory placeholder:text-ivory/30 outline-none focus:border-steel"
                />
              </Field>
              <Field label={dict.booking.phoneLabel}>
                <input
                  required
                  type="tel"
                  inputMode="numeric"
                  value={formatKzPhoneDisplay(phoneDigits)}
                  onChange={(e) => setPhoneDigits(parseKzPhoneInput(e.target.value))}
                  onFocus={(e) => {
                    const el = e.currentTarget;
                    requestAnimationFrame(() => el.setSelectionRange(el.value.length, el.value.length));
                  }}
                  className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 font-mono text-ivory outline-none focus:border-steel"
                />
              </Field>
              <Field label={dict.booking.commentLabel}>
                <textarea
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  placeholder={dict.booking.commentPlaceholder}
                  rows={3}
                  className="w-full rounded-xl border border-white/15 bg-ink px-4 py-3 text-ivory placeholder:text-ivory/30 outline-none focus:border-steel"
                />
              </Field>

              {submitError && (
                <p className="rounded-xl border border-oxblood-bright/40 bg-oxblood/10 px-4 py-3 text-sm text-oxblood-bright">
                  {dict.booking.errorTitle} — {dict.booking.errorBody}
                </p>
              )}

              <button
                type="submit"
                disabled={submitting || !name.trim() || phoneDigits.length < KZ_PHONE_DIGITS}
                className="w-full rounded-full bg-steel px-7 py-3.5 font-mono text-sm font-medium uppercase tracking-[0.14em] text-ink transition-transform hover:scale-[1.02] hover:bg-steel-bright disabled:opacity-40 disabled:hover:scale-100"
              >
                {submitting ? dict.booking.submitting : dict.booking.submit}
              </button>
              {!isSupabaseConfigured && (
                <p className="text-center font-mono text-[10px] uppercase tracking-[0.1em] text-ivory/30">
                  Demo mode: Supabase не подключён
                </p>
              )}
            </form>
          </div>
        )}
      </div>

      {step > 0 && (
        <button
          type="button"
          onClick={() => setStep((s) => Math.max(0, s - 1))}
          className="mt-10 font-mono text-xs uppercase tracking-[0.16em] text-ivory/50 hover:text-steel"
        >
          ← {dict.booking.back}
        </button>
      )}
    </div>
  );
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <span className="mb-1.5 block font-mono text-xs uppercase tracking-[0.14em] text-ivory/50">{label}</span>
      {children}
    </label>
  );
}

function SummaryRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-baseline justify-between gap-4">
      <span className="font-mono text-xs uppercase tracking-[0.1em] text-ivory/45">{label}</span>
      <span className="text-right text-sm text-ivory">{value}</span>
    </div>
  );
}
