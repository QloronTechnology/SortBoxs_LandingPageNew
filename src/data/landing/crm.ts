import {
  Activity,
  BellRing,
  BrainCircuit,
  Building2,
  CalendarClock,
  Contact,
  GitBranch,
  History,
  ListChecks,
  Sparkles,
  Target,
  UserPlus,
} from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /crm-landing (Platform → CRM). Layout lives in components/module-landing/. */

/** Hero preview: a sales dashboard snapshot. Illustrative numbers, as on the rest of the marketing site. */
export const crmPreview = {
  title: "Sales Dashboard",
  period: "This quarter",
  kpis: [
    { label: "Pipeline value", value: "₹69.8L", delta: "+12%", spark: [30, 38, 34, 46, 52, 49, 64, 72] },
    { label: "Win rate", value: "31%", delta: "+4%", spark: [40, 36, 44, 41, 50, 47, 55, 58] },
    { label: "Deals won", value: "14", delta: "+3", spark: [20, 28, 26, 38, 35, 48, 52, 66] },
  ],
  funnel: [
    { label: "New Leads", count: 42, value: "₹18.5L", width: "100%", bar: "from-violet-400 to-brand-purple" },
    { label: "Qualified", count: 28, value: "₹12.4L", width: "80%", bar: "from-violet-500 to-indigo-500" },
    { label: "Proposal", count: 17, value: "₹9.8L", width: "60%", bar: "from-sky-400 to-sky-600" },
    { label: "Negotiation", count: 9, value: "₹6.3L", width: "42%", bar: "from-amber-400 to-orange-500" },
    { label: "Won", count: 14, value: "₹22.8L", width: "68%", bar: "from-emerald-400 to-emerald-600" },
  ],
  board: [
    {
      label: "Qualified",
      dot: "bg-violet-500",
      count: 28,
      deals: [
        { name: "Northwind", value: "₹3.4L", tone: "bg-violet-100 text-violet-700", dragging: false },
        { name: "Skyline Infra", value: "₹1.1L", tone: "bg-indigo-100 text-indigo-700", dragging: false },
      ],
    },
    {
      label: "Proposal",
      dot: "bg-sky-500",
      count: 17,
      deals: [
        { name: "Aurora Textiles", value: "₹3.4L", tone: "bg-sky-100 text-sky-700", dragging: true },
        { name: "Helix Motors", value: "₹2.4L", tone: "bg-cyan-100 text-cyan-700", dragging: false },
      ],
    },
    {
      label: "Won",
      dot: "bg-emerald-500",
      count: 14,
      deals: [
        { name: "Bluepeak Foods", value: "₹3.1L", tone: "bg-emerald-100 text-emerald-700", dragging: false },
        { name: "Vertex Labs", value: "₹2.8L", tone: "bg-teal-100 text-teal-700", dragging: false },
      ],
    },
  ],
  toast: { title: "Deal won", text: "Bluepeak Foods · ₹3.1L" },
  insight: "Aurora Textiles opened your proposal 3 times. Follow up today.",
  badge: "Pipeline up 12%",
};

export const crmLanding: ModuleLandingData = {
  slug: "crm",
  name: "CRM",
  hero: {
    eyebrow: "SortBoxs CRM",
    title: "Turn every customer interaction into",
    highlight: "growth.",
    description:
      "Manage leads, accounts, contacts and opportunities in one place, and build long-term customer relationships with AI-powered insights.",
    points: ["One record for every customer", "Lead to deal in a single flow", "AI-suggested next steps"],
  },

  /** The same flow the Start Free drawer shows for CRM (data/startFree.ts moduleFlows.crm). */
  lifecycle: {
    eyebrow: "How it works",
    title: "From first contact to closed deal",
    intro: "Every stage hands over to the next with the full history attached, so nothing gets lost between teams.",
    steps: [
      {
        icon: Contact,
        title: "Customer",
        body: "Capture every account and contact in one shared record, with the full conversation history behind it.",
      },
      {
        icon: UserPlus,
        title: "Lead",
        body: "Bring in leads from forms, email and imports, then score and assign them to the right owner automatically.",
      },
      {
        icon: Target,
        title: "Opportunity",
        body: "Turn qualified leads into opportunities with a value, a close date and the people involved.",
      },
      {
        icon: GitBranch,
        title: "Deal",
        body: "Move deals through your stages, send the proposal and close, then hand over to billing.",
      },
    ],
  },

  explorer: {
    eyebrow: "Pipeline management",
    title: "See every deal, move it with a click",
    intro: "Pick a stage to see what's sitting in it. Your own pipeline stages, owners and values come through exactly like this.",
    label: "Pipeline stages",
    metricLabel: "Stage value",
    itemLabel: "deals",
    tabs: [
      {
        key: "new",
        label: "New Leads",
        summary: "Fresh leads waiting for a first touch.",
        total: "₹18.5L",
        tone: "bg-brand-purple",
        items: [
          { title: "Aurora Textiles", meta: "R. Mehta", value: "₹1.2L", note: "Web form, 2h ago" },
          { title: "Greenfield Realty", meta: "T. Bose", value: "₹0.8L", note: "Imported from CSV" },
          { title: "Zenith Pharma", meta: "A. Khan", value: "₹1.6L", note: "Referral from K. Nair" },
        ],
      },
      {
        key: "qualified",
        label: "Qualified",
        summary: "Budget and need confirmed.",
        total: "₹12.4L",
        tone: "bg-violet-500",
        items: [
          { title: "Northwind Logistics", meta: "P. Verma", value: "₹3.4L", note: "Demo booked for Friday" },
          { title: "Skyline Infra", meta: "N. Joshi", value: "₹1.1L", note: "Needs pricing for 40 users" },
          { title: "Orbit Retail", meta: "D. Kapoor", value: "₹2.0L", note: "Decision maker identified" },
        ],
      },
      {
        key: "proposal",
        label: "Proposal",
        summary: "Quotes out, waiting on a reply.",
        total: "₹9.8L",
        tone: "bg-sky-500",
        items: [
          { title: "Bluepeak Foods", meta: "A. Rao", value: "₹0.9L", note: "Proposal opened 3 times" },
          { title: "Helix Motors", meta: "M. Shah", value: "₹2.4L", note: "Sent yesterday" },
          { title: "Coral Hospitality", meta: "R. Pillai", value: "₹1.3L", note: "Revision requested" },
        ],
      },
      {
        key: "negotiation",
        label: "Negotiation",
        summary: "Terms and pricing being finalised.",
        total: "₹6.3L",
        tone: "bg-amber-500",
        items: [
          { title: "Meridian Steel", meta: "S. Iyer", value: "₹2.1L", note: "Legal review in progress" },
          { title: "Pioneer Edu", meta: "H. Reddy", value: "₹1.7L", note: "Discount approval pending" },
          { title: "Lotus Clinics", meta: "J. Menon", value: "₹0.6L", note: "Final call scheduled" },
        ],
      },
      {
        key: "won",
        label: "Won",
        summary: "Closed and handed over to billing.",
        total: "₹22.8L",
        tone: "bg-emerald-500",
        items: [
          { title: "Summit Constructions", meta: "K. Nair", value: "₹1.5L", note: "Closed this week" },
          { title: "Vertex Labs", meta: "S. Gupta", value: "₹3.1L", note: "Onboarding started" },
          { title: "Harbor Exports", meta: "V. Rao", value: "₹2.8L", note: "Invoice sent" },
        ],
      },
    ],
  },

  capabilities: {
    eyebrow: "Everything in one CRM",
    title: "Built for the way sales teams actually work",
    intro: "Every part of the customer relationship, from the first enquiry to the renewal, connected in a single workspace.",
    items: [
      {
        icon: Building2,
        title: "Leads & Accounts",
        body: "Keep leads, companies and contacts together, with owners, tags and custom fields that match your process.",
      },
      {
        icon: Target,
        title: "Opportunities",
        body: "Track value, probability and expected close date on every opportunity, and see the forecast roll up.",
      },
      {
        icon: Activity,
        title: "Pipeline Management",
        body: "Drag deals between stages on a visual board and see the value of each stage at a glance.",
      },
      {
        icon: ListChecks,
        title: "Activities & Tasks",
        body: "Log calls, meetings and emails, set follow-up tasks and never lose track of the next step.",
      },
      {
        icon: History,
        title: "Customer Timeline",
        body: "One chronological view of every email, call, note, quote and invoice for a customer.",
      },
      {
        icon: BrainCircuit,
        title: "AI Recommendations",
        body: "Get suggested next steps, deal-risk alerts and the best time to reach out, based on real activity.",
      },
    ],
  },

  ai: {
    eyebrow: "AI insights",
    title: "Know what to do next, before you have to ask",
    description:
      "SortBoxs AI watches activity across your deals and surfaces what needs attention, so reps spend their time selling instead of searching.",
    points: [
      "Spots deals that have gone quiet and suggests a follow-up",
      "Highlights the leads most likely to convert",
      "Drafts follow-up emails from the customer's history",
      "Flags risk early, with the reason behind it",
    ],
    cards: [
      {
        icon: BellRing,
        tone: "bg-amber-100 text-amber-700",
        title: "Deal at risk",
        body: "Meridian Steel has had no activity for 9 days. Suggested: schedule a check-in call.",
      },
      {
        icon: Sparkles,
        tone: "bg-brand-purple-light text-brand-purple",
        title: "Hot lead",
        body: "Zenith Pharma visited pricing twice and opened your email. Reach out now.",
      },
      {
        icon: CalendarClock,
        tone: "bg-emerald-100 text-emerald-700",
        title: "Best time to call",
        body: "Helix Motors usually responds between 10 and 11 AM. Task added for tomorrow.",
      },
    ],
  },

  connected: {
    eyebrow: "Part of one platform",
    title: "CRM that connects to the rest of your business",
    intro: "Customer data flows to the teams that need it, with no exports or re-entry.",
    slugs: ["sales", "marketing", "service", "finance", "analytics"],
    links: {
      sales: "Hand qualified deals to Sales with the full history",
      marketing: "See which campaigns brought in your best leads",
      service: "Support sees the customer's deals and conversations",
      finance: "Won deals become invoices without re-keying",
      analytics: "Pipeline and forecast reporting across the team",
    },
  },
};
