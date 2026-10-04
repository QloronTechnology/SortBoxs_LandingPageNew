"use client";

import { useEffect, useState } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const metrics = [
  { key: "latency", label: "Latency p95", unit: " ms", base: 240, noise: 36, min: 100, max: 700, threshold: 350, tmin: 200, tmax: 600, digits: 0 },
  { key: "errors", label: "Error rate", unit: "%", base: 0.08, noise: 0.05, min: 0, max: 2, threshold: 0.5, tmin: 0.1, tmax: 1.5, digits: 2 },
  { key: "traffic", label: "Requests/s", unit: "", base: 1240, noise: 120, min: 600, max: 4000, threshold: 2000, tmin: 1200, tmax: 3500, digits: 0 },
  { key: "cpu", label: "CPU", unit: "%", base: 46, noise: 5, min: 20, max: 100, threshold: 70, tmin: 50, tmax: 95, digits: 0 },
] as const;
const POINTS = 30;
const initialSeries = metrics.map((metric) => Array.from({ length: POINTS }, (_, index) => metric.base + Math.sin(index * 0.7 + metric.base) * metric.noise * 0.5));

const fmt = (value: number, digits: number) => value.toFixed(digits);

export function PerformanceDashboard() {
  const [series, setSeries] = useState(initialSeries);
  const [selected, setSelected] = useState(0);
  const [limits, setLimits] = useState<number[]>(metrics.map((metric) => metric.threshold));
  const [spike, setSpike] = useState(0);
  const spiking = spike > 0;

  useEffect(() => {
    const timer = setInterval(() => {
      setSeries((current) =>
        current.map((values, index) => {
          const metric = metrics[index];
          const last = values[values.length - 1];
          const target = metric.base * (spiking && index === 0 ? 2.4 : spiking && index === 1 ? 7 : spiking && index === 3 ? 1.6 : 1);
          const next = Math.min(metric.max, Math.max(metric.min === 0 ? 0.01 : metric.min, last + (target - last) * 0.45 + (Math.random() - 0.5) * metric.noise));
          return [...values.slice(1), next];
        })
      );
      setSpike((count) => Math.max(0, count - 1));
    }, 1000);
    return () => clearInterval(timer);
  }, [spiking]);

  const metric = metrics[selected];
  const values = series[selected];
  const current = values[values.length - 1];
  const range = metric.max - metric.min;
  const y = (value: number) => 36 - ((value - metric.min) / range) * 32;
  const line = values.map((value, index) => `${index === 0 ? "M" : "L"}${((index / (POINTS - 1)) * 100).toFixed(1)} ${y(value).toFixed(1)}`).join(" ");
  const breaches = metrics.map((item, index) => series[index][POINTS - 1] > limits[index]);
  const firstBreach = breaches.findIndex(Boolean);

  const insight =
    firstBreach >= 0
      ? `Alert: ${metrics[firstBreach].label} is ${fmt(series[firstBreach][POINTS - 1], metrics[firstBreach].digits)}${metrics[firstBreach].unit}, above your ${limits[firstBreach]}${metrics[firstBreach].unit} limit. The likely cause is shown in the trace view.`
      : `All signals are healthy. ${metric.label} is steady near ${fmt(metric.base, metric.digits)}${metric.unit}. Try a spike to see an alert fire.`;

  return (
    <PreviewFrame title="Live Health" period="Updates every second" insight={insight} badge={firstBreach >= 0 ? "Alert firing" : "All healthy"}>
      <div className="mt-4 grid grid-cols-4 gap-2" role="group" aria-label="Signals">
        {metrics.map((item, index) => {
          const value = series[index][POINTS - 1];
          const bad = breaches[index];
          const on = index === selected;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(index)}
              className={cn(
                "rounded-xl px-2.5 py-2 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                bad ? "bg-red-50 ring-red-300" : on ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30"
              )}
            >
              <span className="flex items-center gap-1 text-[10px] font-semibold text-brand-muted">
                <span className={cn("size-1.5 rounded-full", bad ? "animate-pulse bg-red-500" : "bg-emerald-500")} aria-hidden />
                <span className="truncate">{item.label}</span>
              </span>
              <span className={cn("block text-sm font-extrabold tabular-nums sm:text-base", bad ? "text-red-600" : "text-brand-text")}>
                {fmt(value, item.digits)}
                <span className="text-[10px] font-semibold text-brand-muted">{item.unit}</span>
              </span>
            </button>
          );
        })}
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center justify-between">
          <SectionLabel>{metric.label}, last 30 seconds</SectionLabel>
          <button
            type="button"
            disabled={spiking}
            onClick={() => setSpike(6)}
            className="flex items-center gap-1 rounded-lg bg-amber-500 px-2.5 py-1 text-[11px] font-semibold text-white outline-none hover:bg-amber-600 focus-visible:ring-2 focus-visible:ring-amber-300 disabled:opacity-50"
          >
            <Zap className="size-3" aria-hidden /> {spiking ? "Spiking…" : "Inject a spike"}
          </button>
        </div>
        <div className="relative mt-2 h-24">
          <svg aria-hidden viewBox="0 0 100 40" preserveAspectRatio="none" className="size-full text-brand-purple">
            <path d={`${line} L100 40 L0 40 Z`} fill="currentColor" fillOpacity="0.12" />
            <path d={line} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
            <line x1="0" x2="100" y1={y(limits[selected])} y2={y(limits[selected])} stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />
          </svg>
          <span className="absolute right-1 text-[10px] font-bold text-red-600" style={{ top: `${(y(limits[selected]) / 40) * 100 - 14}%` }}>
            limit {limits[selected]}
            {metric.unit}
          </span>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-brand-purple-light p-3">
        <label htmlFor="limit" className="flex items-center justify-between text-[11px] font-bold text-brand-text">
          Alert me above
          <span className="rounded-full bg-white px-2 py-0.5 text-brand-purple">
            {limits[selected]}
            {metric.unit}
          </span>
        </label>
        <input
          id="limit"
          type="range"
          min={metric.tmin}
          max={metric.tmax}
          step={metric.digits === 2 ? 0.05 : metric.key === "traffic" ? 50 : 5}
          value={limits[selected]}
          onChange={(event) => setLimits((currentLimits) => currentLimits.map((value, index) => (index === selected ? Number(event.target.value) : value)))}
          className="mt-2 w-full accent-[#6c35f5]"
        />
        <p className="mt-0.5 text-right text-[10px] text-brand-muted">Currently {fmt(current, metric.digits)}{metric.unit}</p>
      </div>
    </PreviewFrame>
  );
}
