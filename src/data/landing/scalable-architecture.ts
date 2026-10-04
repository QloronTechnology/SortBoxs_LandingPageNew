import { Boxes, Database, Gauge, ListOrdered, Maximize2, Network, Scale, Sparkles, TrendingUp, Zap } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /scalable-architecture. Layout lives in components/module-landing/. Figures are illustrative. */

export const scalableArchitectureLanding: ModuleLandingData = {
  slug: "scalable-architecture",
  name: "Scalable Architecture",
  icon: Network,
  iconTone: "bg-green-100 text-green-700",
  hero: {
    eyebrow: "SortBoxs Scalability",
    title: "Start with ten users,",
    highlight: "scale to ten thousand.",
    description:
      "An architecture that grows when you're busy and shrinks when you're not, so performance stays steady as your business grows.",
    points: ["Capacity that follows demand", "No re-platforming as you grow", "Performance that stays predictable"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From rising demand to steady performance",
    intro: "Capacity is added and removed automatically, long before users feel a slowdown.",
    steps: [
      { icon: Gauge, title: "Measure", body: "Load, response times and queue depth are watched continuously across every part of the system." },
      { icon: Maximize2, title: "Scale out", body: "When demand rises, more instances start automatically and join the pool within moments." },
      { icon: Scale, title: "Balance", body: "Work is spread evenly, so no single server becomes the bottleneck." },
      { icon: Sparkles, title: "Optimise", body: "When the rush passes, extra capacity is released, so you aren't paying for what you don't use." },
    ],
  },
  explorer: {
    eyebrow: "Sized for every stage",
    title: "The same platform from startup to enterprise",
    intro: "Pick a stage to see the kind of load SortBoxs handles at that size.",
    label: "Company stages",
    metricLabel: "Typical load",
    itemLabel: "dimensions",
    tabs: [
      {
        key: "small",
        label: "Small team",
        summary: "10 to 50 people.",
        total: "~20 req/s",
        tone: "bg-emerald-500",
        items: [
          { title: "Users", meta: "Concurrent", value: "10–50", note: "Everything fast on the smallest setup" },
          { title: "Records", meta: "Customers, deals, tickets", value: "50K", note: "Search stays instant" },
          { title: "Cost", meta: "Pay for what you use", value: "Minimal", note: "No idle servers" },
        ],
      },
      {
        key: "growing",
        label: "Growing company",
        summary: "50 to 500 people.",
        total: "~200 req/s",
        tone: "bg-sky-500",
        items: [
          { title: "Users", meta: "Concurrent", value: "50–500", note: "Capacity grows with sign-ins" },
          { title: "Records", meta: "Customers, deals, tickets", value: "2M", note: "Indexes keep queries quick" },
          { title: "Integrations", meta: "API traffic", value: "Rising", note: "Rate limits protect everyone" },
        ],
      },
      {
        key: "enterprise",
        label: "Enterprise",
        summary: "500 to 10,000+ people.",
        total: "~2,000 req/s",
        tone: "bg-brand-purple",
        items: [
          { title: "Users", meta: "Concurrent", value: "500–10K", note: "Spread across regions" },
          { title: "Records", meta: "Customers, deals, tickets", value: "100M+", note: "Partitioned for speed" },
          { title: "Tenancy", meta: "Business units", value: "Isolated", note: "One group, many workspaces" },
        ],
      },
      {
        key: "peaks",
        label: "Peak events",
        summary: "Month-end, sales and launches.",
        total: "5× burst",
        tone: "bg-amber-500",
        items: [
          { title: "Month-end close", meta: "Reports and payroll", value: "3× load", note: "Capacity added ahead of time" },
          { title: "Seasonal sale", meta: "Orders and payments", value: "5× load", note: "Autoscaling absorbs the burst" },
          { title: "Product launch", meta: "Sign-ups and support", value: "4× load", note: "Queues smooth the spikes" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Built to grow",
    title: "Scale without a rebuild",
    intro: "The architecture was designed for growth from the start, so success never means a migration project.",
    items: [
      { icon: TrendingUp, title: "Auto-Scaling", body: "Compute capacity expands and contracts automatically with real demand." },
      { icon: Database, title: "Elastic Storage", body: "Databases and files grow as you add records, with no manual capacity planning." },
      { icon: Scale, title: "Load Balancing", body: "Requests are spread evenly across instances and regions." },
      { icon: Zap, title: "Smart Caching", body: "Frequently used data is served from memory, keeping pages fast under load." },
      { icon: ListOrdered, title: "Queue-Based Processing", body: "Heavy jobs like imports and reports run in the background without slowing down screens." },
      { icon: Boxes, title: "Workspace Isolation", body: "A busy workspace can't slow down its neighbours, whatever its size." },
    ],
  },
  ai: {
    eyebrow: "Performance you can plan on",
    title: "Predictable, even when it gets busy",
    description: "Growth shouldn't bring surprises. SortBoxs scales ahead of demand and tells you what it's doing.",
    points: [
      "Capacity added ahead of known peaks",
      "Per-workspace limits that protect everyone",
      "Response-time targets monitored continuously",
      "Cost shown next to usage, so scaling is never a mystery",
    ],
    cards: [
      { icon: TrendingUp, tone: "bg-emerald-100 text-emerald-700", title: "Ahead of the peak", body: "Month-end is in 3 days. Capacity will rise 60% from tomorrow evening and fall back on the 3rd." },
      { icon: Gauge, tone: "bg-sky-100 text-sky-700", title: "Response targets", body: "95% of requests answered in under 300 ms over the last 30 days." },
      { icon: Boxes, tone: "bg-brand-purple-light text-brand-purple", title: "Fair usage", body: "A bulk import in one workspace was throttled so other teams saw no slowdown." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module scales together",
    intro: "Growth in one area, like orders or tickets, doesn't slow down the others.",
    slugs: ["crm", "commerce", "service", "analytics", "ai"],
    links: {
      crm: "Millions of records, still instant",
      commerce: "Handles seasonal order bursts",
      service: "Absorbs ticket surges after a release",
      analytics: "Heavy reports without slowing the app",
      ai: "AI workloads scale on their own",
    },
  },
};
