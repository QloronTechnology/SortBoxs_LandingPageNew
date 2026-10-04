import { BellRing, Bot, CalendarClock, CircleCheckBig, GitBranch, Lightbulb, Network, Wrench, Workflow, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /automation. Layout lives in components/module-landing/. Figures are illustrative. */

export const automationLanding: ModuleLandingData = {
  slug: "automation",
  name: "Automation",
  hero: {
    eyebrow: "SortBoxs Automation",
    title: "Automate workflows and",
    highlight: "save time.",
    description: "Create powerful workflows without coding and let SortBoxs handle the busywork.",
    points: ["Build workflows visually, no code", "Triggers across every module", "Approvals and reminders on autopilot"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a trigger to finished work",
    intro: "Describe what should happen and when. SortBoxs does it the same way every time.",
    steps: [
      { icon: Zap, title: "Trigger", body: "Start on an event, a schedule or a condition, like a new lead, an overdue invoice or a new hire." },
      { icon: Workflow, title: "Workflow", body: "Chain steps, conditions and approvals on a visual canvas, and test it before it goes live." },
      { icon: CircleCheckBig, title: "Action", body: "Update records, send messages, create tasks and assign owners across any module." },
    ],
  },
  explorer: {
    eyebrow: "Workflow library",
    title: "Start from the automations teams use most",
    intro: "Pick a team to see example workflows. Each one can be copied and adjusted to your process.",
    label: "Workflow areas",
    metricLabel: "Workflows",
    itemLabel: "workflows",
    tabs: [
      {
        key: "sales",
        label: "Sales",
        summary: "Keep leads moving without manual chasing.",
        total: "12",
        tone: "bg-brand-purple",
        items: [
          { title: "Assign new leads", meta: "When a lead is created", value: "Active", note: "Round-robin by region" },
          { title: "Follow up on quiet deals", meta: "No activity for 7 days", value: "Active", note: "Task for owner, alert for manager" },
          { title: "Hand over won deals", meta: "When a deal is won", value: "Active", note: "Creates the invoice and a project" },
        ],
      },
      {
        key: "hr",
        label: "HR",
        summary: "Make onboarding and approvals run themselves.",
        total: "9",
        tone: "bg-rose-500",
        items: [
          { title: "Onboard a new joiner", meta: "When an employee is added", value: "Active", note: "Checklist, accounts and a welcome email" },
          { title: "Approve leave", meta: "When leave is requested", value: "Active", note: "Manager first, then HR if over 5 days" },
          { title: "Probation reminders", meta: "30 days before the end date", value: "Active", note: "Reminds the manager" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Collect faster and approve with less friction.",
        total: "10",
        tone: "bg-emerald-500",
        items: [
          { title: "Chase overdue invoices", meta: "3 days after the due date", value: "Active", note: "Email, then escalate after 10 days" },
          { title: "Approve large bills", meta: "Bill over ₹1L", value: "Active", note: "Routes to finance head" },
          { title: "Month-end checklist", meta: "Last working day", value: "Scheduled", note: "Tasks for the finance team" },
        ],
      },
      {
        key: "support",
        label: "Support",
        summary: "Route and escalate tickets on rules.",
        total: "11",
        tone: "bg-sky-500",
        items: [
          { title: "Route by topic", meta: "When a ticket is created", value: "Active", note: "Billing, technical or general" },
          { title: "Escalate before SLA breach", meta: "1 hour before the deadline", value: "Active", note: "Alerts the team lead" },
          { title: "Ask for feedback", meta: "When a ticket is resolved", value: "Active", note: "Satisfaction survey by email" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Automation for every team",
    title: "Build it once, let it run forever",
    intro: "Anyone can automate a process, because building a workflow feels like drawing a flowchart.",
    items: [
      { icon: Workflow, title: "Visual Workflow Builder", body: "Drag steps onto a canvas, add conditions and branches, and see exactly what will happen." },
      { icon: Zap, title: "Trigger-Based Actions", body: "Run workflows on record changes, form submissions, dates or messages from other systems." },
      { icon: Network, title: "Cross-Module Automation", body: "One workflow can touch CRM, finance, HR and support, so processes don't stop at team borders." },
      { icon: GitBranch, title: "Approval Chains", body: "Route approvals by amount, role or department, with reminders, delegation and an audit trail." },
      { icon: CalendarClock, title: "Scheduled Automations", body: "Run jobs daily, weekly or monthly, like reports, reminders and recurring tasks." },
      { icon: BellRing, title: "Notification Rules", body: "Tell the right person at the right time, by email or in-app, and only when it matters." },
    ],
  },
  ai: {
    eyebrow: "AI for automation",
    title: "Describe the process, we'll build the workflow",
    description: "SortBoxs AI watches how your team works and suggests the automations that would save the most time.",
    points: [
      "Builds a workflow from a sentence",
      "Suggests automations based on repeated manual work",
      "Explains why a run failed and how to fix it",
      "Spots bottlenecks in your approvals",
    ],
    cards: [
      { icon: Bot, tone: "bg-brand-purple-light text-brand-purple", title: "Build from a sentence", body: "“When an invoice is 5 days overdue, email the customer and tell the owner.” Workflow created." },
      { icon: Lightbulb, tone: "bg-emerald-100 text-emerald-700", title: "Suggested automation", body: "Your team assigns new leads by hand about 40 times a week. Automate it?" },
      { icon: Wrench, tone: "bg-amber-100 text-amber-700", title: "Failed run, fixed", body: "A step failed because a required field was empty. Add a default value?" },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Automation that reaches every module",
    intro: "Because everything lives in one platform, a workflow can cross teams without any integration work.",
    slugs: ["crm", "hrms", "finance", "service", "ai"],
    links: {
      crm: "Assign, follow up and hand over deals",
      hrms: "Onboarding, leave and review workflows",
      finance: "Reminders, approvals and checklists",
      service: "Routing, escalation and feedback",
      ai: "Build workflows from plain language",
    },
  },
};