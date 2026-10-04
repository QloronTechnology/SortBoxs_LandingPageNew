import { Compass, GraduationCap, Headset, LayoutTemplate, Layers, SlidersHorizontal, Upload, UserPlus, Users, Workflow } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /how-it-works (Platform → How It Works). Layout lives in components/module-landing/. Figures are illustrative. */

export const howItWorksLanding: ModuleLandingData = {
  slug: "how-it-works",
  name: "How It Works",
  icon: Workflow,
  iconTone: "bg-violet-100 text-violet-700",
  hero: {
    eyebrow: "How SortBoxs works",
    title: "Up and running in",
    highlight: "minutes, not months.",
    description:
      "Start free, pick the modules you need, bring your data and invite your team. No consultants and no long projects.",
    points: ["Start free, no card needed", "Guided setup and data import", "Your team learns by using it"],
  },
  lifecycle: {
    eyebrow: "The four steps",
    title: "From sign-up to a working business system",
    intro: "Most teams go through the same four steps. The first takes about as long as making a coffee.",
    steps: [
      { icon: UserPlus, title: "Create your workspace", body: "Sign up with your work email, name your workspace and choose where your data lives." },
      { icon: Layers, title: "Pick your modules", body: "Switch on only what you need now, like CRM and Sales. You can add more whenever you like." },
      { icon: Upload, title: "Bring your data", body: "Import from spreadsheets or other tools, with fields matched for you and duplicates caught." },
      { icon: Users, title: "Invite your team", body: "Add people by email, assign roles, and they're working in the same place straight away." },
    ],
  },
  explorer: {
    eyebrow: "What to expect",
    title: "A realistic timeline",
    intro: "Pick a stage to see what usually happens, and how much effort it takes.",
    label: "Timeline",
    metricLabel: "Typical effort",
    itemLabel: "steps",
    tabs: [
      {
        key: "day1",
        label: "Day 1",
        summary: "Get set up and take a first look around.",
        total: "~1 hour",
        tone: "bg-emerald-500",
        items: [
          { title: "Create the workspace", meta: "You", value: "5 min", note: "Name it, pick a region, sign in" },
          { title: "Choose your modules", meta: "You", value: "5 min", note: "Start with one or two" },
          { title: "Invite first teammates", meta: "You", value: "10 min", note: "Roles set in a click" },
        ],
      },
      {
        key: "week1",
        label: "Week 1",
        summary: "Get your real data and tools in.",
        total: "~1 day",
        tone: "bg-sky-500",
        items: [
          { title: "Import your data", meta: "You, with guidance", value: "1–2 hrs", note: "Customers, products, employees" },
          { title: "Connect email and calendar", meta: "You", value: "10 min", note: "Google or Microsoft" },
          { title: "Set up first workflows", meta: "You, from templates", value: "1 hr", note: "Lead routing, approvals, reminders" },
        ],
      },
      {
        key: "month1",
        label: "Month 1",
        summary: "Roll out to everyone.",
        total: "A few days",
        tone: "bg-amber-500",
        items: [
          { title: "Roll out to every team", meta: "Admins and team leads", value: "Few days", note: "In-app guides help people learn" },
          { title: "Build your reports", meta: "Managers", value: "2 hrs", note: "Start from ready-made dashboards" },
          { title: "Tune permissions", meta: "Admins", value: "1 hr", note: "Least privilege, then adjust" },
        ],
      },
      {
        key: "ongoing",
        label: "Ongoing",
        summary: "Grow without disruption.",
        total: "As needed",
        tone: "bg-brand-purple",
        items: [
          { title: "Add modules", meta: "Admins", value: "A click", note: "No migration, same data" },
          { title: "Review usage", meta: "Admins", value: "Monthly", note: "See what's used and what's not" },
          { title: "Automate more", meta: "Everyone", value: "Anytime", note: "Turn repeated work into workflows" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Designed to be easy to adopt",
    title: "Everything that gets you from zero to productive",
    intro: "The best software is the kind your team actually uses, so getting started has been made as gentle as possible.",
    items: [
      { icon: Compass, title: "Guided Onboarding", body: "A checklist walks you through setup, so you always know what to do next." },
      { icon: Upload, title: "Smart Data Import", body: "Bring in spreadsheets and exports, with fields matched and duplicates flagged." },
      { icon: LayoutTemplate, title: "Ready-Made Templates", body: "Start from pipelines, workflows and reports built for common ways of working." },
      { icon: GraduationCap, title: "Built-In Training", body: "Short in-app guides and videos teach people at the moment they need them." },
      { icon: Headset, title: "Human Help When You Want It", body: "Chat with support any time, and get a dedicated onboarding partner on larger plans." },
      { icon: SlidersHorizontal, title: "Change as You Grow", body: "Add modules, fields and users later, without redoing what's already in place." },
    ],
  },
  ai: {
    eyebrow: "Support along the way",
    title: "You're never doing it alone",
    description: "Whether you set things up yourself or want a hand, help is close by.",
    points: [
      "In-app guides on every screen",
      "Migration help from your current tools",
      "A dedicated onboarding partner for larger teams",
      "Free to try before you commit",
    ],
    cards: [
      { icon: Compass, tone: "bg-violet-100 text-violet-700", title: "Setup checklist", body: "4 of 6 steps done. Next up: connect your calendar, which takes about a minute." },
      { icon: Upload, tone: "bg-sky-100 text-sky-700", title: "Import review", body: "1,240 contacts imported. 18 looked like duplicates, so we've held them for you to check." },
      { icon: Headset, tone: "bg-emerald-100 text-emerald-700", title: "Help is a click away", body: "Stuck on a step? Chat with the team, or book a short setup call." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Most teams start here",
    intro: "These are the modules teams usually set up first.",
    slugs: ["crm", "sales", "hrms", "finance", "service"],
    links: {
      crm: "Import customers and contacts first",
      sales: "Set up your pipeline stages",
      hrms: "Add people and leave policies",
      finance: "Create invoice templates and tax settings",
      service: "Connect your support inbox",
    },
  },
};
