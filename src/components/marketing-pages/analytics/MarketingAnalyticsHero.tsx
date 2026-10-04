"use client";

import { useState, type CSSProperties } from "react";
import { BarChart3 } from "lucide-react";
import { cn } from "@/lib/utils";
import { Sparkline } from "@/components/module-landing/previews/Sparkline";
import { HeroShell, MockWindow } from "../shared";

type Range = "weeks" | "months";

const views = {
  weeks: {
    label: "Last 6 weeks",
    kpis: [
      { label: "Leads", value: "1,480", delta: "+14%", spark: [180, 210, 220, 260, 290, 320] },
      { label: "Cost per lead", value: "₹612", delta: "−8%", spark: [740, 700, 690, 650, 630, 612] },
      { label: "Conversion", value: "4.6%", delta: "+0.6 pts", spark: [3.8, 4, 4.1, 4.3, 4.5, 4.6] },
      { label: "Return on spend", value: "3.2x", delta: "+0.4x", spark: [2.4, 2.6, 2.8, 2.9, 3.1, 3.2] },
    ],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6"],
    leads: [180, 210, 220, 260, 290, 320],
  },
  months: {
    label: "Last 6 months",
    kpis: [
      { label: "Leads", value: "6,120", delta: "+22%", spark: [780, 840, 960, 1080, 1180, 1280] },
      { label: "Cost per lead", value: "₹655", delta: "−5%", spark: [720, 700, 690, 680, 665, 655] },
      { label: "Conversion", value: "4.1%", delta: "+0.4 pts", spark: [3.4, 3.6, 3.7, 3.9, 4, 4.1] },
      { label: "Return on spend", value: "2.9x", delta: "+0.3x", spark: [2.3, 2.4, 2.6, 2.7, 2.8, 2.9] },
    ],
    labels: ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"],
    leads: [780, 840, 960, 1080, 1180, 1280],
  },
};

const channelShare = [
  ["Paid ads", 34, "from-amber-400 to-orange-500"],
  ["Email", 27, "from-violet-400 to-brand-purple"],
  ["Social", 21, "from-sky-400 to-sky-600"],
  ["Events", 18, "from-emerald-400 to-emerald-600"],
] as const;

function Dashboard() {
  const [range, setRange] = useState<Range>("weeks");
  const view = views[range];
  const max = Math.max(...view.leads) * 1.1;

  return (
    <MockWindow title="Marketing dashboard">
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
                <dd className="mt-1 text-lg font-extrabold text-brand-text tabular-nums">{kpi.value}</dd>
                <dd className="text-[10px] font-bold text-emerald-600">{kpi.delta}</dd>
                <Sparkline points={kpi.spark} className="mt-1 h-6" />
              </div>
            ))}
          </dl>
          <div className="mt-3 grid gap-3 sm:grid-cols-[1.2fr_1fr]">
            <div className="rounded-2xl bg-white p-3.5 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Leads over time</h3>
              <div className="mt-3 flex h-28 items-end gap-2">
                {view.leads.map((value, index) => (
                  <div key={view.labels[index]} className="flex h-full flex-1 flex-col items-center justify-end gap-1">
                    <span className="text-[9px] font-bold text-brand-text tabular-nums">{value.toLocaleString("en-IN")}</span>
                    <span className="dash-bar w-full rounded-t-md bg-gradient-to-t from-brand-purple to-violet-400" style={{ height: `${(value / max) * 70}%`, "--d": `${index * 70}ms` } as CSSProperties} />
                    <span className="text-[9px] text-brand-muted">{view.labels[index]}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-2xl bg-white p-3.5 ring-1 ring-brand-border">
              <h3 className="text-xs font-bold text-brand-text">Leads by channel</h3>
              <ul className="mt-3 space-y-3">
                {channelShare.map(([label, value, tone], index) => (
                  <li key={label} className="text-[11px]">
                    <div className="mb-1 flex justify-between text-brand-muted">
                      <span>{label}</span>
                      <b className="text-brand-text">{value}%</b>
                    </div>
                    <span className="block h-2 rounded-full bg-brand-surface">
                      <span className={cn("demo-grow-x block h-full rounded-full bg-gradient-to-r", tone)} style={{ width: `${value * 2.4}%`, "--d": `${index * 90}ms` } as CSSProperties} />
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

export function MarketingAnalyticsHero() {
  return (
    <HeroShell
      current="Marketing Analytics"
      icon={BarChart3}
      iconTone="bg-emerald-100 text-emerald-700"
      title="Know What Works."
      highlight="Spend on What Pays Back."
      description="See leads, cost and conversion by channel and by campaign, so every rupee of marketing budget goes where it does the most good."
      visual={<Dashboard />}
    />
  );
}
