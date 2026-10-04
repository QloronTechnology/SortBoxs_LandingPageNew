import { CalendarClock, ClipboardList, History, KeyRound, ListChecks, Network, ShieldCheck, Sparkles, Target, UserCheck, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai-agents (Platform → AI-Powered Capabilities). Layout lives in components/module-landing/. Figures are illustrative. */

export const aiAgentsLanding: ModuleLandingData = {
  slug: "ai-agents",
  name: "AI Agents",
  icon: Sparkles,
  iconTone: "bg-sky-100 text-sky-700",
  hero: {
    eyebrow: "SortBoxs AI Agents",
    title: "AI agents that",
    highlight: "do the work, not just answer.",
    description:
      "Give an agent a goal and it plans the steps, uses your SortBoxs data and tools, and asks for your approval before anything important happens.",
    points: ["Agents that work across every module", "You approve before they act", "A full log of every step they take"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a goal to finished work",
    intro: "An agent breaks a goal into steps, does them with your tools and checks back with you at the moments that matter.",
    steps: [
      { icon: Target, title: "Goal", body: "Describe what you want in plain language, like “follow up on every invoice that is more than 7 days late.”" },
      { icon: ListChecks, title: "Plan", body: "The agent works out the steps and shows you the plan, with the data and tools it will use." },
      { icon: Zap, title: "Act", body: "It searches records, drafts messages and prepares updates across CRM, finance, support and HR." },
      { icon: UserCheck, title: "Review", body: "Sensitive steps wait for your approval. You approve, edit or reject, and the agent carries on." },
    ],
  },
  explorer: {
    eyebrow: "Agent library",
    title: "Agents for the work your team repeats",
    intro: "Pick a team to see example agents. Each one can be adjusted to follow your own process and rules.",
    label: "Agent teams",
    metricLabel: "Tasks this week",
    itemLabel: "agents",
    tabs: [
      {
        key: "sales",
        label: "Sales",
        summary: "Keep every lead warm without manual chasing.",
        total: "214",
        tone: "bg-brand-purple",
        items: [
          { title: "Lead qualifier", meta: "Runs on every new lead", value: "Active", note: "Scores leads and assigns the right owner" },
          { title: "Follow-up agent", meta: "Daily at 9 AM", value: "Active", note: "Drafts emails for deals quiet for 7 days" },
          { title: "Meeting prep", meta: "1 hour before a call", value: "Active", note: "Summarises history and open questions" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Collect faster and catch mistakes earlier.",
        total: "168",
        tone: "bg-emerald-500",
        items: [
          { title: "Collections agent", meta: "Daily", value: "Active", note: "Reminds customers in order of risk" },
          { title: "Expense checker", meta: "On every claim", value: "Active", note: "Flags duplicates and policy breaches" },
          { title: "Month-end helper", meta: "Last working day", value: "Scheduled", note: "Prepares the close checklist" },
        ],
      },
      {
        key: "support",
        label: "Support",
        summary: "Route, answer and escalate with less effort.",
        total: "342",
        tone: "bg-sky-500",
        items: [
          { title: "Ticket triage", meta: "On every ticket", value: "Active", note: "Categorises, prioritises and routes" },
          { title: "Reply drafter", meta: "On assignment", value: "Active", note: "Suggests answers from your knowledge base" },
          { title: "Escalation watcher", meta: "Every 5 minutes", value: "Active", note: "Warns before an SLA is missed" },
        ],
      },
      {
        key: "hr",
        label: "HR",
        summary: "Make hiring and people admin run smoothly.",
        total: "96",
        tone: "bg-rose-500",
        items: [
          { title: "Resume screener", meta: "On every application", value: "Active", note: "Ranks candidates against the role" },
          { title: "Onboarding guide", meta: "On a new hire", value: "Active", note: "Creates the checklist and sends reminders" },
          { title: "Policy assistant", meta: "On request", value: "Active", note: "Answers employee questions from policy" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Built for real work",
    title: "Agents with the guardrails your business needs",
    intro: "They are capable enough to finish tasks, and careful enough that you stay in charge.",
    items: [
      { icon: Target, title: "Goal-Based Tasks", body: "Describe an outcome and the agent plans and carries out the steps to reach it." },
      { icon: Network, title: "Tools Across Modules", body: "Agents read and update CRM, finance, support, HR and more, with the same access your team has." },
      { icon: UserCheck, title: "Human Approval", body: "Choose which actions need a person's OK, like sending emails or changing amounts." },
      { icon: CalendarClock, title: "Scheduled or Triggered", body: "Run on a schedule, or whenever a lead, ticket, invoice or request arrives." },
      { icon: History, title: "Context and Memory", body: "Agents remember the customer's history and your instructions, so they don't start from zero." },
      { icon: ClipboardList, title: "Complete Audit Trail", body: "Every step, tool call and decision is logged so you can review exactly what happened." },
    ],
  },
  ai: {
    eyebrow: "Control and safety",
    title: "Autonomy you can trust",
    description: "Agents only do what you allow, and you can see everything they do. That is what makes it safe to hand them real work.",
    points: [
      "Agents only use the tools and data you grant them",
      "Sensitive actions wait for your approval",
      "Every step is logged and can be reviewed later",
      "Pause or switch off any agent at any time",
    ],
    cards: [
      { icon: UserCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Approval gate", body: "The collections agent drafted 6 reminders. They go out only after you approve." },
      { icon: KeyRound, tone: "bg-sky-100 text-sky-700", title: "Scoped permissions", body: "This agent can read invoices and draft emails, but it cannot change amounts." },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Activity log", body: "14 steps recorded for this run, each with the data it used and the result." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Agents that reach every part of your business",
    intro: "Because all your data is in one platform, an agent can follow a task from a lead to an invoice to a payment.",
    slugs: ["crm", "sales", "finance", "service", "hrms"],
    links: {
      crm: "Qualify leads and keep records up to date",
      sales: "Follow up on quiet deals automatically",
      finance: "Chase invoices and check expenses",
      service: "Triage tickets and draft replies",
      hrms: "Screen resumes and guide onboarding",
    },
  },
};
