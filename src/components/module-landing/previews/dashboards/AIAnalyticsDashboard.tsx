"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const history = [62, 66, 64, 70, 74, 78];
const baseForecast = [82, 86, 91, 95];
const labels = ["M1", "M2", "M3", "M4", "M5", "M6", "M7", "M8", "M9", "M10"];
const anomalies = [
  { title: "Refunds up 40%", index: 4, text: "Refunds rose 40% in month 5, mostly on one product. It pulled revenue down about ₹3L." },
  { title: "12 accounts at churn risk", index: 5, text: "12 accounts show falling usage and a recent complaint. Together they hold about ₹9L a year." },
];

export function AIAnalyticsDashboard() {
  const [spend, setSpend] = useState(0);
  const [flag, setFlag] = useState<number | null>(null);

  const factor = (position: number) => 1 + (spend / 100) * 0.3 * ((position + 1) / baseForecast.length);
  const forecast = baseForecast.map((value, index) => Math.round(value * factor(index) * 10) / 10);
  const band = forecast.map((value, index) => ({ low: value * (1 - (0.06 + index * 0.015)), high: value * (1 + (0.06 + index * 0.015)) }));
  const max = Math.max(...band.map((b) => b.high), ...history);
  const min = Math.min(...history, ...band.map((b) => b.low));
  const x = (index: number) => (index / (labels.length - 1)) * 100;
  const y = (value: number) => 36 - ((value - min) / (max - min || 1)) * 30;
  const histLine = history.map((v, i) => `${i === 0 ? "M" : "L"}${x(i).toFixed(1)} ${y(v).toFixed(1)}`).join(" ");
  const foreLine = [history.length - 1, ...forecast.map((_, i) => history.length + i)]
    .map((idx, i) => `${i === 0 ? "M" : "L"}${x(idx).toFixed(1)} ${y(idx < history.length ? history[idx] : forecast[idx - history.length]).toFixed(1)}`)
    .join(" ");
  const upper = band.map((b, i) => `${x(history.length + i).toFixed(1)} ${y(b.high).toFixed(1)}`);
  const lower = band.map((b, i) => `${x(history.length + i).toFixed(1)} ${y(b.low).toFixed(1)}`).reverse();
  const bandPath = `M${x(history.length - 1).toFixed(1)} ${y(history[history.length - 1]).toFixed(1)} L${upper.join(" L")} L${lower.join(" L")} Z`;

  const total = Math.round(forecast.reduce((sum, v) => sum + v, 0) * 10) / 10;
  const baseTotal = baseForecast.reduce((sum, v) => sum + v, 0);
  const delta = Math.round((total - baseTotal) * 10) / 10;
  const insight =
    flag !== null
      ? anomalies[flag].text
      : spend === 0
        ? "At today's spend, the next 4 months are projected at ₹" + total + "L. Move the slider to test a scenario."
        : `${spend > 0 ? "Raising" : "Cutting"} marketing spend by ${Math.abs(spend)}% moves the 4-month projection by ${delta > 0 ? "+" : ""}₹${delta}L. The range widens further out.`;

  return (
    <PreviewFrame title="Predictive View" period="Next 4 months" insight={insight} badge="Forecast refreshed today">
      <div className="mt-4 grid grid-cols-[1fr_auto] items-end gap-3">
        <div>
          <SectionLabel>Projected revenue</SectionLabel>
          <p className="flex items-baseline gap-2">
            <span key={total} className="demo-rise text-2xl font-extrabold text-brand-text">₹{total}L</span>
            <span className={cn("rounded-full px-1.5 py-0.5 text-[10px] font-bold", delta >= 0 ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
              {delta >= 0 ? "+" : ""}₹{delta}L vs today
            </span>
          </p>
        </div>
        <p className="text-right text-[10px] font-semibold text-brand-muted">80% confidence range</p>
      </div>

      <div className="relative mt-2 h-24 rounded-xl bg-brand-surface">
        <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full text-brand-purple">
          <path d={bandPath} fill="currentColor" fillOpacity="0.16" />
          <path d={histLine} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
          <path d={foreLine} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="3 5" vectorEffect="non-scaling-stroke" />
          <line x1={x(history.length - 1)} x2={x(history.length - 1)} y1="0" y2="40" stroke="currentColor" strokeOpacity="0.3" strokeDasharray="2 3" vectorEffect="non-scaling-stroke" />
        </svg>
        {flag !== null && (
          <span
            className="demo-rise absolute -translate-x-1/2 -translate-y-full rounded-md bg-red-500 px-1.5 py-0.5 text-[10px] font-bold whitespace-nowrap text-white shadow"
            style={{ left: `${x(anomalies[flag].index)}%`, top: `${(y(history[anomalies[flag].index] ?? forecast[anomalies[flag].index - history.length]) / 40) * 100}%` }}
          >
            {anomalies[flag].title}
          </span>
        )}
        <div className="pointer-events-none absolute inset-x-0 bottom-0.5 flex justify-between px-1 text-[9px] font-medium text-brand-muted">
          {labels.map((label) => (
            <span key={label}>{label}</span>
          ))}
        </div>
        <span className="absolute top-1 left-2 text-[10px] font-semibold text-brand-muted">Actual</span>
        <span className="absolute top-1 right-2 text-[10px] font-semibold text-brand-purple">Forecast</span>
      </div>

      <div className="mt-3 rounded-xl bg-brand-purple-light p-3">
        <label htmlFor="spend" className="flex items-center justify-between text-[11px] font-bold text-brand-text">
          What if marketing spend changes?
          <span className="rounded-full bg-white px-2 py-0.5 text-brand-purple">
            {spend > 0 ? "+" : ""}
            {spend}%
          </span>
        </label>
        <input
          id="spend"
          type="range"
          min={-20}
          max={40}
          step={10}
          value={spend}
          onChange={(event) => {
            setSpend(Number(event.target.value));
            setFlag(null);
          }}
          className="mt-2 w-full accent-[#6c35f5]"
        />
        <div className="flex justify-between text-[10px] text-brand-muted">
          <span>-20%</span>
          <span>Today</span>
          <span>+40%</span>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5">
        <SectionLabel className="mr-1">Anomalies</SectionLabel>
        {anomalies.map((item, index) => (
          <button
            key={item.title}
            type="button"
            aria-pressed={flag === index}
            onClick={() => setFlag(flag === index ? null : index)}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
              flag === index ? "bg-red-500 text-white ring-red-500" : "bg-white text-red-600 ring-red-200 hover:bg-red-50"
            )}
          >
            {item.title}
          </button>
        ))}
      </div>
    </PreviewFrame>
  );
}
