/**
 * Time-zone helpers for the demo booking (browser Intl only, no date library). Calendar days are plain
 * "YYYY-MM-DD" strings so a day never shifts when the time zone changes.
 */

export const browserTimeZone = () => {
  try {
    return Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC";
  } catch {
    return "UTC";
  }
};

export const allTimeZones = (): string[] => {
  try {
    return Intl.supportedValuesOf("timeZone");
  } catch {
    return [browserTimeZone()];
  }
};

function part(date: Date, timeZone: string, style: "long" | "short", locale = "en-US") {
  return new Intl.DateTimeFormat(locale, { timeZone, timeZoneName: style })
    .formatToParts(date)
    .find((p) => p.type === "timeZoneName")?.value;
}

/** "GMT+5:30" */
export function gmtOffsetLabel(timeZone: string, at = new Date()) {
  const offset = part(at, timeZone, "short", "en-GB") ?? "GMT";
  return offset === "UTC" ? "GMT" : offset.replace(/^UTC/, "GMT");
}

/** "India Standard Time (IST)", "Central European Summer Time (CEST)" — falls back to the GMT offset. */
export function timeZoneLabel(timeZone: string, at = new Date()) {
  const long = part(at, timeZone, "long") ?? timeZone;
  const abbr = [part(at, timeZone, "short"), part(at, timeZone, "short", "en-IN")].find((a) => a && !/^(GMT|UTC)/.test(a));
  return `${long} (${abbr ?? gmtOffsetLabel(timeZone, at)})`;
}

/** "Asia/Kolkata" → "Kolkata", "America/Argentina/Buenos_Aires" → "Buenos Aires". */
export const timeZoneCity = (timeZone: string) => timeZone.split("/").pop()!.replace(/_/g, " ");

/** Today's calendar day in a time zone, as "YYYY-MM-DD". */
export function todayIn(timeZone: string, now = new Date()) {
  return new Intl.DateTimeFormat("en-CA", { timeZone, year: "numeric", month: "2-digit", day: "2-digit" }).format(now);
}

/** Minutes the zone is ahead of UTC at a given instant. */
function offsetMinutes(timeZone: string, at: number) {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-US", {
      timeZone,
      hourCycle: "h23",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    })
      .formatToParts(new Date(at))
      .map((x) => [x.type, x.value])
  );
  const wall = Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute, +p.second);
  return Math.round((wall - at) / 60_000);
}

/** The instant a wall-clock time ("2026-09-30", "09:30") happens in a time zone. */
export function zonedTime(day: string, time: string, timeZone: string) {
  const [y, m, d] = day.split("-").map(Number);
  const [hh, mm] = time.split(":").map(Number);
  const guess = Date.UTC(y, m - 1, d, hh, mm);
  const first = guess - offsetMinutes(timeZone, guess) * 60_000;
  // Second pass settles days where the offset changes (DST).
  return new Date(guess - offsetMinutes(timeZone, first) * 60_000);
}

/** "10:30 AM" in the given time zone. */
export const formatSlotTime = (iso: string, timeZone: string) =>
  new Intl.DateTimeFormat("en-US", { timeZone, hour: "2-digit", minute: "2-digit", hour12: true }).format(new Date(iso));

/** Day helpers on "YYYY-MM-DD" strings (UTC arithmetic, so no zone can shift them). */
export const parseDay = (day: string) => {
  const [y, m, d] = day.split("-").map(Number);
  return new Date(Date.UTC(y, m - 1, d));
};
export const toDay = (date: Date) => date.toISOString().slice(0, 10);
export const addDays = (day: string, n: number) => toDay(new Date(parseDay(day).getTime() + n * 86_400_000));
export const weekday = (day: string) => parseDay(day).getUTCDay();

/** "Tue, 30 Sep 2026" by default (en-US names, so it's "Sep" not "Sept"), or any Intl options. */
export function formatDay(day: string, options?: Intl.DateTimeFormatOptions) {
  const date = parseDay(day);
  if (options) return new Intl.DateTimeFormat("en-GB", { ...options, timeZone: "UTC" }).format(date);
  const get = (o: Intl.DateTimeFormatOptions) => new Intl.DateTimeFormat("en-US", { ...o, timeZone: "UTC" }).format(date);
  return `${get({ weekday: "short" })}, ${date.getUTCDate()} ${get({ month: "short" })} ${date.getUTCFullYear()}`;
}
