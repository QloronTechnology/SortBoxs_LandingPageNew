import { Blocks, Database, LayoutGrid, Network, Plug, ShieldCheck, Sparkles, TrendingUp, Workflow, Layers } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /platform (Platform → Platform Overview). Layout lives in components/module-landing/. Figures are illustrative. */

export const platformOverviewLanding: ModuleLandingData = {
  slug: "platform",
  name: "Platform Overview",
  icon: LayoutGrid,
  iconTone: "bg-violet-100 text-violet-700",
  hero: {
    eyebrow: "The SortBoxs Platform",
    title: "One platform.",
    highlight: "Endless possibilities.",
    description: "A complete, modular platform that connects your people, processes and data, powered by AI.",
    points: ["14 modules that work as one", "Start with one, add more any time", "AI built into every module"],
  },
  lifecycle: {
    eyebrow: "How it fits together",
    title: "Start small, connect everything, grow without limits",
    intro: "You don't have to adopt everything at once. Each module works on its own and gets better when it's connected to the others.",
    steps: [
      { icon: Layers, title: "Start small", body: "Begin with the one or two modules you need most. Each works fully on its own from day one." },
      { icon: Network, title: "Connect", body: "Modules share one customer, one employee and one product record, so data flows without re-entry." },
      { icon: Workflow, title: "Automate", body: "Workflows and AI work across modules, taking care of the repetitive steps between teams." },
      { icon: TrendingUp, title: "Grow", body: "Add modules, users and regions as you grow, without migrating or retraining." },
    ],
  },
  explorer: {
    eyebrow: "The modules",
    title: "A module for every part of the business",
    intro: "Pick a family to see the modules in it. Each one has its own page, and they're all connected.",
    label: "Module families",
    metricLabel: "Modules",
    itemLabel: "modules",
    tabs: [
      {
        key: "customers",
        label: "Customers",
        summary: "Win and keep customers.",
        total: "3",
        tone: "bg-emerald-500",
        items: [
          { title: "CRM", meta: "Customers and relationships", value: "Explore", note: "Manage customers, orders and relationships." },
          { title: "Sales", meta: "Pipeline and revenue", value: "Explore", note: "Track opportunities and close deals faster." },
          { title: "Marketing", meta: "Campaigns and growth", value: "Explore", note: "Run campaigns and grow your brand." },
        ],
      },
      {
        key: "people",
        label: "Support & people",
        summary: "Serve customers and your team.",
        total: "3",
        tone: "bg-rose-500",
        items: [
          { title: "Customer Service", meta: "Tickets and satisfaction", value: "Explore", note: "Deliver exceptional support experiences." },
          { title: "HRMS", meta: "People and payroll", value: "Explore", note: "Manage your workforce, from hire to retire." },
          { title: "AI Interview", meta: "Smarter hiring", value: "Explore", note: "Transform recruitment with AI-powered interviews." },
        ],
      },
      {
        key: "operations",
        label: "Operations",
        summary: "Run the work and the supply chain.",
        total: "3",
        tone: "bg-indigo-500",
        items: [
          { title: "Projects", meta: "Plan, track and deliver", value: "Explore", note: "Keep every project, task and deadline visible." },
          { title: "Procurement", meta: "Vendors and purchases", value: "Explore", note: "Manage vendors, purchase orders and approvals." },
          { title: "Inventory", meta: "Stock and warehouses", value: "Explore", note: "Track stock with real-time visibility." },
        ],
      },
      {
        key: "money",
        label: "Money & growth",
        summary: "See the numbers and sell more.",
        total: "3",
        tone: "bg-amber-500",
        items: [
          { title: "Finance", meta: "Invoices and reporting", value: "Explore", note: "Track expenses, invoices and financial health." },
          { title: "Commerce", meta: "Products and orders", value: "Explore", note: "Manage products, orders and transactions." },
          { title: "Analytics", meta: "Dashboards and forecasts", value: "Explore", note: "Make data-driven decisions with real-time reports." },
        ],
      },
      {
        key: "intelligence",
        label: "Intelligence",
        summary: "Work smarter across all of it.",
        total: "2",
        tone: "bg-brand-purple",
        items: [
          { title: "Automation", meta: "Workflows and approvals", value: "Explore", note: "Create powerful workflows without coding." },
          { title: "AI Assistant", meta: "Ask, act and decide", value: "Explore", note: "Get insights and automate tasks with AI." },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Built to work together",
    title: "What makes it one platform, not fourteen tools",
    intro: "The difference is underneath: shared data, shared security and shared intelligence.",
    items: [
      { icon: Blocks, title: "Modular by Design", body: "Use only what you need, and switch more on whenever you're ready." },
      { icon: Database, title: "One Connected Data Model", body: "A customer in CRM is the same customer in Finance and Support, with nothing to sync." },
      { icon: Sparkles, title: "AI in Every Module", body: "Insights, suggestions and an assistant that understands your whole business." },
      { icon: Workflow, title: "Workflows Across Teams", body: "A process can start in one module and finish in another, with no hand-offs lost." },
      { icon: ShieldCheck, title: "Enterprise Security", body: "One sign-in, one permission model and one audit trail across everything." },
      { icon: Plug, title: "Open & Integrated", body: "Connect the tools you already use, or build your own with the API." },
    ],
  },
  ai: {
    eyebrow: "Why one platform",
    title: "Fewer tools, fewer gaps",
    description: "Every extra tool is another login, another bill and another place where information goes out of date. One platform removes all three.",
    points: [
      "One sign-in and one set of permissions",
      "No copying data between tools",
      "One bill and one support team",
      "Reports that span every team",
    ],
    cards: [
      { icon: Database, tone: "bg-violet-100 text-violet-700", title: "One customer record", body: "Sales, support and finance all see the same customer, deals, tickets and invoices." },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "One permission model", body: "Set who can see what once, and it applies across every module." },
      { icon: TrendingUp, tone: "bg-sky-100 text-sky-700", title: "Reports across teams", body: "See how marketing spend turns into revenue, in one report with no spreadsheet." },
    ],
  },
  connected: {
    eyebrow: "Where to begin",
    title: "Most teams start with one of these",
    intro: "Pick the area that hurts most today. The others are there when you need them.",
    slugs: ["crm", "sales", "hrms", "finance", "ai"],
    links: {
      crm: "Start with your customers",
      sales: "Start with your pipeline",
      hrms: "Start with your people",
      finance: "Start with your money",
      ai: "Add intelligence to any of them",
    },
  },
};
