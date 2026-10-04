"use client";

import { useEffect, useState } from "react";
import { Check, Sparkles, Timer } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";

const tickets = [
  {
    id: "#2041",
    subject: "Invoice not received",
    customer: "Acme Corp",
    initials: "AC",
    priority: "High",
    tone: "bg-red-100 text-red-700",
    sla: 11 * 60 + 20,
    message: "Hi, we still haven't received invoice INV-1042 for last month. Our accounts team needs it today to close the books.",
    suggestion: "Hi Acme team, sorry for the delay. I've just resent INV-1042 to accounts@acme.com and attached a PDF copy. Please let me know if it doesn't arrive in the next few minutes.",
  },
  {
    id: "#2038",
    subject: "Unable to reset password",
    customer: "Bluepeak Foods",
    initials: "BF",
    priority: "Medium",
    tone: "bg-amber-100 text-amber-700",
    sla: 2 * 3600 + 15 * 60,
    message: "The password reset link says it has expired every time I click it. Can you help me get back into my account?",
    suggestion: "Hi, sorry about that. Reset links expire after 15 minutes. I've sent you a fresh one and it will work for the next hour. Open it in the same browser you requested it from.",
  },
  {
    id: "#2035",
    subject: "Bulk export request",
    customer: "Orbit Retail",
    initials: "OR",
    priority: "Low",
    tone: "bg-emerald-100 text-emerald-700",
    sla: 5 * 3600 + 30 * 60,
    message: "We'd like to export all our orders from the last 6 months into a spreadsheet. Is that possible from the dashboard?",
    suggestion: "Yes! Go to Orders, choose your date range and click Export. You'll get a CSV by email within a couple of minutes. I can run it for you if you'd prefer.",
  },
];

const format = (seconds: number) => {
  if (seconds >= 3600) return `${Math.floor(seconds / 3600)}h ${String(Math.floor((seconds % 3600) / 60)).padStart(2, "0")}m`;
  return `${Math.floor(seconds / 60)}:${String(seconds % 60).padStart(2, "0")}`;
};

export function ServiceDashboard() {
  const [selected, setSelected] = useState(0);
  const [elapsed, setElapsed] = useState(0);
  const [drafts, setDrafts] = useState<Record<number, boolean>>({});
  const [resolved, setResolved] = useState<number[]>([]);

  useEffect(() => {
    const timer = setInterval(() => setElapsed((current) => current + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const remaining = (index: number) => Math.max(0, tickets[index].sla - elapsed);
  const ticket = tickets[selected];
  const isResolved = resolved.includes(selected);
  const urgent = !isResolved && remaining(selected) < 15 * 60;
  const open = tickets.length - resolved.length;

  const insight = isResolved
    ? `${ticket.id} resolved. A satisfaction survey has been sent to ${ticket.customer}.`
    : drafts[selected]
      ? "Reply drafted from your knowledge base and the customer's history. Send it to resolve the ticket."
      : urgent
        ? `${ticket.id} breaches its SLA in ${format(remaining(selected))}. Use the AI reply to answer in one click.`
        : `${ticket.id} is within SLA. The AI has a suggested reply ready.`;

  return (
    <PreviewFrame title="Support Inbox" period="Live" insight={insight} badge="CSAT 4.8 out of 5">
      <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-[1fr_1.35fr]">
        <ul className="flex flex-col gap-1.5" aria-label="Tickets">
          {tickets.map((item, index) => {
            const done = resolved.includes(index);
            const left = remaining(index);
            const hot = !done && left < 15 * 60;
            return (
              <li key={item.id}>
                <button
                  type="button"
                  aria-pressed={index === selected}
                  onClick={() => setSelected(index)}
                  className={cn(
                    "flex w-full items-center gap-2 rounded-xl px-2.5 py-2 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                    index === selected ? "bg-brand-purple-light ring-brand-purple/40" : "bg-brand-surface ring-transparent hover:ring-brand-purple/30"
                  )}
                >
                  <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-[10px] font-bold text-brand-purple ring-1 ring-brand-border">{item.initials}</span>
                  <span className="min-w-0 flex-1 leading-tight">
                    <span className={cn("block truncate text-[12px] font-semibold", done ? "text-brand-muted line-through" : "text-brand-text")}>{item.subject}</span>
                    <span className="block truncate text-[10px] text-brand-muted">
                      {item.id} · {item.customer}
                    </span>
                  </span>
                  {done ? (
                    <Check className="size-4 shrink-0 text-emerald-600" aria-label="Resolved" />
                  ) : (
                    <span className={cn("flex shrink-0 items-center gap-1 text-[11px] font-bold tabular-nums", hot ? "animate-pulse text-red-600" : "text-brand-text")}>
                      <Timer className="size-3" aria-hidden /> {format(left)}
                    </span>
                  )}
                </button>
              </li>
            );
          })}
          <li className="mt-0.5 flex justify-between px-1 text-[10px] font-semibold text-brand-muted">
            <span>{open} open</span>
            <span>{resolved.length} resolved today</span>
          </li>
        </ul>

        <div key={selected} className="demo-rise flex flex-col gap-2 rounded-xl bg-brand-surface p-3">
          <div className="flex items-center gap-2">
            <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", ticket.tone)}>{ticket.priority}</span>
            <span className="truncate text-[11px] font-semibold text-brand-muted">{ticket.customer}</span>
          </div>
          <p className="rounded-xl rounded-tl-sm bg-white px-3 py-2 text-[11px] leading-snug text-brand-text ring-1 ring-brand-border">{ticket.message}</p>

          <div className="rounded-xl bg-white p-2 ring-1 ring-brand-border">
            {drafts[selected] || isResolved ? (
              <p className="text-[11px] leading-snug text-brand-text">{ticket.suggestion}</p>
            ) : (
              <p className="text-[11px] text-brand-muted">Write a reply, or use the AI suggestion…</p>
            )}
          </div>

          <div className="flex gap-1.5">
            <button
              type="button"
              disabled={isResolved || drafts[selected]}
              onClick={() => setDrafts((current) => ({ ...current, [selected]: true }))}
              className="flex items-center gap-1 rounded-lg bg-brand-purple-light px-2.5 py-1 text-[11px] font-semibold text-brand-purple outline-none hover:bg-brand-purple/15 focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
            >
              <Sparkles className="size-3" aria-hidden /> AI reply
            </button>
            <button
              type="button"
              disabled={!drafts[selected] || isResolved}
              onClick={() => setResolved((current) => [...current, selected])}
              className="ml-auto rounded-lg bg-brand-purple px-3 py-1 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
            >
              {isResolved ? "Resolved" : "Send & resolve"}
            </button>
          </div>
        </div>
      </div>
    </PreviewFrame>
  );
}
