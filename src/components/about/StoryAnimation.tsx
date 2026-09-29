"use client";

import { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { Check, Link2, Unlink } from "lucide-react";
import { assets } from "@/config/assets";
import { aboutStory } from "@/data/about";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";

/**
 * "Our Story" visual, acting out the text in a loop: scattered tools with broken links (before) → they
 * glide into a tidy ring around the SortBoxs hub, thin connectors draw in and each tile gets a tick
 * (after), while "A More Connected Business" ticks off point by point. Deliberately minimal (user's
 * choice): no glows, ripples or particles. Decorative (aria-hidden); pauses while
 * the tab is hidden; with prefers-reduced-motion it shows the connected state, still.
 */

type Phase = "apart" | "connecting" | "connected";
const PHASES: { phase: Phase; ms: number }[] = [
  { phase: "apart", ms: 2800 },
  { phase: "connecting", ms: 1500 },
  { phase: "connected", ms: 5200 },
];

/** Modules shown as tiles (short names, so labels fit). */
const tileSlugs = ["crm", "sales", "hrms", "finance", "projects", "inventory", "marketing", "analytics"];
const tiles = tileSlugs.flatMap((slug) => modules.filter((m) => m.slug === slug));

/** Where each tile sits while scattered: x%, y%, rotation (deg). */
const scattered: [number, number, number][] = [
  [16, 18, -12],
  [58, 11, 9],
  [86, 30, -7],
  [80, 66, 11],
  [60, 88, -9],
  [22, 84, 8],
  [10, 52, 13],
  [38, 70, -6],
];

/** Ring positions around the hub (centre 50/50). */
const ring = tiles.map((_, i) => {
  const a = ((-90 + i * (360 / tiles.length)) * Math.PI) / 180;
  return [50 + 36 * Math.cos(a), 50 + 36 * Math.sin(a)] as const;
});

/** Pairs of scattered tiles joined by a broken (red, dashed) link in the "before" state. */
const brokenLinks: [number, number][] = [
  [0, 1],
  [2, 3],
  [5, 6],
  [4, 3],
];

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

export function StoryAnimation() {
  const reduced = usePrefersReducedMotion();
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (reduced) return;
    let timer: ReturnType<typeof setTimeout> | undefined;
    const schedule = () => {
      clearTimeout(timer);
      if (!document.hidden) timer = setTimeout(() => setStep((s) => (s + 1) % PHASES.length), PHASES[step].ms);
    };
    schedule();
    document.addEventListener("visibilitychange", schedule);
    return () => {
      clearTimeout(timer);
      document.removeEventListener("visibilitychange", schedule);
    };
  }, [step, reduced]);

  const phase: Phase = reduced ? "connected" : PHASES[step].phase;
  const together = phase !== "apart";
  const connected = phase === "connected";

  return (
    <div aria-hidden className="grid grid-cols-1 items-center gap-6 select-none sm:grid-cols-[minmax(0,1.35fr)_minmax(0,1fr)]">
      {/* Scene */}
      <div className="relative">
        {/* Status pill */}
        <div className="mb-3 flex justify-center">
          <span
            className={cn(
              "inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold ring-1 transition-colors duration-500",
              connected
                ? "bg-brand-purple text-white ring-brand-purple"
                : together
                  ? "bg-brand-purple-light text-brand-purple ring-brand-purple/20"
                  : "bg-rose-50 text-rose-600 ring-rose-200"
            )}
          >
            {together ? <Link2 className="size-3.5" /> : <Unlink className="size-3.5" />}
            {connected ? "One connected platform" : together ? "Connecting your teams…" : "Disconnected tools · siloed data"}
          </span>
        </div>

        <div className="relative mx-auto aspect-square w-full max-w-[400px] rounded-[28px] bg-[radial-gradient(circle_at_50%_50%,#efe9ff_0%,#f8f7ff_55%,#fff_100%)] ring-1 ring-brand-border">
          <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible">
            {/* Ring guide */}
            <circle
              cx="50"
              cy="50"
              r="36"
              fill="none"
              stroke="var(--color-brand-purple)"
              strokeOpacity={together ? 0.18 : 0}
              strokeDasharray="1 1.6"
              className="transition-[stroke-opacity] duration-700"
            />


            {/* Before: broken links between scattered tools */}
            {brokenLinks.map(([a, b]) => {
              const [x1, y1] = scattered[a];
              const [x2, y2] = scattered[b];
              return (
                <g key={`${a}-${b}`} className={cn("transition-opacity duration-500", together ? "opacity-0" : "opacity-100")}>
                  <line x1={x1} y1={y1} x2={x2} y2={y2} stroke="#fb7185" strokeWidth="0.5" strokeDasharray="1.6 1.6" />
                  <g transform={`translate(${(x1 + x2) / 2} ${(y1 + y2) / 2})`}>
                    <circle r="2.2" fill="#fff" stroke="#fb7185" strokeWidth="0.4" />
                    <path d="M-0.9-0.9L0.9 0.9M0.9-0.9L-0.9 0.9" stroke="#e11d48" strokeWidth="0.5" strokeLinecap="round" />
                  </g>
                </g>
              );
            })}

            {/* After: thin straight connectors into the hub, drawing in one by one */}
            {ring.map(([x, y], i) => (
              <line
                key={i}
                x1={x}
                y1={y}
                x2="50"
                y2="50"
                pathLength={1}
                stroke="var(--color-brand-purple)"
                strokeOpacity="0.3"
                strokeWidth="0.35"
                strokeDasharray="1"
                strokeDashoffset={together ? 0 : 1}
                style={{ transition: `stroke-dashoffset 0.6s ease-out ${together ? 500 + i * 70 : 0}ms` }}
              />
            ))}
          </svg>

          {/* Hub: the SortBoxs logo */}
          <div
            className={cn(
              "absolute top-1/2 left-1/2 flex -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-2xl bg-white px-3.5 py-3 shadow-[0_18px_40px_-16px_rgba(76,43,180,0.55)] ring-1 ring-brand-purple/20 transition-all duration-700",
              together ? "scale-100 opacity-100" : "scale-75 opacity-30 grayscale"
            )}
          >
            <Image src={assets.brand.logo} alt="" width={246} height={55} className="relative h-7 w-auto" />
          </div>

          {/* Module tiles: scattered → ring */}
          {tiles.map((module, i) => {
            const [sx, sy, rot] = scattered[i];
            const [rx, ry] = ring[i];
            return (
              <div
                key={module.slug}
                className="absolute flex flex-col items-center gap-1 transition-all duration-[1100ms] ease-[cubic-bezier(0.2,0.8,0.2,1)]"
                style={{
                  left: `${together ? rx : sx}%`,
                  top: `${together ? ry : sy}%`,
                  transform: `translate(-50%, -50%) rotate(${together ? 0 : rot}deg)`,
                  transitionDelay: together ? `${i * 60}ms` : "0ms",
                }}
              >
                <span
                  className={cn(
                    "relative flex size-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_22px_-12px_rgba(23,22,92,0.45)] ring-1 transition-colors duration-500",
                    connected ? "ring-brand-purple/40" : together ? "ring-brand-border" : "ring-rose-200"
                  )}
                >
                  <span className={cn("flex size-8 items-center justify-center rounded-xl", module.iconBg, !together && "opacity-70")}>
                    <Image src={module.icon} alt="" width={16} height={16} />
                  </span>
                  {/* Connected badge */}
                  <span
                    className={cn(
                      "absolute -top-1.5 -right-1.5 flex size-4 items-center justify-center rounded-full bg-brand-purple text-white ring-2 ring-white transition-all duration-300",
                      connected ? "scale-100 opacity-100" : "scale-50 opacity-0"
                    )}
                    style={{ transitionDelay: connected ? `${i * 120}ms` : "0ms" }}
                  >
                    <Check className="size-2.5" strokeWidth={3.5} />
                  </span>
                </span>
                <span className="rounded bg-white/90 px-1 text-[10px] font-semibold whitespace-nowrap text-brand-text">{module.name}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* Outcome checklist */}
      <div className="rounded-2xl border border-brand-border bg-white p-5 shadow-[0_18px_40px_-28px_rgba(23,22,92,0.45)]">
        <p className="font-semibold text-brand-text">{aboutStory.after.title}</p>
        <ul className="mt-4 space-y-3">
          {aboutStory.after.points.map((point, i) => (
            <li key={point} className="flex items-center gap-2.5 text-sm">
              <span
                className={cn(
                  "flex size-5 shrink-0 items-center justify-center rounded-full border transition-all duration-300",
                  connected ? "scale-100 border-brand-purple bg-brand-purple text-white" : "scale-90 border-brand-border bg-white text-transparent"
                )}
                style={{ transitionDelay: connected ? `${400 + i * 350}ms` : "0ms" }}
              >
                <Check className="size-3" strokeWidth={3.5} />
              </span>
              <span
                className={cn("transition-colors duration-300", connected ? "font-medium text-brand-text" : "text-brand-muted")}
                style={{ transitionDelay: connected ? `${400 + i * 350}ms` : "0ms" }}
              >
                {point}
              </span>
            </li>
          ))}
        </ul>
        <div className="mt-5 border-t border-brand-border pt-4">
          <div className="flex items-center justify-between text-xs">
            <span className="text-brand-muted">Teams connected</span>
            <span className="font-semibold text-brand-purple tabular-nums">
              {connected ? tiles.length : 0}/{tiles.length}
            </span>
          </div>
          <div className="mt-2 h-2 overflow-hidden rounded-full bg-brand-purple-light">
            <div
              className="h-full origin-left rounded-full bg-[linear-gradient(90deg,var(--color-brand-purple),#a78bfa)] transition-transform duration-[1800ms] ease-out"
              style={{ transform: `scaleX(${connected ? 1 : 0})` }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
