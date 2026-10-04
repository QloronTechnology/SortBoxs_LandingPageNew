"use client";

import { useState, type MouseEvent } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

type Range = "7d" | "30d" | "90d";
const ranges: { key: Range; label: string }[] = [
  { key: "7d", label: "7D" },
  { key: "30d", label: "30D" },
  { key: "90d", label: "90D" },
];
const datasets: Record<
  Range,
  { revenue: number[]; labels: string[]; kpis: { label: string; value: string; delta: string }[]; unit: string }
> = {
  "7d": {
    revenue: [9.2, 10.1, 9.7, 11.4, 12.2, 11.8, 13.6],
    labels: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"],
    kpis: [
      { label: "Revenue", value: "₹78L", delta: "+6%" },
      { label: "Orders", value: "1,120", delta: "+4%" },
      { label: "Conversion", value: "3.4%", delta: "+0.2%" },
    ],
    unit: "₹ lakh per day",
  },
  "30d": {
    revenue: [31, 34, 33, 38, 41, 44, 43, 49, 52, 55],
    labels: ["D3", "D6", "D9", "D12", "D15", "D18", "D21", "D24", "D27", "D30"],
    kpis: [
      { label: "Revenue", value: "₹4.4Cr", delta: "+11%" },
      { label: "Orders", value: "4,860", delta: "+8%" },
      { label: "Conversion", value: "3.6%", delta: "+0.4%" },
    ],
    unit: "₹ lakh per 3 days",
  },
  "90d": {
    revenue: [92, 98, 104, 111, 119, 126, 133, 140, 148, 156, 165, 172],
    labels: ["W1", "W2", "W3", "W4", "W5", "W6", "W7", "W8", "W9", "W10", "W11", "W12"],
    kpis: [
      { label: "Revenue", value: "₹14.4Cr", "delta": "+19%" },
      { label: "Orders", value: "14,210", delta: "+15%" },
      { label: "Conversion", value: "3.9%", delta: "+0.8%" },
    ],
    unit: "₹ lakh per week",
  },
};

const questions = [
  {
    key: "region",
    chip: "Fastest region?",
    title: "West grew fastest",
    text: "Retail accounts drove most of it.",
    bars: [
      { label: "West", value: 24, top: true },
      { label: "South", value: 18, top: false },
      { label: "North", value: 11, top: false },
      { label: "East", value: 7, top: false },
    ],
    insight: "West grew 24% this year, driven by retail accounts. Want a regional report?",
  },
  {
    key: "refunds",
    chip: "Why did refunds rise?",
    title: "One product drives refunds",
    text: "Electronics returns are up 40%.",
    bars: [
      { label: "Electronics", value: 40, top: true },
      { label: "Apparel", value: 12, top: false },
      { label: "Home", value: 8, top: false },
      { label: "Other", value: 4, top: false },
    ],
    insight: "Refunds rose 40% on electronics, mostly one model. Flag it to the product team?",
  },
  {
    key: "forecast",
    chip: "Next quarter forecast",
    title: "₹1.6Cr projected",
    text: "Based on the open pipeline.",
    bars: [
      { label: "Q1", value: 60, top: false },
      { label: "Q2", value: 74, top: false },
      { label: "Q3", value: 86, top: false },
      { label: "Q4 (est.)", value: 100, top: true },
    ],
    insight: "On the current pipeline, next quarter's revenue is projected at ₹1.6Cr.",
  },
];

export function AnalyticsDashboard() {
  const [range, setRange] = useState<Range>("30d");
  const [hover, setHover] = useState<number | null>(null);
  const [question, setQuestion] = useState(0);
  const data = datasets[range];
  const series = data.revenue;
  const max = Math.max(...series);
  const min = Math.min(...series);
  const coords = series.map((value, index) => [(index / (series.length - 1)) * 100, 34 - ((value - min) / (max - min || 1)) * 28] as const);
  const line = coords.map(([x, y], index) => `${index === 0 ? "M" : "L"}${x.toFixed(1)} ${y.toFixed(1)}`).join(" ");
  const active = questions[question];
  const point = hover ?? series.length - 1;

  const onMove = (event: MouseEvent<HTMLDivElement>) => {
    const rect = event.currentTarget.getBoundingClientRect();
    setHover(Math.min(series.length - 1, Math.max(0, Math.round(((event.clientX - rect.left) / rect.width) * (series.length - 1)))));
  };

  return (
    <PreviewFrame title="Insights Studio" period="All modules" insight={active.insight} badge="Revenue up 11%">
      <div className="mt-4 flex items-center justify-between gap-2">
        <Chips
          label="Date range"
          options={ranges}
          value={range}
          onChange={(next) => {
            setRange(next);
            setHover(null);
          }}
        />
        <span className="text-[11px] font-semibold text-brand-muted">Compared with the previous period</span>
      </div>

      <div key={range} className="mt-3 grid grid-cols-3 gap-2">
        {data.kpis.map((kpi, index) => (
          <div key={kpi.label} className="demo-rise rounded-xl bg-brand-surface px-3 py-2" style={{ "--d": `${index * 70}ms` } as React.CSSProperties}>
            <p className="text-[10px] font-semibold text-brand-muted">{kpi.label}</p>
            <p className="flex flex-wrap items-baseline gap-x-1.5">
              <span className="text-base font-extrabold text-brand-text">{kpi.value}</span>
              <span className="text-[10px] font-bold text-emerald-600">{kpi.delta}</span>
            </p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center justify-between">
          <SectionLabel>{data.unit}</SectionLabel>
          <span className="text-[11px] font-bold text-brand-text">
            {data.labels[point]} · ₹{series[point]}L
          </span>
        </div>
        <div className="relative mt-2 h-[68px] cursor-crosshair" onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
          <svg key={range} aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full text-brand-purple">
            <path d={`${line} L100 40 L0 40 Z`} fill="currentColor" fillOpacity="0.14" />
            <path d={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          </svg>
          {coords.map(([x, y], index) => (
            <span
              key={index}
              aria-hidden
              className={cn(
                "absolute -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple transition-all",
                index === point ? "size-3 ring-4 ring-white" : "size-1.5 opacity-50"
              )}
              style={{ left: `${x}%`, top: `${(y / 40) * 100}%` }}
            />
          ))}
        </div>
      </div>

      <div className="mt-3 border-t border-brand-border pt-3">
        <SectionLabel>Ask your data</SectionLabel>
        <div className="mt-2 flex flex-wrap gap-1.5">
          {questions.map((item, index) => (
            <button
              key={item.key}
              type="button"
              aria-pressed={index === question}
              onClick={() => setQuestion(index)}
              className={cn(
                "rounded-full px-3 py-1 text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                index === question ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text"
              )}
            >
              {item.chip}
            </button>
          ))}
        </div>
        <div key={active.key} className="demo-rise mt-2 rounded-xl bg-brand-purple-light px-3 py-2.5">
          <p className="text-[13px] font-bold text-brand-text">{active.title}</p>
          <p className="text-[11px] text-brand-muted">{active.text}</p>
          <ul className="mt-2 flex flex-col gap-1">
            {active.bars.map((bar) => (
              <li key={bar.label} className="grid grid-cols-[64px_1fr_32px] items-center gap-2 text-[11px]">
                <span className="truncate font-medium text-brand-muted">{bar.label}</span>
                <span className="h-1.5 rounded-full bg-white">
                  <span className={cn("demo-grow-x block h-full rounded-full", bar.top ? "bg-brand-purple" : "bg-brand-purple/40")} style={{ width: `${bar.value}%` }} />
                </span>
                <span className="text-right font-bold text-brand-text">{bar.value}%</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PreviewFrame>
  );
}
