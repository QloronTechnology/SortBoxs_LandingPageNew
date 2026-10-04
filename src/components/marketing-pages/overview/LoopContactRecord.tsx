"use client";

import { useState } from "react";
import { BarChart3, Calendar, Check, Magnet, Mail, Route, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";

/** Option 2: one contact record that picks up data at every step of the loop, which is why the last step can credit the first. */
const steps: { icon: LucideIcon; label: string; field: string; value: string; note: string; tone: string; soft: string }[] = [
  { icon: Calendar, label: "Plan", field: "Source campaign", value: "Festive offer · Social ad", note: "The campaign that first reached her is saved on the record.", tone: "bg-violet-500", soft: "bg-violet-50 ring-violet-200" },
  { icon: Magnet, label: "Capture", field: "Lead score", value: "78 · Hot", note: "Her form and page visits add up to a score.", tone: "bg-rose-500", soft: "bg-rose-50 ring-rose-200" },
  { icon: Mail, label: "Engage", field: "Email activity", value: "3 opened · 1 clicked", note: "Every email she opens or clicks is logged.", tone: "bg-sky-500", soft: "bg-sky-50 ring-sky-200" },
  { icon: Route, label: "Guide", field: "Journey stage", value: "Decision", note: "Her stage updates as she moves along the journey.", tone: "bg-amber-500", soft: "bg-amber-50 ring-amber-200" },
  { icon: BarChart3, label: "Measure", field: "Revenue", value: "₹3,10,000 · credited to Festive offer", note: "Because it is one record, the deal is credited to the campaign that started it.", tone: "bg-emerald-500", soft: "bg-emerald-50 ring-emerald-200" },
];

export function LoopContactRecord() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(steps.length, 2200, reduced || taken, 2);
  const active = reduced ? steps.length - 1 : Math.min(tick, steps.length - 1);
  const current = steps[active];

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="How marketing works in SortBoxs" title="One loop, from plan to proof" intro="Every step adds to the same contact record. That is how the last step can prove what the first one started." />

        <ol aria-label="Loop steps" className="relative mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-5 sm:gap-0">
          <span aria-hidden className="absolute top-[30px] right-[10%] left-[10%] hidden h-1 rounded-full bg-brand-purple/15 sm:block" />
          <span aria-hidden className="absolute top-[30px] left-[10%] hidden h-1 rounded-full bg-brand-purple transition-all duration-700 sm:block" style={{ width: `${(active / (steps.length - 1)) * 80}%` }} />
          {steps.map(({ icon: Icon, label, tone }, index) => (
            <li key={label} className="flex sm:justify-center">
              <button
                type="button"
                aria-current={index === active ? "step" : undefined}
                onClick={() => {
                  setTaken(true);
                  setTick(index);
                }}
                className="flex w-full items-center gap-3 rounded-2xl p-1.5 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple sm:w-auto sm:flex-col sm:text-center"
              >
                <span className={cn("flex size-[60px] shrink-0 items-center justify-center rounded-2xl text-white ring-4 ring-white transition-all duration-300", index <= active ? tone : "bg-brand-border", index === active && "scale-110 shadow-lg")}>
                  {index < active ? <Check className="size-6" strokeWidth={3} aria-hidden /> : <Icon className="size-6" aria-hidden />}
                </span>
                <span className={cn("text-sm font-bold", index === active ? "text-brand-purple" : "text-brand-muted")}>{label}</span>
              </button>
            </li>
          ))}
        </ol>

        <div className="mx-auto mt-10 grid max-w-5xl items-start gap-6 lg:grid-cols-[minmax(0,1.2fr)_minmax(0,0.8fr)]">
          <div className="rounded-3xl bg-brand-surface p-5 shadow-[0_30px_60px_-40px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-3">
                <Avatar name="Priya Nair" tone={avatarTones[0]} className="size-12 text-sm" />
                <div>
                  <p className="text-lg font-extrabold text-brand-text">Priya Nair</p>
                  <p className="text-xs text-brand-muted">Operations Manager · Zenith Pharma</p>
                </div>
              </div>
              <SampleTag />
            </div>
            <dl className="mt-5 space-y-2.5">
              {steps.map(({ icon: Icon, field, value, tone, soft }, index) => {
                const filled = index <= active;
                return (
                  <div key={field} className={cn("flex items-center gap-3 rounded-xl p-3 ring-1 transition-all duration-500", filled ? soft : "bg-white/60 ring-brand-border", index === active && "shadow-md")}>
                    <span className={cn("flex size-8 shrink-0 items-center justify-center rounded-lg text-white transition-colors duration-500", filled ? tone : "bg-brand-border")}>
                      <Icon className="size-4" aria-hidden />
                    </span>
                    <dt className="w-32 shrink-0 text-xs font-bold text-brand-muted">{field}</dt>
                    <dd className={cn("min-w-0 text-sm font-bold transition-colors", filled ? "text-brand-text" : "text-brand-muted/60")}>
                      {filled ? <span key={`${field}-${active}`} className={cn(index === active && "demo-rise inline-block")}>{value}</span> : "Not yet"}
                    </dd>
                  </div>
                );
              })}
            </dl>
          </div>

          <div key={active} className="demo-rise rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <span className={cn("flex size-12 items-center justify-center rounded-2xl text-white", current.tone)}>
              <current.icon className="size-6" aria-hidden />
            </span>
            <p className="mt-4 text-[11px] font-bold tracking-wide text-violet-300 uppercase">Step {active + 1}: {current.label}</p>
            <p className="mt-1 text-xl font-extrabold">{current.field} added</p>
            <p className="mt-3 text-sm leading-relaxed text-white/80">{current.note}</p>
            {active === steps.length - 1 && <p className="mt-5 rounded-xl bg-emerald-400/15 px-4 py-3 text-sm font-semibold text-emerald-300">Plan → Measure, on one record. No spreadsheets joined by hand.</p>}
          </div>
        </div>
      </div>
    </section>
  );
}
