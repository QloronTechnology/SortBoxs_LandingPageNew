import { BookOpen, CircleCheckBig, Contact, Headset, MessageSquareText, MessagesSquare, Route, Siren, Smile, Ticket, Timer } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /customer-service-module (Platform → Customer Service). Layout lives in components/module-landing/. Figures are illustrative. */

export const serviceLanding: ModuleLandingData = {
  slug: "service",
  name: "Customer Service",
  hero: {
    eyebrow: "SortBoxs Customer Service",
    title: "Deliver exceptional",
    highlight: "support experiences.",
    description: "Resolve tickets faster, track SLAs and keep customers happy with a unified service desk.",
    points: ["Every channel in one ticket queue", "SLA timers that keep agents on track", "AI routing and suggested replies"],
  },

  /** The flow the Start Free drawer shows for Customer Service (data/startFree.ts moduleFlows.service). */
  lifecycle: {
    eyebrow: "How it works",
    title: "From a customer's question to a resolved ticket",
    intro: "Every request is tied to the customer, assigned to the right person and tracked until it's closed.",
    steps: [
      {
        icon: Contact,
        title: "Customer",
        body: "Each request is linked to the customer's record, so agents see their history before they reply.",
      },
      {
        icon: Ticket,
        title: "Ticket",
        body: "Email, chat, calls and web forms land in one queue as tickets with a priority and an SLA.",
      },
      {
        icon: Headset,
        title: "Support",
        body: "Route to the right agent or team, collaborate with internal notes and watch the SLA clock.",
      },
      {
        icon: CircleCheckBig,
        title: "Resolution",
        body: "Close with a clear resolution, collect satisfaction feedback and feed the knowledge base.",
      },
    ],
  },

  explorer: {
    eyebrow: "Ticket queue",
    title: "See what needs an answer right now",
    intro: "Pick a status to see the tickets in it, with the SLA time left on each one.",
    label: "Ticket statuses",
    metricLabel: "Avg. age",
    itemLabel: "tickets",
    tabs: [
      {
        key: "open",
        label: "Open",
        summary: "New tickets waiting for a first reply.",
        total: "1h 10m",
        tone: "bg-red-500",
        items: [
          { title: "Invoice not received", meta: "Acme Corp · Priya S.", value: "42m left", note: "High priority, SLA at risk" },
          { title: "Cannot log in on mobile", meta: "Greenfield Realty · Unassigned", value: "3h left", note: "Auto-routed to Tier 1" },
          { title: "Wrong item delivered", meta: "Helix Motors · Karan R.", value: "4h left", note: "Customer attached photos" },
        ],
      },
      {
        key: "progress",
        label: "In progress",
        summary: "An agent is working on it.",
        total: "3h 20m",
        tone: "bg-brand-purple",
        items: [
          { title: "Unable to reset password", meta: "Bluepeak Foods · Rohit K.", value: "2h 15m left", note: "Reset link resent" },
          { title: "Report export is slow", meta: "Orbit Retail · Aisha S.", value: "5h left", note: "Escalated to engineering" },
          { title: "Add a user to the account", meta: "Lotus Clinics · Priya S.", value: "6h left", note: "Waiting on approval" },
        ],
      },
      {
        key: "waiting",
        label: "Waiting on customer",
        summary: "Paused until the customer replies.",
        total: "1d 4h",
        tone: "bg-amber-500",
        items: [
          { title: "Bulk export request", meta: "Orbit Retail · Aisha S.", value: "SLA paused", note: "Asked for the date range" },
          { title: "Change billing contact", meta: "Summit Constructions · Karan R.", value: "SLA paused", note: "Needs written confirmation" },
          { title: "Integration setup help", meta: "Vertex Labs · Rohit K.", value: "SLA paused", note: "Reminder sent today" },
        ],
      },
      {
        key: "resolved",
        label: "Resolved",
        summary: "Closed, with customer feedback.",
        total: "4.8 CSAT",
        tone: "bg-emerald-500",
        items: [
          { title: "Duplicate charge refunded", meta: "Harbor Exports · Priya S.", value: "5 of 5", note: "Resolved in 2h 5m" },
          { title: "Wrong tax rate on invoice", meta: "Meridian Steel · Karan R.", value: "5 of 5", note: "Credit note issued" },
          { title: "Update company logo", meta: "Pioneer Edu · Aisha S.", value: "4 of 5", note: "Resolved in 40m" },
        ],
      },
    ],
  },

  capabilities: {
    eyebrow: "A service desk that keeps up",
    title: "Everything your support team needs, in one place",
    intro: "Agents answer faster, managers see the whole queue, and customers stop repeating themselves.",
    items: [
      {
        icon: Ticket,
        title: "Ticket Management",
        body: "Prioritise, assign, merge and track every ticket from the first message to the final resolution.",
      },
      {
        icon: MessagesSquare,
        title: "Omnichannel Support",
        body: "Handle email, chat, phone and web-form requests in one inbox, with one conversation per customer.",
      },
      {
        icon: Timer,
        title: "SLA Tracking",
        body: "Set response and resolution targets by priority, and get warned before a ticket breaches.",
      },
      {
        icon: BookOpen,
        title: "Knowledge Base",
        body: "Publish help articles for customers and agents, and turn good resolutions into new ones.",
      },
      {
        icon: Smile,
        title: "Customer Satisfaction",
        body: "Collect a rating after every resolution and watch satisfaction by agent, team and topic.",
      },
      {
        icon: Route,
        title: "AI Ticket Routing",
        body: "Tickets are categorised and sent to the right team automatically, based on what they say.",
      },
    ],
  },

  ai: {
    eyebrow: "AI for support",
    title: "Answer faster, without losing the human touch",
    description:
      "SortBoxs AI takes the repetitive work out of the queue so agents can spend their time on the customers who need them.",
    points: [
      "Reads each new ticket and routes it to the right team",
      "Suggests replies and help articles from past resolutions",
      "Summarises long threads before an agent picks them up",
      "Flags frustrated customers and likely escalations early",
    ],
    cards: [
      {
        icon: Route,
        tone: "bg-brand-purple-light text-brand-purple",
        title: "Auto-routed",
        body: "“Invoice not received” was categorised as Billing and assigned to Priya.",
      },
      {
        icon: MessageSquareText,
        tone: "bg-sky-100 text-sky-700",
        title: "Suggested reply",
        body: "A similar ticket was solved with the “Resend an invoice” article. Insert it?",
      },
      {
        icon: Siren,
        tone: "bg-red-100 text-red-700",
        title: "Likely escalation",
        body: "Helix Motors has written three times in a day, and their tone is getting sharper. Prioritise it.",
      },
    ],
  },

  connected: {
    eyebrow: "Part of one platform",
    title: "Support that sees the whole customer",
    intro: "Agents answer with the full picture, and what they learn flows back to the rest of the business.",
    slugs: ["crm", "sales", "finance", "analytics", "automation"],
    links: {
      crm: "Every ticket sits on the customer's timeline",
      sales: "Reps see open issues before a renewal call",
      finance: "Billing questions come with the invoice attached",
      analytics: "Volume, SLA and satisfaction reporting",
      automation: "Auto-assign, remind and escalate by rule",
    },
  },
};
