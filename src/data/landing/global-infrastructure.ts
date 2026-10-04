import { Gauge, Globe, Landmark, MapPin, Copy, RefreshCw, Route, Server, ShieldCheck } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /global-infrastructure. Layout lives in components/module-landing/. Figures are illustrative. */

export const globalInfrastructureLanding: ModuleLandingData = {
  slug: "global-infrastructure",
  name: "Global Infrastructure",
  icon: Globe,
  iconTone: "bg-purple-100 text-purple-700",
  hero: {
    eyebrow: "SortBoxs Global Infrastructure",
    title: "Close to your people,",
    highlight: "wherever they are.",
    description:
      "Regions across the US, Europe and Asia keep SortBoxs fast for every team and let you store data in the country that your rules require.",
    points: ["Regions in the US, Europe and Asia", "Data stays in the region you choose", "Traffic routed to the nearest location"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From your users to the nearest data centre",
    intro: "Where your data lives and where people connect from are two separate decisions, and you control both.",
    steps: [
      { icon: MapPin, title: "Choose a region", body: "Pick the home region for your workspace, based on where your users are and where your data may live." },
      { icon: Copy, title: "Replicate", body: "Data is copied across zones within the region, and optionally to a second region for protection." },
      { icon: Route, title: "Route", body: "Every request is routed to the closest healthy location, so people get a fast response." },
      { icon: ShieldCheck, title: "Comply", body: "Residency rules are enforced by the platform, so data doesn't leave the region by accident." },
    ],
  },
  explorer: {
    eyebrow: "Regions",
    title: "Where SortBoxs runs",
    intro: "Pick a part of the world to see the regions available there and what they're used for.",
    label: "World regions",
    metricLabel: "Regions",
    itemLabel: "regions",
    tabs: [
      {
        key: "americas",
        label: "Americas",
        summary: "North America.",
        total: "2",
        tone: "bg-sky-500",
        items: [
          { title: "US East", meta: "Virginia", value: "Live", note: "Default for North and South America" },
          { title: "US West", meta: "Oregon", value: "Live", note: "Low latency for the west coast" },
          { title: "Disaster recovery", meta: "Paired regions", value: "Optional", note: "East and West protect each other" },
        ],
      },
      {
        key: "europe",
        label: "Europe",
        summary: "European Union and UK.",
        total: "1",
        tone: "bg-emerald-500",
        items: [
          { title: "EU Frankfurt", meta: "Germany", value: "Live", note: "Data stays in the EU" },
          { title: "Data protection", meta: "GDPR-ready controls", value: "Built in", note: "Export, erasure and consent tools" },
          { title: "Latency", meta: "From major EU cities", value: "Low", note: "Under 40 ms in most cases" },
        ],
      },
      {
        key: "asia",
        label: "Asia Pacific",
        summary: "India and South-East Asia.",
        total: "2",
        tone: "bg-amber-500",
        items: [
          { title: "India Mumbai", meta: "India", value: "Live", note: "In-country storage for Indian data" },
          { title: "Singapore", meta: "South-East Asia", value: "Live", note: "Serves Singapore, Malaysia and nearby" },
          { title: "Local support", meta: "Business-hours coverage", value: "Yes", note: "Teams in your time zone" },
        ],
      },
      {
        key: "residency",
        label: "Residency",
        summary: "Keeping data where it belongs.",
        total: "Enforced",
        tone: "bg-brand-purple",
        items: [
          { title: "Pinned storage", meta: "Per workspace", value: "On", note: "Data stays in the home region" },
          { title: "Backups", meta: "Same region by default", value: "Local", note: "Cross-region only if you allow it" },
          { title: "Access logs", meta: "Region-aware", value: "Kept", note: "See where data was accessed from" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Infrastructure that spans the globe",
    title: "Fast everywhere, compliant everywhere",
    intro: "A global team shouldn't have to choose between speed and following the rules.",
    items: [
      { icon: Server, title: "Regional Data Centres", body: "Production regions across the US, Europe and Asia, each with multiple independent zones." },
      { icon: MapPin, title: "Data Residency", body: "Choose where your data is stored, and keep it there, including backups." },
      { icon: Route, title: "Smart Global Routing", body: "Requests go to the nearest healthy region, using a global network edge." },
      { icon: Gauge, title: "Low Latency", body: "Short network paths mean pages and searches that feel instant for local teams." },
      { icon: RefreshCw, title: "Regional Failover", body: "Optionally pair two regions, so a regional outage doesn't take you offline." },
      { icon: Landmark, title: "Local Compliance", body: "Controls designed around regional rules, like EU data protection and in-country storage." },
    ],
  },
  ai: {
    eyebrow: "Residency and sovereignty",
    title: "Know exactly where your data is",
    description: "Regulators and customers ask where data lives. With SortBoxs you can answer, and prove it.",
    points: [
      "Home region set per workspace, and locked once chosen",
      "Backups and replicas stay inside the region by default",
      "Reports showing where data is stored and processed",
      "Controls for subprocessors and support access",
    ],
    cards: [
      { icon: MapPin, tone: "bg-sky-100 text-sky-700", title: "Pinned to India", body: "All 2.4M records, files and backups for this workspace are stored in Mumbai." },
      { icon: Route, tone: "bg-emerald-100 text-emerald-700", title: "Nearest region", body: "Your Singapore team connects to Singapore in 28 ms, and reads data from your Mumbai home." },
      { icon: ShieldCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Residency report", body: "Last audit: no data left its home region in the past 12 months." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "A global footprint for every module",
    intro: "Residency and routing apply across the whole platform, so every team gets the same protection.",
    slugs: ["crm", "hrms", "finance", "service", "ai"],
    links: {
      crm: "Customer data in the region you choose",
      hrms: "Employee data kept in-country",
      finance: "Financial records under local rules",
      service: "Fast support desk for every region",
      ai: "AI that processes data in its home region",
    },
  },
};
