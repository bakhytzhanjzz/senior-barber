const ASTANA_OFFSET = "+05:00";
const STEP_MIN = 30;

export type Slot = { startIso: string; endIso: string; label: string };
export type DayOption = { dateStr: string; day: number; weekdayIdx: number; monthIdx: number };

function pad(n: number) {
  return n.toString().padStart(2, "0");
}

function minutesToIso(dateStr: string, minutes: number) {
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return `${dateStr}T${pad(h)}:${pad(m)}:00${ASTANA_OFFSET}`;
}

/** "Noon UTC" trick: do calendar math on a date string without any local-timezone drift. */
function toUtcNoon(dateStr: string): Date {
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d, 12, 0, 0));
}

function fromUtcNoon(date: Date): string {
  return `${date.getUTCFullYear()}-${pad(date.getUTCMonth() + 1)}-${pad(date.getUTCDate())}`;
}

export function addDays(dateStr: string, n: number): string {
  const d = toUtcNoon(dateStr);
  d.setUTCDate(d.getUTCDate() + n);
  return fromUtcNoon(d);
}

/** Today's calendar date and minutes-of-day, read in Asia/Almaty regardless of visitor timezone. */
export function nowInAstana() {
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Almaty",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(new Date());
  const get = (type: string) => parts.find((p) => p.type === type)?.value ?? "0";
  return {
    dateStr: `${get("year")}-${get("month")}-${get("day")}`,
    minutes: Number(get("hour")) * 60 + Number(get("minute")),
  };
}

export function dayOption(dateStr: string): DayOption {
  const d = toUtcNoon(dateStr);
  const day = d.getUTCDate();
  const monthIdx = d.getUTCMonth();
  const weekdayIdx = (d.getUTCDay() + 6) % 7; // Monday = 0
  return { dateStr, day, weekdayIdx, monthIdx };
}

export function nextDays(count: number): DayOption[] {
  const { dateStr: today } = nowInAstana();
  return Array.from({ length: count }, (_, i) => dayOption(addDays(today, i)));
}

export function generateDaySlots(
  dateStr: string,
  durationMin: number,
  openMin: number,
  closeMin: number,
  bookedRanges: { startMin: number; endMin: number }[]
): Slot[] {
  const { dateStr: todayStr, minutes: nowMin } = nowInAstana();
  const isToday = dateStr === todayStr;

  const slots: Slot[] = [];
  for (let start = openMin; start + durationMin <= closeMin; start += STEP_MIN) {
    if (isToday && start <= nowMin + 20) continue; // short buffer before "now"

    const end = start + durationMin;
    const overlaps = bookedRanges.some((b) => start < b.endMin && end > b.startMin);
    if (overlaps) continue;

    slots.push({
      startIso: minutesToIso(dateStr, start),
      endIso: minutesToIso(dateStr, end),
      label: `${pad(Math.floor(start / 60))}:${pad(start % 60)}`,
    });
  }
  return slots;
}

export function minutesOfIso(iso: string): number {
  const d = new Date(iso);
  const parts = new Intl.DateTimeFormat("en-GB", {
    timeZone: "Asia/Almaty",
    hour: "2-digit",
    minute: "2-digit",
    hourCycle: "h23",
  }).formatToParts(d);
  const get = (type: string) => Number(parts.find((p) => p.type === type)?.value ?? 0);
  return get("hour") * 60 + get("minute");
}
