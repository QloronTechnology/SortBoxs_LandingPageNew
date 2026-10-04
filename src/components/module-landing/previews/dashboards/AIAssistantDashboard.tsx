"use client";

import { useEffect, useRef, useState } from "react";
import { ArrowUp, Sparkles } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";

type Answer = {
  text: string;
  rows: { label: string; value: string }[];
  sources: string;
  followUp: string;
};
const prompts: { chip: string; question: string; answer: Answer }[] = [
  {
    chip: "Overdue invoices",
    question: "Show overdue invoices over ₹1L",
    answer: {
      text: "You have 3 overdue invoices above ₹1L, worth ₹5.8L in total.",
      rows: [
        { label: "Northwind Logistics", value: "₹2.1L · 8 days" },
        { label: "Coral Hospitality", value: "₹2.2L · 44 days" },
        { label: "Meridian Steel", value: "₹1.5L · 15 days" },
      ],
      sources: "Finance",
      followUp: "Want me to draft reminders for all three customers?",
    },
  },
  {
    chip: "Pipeline summary",
    question: "Summarise this week's pipeline",
    answer: {
      text: "Pipeline grew by ₹7.5L this week, and two deals moved to Negotiation.",
      rows: [
        { label: "New leads", value: "+14 · ₹6.1L" },
        { label: "Moved to Negotiation", value: "2 deals" },
        { label: "Closed won", value: "₹3.1L" },
      ],
      sources: "CRM, Sales",
      followUp: "Share this summary with the sales team on Monday?",
    },
  },
  {
    chip: "Stale deals",
    question: "Draft follow-ups for stale deals",
    answer: {
      text: "Five deals had no activity for 7 days. I drafted a follow-up for each.",
      rows: [
        { label: "Meridian Steel", value: "Draft ready" },
        { label: "Lotus Clinics", value: "Draft ready" },
        { label: "Zenith Pharma", value: "Draft ready" },
      ],
      sources: "CRM",
      followUp: "Review the five drafts? Nothing is sent until you approve.",
    },
  },
];

type Message = { role: "user" | "ai"; text: string; answer?: Answer };
const greeting: Message = { role: "ai", text: "Hi Aisha, ask me anything about your business, or pick a question below." };

export function AIAssistantDashboard() {
  const [messages, setMessages] = useState<Message[]>([greeting]);
  const [pending, setPending] = useState<number | null>(null);
  const [followUp, setFollowUp] = useState("Pick a question to see how the assistant answers from your own data.");
  const scroller = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (pending === null) return;
    const timer = setTimeout(() => {
      const { answer } = prompts[pending];
      setMessages((current) => [...current, { role: "ai", text: answer.text, answer }]);
      setFollowUp(answer.followUp);
      setPending(null);
    }, 1100);
    return () => clearTimeout(timer);
  }, [pending]);

  useEffect(() => {
    const element = scroller.current;
    if (element) element.scrollTop = element.scrollHeight;
  }, [messages, pending]);

  const ask = (index: number) => {
    setMessages((current) => [...current, { role: "user", text: prompts[index].question }]);
    setPending(index);
  };

  return (
    <PreviewFrame title="SortBoxs AI" period="Assistant" insight={followUp} badge="46 hours saved">
      <div ref={scroller} aria-live="polite" className="mt-4 flex h-[236px] flex-col gap-2 overflow-y-auto rounded-xl bg-brand-surface p-3 [scrollbar-width:none]">
        {messages.map((message, index) => (
          <div key={index} className={cn("demo-rise flex gap-2", message.role === "user" && "justify-end")}>
            {message.role === "ai" && (
              <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                <Sparkles className="size-3.5" aria-hidden />
              </span>
            )}
            <div
              className={cn(
                "max-w-[85%] rounded-2xl px-3 py-2 text-[12px] leading-snug",
                message.role === "user" ? "rounded-br-sm bg-brand-purple text-white" : "rounded-bl-sm bg-white text-brand-text ring-1 ring-brand-border"
              )}
            >
              {message.text}
              {message.answer && (
                <>
                  <ul className="mt-2 flex flex-col gap-1 rounded-lg bg-brand-surface p-2">
                    {message.answer.rows.map((row) => (
                      <li key={row.label} className="flex justify-between gap-3 text-[11px]">
                        <span className="truncate font-medium text-brand-muted">{row.label}</span>
                        <span className="shrink-0 font-bold text-brand-text">{row.value}</span>
                      </li>
                    ))}
                  </ul>
                  <p className="mt-1.5 text-[10px] text-brand-muted">Source: {message.answer.sources}</p>
                </>
              )}
            </div>
          </div>
        ))}
        {pending !== null && (
          <div className="flex items-center gap-2">
            <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
              <Sparkles className="size-3.5" aria-hidden />
            </span>
            <span className="flex gap-1 rounded-2xl rounded-bl-sm bg-white px-3 py-2.5 ring-1 ring-brand-border" aria-label="Assistant is typing">
              {[0, 1, 2].map((dot) => (
                <span key={dot} className="size-1.5 animate-bounce rounded-full bg-brand-purple/60" style={{ animationDelay: `${dot * 150}ms` }} />
              ))}
            </span>
          </div>
        )}
      </div>

      <div className="mt-3 flex flex-wrap gap-1.5">
        {prompts.map((prompt, index) => (
          <button
            key={prompt.chip}
            type="button"
            disabled={pending !== null}
            onClick={() => ask(index)}
            className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-brand-purple ring-1 ring-brand-purple/30 outline-none transition-colors hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-50"
          >
            {prompt.chip}
          </button>
        ))}
      </div>

      <div className="mt-2 flex items-center gap-2 rounded-xl bg-white px-3 py-2 ring-1 ring-brand-border">
        <input readOnly aria-label="Ask anything" placeholder="Ask anything about your business…" className="min-w-0 flex-1 bg-transparent text-[12px] text-brand-text outline-none placeholder:text-brand-muted" />
        <span className="flex size-6 items-center justify-center rounded-full bg-brand-purple text-white">
          <ArrowUp className="size-3.5" aria-hidden />
        </span>
      </div>
    </PreviewFrame>
  );
}
