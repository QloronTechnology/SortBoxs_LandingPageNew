"use client";

import { useState } from "react";
import { Check, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const pseudo = (n: number) => ((n * 9301 + 49297) % 233280) / 233280;
const weeks = Array.from({ length: 5 }, (_, week) =>
  Array.from({ length: 7 }, (_, day) => {
    const weekend = day >= 5;
    const presence = weekend ? 0 : Math.round(80 + pseudo(week * 7 + day + 5) * 19);
    return { date: week * 7 + day + 1, presence, weekend, away: weekend ? 0 : Math.round(((100 - presence) / 100) * 248) };
  })
);
const level = (presence: number, weekend: boolean) =>
  weekend ? "bg-brand-border/60" : presence >= 95 ? "bg-emerald-500" : presence >= 90 ? "bg-emerald-300" : presence >= 85 ? "bg-amber-300" : "bg-rose-300";

const initialRequests = [
  { name: "Priya Sharma", type: "Casual leave", dates: "Mon to Wed · 3 days", tone: "bg-sky-100 text-sky-700", status: "pending" as const, approved: "Priya's leave is approved. Her tasks were reassigned to Karan for the week." },
  { name: "Arjun Patel", type: "Sick leave", dates: "Friday · 1 day", tone: "bg-rose-100 text-rose-700", status: "pending" as const, approved: "Arjun's sick leave is approved. Friday's roster has been updated." },
  { name: "Neha Kapoor", type: "Earned leave", dates: "Next week · 5 days", tone: "bg-violet-100 text-violet-700", status: "pending" as const, approved: "Neha's leave is approved. Her balance is now 7 days." },
];
type Status = "pending" | "approved" | "declined";

export function HrmsDashboard() {
  const [requests, setRequests] = useState<{ status: Status }[]>(initialRequests.map(() => ({ status: "pending" })));
  const [hover, setHover] = useState<{ week: number; day: number } | null>(null);
  const [message, setMessage] = useState<string | null>(null);

  const pending = requests.filter((request) => request.status === "pending").length;
  const approved = requests.filter((request) => request.status === "approved").length;
  const cell = hover ? weeks[hover.week][hover.day] : null;

  const decide = (index: number, status: Exclude<Status, "pending">) => {
    setRequests((current) => current.map((request, i) => (i === index ? { status } : request)));
    setMessage(status === "approved" ? initialRequests[index].approved : `${initialRequests[index].name}'s request was declined. They've been notified with your note.`);
  };

  return (
    <PreviewFrame
      title="People Pulse"
      period="This month"
      insight={message ?? "3 probation reviews are due this week. Reminders have gone to their managers."}
      badge="Payroll on track"
    >
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Present today", "92%"],
          ["Pending leave", String(pending)],
          ["Approved", String(approved)],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-brand-surface px-3 py-2">
            <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
            <p key={value} className="demo-rise text-lg font-extrabold text-brand-text">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <div className="flex items-center justify-between gap-2">
          <SectionLabel>Attendance</SectionLabel>
          <p aria-live="polite" className="truncate text-[11px] font-semibold text-brand-text">
            {cell ? (cell.weekend ? `${dayNames[hover!.day]} ${cell.date} · weekend` : `${dayNames[hover!.day]} ${cell.date} · ${cell.presence}% present · ${cell.away} away`) : "Hover a day"}
          </p>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-1 text-center text-[9px] font-semibold text-brand-muted">
          {dayNames.map((day) => (
            <span key={day}>{day}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1" onMouseLeave={() => setHover(null)}>
          {weeks.flatMap((week, weekIndex) =>
            week.map((day, dayIndex) => (
              <span
                key={day.date}
                tabIndex={0}
                aria-label={day.weekend ? `Day ${day.date}, weekend` : `Day ${day.date}, ${day.presence}% present`}
                onMouseEnter={() => setHover({ week: weekIndex, day: dayIndex })}
                onFocus={() => setHover({ week: weekIndex, day: dayIndex })}
                className={cn(
                  "h-5 rounded-[5px] outline-none transition-transform focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  level(day.presence, day.weekend),
                  hover?.week === weekIndex && hover?.day === dayIndex && "scale-125 ring-2 ring-brand-navy/60"
                )}
              />
            ))
          )}
        </div>
        <div className="mt-2 flex items-center gap-1.5 text-[10px] text-brand-muted">
          Low
          {["bg-rose-300", "bg-amber-300", "bg-emerald-300", "bg-emerald-500"].map((tone) => (
            <span key={tone} className={cn("size-2.5 rounded-sm", tone)} aria-hidden />
          ))}
          High
        </div>
      </div>

      <ul className="mt-3 flex flex-col gap-1.5">
        {initialRequests.map((request, index) => {
          const status = requests[index].status;
          return (
            <li key={request.name} className="flex items-center gap-3 rounded-xl bg-brand-surface px-3 py-2">
              <span className="flex size-7 shrink-0 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{request.name[0]}</span>
              <span className="min-w-0 flex-1 leading-tight">
                <span className="block truncate text-[13px] font-semibold text-brand-text">{request.name}</span>
                <span className="block truncate text-[11px] text-brand-muted">
                  {request.type} · {request.dates}
                </span>
              </span>
              {status === "pending" ? (
                <span className="flex gap-1">
                  <button
                    type="button"
                    aria-label={`Approve ${request.name}'s leave`}
                    onClick={() => decide(index, "approved")}
                    className="flex size-7 items-center justify-center rounded-lg bg-emerald-500 text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300"
                  >
                    <Check className="size-3.5" aria-hidden />
                  </button>
                  <button
                    type="button"
                    aria-label={`Decline ${request.name}'s leave`}
                    onClick={() => decide(index, "declined")}
                    className="flex size-7 items-center justify-center rounded-lg bg-white text-red-600 ring-1 ring-red-200 outline-none hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300"
                  >
                    <X className="size-3.5" aria-hidden />
                  </button>
                </span>
              ) : (
                <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-semibold", status === "approved" ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700")}>
                  {status === "approved" ? "Approved" : "Declined"}
                </span>
              )}
            </li>
          );
        })}
      </ul>
    </PreviewFrame>
  );
}
