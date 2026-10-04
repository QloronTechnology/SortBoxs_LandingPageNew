"use client";

import { useState, type CSSProperties } from "react";
import { Crosshair, LineChart, Lightbulb, Layers, Trophy, TrendingUp, Users, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Performance at a glance */

type Metric = "revenue" | "deals" | "winrate";

const months = ["Jun", "Jul", "Aug", "Sep", "Oct", "Nov"];
const series: Record<Metric, { label: string; unit: string; actual: number[]; forecast: number[]; format: (value: number) => string }> = {
  revenue: { label: "Revenue", unit: "₹ lakh", actual: [18, 22, 20, 27, 31, 36], forecast: [20, 21, 24, 26, 30, 34], format: (value) => `₹${value}L` },
  deals: { label: "Deals won", unit: "deals", actual: [8, 9, 9, 11, 12, 14], forecast: [8, 9, 10, 11, 12, 13], format: (value) => `${value}` },
  winrate: { label: "Win rate", unit: "%", actual: [24, 25, 27, 28, 30, 31], forecast: [25, 26, 26, 28, 29, 30], format: (value) => `${value}%` },
};

const leaderboard = [
  ["Riya Sharma", 112],
  ["Karan Shah", 96],
  ["Arjun Mehta", 88],
  ["Neha Iyer", 74],
] as const;

const wins = [
  ["Bluepeak Foods", "₹3,10,000", "Karan Shah", "Today"],
  ["Vertex Labs", "₹2,80,000", "Riya Sharma", "Yesterday"],
  ["Harbor Exports", "₹2,80,000", "Arjun Mehta", "Mon"],
];

function TrendChart({ metric }: { metric: Metric }) {
  const data = series[metric];
  const max = Math.max(...data.actual, ...data.forecast) * 1.12;
  const min = Math.min(...data.actual, ...data.forecast) * 0.8;
  const point = (value: number, index: number) => `${(index / (months.length - 1)) * 100},${100 - ((value - min) / (max - min)) * 100}`;
  const actual = data.actual.map((value, index) => `${index === 0 ? "M" : "L"}${point(value, index)}`).join(" ");
  const forecast = data.forecast.map((value, index) => `${index === 0 ? "M" : "L"}${point(value, index)}`).join(" ");
  return (
    <div key={metric} className="demo-rise">
      <div className="relative h-48">
        <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="reveal-x absolute inset-0 size-full overflow-visible" aria-hidden>
          <defs>
            <linearGradient id="glance-fill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#6c35f5" stopOpacity="0" />
            </linearGradient>
          </defs>
          {[25, 50, 75].map((y) => (
            <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#eeeaff" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          <path d={`${actual} L100,100 L0,100 Z`} fill="url(#glance-fill)" />
          <path d={forecast} fill="none" stroke="#f59e0b" strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" vectorEffect="non-scaling-stroke" />
          <path d={actual} fill="none" stroke="#6c35f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
        </svg>
      </div>
      <div className="mt-2 flex justify-between text-[11px] text-brand-muted">
        {months.map((month) => (
          <span key={month}>{month}</span>
        ))}
      </div>
      <p className="mt-3 flex flex-wrap gap-x-5 gap-y-1 text-[11px] text-brand-muted">
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 bg-brand-purple" aria-hidden /> Actual ({data.unit})</span>
        <span className="flex items-center gap-1.5"><span className="h-0.5 w-4 border-t-2 border-dashed border-amber-500" aria-hidden /> Forecast</span>
      </p>
    </div>
  );
}

export function PerformanceGlance() {
  const [metric, setMetric] = useState<Metric>("revenue");
  const data = series[metric];
  const attainment = 82;
  const radius = 42;
  const circumference = 2 * Math.PI * radius;

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Dashboard" title="Your Sales Performance at a Glance" intro="Targets, trends, the team and the latest wins on one screen. No spreadsheet, no waiting for the Monday report." />

        <div className="mt-12 grid gap-4 lg:grid-cols-12">
          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-6 lg:col-span-3">
            <h3 className="text-sm font-bold text-brand-text">Quarter target</h3>
            <div className="relative mx-auto mt-4 size-40">
              <svg viewBox="0 0 100 100" className="size-full -rotate-90" aria-hidden>
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#eeeaff" strokeWidth="10" />
                <circle cx="50" cy="50" r={radius} fill="none" stroke="#6c35f5" strokeWidth="10" strokeLinecap="round" strokeDasharray={`${(circumference * attainment) / 100} ${circumference}`} className="transition-all duration-1000" />
              </svg>
              <span className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-extrabold text-brand-text">{attainment}%</span>
                <span className="text-[11px] text-brand-muted">of target</span>
              </span>
            </div>
            <dl className="mt-4 grid grid-cols-2 gap-2 text-center text-xs">
              <div className="rounded-xl bg-brand-surface p-2.5"><dt className="text-brand-muted">Closed</dt><dd className="font-extrabold text-brand-text">₹82L</dd></div>
              <div className="rounded-xl bg-brand-surface p-2.5"><dt className="text-brand-muted">Target</dt><dd className="font-extrabold text-brand-text">₹1.0Cr</dd></div>
            </dl>
            <p className="mt-3 text-center"><SampleTag /></p>
          </div>

          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-6 lg:col-span-6">
            <div className="flex flex-wrap items-center justify-between gap-3">
              <h3 className="text-sm font-bold text-brand-text">{data.label}: actual and forecast</h3>
              <div role="group" aria-label="Metric" className="inline-flex rounded-full bg-brand-surface p-0.5 ring-1 ring-brand-border">
                {(Object.keys(series) as Metric[]).map((key) => (
                  <button key={key} type="button" aria-pressed={metric === key} onClick={() => setMetric(key)} className={cn("rounded-full px-3 py-1 text-[11px] font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60", metric === key ? "bg-brand-purple text-white shadow-sm" : "text-brand-muted hover:text-brand-text")}>
                    {series[key].label}
                  </button>
                ))}
              </div>
            </div>
            <p className="mt-3 text-3xl font-extrabold text-brand-text tabular-nums">{data.format(data.actual[data.actual.length - 1])}</p>
            <div className="mt-4"><TrendChart metric={metric} /></div>
          </div>

          <div className="rounded-3xl bg-white p-5 ring-1 ring-brand-border sm:p-6 lg:col-span-3">
            <h3 className="flex items-center gap-2 text-sm font-bold text-brand-text"><Trophy className="size-4 text-amber-500" aria-hidden /> Team leaderboard</h3>
            <p className="text-[11px] text-brand-muted">% of individual target</p>
            <InView>
            <ul className="mt-4 space-y-3.5">
              {leaderboard.map(([name, value], index) => (
                <li key={name}>
                  <div className="mb-1 flex items-center gap-2 text-xs">
                    <Avatar name={name} tone={avatarTones[index % avatarTones.length]} className="size-6 text-[9px]" />
                    <span className="flex-1 font-semibold text-brand-text">{name}</span>
                    <b className="tabular-nums text-brand-text">{value}%</b>
                  </div>
                  <span className="block h-2 rounded-full bg-brand-surface">
                    <span className={cn("view-grow block h-full rounded-full", value >= 100 ? "bg-emerald-500" : "bg-gradient-to-r from-violet-400 to-brand-purple")} style={{ width: `${Math.min(value, 120) / 1.2}%`, "--d": `${index * 90}ms` } as CSSProperties} />
                  </span>
                </li>
              ))}
            </ul>
            </InView>
          </div>

          <div className="rounded-3xl bg-brand-navy p-5 text-white sm:p-6 lg:col-span-12">
            <h3 className="flex items-center gap-2 text-sm font-bold"><TrendingUp className="size-4 text-emerald-300" aria-hidden /> Recent wins</h3>
            <ul className="mt-4 grid gap-3 sm:grid-cols-3">
              {wins.map(([company, value, rep, when]) => (
                <li key={company} className="rounded-2xl bg-white/5 p-4 ring-1 ring-white/10">
                  <p className="text-sm font-bold">{company}</p>
                  <p className="mt-0.5 text-lg font-extrabold text-emerald-300 tabular-nums">{value}</p>
                  <p className="mt-1 text-xs text-white/60">{rep} · {when}</p>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Questions the dashboard answers */

type Topic = { key: string; icon: LucideIcon; title: string; question: string; body: string };
const topics: Topic[] = [
  { key: "performance", icon: Crosshair, title: "Sales performance", question: "Are we on track this quarter?", body: "Compare closed revenue with target, by month, by team or by rep." },
  { key: "pipeline", icon: Layers, title: "Pipeline insights", question: "Is there enough in the pipeline?", body: "See value and count by stage, and where deals are piling up." },
  { key: "revenue", icon: LineChart, title: "Revenue trends", question: "What is the revenue trend?", body: "Follow revenue month over month and spot changes early." },
  { key: "team", icon: Users, title: "Team performance", question: "Who needs support?", body: "Review each rep's results next to their target, then coach." },
  { key: "forecast", icon: TrendingUp, title: "Forecasting", question: "What will we close next month?", body: "A forecast built from live deals and stage probabilities." },
  { key: "decisions", icon: Lightbulb, title: "Data-driven decisions", question: "What should we do next?", body: "Turn the numbers into the next action for the team." },
];

function TopicVisual({ topic }: { topic: string }) {
  switch (topic) {
    case "performance":
      return (
        <div className="space-y-4">
          {[["Q1", 92], ["Q2", 104], ["Q3", 97], ["Q4 so far", 82]].map(([label, value], index) => (
            <div key={label as string}>
              <div className="mb-1 flex justify-between text-xs text-white/70"><span>{label}</span><b className="text-white">{value}% of target</b></div>
              <span className="block h-3 rounded-full bg-white/10"><span className="demo-grow-x block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${Math.min(value as number, 110) / 1.1}%`, "--d": `${index * 80}ms` } as CSSProperties} /></span>
            </div>
          ))}
        </div>
      );
    case "pipeline":
      return (
        <div className="flex h-40 items-end gap-3">
          {[["New", 42, "#38bdf8"], ["Qualified", 28, "#8b5cf6"], ["Proposal", 17, "#6366f1"], ["Negotiation", 9, "#f59e0b"], ["Won", 14, "#10b981"]].map(([label, count, color], index) => (
            <div key={label as string} className="flex flex-1 flex-col items-center justify-end gap-1.5">
              <span className="text-xs font-bold">{count}</span>
              <span className="dash-bar w-full rounded-t-lg" style={{ height: `${(count as number) * 2.6}px`, background: color as string, "--d": `${index * 70}ms` } as CSSProperties} />
              <span className="text-[10px] text-white/60">{label}</span>
            </div>
          ))}
        </div>
      );
    case "revenue":
      return (
        <svg viewBox="0 0 100 50" className="reveal-x h-40 w-full" preserveAspectRatio="none" aria-hidden>
          <path d="M0,40 L20,34 L40,36 L60,22 L80,16 L100,6" fill="none" stroke="#a78bfa" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d="M0,40 L20,34 L40,36 L60,22 L80,16 L100,6 L100,50 L0,50 Z" fill="#a78bfa" opacity="0.15" />
        </svg>
      );
    case "team":
      return (
        <ul className="space-y-3">
          {leaderboard.map(([name, value], index) => (
            <li key={name} className="flex items-center gap-3 text-sm">
              <Avatar name={name} tone={avatarTones[index % avatarTones.length]} />
              <span className="w-28 text-white/80">{name}</span>
              <span className="h-2.5 flex-1 rounded-full bg-white/10"><span className="demo-grow-x block h-full rounded-full bg-emerald-400" style={{ width: `${Math.min(value, 120) / 1.2}%`, "--d": `${index * 90}ms` } as CSSProperties} /></span>
              <b className="w-10 text-right tabular-nums">{value}%</b>
            </li>
          ))}
        </ul>
      );
    case "forecast":
      return (
        <div className="grid grid-cols-3 gap-3 text-center">
          {[["Commit", "₹28L", "bg-emerald-400/15 text-emerald-300"], ["Likely", "₹13L", "bg-violet-400/15 text-violet-200"], ["Upside", "₹9L", "bg-amber-400/15 text-amber-200"]].map(([label, value, tone]) => (
            <div key={label} className={cn("rounded-2xl p-4", tone)}>
              <p className="text-xs font-semibold opacity-80">{label}</p>
              <p className="mt-1 text-2xl font-extrabold tabular-nums">{value}</p>
            </div>
          ))}
          <p className="col-span-3 text-left text-xs text-white/60">Next month, grouped by how likely each deal is to close.</p>
        </div>
      );
    default:
      return (
        <ul className="space-y-3">
          {["Meridian Steel has had no activity for 9 days. Schedule a check-in.", "Win rate rises when a proposal goes out within two days of the demo.", "East territory is behind target. Review coverage with the team."].map((text) => (
            <li key={text} className="flex gap-3 rounded-2xl bg-white/5 p-4 text-sm leading-relaxed text-white/85 ring-1 ring-white/10">
              <Lightbulb className="mt-0.5 size-4 shrink-0 text-amber-300" aria-hidden /> {text}
            </li>
          ))}
        </ul>
      );
  }
}

export function QuestionsExplorer() {
  const [active, setActive] = useState(0);
  const topic = topics[active];
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="What you can answer" title="Six questions every sales manager asks" intro="Pick a question to see the kind of view that answers it." />
        <div className="mt-12 grid items-stretch gap-5 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
          <div role="tablist" aria-label="Analytics topics" aria-orientation="vertical" className="grid gap-2">
            {topics.map(({ key, icon: Icon, title, question, body }, index) => (
              <button
                key={key}
                type="button"
                role="tab"
                aria-selected={index === active}
                onClick={() => setActive(index)}
                className={cn("flex items-start gap-4 rounded-2xl p-4 text-left outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "bg-brand-purple-light ring-brand-purple/40" : "bg-white ring-brand-border hover:bg-brand-surface")}
              >
                <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", index === active ? "bg-brand-purple text-white" : "bg-brand-surface text-brand-purple")}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span>
                  <span className="block text-[11px] font-bold tracking-wide text-brand-muted uppercase">{title}</span>
                  <span className="block text-[15px] font-bold text-brand-text">{question}</span>
                  {index === active && <span className="mt-1 block text-sm text-brand-muted">{body}</span>}
                </span>
              </button>
            ))}
          </div>
          <div role="tabpanel" key={topic.key} className="demo-rise flex flex-col rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <div className="flex items-center justify-between gap-3">
              <p className="text-sm font-bold">{topic.title}</p>
              <SampleTag dark />
            </div>
            <p className="mt-1 text-xl font-extrabold">{topic.question}</p>
            <div className="mt-8 flex-1">
              <TopicVisual topic={topic.key} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
