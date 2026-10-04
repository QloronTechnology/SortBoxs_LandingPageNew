"use client";

import { useState } from "react";
import { ArrowRight, Check, Cloud, Server, Users, Minus } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const options = {
  cloud: { label: "Cloud", app: "SortBoxs cloud", data: "SortBoxs cloud", setup: 95, control: 40, effort: 10, keys: false, airgap: false, managed: true, time: "minutes" },
  private: { label: "Private", app: "Your cloud account", data: "Your cloud account", setup: 70, control: 75, effort: 35, keys: true, airgap: false, managed: true, time: "days" },
  onprem: { label: "On-premise", app: "Your data centre", data: "Your data centre", setup: 35, control: 100, effort: 80, keys: true, airgap: true, managed: false, time: "weeks" },
  hybrid: { label: "Hybrid", app: "SortBoxs cloud", data: "Your data centre", setup: 55, control: 85, effort: 50, keys: true, airgap: false, managed: true, time: "weeks" },
} as const;
type Key = keyof typeof options;
const regions = [
  { key: "india", label: "India" },
  { key: "eu", label: "EU" },
  { key: "us", label: "US" },
];
const meters = [
  { key: "setup", label: "Speed to start", bar: "bg-emerald-500" },
  { key: "control", label: "Control", bar: "bg-brand-purple" },
  { key: "effort", label: "Your effort", bar: "bg-amber-500" },
] as const;

export function CloudDeploymentDashboard() {
  const [option, setOption] = useState<Key>("cloud");
  const [region, setRegion] = useState("india");
  const current = options[option];
  const regionLabel = regions.find((item) => item.key === region)!.label;

  const insight = `${current.label}: live in ${current.time}. Data stays in ${regionLabel}${current.data === "SortBoxs cloud" ? ", hosted by SortBoxs" : ", on infrastructure you control"}.`;

  return (
    <PreviewFrame title="Deployment Planner" period="Choose your home" insight={insight} badge="Same features everywhere">
      <div className="mt-4">
        <Chips label="Deployment option" options={Object.entries(options).map(([key, value]) => ({ key: key as Key, label: value.label }))} value={option} onChange={setOption} />
      </div>

      <div key={option} className="demo-rise mt-3 grid grid-cols-[1fr_auto_1.2fr_auto_1.2fr] items-center gap-1.5 rounded-xl bg-brand-surface p-3">
        <div className="flex flex-col items-center gap-1 rounded-lg bg-white p-2 text-center ring-1 ring-brand-border">
          <Users className="size-5 text-brand-purple" aria-hidden />
          <span className="text-[10px] font-bold text-brand-text">Your team</span>
          <span className="text-[9px] text-brand-muted">Anywhere</span>
        </div>
        <ArrowRight className="size-3.5 text-brand-muted" aria-hidden />
        <div className="flex flex-col items-center gap-1 rounded-lg bg-brand-purple p-2 text-center text-white shadow-lg shadow-brand-purple/25">
          <Cloud className="size-5" aria-hidden />
          <span className="text-[10px] font-bold">SortBoxs app</span>
          <span className="text-[9px] text-white/80">{current.app}</span>
        </div>
        <ArrowRight className="size-3.5 text-brand-muted" aria-hidden />
        <div className={cn("flex flex-col items-center gap-1 rounded-lg p-2 text-center ring-1", current.data === "SortBoxs cloud" ? "bg-white ring-brand-border" : "bg-emerald-50 ring-emerald-300")}>
          <Server className={cn("size-5", current.data === "SortBoxs cloud" ? "text-brand-purple" : "text-emerald-600")} aria-hidden />
          <span className="text-[10px] font-bold text-brand-text">Your data</span>
          <span className="text-[9px] text-brand-muted">{current.data}</span>
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-2">
        {meters.map((meter) => (
          <li key={meter.key} className="grid grid-cols-[96px_1fr_34px] items-center gap-2 text-[11px]">
            <span className="font-medium text-brand-muted">{meter.label}</span>
            <span className="h-2.5 overflow-hidden rounded-full bg-brand-surface">
              <span className={cn("block h-full rounded-full transition-all duration-500", meter.bar)} style={{ width: `${current[meter.key]}%` }} />
            </span>
            <span className="text-right font-bold text-brand-text">{current[meter.key]}%</span>
          </li>
        ))}
      </ul>

      <div className="mt-3 grid grid-cols-3 gap-1.5">
        {[
          ["Managed updates", current.managed],
          ["Bring your own keys", current.keys],
          ["Air-gapped option", current.airgap],
        ].map(([label, on]) => (
          <div key={String(label)} className={cn("flex items-center gap-1.5 rounded-lg px-2 py-1.5 text-[10px] font-semibold ring-1", on ? "bg-emerald-50 text-emerald-800 ring-emerald-200" : "bg-brand-surface text-brand-muted ring-transparent")}>
            {on ? <Check className="size-3 shrink-0" aria-hidden /> : <Minus className="size-3 shrink-0" aria-hidden />}
            <span className="leading-tight">{label}</span>
          </div>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2 border-t border-brand-border pt-3">
        <SectionLabel>Data residency</SectionLabel>
        <Chips label="Data region" options={regions} value={region} onChange={setRegion} />
      </div>
    </PreviewFrame>
  );
}
