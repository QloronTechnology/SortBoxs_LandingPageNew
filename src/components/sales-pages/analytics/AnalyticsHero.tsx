"use client";

import { useState, type CSSProperties } from "react";
import { LineChart } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/module-landing/previews/Sparkline";
import { SampleTag } from "@/components/sales-solution/shared";
import { Crumbs, HeroCopy } from "../parts";

type Period = "this" | "last";

/** Illustrative dashboard values only. */
const views = {
  this: {
    kpis: [
      { label: "Revenue", value: "₹36.0L", delta: "+24%", spark: [18, 22, 20, 27, 31, 36] },
      { label: "Deals won", value: "14", delta: "+3", spark: [8, 9, 9, 11, 12, 14] },
      { label: "Conversion rate", value: "18%", delta: "+2 pts", spark: [13, 14, 15, 16, 17, 18] },
      { label: "Pipeline value", value: "₹69.8L", delta: "+12%", spark: [48, 52, 55, 60, 64, 70] },
    ],
    months: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    revenue: [18, 22, 20, 27, 31, 36],
    funnel: [
      ["Leads", 100],
      ["Qualified", 64],
      ["Proposal", 38],
      ["Won", 18],
    ] as const,
  },
  last: {
    kpis: [
      { label: "Revenue", value: "₹29.0L", delta: "+9%", spark: [14, 16, 18, 17, 22, 29] },
      { label: "Deals won", value: "11", delta: "+1", spark: [7, 8, 8, 9, 10, 11] },
      { label: "Conversion rate", value: "16%", delta: "+1 pt", spark: [12, 13, 13, 14, 15, 16] },
      { label: "Pipeline value", value: "₹62.3L", delta: "+6%", spark: [44, 46, 50, 52, 58, 62] },
    ],
    months: ["Dec", "Jan", "Feb", "Mar", "Apr", "May"],
    revenue: [14, 16, 18, 17, 22, 29],
    funnel: [
      ["Leads", 100],
      ["Qualified", 60],
      ["Proposal", 34],
      ["Won", 16],
    ] as const,
  },
};

const stageSlices = [
  { label: "New Lead", value: 42, color: "#38bdf8" },
  { label: "Qualified", value: 28, color: "#8b5cf6" },
  { label: "Proposal", value: 17, color: "#6366f1" },
  { label: "Negotiation", value: 9, color: "#f59e0b" },
  { label: "Won", value: 14, color: "#10b981" },
];

function Donut() {
  const total = stageSlices.reduce((sum, slice) => sum + slice.value, 0);
  const radius = 15.9155;
  const arcs = stageSlices.map((slice, index) => ({ ...slice, offset: stageSlices.slice(0, index).reduce((sum, item) => sum + item.value, 0) }));
  return (
    <div className="flex items-center gap-4">
      <div className="relative size-28 shrink-0">
        <svg viewBox="0 0 36 36" className="size-full -rotate-90" aria-hidden>
          <circle cx="18" cy="18" r={radius} fill="none" stroke="#f1eefc" strokeWidth="5" />
          {arcs.map((slice) => (
            <circle key={slice.label} cx="18" cy="18" r={radius} fill="none" stroke={slice.color} strokeWidth="5" strokeDasharray={`${(slice.value / total) * 100 - 1} ${100 - (slice.value / total) * 100 + 1}`} strokeDashoffset={-((slice.offset / total) * 100)} />
          ))}
        </svg>
        <span className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xl font-extrabold text-brand-text">{total}</span>
          <span className="text-[10px] text-brand-muted">open deals</span>
        </span>
      </div>
      <ul className="space-y-1.5 text-[11px]">
        {stageSlices.map((slice) => (
          <li key={slice.label} className="flex items-center gap-2 text-brand-muted">
            <span className="size-2 rounded-sm" style={{ background: slice.color }} aria-hidden />
            {slice.label} <b className="text-brand-text">{slice.value}</b>
          </li>
        ))}
      </ul>
    </div>
  );
}

function HeroDashboard() {
  const [period, setPeriod] = useState<Period>("this");
  const view = views[period];
  const max = Math.max(...view.revenue) * 1.1;

  return (
    <div className="relative mx-auto w-full max-w-[640px] lg:justify-self-end">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e2dcfb_0%,rgba(226,220,251,0)_70%)]" />
      <div className="relative overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-34px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
        <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border px-5 py-3.5">
          <div className="flex items-center gap-3">
            <span className="flex gap-1.5" aria-hidden>
              <span className="size-2.5 rounded-full bg-rose-300" />
              <span className="size-2.5 rounded-full bg-amber-300" />
              <span className="size-2.5 rounded-full bg-emerald-300" />
            </span>
            <p className="text-sm font-bold text-brand-text">Sales Dashboard</p>
            <SampleTag />
          </div>
          <div role="group" aria-label="Period" className="inline-flex rounded-full bg-brand-surface p-0.5 ring-1 ring-brand-border">
            {(["this", "last"] as const).map((option) => (
              <button
                key={option}
                type="button"
                aria-pressed={period === option}
                onClick={() => setPeriod(option)}
                className={cn("rounded-full px-3 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60", period === option ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}
              >
                {option === "this" ? "Last 6 months" : "Previous 6 months"}
              </button>
            ))}
          </div>
        </div>

        <div key={period} className="demo-rise p-4 sm:p-5">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {view.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-brand-surface p-3.5 text-brand-purple ring-1 ring-brand-border">
                <dt className="text-[11px] font-semibold text-brand-muted">{kpi.label}</dt>
                <dd className="mt-1 flex items-baseline justify-between gap-2">
                  <span className="text-lg font-extrabold text-brand-text tabular-nums">{kpi.value}</span>
                  <span className="text-[11px] font-bold text-emerald-600">{kpi.delta}</span>
                </dd>
                <Sparkline points={kpi.spark} className="mt-1.5 h-7" />
              </div>
            ))}
          </dl>

          <div className="mt-3 grid gap-3 sm:grid-cols-[1.3fr_1fr]">
            <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Monthly revenue (₹ lakh)</h3>
              <div className="mt-3 flex h-28 items-end gap-2">
                {view.revenue.map((value, index) => (
                  <div key={view.months[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <span className="text-[10px] font-bold text-brand-text tabular-nums">{value}</span>
                    <span className="dash-bar w-full rounded-t-md bg-gradient-to-t from-brand-purple to-violet-400" style={{ height: `${(value / max) * 78}%`, "--d": `${index * 70}ms` } as CSSProperties} />
                    <span className="text-[10px] text-brand-muted">{view.months[index]}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Lead conversion</h3>
              <ul className="mt-3 space-y-2.5">
                {view.funnel.map(([label, value], index) => (
                  <li key={label} className="text-[11px]">
                    <div className="mb-1 flex justify-between text-brand-muted">
                      <span>{label}</span>
                      <b className="text-brand-text">{value}%</b>
                    </div>
                    <span className="block h-2.5 rounded-full bg-brand-surface">
                      <span className="demo-grow-x block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${value}%`, "--d": `${index * 90}ms` } as CSSProperties} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white p-4 ring-1 ring-brand-border sm:col-span-2">
              <h3 className="mb-3 text-xs font-bold text-brand-text">Deal stage distribution</h3>
              <Donut />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AnalyticsHero() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(180deg,#f4f1ff_0%,#faf9ff_100%)]">
      <div className="container-page grid items-center gap-12 pt-8 pb-20 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-12 lg:pt-10 lg:pb-16">
        <div>
          <Crumbs current="Sales Analytics" />
          <HeroCopy
            icon={LineChart}
            iconTone="bg-emerald-100 text-emerald-700"
            eyebrow="Sales Analytics"
            title="Turn Sales Data Into"
            highlight="Better Decisions"
            description="Get real-time visibility into sales performance, pipeline health, conversion rates and revenue trends."
          />
        </div>
        <HeroDashboard />
      </div>
    </section>
  );
}
