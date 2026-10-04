"use client";

import { useEffect, useState } from "react";
import { Check, Loader2, Play, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";
import { Chips, SectionLabel } from "./parts";

const agents = [
  {
    key: "collections",
    label: "Collections",
    goal: "Follow up on invoices that are more than 7 days late.",
    steps: [
      { tool: "Finance.getInvoices", text: "Found 6 overdue invoices worth ₹14.3L" },
      { tool: "CRM.getContacts", text: "Matched each invoice to its billing contact" },
      { tool: "Rules.check", text: "Skipped 1 customer with a promise to pay" },
      { tool: "Email.draft", text: "Drafted 5 reminders in your tone" },
    ],
    approval: { title: "Send 5 payment reminders?", detail: "₹10.9L across 5 customers" },
    done: "5 reminders sent with payment links. I'll check again on Friday.",
    saved: 1.5,
  },
  {
    key: "leads",
    label: "Lead qualifier",
    goal: "Score new leads and assign each one to the right rep.",
    steps: [
      { tool: "CRM.getLeads", text: "Found 14 new leads from the last 24 hours" },
      { tool: "Enrich.company", text: "Added company size and industry to each" },
      { tool: "Score.lead", text: "Ranked them: 3 hot, 6 warm, 5 cold" },
      { tool: "Assign.owner", text: "Matched hot leads to reps by region" },
    ],
    approval: { title: "Assign 3 hot leads now?", detail: "Anita (2) and Rohan (1)" },
    done: "3 hot leads assigned and a first-touch task created for each.",
    saved: 1.2,
  },
  {
    key: "triage",
    label: "Ticket triage",
    goal: "Categorise new tickets and route them to the right team.",
    steps: [
      { tool: "Service.getTickets", text: "Found 22 untriaged tickets" },
      { tool: "NLP.classify", text: "Sorted them: 9 billing, 8 technical, 5 general" },
      { tool: "SLA.check", text: "Flagged 2 tickets close to breaching SLA" },
      { tool: "Route.team", text: "Prepared assignments by team capacity" },
    ],
    approval: { title: "Route 22 tickets?", detail: "Billing 9 · Technical 8 · General 5" },
    done: "22 tickets routed. The 2 urgent ones went to the front of the queue.",
    saved: 0.9,
  },
];
type Phase = "idle" | "running" | "approval" | "done" | "rejected";

export function AIAgentsDashboard() {
  const [agentIndex, setAgentIndex] = useState(0);
  const [phase, setPhase] = useState<Phase>("idle");
  const [step, setStep] = useState(0);
  const [tasks, setTasks] = useState(128);
  const [saved, setSaved] = useState(46);
  const agent = agents[agentIndex];

  useEffect(() => {
    if (phase !== "running") return;
    const timer = setTimeout(() => {
      if (step >= agent.steps.length) setPhase("approval");
      else setStep((current) => current + 1);
    }, 850);
    return () => clearTimeout(timer);
  }, [phase, step, agent.steps.length]);

  const reset = (index: number) => {
    setAgentIndex(index);
    setPhase("idle");
    setStep(0);
  };
  const insight =
    phase === "running"
      ? `Working: ${agent.steps[Math.min(step, agent.steps.length - 1)].tool} …`
      : phase === "approval"
        ? "The agent is waiting for you. Nothing happens until you approve."
        : phase === "done"
          ? `${agent.done.split(".")[0]}. That saved about ${agent.saved} hours.`
          : phase === "rejected"
            ? "Rejected. The agent discarded its drafts and logged your decision."
            : "Pick an agent and press Run. It will plan the steps and ask before it acts.";

  return (
    <PreviewFrame title="Agent Console" period="Human in the loop" insight={insight} badge="3 agents working">
      <div className="mt-4 grid grid-cols-3 gap-2">
        {[
          ["Tasks done", tasks.toLocaleString("en-IN")],
          ["Hours saved", String(Math.round(saved * 10) / 10)],
          ["Approved", "94%"],
        ].map(([label, value]) => (
          <div key={label} className="rounded-xl bg-brand-surface px-3 py-2">
            <p className="text-[10px] font-semibold text-brand-muted">{label}</p>
            <p key={value} className="demo-rise text-lg font-extrabold text-brand-text">{value}</p>
          </div>
        ))}
      </div>

      <div className="mt-3 flex flex-wrap items-center justify-between gap-2">
        <Chips label="Agent" options={agents.map((item) => ({ key: item.key, label: item.label }))} value={agent.key} onChange={(key) => reset(agents.findIndex((item) => item.key === key))} />
        <button
          type="button"
          disabled={phase === "running" || phase === "approval"}
          onClick={() => {
            setStep(0);
            setPhase("running");
          }}
          className="flex items-center gap-1.5 rounded-lg bg-brand-purple px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:opacity-40"
        >
          <Play className="size-3 fill-current" aria-hidden /> {phase === "done" || phase === "rejected" ? "Run again" : "Run agent"}
        </button>
      </div>

      <div className="mt-3 rounded-xl bg-brand-surface p-3">
        <SectionLabel>Goal</SectionLabel>
        <p className="mt-0.5 text-[12px] font-semibold text-brand-text">{agent.goal}</p>
        <ol className="mt-2 flex min-h-[92px] flex-col gap-1.5" aria-live="polite">
          {agent.steps.slice(0, Math.min(step, agent.steps.length)).map((item) => (
            <li key={item.tool} className="demo-rise flex items-center gap-2 text-[11px]">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                <Check className="size-2.5" aria-hidden />
              </span>
              <code className="shrink-0 rounded bg-white px-1.5 py-0.5 font-mono text-[10px] font-semibold text-brand-purple ring-1 ring-brand-border">{item.tool}</code>
              <span className="truncate text-brand-text">{item.text}</span>
            </li>
          ))}
          {phase === "running" && step < agent.steps.length && (
            <li className="flex items-center gap-2 text-[11px] text-brand-muted">
              <Loader2 className="size-4 animate-spin text-brand-purple" aria-hidden /> Thinking…
            </li>
          )}
          {phase === "idle" && <li className="text-[11px] text-brand-muted">The agent&apos;s steps will appear here.</li>}
        </ol>
      </div>

      {phase === "approval" && (
        <div className="demo-rise mt-3 flex flex-wrap items-center gap-3 rounded-xl bg-brand-purple-light p-3 ring-1 ring-brand-purple/30">
          <div className="min-w-0 flex-1">
            <p className="text-[12px] font-bold text-brand-text">{agent.approval.title}</p>
            <p className="text-[11px] text-brand-muted">{agent.approval.detail}</p>
          </div>
          <button
            type="button"
            onClick={() => {
              setPhase("done");
              setTasks((current) => current + 1);
              setSaved((current) => current + agent.saved);
            }}
            className="flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-emerald-600 focus-visible:ring-2 focus-visible:ring-emerald-300"
          >
            <Check className="size-3" aria-hidden /> Approve
          </button>
          <button
            type="button"
            onClick={() => setPhase("rejected")}
            className="flex items-center gap-1 rounded-lg bg-white px-3 py-1.5 text-[11px] font-semibold text-red-600 ring-1 ring-red-200 outline-none hover:bg-red-50 focus-visible:ring-2 focus-visible:ring-red-300"
          >
            <X className="size-3" aria-hidden /> Reject
          </button>
        </div>
      )}
      {(phase === "done" || phase === "rejected") && (
        <p className={cn("demo-rise mt-3 rounded-xl px-3 py-2.5 text-[11px] font-semibold", phase === "done" ? "bg-emerald-100 text-emerald-800" : "bg-red-100 text-red-700")}>
          {phase === "done" ? agent.done : "Request rejected. Nothing was sent."}
        </p>
      )}
    </PreviewFrame>
  );
}
