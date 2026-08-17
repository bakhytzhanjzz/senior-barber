"use client";

import { createClient } from "@/lib/supabase/client";
import { isSupabaseConfigured } from "@/lib/supabase/env";
import { minutesOfIso } from "./slots";

export type BookedRange = { startMin: number; endMin: number };

export async function fetchBookedRanges(locationId: string, dateIso: string): Promise<BookedRange[]> {
  const supabase = createClient();
  if (!supabase) return [];

  const dayStart = `${dateIso}T00:00:00+05:00`;
  const dayEnd = `${dateIso}T23:59:59+05:00`;

  const { data, error } = await supabase
    .from("bookings")
    .select("starts_at, ends_at")
    .eq("location_id", locationId)
    .neq("status", "cancelled")
    .gte("starts_at", dayStart)
    .lte("starts_at", dayEnd);

  if (error || !data) return [];

  return data.map((row) => ({
    startMin: minutesOfIso(row.starts_at),
    endMin: minutesOfIso(row.ends_at),
  }));
}

export type CreateBookingInput = {
  locationId: string;
  serviceId: string;
  customerName: string;
  customerPhone: string;
  note: string;
  startsAtIso: string;
  endsAtIso: string;
  locale: string;
};

export async function createBooking(
  input: CreateBookingInput
): Promise<{ ok: true; demo: boolean } | { ok: false; message: string }> {
  const supabase = createClient();

  if (!supabase) {
    // Demo mode: no Supabase project connected yet — simulate a successful booking.
    await new Promise((r) => setTimeout(r, 500));
    return { ok: true, demo: true };
  }

  const { error } = await supabase.from("bookings").insert({
    location_id: input.locationId,
    service_id: input.serviceId,
    customer_name: input.customerName,
    customer_phone: input.customerPhone,
    note: input.note || null,
    starts_at: input.startsAtIso,
    ends_at: input.endsAtIso,
    locale: input.locale,
    status: "pending",
  });

  if (error) return { ok: false, message: error.message };
  return { ok: true, demo: false };
}

export { isSupabaseConfigured };
