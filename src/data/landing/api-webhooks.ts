import { BookOpen, CodeXml, FlaskConical, Gauge, Inbox, KeyRound, Send, Webhook, Workflow } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /api-webhooks. Layout lives in components/module-landing/. Figures are illustrative. */

export const apiWebhooksLanding: ModuleLandingData = {
  slug: "api-webhooks",
  name: "API & Webhooks",
  icon: Webhook,
  iconTone: "bg-teal-100 text-teal-700",
  hero: {
    eyebrow: "SortBoxs Developer Platform",
    title: "Connect SortBoxs to",
    highlight: "everything else.",
    description:
      "A clean REST API and real-time webhooks let you read and write your SortBoxs data and react to events the moment they happen.",
    points: ["REST API for every module", "Webhooks for real-time events", "A sandbox to build and test safely"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From an API key to a working integration",
    intro: "The same four steps work for every module and every language.",
    steps: [
      { icon: KeyRound, title: "Authenticate", body: "Create an API key or use OAuth, scoped to exactly the data your integration needs." },
      { icon: Send, title: "Request", body: "Call predictable REST endpoints to read, create and update records, with clear errors." },
      { icon: Inbox, title: "Receive", body: "Subscribe to webhooks and get signed events pushed to your server as things happen." },
      { icon: Workflow, title: "Automate", body: "Connect the results to your own systems, or to a workflow in SortBoxs itself." },
    ],
  },
  explorer: {
    eyebrow: "API reference",
    title: "A resource for everything your teams do",
    intro: "Pick an area to see example endpoints and the events you can subscribe to.",
    label: "API areas",
    metricLabel: "Endpoints",
    itemLabel: "endpoints",
    tabs: [
      {
        key: "customers",
        label: "Customers",
        summary: "Accounts, contacts and notes.",
        total: "24",
        tone: "bg-brand-purple",
        items: [
          { title: "GET /v1/customers", meta: "List and filter", value: "200", note: "Pagination and search built in" },
          { title: "POST /v1/customers", meta: "Create", value: "201", note: "Validates and de-duplicates" },
          { title: "customer.updated", meta: "Webhook", value: "Event", note: "Fires on any change to a customer" },
        ],
      },
      {
        key: "deals",
        label: "Deals",
        summary: "Pipelines, stages and quotes.",
        total: "31",
        tone: "bg-emerald-500",
        items: [
          { title: "GET /v1/deals", meta: "List and filter", value: "200", note: "Filter by stage, owner or value" },
          { title: "PATCH /v1/deals/{id}", meta: "Move or update", value: "200", note: "Stage changes trigger automations" },
          { title: "deal.won", meta: "Webhook", value: "Event", note: "Fires when a deal is closed" },
        ],
      },
      {
        key: "finance",
        label: "Finance",
        summary: "Invoices, payments and expenses.",
        total: "28",
        tone: "bg-sky-500",
        items: [
          { title: "GET /v1/invoices", meta: "List and filter", value: "200", note: "Filter by status or due date" },
          { title: "POST /v1/payments", meta: "Record a payment", value: "201", note: "Matches to open invoices" },
          { title: "invoice.paid", meta: "Webhook", value: "Event", note: "Fires when an invoice is settled" },
        ],
      },
      {
        key: "support",
        label: "Support",
        summary: "Tickets, conversations and articles.",
        total: "19",
        tone: "bg-amber-500",
        items: [
          { title: "GET /v1/tickets", meta: "List and filter", value: "200", note: "Filter by priority or SLA" },
          { title: "POST /v1/tickets", meta: "Create", value: "201", note: "From forms, email or your own app" },
          { title: "ticket.created", meta: "Webhook", value: "Event", note: "Fires for every new ticket" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "A platform for builders",
    title: "Everything you need to integrate",
    intro: "Consistent, well-documented and safe by default, so integrations are quick to build and easy to trust.",
    items: [
      { icon: CodeXml, title: "REST API", body: "Consistent JSON endpoints for every module, with filtering, pagination and clear error messages." },
      { icon: Webhook, title: "Webhooks", body: "Real-time events sent to your server, signed so you can verify they really came from SortBoxs." },
      { icon: KeyRound, title: "API Keys & OAuth", body: "Scoped keys and OAuth for apps, with every credential revocable and logged." },
      { icon: Gauge, title: "Rate Limits & Quotas", body: "Fair, documented limits that protect the platform, with headers that show how much is left." },
      { icon: FlaskConical, title: "Sandbox", body: "A safe copy of the platform with sample data, so you can build without touching production." },
      { icon: BookOpen, title: "Docs & SDKs", body: "Interactive documentation, code samples and client libraries for popular languages." },
    ],
  },
  ai: {
    eyebrow: "Secure by default",
    title: "Integrations you can trust",
    description: "Every call is authenticated, authorised and logged, and every webhook is signed and retried, so nothing is lost or forged.",
    points: [
      "Scopes limit each key to the data it needs",
      "Signed webhooks, so you can verify the sender",
      "Automatic retries with backoff for failed deliveries",
      "A full log of calls and deliveries to debug with",
    ],
    cards: [
      { icon: KeyRound, tone: "bg-teal-100 text-teal-700", title: "Scoped access", body: "This key can read deals and customers but can't touch finance or settings." },
      { icon: Webhook, tone: "bg-emerald-100 text-emerald-700", title: "Signed delivery", body: "Each event carries a signature header. Verify it before you trust the payload." },
      { icon: Inbox, tone: "bg-sky-100 text-sky-700", title: "Retries", body: "Your server was down for 4 minutes. 12 events were retried and delivered in order." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "An API for every module",
    intro: "One API, one set of keys and one style across the whole platform.",
    slugs: ["crm", "sales", "finance", "service", "automation"],
    links: {
      crm: "Sync customers with your other systems",
      sales: "Push won deals into billing or ERP",
      finance: "Pull invoices and payments into reports",
      service: "Create tickets from your own apps",
      automation: "Trigger workflows from outside events",
    },
  },
};
