"use client";

import { useState, type CSSProperties } from "react";
import { ArrowDown, ArrowUp, Frown, Meh, Minus, Smile, Star } from "lucide-react";
import { cn } from "@/lib/utils";
import { InView } from "@/components/ui/InView";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";

/* ---------------------------------------------------------------- Metric explorer */

type MetricKey = "volume" | "speed" | "csat";
const metrics: Record<MetricKey, { label: string; question: string; unit: string; series: number[]; good: "down" | "up"; note: string }> = {
  volume: { label: "Ticket volume", question: "How many requests are we getting?", unit: "tickets", series: [310, 340, 360, 352, 340, 322], good: "down", note: "Volume has eased for three weeks in a row, which suggests fewer repeat questions." },
  speed: { label: "First reply time", question: "How quickly do we respond?", unit: "min", series: [52, 49, 47, 44, 41, 38], good: "down", note: "Replies are getting faster every week. Keep an eye on the busiest days." },
  csat: { label: "Satisfaction", question: "How happy are customers?", unit: "/ 5", series: [4.1, 4.2, 4.3, 4.3, 4.4, 4.5], good: "up", note: "Ratings rise as replies get faster, so speed is paying off." },
};
const weeks = ["W1", "W2", "W3", "W4", "W5", "W6"];

export function MetricExplorer() {
  const [key, setKey] = useState<MetricKey>("speed");
  const m = metrics[key];
  const min = Math.min(...m.series) * 0.9;
  const max = Math.max(...m.series) * 1.05;
  const pts = m.series.map((value, index) => `${index === 0 ? "M" : "L"}${(index / (m.series.length - 1)) * 100},${100 - ((value - min) / (max - min)) * 100}`).join(" ");
  const last = m.series[m.series.length - 1];
  const first = m.series[0];

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Explore the numbers" title="Ask a question, see the trend" intro="Pick a question a support lead asks every week and see how it has moved." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <div role="tablist" aria-label="Metric" className="grid gap-2.5">
            {(Object.keys(metrics) as MetricKey[]).map((item) => (
              <button key={item} type="button" role="tab" aria-selected={item === key} onClick={() => setKey(item)} className={cn("rounded-2xl p-4 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", item === key ? "bg-white shadow-md ring-2 ring-brand-purple" : "bg-white/70 ring-brand-border hover:bg-white")}>
                <span className="text-[11px] font-bold tracking-wide text-brand-purple uppercase">{metrics[item].label}</span>
                <span className="block text-sm font-bold text-brand-text">{metrics[item].question}</span>
              </button>
            ))}
          </div>
          <div key={key} className="demo-rise rounded-3xl bg-white p-5 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-7">
            <div className="flex items-start justify-between gap-3">
              <div>
                <p className="text-xs font-semibold text-brand-muted">{m.label}, last 6 weeks</p>
                <p className="mt-1 text-4xl font-extrabold text-brand-text tabular-nums">{last}<span className="text-base font-semibold text-brand-muted"> {m.unit}</span></p>
                <p className="mt-1 flex items-center gap-1 text-xs font-bold text-emerald-600">
                  {last < first ? <ArrowDown className="size-3.5" aria-hidden /> : <ArrowUp className="size-3.5" aria-hidden />} from {first} six weeks ago
                </p>
              </div>
              <SampleTag />
            </div>
            <div className="relative mt-5 h-40">
              <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="reveal-x absolute inset-0 size-full overflow-visible" aria-hidden>
                <defs>
                  <linearGradient id="insight-fill" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#6c35f5" stopOpacity="0.25" />
                    <stop offset="100%" stopColor="#6c35f5" stopOpacity="0" />
                  </linearGradient>
                </defs>
                {[25, 50, 75].map((y) => (
                  <line key={y} x1="0" x2="100" y1={y} y2={y} stroke="#eeeaff" strokeWidth="1" vectorEffect="non-scaling-stroke" />
                ))}
                <path d={`${pts} L100,100 L0,100 Z`} fill="url(#insight-fill)" />
                <path d={pts} fill="none" stroke="#6c35f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" vectorEffect="non-scaling-stroke" />
              </svg>
            </div>
            <div className="mt-2 flex justify-between text-[11px] text-brand-muted">
              {weeks.map((week) => (
                <span key={week}>{week}</span>
              ))}
            </div>
            <p className="mt-5 rounded-xl bg-brand-surface p-3.5 text-sm leading-relaxed text-brand-text">{m.note}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Topics */

const topicRows: { name: string; share: number; trend: "up" | "down" | "flat"; hint: string }[] = [
  { name: "Billing and invoices", share: 32, trend: "up", hint: "Rising. A clearer invoice help article could answer most of these." },
  { name: "Sign-in and access", share: 24, trend: "down", hint: "Falling since the new password-reset guide went up." },
  { name: "Reports and exports", share: 18, trend: "flat", hint: "Steady. Worth a short how-to video." },
  { name: "How-to questions", share: 16, trend: "down", hint: "Falling as the help centre grows." },
  { name: "Other", share: 10, trend: "flat", hint: "A mix of one-off requests." },
];

export function TopicTrends() {
  const [open, setOpen] = useState(0);
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div>
          <SectionHead eyebrow="Topics" title="See what customers keep asking about" intro="Tickets are grouped by topic, so you can see which problems are growing and which are fading, and fix the cause instead of answering the same question again." />
          <p className="mt-6 rounded-2xl bg-brand-purple-light p-4 text-sm leading-relaxed text-brand-text" aria-live="polite"><b>{topicRows[open].name}:</b> {topicRows[open].hint}</p>
        </div>
        <InView className="rounded-3xl bg-brand-surface p-5 ring-1 ring-brand-border sm:p-7">
          <div className="mb-4 flex items-center justify-between">
            <p className="text-sm font-bold text-brand-text">Share of tickets by topic</p>
            <SampleTag />
          </div>
          <ul className="space-y-2.5">
            {topicRows.map((row, index) => (
              <li key={row.name}>
                <button type="button" aria-pressed={open === index} onClick={() => setOpen(index)} className={cn("w-full rounded-xl bg-white p-3 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", open === index ? "ring-2 ring-brand-purple" : "ring-brand-border hover:bg-white/80")}>
                  <span className="flex items-center justify-between text-xs">
                    <span className="font-bold text-brand-text">{row.name}</span>
                    <span className="flex items-center gap-2">
                      <span className={cn("flex items-center gap-0.5 font-bold", row.trend === "up" ? "text-rose-600" : row.trend === "down" ? "text-emerald-600" : "text-brand-muted")}>
                        {row.trend === "up" ? <ArrowUp className="size-3" aria-hidden /> : row.trend === "down" ? <ArrowDown className="size-3" aria-hidden /> : <Minus className="size-3" aria-hidden />}
                        {row.trend === "up" ? "Rising" : row.trend === "down" ? "Falling" : "Steady"}
                      </span>
                      <b className="tabular-nums text-brand-text">{row.share}%</b>
                    </span>
                  </span>
                  <span className="mt-2 block h-2 rounded-full bg-brand-surface">
                    <span className="view-grow block h-full rounded-full bg-gradient-to-r from-violet-400 to-brand-purple" style={{ width: `${row.share * 3}%`, "--d": `${index * 80}ms` } as CSSProperties} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </InView>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Customer health + feedback */

const accounts = [
  { name: "Zenith Pharma", score: 86, reason: "Fast replies and a recent 5-star rating.", action: "Keep as is. A good moment to ask for a review.", tone: "emerald" },
  { name: "Skyline Infra", score: 54, reason: "Three tickets this month, one rated 2 stars.", action: "Have the account owner call to understand what is going wrong.", tone: "amber" },
  { name: "Greenfield Realty", score: 71, reason: "Mostly how-to questions, all resolved quickly.", action: "Share training material to help them get more from the product.", tone: "emerald" },
  { name: "Meridian Steel", score: 38, reason: "A breached deadline and two reopened tickets.", action: "Escalate to the support lead and follow up personally this week.", tone: "rose" },
] as const;

const feedback = [
  { name: "Priya Nair", stars: 5, text: "Sana fixed it in one reply. Brilliant." },
  { name: "Rahul Verma", stars: 2, text: "Took too long to get a first response." },
  { name: "Ananya Bose", stars: 4, text: "Clear instructions, thank you." },
];

export function CustomerHealth() {
  const [active, setActive] = useState(1);
  const account = accounts[active];
  const toneBar = { emerald: "bg-emerald-500", amber: "bg-amber-500", rose: "bg-rose-500" }[account.tone];
  const Icon = account.score >= 70 ? Smile : account.score >= 50 ? Meh : Frown;
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Customer health" title="Spot unhappy customers before they leave" intro="Each account gets a health score from its tickets and ratings. Select one to see why, and what to do next." />
        <div className="mx-auto mt-12 grid max-w-5xl gap-5 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)]">
          <ul className="space-y-2.5">
            {accounts.map((item, index) => (
              <li key={item.name}>
                <button type="button" aria-pressed={index === active} onClick={() => setActive(index)} className={cn("flex w-full items-center gap-4 rounded-2xl bg-white p-4 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", index === active ? "ring-2 ring-brand-purple" : "ring-brand-border hover:bg-white/80")}>
                  <Avatar name={item.name} tone={avatarTones[index % avatarTones.length]} className="size-10 text-xs" />
                  <span className="min-w-0 flex-1">
                    <span className="block text-sm font-bold text-brand-text">{item.name}</span>
                    <span className="mt-1.5 block h-2 rounded-full bg-brand-surface">
                      <span className={cn("block h-full rounded-full transition-all duration-500", { emerald: "bg-emerald-500", amber: "bg-amber-500", rose: "bg-rose-500" }[item.tone])} style={{ width: `${item.score}%` }} />
                    </span>
                  </span>
                  <b className="text-lg text-brand-text tabular-nums">{item.score}</b>
                </button>
              </li>
            ))}
          </ul>
          <div key={account.name} className="demo-rise rounded-3xl bg-white p-6 shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border sm:p-8">
            <div className="flex items-center justify-between">
              <p className="text-xs font-semibold text-brand-muted">Health score</p>
              <SampleTag />
            </div>
            <div className="mt-1 flex items-center gap-3">
              <span className={cn("flex size-12 items-center justify-center rounded-2xl text-white", toneBar)}>
                <Icon className="size-6" aria-hidden />
              </span>
              <div>
                <p className="text-xl font-extrabold text-brand-text">{account.name}</p>
                <p className="text-sm font-bold tabular-nums text-brand-purple">{account.score} out of 100</p>
              </div>
            </div>
            <dl className="mt-5 space-y-4 text-sm">
              <div><dt className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">Why</dt><dd className="mt-1 text-brand-text">{account.reason}</dd></div>
              <div><dt className="text-[11px] font-bold tracking-wide text-brand-muted uppercase">Suggested next step</dt><dd className="mt-1 rounded-xl bg-brand-purple-light p-3 text-brand-text">{account.action}</dd></div>
            </dl>
            <ul className="mt-6 space-y-2 border-t border-brand-border pt-4" aria-label="Recent feedback">
              {feedback.map((item) => (
                <li key={item.name} className="flex items-start gap-3 text-xs">
                  <span className="flex shrink-0 gap-0.5 pt-0.5" aria-label={`${item.stars} stars`}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Star key={star} className={cn("size-3", star <= item.stars ? "fill-amber-400 text-amber-400" : "text-brand-border")} aria-hidden />
                    ))}
                  </span>
                  <span className="text-brand-muted"><b className="text-brand-text">{item.name}:</b> {item.text}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
