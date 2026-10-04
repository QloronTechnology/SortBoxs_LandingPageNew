"use client";

import { useEffect, useState } from "react";
import { Check, RefreshCw } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips } from "./parts";

type Template = "email" | "summary" | "job";
type Tone = "formal" | "friendly" | "short";
const templates: { key: Template; label: string }[] = [
  { key: "email", label: "Follow-up email" },
  { key: "summary", label: "Customer summary" },
  { key: "job", label: "Job post" },
];
const tones: { key: Tone; label: string }[] = [
  { key: "formal", label: "Formal" },
  { key: "friendly", label: "Friendly" },
  { key: "short", label: "Short" },
];
const texts: Record<Template, Record<Tone, string>> = {
  email: {
    formal: "Dear Priya, thank you for your time during Tuesday's demo. As discussed, I have attached the proposal for the Retail suite, priced at ₹3.4L for the first year. Please let me know a suitable time this week to walk through any questions. Kind regards, Anita Rao",
    friendly: "Hi Priya, great chatting on Tuesday! I've attached the proposal for the Retail suite, ₹3.4L for the first year. Happy to jump on a quick call this week if you'd like to go through it. Talk soon, Anita",
    short: "Hi Priya, thanks for Tuesday's demo. Proposal attached: Retail suite, ₹3.4L for year one. Free for a quick call this week? Anita",
  },
  summary: {
    formal: "Aurora Textiles has been a customer since 2024 and holds three active deals worth ₹9.8L. The most recent contact was a demo two days ago. One support ticket is open and within its SLA. Renewal is due in March, and satisfaction is rated 4.6 out of 5.",
    friendly: "Aurora Textiles has been with us since 2024, with three live deals worth ₹9.8L. We spoke two days ago after a demo. They have one open ticket, comfortably within SLA, and they rate us 4.6 out of 5. Renewal is coming up in March.",
    short: "Customer since 2024. 3 deals, ₹9.8L. Demo 2 days ago. 1 open ticket, on track. Rated 4.6/5. Renews in March.",
  },
  job: {
    formal: "We are seeking a Frontend Engineer to join our product team in Bengaluru. You will build and maintain customer-facing interfaces in React, collaborate closely with designers, and contribute to code quality. Requirements: 3+ years of experience with React and TypeScript.",
    friendly: "Love building beautiful, fast interfaces? Join our product team in Bengaluru as a Frontend Engineer. You'll work in React with designers who care about details. We're looking for 3+ years with React and TypeScript, plus curiosity and kindness.",
    short: "Frontend Engineer, Bengaluru. Build customer-facing UIs in React with our design team. 3+ years of React and TypeScript.",
  },
};
const sources: Record<Template, string[]> = {
  email: ["Deal DL-2041", "Demo on Tuesday", "Your sent-email style"],
  summary: ["3 deals", "Ticket #2041", "Satisfaction survey"],
  job: ["Hiring brief", "Team structure", "Company style guide"],
};

export function GenerativeAIDashboard() {
  const [template, setTemplate] = useState<Template>("email");
  const [tone, setTone] = useState<Tone>("friendly");
  const [chars, setChars] = useState(0);
  const [run, setRun] = useState(1);
  const [sent, setSent] = useState(false);
  const full = texts[template][tone];
  const typing = chars < full.length;

  useEffect(() => {
    if (chars >= full.length) return;
    const timer = setTimeout(() => setChars((current) => Math.min(full.length, current + 3)), 18);
    return () => clearTimeout(timer);
  }, [chars, full.length, run]);

  const restart = () => {
    setChars(0);
    setSent(false);
    setRun((current) => current + 1);
  };
  const insight = sent
    ? "Saved to your drafts and logged on the customer timeline. Nothing was sent without your approval."
    : typing
      ? "Writing from the real records in SortBoxs…"
      : "Draft ready. Check the facts, change the tone or approve it. Every figure links to its source record.";

  return (
    <PreviewFrame title="Content Studio" period="Generative AI" insight={insight} badge="Draft in seconds">
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
        <Chips
          label="Template"
          options={templates}
          value={template}
          onChange={(key) => {
            setTemplate(key);
            restart();
          }}
        />
      </div>
      <div className="mt-2 flex flex-wrap items-center justify-between gap-2">
        <Chips
          label="Tone"
          options={tones}
          value={tone}
          onChange={(key) => {
            setTone(key);
            restart();
          }}
        />
        <button
          type="button"
          onClick={restart}
          className="flex items-center gap-1.5 rounded-lg px-2.5 py-1 text-[11px] font-semibold text-brand-purple ring-1 ring-brand-purple/30 outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60"
        >
          <RefreshCw className={cn("size-3", typing && "animate-spin")} aria-hidden /> Regenerate
        </button>
      </div>

      <div className="mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <p className="min-h-[148px] text-[12px] leading-relaxed text-brand-text" aria-live="polite">
          {full.slice(0, chars)}
          {typing && <span className="ml-0.5 inline-block h-3.5 w-[2px] translate-y-0.5 animate-pulse bg-brand-purple" aria-hidden />}
        </p>
      </div>

      <div className="mt-3 flex flex-wrap items-center gap-1.5 text-[10px] font-semibold text-brand-muted">
        Built from
        {sources[template].map((source) => (
          <span key={source} className="rounded-full bg-brand-surface px-2 py-0.5 text-brand-text ring-1 ring-brand-border">
            {source}
          </span>
        ))}
      </div>

      <div className="mt-3 flex items-center justify-between gap-2">
        <span className="text-[11px] text-brand-muted">{full.split(" ").length} words</span>
        <button
          type="button"
          disabled={typing || sent}
          onClick={() => setSent(true)}
          className={cn(
            "flex items-center gap-1.5 rounded-lg px-3 py-1.5 text-[11px] font-semibold outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-60",
            sent ? "bg-emerald-100 text-emerald-700" : "bg-brand-purple text-white hover:bg-brand-purple-dark"
          )}
        >
          {sent ? (
            <>
              <Check className="size-3" aria-hidden /> Saved to drafts
            </>
          ) : (
            "Approve draft"
          )}
        </button>
      </div>
    </PreviewFrame>
  );
}
