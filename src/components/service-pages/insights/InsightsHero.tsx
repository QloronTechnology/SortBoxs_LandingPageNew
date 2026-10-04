"use client";

import { useState, type CSSProperties } from "react";
import { ChartColumn } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/module-landing/previews/Sparkline";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";
import { ServiceCrumbs } from "../shared";

type Range = "week" | "month";

/** Illustrative dashboard values only. */
const views = {
  week: {
    label: "This week",
    kpis: [
      { label: "New tickets", value: "412", delta: "−6%", good: true, spark: [70, 66, 62, 60, 58, 55] },
      { label: "First reply", value: "38 min", delta: "−9 min", good: true, spark: [52, 50, 47, 44, 41, 38] },
      { label: "Resolved", value: "387", delta: "+4%", good: true, spark: [60, 62, 61, 64, 66, 68] },
      { label: "Satisfaction", value: "4.5 / 5", delta: "+0.1", good: true, spark: [4.2, 4.3, 4.3, 4.4, 4.4, 4.5] },
    ],
    bars: [58, 66, 72, 64, 52, 30, 24],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
  },
  month: {
    label: "This month",
    kpis: [
      { label: "New tickets", value: "1,740", delta: "−3%", good: true, spark: [78, 74, 72, 70, 68, 66] },
      { label: "First reply", value: "42 min", delta: "−6 min", good: true, spark: [56, 52, 50, 47, 45, 42] },
      { label: "Resolved", value: "1,688", delta: "+5%", good: true, spark: [58, 60, 63, 65, 66, 70] },
      { label: "Satisfaction", value: "4.4 / 5", delta: "+0.1", good: true, spark: [4.1, 4.2, 4.2, 4.3, 4.3, 4.4] },
    ],
    bars: [310, 360, 402, 380, 410, 290, 250],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7"],
  },
};

const topics = [
  ["Billing and invoices", 32, "from-amber-400 to-orange-500"],
  ["Sign-in and access", 24, "from-violet-400 to-brand-purple"],
  ["Reports and exports", 18, "from-sky-400 to-sky-600"],
  ["How-to questions", 16, "from-emerald-400 to-emerald-600"],
] as const;

function Dashboard() {
  const [range, setRange] = useState<Range>("week");
  const view = views[range];
  const max = Math.max(...view.bars) * 1.1;
  return (
    <MockWindow title="Support dashboard">
      <div className="p-4 sm:p-5">
        <div role="group" aria-label="Period" className="mb-3 inline-flex rounded-full bg-brand-surface p-0.5 ring-1 ring-brand-border">
          {(Object.keys(views) as Range[]).map((key) => (
            <button key={key} type="button" aria-pressed={range === key} onClick={() => setRange(key)} className={cn("rounded-full px-3 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60", range === key ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
              {views[key].label}
            </button>
          ))}
        </div>
        <div key={range} className="demo-rise">
          <dl className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {view.kpis.map((kpi) => (
              <div key={kpi.label} className="rounded-2xl bg-brand-surface p-3 text-brand-purple ring-1 ring-brand-border">
                <dt className="text-[10px] font-semibold text-brand-muted">{kpi.label}</dt>
                <dd className="mt-1 text-base font-extrabold text-brand-text tabular-nums">{kpi.value}</dd>
                <dd className="text-[10px] font-bold text-emerald-600">{kpi.delta}</dd>
                <Sparkline points={kpi.spark} className="mt-1 h-6" />
              </div>
            ))}
          </dl>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.1fr_1fr]">
            <div className="rounded-2xl bg-white p-3.5 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Tickets by {range === "week" ? "day" : "week"}</h3>
              <div className="mt-3 flex h-28 items-end gap-1.5">
                {view.bars.map((value, index) => (
                  <div key={view.labels[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <span className="dash-bar w-full rounded-t-md bg-gradient-to-t from-brand-purple to-violet-400" style={{ height: `${(value / max) * 78}%`, "--d": `${index * 60}ms` } as CSSProperties} />
                    <span className="text-[9px] text-brand-muted">{view.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-3.5 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Top topics</h3>
              <ul className="mt-3 space-y-3">
                {topics.map(([label, value, tone], index) => (
                  <li key={label} className="text-[11px]">
                    <div className="mb-1 flex justify-between text-brand-muted">
                      <span>{label}</span>
                      <b className="text-brand-text">{value}%</b>
                    </div>
                    <span className="block h-2 rounded-full bg-brand-surface">
                      <span className={cn("demo-grow-x block h-full rounded-full bg-gradient-to-r", tone)} style={{ width: `${value * 3}%`, "--d": `${index * 90}ms` } as CSSProperties} />
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function InsightsHero() {
  return (
    <HeroShell
      current="Customer Insights"
      crumbs={<ServiceCrumbs current="Customer Insights" />}
      icon={ChartColumn}
      iconTone="bg-indigo-100 text-indigo-700"
      title="Learn What Customers Need."
      highlight="Fix It at the Source."
      description="Turn every ticket and rating into clear answers about volume, speed, satisfaction and the issues that come up again and again."
      visual={<Dashboard />}
    />
  );
}
