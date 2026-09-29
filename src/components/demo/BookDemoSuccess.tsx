"use client";

import { useId, useState, type CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Clock, Mail, Users } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { bookDemoCopy, bookDemoNextSteps, demoModuleOptions } from "@/data/bookDemo";
import type { DemoBookingRequest } from "@/lib/api/demoBookingMappers";
import { formatDay, formatSlotTime, parseDay, timeZoneLabel } from "@/lib/timezone";

/** Stagger helper: `style={delay(300)}` → the element's entrance starts 300ms in. */
export const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The modal's success state: an animated illustration, a ticket-style summary of the requested slot,
 * and a "What happens next" strip. Entrances are staggered CSS animations (globals.css, `demo-*`),
 * all switched off with prefers-reduced-motion.
 */
export function BookDemoSuccess({ request, onClose }: { request: DemoBookingRequest; onClose: () => void }) {
  const [zoneLabel] = useState(() => timeZoneLabel(request.timezone));
  const picked = demoModuleOptions.filter((option) => request.interestedModules.includes(option.value));

  return (
    <div className="flex min-h-full flex-col items-center justify-center py-6 text-center lg:py-4" role="status">
      <SuccessIllustration className="w-[13.5rem] sm:w-[15rem] short:w-[9.5rem]" />

      <h3 className="demo-rise mt-3 text-[26px] leading-tight font-bold text-brand-text short:mt-1 short:text-[22px]" style={delay(250)}>
        {bookDemoCopy.success.title}
      </h3>
      <p className="demo-rise mt-1.5 max-w-md text-[15px] leading-relaxed text-brand-muted" style={delay(330)}>
        {bookDemoCopy.success.body}
      </p>

      {/* Ticket: date block | details */}
      <div
        className="demo-rise relative mt-6 flex w-full short:mt-4 max-w-[34rem] overflow-hidden rounded-2xl border border-brand-border bg-white text-left shadow-[0_18px_40px_-24px_rgba(76,43,180,0.45)]"
        style={delay(420)}
      >
        <div className="flex w-[6.5rem] shrink-0 flex-col items-center justify-center bg-[linear-gradient(160deg,var(--color-brand-purple),#8b5cf6)] px-3 py-4 text-white sm:w-28">
          <span className="text-[11px] font-semibold tracking-[0.18em] uppercase opacity-85">
            {parseDay(request.date).toLocaleString("en-US", { month: "short", timeZone: "UTC" })}
          </span>
          <span className="text-[40px] leading-none font-extrabold tabular-nums">{Number(request.date.slice(8))}</span>
          <span className="mt-1 text-xs font-medium opacity-90">{formatDay(request.date, { weekday: "long" })}</span>
        </div>
        {/* Perforation between the stub and the body */}
        <span aria-hidden className="absolute top-0 bottom-0 left-[6.5rem] w-0 border-l-2 border-dashed border-white/70 sm:left-28" />
        <span aria-hidden className="absolute -top-2 left-[calc(6.5rem-8px)] size-4 rounded-full border border-brand-border bg-white sm:left-[calc(7rem-8px)]" />
        <span aria-hidden className="absolute -bottom-2 left-[calc(6.5rem-8px)] size-4 rounded-full border border-brand-border bg-white sm:left-[calc(7rem-8px)]" />

        <div className="min-w-0 flex-1 space-y-2 px-4 py-3.5 text-sm sm:px-5">
          <p className="text-[11px] font-semibold tracking-[0.14em] text-brand-purple uppercase">SortBoxs demo · requested</p>
          <Row icon={Clock} label="Time">
            {formatSlotTime(request.slotStart, request.timezone)} · {zoneLabel}
          </Row>
          <Row icon={Mail} label="Confirmation to">
            {request.workEmail}
          </Row>
          {request.additionalEmails.length > 0 && (
            <Row icon={Users} label="Also invited">
              {request.additionalEmails.join(", ")}
            </Row>
          )}
          {picked.length > 0 && (
            <div className="flex flex-wrap gap-1.5 pt-0.5">
              {picked.map((option) => (
                <span
                  key={option.value}
                  className="inline-flex items-center gap-1.5 rounded-lg bg-brand-purple-light py-0.5 pr-2 pl-0.5 text-xs font-semibold text-brand-purple"
                >
                  <span className={`flex size-5 items-center justify-center rounded-md ${option.iconBg}`}>
                    <Image src={option.icon} alt="" width={12} height={12} aria-hidden />
                  </span>
                  {option.label}
                </span>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* What happens next */}
      <div className="mt-6 w-full max-w-[34rem] short:mt-4">
        <p className="demo-rise text-left text-xs font-semibold tracking-[0.14em] text-brand-muted uppercase" style={delay(560)}>
          What happens next
        </p>
        <ol className="relative mt-3 grid grid-cols-3 gap-3 short:mt-2">
          {/* Connector that fills in behind the step icons */}
          <span aria-hidden className="absolute top-5 right-[16.66%] left-[16.66%] h-0.5 rounded-full bg-brand-border">
            <span className="demo-grow-x block h-full rounded-full bg-brand-purple" style={delay(700)} />
          </span>
          {bookDemoNextSteps.map(({ icon: Icon, title, body }, index) => (
            <li key={title} className="demo-rise relative flex flex-col items-center" style={delay(640 + index * 160)}>
              <span
                className={
                  index === 0
                    ? "flex size-10 items-center justify-center rounded-full bg-brand-purple text-white shadow-md shadow-brand-purple/30 ring-4 ring-white"
                    : "flex size-10 items-center justify-center rounded-full border border-brand-purple/25 bg-white text-brand-purple ring-4 ring-white"
                }
              >
                <Icon className="size-[18px]" aria-hidden />
              </span>
              <span className="mt-2 text-[13px] leading-tight font-semibold text-brand-text">{title}</span>
              <span className="mt-1 text-xs leading-snug text-brand-muted short:hidden">{body}</span>
            </li>
          ))}
        </ol>
      </div>

      <div className="demo-rise mt-7 flex flex-wrap short:mt-4 items-center justify-center gap-3" style={delay(1100)}>
        <Button type="button" onClick={onClose} size="md" className="rounded-xl px-9">
          Done
        </Button>
        <Link
          href={routes.platform.all}
          className="inline-flex items-center gap-1.5 rounded-xl px-4 py-3 text-[15px] font-semibold text-brand-purple outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/40"
        >
          Explore the platform <ArrowRight className="size-4" aria-hidden />
        </Link>
      </div>
    </div>
  );
}

function Row({ icon: Icon, label, children }: { icon: typeof Clock; label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-start gap-2.5">
      <Icon className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden />
      <p className="min-w-0 font-medium break-words text-brand-text">
        <span className="sr-only">{label}: </span>
        {children}
      </p>
    </div>
  );
}

/**
 * Vector scene: a calendar card with the booked day highlighted, a check badge that pops in and draws
 * its tick, pulsing rings and twinkling sparkles. Brand colours via CSS variables. Decorative.
 */
export function SuccessIllustration({ className }: { className?: string }) {
  // Unique ids: the booking animation shows this too, sometimes at the same time as the real screen.
  const id = useId().replace(/:/g, "");
  const glow = `${id}-glow`;
  const badge = `${id}-badge`;
  const shadow = `${id}-shadow`;
  return (
    <svg viewBox="0 0 240 150" className={`h-auto ${className ?? ""}`} aria-hidden>
      <defs>
        <radialGradient id={glow} cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#ede8fe" />
          <stop offset="100%" stopColor="#ede8fe" stopOpacity="0" />
        </radialGradient>
        <linearGradient id={badge} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stopColor="#7c4dff" />
          <stop offset="100%" stopColor="var(--color-brand-purple)" />
        </linearGradient>
        <filter id={shadow} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="8" stdDeviation="8" floodColor="#4c2bb4" floodOpacity="0.18" />
        </filter>
      </defs>

      {/* Soft glow + pulsing rings */}
      <circle cx="120" cy="78" r="72" fill={`url(#${glow})`} />
      <circle className="demo-ring" cx="120" cy="78" r="50" fill="none" stroke="var(--color-brand-purple)" strokeOpacity="0.25" />
      <circle className="demo-ring" style={delay(1200)} cx="120" cy="78" r="50" fill="none" stroke="var(--color-brand-purple)" strokeOpacity="0.25" />

      {/* Calendar card */}
      <g className="demo-rise" filter={`url(#${shadow})`}>
        <rect x="74" y="34" width="92" height="84" rx="13" fill="#fff" />
        <path d="M74 47a13 13 0 0 1 13-13h66a13 13 0 0 1 13 13v9H74z" fill="var(--color-brand-purple)" />
        <rect x="96" y="27" width="6" height="15" rx="3" fill="#c9b8ff" />
        <rect x="138" y="27" width="6" height="15" rx="3" fill="#c9b8ff" />
        {[0, 1, 2].map((row) =>
          [0, 1, 2, 3].map((col) => {
            const on = row === 1 && col === 2;
            return (
              <rect
                key={`${row}-${col}`}
                x={84 + col * 19}
                y={65 + row * 16}
                width="14"
                height="10"
                rx="3"
                fill={on ? "var(--color-brand-purple)" : "#ede8fe"}
                className={on ? "demo-twinkle" : undefined}
              />
            );
          })
        )}
      </g>

      {/* Check badge */}
      <g className="demo-badge-pop" style={delay(250)}>
        <circle cx="160" cy="108" r="21" fill={`url(#${badge})`} stroke="#fff" strokeWidth="4" />
        <path
          className="demo-draw"
          style={{ ...delay(550), "--len": "30" } as CSSProperties}
          d="M150 108.5l7 7 13-14"
          fill="none"
          stroke="#fff"
          strokeWidth="4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </g>

      {/* Sparkles */}
      {[
        { x: 52, y: 44, s: 1, d: 0 },
        { x: 190, y: 38, s: 0.8, d: 500 },
        { x: 200, y: 92, s: 0.6, d: 900 },
        { x: 44, y: 104, s: 0.7, d: 1300 },
      ].map(({ x, y, s, d }) => (
        // Position on the <g>: a CSS animation's transform would replace a transform attribute on the path.
        <g key={`${x}-${y}`} transform={`translate(${x} ${y}) scale(${s})`}>
          <path
            className="demo-twinkle"
            style={delay(d)}
            d="M0-9C1.5-2.5 2.5-1.5 9 0 2.5 1.5 1.5 2.5 0 9-1.5 2.5-2.5 1.5-9 0-2.5-1.5-1.5-2.5 0-9z"
            fill="var(--color-brand-purple)"
            fillOpacity="0.55"
          />
        </g>
      ))}
      <circle className="demo-twinkle" style={delay(700)} cx="68" cy="128" r="3" fill="#c9b8ff" />
      <circle className="demo-twinkle" style={delay(200)} cx="182" cy="62" r="2.5" fill="#c9b8ff" />
    </svg>
  );
}
