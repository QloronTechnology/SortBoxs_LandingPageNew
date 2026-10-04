import { Database, FileSearch, Filter, ListFilter, Lock, Search, SearchCode, ShieldCheck, Sparkles, TextSearch, Quote, Layers } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /ai-search. Layout lives in components/module-landing/. Figures are illustrative. */

export const aiSearchLanding: ModuleLandingData = {
  slug: "ai-search",
  name: "AI Search",
  icon: SearchCode,
  iconTone: "bg-purple-100 text-purple-700",
  hero: {
    eyebrow: "SortBoxs AI Search",
    title: "Find anything across your business,",
    highlight: "instantly.",
    description:
      "One search across customers, deals, tickets, documents, emails and people, with a short answer on top and the sources underneath.",
    points: ["Search every module at once", "Get an answer, not just a list of links", "Only shows what you're allowed to see"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a few words to the right answer",
    intro: "Search understands what you mean, not just the words you typed.",
    steps: [
      { icon: Database, title: "Index", body: "Records, files, emails and notes from every module are indexed securely and kept up to date." },
      { icon: Search, title: "Search", body: "Type a few words or a full question. Search matches on meaning, names and exact phrases." },
      { icon: Sparkles, title: "Answer", body: "A short, sourced answer appears at the top, written from the best matching records." },
      { icon: Filter, title: "Refine", body: "Filter by source, person or date, and jump straight to the record you need." },
    ],
  },
  explorer: {
    eyebrow: "What you can find",
    title: "Everything your team knows, in one place",
    intro: "Pick a source to see the kinds of things people search for.",
    label: "Sources",
    metricLabel: "Indexed",
    itemLabel: "examples",
    tabs: [
      {
        key: "customers",
        label: "Customers",
        summary: "Accounts, contacts and deals.",
        total: "18,240",
        tone: "bg-brand-purple",
        items: [
          { title: "Aurora Textiles", meta: "Account", value: "3 deals", note: "Last contacted 2 days ago" },
          { title: "Priya at Zenith Pharma", meta: "Contact", value: "12 emails", note: "Decision maker for the renewal" },
          { title: "Renewals in March", meta: "Saved search", value: "27", note: "Worth ₹41L in total" },
        ],
      },
      {
        key: "documents",
        label: "Documents",
        summary: "Files, contracts and policies.",
        total: "9,860",
        tone: "bg-sky-500",
        items: [
          { title: "Master services agreement", meta: "Contract", value: "Acme", note: "Renews on 1 September" },
          { title: "Leave policy 2026", meta: "Policy", value: "HR", note: "Updated last quarter" },
          { title: "Pricing proposal v3", meta: "Proposal", value: "Sales", note: "Sent to Helix Motors" },
        ],
      },
      {
        key: "conversations",
        label: "Conversations",
        summary: "Emails, tickets and call notes.",
        total: "64,300",
        tone: "bg-emerald-500",
        items: [
          { title: "“When does the discount end?”", meta: "Email", value: "Orbit Retail", note: "Answered by Rohan on Tuesday" },
          { title: "Invoice not received", meta: "Ticket #2041", value: "Acme Corp", note: "Resolved in 2 hours" },
          { title: "Pricing discussion", meta: "Call note", value: "Zenith", note: "Wants a 2-year plan" },
        ],
      },
      {
        key: "people",
        label: "People",
        summary: "Employees, teams and skills.",
        total: "248",
        tone: "bg-rose-500",
        items: [
          { title: "Who knows Kubernetes?", meta: "Skills", value: "6 people", note: "Across 2 teams" },
          { title: "Anita Rao", meta: "Sales Manager", value: "West", note: "Reports to the VP of Sales" },
          { title: "Engineering team", meta: "Team", value: "62", note: "4 working remotely today" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Search that understands",
    title: "Stop hunting through tabs and folders",
    intro: "Everything your business knows is a few words away, and nothing is shown to the wrong person.",
    items: [
      { icon: Layers, title: "Search Across Modules", body: "One box for customers, deals, tickets, documents, emails and people." },
      { icon: TextSearch, title: "Meaning, Not Just Keywords", body: "Find what you mean, even if you don't remember the exact words or spelling." },
      { icon: Quote, title: "Answers With Sources", body: "Get a short answer on top, with the records it came from linked below." },
      { icon: ListFilter, title: "Filters & Saved Searches", body: "Narrow by source, owner, date or status, and save the searches you repeat." },
      { icon: FileSearch, title: "Inside Your Files", body: "Look inside PDFs, scans and attachments, not just their names." },
      { icon: Lock, title: "Permission-Aware Results", body: "Results respect each person's access, so private records stay private." },
    ],
  },
  ai: {
    eyebrow: "Secure by design",
    title: "Finds everything you're allowed to see",
    description: "Search is only useful if people trust it. Results follow the same permissions as the rest of SortBoxs.",
    points: [
      "Respects each person's access to every record",
      "Shows the sources behind every answer",
      "Keeps the index up to date as records change",
      "Records who searched for what, if you turn that on",
    ],
    cards: [
      { icon: Quote, tone: "bg-brand-purple-light text-brand-purple", title: "Sourced answers", body: "“The Acme contract renews on 1 September.” Source: Master services agreement, page 4." },
      { icon: Lock, tone: "bg-emerald-100 text-emerald-700", title: "Access respected", body: "3 results were hidden because they're in records you don't have access to." },
      { icon: ShieldCheck, tone: "bg-sky-100 text-sky-700", title: "Always current", body: "The index refreshed 40 seconds ago, so new tickets and notes are already searchable." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "One search for every module",
    intro: "Search is built into the platform, so anything you add is findable straight away.",
    slugs: ["crm", "service", "hrms", "finance", "sales"],
    links: {
      crm: "Customers, contacts and notes",
      service: "Tickets, threads and articles",
      hrms: "People, policies and skills",
      finance: "Invoices, bills and receipts",
      sales: "Deals, proposals and emails",
    },
  },
};
