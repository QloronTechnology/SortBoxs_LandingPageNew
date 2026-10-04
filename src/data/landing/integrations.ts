import { CodeXml, GitMerge, KeyRound, Plug, RefreshCw, Search, ShieldCheck, Zap, History, Unplug } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /integrations (Platform → Integrations). Layout lives in components/module-landing/. Figures are illustrative. */

export const integrationsLanding: ModuleLandingData = {
  slug: "integrations",
  name: "Integrations",
  icon: Plug,
  iconTone: "bg-teal-100 text-teal-700",
  hero: {
    eyebrow: "SortBoxs Integrations",
    title: "Connect the tools your team",
    highlight: "already uses.",
    description:
      "SortBoxs integrates with the productivity, communication and commerce tools your business relies on every day.",
    points: ["Connect in a few clicks", "Two-way sync, not one-off imports", "An open API for everything else"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a tool you use to data that flows",
    intro: "Connecting an app takes minutes, and you stay in control of exactly what's shared.",
    steps: [
      { icon: Search, title: "Choose", body: "Pick the app from the catalogue, or use the API for anything that isn't listed." },
      { icon: KeyRound, title: "Authorise", body: "Sign in to the other app and choose which data SortBoxs may read and write." },
      { icon: GitMerge, title: "Map", body: "Match fields between the two apps. Sensible defaults are filled in for you." },
      { icon: RefreshCw, title: "Sync", body: "Changes flow both ways automatically, with a log of everything that moved." },
    ],
  },
  explorer: {
    eyebrow: "What connects",
    title: "The tools your teams already live in",
    intro: "Pick a category to see what each integration does.",
    label: "Integration categories",
    metricLabel: "Available",
    itemLabel: "integrations",
    tabs: [
      {
        key: "productivity",
        label: "Productivity",
        summary: "Email, files and calendars.",
        total: "3",
        tone: "bg-sky-500",
        items: [
          { title: "Google Workspace", meta: "Gmail, Drive, Contacts", value: "Two-way", note: "Emails and files on the customer timeline" },
          { title: "Microsoft 365", meta: "Outlook, OneDrive, Excel", value: "Two-way", note: "Mail, files and sign-in" },
          { title: "Google Calendar", meta: "Meetings and availability", value: "Two-way", note: "Book demos and follow-ups from SortBoxs" },
        ],
      },
      {
        key: "communication",
        label: "Communication",
        summary: "Chat, calls and messages.",
        total: "4",
        tone: "bg-emerald-500",
        items: [
          { title: "Slack", meta: "Channels and alerts", value: "Two-way", note: "Deal and ticket alerts in your channels" },
          { title: "Microsoft Teams", meta: "Chat and meetings", value: "Two-way", note: "Notifications and approvals in Teams" },
          { title: "Zoom and WhatsApp", meta: "Calls and messages", value: "Two-way", note: "Calls and chats logged to the customer" },
        ],
      },
      {
        key: "commerce",
        label: "Commerce",
        summary: "Stores and orders.",
        total: "2",
        tone: "bg-amber-500",
        items: [
          { title: "Shopify", meta: "Products, orders, customers", value: "Two-way", note: "Orders become invoices and stock updates" },
          { title: "WooCommerce", meta: "Products, orders, customers", value: "Two-way", note: "Keep your store and your books in step" },
          { title: "Payments", meta: "Collect and reconcile", value: "Available", note: "Payment links and automatic matching" },
        ],
      },
      {
        key: "cloud",
        label: "Cloud & API",
        summary: "Infrastructure and custom builds.",
        total: "3",
        tone: "bg-brand-purple",
        items: [
          { title: "AWS", meta: "Storage and compute", value: "Supported", note: "Run SortBoxs or back it up on AWS" },
          { title: "REST API", meta: "Every module", value: "Open", note: "Read and write any record" },
          { title: "Webhooks", meta: "Real-time events", value: "Open", note: "Get signed events as things happen" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Integrations that do real work",
    title: "More than a logo on a page",
    intro: "A good integration saves someone from re-typing, switching tabs or asking where something went.",
    items: [
      { icon: Plug, title: "One-Click Connections", body: "Authorise an app in a few clicks, with no developer and no spreadsheets of keys." },
      { icon: RefreshCw, title: "Two-Way Sync", body: "A change on either side shows up on the other, so you never wonder which is current." },
      { icon: GitMerge, title: "Field Mapping", body: "Match your fields to ours, with smart defaults, and handle custom fields too." },
      { icon: Zap, title: "Event Triggers", body: "Start a workflow when something happens in a connected app, like a new order or a booked meeting." },
      { icon: KeyRound, title: "Secure Authorisation", body: "OAuth and scoped permissions, so SortBoxs only sees what you choose to share." },
      { icon: CodeXml, title: "Open API", body: "Anything not on the list can be connected with the REST API and webhooks." },
    ],
  },
  ai: {
    eyebrow: "Trusted connections",
    title: "In control of what's shared, always",
    description: "A connection is a door between two systems. You decide how wide it opens, and you can close it whenever you like.",
    points: [
      "Choose exactly which data each integration may access",
      "Revoke any connection instantly",
      "A log of every record that moved, and when",
      "Failed syncs are flagged and retried, not silently lost",
    ],
    cards: [
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Scoped access", body: "The Slack connection can post alerts, but it can't read your private messages." },
      { icon: History, tone: "bg-sky-100 text-sky-700", title: "Sync history", body: "412 records synced from Shopify today. Two were skipped, and here's why." },
      { icon: Unplug, tone: "bg-brand-purple-light text-brand-purple", title: "Disconnect any time", body: "Disconnecting stops the sync at once, and you choose whether to keep or remove the data." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Integrations for every module",
    intro: "Each integration plugs into the modules that need it, so data lands where it belongs.",
    slugs: ["crm", "sales", "service", "commerce", "finance"],
    links: {
      crm: "Emails, calendars and calls on every customer",
      sales: "Meetings booked and logged automatically",
      service: "Chat and WhatsApp conversations as tickets",
      commerce: "Shopify and WooCommerce orders in one place",
      finance: "Payments matched to invoices automatically",
    },
  },
};
