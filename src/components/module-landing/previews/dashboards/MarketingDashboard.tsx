"use client";

import { useState } from "react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

const channels = [
  { name: "Email", leads: 520, cpl: "₹120", conv: "6.8%", share: 40, stroke: "stroke-violet-500", dot: "bg-violet-500", insight: "Email brings 40% of your leads at the lowest cost per lead. Keep the weekly cadence." },
  { name: "Social", leads: 310, cpl: "₹210", conv: "4.1%", share: 24, stroke: "stroke-sky-500", dot: "bg-sky-500", insight: "Social leads cost 75% more than email. Test shorter posts with a clear offer." },
  { name: "Paid ads", leads: 270, cpl: "₹340", conv: "3.2%", share: 21, stroke: "stroke-amber-500", dot: "bg-amber-500", insight: "Paid ads have the highest cost per lead. Pause the two weakest ad sets." },
  { name: "Events", leads: 184, cpl: "₹520", conv: "9.4%", share: 15, stroke: "stroke-emerald-500", dot: "bg-emerald-500", insight: "Events convert at 9.4%, the best of any channel. Add another webinar next month." },
];

const days = ["M", "T", "W", "T", "F", "S", "S"];
const campaigns = [
  { name: "Festive offer", channel: 0, row: 1, start: 1, span: 3, tone: "bg-violet-500", insight: "Festive offer: 38% opened so far. Resend to non-openers on Wednesday." },
  { name: "Retargeting", channel: 2, row: 1, start: 5, span: 3, tone: "bg-amber-500", insight: "Retargeting ads cost ₹340 a lead. Narrow the audience to pricing-page visitors." },
  { name: "Case study", channel: 1, row: 2, start: 1, span: 2, tone: "bg-sky-500", insight: "The case study post got 3x the usual shares. Turn it into a LinkedIn series." },
  { name: "Partner webinar", channel: 3, row: 2, start: 3, span: 4, tone: "bg-emerald-500", insight: "286 people registered for the webinar. Send a reminder the day before." },
];

export function MarketingDashboard() {
  const [selection, setSelection] = useState<{ channel: number; campaign: number | null }>({ channel: 0, campaign: null });
  const channel = channels[selection.channel];
  const campaign = selection.campaign === null ? null : campaigns[selection.campaign];
  const total = channels.reduce((sum, item) => sum + item.leads, 0);
  const segments = channels.map((item, index) => ({
    ...item,
    offset: channels.slice(0, index).reduce((sum, previous) => sum + previous.share, 0),
  }));

  return (
    <PreviewFrame
      title="Campaign Hub"
      period="This month"
      insight={campaign ? campaign.insight : channel.insight}
      badge="Leads up 18%"
    >
      <div className="mt-4 grid grid-cols-[auto_1fr] items-center gap-4">
        <div className="relative size-28 shrink-0">
          <svg viewBox="0 0 42 42" aria-hidden className="size-full">
            <circle cx="21" cy="21" r="15.9155" fill="none" strokeWidth="5" className="stroke-brand-surface" />
            {segments.map((segment, index) => (
              <circle
                key={segment.name}
                cx="21"
                cy="21"
                r="15.9155"
                fill="none"
                strokeWidth={index === selection.channel ? 7 : 5}
                strokeDasharray={`${segment.share - 1} ${101 - segment.share}`}
                strokeDashoffset={25 - segment.offset}
                className={cn(segment.stroke, "cursor-pointer transition-all", index !== selection.channel && "opacity-60")}
                onClick={() => setSelection({ channel: index, campaign: null })}
              />
            ))}
          </svg>
          <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
            <span className="text-lg font-extrabold text-brand-text">{channel.leads}</span>
            <span className="text-[10px] font-semibold text-brand-muted">of {total.toLocaleString("en-IN")} leads</span>
          </div>
        </div>

        <div>
          <ul className="grid grid-cols-2 gap-1.5">
            {channels.map((item, index) => {
              const selected = index === selection.channel;
              return (
                <li key={item.name}>
                  <button
                    type="button"
                    aria-pressed={selected}
                    onClick={() => setSelection({ channel: index, campaign: null })}
                    className={cn(
                      "flex w-full items-center gap-1.5 rounded-lg px-2 py-1.5 text-left text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                      selected ? "bg-brand-purple-light text-brand-text ring-brand-purple/40" : "bg-brand-surface text-brand-muted ring-transparent hover:ring-brand-purple/30"
                    )}
                  >
                    <span className={cn("size-2 rounded-full", item.dot)} aria-hidden />
                    {item.name}
                    <span className="ml-auto text-brand-text">{item.share}%</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <dl className="mt-2 grid grid-cols-2 gap-1.5 text-center">
            <div className="rounded-lg bg-brand-surface px-2 py-1.5">
              <dt className="text-[10px] font-semibold text-brand-muted">Cost per lead</dt>
              <dd className="text-sm font-extrabold text-brand-text">{channel.cpl}</dd>
            </div>
            <div className="rounded-lg bg-brand-surface px-2 py-1.5">
              <dt className="text-[10px] font-semibold text-brand-muted">Conversion</dt>
              <dd className="text-sm font-extrabold text-brand-text">{channel.conv}</dd>
            </div>
          </dl>
        </div>
      </div>

      <div className="mt-4 border-t border-brand-border pt-3">
        <div className="flex items-center justify-between">
          <SectionLabel>This week&apos;s campaigns</SectionLabel>
          <span className="hidden text-[10px] text-brand-muted sm:block">Select one to see its channel</span>
        </div>
        <div className="mt-2 grid grid-cols-7 gap-x-1 text-center text-[10px] font-semibold text-brand-muted">
          {days.map((day, index) => (
            <span key={index}>{day}</span>
          ))}
        </div>
        <div className="mt-1 grid grid-cols-7 gap-1 rounded-lg bg-brand-surface p-1.5">
          {campaigns.map((item, index) => {
            const selected = selection.campaign === index;
            return (
              <button
                key={item.name}
                type="button"
                aria-pressed={selected}
                onClick={() => setSelection({ channel: item.channel, campaign: index })}
                style={{ gridColumn: `${item.start} / span ${item.span}`, gridRow: item.row }}
                className={cn(
                  "truncate rounded-md px-2 py-1.5 text-left text-[11px] font-semibold text-white outline-none transition-all focus-visible:ring-2 focus-visible:ring-brand-purple/60",
                  item.tone,
                  selected ? "scale-[1.03] shadow-lg ring-2 ring-white" : "opacity-85 hover:opacity-100"
                )}
              >
                {item.name}
              </button>
            );
          })}
        </div>
      </div>
    </PreviewFrame>
  );
}
