"use client";

import { useState } from "react";
import { Scale } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const zones = ["Zone A", "Zone B", "Zone C"];
const NODES_PER_ZONE = 2;
const history = Array.from({ length: 60 }, (_, index) => (index === 17 ? "amber" : index === 41 ? "amber" : "green"));

export function HighAvailabilityDashboard() {
  const [failed, setFailed] = useState<boolean[]>(Array(zones.length * NODES_PER_ZONE).fill(false));
  const [message, setMessage] = useState<string | null>(null);

  const healthy = failed.filter((value) => !value).length;
  const total = failed.length;
  const operational = healthy > 0;
  const degraded = operational && healthy < total;
  const traffic = failed.map((value) => (value || healthy === 0 ? 0 : Math.round(100 / healthy)));

  const toggle = (index: number) => {
    const next = failed.map((value, i) => (i === index ? !value : value));
    setFailed(next);
    const nowHealthy = next.filter((value) => !value).length;
    const zone = zones[Math.floor(index / NODES_PER_ZONE)];
    setMessage(
      next[index]
        ? nowHealthy > 0
          ? `${zone} node failed. It was removed from rotation in 3 seconds, and traffic moved to the other ${nowHealthy} nodes. Nobody lost a request.`
          : "All nodes are down. This is the case redundancy exists to prevent, and it takes failures in every zone."
        : `${zone} node recovered and rejoined the pool after passing its health checks.`
    );
  };

  const failZone = (zone: number) => {
    const indexes = Array.from({ length: NODES_PER_ZONE }, (_, i) => zone * NODES_PER_ZONE + i);
    const allFailed = indexes.every((i) => failed[i]);
    const next = failed.map((value, i) => (indexes.includes(i) ? !allFailed : value));
    setFailed(next);
    const nowHealthy = next.filter((value) => !value).length;
    setMessage(
      allFailed
        ? `${zones[zone]} is back online and taking traffic again.`
        : nowHealthy > 0
          ? `${zones[zone]} went offline. Failover finished in under 30 seconds, and the service stayed up on the remaining ${nowHealthy} nodes.`
          : "Every zone is offline. A full outage would need all three zones to fail at once."
    );
  };

  return (
    <PreviewFrame
      title="Availability Console"
      period="99.9% SLA"
      insight={message ?? "Click a node to fail it, or fail a whole zone. Watch traffic move and the service stay up."}
      badge={operational ? "Service operational" : "Service down"}
    >
      <div className="mt-4 grid grid-cols-[1fr_auto] items-center gap-3">
        <div className={cn("flex items-center gap-2 rounded-xl px-3 py-2 ring-1 transition-colors", !operational ? "bg-red-50 ring-red-200" : degraded ? "bg-amber-50 ring-amber-200" : "bg-emerald-50 ring-emerald-200")}>
          <span className={cn("size-2.5 rounded-full", !operational ? "bg-red-500" : degraded ? "bg-amber-500" : "bg-emerald-500")} aria-hidden />
          <span className="text-[12px] font-bold text-brand-text">{!operational ? "Outage" : degraded ? "Operational, reduced redundancy" : "All systems operational"}</span>
        </div>
        <div className="text-right">
          <p className="text-[10px] font-semibold text-brand-muted">Last 90 days</p>
          <p className="text-lg font-extrabold text-brand-text">99.98%</p>
        </div>
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="mx-auto flex w-fit items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1 text-[11px] font-bold text-white shadow-lg shadow-brand-purple/25">
          <Scale className="size-3.5" aria-hidden /> Load balancer
        </div>
        <div className="mt-3 grid grid-cols-3 gap-2">
          {zones.map((zone, zoneIndex) => {
            const indexes = Array.from({ length: NODES_PER_ZONE }, (_, i) => zoneIndex * NODES_PER_ZONE + i);
            const zoneDown = indexes.every((i) => failed[i]);
            return (
              <div key={zone} className={cn("rounded-xl p-2 ring-1 transition-colors", zoneDown ? "bg-red-50 ring-red-200" : "bg-white ring-brand-border")}>
                <button
                  type="button"
                  onClick={() => failZone(zoneIndex)}
                  className="flex w-full items-center justify-between rounded-md px-1 pb-1.5 text-[11px] font-bold text-brand-text outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
                  aria-label={`${zoneDown ? "Restore" : "Fail"} ${zone}`}
                >
                  {zone}
                  <span className={cn("text-[9px] font-semibold", zoneDown ? "text-red-600" : "text-brand-muted")}>{zoneDown ? "Restore" : "Fail zone"}</span>
                </button>
                <div className="flex flex-col gap-1.5">
                  {indexes.map((index) => (
                    <button
                      key={index}
                      type="button"
                      aria-pressed={failed[index]}
                      aria-label={`Node ${index + 1}, ${failed[index] ? "failed" : "healthy"}`}
                      onClick={() => toggle(index)}
                      className={cn(
                        "flex items-center justify-between rounded-lg px-2 py-1.5 text-[10px] font-semibold outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                        failed[index] ? "bg-red-100 text-red-700 ring-red-300" : "bg-emerald-50 text-emerald-800 ring-emerald-200 hover:ring-emerald-400"
                      )}
                    >
                      <span>App {index + 1}</span>
                      <span key={traffic[index]} className="demo-rise font-bold tabular-nums">{failed[index] ? "off" : `${traffic[index]}%`}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
        <p className="mt-2 text-center text-[10px] font-semibold text-brand-muted">
          {healthy} of {total} nodes healthy · traffic shared across the healthy ones
        </p>
      </div>

      <div className="mt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>Uptime, last 60 days</SectionLabel>
          <button
            type="button"
            onClick={() => {
              setFailed(Array(total).fill(false));
              setMessage("All nodes restored.");
            }}
            className="text-[11px] font-semibold text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            Restore all
          </button>
        </div>
        <div className="mt-1.5 flex gap-[2px]" aria-label="Daily availability, mostly fully available">
          {history.map((state, index) => (
            <span key={index} className={cn("h-4 flex-1 rounded-[2px]", state === "green" ? "bg-emerald-400" : "bg-amber-400")} title={state === "green" ? "Fully available" : "Brief degradation"} />
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
