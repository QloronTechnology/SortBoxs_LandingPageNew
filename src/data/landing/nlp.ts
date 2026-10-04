import { BookOpen, CircleCheckBig, Database, FileText, Lock, MessageSquare, MessageSquareText, Reply, ScanText, Tags } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /natural-language-processing. Layout lives in components/module-landing/. Figures are illustrative. */

export const nlpLanding: ModuleLandingData = {
  slug: "natural-language-processing",
  name: "Natural Language Processing",
  icon: MessageSquareText,
  iconTone: "bg-pink-100 text-pink-700",
  hero: {
    eyebrow: "SortBoxs Language AI",
    title: "Talk to your business data in",
    highlight: "plain language.",
    description:
      "Ask a question the way you'd ask a colleague. SortBoxs understands what you mean, finds the right records and shows you how it got the answer.",
    points: ["No filters, formulas or report builders", "See how your question was understood", "Respects what each person is allowed to see"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a question to a trustworthy answer",
    intro: "Every question goes through the same steps, and you can see each one.",
    steps: [
      { icon: MessageSquare, title: "Ask", body: "Type or say a question in everyday words, like “how much did we sell in the West last quarter?”" },
      { icon: ScanText, title: "Understand", body: "SortBoxs picks out the metric, the filters, the time period and what you want to compare." },
      { icon: Database, title: "Query", body: "It turns that into a precise query on your own data, using only what you are allowed to see." },
      { icon: CircleCheckBig, title: "Answer", body: "You get the result as a number, a table or a chart, with the interpretation shown so you can correct it." },
    ],
  },
  explorer: {
    eyebrow: "What you can ask",
    title: "Questions every team can answer for themselves",
    intro: "Pick a team to see the kinds of questions people ask, and what comes back.",
    label: "Question types",
    metricLabel: "Typical time",
    itemLabel: "questions",
    tabs: [
      {
        key: "sales",
        label: "Sales",
        summary: "Pipeline, deals and targets.",
        total: "Seconds",
        tone: "bg-brand-purple",
        items: [
          { title: "Which deals close this month?", meta: "CRM", value: "14 deals", note: "Worth ₹9.6L in total" },
          { title: "Who is behind on quota?", meta: "Sales", value: "2 reps", note: "Both under 70% attainment" },
          { title: "Show deals stuck in negotiation", meta: "CRM", value: "4 deals", note: "Longest has been there 21 days" },
        ],
      },
      {
        key: "people",
        label: "People",
        summary: "Headcount, leave and hiring.",
        total: "Seconds",
        tone: "bg-rose-500",
        items: [
          { title: "Who is on leave next week?", meta: "HRMS", value: "9 people", note: "Across 3 teams" },
          { title: "How many open roles do we have?", meta: "Hiring", value: "11 roles", note: "5 in engineering" },
          { title: "Show new joiners this month", meta: "HRMS", value: "6 people", note: "All onboarding is on track" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Cash, invoices and spend.",
        total: "Seconds",
        tone: "bg-emerald-500",
        items: [
          { title: "What is our cash position?", meta: "Finance", value: "₹46L", note: "Across 3 accounts" },
          { title: "List invoices overdue by 30 days", meta: "Finance", value: "4 invoices", note: "₹6.4L in total" },
          { title: "Compare spend to budget", meta: "Finance", value: "-4%", note: "Under budget overall" },
        ],
      },
      {
        key: "support",
        label: "Support",
        summary: "Tickets, SLAs and satisfaction.",
        total: "Seconds",
        tone: "bg-sky-500",
        items: [
          { title: "How many tickets are open?", meta: "Customer Service", value: "128", note: "11 close to breaching SLA" },
          { title: "What's our average response time?", meta: "Customer Service", value: "12 min", note: "Down 2 minutes this week" },
          { title: "Which topic has the most complaints?", meta: "Customer Service", value: "Billing", note: "31% of this week's tickets" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Language AI for your data",
    title: "Everyone gets to ask, not just the analysts",
    intro: "Questions become queries, and queries become answers, without anyone learning a tool.",
    items: [
      { icon: MessageSquareText, title: "Plain-Language Questions", body: "Ask in everyday words and get a number, a table or a chart back." },
      { icon: Tags, title: "Intent & Entity Detection", body: "SortBoxs finds the metric, filters and time period in your question and shows you what it found." },
      { icon: BookOpen, title: "Your Own Vocabulary", body: "Teach it your terms and synonyms, like “wins” meaning closed-won deals." },
      { icon: Reply, title: "Follow-Up Questions", body: "Keep going with “now by region” or “only the top five”, and it remembers the context." },
      { icon: FileText, title: "Summaries on Demand", body: "Ask for a short summary of a customer, a ticket thread, a report or a week's activity." },
      { icon: Lock, title: "Permission-Aware", body: "Answers only draw on data the person asking already has access to." },
    ],
  },
  ai: {
    eyebrow: "Accurate and accountable",
    title: "Answers you can check",
    description: "A good answer isn't enough. You should be able to see how it was reached, and correct it if it was misread.",
    points: [
      "Shows how your question was understood",
      "Links every figure to the records behind it",
      "Asks you to clarify when a question is ambiguous",
      "Never reveals data you aren't allowed to see",
    ],
    cards: [
      { icon: ScanText, tone: "bg-brand-purple-light text-brand-purple", title: "Interpretation shown", body: "Understood as: revenue, region West, last quarter, grouped by product. Wrong? Edit any part." },
      { icon: Database, tone: "bg-sky-100 text-sky-700", title: "Traceable figures", body: "₹18.2L is the sum of 42 closed deals. Click the number to open them." },
      { icon: Lock, tone: "bg-emerald-100 text-emerald-700", title: "Respects access", body: "Salary data was left out of this answer because your role can't view it." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "One place to ask about everything",
    intro: "Because your data lives in one platform, a single question can span several modules.",
    slugs: ["crm", "sales", "finance", "hrms", "analytics"],
    links: {
      crm: "Ask about customers, deals and contacts",
      sales: "Pipeline, quota and forecast questions",
      finance: "Cash, invoices and budget questions",
      hrms: "Headcount, leave and hiring questions",
      analytics: "Turn any answer into a saved report",
    },
  },
};
