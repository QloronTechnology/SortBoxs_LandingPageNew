"use client";

import { useState } from "react";
import { Zap } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const steps = [
  { users: 10, label: "10" },
  { users: 100, label: "100" },
  { users: 500, label: "500" },
  { users: 2000, label: "2K" },
  { users: 5000, label: "5K" },
  { users: 10000, label: "10K" },
];
const CAP = 200;
const MAX_CELLS = 40;

export function ScalableDashboard() {
  const [step, setStep] = useState(2);
  const [spike, setSpike] = useState(false);
  const users = steps[step].users;
  const rps = Math.round(users * 0.2 * (spike ? 5 : 1));
  const instances = Math.max(2, Math.ceil(rps / (CAP * 0.6)));
  const cpu = Math.min(95, Math.round((rps / (instances * CAP)) * 100));
  const latency = Math.round(150 + cpu * 1.4);
  const cost = Math.round(instances * 3.2);
  const shown = Math.min(instances, MAX_CELLS);

  const insight = spike
    ? `A 5× traffic spike hit ${users.toLocaleString("en-IN")} users. Capacity grew to ${instances} instances in seconds and the response time barely moved.`
    : `${users.toLocaleString("en-IN")} users generate about ${rps.toLocaleString("en-IN")} requests a second. ${instances} instances keep CPU near ${cpu}%.`;

  return (
    <PreviewFrame title="Auto-Scaling Monitor" period="Live capacity" insight={insight} badge="Scales with demand">
      <div className="mt-4 grid grid-cols-4 gap-2">
        {[
          ["Requests/s", rps.toLocaleString("en-IN")],
          ["Instances", String(instances)],
          ["CPU", `${cpu}%`],
          ["p95 latency", `${latency} ms`],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-brand-surface px-2.5 py-2">
            <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
            <p key={value} className="demo-rise text-base font-extrabold text-brand-text tabular-nums sm:text-lg">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-brand-purple-light p-3">
        <label htmlFor="users" className="flex items-center justify-between text-[11px] font-bold text-brand-text">
          Concurrent users
          <span className="rounded-full bg-white px-2 py-0.5 text-brand-purple">{users.toLocaleString("en-IN")}</span>
        </label>
        <input
          id="users"
          type="range"
          min={0}
          max={steps.length - 1}
          step={1}
          value={step}
          onChange={(event) => setStep(Number(event.target.value))}
          className="mt-2 w-full accent-[#6c35f5]"
        />
        <div className="flex justify-between text-[10px] text-brand-muted">
          {steps.map((item) => (
            <span key={item.users}>{item.label}</span>
          ))}
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Running instances</SectionLabel>
          <button
            type="button"
            aria-pressed={spike}
            onClick={() => setSpike((current) => !current)}
            className={cn(
              "flex items-center gap-1 rounded-lg px-2.5 py-1 text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
              spike ? "bg-amber-500 text-white ring-amber-500" : "bg-white text-amber-700 ring-amber-300 hover:bg-amber-50"
            )}
          >
            <Zap className="size-3" aria-hidden /> {spike ? "Spike on (5×)" : "Traffic spike"}
          </button>
        </div>
        <div className="mt-2 grid grid-cols-[repeat(20,minmax(0,1fr))] gap-1" aria-label={`${instances} instances running`}>
          {Array.from({ length: shown }, (_, index) => (
            <span
              key={`${instances}-${index}`}
              className={cn("demo-rise aspect-square rounded-[4px]", index >= Math.max(2, Math.ceil(((users * 0.2) / (CAP * 0.6)))) ? "bg-amber-400" : "bg-emerald-400")}
              style={{ "--d": `${Math.min(index, 20) * 25}ms` } as React.CSSProperties}
            />
          ))}
        </div>
        <p className="mt-2 flex justify-between text-[10px] font-semibold text-brand-muted">
          <span>{instances > MAX_CELLS ? `Showing ${MAX_CELLS} of ${instances}` : `${instances} instances`}</span>
          <span>≈ ₹{cost}/hour</span>
        </p>
      </div>
    </PreviewFrame>
  );
}
