import { redirect } from "next/navigation";
import Link from "next/link";
import { Logo } from "@/components/site/Logo";
import { createClient } from "@/lib/supabase/server";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { locations } from "@/lib/data/locations";
import { signOut, updateBookingStatus } from "./actions";
import type { BookingStatus } from "@/lib/supabase/types";

const STATUS_LABEL: Record<BookingStatus, string> = {
  pending: "Ожидает",
  confirmed: "Подтверждена",
  cancelled: "Отменена",
  completed: "Завершена",
  no_show: "Не пришёл",
};

const STATUS_TONE: Record<BookingStatus, string> = {
  pending: "border-gold/40 text-gold",
  confirmed: "border-emerald-400/40 text-emerald-300",
  cancelled: "border-white/15 text-ivory/40",
  completed: "border-white/15 text-ivory/50",
  no_show: "border-oxblood-bright/40 text-oxblood-bright",
};

const NEXT_ACTIONS: Partial<Record<BookingStatus, { status: BookingStatus; label: string }[]>> = {
  pending: [
    { status: "confirmed", label: "Подтвердить" },
    { status: "cancelled", label: "Отменить" },
  ],
  confirmed: [
    { status: "completed", label: "Завершить" },
    { status: "no_show", label: "Не пришёл" },
    { status: "cancelled", label: "Отменить" },
  ],
};

type BookingRow = {
  id: string;
  starts_at: string;
  customer_name: string;
  customer_phone: string;
  note: string | null;
  status: BookingStatus;
  locations: { address: string; district: string } | null;
  services: { name_ru: string; duration_min: number } | null;
};

function recentCutoffIso() {
  return new Date(Date.now() - 1000 * 60 * 60 * 6).toISOString();
}

type BookingRowView = { booking: BookingRow; dateLabel: string; timeLabel: string; showDateHeader: boolean };

function groupByDate(bookings: BookingRow[]): BookingRowView[] {
  return bookings.reduce<BookingRowView[]>((rows, booking) => {
    const date = new Date(booking.starts_at);
    const dateLabel = date.toLocaleDateString("ru-RU", {
      timeZone: "Asia/Almaty",
      day: "2-digit",
      month: "long",
      weekday: "short",
    });
    const timeLabel = date.toLocaleTimeString("ru-RU", {
      timeZone: "Asia/Almaty",
      hour: "2-digit",
      minute: "2-digit",
    });
    const showDateHeader = rows.length === 0 || rows[rows.length - 1].dateLabel !== dateLabel;
    rows.push({ booking, dateLabel, timeLabel, showDateHeader });
    return rows;
  }, []);
}

export default async function AdminDashboard({
  searchParams,
}: {
  searchParams: Promise<{ location?: string }>;
}) {
  if (!isSupabaseConfigured) {
    return (
      <div className="flex min-h-screen items-center justify-center px-5">
        <div className="w-full max-w-md rounded-2xl border border-gold/25 bg-gold/5 p-8 text-center">
          <div className="flex justify-center">
            <Logo className="text-2xl" />
          </div>
          <p className="mt-6 font-mono text-xs uppercase tracking-[0.14em] text-gold">Supabase не подключён</p>
          <p className="mt-3 text-sm leading-relaxed text-ivory/70">
            Панель бронирований появится, как только сайт будет подключён к вашему проекту Supabase (см.{" "}
            <code className="text-gold">supabase/schema.sql</code> и README).
          </p>
        </div>
      </div>
    );
  }

  const supabase = await createClient();
  const {
    data: { user },
  } = (await supabase!.auth.getUser()) ?? { data: { user: null } };
  if (!user) redirect("/admin/login");

  const { data: staff } = await supabase!.from("staff").select("*").eq("user_id", user.id).maybeSingle();
  const { location: locationSlug } = await searchParams;

  const fixedLocationId = staff?.location_id ?? null;
  const filterLocation = fixedLocationId
    ? locations.find((l) => l.id === fixedLocationId)
    : locations.find((l) => l.slug === locationSlug);

  let query = supabase!
    .from("bookings")
    .select("id, starts_at, customer_name, customer_phone, note, status, locations(address,district), services(name_ru,duration_min)")
    .gte("starts_at", recentCutoffIso())
    .order("starts_at", { ascending: true })
    .limit(100);

  if (fixedLocationId) query = query.eq("location_id", fixedLocationId);
  else if (filterLocation) query = query.eq("location_id", filterLocation.id);

  const { data } = await query;
  const bookings = (data ?? []) as unknown as BookingRow[];
  const rows = groupByDate(bookings);

  return (
    <div>
      <header className="flex items-center justify-between border-b border-ink-line/70 px-5 py-4 sm:px-8">
        <div className="flex items-center gap-3">
          <Logo className="text-base" withLabel={false} />
          <span className="font-mono text-xs uppercase tracking-[0.16em] text-ivory/50">Панель персонала</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden font-mono text-xs text-ivory/50 sm:inline">{staff?.full_name ?? user.email}</span>
          <form action={signOut}>
            <button type="submit" className="font-mono text-xs uppercase tracking-[0.14em] text-ivory/50 hover:text-gold">
              Выйти
            </button>
          </form>
        </div>
      </header>

      <div className="px-5 py-8 sm:px-8">
        {!fixedLocationId && locations.length > 1 && (
          <div className="flex flex-wrap gap-2">
            <Link
              href="/admin"
              className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] ${
                !filterLocation ? "border-gold text-gold" : "border-white/15 text-ivory/60 hover:border-gold/40"
              }`}
            >
              Все точки
            </Link>
            {locations.map((l) => (
              <Link
                key={l.id}
                href={`/admin?location=${l.slug}`}
                className={`rounded-full border px-4 py-2 font-mono text-xs uppercase tracking-[0.1em] ${
                  filterLocation?.id === l.id ? "border-gold text-gold" : "border-white/15 text-ivory/60 hover:border-gold/40"
                }`}
              >
                {l.address}
              </Link>
            ))}
          </div>
        )}

        <div className="mt-8 overflow-hidden rounded-2xl border border-white/10">
          {bookings.length === 0 && (
            <p className="bg-ink-raised px-6 py-10 text-center text-sm text-ivory/50">
              Записей пока нет — ссылка на онлайн-запись появится на сайте.
            </p>
          )}

          {rows.map(({ booking: b, dateLabel, timeLabel, showDateHeader }) => {
            return (
              <div key={b.id}>
                {showDateHeader && (
                  <div className="border-t border-white/10 bg-white/[0.03] px-6 py-2 font-mono text-xs uppercase tracking-[0.14em] text-gold/80 first:border-t-0">
                    {dateLabel}
                  </div>
                )}
                <div className="grid grid-cols-1 items-center gap-3 border-t border-white/10 bg-ink-raised px-6 py-4 first:border-t-0 sm:grid-cols-[80px_1fr_auto_auto]">
                  <p className="font-mono text-lg text-gold">{timeLabel}</p>
                  <div>
                    <p className="font-body text-base font-semibold text-ivory">{b.customer_name}</p>
                    <p className="mt-0.5 text-sm text-ivory/55">
                      {b.services?.name_ru} · {b.customer_phone}
                      {!fixedLocationId && b.locations ? ` · ${b.locations.address}` : ""}
                    </p>
                    {b.note && <p className="mt-0.5 text-xs text-ivory/40">«{b.note}»</p>}
                  </div>
                  <span className={`w-fit rounded-full border px-3 py-1 font-mono text-[11px] uppercase tracking-[0.08em] ${STATUS_TONE[b.status]}`}>
                    {STATUS_LABEL[b.status]}
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {(NEXT_ACTIONS[b.status] ?? []).map((action) => (
                      <form key={action.status} action={updateBookingStatus}>
                        <input type="hidden" name="id" value={b.id} />
                        <input type="hidden" name="status" value={action.status} />
                        <button
                          type="submit"
                          className="rounded-full border border-white/15 px-3 py-1.5 font-mono text-[11px] uppercase tracking-[0.08em] text-ivory/70 hover:border-gold hover:text-gold"
                        >
                          {action.label}
                        </button>
                      </form>
                    ))}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
