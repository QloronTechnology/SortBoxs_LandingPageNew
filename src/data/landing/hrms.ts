import {
  Bot,
  CalendarCheck,
  CalendarDays,
  GraduationCap,
  ScanSearch,
  ShieldAlert,
  TrendingUp,
  UserPlus,
  UserRound,
  Users,
  Wallet,
} from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /hrms (Platform → HRMS). Layout lives in components/module-landing/. Figures are illustrative. */

export const hrmsLanding: ModuleLandingData = {
  slug: "hrms",
  name: "HRMS",
  hero: {
    eyebrow: "SortBoxs HRMS",
    title: "Modern HRMS for the",
    highlight: "entire employee lifecycle.",
    description:
      "From recruitment to payroll, SortBoxs HRMS helps you manage, engage and grow your workforce.",
    points: ["Hire to retire in one system", "Attendance, leave and payroll connected", "Compliance built into payroll"],
  },

  /** The flow the Start Free drawer shows for HRMS (data/startFree.ts moduleFlows.hrms). */
  lifecycle: {
    eyebrow: "How it works",
    title: "From a new hire to a paid salary",
    intro: "Attendance and leave feed payroll directly, so month-end is a review, not a reconciliation.",
    steps: [
      {
        icon: UserRound,
        title: "Employee",
        body: "One profile per person: documents, job details, reporting lines and history from onboarding onward.",
      },
      {
        icon: CalendarCheck,
        title: "Attendance",
        body: "Capture check-ins, shifts and work-from-home days from web and mobile, with regularisation requests.",
      },
      {
        icon: CalendarDays,
        title: "Leave",
        body: "Apply, approve and track leave against your policies, with balances always up to date.",
      },
      {
        icon: Wallet,
        title: "Payroll",
        body: "Run payroll from the attendance and leave data you already have, with statutory deductions applied.",
      },
    ],
  },

  explorer: {
    eyebrow: "People operations",
    title: "Every part of HR, one click away",
    intro: "Pick an area to see the kind of work your HR team handles every day.",
    label: "HR areas",
    metricLabel: "This month",
    itemLabel: "highlights",
    tabs: [
      {
        key: "onboarding",
        label: "Onboarding",
        summary: "New joiners and what's left on their checklist.",
        total: "6 joiners",
        tone: "bg-brand-purple",
        items: [
          { title: "Priya Sharma", meta: "Software Engineer", value: "6 of 8", note: "Laptop and accounts ready" },
          { title: "Rahul Verma", meta: "Sales Executive", value: "4 of 8", note: "Awaiting signed offer letter" },
          { title: "Meera Nair", meta: "Designer", value: "8 of 8", note: "Onboarding complete" },
        ],
      },
      {
        key: "attendance",
        label: "Attendance",
        summary: "Who's in, who's remote and what needs a fix.",
        total: "92% present",
        tone: "bg-emerald-500",
        items: [
          { title: "Engineering", meta: "62 employees", value: "95%", note: "4 working from home" },
          { title: "Sales", meta: "38 employees", value: "88%", note: "3 on client visits" },
          { title: "Operations", meta: "47 employees", value: "91%", note: "5 regularisation requests" },
        ],
      },
      {
        key: "leave",
        label: "Leave",
        summary: "Requests waiting on a decision.",
        total: "9 on leave",
        tone: "bg-sky-500",
        items: [
          { title: "Priya Sharma", meta: "Casual leave", value: "3 days", note: "Manager approved" },
          { title: "Arjun Patel", meta: "Sick leave", value: "1 day", note: "Pending approval" },
          { title: "Neha Kapoor", meta: "Earned leave", value: "5 days", note: "Balance after: 7 days" },
        ],
      },
      {
        key: "payroll",
        label: "Payroll",
        summary: "This cycle's run, from inputs to payslips.",
        total: "₹48.2L",
        tone: "bg-amber-500",
        items: [
          { title: "Inputs locked", meta: "Attendance and leave", value: "100%", note: "Synced from HRMS" },
          { title: "Deductions", meta: "PF, ESI and TDS", value: "₹6.1L", note: "Calculated automatically" },
          { title: "Payslips", meta: "248 employees", value: "Ready", note: "Release on payday" },
        ],
      },
      {
        key: "performance",
        label: "Performance",
        summary: "Reviews and goals across the team.",
        total: "14 reviews",
        tone: "bg-rose-500",
        items: [
          { title: "Probation reviews", meta: "3 due this week", value: "3", note: "Managers reminded" },
          { title: "Quarterly goals", meta: "Company-wide", value: "78%", note: "On track overall" },
          { title: "360° feedback", meta: "Product team", value: "11 of 14", note: "Closes Friday" },
        ],
      },
    ],
  },

  capabilities: {
    eyebrow: "The complete HR suite",
    title: "Everything HR does, without the spreadsheets",
    intro: "Hiring, daily operations, pay and growth live in one system that employees and managers actually enjoy using.",
    items: [
      {
        icon: UserPlus,
        title: "Recruitment & Onboarding",
        body: "Track candidates from application to offer, then guide new joiners through a clear checklist.",
      },
      {
        icon: Users,
        title: "Employee Management",
        body: "Keep every profile, document and reporting line current, with an org chart that updates itself.",
      },
      {
        icon: CalendarCheck,
        title: "Attendance & Leave",
        body: "Shifts, check-ins, holidays and leave policies in one place, with approvals on web and mobile.",
      },
      {
        icon: Wallet,
        title: "Payroll & Compliance",
        body: "Run payroll with statutory deductions, generate payslips and keep your records audit-ready.",
      },
      {
        icon: TrendingUp,
        title: "Performance Management",
        body: "Set goals, run review cycles and collect feedback, so growth conversations are based on data.",
      },
      {
        icon: GraduationCap,
        title: "Learning & Development",
        body: "Assign courses, track completion and link training to the skills your roles need.",
      },
    ],
  },

  ai: {
    eyebrow: "AI for people teams",
    title: "Spot the signals before they become problems",
    description:
      "SortBoxs AI looks across attendance, leave, payroll and performance to point HR at what needs a conversation.",
    points: [
      "Highlights teams where attrition signals are building",
      "Catches payroll anomalies before the run is released",
      "Answers employee policy questions instantly",
      "Reminds managers of reviews, probation ends and renewals",
    ],
    cards: [
      {
        icon: ShieldAlert,
        tone: "bg-amber-100 text-amber-700",
        title: "Attrition signal",
        body: "Three people in Sales have taken unplanned leave and missed check-ins this month. Worth a conversation.",
      },
      {
        icon: ScanSearch,
        tone: "bg-brand-purple-light text-brand-purple",
        title: "Payroll check",
        body: "Two salaries differ from last month with no change on record. Review before releasing.",
      },
      {
        icon: Bot,
        tone: "bg-emerald-100 text-emerald-700",
        title: "Instant answers",
        body: "“How many casual leaves do I have left?” was answered for 14 employees today, with no HR ticket.",
      },
    ],
  },

  connected: {
    eyebrow: "Part of one platform",
    title: "HR that connects to the rest of your business",
    intro: "People data flows to finance, hiring and project teams without anyone re-entering it.",
    slugs: ["finance", "ai-interview", "projects", "analytics", "automation"],
    links: {
      finance: "Payroll and reimbursements post to your books",
      "ai-interview": "AI-assisted interviews feed straight into hiring",
      projects: "Staffing and availability from leave and attendance",
      analytics: "Headcount, attrition and cost reporting",
      automation: "Onboarding tasks and approvals by rule",
    },
  },
};
