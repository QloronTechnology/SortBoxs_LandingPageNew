import type { Priority } from "../shared";

export const policies: Record<Priority, { response: number; resolution: number }> = {
  Urgent: { response: 15, resolution: 4 * 60 },
  High: { response: 60, resolution: 8 * 60 },
  Normal: { response: 4 * 60, resolution: 24 * 60 },
  Low: { response: 8 * 60, resolution: 72 * 60 },
};

export function formatMinutes(total: number) {
  if (total < 60) return `${total} min`;
  const hours = total / 60;
  return hours >= 24 && hours % 24 === 0 ? `${hours / 24} day${hours / 24 > 1 ? "s" : ""}` : `${Number.isInteger(hours) ? hours : hours.toFixed(1)} h`;
}

const DAYS = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const OPEN = 9 * 60;
const CLOSE = 18 * 60;

/** A ticket created on Friday at 16:30. Returns when it falls due, counting every hour or only 9:00–18:00 Monday to Friday. */
export function dueTime(minutes: number, businessHoursOnly: boolean) {
  let day = 4; // Friday
  let minute = 16 * 60 + 30;
  let left = minutes;
  if (!businessHoursOnly) {
    const total = minute + left;
    day = (day + Math.floor(total / 1440)) % 7;
    minute = total % 1440;
  } else {
    while (left > 0) {
      const working = day < 5;
      if (!working || minute >= CLOSE) {
        day = (day + 1) % 7;
        minute = OPEN;
        continue;
      }
      if (minute < OPEN) minute = OPEN;
      const room = CLOSE - minute;
      const used = Math.min(room, left);
      minute += used;
      left -= used;
      if (left > 0) {
        day = (day + 1) % 7;
        minute = OPEN;
      }
    }
  }
  const hh = String(Math.floor(minute / 60)).padStart(2, "0");
  const mm = String(minute % 60).padStart(2, "0");
  return `${DAYS[day]} ${hh}:${mm}`;
}
