"use client";

import { useState } from "react";
import { BellOff, Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Team = "all" | "sales" | "support" | "finance" | "people";
const teams: { key: Team; label: string }[] = [
  { key: "all", label: "All" },
  { key: "sales", label: "Sales" },
  { key: "support", label: "Support" },
  { key: "finance", label: "Finance" },
  { key: "people", label: "People" },
];
const recs = [
  { id: 1, team: "sales", title: "Call Zenith Pharma today", why: "Visited pricing twice and opened your last email.", conf: 82, impact: "₹1.6L", value: 1.6, done: "A call task was created for Anita." },
  { id: 2, team: "support", title: "Reassign ticket #2041 to Priya", why: "42 minutes left on the SLA, and Priya has the most capacity.", conf: 90, impact: "SLA saved", value: 0, done: "Ticket #2041 now belongs to Priya." },
  { id: 3, team: "finance", title: "Remind Northwind Logistics", why: "They paid late the last three times.", conf: 77, impact: "₹2.1L", value: 2.1, done: "A reminder was drafted for your approval." },
  { id: 4, team: "sales", title: "Offer a bundle to Helix Motors", why: "Similar customers upgraded within 6 months, 4 times in 10.", conf: 71, impact: "₹2.4L", value: 2.4, done: "A bundle proposal was drafted for Rohan." },
  { id: 5, team: "people", title: "Check in with Arjun", why: "Missed check-ins and unplanned leave this month.", conf: 64, impact: "Retention", value: 0, done: "A 1:1 was suggested to his manager." },
  { id: 6, team: "finance", title: "Review a possible duplicate bill", why: "Two bills from one vendor for ₹48,000, on the same day.", conf: 88, impact: "₹48K", value: 0.48, done: "The bill was held for review." },
] as const;
type Status = "accepted" | "snoozed" | "dismissed";

export function AIRecommendationsDashboard() {
  const [team, setTeam] = useState<Team>("all");
  const [statuses, setStatuses] = useState<Record<number, Status>>({});
  const [message, setMessage] = useState<string | null>(null);

  const pending = recs.filter((rec) => !statuses[rec.id] && (team === "all" || rec.team === team));
  const shown = pending.slice(0, 2);
  const accepted = recs.filter((rec) => statuses[rec.id] === "accepted");
  const captured = Math.round(accepted.reduce((sum, rec) => sum + rec.value, 0) * 100) / 100;

  const act = (id: number, status: Status, text: string) => {
    setStatuses((current) => ({ ...current, [id]: status }));
    setMessage(text);
  };

  return (
    <PreviewFrame
      title="Next Best Actions"
      period="Today"
      insight={message ?? "Ranked by expected impact. Accept what makes sense and it learns what you value."}
      badge="74% acted on"
    >
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Impact captured", `₹${captured}L`],
          ["Accepted", String(accepted.length)],
          ["Waiting", String(recs.filter((rec) => !statuses[rec.id]).length)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-brand-surface px-3 py-2">
            <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
            <p key={value} className="demo-rise text-lg font-extrabold text-brand-text">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3">
        <Chips label="Team" options={teams} value={team} onChange={setTeam} />
      </div>

      <ul className="mt-3 flex min-h-[190px] flex-col gap-2">
        {shown.map((rec) => (
          <li key={rec.id} className="demo-rise rounded-xl bg-brand-surface p-3 ring-1 ring-transparent transition-all hover:ring-brand-purple/30">
            <div className="flex items-start gap-3">
              <div className="min-w-0 flex-1">
                <p className="flex flex-wrap items-center gap-1.5 text-[13px] font-bold text-brand-text">
                  {rec.title}
                  <span className="rounded-full bg-emerald-100 px-1.5 py-0.5 text-[10px] font-bold text-emerald-700">{rec.impact}</span>
                </p>
                <p className="mt-0.5 text-[11px] leading-snug text-brand-muted">{rec.why}</p>
              </div>
              <div className="shrink-0 text-center" title={`${rec.conf}% confidence`}>
                <div className="relative size-9 rounded-full" style={{ background: `conic-gradient(var(--color-brand-purple) 0 ${rec.conf}%, #ddd6f9 0)` }}>
                  <div className="absolute inset-1 flex items-center justify-center rounded-full bg-white text-[10px] font-extrabold text-brand-text">{rec.conf}</div>
                </div>
              </div>
            </div>
            <div className="mt-2 flex gap-1.5">
              <button
                type="button"
                onClick={() => act(rec.id, "accepted", `Accepted: “${rec.title}”. ${rec.done}`)}
                className="flex items-center gap-1 rounded-lg bg-emerald-500 px-2.5 py-1 text-[11px] font-semibold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300"
              >
                <Check className="size-3" aria-hidden /> Accept
              </button>
              <button
                type="button"
                onClick={() => act(rec.id, "snoozed", `Snoozed “${rec.title}”. It will come back tomorrow morning.`)}
                className="flex items-center gap-1 rounded-lg bg-white px-2.5 py-1 text-[11px] font-semibold text-brand-muted ring-1 ring-brand-border outline-none hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/60"
              >
                <BellOff className="size-3" aria-hidden /> Snooze
              </button>
              <button
                type="button"
                onClick={() => act(rec.id, "dismissed", `Dismissed “${rec.title}”. You'll see fewer suggestions like this.`)}
                className="ml-auto flex items-center gap-1 rounded-lg px-2 py-1 text-[11px] font-semibold text-brand-muted outline-none hover:text-red-600 focus-visible:ring-2 focus-visible:ring-red-300"
              >
                <X className="size-3" aria-hidden /> Dismiss
              </button>
            </div>
          </li>
        ))}
        {shown.length === 0 && (
          <li className={cn("demo-rise flex flex-1 flex-col items-center justify-center gap-2 rounded-xl bg-emerald-50 px-3 py-6 text-center")}>
            <span className="flex size-9 items-center justify-center rounded-full bg-emerald-500 text-white">
              <Check className="size-5" aria-hidden />
            </span>
            <p className="text-[13px] font-bold text-emerald-800">You&apos;re all caught up</p>
            <button
              type="button"
              onClick={() => {
                setStatuses({});
                setMessage(null);
              }}
              className="rounded-lg bg-white px-3 py-1 text-[11px] font-semibold text-brand-purple ring-1 ring-brand-purple/30 outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60"
            >
              Show suggestions again
            </button>
          </li>
        )}
      </ul>
    </PreviewFrame>
  );
}
