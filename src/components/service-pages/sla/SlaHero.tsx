"use client";

import { Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";
import { priorityTone, ServiceCrumbs, type Priority } from "../shared";

const rows: { id: string; subject: string; priority: Priority; start: number; rate: number }[] = [
  { id: "T-2040", subject: "Login keeps asking for a code", priority: "Urgent", start: 45, rate: 8 },
  { id: "T-2041", subject: "Cannot download my invoice", priority: "High", start: 20, rate: 6 },
  { id: "T-2036", subject: "Report shows wrong totals", priority: "Normal", start: 10, rate: 4 },
  { id: "T-2038", subject: "How do I add a new user?", priority: "Low", start: 5, rate: 2 },
];

const state = (pct: number) => (pct >= 100 ? { label: "Breached", bar: "bg-rose-500", chip: "bg-rose-100 text-rose-700" } : pct >= 70 ? { label: "At risk", bar: "bg-amber-500", chip: "bg-amber-100 text-amber-700" } : { label: "On track", bar: "bg-emerald-500", chip: "bg-emerald-100 text-emerald-700" });

/** Time elapsed against each ticket's resolution target: the bars fill, then change colour as the deadline nears. */
function Tracker() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(14, 700, reduced, 4);
  const t = reduced ? 8 : tick;

  return (
    <MockWindow title="SLA tracker">
      <ul className="divide-y divide-brand-border">
        {rows.map((row) => {
          const pct = Math.min(120, row.start + row.rate * t);
          const s = state(pct);
          return (
            <li key={row.id} className="px-4 py-3.5 sm:px-5">
              <div className="flex items-center justify-between gap-2">
                <span className="min-w-0">
                  <span className="block truncate text-[13px] font-bold text-brand-text">{row.subject}</span>
                  <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-brand-muted">
                    <span className={cn("rounded-full px-1.5 py-0.5 font-bold", priorityTone[row.priority])}>{row.priority}</span> {row.id}
                  </span>
                </span>
                <span className={cn("shrink-0 rounded-full px-2.5 py-1 text-[10px] font-bold transition-colors duration-500", s.chip)}>{s.label}</span>
              </div>
              <span className="mt-2.5 block h-2 rounded-full bg-brand-surface">
                <span className={cn("block h-full rounded-full transition-all duration-700", s.bar)} style={{ width: `${Math.min(100, pct)}%` }} />
              </span>
            </li>
          );
        })}
      </ul>
      <p className="border-t border-brand-border bg-brand-surface px-5 py-2.5 text-[11px] text-brand-muted">Time elapsed against the resolution target</p>
    </MockWindow>
  );
}

export function SlaHero() {
  return (
    <HeroShell
      current="SLA Management"
      crumbs={<ServiceCrumbs current="SLA Management" />}
      icon={Timer}
      iconTone="bg-amber-100 text-amber-700"
      title="Promises You Can See,"
      highlight="Track and Keep."
      description="Set response and resolution targets for every priority, watch the clock on each ticket, and step in before a deadline is missed."
      visual={<Tracker />}
    />
  );
}
