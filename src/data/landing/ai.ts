import { Bot, BrainCircuit, ChartLine, Clock3, Database, FileText, Lightbulb, MessageSquareText, Sparkles, Workflow, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai (SortBoxs AI Assistant). Layout lives in components/module-landing/. Figures are illustrative. */

export const aiLanding: ModuleLandingData = {
  slug: "ai",
  name: "AI Assistant",
  hero: {
    eyebrow: "SortBoxs AI",
    title: "Your AI Assistant for",
    highlight: "real business impact.",
    description:
      "Get insights, automate tasks, generate reports and make better decisions, all with the power of AI.",
    points: ["Ask questions in plain language", "Agents that act across every module", "Reports and insights on demand"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From your data to a done task",
    intro: "The assistant works on your real business data, inside the permissions each person already has.",
    steps: [
      { icon: Database, title: "Data", body: "It reads the records you already keep in SortBoxs, and only what the person asking is allowed to see." },
      { icon: BrainCircuit, title: "AI", body: "It understands your question in plain language and works out which modules and records are involved." },
      { icon: Lightbulb, title: "Insight", body: "It answers with the numbers, the reason and a chart or a summary you can share." },
      { icon: Zap, title: "Action", body: "It can go on to do the work: draft the email, create the tasks or run the workflow, after you approve." },
    ],
  },
  explorer: {
    eyebrow: "What you can ask",
    title: "Ask it to answer, summarise, automate or report",
    intro: "Pick a type of request to see examples of what teams ask the assistant every day.",
    label: "Assistant skills",
    metricLabel: "Typical time",
    itemLabel: "examples",
    tabs: [
      {
        key: "ask",
        label: "Ask",
        summary: "Get answers from your own data.",
        total: "Seconds",
        tone: "bg-brand-purple",
        items: [
          { title: "Which deals close this month?", meta: "CRM", value: "Instant", note: "Lists 14 deals worth ₹9.6L" },
          { title: "Who is on leave next week?", meta: "HRMS", value: "Instant", note: "9 people across 3 teams" },
          { title: "What is our cash position?", meta: "Finance", value: "Instant", note: "₹46L across 3 accounts" },
        ],
      },
      {
        key: "summarise",
        label: "Summarise",
        summary: "Turn long threads and records into a few lines.",
        total: "Seconds",
        tone: "bg-sky-500",
        items: [
          { title: "Summarise this customer", meta: "CRM", value: "Instant", note: "History, open deals and open tickets" },
          { title: "Catch me up on this ticket", meta: "Customer Service", value: "Instant", note: "A 40-message thread in 5 lines" },
          { title: "Summarise yesterday's meeting", meta: "Projects", value: "Instant", note: "With the action items listed" },
        ],
      },
      {
        key: "automate",
        label: "Automate",
        summary: "Let it do the repetitive work.",
        total: "Minutes",
        tone: "bg-emerald-500",
        items: [
          { title: "Follow up on stale deals", meta: "Sales", value: "1 min", note: "Drafts emails for you to approve" },
          { title: "Chase overdue invoices", meta: "Finance", value: "1 min", note: "Reminders scheduled by priority" },
          { title: "Onboard a new joiner", meta: "HRMS", value: "2 min", note: "Creates the full checklist" },
        ],
      },
      {
        key: "report",
        label: "Report",
        summary: "Get a report without building one.",
        total: "Minutes",
        tone: "bg-amber-500",
        items: [
          { title: "Weekly sales report", meta: "Analytics", value: "1 min", note: "Pipeline, wins and risks" },
          { title: "Headcount by department", meta: "HRMS", value: "1 min", note: "With a chart" },
          { title: "Expenses vs budget", meta: "Finance", value: "2 min", note: "Flags the overspends" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "AI built into the platform",
    title: "One assistant that knows your whole business",
    intro: "It isn't a separate tool to learn. It's already inside every module, working with the same data and permissions.",
    items: [
      { icon: Sparkles, title: "AI Assistant", body: "Ask a question or give an instruction in plain language from anywhere in SortBoxs." },
      { icon: Bot, title: "AI Agents", body: "Agents that handle a whole task end to end, such as chasing invoices or screening resumes." },
      { icon: ChartLine, title: "AI Analytics", body: "Explain trends, find outliers and forecast results without building a single report." },
      { icon: Workflow, title: "AI Automation", body: "Describe a process in a sentence and get a working workflow back." },
      { icon: Lightbulb, title: "AI Insights", body: "Proactive suggestions on deals, tickets, stock and people, when they matter." },
      { icon: MessageSquareText, title: "Natural Language", body: "No filters or formulas. Ask the way you'd ask a colleague and get a clear answer." },
    ],
  },
  ai: {
    eyebrow: "Trust and control",
    title: "Helpful by default, in control by design",
    description:
      "The assistant respects the access each person has, shows where its answers come from and asks before it changes anything.",
    points: [
      "Only sees the data the person asking is allowed to see",
      "Shows the records behind every answer",
      "Asks for your approval before taking action",
      "Keeps a log of what it did and why",
    ],
    cards: [
      { icon: Database, tone: "bg-sky-100 text-sky-700", title: "Sourced answers", body: "Every figure links back to the records it came from, so you can check it." },
      { icon: FileText, tone: "bg-brand-purple-light text-brand-purple", title: "Approve before it acts", body: "Drafts and changes wait for your OK. Nothing is sent or edited on its own." },
      { icon: Clock3, tone: "bg-emerald-100 text-emerald-700", title: "Full activity log", body: "See what the assistant did, who asked and when, in one place." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "AI that works in every module",
    intro: "It doesn't just answer. It's built into the places where your team already works.",
    slugs: ["crm", "hrms", "finance", "analytics", "automation"],
    links: {
      crm: "Next best actions and drafted follow-ups",
      hrms: "Policy answers and attrition signals",
      finance: "Overdue risk and anomaly checks",
      analytics: "Plain-language questions and forecasts",
      automation: "Workflows built from a sentence",
    },
  },
};
