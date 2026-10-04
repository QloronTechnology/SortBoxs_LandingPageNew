"use client";

import { useEffect, useState } from "react";
import { Rocket, ShieldAlert } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";

const services = [
  { key: "gateway", name: "API gateway", x: 50, y: 10, latency: 8, instances: 4 },
  { key: "auth", name: "Identity", x: 13, y: 66, latency: 18, instances: 4 },
  { key: "crm", name: "CRM", x: 38, y: 66, latency: 42, instances: 4 },
  { key: "billing", name: "Billing", x: 63, y: 66, latency: 36, instances: 4 },
  { key: "search", name: "Search", x: 87, y: 66, latency: 54, instances: 4 },
];

export function MicroservicesDashboard() {
  const [selected, setSelected] = useState("crm");
  const [down, setDown] = useState<string[]>([]);
  const [versions, setVersions] = useState<Record<string, number>>({ gateway: 3, auth: 4, crm: 7, billing: 8, search: 2 });
  const [rolling, setRolling] = useState<{ key: string; step: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  useEffect(() => {
    if (!rolling) return;
    const timer = setTimeout(() => {
      if (rolling.step >= 4) {
        setVersions((current) => ({ ...current, [rolling.key]: current[rolling.key] + 1 }));
        setMessage(`${services.find((s) => s.key === rolling.key)!.name} is now fully on the new version. All 4 instances were swapped one at a time with zero downtime.`);
        setRolling(null);
      } else {
        setRolling({ key: rolling.key, step: rolling.step + 1 });
      }
    }, 650);
    return () => clearTimeout(timer);
  }, [rolling]);

  const service = services.find((item) => item.key === selected)!;
  const isDown = down.includes(selected);
  const isRolling = rolling?.key === selected;
  const upCount = services.length - down.length;

  const toggleDown = () => {
    const next = isDown ? down.filter((key) => key !== selected) : [...down, selected];
    setDown(next);
    setMessage(
      isDown
        ? `${service.name} recovered. The circuit breaker closed and traffic flows again.`
        : `${service.name} failed. The gateway's circuit breaker isolated it, so the other ${services.length - next.length === 0 ? 0 : services.length - next.length} services kept serving users.`
    );
  };

  return (
    <PreviewFrame
      title="Service Map"
      period="5 services"
      insight={message ?? "Click a service, then deploy a new version or fail it. Every other service keeps working."}
      badge={`${upCount} of ${services.length} services healthy`}
    >
      <div className="relative mt-4 h-[168px] rounded-xl bg-brand-surface">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {services
            .filter((item) => item.key !== "gateway")
            .map((item) => (
              <line
                key={item.key}
                x1={50}
                y1={22}
                x2={item.x}
                y2={item.y - 10}
                stroke={down.includes(item.key) ? "#ef4444" : "#a78bfa"}
                strokeWidth="1.6"
                strokeDasharray={down.includes(item.key) ? "3 3" : undefined}
                vectorEffect="non-scaling-stroke"
              />
            ))}
        </svg>
        {services.map((item) => {
          const failed = down.includes(item.key);
          const on = item.key === selected;
          return (
            <button
              key={item.key}
              type="button"
              aria-pressed={on}
              onClick={() => setSelected(item.key)}
              style={{ left: `${item.x}%`, top: `${item.y}%` }}
              className={cn(
                "absolute w-[68px] -translate-x-1/2 -translate-y-1/2 rounded-xl px-1.5 py-2 text-center text-[10px] font-bold outline-none ring-2 transition-all focus-visible:ring-brand-purple/80 sm:w-[84px]",
                failed ? "bg-red-100 text-red-700 ring-red-300" : item.key === "gateway" ? "bg-brand-purple text-white ring-brand-purple/30" : "bg-white text-brand-text ring-brand-border",
                on && "scale-110 shadow-lg ring-brand-purple"
              )}
            >
              {item.name}
              <span className={cn("mx-auto mt-1 flex w-fit items-center gap-1 text-[9px] font-semibold", failed ? "text-red-600" : item.key === "gateway" ? "text-white/80" : "text-emerald-600")}>
                <span className={cn("size-1.5 rounded-full", failed ? "bg-red-500" : item.key === "gateway" ? "bg-emerald-300" : "bg-emerald-500")} aria-hidden />
                {failed ? "down" : "up"}
              </span>
            </button>
          );
        })}
        {down.length > 0 && (
          <span className="demo-rise absolute right-2 bottom-2 flex items-center gap-1 rounded-full bg-amber-100 px-2 py-0.5 text-[10px] font-bold text-amber-800">
            <ShieldAlert className="size-3" aria-hidden /> Circuit open: {down.length}
          </span>
        )}
      </div>

      <div key={selected} className="demo-rise mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <div>
            <p className="text-[13px] font-extrabold text-brand-text">{service.name}</p>
            <p className="text-[11px] text-brand-muted">
              v2.{versions[service.key]} · {isDown ? "unavailable" : `${service.latency} ms p95`}
              {isRolling && <span className="ml-1.5 rounded-full bg-sky-100 px-1.5 py-0.5 text-[10px] font-bold text-sky-700">Rolling · zero downtime</span>}
            </p>
          </div>
          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={isDown || !!rolling}
              onClick={() => {
                setRolling({ key: selected, step: 0 });
                setMessage(null);
              }}
              className="flex items-center gap-1 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
            >
              <Rocket className="size-3" aria-hidden /> Deploy new version
            </button>
            <button
              type="button"
              disabled={!!rolling}
              onClick={toggleDown}
              className={cn(
                "rounded-lg px-3 py-1.5 text-[11px] font-semibold outline-none focus-visible:ring-2 disabled:opacity-40",
                isDown ? "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-300" : "bg-white text-red-600 ring-1 ring-red-200 hover:bg-red-50 focus-visible:ring-red-300"
              )}
            >
              {isDown ? "Restore" : "Fail it"}
            </button>
          </div>
        </div>
        <div className="mt-2 flex items-center gap-1.5" aria-label="Instances">
          {Array.from({ length: service.instances }, (_, index) => {
            const swapped = isRolling ? index < rolling!.step : false;
            return (
              <span
                key={index}
                className={cn(
                  "flex h-6 flex-1 items-center justify-center rounded-md text-[9px] font-bold text-white transition-colors duration-300",
                  isDown ? "bg-red-300" : swapped ? "bg-sky-500" : "bg-emerald-400"
                )}
              >
                {isDown ? "off" : swapped ? "new" : `v${versions[service.key]}`}
              </span>
            );
          })}
        </div>
      </div>
    </PreviewFrame>
  );
}
