"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { SampleTag, SectionHead } from "./shared";

type Period = "month" | "quarter";

/** Made-up numbers for the visuals; `unit` is the label for the chart's bars (lakh rupees). */
const data = {
  month: {
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    revenue: [18, 22, 20, 27, 31, 36],
    forecast: [20, 21, 24, 26, 30, 34],
    metrics: [
      { label: "Revenue", value: "₹36L", delta: "+24%", up: true },
      { label: "Pipeline value", value: "₹69.8L", delta: "+12%", up: true },
      { label: "Win rate", value: "31%", delta: "+4 pts", up: true },
      { label: "Conversion rate", value: "18%", delta: "+2 pts", up: true },
      { label: "Forecast", value: "₹41L", delta: "Next month", up: true },
      { label: "Deal velocity", value: "34 days", delta: "−3 days", up: true },
    ],
    reps: [
      ["Riya Sharma", 112],
      ["Karan Shah", 96],
      ["Arjun Mehta", 88],
      ["Neha Iyer", 74],
    ] as const,
    velocity: [
      ["Qualified", 6],
      ["Proposal", 11],
      ["Negotiation", 9],
      ["Closing", 8],
    ] as const,
  },
  quarter: {
    labels: ["Q1", "Q2", "Q3", "Q4"],
    revenue: [58, 71, 84, 102],
    forecast: [60, 70, 88, 98],
    metrics: [
      { label: "Revenue", value: "₹1.02Cr", delta: "+21%", up: true },
      { label: "Pipeline value", value: "₹1.9Cr", delta: "+15%", up: true },
      { label: "Win rate", value: "29%", delta: "+3 pts", up: true },
      { label: "Conversion rate", value: "17%", delta: "+1 pt", up: true },
      { label: "Forecast", value: "₹1.18Cr", delta: "Next quarter", up: true },
      { label: "Deal velocity", value: "38 days", delta: "−4 days", up: true },
    ],
    reps: [
      ["Riya Sharma", 108],
      ["Karan Shah", 99],
      ["Arjun Mehta", 91],
      ["Neha Iyer", 80],
    ] as const,
    velocity: [
      ["Qualified", 7],
      ["Proposal", 12],
      ["Negotiation", 10],
      ["Closing", 9],
    ] as const,
  },
};

function RevenueChart({ labels, revenue, forecast }: { labels: string[]; revenue: number[]; forecast: number[] }) {
  const max = Math.max(...revenue, ...forecast) * 1.15;
  const count = revenue.length;
  const x = (index: number) => ((index + 0.5) / count) * 100;
  const y = (value: number) => 100 - (value / max) * 100;
  const line = forecast.map((value, index) => `${index === 0 ? "M" : "L"}${x(index)},${y(value)}`).join(" ");
  return (
    <div>
      <div className="relative h-44">
        <div className="absolute inset-0 flex items-end gap-2 sm:gap-3">
          {revenue.map((value, index) => (
            <div key={labels[index]} className="flex h-full flex-1 items-end">
              <span className="dash-bar w-full rounded-t-lg bg-gradient-to-t from-brand-purple to-violet-400" style={{ height: `${(value / max) * 100}%`, "--d": `${index * 70}ms` } as React.CSSProperties} />
            </div>
          ))}
        </div>
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full" aria-hidden>
          <path d={line} fill="none" stroke="#fbbf24" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-2 flex gap-2 sm:gap-3">
        {labels.map((label) => (
          <span key={label} className="flex-1 text-center text-[11px] text-white/60">
            {label}
          </span>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-white/70">
        <span className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-sm bg-brand-purple" aria-hidden /> Revenue (₹ lakh)
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-0.5 w-4 border-t-2 border-dashed border-amber-400" aria-hidden /> Forecast
        </span>
      </p>
    </div>
  );
}

export function SalesAnalytics() {
  const [period, setPeriod] = useState<Period>("month");
  const view = data[period];

  return (
    <section id="analytics" className="scroll-mt-24 bg-brand-navy py-16 text-white lg:py-24">
      <div className="container-page">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <SectionHead dark eyebrow="Sales Analytics" title="Know What Is Driving Your Revenue" intro="Turn day-to-day activity into clear answers: what is coming in, what is at risk and which part of the process needs attention." />
          <div className="flex items-center gap-3">
            <SampleTag dark />
            <div role="group" aria-label="Reporting period" className="inline-flex rounded-full bg-white/10 p-1">
              {(["month", "quarter"] as const).map((option) => (
                <button
                  key={option}
                  type="button"
                  aria-pressed={period === option}
                  onClick={() => setPeriod(option)}
                  className={cn("rounded-full px-4 py-1.5 text-xs font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-white/70", period === option ? "bg-white text-brand-navy" : "text-white/70 hover:text-white")}
                >
                  {option === "month" ? "Monthly" : "Quarterly"}
                </button>
              ))}
            </div>
          </div>
        </div>

        <dl key={period} className="mt-10 grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-6">
          {view.metrics.map((metric, index) => (
            <div key={metric.label} className="demo-rise rounded-2xl bg-white/5 p-4 ring-1 ring-white/10" style={{ "--d": `${index * 50}ms` } as React.CSSProperties}>
              <dt className="text-xs font-semibold text-white/60">{metric.label}</dt>
              <dd className="mt-1.5 text-2xl font-extrabold tabular-nums">{metric.value}</dd>
              <dd className="mt-1 text-xs font-bold text-emerald-300">{metric.delta}</dd>
            </div>
          ))}
        </dl>

        <div key={`${period}-charts`} className="demo-rise mt-4 grid gap-4 lg:grid-cols-[minmax(0,1.5fr)_minmax(0,1fr)]">
          <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
            <h3 className="mb-4 text-sm font-bold">Revenue and forecast</h3>
            <RevenueChart labels={view.labels} revenue={view.revenue} forecast={view.forecast} />
          </div>

          <div className="grid gap-4">
            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
              <h3 className="mb-4 text-sm font-bold">Sales performance (% of target)</h3>
              <ul className="space-y-3">
                {view.reps.map(([name, value], index) => (
                  <li key={name} className="flex items-center gap-3 text-xs">
                    <span className="w-24 shrink-0 text-white/75">{name}</span>
                    <span className="h-2.5 flex-1 rounded-full bg-white/10">
                      <span className={cn("demo-grow-x block h-full rounded-full", value >= 100 ? "bg-emerald-400" : "bg-gradient-to-r from-violet-400 to-brand-purple")} style={{ width: `${Math.min(value, 120) / 1.2}%`, "--d": `${index * 80}ms` } as React.CSSProperties} />
                    </span>
                    <span className="w-9 text-right font-bold tabular-nums">{value}%</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="rounded-2xl bg-white/5 p-5 ring-1 ring-white/10 sm:p-6">
              <h3 className="mb-4 text-sm font-bold">Deal velocity (days in stage)</h3>
              <ul className="flex items-end gap-3">
                {view.velocity.map(([stage, days], index) => (
                  <li key={stage} className="flex flex-1 flex-col items-center gap-1.5">
                    <span className="text-xs font-bold tabular-nums">{days}d</span>
                    <span className="dash-bar w-full rounded-t-md bg-gradient-to-t from-sky-500 to-sky-300" style={{ height: `${days * 5}px`, "--d": `${index * 70}ms` } as React.CSSProperties} />
                    <span className="text-[10px] text-white/60">{stage}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
