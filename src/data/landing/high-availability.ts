import { Activity, Copy, HeartPulse, Layers, Radar, RadioTower, RefreshCw, Rocket, Scale, ScrollText, Wrench } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /high-availability. Layout lives in components/module-landing/. Figures are illustrative. */

export const highAvailabilityLanding: ModuleLandingData = {
  slug: "high-availability",
  name: "High Availability",
  icon: Activity,
  iconTone: "bg-blue-100 text-blue-700",
  hero: {
    eyebrow: "SortBoxs High Availability",
    title: "Always on, because your",
    highlight: "business never stops.",
    description:
      "Redundant systems across zones, automatic failover and a 99.9% uptime SLA keep SortBoxs available when your team needs it most.",
    points: ["99.9% uptime SLA", "Automatic failover, no manual steps", "Updates without taking you offline"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a failure to business as usual",
    intro: "Every layer is duplicated, so one broken part never means a broken service.",
    steps: [
      { icon: Copy, title: "Replicate", body: "Applications and data run in several independent zones at once, with copies always in step." },
      { icon: Radar, title: "Detect", body: "Health checks spot a failing server or zone within seconds, before most users notice." },
      { icon: RefreshCw, title: "Fail over", body: "Traffic moves automatically to healthy capacity, with no one needing to press a button." },
      { icon: Wrench, title: "Recover", body: "The failed part is replaced or repaired in the background, and rejoins when it's healthy." },
    ],
  },
  explorer: {
    eyebrow: "Reliability in practice",
    title: "What keeps SortBoxs available",
    intro: "Pick a layer to see how it's protected against failure.",
    label: "Reliability layers",
    metricLabel: "Target",
    itemLabel: "protections",
    tabs: [
      {
        key: "redundancy",
        label: "Redundancy",
        summary: "No single point of failure.",
        total: "3 zones",
        tone: "bg-blue-500",
        items: [
          { title: "Application servers", meta: "Across 3 zones", value: "N+2", note: "Spare capacity always running" },
          { title: "Databases", meta: "Primary plus replicas", value: "Synced", note: "Replicas in separate zones" },
          { title: "Storage", meta: "Replicated files", value: "3 copies", note: "Kept in different locations" },
        ],
      },
      {
        key: "failover",
        label: "Failover",
        summary: "Recovering without human help.",
        total: "< 30 s",
        tone: "bg-emerald-500",
        items: [
          { title: "Server failure", meta: "Automatic", value: "Seconds", note: "Load balancer removes it at once" },
          { title: "Zone outage", meta: "Automatic", value: "< 30 s", note: "Traffic moves to the other zones" },
          { title: "Database primary", meta: "Automatic", value: "< 60 s", note: "A replica is promoted" },
        ],
      },
      {
        key: "maintenance",
        label: "Maintenance",
        summary: "Changes without downtime.",
        total: "Zero",
        tone: "bg-amber-500",
        items: [
          { title: "Rolling updates", meta: "One node at a time", value: "No downtime", note: "Users stay connected throughout" },
          { title: "Schema changes", meta: "Backward compatible", value: "Safe", note: "Old and new code run together" },
          { title: "Patching", meta: "Scheduled", value: "Rolling", note: "Capacity is never reduced below target" },
        ],
      },
      {
        key: "incidents",
        label: "Incidents",
        summary: "When something still goes wrong.",
        total: "Transparent",
        tone: "bg-rose-500",
        items: [
          { title: "Status page", meta: "Public", value: "Live", note: "Real-time status for every service" },
          { title: "Updates", meta: "During incidents", value: "Regular", note: "Clear messages, not silence" },
          { title: "Post-incident review", meta: "After every major incident", value: "Shared", note: "What happened and what we changed" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Designed to keep running",
    title: "Reliability built into every layer",
    intro: "High availability isn't a feature you switch on. It's how the platform is built.",
    items: [
      { icon: Layers, title: "Multi-Zone Redundancy", body: "Every important component runs in more than one independent zone." },
      { icon: RefreshCw, title: "Automatic Failover", body: "Failures are detected and handled in seconds, without waiting for an engineer." },
      { icon: Scale, title: "Load Balancing", body: "Traffic is spread across healthy servers and steered away from unhealthy ones." },
      { icon: Rocket, title: "Zero-Downtime Updates", body: "New versions roll out gradually, so you never see a maintenance window." },
      { icon: HeartPulse, title: "Continuous Health Checks", body: "Every service is probed constantly, so problems are caught early." },
      { icon: RadioTower, title: "Status Transparency", body: "A public status page and clear incident updates, so you always know what's happening." },
    ],
  },
  ai: {
    eyebrow: "Measured, not promised",
    title: "Uptime you can verify",
    description: "A number on a web page isn't enough. We publish our availability so you can hold us to it.",
    points: [
      "A 99.9% uptime SLA written into your agreement",
      "Monthly availability history you can review",
      "Reports after every significant incident",
      "Regular failure drills to prove the design works",
    ],
    cards: [
      { icon: Activity, tone: "bg-emerald-100 text-emerald-700", title: "Availability history", body: "Last 90 days: 99.98% available, with no unplanned downtime longer than 3 minutes." },
      { icon: ScrollText, tone: "bg-sky-100 text-sky-700", title: "Incident report", body: "A database failover on 14 March took 41 seconds. Here's what was learned and what changed." },
      { icon: HeartPulse, tone: "bg-brand-purple-light text-brand-purple", title: "Drills", body: "The quarterly zone-failure drill passed. Traffic moved with no errors visible to users." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module protected the same way",
    intro: "The same redundancy and failover covers all modules, so no team is a weak link.",
    slugs: ["crm", "service", "finance", "hrms", "commerce"],
    links: {
      crm: "Customer records available around the clock",
      service: "Support desk online when customers need it",
      finance: "Billing and payments that keep running",
      hrms: "Attendance and payroll without interruption",
      commerce: "Orders accepted at any hour",
    },
  },
};
