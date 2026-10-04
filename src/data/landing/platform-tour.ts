import { ChartColumn, Handshake, IndianRupee, LayoutDashboard, FolderKanban, Smartphone, Sparkles, UserPlus, Users, MessageCircle, CalendarCheck, Wallet } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /platform-tour (Platform → Platform Tour). Layout lives in components/module-landing/. Figures are illustrative. */

export const platformTourLanding: ModuleLandingData = {
  slug: "platform-tour",
  name: "Platform Tour",
  icon: LayoutDashboard,
  iconTone: "bg-sky-100 text-sky-700",
  hero: {
    eyebrow: "SortBoxs Platform Tour",
    title: "See SortBoxs in action in",
    highlight: "two minutes.",
    description:
      "A guided look at the modules that run a modern business, following one customer from the first lead to the final invoice.",
    points: ["Six modules, one story", "No sign-up needed", "Jump to any chapter"],
  },
  lifecycle: {
    eyebrow: "The story",
    title: "One customer, from first hello to final payment",
    intro: "The tour follows a single customer through the platform, so you see how the modules hand over to each other.",
    steps: [
      { icon: UserPlus, title: "Capture", body: "A new lead arrives from the website and lands in CRM with its source and history." },
      { icon: Handshake, title: "Win", body: "Sales moves the deal through the pipeline, and the AI points out what to do next." },
      { icon: FolderKanban, title: "Deliver", body: "The won deal becomes a project, with tasks, owners and deadlines for the team." },
      { icon: Wallet, title: "Get paid", body: "Finance sends the invoice, collects payment and reports the result." },
    ],
  },
  explorer: {
    eyebrow: "Chapters",
    title: "What you'll see in each chapter",
    intro: "Pick a chapter to see the highlights, or press play on the tour above.",
    label: "Tour chapters",
    metricLabel: "Length",
    itemLabel: "highlights",
    tabs: [
      {
        key: "crm",
        label: "CRM",
        summary: "Every customer in one place.",
        total: "20 s",
        tone: "bg-emerald-500",
        items: [
          { title: "Lead capture", meta: "From forms and email", value: "Auto", note: "Owner assigned in seconds" },
          { title: "Customer timeline", meta: "Every touchpoint", value: "One view", note: "Emails, calls, deals and tickets" },
          { title: "AI suggestions", meta: "Next best action", value: "Ranked", note: "Who to call today, and why" },
        ],
      },
      {
        key: "sales",
        label: "Sales",
        summary: "Close deals faster.",
        total: "20 s",
        tone: "bg-brand-purple",
        items: [
          { title: "Pipeline board", meta: "Drag and drop", value: "Visual", note: "Value and count in every stage" },
          { title: "Quotes", meta: "From your product list", value: "In clicks", note: "Approvals built in" },
          { title: "Forecast", meta: "By rep and team", value: "Live", note: "Compared with quota" },
        ],
      },
      {
        key: "hrms",
        label: "HRMS",
        summary: "Look after your people.",
        total: "20 s",
        tone: "bg-rose-500",
        items: [
          { title: "Attendance and leave", meta: "Web and mobile", value: "Simple", note: "Approvals from a notification" },
          { title: "Onboarding", meta: "Checklist per hire", value: "Automatic", note: "Accounts and tasks created for you" },
          { title: "Payroll", meta: "Runs from attendance", value: "Connected", note: "Statutory deductions applied" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "From invoice to cash.",
        total: "20 s",
        tone: "bg-amber-500",
        items: [
          { title: "Invoicing", meta: "From won deals", value: "Instant", note: "Taxes applied automatically" },
          { title: "Collections", meta: "Reminders by risk", value: "Smart", note: "Chase the right invoices first" },
          { title: "Reports", meta: "Live P&L and cash", value: "Real time", note: "Drill into any number" },
        ],
      },
      {
        key: "ai",
        label: "AI",
        summary: "Intelligence in every module.",
        total: "20 s",
        tone: "bg-sky-500",
        items: [
          { title: "Ask anything", meta: "Plain language", value: "Instant", note: "Answers from your own data" },
          { title: "Agents", meta: "Do the busywork", value: "Approved", note: "You stay in control" },
          { title: "Forecasts", meta: "What's coming", value: "Explained", note: "With the reasons shown" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "What the tour shows",
    title: "A single platform, end to end",
    intro: "You'll see more than screens. You'll see how the pieces connect.",
    items: [
      { icon: LayoutDashboard, title: "One Home Screen", body: "A single starting point with what matters to you today across every module." },
      { icon: UserPlus, title: "Customers to Cash", body: "A lead becomes a customer, a deal, a project and an invoice, without re-entering anything." },
      { icon: Users, title: "People & Projects", body: "Teams, tasks and availability, planned together instead of in separate tools." },
      { icon: Sparkles, title: "AI Assistant", body: "Ask a question, get an answer, and let it handle the repetitive parts." },
      { icon: ChartColumn, title: "Reports That Connect", body: "Dashboards that span sales, finance and delivery, with no spreadsheet in the middle." },
      { icon: Smartphone, title: "On Every Device", body: "Web, mobile and desktop apps, with offline support and push notifications." },
    ],
  },
  ai: {
    eyebrow: "Ready for more?",
    title: "From a tour to trying it for real",
    description: "The tour uses sample data. The quickest way to know if SortBoxs fits is to try it with your own.",
    points: [
      "Start free, with no card needed",
      "Book a live walkthrough tailored to your business",
      "Talk to an expert about your setup",
      "Explore each module in more depth",
    ],
    cards: [
      { icon: CalendarCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Book a live demo", body: "A 30-minute walkthrough built around your own processes, with time for questions." },
      { icon: MessageCircle, tone: "bg-emerald-100 text-emerald-700", title: "Talk to an expert", body: "Tell us what you're trying to fix and we'll suggest where to start." },
      { icon: IndianRupee, tone: "bg-amber-100 text-amber-700", title: "See the pricing", body: "Simple per-user plans, with a free option to start and clear upgrade steps." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Explore the modules from the tour",
    intro: "Each chapter has a full page with more detail and its own interactive demo.",
    slugs: ["crm", "sales", "hrms", "finance", "ai"],
    links: {
      crm: "Go deeper on customers",
      sales: "Go deeper on your pipeline",
      hrms: "Go deeper on people",
      finance: "Go deeper on money",
      ai: "Go deeper on AI",
    },
  },
};
