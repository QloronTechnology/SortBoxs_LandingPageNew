import { Activity, BrainCircuit, ChartLine, FileText, Gauge, Handshake, Sparkles, Target, Trophy, TriangleAlert, UserPlus, Wallet } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /sales-module (Platform → Sales). Layout lives in components/module-landing/. Figures are illustrative. */

export const salesPreview = {
  title: "Revenue Forecast",
  period: "This quarter",
  forecast: {
    label: "Forecast",
    value: "₹54.2L",
    delta: "+12%",
    /** Weekly revenue trend; the first `actual` points are booked, the rest are projected. */
    points: [22, 30, 27, 38, 44, 52, 60, 68],
    actual: 5,
  },
  quota: { percent: 86, label: "Quota attained", detail: "₹46.6L of ₹54.2L" },
  reps: [
    { name: "Anita Rao", deals: 14, amount: "₹18.2L", attainment: "92%", tone: "bg-violet-100 text-violet-700", bar: "from-violet-400 to-brand-purple" },
    { name: "Rohan Mehta", deals: 11, amount: "₹14.6L", attainment: "78%", tone: "bg-sky-100 text-sky-700", bar: "from-sky-400 to-sky-600" },
    { name: "Sara Khan", deals: 9, amount: "₹11.9L", attainment: "64%", tone: "bg-emerald-100 text-emerald-700", bar: "from-emerald-400 to-emerald-600" },
  ],
  toast: { title: "New deal", text: "Northwind · ₹3.4L" },
  insight: "Northwind Logistics is 82% likely to close this week. Send the final quote today.",
  badge: "Forecast up 12%",
};

export const salesLanding: ModuleLandingData = {
  slug: "sales",
  name: "Sales",
  hero: {
    eyebrow: "SortBoxs Sales",
    title: "Track opportunities and",
    highlight: "close deals faster.",
    description:
      "Give your sales team a single place to manage pipelines, forecast revenue and close deals with confidence.",
    points: ["Pipeline and forecast in one view", "Quotes and proposals in a few clicks", "AI-guided deal insights"],
  },

  /** The flow the Start Free drawer shows for Sales (data/startFree.ts moduleFlows.sales). */
  lifecycle: {
    eyebrow: "How it works",
    title: "From first lead to booked revenue",
    intro: "Your team works one connected flow, so the number you forecast is the number that gets invoiced.",
    steps: [
      {
        icon: UserPlus,
        title: "Lead",
        body: "Capture and qualify leads from every source, then route each one to the right rep automatically.",
      },
      {
        icon: Target,
        title: "Opportunity",
        body: "Create opportunities with a value, products and a close date, and keep every stakeholder on the record.",
      },
      {
        icon: Handshake,
        title: "Deal",
        body: "Send quotes and proposals, get discounts approved and move deals through your sales stages.",
      },
      {
        icon: Wallet,
        title: "Revenue",
        body: "Closed deals roll straight into your forecast and hand over to finance for invoicing.",
      },
    ],
  },

  explorer: {
    eyebrow: "Deal views",
    title: "Focus on the deals that matter this week",
    intro: "Switch between the views your team lives in, from open quotes to deals that need a push.",
    label: "Deal views",
    metricLabel: "Total value",
    itemLabel: "deals",
    tabs: [
      {
        key: "quotes",
        label: "Open quotes",
        summary: "Quotes sent and waiting on the customer.",
        total: "₹14.2L",
        tone: "bg-sky-500",
        items: [
          { title: "Helix Motors", meta: "Anita Rao", value: "₹4.8L", note: "Quote v2 sent yesterday" },
          { title: "Coral Hospitality", meta: "Rohan Mehta", value: "₹3.6L", note: "Viewed 4 times" },
          { title: "Pioneer Edu", meta: "Sara Khan", value: "₹5.8L", note: "Awaiting PO number" },
        ],
      },
      {
        key: "closing",
        label: "Closing this month",
        summary: "Deals with a close date in the next few weeks.",
        total: "₹9.6L",
        tone: "bg-brand-purple",
        items: [
          { title: "Northwind Logistics", meta: "Anita Rao", value: "₹3.4L", note: "Final call on Thursday" },
          { title: "Skyline Infra", meta: "Rohan Mehta", value: "₹2.9L", note: "Contract with legal" },
          { title: "Orbit Retail", meta: "Sara Khan", value: "₹3.3L", note: "Verbal yes, paperwork next" },
        ],
      },
      {
        key: "risk",
        label: "At risk",
        summary: "No recent activity or a slipping close date.",
        total: "₹4.1L",
        tone: "bg-amber-500",
        items: [
          { title: "Meridian Steel", meta: "Anita Rao", value: "₹1.8L", note: "No reply for 9 days" },
          { title: "Lotus Clinics", meta: "Sara Khan", value: "₹1.2L", note: "Close date moved twice" },
          { title: "Zenith Pharma", meta: "Rohan Mehta", value: "₹1.1L", note: "Champion left the company" },
        ],
      },
      {
        key: "won",
        label: "Won this quarter",
        summary: "Closed deals that count toward quota.",
        total: "₹22.8L",
        tone: "bg-emerald-500",
        items: [
          { title: "Vertex Labs", meta: "Anita Rao", value: "₹3.1L", note: "Closed last week" },
          { title: "Harbor Exports", meta: "Rohan Mehta", value: "₹2.8L", note: "Invoice sent" },
          { title: "Summit Constructions", meta: "Sara Khan", value: "₹1.5L", note: "Onboarding started" },
        ],
      },
    ],
  },

  capabilities: {
    eyebrow: "Everything your sales team needs",
    title: "From pipeline to forecast, in one workspace",
    intro: "Reps get a clear next step, managers get an honest forecast, and nobody maintains a spreadsheet.",
    items: [
      {
        icon: Target,
        title: "Opportunity Tracking",
        body: "Follow every opportunity with its value, stage, owner, contacts and full activity history.",
      },
      {
        icon: Activity,
        title: "Sales Pipeline",
        body: "A visual board for every stage, with the value and count of deals in each at a glance.",
      },
      {
        icon: FileText,
        title: "Quotes & Proposals",
        body: "Build quotes from your product list, apply approved discounts and send them from the deal.",
      },
      {
        icon: ChartLine,
        title: "Revenue Forecasting",
        body: "Roll up weighted pipeline by rep, team and period, and compare it with quota as the quarter moves.",
      },
      {
        icon: Trophy,
        title: "Team Performance",
        body: "See quota attainment, activity and win rates by rep, so coaching starts from facts.",
      },
      {
        icon: BrainCircuit,
        title: "AI Deal Insights",
        body: "Win-probability scores, next best actions and early risk warnings on every open deal.",
      },
    ],
  },

  ai: {
    eyebrow: "AI deal insights",
    title: "Know which deals will close, and which need help",
    description:
      "SortBoxs AI reads the activity on every deal and tells your team where to spend the next hour.",
    points: [
      "Scores each deal's chance of closing, with the reasons",
      "Suggests the next best action for every open opportunity",
      "Warns you when a forecasted deal starts to slip",
      "Highlights what your top reps do differently",
    ],
    cards: [
      {
        icon: Gauge,
        tone: "bg-emerald-100 text-emerald-700",
        title: "82% likely to close",
        body: "Northwind Logistics has a signed-off budget and an active champion. Send the final quote today.",
      },
      {
        icon: Sparkles,
        tone: "bg-brand-purple-light text-brand-purple",
        title: "Next best action",
        body: "Helix Motors opened the quote 4 times. Book a call with their finance lead.",
      },
      {
        icon: TriangleAlert,
        tone: "bg-amber-100 text-amber-700",
        title: "Forecast risk",
        body: "₹4.1L of this month's forecast has had no activity for a week. Review with the owners.",
      },
    ],
  },

  connected: {
    eyebrow: "Part of one platform",
    title: "Sales that works with the rest of your business",
    intro: "Leads come in, revenue goes out, and nobody re-enters a thing in between.",
    slugs: ["crm", "marketing", "finance", "analytics", "automation"],
    links: {
      crm: "Customer history and contacts on every deal",
      marketing: "Campaign-sourced leads land with their context",
      finance: "Closed deals turn into invoices automatically",
      analytics: "Forecast and win-rate reports across teams",
      automation: "Auto-assign leads and trigger follow-ups",
    },
  },
};
