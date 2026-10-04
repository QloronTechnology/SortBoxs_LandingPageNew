"use client";

import { useEffect, useState } from "react";
import { BarChart3, Calendar, Check, Magnet, Mail, RefreshCw, Route, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion } from "@/components/sales-solution/hooks";
import { SampleTag, SectionHead } from "@/components/sales-solution/shared";

/** The marketing loop told as one campaign's story. Each step adds an entry to the campaign log, and the last one feeds the next plan. */
const steps: { icon: LucideIcon; label: string; headline: string; detail: string; metric: string; short: string; tone: string; text: string; hex: string }[] = [
  { icon: Calendar, label: "Plan", headline: "Festive campaign planned", detail: "A four-week push across email, social and search ads.", metric: "₹4L budget · 3 channels", short: "₹4L budget", tone: "bg-violet-500", text: "text-violet-600", hex: "#8b5cf6" },
  { icon: Magnet, label: "Capture", headline: "Leads start arriving", detail: "Forms and landing pages collect leads, and each one is scored.", metric: "1,480 leads · 410 warm or hot", short: "1,480 leads", tone: "bg-rose-500", text: "text-rose-600", hex: "#f43f5e" },
  { icon: Mail, label: "Engage", headline: "Warm leads get a sequence", detail: "A four-email series goes to warm leads, and hot ones go to sales.", metric: "4 emails · 38% open", short: "38% open", tone: "bg-sky-500", text: "text-sky-600", hex: "#0ea5e9" },
  { icon: Route, label: "Guide", headline: "The journey shows a gap", detail: "Most people who leave do so between comparing and deciding.", metric: "Biggest drop: Consider → Decide", short: "Drop at Decide", tone: "bg-amber-500", text: "text-amber-600", hex: "#f59e0b" },
  { icon: BarChart3, label: "Measure", headline: "Results show what worked", detail: "Email brought leads at half the cost of ads, and converted better.", metric: "Email ₹420 vs ads ₹860 per lead", short: "Email wins", tone: "bg-emerald-500", text: "text-emerald-600", hex: "#10b981" },
];

const N = steps.length;
const R = 36;
const STEP_DEG = 360 / N;
const LAP_MS = 13000; // one trip round the ring
const HOLD_MS = 2600; // pause on "next plan" before starting again
const FADE_MS = 450;

const point = (deg: number) => {
  const rad = (deg * Math.PI) / 180;
  return [50 + R * Math.cos(rad), 50 + R * Math.sin(rad)] as const;
};
const angleOf = (index: number) => -90 + index * STEP_DEG;
/** The arc from one step to the next (the last one runs from Measure back to Plan). */
const arc = (index: number) => {
  const [x1, y1] = point(angleOf(index));
  const [x2, y2] = point(angleOf(index + 1));
  return `M${x1.toFixed(3)},${y1.toFixed(3)} A${R},${R} 0 0 1 ${x2.toFixed(3)},${y2.toFixed(3)}`;
};

/**
 * Continuous progress round the loop, from 0 to 1, driven by animation frames. After a lap it holds, fades,
 * and starts again. It stops for good once the visitor picks a step.
 */
function useLoopProgress(paused: boolean) {
  const [progress, setProgress] = useState(0);
  const [fading, setFading] = useState(false);

  useEffect(() => {
    if (paused) return;
    let frame = 0;
    let start = performance.now();
    const tick = (now: number) => {
      // The first frame can be stamped slightly before `start`, so never let time run backwards.
      const elapsed = Math.max(0, now - start);
      if (elapsed < LAP_MS) {
        setProgress(elapsed / LAP_MS);
        setFading(false);
      } else if (elapsed < LAP_MS + HOLD_MS) {
        setProgress(1);
      } else if (elapsed < LAP_MS + HOLD_MS + FADE_MS) {
        setFading(true);
      } else {
        start = now;
        setProgress(0);
      }
      frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [paused]);

  return { progress, setProgress, fading };
}

export function LoopCampaignStory() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const { progress: live, setProgress, fading } = useLoopProgress(reduced || taken);
  const progress = reduced ? 1 : Math.min(1, Math.max(0, live));

  const looped = progress >= 1;
  const reached = Math.max(0, Math.min(N - 1, Math.floor(progress * N))); // the step the dot has most recently passed
  const [headX, headY] = point(-90 + progress * 360);
  const headColor = steps[reached].hex;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="How marketing works in SortBoxs" title="One loop, from plan to proof" intro="Follow one campaign around the loop. What it proves at the end shapes the plan for the next one." />

        <div className="mx-auto mt-12 grid max-w-5xl items-center gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-14">
          <div className="relative mx-auto aspect-square w-full max-w-[400px]">
            <span aria-hidden className="absolute inset-[12%] rounded-full bg-[radial-gradient(circle,#f1edff_0%,rgba(241,237,255,0)_68%)]" />

            <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden>
              <defs>
                <filter id="loop-glow" x="-200%" y="-200%" width="500%" height="500%">
                  <feGaussianBlur stdDeviation="1.4" result="blur" />
                  <feMerge>
                    <feMergeNode in="blur" />
                    <feMergeNode in="SourceGraphic" />
                  </feMerge>
                </filter>
              </defs>

              {/* Track */}
              <circle cx="50" cy="50" r={R} fill="none" stroke="#ece8fb" strokeWidth="2.2" />
              <path d={arc(N - 1)} fill="none" stroke="#ffffff" strokeWidth="2.6" />
              <path d={arc(N - 1)} fill="none" stroke="#ddd6f8" strokeWidth="1.4" strokeDasharray="0.1 2.4" strokeLinecap="round" />

              {/* Progress, coloured per step, filled continuously behind the dot */}
              <g style={{ opacity: fading ? 0 : 1, transition: `opacity ${FADE_MS}ms ease` }}>
                {steps.map((step, index) => {
                  const fill = Math.max(0, Math.min(1, progress * N - index));
                  return <path key={step.label} d={arc(index)} fill="none" stroke={step.hex} strokeWidth="2.2" strokeLinecap="round" pathLength={1} strokeDasharray="1 1" strokeDashoffset={1 - fill} style={{ opacity: fill > 0 ? 1 : 0 }} />;
                })}
                {!reduced && !looped && (
                  <g filter="url(#loop-glow)">
                    <circle cx={headX} cy={headY} r="2.6" fill={headColor} opacity="0.35" />
                    <circle cx={headX} cy={headY} r="1.5" fill="#fff" stroke={headColor} strokeWidth="1" />
                  </g>
                )}
              </g>
            </svg>

            <span className={cn("absolute top-[12.5%] left-[22.5%] -translate-x-1/2 -translate-y-1/2 -rotate-[36deg] text-[10px] font-bold tracking-wide whitespace-nowrap uppercase transition-colors duration-500", looped ? "text-emerald-600" : "text-brand-muted/60")}>Feeds the next plan</span>

            {/* Centre */}
            <div className={cn("absolute top-1/2 left-1/2 flex size-36 -translate-x-1/2 -translate-y-1/2 flex-col items-center justify-center rounded-full bg-white text-center shadow-[0_18px_40px_-20px_rgba(108,53,245,0.5)] ring-4 transition-colors duration-700", looped ? "ring-emerald-200" : "ring-brand-purple/10")}>
              {looped ? (
                <span key="loop" className="demo-rise flex flex-col items-center px-4">
                  <RefreshCw className="size-6 text-emerald-600" aria-hidden />
                  <span className="mt-1.5 text-xs leading-tight font-extrabold text-emerald-800">Next plan: more email, same budget</span>
                </span>
              ) : (
                <span key={reached} className="demo-rise flex flex-col items-center">
                  <span className="text-[10px] font-bold tracking-wide text-brand-muted uppercase">Week {reached + 1} · {steps[reached].label}</span>
                  <span className={cn("mt-1 text-lg leading-tight font-extrabold", steps[reached].text)}>{steps[reached].short}</span>
                </span>
              )}
            </div>

            {/* Steps */}
            {steps.map(({ icon: Icon, label, tone, text }, index) => {
              const [left, top] = point(angleOf(index));
              const lit = looped || index <= reached;
              const current = !looped && index === reached;
              const passed = looped || index < reached;
              return (
                <button
                  key={label}
                  type="button"
                  aria-label={label}
                  aria-current={current ? "step" : undefined}
                  onClick={() => {
                    setTaken(true);
                    setProgress((index + 0.02) / N);
                  }}
                  className="group absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center outline-none focus-visible:rounded-2xl focus-visible:ring-2 focus-visible:ring-brand-purple"
                  style={{ left: `${left}%`, top: `${top}%` }}
                >
                  <span className="relative">
                    {current && !reduced && <span aria-hidden className={cn("loop-pulse absolute inset-0 rounded-2xl", tone)} />}
                    <span className={cn("relative flex size-14 items-center justify-center rounded-2xl ring-4 ring-white transition-colors duration-500", lit ? cn(tone, "text-white shadow-lg") : cn("bg-white shadow-md outline outline-1 outline-brand-border", text))}>
                      {passed ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <Icon className="size-6" aria-hidden />}
                    </span>
                  </span>
                  <span className={cn("mt-1.5 rounded-full px-2.5 py-0.5 text-[11px] font-bold shadow-sm ring-1 transition-colors duration-500", current ? cn(tone, "text-white ring-transparent") : "bg-white text-brand-text ring-brand-border group-hover:ring-brand-purple/40")}>{label}</span>
                </button>
              );
            })}
          </div>

          <div className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
            <div className="mb-4 flex items-center justify-between">
              <p className="text-sm font-bold text-brand-text">Campaign log: Festive offer</p>
              <SampleTag />
            </div>
            <ol className="relative space-y-3">
              <span aria-hidden className="absolute top-3 bottom-3 left-[17px] w-0.5 bg-brand-border" />
              {steps.map(({ icon: Icon, headline, detail, metric, tone }, index) => {
                const shown = looped || index <= reached;
                return (
                  <li key={headline} className={cn("relative flex gap-3.5 transition-opacity duration-700", shown ? "opacity-100" : "opacity-30")}>
                    <span className={cn("relative z-10 flex size-9 shrink-0 items-center justify-center rounded-xl text-white ring-4 ring-brand-surface transition-colors duration-700", shown ? tone : "bg-brand-border")}>
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <div className="min-w-0 pb-1">
                      <p className="text-sm font-bold text-brand-text">{headline}</p>
                      <p className="text-xs leading-relaxed text-brand-muted">{detail}</p>
                      <span className="mt-1.5 inline-block rounded-full bg-white px-2.5 py-0.5 text-[11px] font-bold text-brand-purple ring-1 ring-brand-border">{metric}</span>
                    </div>
                  </li>
                );
              })}
            </ol>
            <p className={cn("mt-4 flex items-start gap-2 rounded-xl px-4 py-3 text-sm font-semibold transition-colors duration-700", looped ? "bg-emerald-100 text-emerald-800" : "bg-white text-brand-muted")}>
              <RefreshCw className="mt-0.5 size-4 shrink-0" aria-hidden />
              {looped ? "Back to Plan: the next campaign moves budget from ads to email, using what this one proved." : "The last step feeds the next plan."}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
