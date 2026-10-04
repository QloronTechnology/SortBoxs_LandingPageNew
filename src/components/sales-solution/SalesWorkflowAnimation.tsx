"use client";

import { useState } from "react";
import { Check, FileText, Funnel, IndianRupee, PackageCheck, Pause, Play, Target, UserPlus, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { rupees, useReducedMotion, useTicker, useTween } from "./hooks";
import { SectionHead } from "./shared";

const stations: { icon: LucideIcon; label: string; detail: string; caption: string }[] = [
  { icon: UserPlus, label: "Lead", detail: "John Smith, Acme Technologies", caption: "A lead enters." },
  { icon: Target, label: "Opportunity", detail: "Qualified, ₹2,40,000", caption: "The lead becomes an opportunity." },
  { icon: Funnel, label: "Pipeline", detail: "Proposal stage, ₹4,80,000", caption: "The opportunity moves through the pipeline." },
  { icon: FileText, label: "Quote", detail: "Quote #QT-1024 sent", caption: "A quote is generated." },
  { icon: PackageCheck, label: "Order", detail: "Order confirmed", caption: "The quote becomes an order." },
  { icon: IndianRupee, label: "Revenue", detail: "Up 24% this quarter", caption: "Revenue updates automatically." },
];

const DEAL = 480000;

/** The page's centrepiece: one deal travelling the whole route while the revenue figure catches up. */
export function SalesWorkflowAnimation() {
  const reduced = useReducedMotion();
  const [paused, setPaused] = useState(false);
  const [tick] = useTicker(stations.length, 1700, reduced || paused, 2);
  // `reached` = index of the last station the deal has reached (-1 before it enters).
  const reached = reduced ? stations.length - 1 : Math.min(tick, stations.length - 1);
  const revenue = useTween(reached >= stations.length - 1 ? DEAL : 0, 1100);
  const caption = stations[reached].caption;

  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#ffffff_0%,#f4f1ff_100%)] py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Lead to revenue" title="Watch a Lead Become Revenue" intro="One sample deal, followed through every stage. Nothing is re-entered along the way." />

        <div className="mt-14 rounded-[2rem] bg-white p-5 shadow-[0_40px_80px_-50px_rgba(108,53,245,0.6)] ring-1 ring-brand-purple/15 sm:p-8">
          <ol className="flex flex-col items-stretch lg:flex-row" aria-label="Lead to revenue stages">
            {stations.map(({ icon: Icon, label, detail }, index) => {
              const isCurrent = index === reached;
              const isDone = index < reached || reduced;
              return (
                <li key={label} className="contents">
                  <div
                    className={cn(
                      "relative mx-auto flex w-full max-w-sm items-center gap-4 rounded-2xl p-4 ring-1 transition-all duration-500 lg:w-[148px] lg:max-w-none lg:flex-col lg:items-center lg:gap-2.5 lg:px-3 lg:py-5 lg:text-center",
                      isCurrent ? "bg-brand-purple text-white shadow-xl shadow-brand-purple/30 ring-brand-purple lg:-translate-y-2" : isDone ? "bg-brand-purple-light/60 text-brand-text ring-brand-purple/20" : "bg-white text-brand-muted ring-brand-border opacity-70"
                    )}
                  >
                    <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", isCurrent ? "bg-white/20" : isDone ? "bg-brand-purple text-white" : "bg-brand-surface")}>
                      {isDone && !isCurrent ? <Check className="size-5" strokeWidth={3} aria-hidden /> : <Icon className="size-5" aria-hidden />}
                    </span>
                    <span className="min-w-0">
                      <span className="block text-sm font-bold">{label}</span>
                      <span className={cn("mt-0.5 block text-xs leading-snug", isCurrent ? "text-white/85" : "text-brand-muted")}>{detail}</span>
                    </span>
                  </div>

                  {index < stations.length - 1 && (
                    <span aria-hidden className="relative mx-auto block h-9 w-1 shrink-0 rounded-full bg-brand-purple/15 lg:mx-0 lg:h-1 lg:w-auto lg:flex-1 lg:self-center">
                      <span className="sw-fill absolute inset-0 rounded-full bg-gradient-to-b from-brand-purple to-violet-400 lg:bg-gradient-to-r" data-on={index < reached || reduced} />
                      {index === reached && reached < stations.length - 1 && !paused && !reduced && <span className="sw-token" />}
                    </span>
                  )}
                </li>
              );
            })}
          </ol>

          <div className="mt-8 grid gap-4 border-t border-brand-border pt-6 sm:grid-cols-[1fr_auto_auto] sm:items-center sm:gap-8">
            <p className="text-lg font-bold text-brand-text" aria-live="off">
              <span className="mr-2 text-brand-purple">{reached + 1}/{stations.length}</span>
              {caption}
            </p>
            <dl className="flex gap-8">
              <div>
                <dt className="text-[11px] font-semibold tracking-wide text-brand-muted uppercase">Deal value</dt>
                <dd className="text-xl font-extrabold text-brand-text tabular-nums">{reached >= 2 ? rupees(DEAL) : reached >= 1 ? rupees(240000) : "—"}</dd>
              </div>
              <div>
                <dt className="text-[11px] font-semibold tracking-wide text-brand-muted uppercase">Revenue booked</dt>
                <dd className="text-xl font-extrabold text-emerald-600 tabular-nums">{rupees(revenue)}</dd>
              </div>
            </dl>
            {!reduced && (
              <button
                type="button"
                aria-pressed={paused}
                onClick={() => setPaused((value) => !value)}
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-brand-surface px-4 py-2.5 text-sm font-semibold text-brand-text ring-1 ring-brand-border outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                {paused ? <Play className="size-4" aria-hidden /> : <Pause className="size-4" aria-hidden />}
                {paused ? "Play animation" : "Pause animation"}
              </button>
            )}
          </div>
        </div>
        <p className="mt-4 text-center text-xs text-brand-muted">Sample data for illustration.</p>
      </div>
    </section>
  );
}
