"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

const providers = [
  { key: "aws", label: "AWS", factor: 1, latency: 42, bar: "bg-amber-500", dot: "text-amber-600" },
  { key: "azure", label: "Azure", factor: 1.04, latency: 46, bar: "bg-sky-500", dot: "text-sky-600" },
  { key: "gcp", label: "Google", factor: 0.92, latency: 44, bar: "bg-emerald-500", dot: "text-emerald-600" },
];
const workloads = [
  { name: "CRM", weight: 30 },
  { name: "Finance", weight: 20 },
  { name: "HR", weight: 15 },
  { name: "Analytics", weight: 20 },
  { name: "AI", weight: 15 },
];
const initial = [0, 1, 0, 2, 2];

export function MultiCloudDashboard() {
  const [placement, setPlacement] = useState(initial);
  const [down, setDown] = useState<string>("none");
  const [message, setMessage] = useState<string | null>(null);

  const downIndex = providers.findIndex((provider) => provider.key === down);
  const effective = placement.map((provider) => {
    if (provider !== downIndex) return provider;
    return providers.findIndex((_, index) => index !== downIndex);
  });
  const share = providers.map((_, index) => workloads.reduce((sum, workload, w) => sum + (effective[w] === index ? workload.weight : 0), 0));
  const cost = workloads.reduce((sum, workload, w) => sum + workload.weight * providers[effective[w]].factor, 0) * 0.5;
  const latency = Math.round(workloads.reduce((sum, workload, w) => sum + workload.weight * providers[effective[w]].latency, 0) / 100);
  const failedOver = placement.filter((provider) => provider === downIndex).length;

  const insight =
    message ??
    (downIndex >= 0
      ? `${providers[downIndex].label} is down. ${failedOver} workload${failedOver === 1 ? "" : "s"} failed over automatically. Users saw no outage.`
      : `About ₹${cost.toFixed(1)}L a month across 3 clouds. Move a workload to see cost and latency change.`);

  return (
    <PreviewFrame title="Workload Placement" period="3 cloud providers" insight={insight} badge="No vendor lock-in">
      <div className="mt-4 grid grid-cols-3 gap-2">
        {providers.map((provider, index) => {
          const isDown = index === downIndex;
          return (
            <div key={provider.key} className={cn("rounded-xl px-3 py-2 ring-1 transition-colors", isDown ? "bg-red-50 ring-red-200" : "bg-brand-surface ring-transparent")}>
              <p className="flex items-center gap-1.5 text-[11px] font-bold text-brand-text">
                <span className={cn("size-2 rounded-full", isDown ? "bg-red-500" : "bg-emerald-500")} aria-hidden />
                {provider.label}
                <span className={cn("ml-auto text-[10px] font-semibold", isDown ? "text-red-600" : "text-brand-muted")}>{isDown ? "Down" : "Healthy"}</span>
              </p>
              <p key={share[index]} className="demo-rise text-lg font-extrabold text-brand-text">{share[index]}%</p>
              <span className="block h-1.5 overflow-hidden rounded-full bg-white">
                <span className={cn("block h-full rounded-full transition-all duration-500", provider.bar)} style={{ width: `${share[index]}%` }} />
              </span>
            </div>
          );
        })}
      </div>

      <div className="mt-2.5 rounded-xl bg-brand-surface p-2">
        <div className="grid grid-cols-[80px_repeat(3,1fr)] items-center gap-1.5 text-center text-[10px] font-semibold text-brand-muted">
          <span />
          {providers.map((provider) => (
            <span key={provider.key}>{provider.label}</span>
          ))}
        </div>
        <div role="group" aria-label="Workload placement" className="mt-1 flex flex-col gap-1">
          {workloads.map((workload, w) => (
            <div key={workload.name} className="grid grid-cols-[80px_repeat(3,1fr)] items-center gap-1.5">
              <span className="text-[11px] font-semibold text-brand-text">{workload.name}</span>
              {providers.map((provider, index) => {
                const chosen = placement[w] === index;
                const landed = effective[w] === index && !chosen;
                const dead = index === downIndex;
                return (
                  <button
                    key={provider.key}
                    type="button"
                    aria-pressed={chosen}
                    aria-label={`Run ${workload.name} on ${provider.label}`}
                    onClick={() => {
                      setPlacement((current) => current.map((value, i) => (i === w ? index : value)));
                      setMessage(`${workload.name} now runs on ${provider.label}: ${provider.latency} ms latency, ${provider.factor < 1 ? "lowest cost" : provider.factor > 1 ? "higher cost" : "baseline cost"}.`);
                    }}
                    className={cn(
                      "flex h-5 items-center justify-center rounded-md text-[10px] font-bold outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                      chosen && !dead && "bg-brand-purple text-white ring-brand-purple",
                      chosen && dead && "bg-red-100 text-red-600 ring-red-300 line-through",
                      landed && "bg-emerald-100 text-emerald-800 ring-emerald-300 ring-dashed",
                      !chosen && !landed && "bg-white text-transparent ring-brand-border hover:ring-brand-purple/40"
                    )}
                  >
                    {chosen ? (dead ? "Down" : "●") : landed ? "Failover" : "·"}
                  </button>
                );
              })}
            </div>
          ))}
        </div>
      </div>

      <div className="mt-3 grid grid-cols-2 gap-2">
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Est. monthly cost</p>
          <p key={cost.toFixed(1)} className="demo-rise text-lg font-extrabold text-brand-text">₹{cost.toFixed(1)}L</p>
        </div>
        <div className="rounded-xl bg-brand-surface px-3 py-2">
          <p className="text-[10px] font-semibold text-brand-muted">Avg. latency</p>
          <p key={latency} className="demo-rise text-lg font-extrabold text-brand-text">{latency} ms</p>
        </div>
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <span className="text-[11px] font-semibold text-brand-muted">Simulate an outage</span>
        <Chips
          label="Outage simulation"
          options={[{ key: "none", label: "None" }, ...providers.map((provider) => ({ key: provider.key, label: provider.label }))]}
          value={down}
          onChange={(key) => {
            setDown(key);
            setMessage(null);
          }}
        />
      </div>
    </PreviewFrame>
  );
}
