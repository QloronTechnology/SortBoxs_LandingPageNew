"use client";

import { Fragment, useState } from "react";
import { Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Source = "all" | "CRM" | "Docs" | "Email" | "Tickets" | "People";
const sources: { key: Source; label: string }[] = [
  { key: "all", label: "All" },
  { key: "CRM", label: "CRM" },
  { key: "Docs", label: "Docs" },
  { key: "Email", label: "Email" },
  { key: "Tickets", label: "Tickets" },
  { key: "People", label: "People" },
];
const tones: Record<string, string> = {
  CRM: "bg-violet-100 text-violet-700",
  Docs: "bg-sky-100 text-sky-700",
  Email: "bg-amber-100 text-amber-700",
  Tickets: "bg-rose-100 text-rose-700",
  People: "bg-emerald-100 text-emerald-700",
};
const records = [
  { source: "CRM", title: "Acme Corp", snippet: "Account with 3 deals worth ₹9.8L. Renewal due on 1 September.", meta: "Owner: Anita Rao" },
  { source: "Docs", title: "Master services agreement", snippet: "Acme contract renews on 1 September. Notice period is 60 days, see page 4.", meta: "Contract · 14 pages" },
  { source: "Email", title: "Re: Acme renewal pricing", snippet: "Could you send the renewal pricing for the next two years before Friday?", meta: "From Priya, 2 days ago" },
  { source: "Docs", title: "Pricing proposal v3", snippet: "Retail suite at ₹3.4L for year one, with a 10% discount on a two-year plan.", meta: "Proposal · Sales" },
  { source: "Tickets", title: "Invoice not received (#2041)", snippet: "Acme Corp asked for invoice INV-1042 to be resent. Resolved in 2 hours.", meta: "Resolved · Priya S." },
  { source: "CRM", title: "Zenith Pharma", snippet: "Hot lead who visited the pricing page twice this week.", meta: "Owner: Rohan Mehta" },
  { source: "Docs", title: "Leave policy 2026", snippet: "Employees get 12 casual leaves a year. Sick leave needs a note after 2 days.", meta: "Policy · HR" },
  { source: "People", title: "Anita Rao", snippet: "Sales Manager, West region. Leads a team of 6. Based in Mumbai.", meta: "Reports to VP Sales" },
  { source: "Tickets", title: "Unable to reset password (#2038)", snippet: "Bluepeak Foods could not use the reset link because it had expired.", meta: "Open · Rohit K." },
  { source: "Email", title: "Pricing discussion follow-up", snippet: "Thanks for the call. Please share the pricing for 40 users and the onboarding plan.", meta: "From Orbit Retail, today" },
] as const;
const suggestions = ["Acme renewal", "pricing", "leave policy", "invoice"];

const escape = (value: string) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
function Highlight({ text, words }: { text: string; words: string[] }) {
  if (!words.length) return <>{text}</>;
  const parts = text.split(new RegExp(`(${words.map(escape).join("|")})`, "gi"));
  return (
    <>
      {parts.map((part, index) =>
        words.some((word) => word.toLowerCase() === part.toLowerCase()) ? (
          <mark key={index} className="rounded bg-yellow-200 px-0.5 text-brand-text">
            {part}
          </mark>
        ) : (
          <Fragment key={index}>{part}</Fragment>
        )
      )}
    </>
  );
}

export function AISearchDashboard() {
  const [query, setQuery] = useState("acme renewal");
  const [source, setSource] = useState<Source>("all");
  const words = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  const matches = records.filter(
    (record) => (source === "all" || record.source === source) && words.every((word) => `${record.title} ${record.snippet}`.toLowerCase().includes(word))
  );
  const shown = matches.slice(0, 3);
  const best = matches[0];
  const answerSources = new Set(matches.map((record) => record.source)).size;

  const insight = !words.length
    ? "Start typing, or pick a suggestion. Search looks across customers, documents, emails, tickets and people."
    : matches.length
      ? `${matches.length} result${matches.length > 1 ? "s" : ""} for “${query.trim()}” across ${answerSources} source${answerSources > 1 ? "s" : ""}. Only records you're allowed to see are shown.`
      : `Nothing matches “${query.trim()}”. Try fewer words, or search a different source.`;

  return (
    <PreviewFrame title="Search Everything" period="All modules" insight={insight} badge="9 sources indexed">
      <label className="mt-4 flex items-center gap-2 rounded-xl bg-white px-3 py-2.5 ring-1 ring-brand-border focus-within:ring-2 focus-within:ring-brand-purple/60">
        <Search className="size-4 shrink-0 text-brand-purple" aria-hidden />
        <input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search customers, files, emails…"
          aria-label="Search"
          className="min-w-0 flex-1 bg-transparent text-[13px] font-medium text-brand-text outline-none placeholder:text-brand-muted"
        />
      </label>

      <div className="mt-2 flex flex-wrap gap-1.5">
        {suggestions.map((item) => (
          <button
            key={item}
            type="button"
            onClick={() => setQuery(item)}
            className="rounded-full bg-brand-surface px-2.5 py-1 text-[11px] font-semibold text-brand-muted outline-none hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="mt-3">
        <Chips label="Source" options={sources} value={source} onChange={setSource} />
      </div>

      {best && words.length > 0 && (
        <div key={`${query}-${source}`} className="demo-rise mt-3 rounded-xl bg-gradient-to-br from-brand-purple to-[#4c1fc7] p-3 text-white shadow-lg shadow-brand-purple/25">
          <p className="text-[10px] font-bold tracking-wide text-white/70 uppercase">AI answer</p>
          <p className="mt-0.5 text-[12px] leading-snug font-semibold">{best.snippet}</p>
          <p className="mt-1 text-[10px] text-white/70">Source: {best.title}</p>
        </div>
      )}

      <ul className="mt-3 flex min-h-[148px] flex-col gap-1.5">
        {shown.map((record) => (
          <li key={record.title} className="demo-rise rounded-xl bg-brand-surface px-3 py-2">
            <div className="flex items-center gap-2">
              <span className={cn("rounded-full px-2 py-0.5 text-[10px] font-bold", tones[record.source])}>{record.source}</span>
              <span className="truncate text-[12px] font-bold text-brand-text">
                <Highlight text={record.title} words={words} />
              </span>
              <span className="ml-auto hidden shrink-0 text-[10px] text-brand-muted sm:block">{record.meta}</span>
            </div>
            <p className="mt-1 line-clamp-1 text-[11px] text-brand-muted">
              <Highlight text={record.snippet} words={words} />
            </p>
          </li>
        ))}
        {matches.length === 0 && <li className="rounded-xl bg-brand-surface px-3 py-6 text-center text-[11px] text-brand-muted">No results. Try “acme”, “pricing” or “leave”.</li>}
        {matches.length > 3 && <li className="px-1 text-[11px] font-semibold text-brand-purple">+ {matches.length - 3} more results</li>}
      </ul>
    </PreviewFrame>
  );
}
