import { Activity, BellRing, Gauge, GitBranch, LayoutDashboard, Radar, RadioTower, ScrollText, Wrench } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /performance-monitoring. Layout lives in components/module-landing/. Figures are illustrative. */

export const performanceMonitoringLanding: ModuleLandingData = {
  slug: "performance-monitoring",
  name: "Performance Monitoring",
  icon: Gauge,
  iconTone: "bg-purple-100 text-purple-700",
  hero: {
    eyebrow: "SortBoxs Performance Monitoring",
    title: "See problems before",
    highlight: "your users do.",
    description:
      "Real-time health for every service: speed, errors and capacity, with smart alerts that tell the right person at the right time.",
    points: ["Live metrics across every service", "Alerts that cut through the noise", "Traces and logs one click away"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a metric to a fix",
    intro: "Monitoring is only useful if it leads to action, so every step points at the next one.",
    steps: [
      { icon: Radar, title: "Collect", body: "Metrics, logs and traces are gathered from every service, with no agents for you to install." },
      { icon: Gauge, title: "Baseline", body: "Normal behaviour is learned for each service, including daily and weekly patterns." },
      { icon: BellRing, title: "Alert", body: "When something drifts, the right person is notified with the context to understand it." },
      { icon: Wrench, title: "Resolve", body: "Follow a trace from the symptom to the cause, fix it and confirm the metric recovers." },
    ],
  },
  explorer: {
    eyebrow: "What gets measured",
    title: "The signals that matter",
    intro: "Pick a signal to see how it's tracked and when it triggers an alert.",
    label: "Signals",
    metricLabel: "Healthy range",
    itemLabel: "signals",
    tabs: [
      {
        key: "latency",
        label: "Latency",
        summary: "How fast things respond.",
        total: "< 300 ms",
        tone: "bg-sky-500",
        items: [
          { title: "Page load", meta: "95th percentile", value: "240 ms", note: "Alert above 500 ms for 5 minutes" },
          { title: "API calls", meta: "95th percentile", value: "120 ms", note: "Alert above 300 ms for 5 minutes" },
          { title: "Search", meta: "95th percentile", value: "180 ms", note: "Alert above 400 ms" },
        ],
      },
      {
        key: "errors",
        label: "Errors",
        summary: "How often things fail.",
        total: "< 0.5%",
        tone: "bg-red-500",
        items: [
          { title: "Server errors", meta: "Share of requests", value: "0.08%", note: "Alert above 1%" },
          { title: "Failed jobs", meta: "Background work", value: "0.2%", note: "Retried automatically first" },
          { title: "Integration errors", meta: "Webhooks and APIs", value: "0.4%", note: "Alert on a sudden rise" },
        ],
      },
      {
        key: "traffic",
        label: "Throughput",
        summary: "How much work is flowing.",
        total: "Normal",
        tone: "bg-emerald-500",
        items: [
          { title: "Requests", meta: "Per second", value: "1,240", note: "Compared with the same hour last week" },
          { title: "Active sessions", meta: "Right now", value: "3,810", note: "Within the expected range" },
          { title: "Background queue", meta: "Jobs waiting", value: "14", note: "Alert above 500" },
        ],
      },
      {
        key: "resources",
        label: "Resources",
        summary: "How much capacity is in use.",
        total: "< 70%",
        tone: "bg-amber-500",
        items: [
          { title: "CPU", meta: "Across the fleet", value: "46%", note: "Scale out above 70%" },
          { title: "Memory", meta: "Across the fleet", value: "58%", note: "Alert above 85%" },
          { title: "Database connections", meta: "Pool usage", value: "37%", note: "Alert above 80%" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Observability built in",
    title: "Know how the platform is doing, all the time",
    intro: "The same tooling our engineers use to run SortBoxs, with a view designed for your admins.",
    items: [
      { icon: Activity, title: "Real-Time Metrics", body: "Live charts for speed, errors, traffic and capacity, refreshed every few seconds." },
      { icon: BellRing, title: "Smart Alerts", body: "Alerts based on learned baselines, grouped to avoid floods, and routed to the right team." },
      { icon: GitBranch, title: "Distributed Tracing", body: "Follow a single request across every service to see exactly where the time went." },
      { icon: ScrollText, title: "Centralised Logs", body: "Search logs from every service in one place, linked to the traces and metrics around them." },
      { icon: LayoutDashboard, title: "Custom Dashboards", body: "Build views for your own admins, with the signals you care about." },
      { icon: RadioTower, title: "Status Page", body: "A public page and an in-app banner that show current health and recent incidents." },
    ],
  },
  ai: {
    eyebrow: "Less noise, faster answers",
    title: "Alerts you'll actually act on",
    description: "Too many alerts get ignored. Monitoring learns what's normal, so it only speaks up when something really changed.",
    points: [
      "Learns daily and weekly patterns for every metric",
      "Groups related alerts into a single incident",
      "Suggests the likely cause from recent changes",
      "Shows what changed just before things slowed down",
    ],
    cards: [
      { icon: Radar, tone: "bg-purple-100 text-purple-700", title: "Unusual, not just high", body: "Search latency is 2.4× its usual level for a Tuesday morning, though it's below the fixed limit." },
      { icon: GitBranch, tone: "bg-sky-100 text-sky-700", title: "Likely cause", body: "The slowdown began 6 minutes after release 4.2.1, in the report service only." },
      { icon: BellRing, tone: "bg-emerald-100 text-emerald-700", title: "One incident, not forty", body: "40 alerts from 6 services were grouped into one incident with a shared timeline." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Health for every module",
    intro: "Every module reports into the same monitoring, so one dashboard tells you how everything is doing.",
    slugs: ["crm", "service", "finance", "analytics", "automation"],
    links: {
      crm: "Page and search speed for customer teams",
      service: "Ticket and chat responsiveness",
      finance: "Invoice and payment job health",
      analytics: "Report run times and queue depth",
      automation: "Workflow success rates and delays",
    },
  },
};
