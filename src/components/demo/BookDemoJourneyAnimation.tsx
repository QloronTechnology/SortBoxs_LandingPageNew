"use client";

import { useEffect, useLayoutEffect, useRef, useState, useSyncExternalStore, type ReactNode } from "react";
import { ArrowRight, CalendarDays, Check, ChevronDown, Clock, Globe, LoaderCircle, Mail, Search, ShieldCheck, X } from "lucide-react";
import Image from "next/image";
import { MouseCursor } from "@/components/dashboard/MouseCursor";
import { bookDemoNextSteps } from "@/data/bookDemo";
import { delay, SuccessIllustration } from "./BookDemoSuccess";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";

/**
 * Decorative, looping miniature of the real Book a Demo form (same layout as the right-hand column),
 * filled in by the same <MouseCursor> finger as the home-page journey demos: it opens the date picker
 * and picks a day, clicks a slot, fills in the details, ticks modules in "Interested In", clicks
 * Book My Demo and lands on the success state. Purely visual (aria-hidden): fixed fictional data, no
 * API, not connected to the real form.
 *
 * The form is drawn on a fixed virtual canvas (like PricingHeroDashboard) and scaled to the card width.
 * The timer pauses while the tab is hidden; with prefers-reduced-motion it shows the filled form, still.
 */

// Virtual canvas. The mini form skips the header (the panel's "Book a Demo" heading sits right above).
const W = 480;
const H = 384;

type FrameId =
  | "start"
  | "to-date"
  | "click-date"
  | "calendar"
  | "click-30"
  | "date-set"
  | "to-slot"
  | "click-slot"
  | "slot-set"
  | "to-name"
  | "click-name"
  | "type-name"
  | "type-email"
  | "type-company"
  | "to-modules"
  | "click-modules"
  | "menu"
  | `click-opt-${number}`
  | `opt-${number}`
  | "menu-closed"
  | "to-book"
  | "click-book"
  | "booking"
  | "booked";

interface Frame {
  id: FrameId;
  /** How long this frame holds. */
  ms: number;
  /** `data-cursor` target the finger is at / moving to (~900ms travel); none = hidden. */
  to?: string;
  click?: boolean;
}

const MODULES = ["CRM", "HRMS", "Finance", "Projects", "Sales"];
/** Module icon + tile colour from the site's module data (same as the real "Interested In" list). */
const moduleIcon = Object.fromEntries(modules.map((m) => [m.name, { icon: m.icon, bg: m.iconBg }]));
const PICKED = 4;

/** One loop ≈ 18s. */
const TIMELINE: Frame[] = [
  { id: "start", ms: 700 },
  { id: "to-date", ms: 950, to: "date" },
  { id: "click-date", ms: 250, to: "date", click: true },
  { id: "calendar", ms: 750, to: "day-30" },
  { id: "click-30", ms: 250, to: "day-30", click: true },
  { id: "date-set", ms: 550, to: "day-30" },
  { id: "to-slot", ms: 900, to: "slot" },
  { id: "click-slot", ms: 250, to: "slot", click: true },
  { id: "slot-set", ms: 500, to: "slot" },
  { id: "to-name", ms: 900, to: "name" },
  { id: "click-name", ms: 250, to: "name", click: true },
  { id: "type-name", ms: 750, to: "name" },
  { id: "type-email", ms: 750, to: "name" },
  { id: "type-company", ms: 800, to: "name" },
  { id: "to-modules", ms: 900, to: "modules" },
  { id: "click-modules", ms: 250, to: "modules", click: true },
  { id: "menu", ms: 800, to: "opt-0" },
  ...Array.from({ length: PICKED }, (_, i): Frame[] => [
    { id: `click-opt-${i}`, ms: 200, to: `opt-${i}`, click: true },
    { id: `opt-${i}`, ms: i < PICKED - 1 ? 600 : 500, to: i < PICKED - 1 ? `opt-${i + 1}` : `opt-${i}` },
  ]).flat(),
  { id: "menu-closed", ms: 450, to: "modules" },
  { id: "to-book", ms: 900, to: "book" },
  { id: "click-book", ms: 250, to: "book", click: true },
  { id: "booking", ms: 700, to: "book" },
  { id: "booked", ms: 2600 },
];

const indexOf = (id: FrameId) => TIMELINE.findIndex((frame) => frame.id === id);
/** With reduced motion: the finished form, before booking. */
const STILL = indexOf("menu-closed");

const reducedMotionQuery = "(prefers-reduced-motion: reduce)";
function usePrefersReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const query = window.matchMedia(reducedMotionQuery);
      query.addEventListener("change", onChange);
      return () => query.removeEventListener("change", onChange);
    },
    () => window.matchMedia(reducedMotionQuery).matches,
    () => false
  );
}

/**
 * Where the finger should go for a `data-cursor` target, in % of the canvas. MouseCursor places the
 * icon's top-left corner and the Pointer's fingertip sits ~7px right / 2px down from it (canvas px).
 * Rects are post-transform, so this works at any scale.
 */
function pointAt(canvas: HTMLElement, key: string) {
  const target = canvas.querySelector(`[data-cursor="${key}"]`);
  if (!target) return null;
  const box = canvas.getBoundingClientRect();
  const rect = target.getBoundingClientRect();
  const scale = box.width / canvas.offsetWidth || 1;
  return {
    x: ((rect.left + rect.width * 0.5 - 7 * scale - box.left) / box.width) * 100,
    y: ((rect.top + rect.height * 0.55 - 2 * scale - box.top) / box.height) * 100,
  };
}

export function BookDemoJourneyAnimation({ className }: { className?: string }) {
  const reduced = usePrefersReducedMotion();
  const frameBox = useRef<HTMLDivElement>(null);
  const canvas = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(0);
  const [frame, setFrame] = useState(0);
  const [point, setPoint] = useState({ x: 80, y: 96 }); // starts bottom-right, hidden

  // Scale the virtual canvas to the card's width.
  useLayoutEffect(() => {
    const measure = () => {
      if (frameBox.current) setScale(frameBox.current.clientWidth / W);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (frameBox.current) observer.observe(frameBox.current);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (document.hidden) return; // resume on visibilitychange
      timer = setTimeout(() => {
        const next = (frame + 1) % TIMELINE.length;
        const target = TIMELINE[next].to && canvas.current ? pointAt(canvas.current, TIMELINE[next].to) : null;
        if (target) setPoint(target);
        setFrame(next);
      }, TIMELINE[frame].ms);
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [frame, reduced]);

  const at = reduced ? STILL : frame;
  const { to, click } = TIMELINE[at];
  const reached = (id: FrameId) => at >= indexOf(id);
  const between = (from: FrameId, until: FrameId) => reached(from) && !reached(until);

  const dateSet = reached("date-set");
  const slotSet = reached("slot-set");
  const typed = reached("type-company") ? 3 : reached("type-email") ? 2 : reached("type-name") ? 1 : 0;
  const picked = MODULES.slice(0, Array.from({ length: PICKED }, (_, i) => i).filter((i) => reached(`opt-${i}`)).length);
  const booked = reached("booked");

  return (
    <div
      aria-hidden
      className={cn(
        "rounded-2xl border border-white bg-white/85 p-1 shadow-[0_24px_50px_-22px_rgba(76,43,180,0.5)] ring-1 ring-brand-purple/10 select-none",
        className
      )}
    >
      <div
        ref={frameBox}
        className="relative overflow-hidden rounded-xl"
        style={scale ? { height: H * scale } : { aspectRatio: `${W} / ${H}` }}
      >
        <div
          ref={canvas}
          className={cn("absolute top-0 left-0 origin-top-left bg-white text-brand-text", !scale && "invisible")}
          style={{ width: W, height: H, transform: `scale(${scale || 1})` }}
        >
          <div className="flex h-full flex-col px-[20px] pt-[16px] pb-[14px]">
            {/* Date + timezone */}
            <div className="relative z-10 grid grid-cols-2 gap-[12px]">
              <MiniField label="Date" required>
                <div className="relative">
                  <MiniBox cursor="date" active={between("click-date", "date-set")} className="gap-[7px]">
                    <CalendarDays className="size-[13px] text-brand-purple" />
                    <span className={cn("flex-1 transition-colors duration-300", !dateSet && "text-brand-muted/70")}>
                      {dateSet ? "Wed, 30 Sep 2026" : "Select a date"}
                    </span>
                    <ChevronDown className="size-[12px]" />
                  </MiniBox>
                  <MiniCalendar open={between("calendar", "date-set")} selected={reached("click-30")} />
                </div>
              </MiniField>
              <MiniField label="Timezone">
                <MiniBox className="gap-[7px]">
                  <Globe className="size-[13px] text-brand-purple" />
                  <span className="flex-1">India Standard Time (IST)</span>
                  <ChevronDown className="size-[12px]" />
                </MiniBox>
              </MiniField>
            </div>

            {/* Slots */}
            <p className="mt-[11px] mb-[5px] text-[11px] font-medium">
              Available time slots <span className="font-normal text-brand-muted">(30 minutes)</span>
            </p>
            <div className="grid grid-cols-5 gap-[5px]">
              {["09:30 AM", "10:00 AM", "10:30 AM", "11:30 AM", "12:00 PM", "12:30 PM", "02:00 PM", "02:30 PM", "03:00 PM", "04:00 PM"].map((slot) => {
                const pick = slot === "10:30 AM";
                return (
                  <span
                    key={slot}
                    data-cursor={pick ? "slot" : undefined}
                    className={cn(
                      "flex h-[25px] items-center justify-center rounded-[6px] border text-[10.5px] font-medium tabular-nums transition-all duration-500",
                      !dateSet && "opacity-40",
                      pick && slotSet
                        ? "scale-[1.04] border-brand-purple bg-brand-purple text-white shadow-md shadow-brand-purple/30"
                        : "border-brand-border bg-white"
                    )}
                  >
                    {slot}
                  </span>
                );
              })}
            </div>

            <div className="h-[12px]" />

            {/* Details */}
            <div className="grid grid-cols-3 gap-x-[10px] gap-y-[8px]">
              <MiniField label="Full Name" required>
                <MiniBox cursor="name" active={typed === 1 || between("click-name", "type-name")}>
                  <Typed text="Alex Morgan" shown={typed >= 1} placeholder="John Doe" caret={typed === 1} />
                </MiniBox>
              </MiniField>
              <MiniField label="Work Email" required>
                <MiniBox active={typed === 2}>
                  <Typed text="alex@company.com" shown={typed >= 2} placeholder="you@company.com" caret={typed === 2} />
                </MiniBox>
              </MiniField>
              <MiniField label="Phone Number" required>
                <MiniBox className="gap-[5px]">
                  <span className="h-[9px] w-[13px] rounded-[1px] bg-[linear-gradient(#ff9933_33%,#fff_33%_66%,#138808_66%)] ring-1 ring-black/10" />
                  <ChevronDown className="size-[10px]" />
                  <span className="font-medium">+91</span>
                  <span className="text-brand-muted/70">98765 43210</span>
                </MiniBox>
              </MiniField>
              <MiniField label="Company Name" required>
                <MiniBox active={typed === 3}>
                  <Typed text="Acme Technologies" shown={typed >= 3} placeholder="Your company name" caret={typed === 3} />
                </MiniBox>
              </MiniField>
              <MiniField label="Job Title / Role" required>
                <MiniBox>
                  <span className="text-brand-muted/70">e.g. CEO, CTO, Manager</span>
                </MiniBox>
              </MiniField>
              <MiniField label="Company Size" required>
                <MiniBox>
                  <span className="flex-1 text-brand-muted/70">Select company size</span>
                  <ChevronDown className="size-[12px]" />
                </MiniBox>
              </MiniField>
            </div>

            {/* Invitees + modules */}
            <div className="mt-[8px] grid grid-cols-2 gap-[12px]">
              <MiniField label="Additional Email(s)" optional>
                <MiniBox>
                  <span className="text-brand-muted/70">Enter email and press Enter</span>
                </MiniBox>
              </MiniField>
              <MiniField label="Interested In" hint="(Select one or more)">
                <div className="relative">
                  <MiniBox cursor="modules" active={between("click-modules", "menu-closed")} className="gap-[4px] overflow-hidden px-[5px]">
                    {picked.map((name) => (
                      <span
                        key={name}
                        className="inline-flex h-[18px] shrink-0 items-center gap-[3px] rounded-[5px] bg-brand-purple-light pr-[5px] pl-[2px] text-[10px] font-semibold text-brand-purple"
                      >
                        <ModuleIcon name={name} size={14} />
                        {name} <X className="size-[8px]" strokeWidth={3} />
                      </span>
                    ))}
                    {picked.length === 0 && <span className="flex-1 px-[4px] text-brand-muted/70">Select modules</span>}
                    <ChevronDown className="ml-auto size-[12px] shrink-0" />
                  </MiniBox>

                  {/* Module list opens upwards, like the real one near the bottom of the form. */}
                  <div
                    className={cn(
                      "absolute right-0 bottom-full left-0 z-10 mb-[4px] origin-bottom rounded-[9px] border border-brand-border bg-white p-[4px] shadow-[0_12px_28px_-8px_rgba(24,20,70,0.3)] transition-all duration-300",
                      between("menu", "menu-closed") ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
                    )}
                  >
                    <div className="mb-[3px] flex items-center gap-[5px] border-b border-brand-border px-[5px] pb-[4px] text-[10px] text-brand-muted/70">
                      <Search className="size-[10px]" /> Search modules
                    </div>
                    {MODULES.map((name, i) => {
                      const on = picked.includes(name);
                      return (
                        <div
                          key={name}
                          data-cursor={i < PICKED ? `opt-${i}` : undefined}
                          className={cn(
                            "flex h-[22px] items-center gap-[6px] rounded-[5px] px-[5px] text-[10.5px] transition-colors",
                            to === `opt-${i}` && "bg-brand-purple-light/70"
                          )}
                        >
                          <span
                            className={cn(
                              "flex size-[11px] items-center justify-center rounded-[3px] border transition-colors duration-200",
                              on ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border"
                            )}
                          >
                            {on && <Check className="size-[8px]" strokeWidth={3.5} />}
                          </span>
                          <ModuleIcon name={name} size={16} />
                          <span className={cn(on && "font-medium")}>{name}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </MiniField>
            </div>

            {/* Footer: always at least 16px below the fields, like the real form. */}
            <div className="mt-auto flex items-center justify-between pt-[16px]">
              <span className="flex items-center gap-[10px] text-[10px] text-brand-muted">
                <span className="flex items-center gap-[4px]">
                  <ShieldCheck className="size-[12px] text-brand-purple" /> No credit card required
                </span>
                <span className="flex items-center gap-[4px]">
                  <Mail className="size-[12px] text-brand-purple" /> We&apos;ll confirm by email
                </span>
              </span>
              <span
                data-cursor="book"
                className={cn(
                  "flex h-[32px] items-center gap-[6px] rounded-[9px] bg-[linear-gradient(90deg,var(--color-brand-purple),#7c4dff)] px-[16px] text-[12.5px] font-semibold text-white shadow-md shadow-brand-purple/30 transition-transform duration-200",
                  between("click-book", "booked") && "scale-95"
                )}
              >
                {reached("booking") ? (
                  <>
                    <LoaderCircle className="size-[13px] animate-spin" /> Booking Demo...
                  </>
                ) : (
                  <>
                    Book My Demo <ArrowRight className="size-[13px]" />
                  </>
                )}
              </span>
            </div>
          </div>

          {/* Success state, same design as the real one (BookDemoSuccess). Its content mounts when the
              booking lands, so the staggered entrances replay every loop, and stays through the fade-out. */}
          <div
            className={cn(
              "absolute inset-0 z-20 bg-white transition-opacity duration-500",
              booked ? "opacity-100" : "pointer-events-none opacity-0"
            )}
          >
            {(booked || at < indexOf("to-date")) && <MiniSuccess />}
          </div>

          {!reduced && <MouseCursor x={point.x} y={point.y} visible={!!to} clicking={!!click} />}
        </div>
      </div>
    </div>
  );
}

/** Miniature of the real success screen: illustration, ticket, "What happens next". Fixed sample data. */
function MiniSuccess() {
  return (
    <div className="flex h-full flex-col items-center justify-center px-[26px] text-center">
      <SuccessIllustration className="w-[150px]" />
      <p className="demo-rise mt-[2px] text-[17px] font-bold" style={delay(250)}>
        Demo Request Submitted
      </p>
      <p className="demo-rise mt-[2px] text-[10.5px] text-brand-muted" style={delay(330)}>
        Thank you. Our team will contact you to confirm your demo.
      </p>

      <div
        className="demo-rise relative mt-[12px] flex w-full overflow-hidden rounded-[12px] border border-brand-border bg-white text-left shadow-[0_12px_28px_-18px_rgba(76,43,180,0.45)]"
        style={delay(420)}
      >
        <div className="flex w-[72px] shrink-0 flex-col items-center justify-center bg-[linear-gradient(160deg,var(--color-brand-purple),#8b5cf6)] py-[8px] text-white">
          <span className="text-[8.5px] font-semibold tracking-[0.18em] opacity-85">SEP</span>
          <span className="text-[26px] leading-none font-extrabold">30</span>
          <span className="mt-[2px] text-[9px] opacity-90">Wednesday</span>
        </div>
        <span className="absolute top-0 bottom-0 left-[72px] border-l-2 border-dashed border-white/70" />
        <div className="min-w-0 flex-1 space-y-[4px] px-[12px] py-[8px] text-[10.5px]">
          <p className="text-[8.5px] font-semibold tracking-[0.14em] text-brand-purple">SORTBOXS DEMO · REQUESTED</p>
          <p className="flex items-center gap-[6px] font-medium">
            <Clock className="size-[11px] text-brand-purple" /> 10:30 AM · India Standard Time (IST)
          </p>
          <p className="flex items-center gap-[6px] font-medium">
            <Mail className="size-[11px] text-brand-purple" /> alex@company.com
          </p>
          <div className="flex gap-[4px] pt-[1px]">
            {MODULES.slice(0, PICKED).map((name) => (
              <span
                key={name}
                className="inline-flex h-[17px] items-center gap-[3px] rounded-[5px] bg-brand-purple-light pr-[5px] pl-[2px] text-[9.5px] font-semibold text-brand-purple"
              >
                <ModuleIcon name={name} size={13} />
                {name}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="relative mt-[12px] grid w-full grid-cols-3">
        <span className="absolute top-[12px] right-[16.66%] left-[16.66%] h-[2px] rounded-full bg-brand-border">
          <span className="demo-grow-x block h-full rounded-full bg-brand-purple" style={delay(700)} />
        </span>
        {bookDemoNextSteps.map(({ icon: Icon, title }, index) => (
          <div key={title} className="demo-rise relative flex flex-col items-center" style={delay(640 + index * 160)}>
            <span
              className={cn(
                "flex size-[25px] items-center justify-center rounded-full ring-[3px] ring-white",
                index === 0 ? "bg-brand-purple text-white" : "border border-brand-purple/25 bg-white text-brand-purple"
              )}
            >
              <Icon className="size-[12px]" />
            </span>
            <span className="mt-[4px] text-[9.5px] leading-tight font-semibold">{title}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function ModuleIcon({ name, size }: { name: string; size: number }) {
  const entry = moduleIcon[name];
  if (!entry) return null;
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-[4px]", entry.bg)} style={{ width: size, height: size }}>
      {/* eager: it sits in a faded-out list until the finger opens it, and must already be there. */}
      <Image src={entry.icon} alt="" width={Math.round(size * 0.6)} height={Math.round(size * 0.6)} loading="eager" />
    </span>
  );
}

function MiniField({
  label,
  required,
  optional,
  hint,
  children,
}: {
  label: string;
  required?: boolean;
  optional?: boolean;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div className="min-w-0">
      <p className="mb-[3px] truncate text-[11px] font-medium">
        {label}
        {required && <span className="text-red-500"> *</span>}
        {optional && <span className="font-normal text-brand-muted"> (Optional)</span>}
        {hint && <span className="font-normal text-brand-muted"> {hint}</span>}
      </p>
      {children}
    </div>
  );
}

function MiniBox({ cursor, active, className, children }: { cursor?: string; active?: boolean; className?: string; children: ReactNode }) {
  return (
    <div
      data-cursor={cursor}
      className={cn(
        "flex h-[30px] items-center rounded-[7px] border bg-white px-[9px] text-[11px] whitespace-nowrap transition-all duration-300",
        active ? "border-brand-purple ring-2 ring-brand-purple/20" : "border-brand-border",
        className
      )}
    >
      {children}
    </div>
  );
}

/** Text that "types" in (clip-path opening in steps) over its placeholder. */
function Typed({ text, shown, placeholder, caret }: { text: string; shown: boolean; placeholder: string; caret: boolean }) {
  return (
    <span className="relative flex min-w-0 flex-1 items-center">
      <span className={cn("truncate text-brand-muted/70 transition-opacity", shown && "opacity-0")}>{placeholder}</span>
      <span
        className="absolute inset-y-0 left-0 flex items-center font-medium transition-[clip-path] duration-600 ease-[steps(14,end)]"
        style={{ clipPath: shown ? "inset(0 0 0 0)" : "inset(0 100% 0 0)" }}
      >
        {text}
        {caret && <span className="ml-px h-[12px] w-px animate-pulse bg-brand-purple" />}
      </span>
    </span>
  );
}

// Mon–Fri weeks around the sample date (30 Sep 2026 is a Wednesday).
const WEEKS = [28, 29, 30, 1, 2, 5, 6, 7, 8, 9];

function MiniCalendar({ open, selected }: { open: boolean; selected: boolean }) {
  return (
    <div
      className={cn(
        "absolute top-full left-0 mt-[4px] w-[210px] origin-top-left rounded-[10px] border border-brand-border bg-white p-[9px] shadow-[0_12px_28px_-8px_rgba(24,20,70,0.3)] transition-all duration-300",
        open ? "scale-100 opacity-100" : "pointer-events-none scale-95 opacity-0"
      )}
    >
      <p className="mb-[5px] text-center text-[11px] font-semibold">September 2026</p>
      <div className="grid grid-cols-5 gap-[3px] text-center text-[10.5px] tabular-nums">
        {["Mo", "Tu", "We", "Th", "Fr"].map((d) => (
          <span key={d} className="text-[9.5px] font-medium text-brand-muted">
            {d}
          </span>
        ))}
        {WEEKS.map((day, i) => {
          const pick = i === 2;
          return (
            <span
              key={i}
              data-cursor={pick ? "day-30" : undefined}
              className={cn(
                "flex h-[22px] items-center justify-center rounded-[6px] transition-colors duration-200",
                pick && selected ? "bg-brand-purple font-semibold text-white" : pick && "font-semibold text-brand-purple",
                i >= 3 && i < 5 && "text-brand-text/60"
              )}
            >
              {day}
            </span>
          );
        })}
      </div>
    </div>
  );
}
