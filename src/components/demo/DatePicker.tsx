"use client";

import { useEffect, useRef, useState, type KeyboardEvent } from "react";
import { CalendarDays, ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { Popover } from "@/components/ui/Popover";
import { addDays, formatDay, parseDay, toDay, weekday } from "@/lib/timezone";
import { cn } from "@/lib/utils";

const WEEKDAYS = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];

const monthOf = (day: string) => day.slice(0, 7);
const shiftMonth = (month: string, n: number) => {
  const d = parseDay(`${month}-01`);
  d.setUTCMonth(d.getUTCMonth() + n);
  return toDay(d).slice(0, 7);
};

/**
 * Compact date field ("Tue, 30 Sep 2026 ▾") that opens a month calendar in a popover. Days outside
 * [min, max] are disabled. Keyboard: arrows move by day/week, PageUp/PageDown by month, Enter picks,
 * Esc closes.
 */
export function DatePicker({
  id,
  value,
  min,
  max,
  onChange,
  describedBy,
}: {
  id: string;
  value: string;
  min: string;
  max: string;
  onChange: (day: string) => void;
  describedBy?: string;
}) {
  const button = useRef<HTMLButtonElement>(null);
  const grid = useRef<HTMLDivElement>(null);
  const [open, setOpen] = useState(false);
  const [focused, setFocused] = useState(value);
  const [month, setMonth] = useState(monthOf(value));

  const clamp = (day: string) => (day < min ? min : day > max ? max : day);

  const show = () => {
    setFocused(value);
    setMonth(monthOf(value));
    setOpen(true);
  };
  const close = (refocus = true) => {
    setOpen(false);
    if (refocus) button.current?.focus();
  };
  const pick = (day: string) => {
    onChange(day);
    close();
  };

  // Move keyboard focus to the highlighted day whenever it changes.
  useEffect(() => {
    if (open) grid.current?.querySelector<HTMLButtonElement>(`[data-day="${focused}"]`)?.focus({ preventScroll: true });
  }, [open, focused, month]);

  const moveFocus = (day: string) => {
    const next = clamp(day);
    setFocused(next);
    setMonth(monthOf(next));
  };

  const onGridKey = (event: KeyboardEvent) => {
    const step: Record<string, number> = { ArrowLeft: -1, ArrowRight: 1, ArrowUp: -7, ArrowDown: 7 };
    if (event.key in step) {
      event.preventDefault();
      moveFocus(addDays(focused, step[event.key]));
    } else if (event.key === "PageUp" || event.key === "PageDown") {
      event.preventDefault();
      const d = parseDay(focused);
      d.setUTCMonth(d.getUTCMonth() + (event.key === "PageUp" ? -1 : 1));
      moveFocus(toDay(d));
    } else if (event.key === "Home" || event.key === "End") {
      event.preventDefault();
      const offset = (weekday(focused) + 6) % 7;
      moveFocus(addDays(focused, event.key === "Home" ? -offset : 6 - offset));
    }
  };

  // Monday-first grid for `month`, padded with blanks.
  const first = `${month}-01`;
  const lead = (weekday(first) + 6) % 7;
  const days: (string | null)[] = Array.from({ length: lead }, () => null);
  for (let day = first; monthOf(day) === month; day = addDays(day, 1)) days.push(day);

  // Roving tab stop: the highlighted day, or the first bookable day when browsing another month.
  const tabDay = days.includes(focused) ? focused : days.find((day) => day && day >= min && day <= max);

  const canPrev = shiftMonth(month, -1) >= monthOf(min);
  const canNext = shiftMonth(month, 1) <= monthOf(max);
  const monthLabel = formatDay(first, { month: "long", year: "numeric" });

  return (
    <>
      <button
        ref={button}
        id={id}
        type="button"
        aria-haspopup="dialog"
        aria-expanded={open}
        aria-describedby={describedBy}
        onClick={() => (open ? close() : show())}
        onKeyDown={(e) => {
          if (!open && e.key === "ArrowDown") {
            e.preventDefault();
            show();
          }
        }}
        className={cn(
          "flex h-11 w-full items-center gap-3 lg:h-10 short:h-9 rounded-lg border bg-white px-3.5 text-left text-[15px] text-brand-text outline-none transition-colors hover:border-brand-purple/50 focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30",
          open ? "border-brand-purple ring-2 ring-brand-purple/30" : "border-brand-border"
        )}
      >
        <CalendarDays className="size-5 shrink-0 text-brand-purple" aria-hidden />
        <span className="min-w-0 flex-1 truncate">{formatDay(value)}</span>
        <ChevronDown className={cn("size-4 shrink-0 text-brand-text transition-transform", open && "rotate-180")} aria-hidden />
      </button>

      {open && (
        <Popover anchorRef={button} onDismiss={() => close(false)} matchWidth={false} className="w-[19rem] p-3">
          <div
            role="dialog"
            aria-label="Choose a date"
            className="flex min-h-0 flex-col"
            onKeyDown={(e) => {
              if (e.key === "Escape") {
                e.preventDefault();
                e.stopPropagation(); // close the calendar, not the modal
                close();
              } else if (e.key === "Tab") {
                // The calendar is portalled, so hand focus back to the field before the browser moves
                // it; Tab then continues through the form from there.
                close();
              }
            }}
          >
            <div className="mb-2 flex items-center justify-between">
              <button
                type="button"
                onClick={() => setMonth(shiftMonth(month, -1))}
                disabled={!canPrev}
                aria-label="Previous month"
                className="flex size-8 items-center justify-center rounded-lg text-brand-text outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/40 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronLeft className="size-4" aria-hidden />
              </button>
              <p className="text-sm font-semibold text-brand-text" aria-live="polite">
                {monthLabel}
              </p>
              <button
                type="button"
                onClick={() => setMonth(shiftMonth(month, 1))}
                disabled={!canNext}
                aria-label="Next month"
                className="flex size-8 items-center justify-center rounded-lg text-brand-text outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/40 disabled:opacity-30 disabled:hover:bg-transparent"
              >
                <ChevronRight className="size-4" aria-hidden />
              </button>
            </div>

            <div role="grid" aria-label={monthLabel} ref={grid} onKeyDown={onGridKey} className="grid grid-cols-7 gap-0.5">
              {WEEKDAYS.map((name) => (
                <span key={name} role="columnheader" className="pb-1 text-center text-xs font-medium text-brand-muted">
                  {name}
                </span>
              ))}
              {days.map((day, index) =>
                day ? (
                  <button
                    key={day}
                    type="button"
                    role="gridcell"
                    data-day={day}
                    tabIndex={day === tabDay ? 0 : -1}
                    disabled={day < min || day > max}
                    aria-selected={day === value}
                    aria-label={formatDay(day, { weekday: "long", day: "numeric", month: "long", year: "numeric" })}
                    onClick={() => pick(day)}
                    onFocus={() => setFocused(day)}
                    className={cn(
                      "flex h-9 items-center justify-center rounded-lg text-sm tabular-nums outline-none transition-colors",
                      "focus-visible:ring-2 focus-visible:ring-brand-purple/50 disabled:cursor-not-allowed disabled:text-brand-muted/40",
                      day === value
                        ? "bg-brand-purple font-semibold text-white"
                        : "text-brand-text enabled:hover:bg-brand-purple-light",
                      day === min && day !== value && "font-semibold text-brand-purple"
                    )}
                  >
                    {Number(day.slice(8))}
                  </button>
                ) : (
                  <span key={`blank-${index}`} aria-hidden />
                )
              )}
            </div>
          </div>
        </Popover>
      )}
    </>
  );
}
