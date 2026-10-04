import { CalendarClock, Gauge, GitBranch, Hourglass, ListTree, Radar, Route, ScanSearch, Settings, Timer, Workflow, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /intelligent-automation. Layout lives in components/module-landing/. Figures are illustrative. */

export const intelligentAutomationLanding: ModuleLandingData = {
  slug: "intelligent-automation",
  name: "Intelligent Automation",
  icon: Zap,
  iconTone: "bg-teal-100 text-teal-700",
  hero: {
    eyebrow: "SortBoxs Intelligent Automation",
    title: "Find what slows you down, then",
    highlight: "automate it.",
    description:
      "SortBoxs studies how work really flows through your business, shows you the bottlenecks and automates the steps that waste the most time.",
    points: ["See where work gets stuck", "Automate steps with one switch", "Measure the time you save"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a slow process to a faster one",
    intro: "You don't have to guess where to start. SortBoxs measures it for you.",
    steps: [
      { icon: Radar, title: "Observe", body: "It maps how processes actually run, from the records and timestamps you already have." },
      { icon: ScanSearch, title: "Find", body: "Bottlenecks and repeated manual steps are highlighted, ranked by the time they waste." },
      { icon: Workflow, title: "Automate", body: "Switch on an automation for a step and preview the time it will save before you commit." },
      { icon: Gauge, title: "Measure", body: "Track cycle time and hours saved, and see which automations pay off the most." },
    ],
  },
  explorer: {
    eyebrow: "Process library",
    title: "Processes that are ready to speed up",
    intro: "Pick a process to see where the time goes and what can be automated.",
    label: "Processes",
    metricLabel: "Time saved",
    itemLabel: "steps",
    tabs: [
      {
        key: "invoice",
        label: "Invoice to payment",
        summary: "From a vendor bill to money out.",
        total: "9.5 days",
        tone: "bg-emerald-500",
        items: [
          { title: "Data entry", meta: "Manual · 12 min each", value: "Automate", note: "Read the bill with Computer Vision" },
          { title: "Approval wait", meta: "Waiting · 2 days", value: "Automate", note: "Route by amount, with reminders" },
          { title: "Payment run", meta: "Weekly", value: "Keep", note: "Needs a human to release funds" },
        ],
      },
      {
        key: "hire",
        label: "Hire to onboard",
        summary: "From a job offer to a productive start.",
        total: "6 days",
        tone: "bg-rose-500",
        items: [
          { title: "Resume screening", meta: "Manual · 3 hrs per role", value: "Automate", note: "Rank candidates against the role" },
          { title: "Interview scheduling", meta: "Email back-and-forth", value: "Automate", note: "Offer open slots automatically" },
          { title: "Account setup", meta: "IT ticket · 2 days", value: "Automate", note: "Create accounts when the offer is signed" },
        ],
      },
      {
        key: "lead",
        label: "Lead to deal",
        summary: "From an enquiry to a signed order.",
        total: "4.5 days",
        tone: "bg-brand-purple",
        items: [
          { title: "Lead routing", meta: "Manual · 1 hour", value: "Automate", note: "Assign by region and capacity" },
          { title: "First follow-up", meta: "Often late", value: "Automate", note: "Draft within minutes of a lead arriving" },
          { title: "Contract approval", meta: "Waiting · 3 days", value: "Automate", note: "Route to legal with a deadline" },
        ],
      },
      {
        key: "ticket",
        label: "Ticket to resolution",
        summary: "From a customer question to a fix.",
        total: "3 hours",
        tone: "bg-sky-500",
        items: [
          { title: "Categorising tickets", meta: "Manual · 4 min each", value: "Automate", note: "Classify by what the customer wrote" },
          { title: "Finding the answer", meta: "Search · 8 min", value: "Automate", note: "Suggest articles and past fixes" },
          { title: "Closing and surveying", meta: "Often forgotten", value: "Automate", note: "Close and send a survey" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Automation guided by evidence",
    title: "Automate what matters most, first",
    intro: "Instead of automating whatever is easiest, start with the steps that cost you the most.",
    items: [
      { icon: ListTree, title: "Process Mapping", body: "See how work really moves between teams, with the time spent at every step." },
      { icon: Hourglass, title: "Bottleneck Detection", body: "Find the waits, hand-offs and rework that slow a process down." },
      { icon: Settings, title: "One-Switch Automation", body: "Turn on an automation for a step and see the new cycle time straight away." },
      { icon: GitBranch, title: "Smart Routing", body: "Send each task to the right person by amount, skill, region or workload." },
      { icon: CalendarClock, title: "Reminders & Escalation", body: "Nudge people before a deadline passes, and escalate if nothing happens." },
      { icon: Timer, title: "Savings Tracking", body: "Report hours saved and cycle-time improvements for every automation." },
    ],
  },
  ai: {
    eyebrow: "Human in the loop",
    title: "Automation that knows when to ask",
    description: "Not everything should run unattended. Intelligent Automation keeps people involved where judgement matters.",
    points: [
      "Suggests the automations worth building first",
      "Previews the effect before anything goes live",
      "Pauses for approval on important decisions",
      "Explains why a run failed and how to fix it",
    ],
    cards: [
      { icon: Radar, tone: "bg-brand-purple-light text-brand-purple", title: "Suggested automation", body: "Approvals wait 2 days on average. A routing rule with reminders could cut that to 6 hours." },
      { icon: Route, tone: "bg-sky-100 text-sky-700", title: "Preview first", body: "Run on last month's data: 212 invoices, 0 errors, about 38 hours saved." },
      { icon: Gauge, tone: "bg-emerald-100 text-emerald-700", title: "Approval kept", body: "Payments above ₹5L still wait for a finance head to release them." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Automation across every team",
    intro: "A process can start in one module and finish in another, with no hand-offs lost in between.",
    slugs: ["finance", "hrms", "sales", "service", "procurement"],
    links: {
      finance: "Invoice capture, approvals and reminders",
      hrms: "Hiring, onboarding and leave workflows",
      sales: "Lead routing and follow-ups",
      service: "Ticket triage and escalation",
      procurement: "Request, approve and order flows",
    },
  },
};
