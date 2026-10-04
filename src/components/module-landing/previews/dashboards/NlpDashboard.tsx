"use client";

import { useState } from "react";
import { ArrowDown, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { SectionLabel } from "./parts";

type TokenType = "metric" | "group" | "filter" | "time";
const types: Record<TokenType, { label: string; mark: string; chip: string }> = {
  metric: { label: "Metric", mark: "bg-violet-200 text-violet-900", chip: "bg-violet-100 text-violet-800 ring-violet-300" },
  group: { label: "Group by", mark: "bg-emerald-200 text-emerald-900", chip: "bg-emerald-100 text-emerald-800 ring-emerald-300" },
  filter: { label: "Filter", mark: "bg-sky-200 text-sky-900", chip: "bg-sky-100 text-sky-800 ring-sky-300" },
  time: { label: "Period", mark: "bg-amber-200 text-amber-900", chip: "bg-amber-100 text-amber-800 ring-amber-300" },
};
const queries: {
  chip: string;
  tokens: { text: string; type: TokenType | null }[];
  parsed: { type: TokenType; value: string }[];
  heading: string;
  rows: [string, string][];
  insight: string;
}[] = [
  {
    chip: "Revenue by product",
    tokens: [
      { text: "Show me ", type: null },
      { text: "revenue ", type: "metric" },
      { text: "by ", type: null },
      { text: "product ", type: "group" },
      { text: "for the ", type: null },
      { text: "West region ", type: "filter" },
      { text: "last quarter", type: "time" },
    ],
    parsed: [
      { type: "metric", value: "Revenue" },
      { type: "group", value: "Product" },
      { type: "filter", value: "Region = West" },
      { type: "time", value: "Last quarter" },
    ],
    heading: "Revenue, West, last quarter",
    rows: [["Retail suite", "₹6.4L"], ["Analytics", "₹4.1L"], ["Support", "₹2.2L"]],
    insight: "Revenue by product, West region, last quarter. Retail suite led with ₹6.4L.",
  },
  {
    chip: "Overdue invoices",
    tokens: [
      { text: "List ", type: null },
      { text: "overdue invoices ", type: "metric" },
      { text: "above ", type: null },
      { text: "₹1 lakh ", type: "filter" },
      { text: "older than ", type: null },
      { text: "30 days", type: "time" },
    ],
    parsed: [
      { type: "metric", value: "Invoices (overdue)" },
      { type: "filter", value: "Amount > ₹1L" },
      { type: "time", value: "Older than 30 days" },
    ],
    heading: "Overdue invoices over ₹1L",
    rows: [["Coral Hospitality", "₹2.2L · 44d"], ["Northwind Logistics", "₹2.1L · 38d"], ["Lotus Clinics", "₹1.6L · 72d"]],
    insight: "3 invoices above ₹1L and older than 30 days, worth ₹5.9L. Draft reminders?",
  },
  {
    chip: "Leave next week",
    tokens: [
      { text: "Who is on ", type: null },
      { text: "leave ", type: "metric" },
      { text: "in ", type: null },
      { text: "engineering ", type: "filter" },
      { text: "group by ", type: null },
      { text: "day ", type: "group" },
      { text: "next week", type: "time" },
    ],
    parsed: [
      { type: "metric", value: "Employees on leave" },
      { type: "filter", value: "Team = Engineering" },
      { type: "group", value: "Day" },
      { type: "time", value: "Next week" },
    ],
    heading: "Engineering leave, next week",
    rows: [["Monday", "2 people"], ["Wednesday", "1 person"], ["Friday", "3 people"]],
    insight: "Friday is busiest, with 3 of 62 engineers away. No release clash.",
  },
];

export function NlpDashboard() {
  const [index, setIndex] = useState(0);
  const [hovered, setHovered] = useState<TokenType | null>(null);
  const query = queries[index];

  return (
    <PreviewFrame title="Ask in Plain Language" period="Language AI" insight={query.insight} badge="No filters needed">
      <div className="mt-4 flex flex-wrap gap-1.5">
        {queries.map((item, i) => (
          <button
            key={item.chip}
            type="button"
            aria-pressed={i === index}
            onClick={() => setIndex(i)}
            className={cn(
              "rounded-full px-3 py-1 text-[11px] font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple/60",
              i === index ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text"
            )}
          >
            {item.chip}
          </button>
        ))}
      </div>

      <div key={index} className="demo-rise mt-3 flex items-start gap-2 rounded-xl bg-brand-surface p-3 ring-1 ring-brand-border">
        <Search className="mt-0.5 size-4 shrink-0 text-brand-purple" aria-hidden />
        <p className="text-[13px] leading-relaxed font-medium text-brand-text">
          {query.tokens.map((token, i) =>
            token.type ? (
              <span
                key={i}
                tabIndex={0}
                onMouseEnter={() => setHovered(token.type)}
                onMouseLeave={() => setHovered(null)}
                onFocus={() => setHovered(token.type)}
                onBlur={() => setHovered(null)}
                className={cn("cursor-default rounded px-0.5 outline-none transition-all", types[token.type].mark, hovered === token.type && "ring-2 ring-brand-navy/50")}
              >
                {token.text}
              </span>
            ) : (
              <span key={i}>{token.text}</span>
            )
          )}
        </p>
      </div>

      <div className="my-1.5 flex items-center gap-2 pl-1 text-[10px] font-semibold text-brand-muted">
        <ArrowDown className="size-3" aria-hidden /> Understood as <span className="hidden sm:inline">(hover to link)</span>
      </div>
      <ul className="flex flex-wrap gap-1.5">
        {query.parsed.map((item) => (
          <li
            key={item.type}
            onMouseEnter={() => setHovered(item.type)}
            onMouseLeave={() => setHovered(null)}
            className={cn("rounded-lg px-2.5 py-1 text-[11px] font-semibold ring-1 transition-all", types[item.type].chip, hovered === item.type ? "scale-105 shadow-md" : hovered ? "opacity-50" : "")}
          >
            <span className="font-medium opacity-70">{types[item.type].label}: </span>
            {item.value}
          </li>
        ))}
      </ul>

      <div key={`r${index}`} className="demo-rise mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <SectionLabel>{query.heading}</SectionLabel>
        <ul className="mt-2 flex flex-col gap-1">
          {query.rows.map(([label, value]) => (
            <li key={label} className="flex justify-between gap-3 rounded-lg bg-brand-surface px-3 py-1.5 text-[12px]">
              <span className="font-medium text-brand-text">{label}</span>
              <span className="font-bold text-brand-purple">{value}</span>
            </li>
          ))}
        </ul>
      </div>
    </PreviewFrame>
  );
}
