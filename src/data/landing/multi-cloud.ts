import { Calculator, CloudCog, LayoutDashboard, Layers, Plug, RefreshCw, ShieldCheck, Unlock, MapPin, Scale } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /multi-cloud-support. Layout lives in components/module-landing/. Figures are illustrative. */

export const multiCloudLanding: ModuleLandingData = {
  slug: "multi-cloud-support",
  name: "Multi-Cloud Support",
  icon: CloudCog,
  iconTone: "bg-orange-100 text-orange-700",
  hero: {
    eyebrow: "SortBoxs Multi-Cloud",
    title: "Run on the cloud you",
    highlight: "already trust.",
    description:
      "Deploy SortBoxs on AWS, Azure or Google Cloud, or spread workloads across them, without being locked into any single provider.",
    points: ["AWS, Azure and Google Cloud", "Place each workload where it runs best", "Fail over between providers"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From your cloud account to a balanced platform",
    intro: "SortBoxs connects to the providers you already use and lets you decide what runs where.",
    steps: [
      { icon: Plug, title: "Connect", body: "Link your AWS, Azure or Google Cloud accounts with scoped, revocable access." },
      { icon: Layers, title: "Place", body: "Choose which provider and region each workload runs in, based on cost, latency and policy." },
      { icon: Scale, title: "Balance", body: "Traffic is spread across providers according to the rules you set." },
      { icon: RefreshCw, title: "Fail over", body: "If a provider has a problem, traffic moves to another one automatically." },
    ],
  },
  explorer: {
    eyebrow: "Provider support",
    title: "The same platform on every major cloud",
    intro: "Pick a provider to see the services SortBoxs uses, and how mixed setups work.",
    label: "Cloud providers",
    metricLabel: "Status",
    itemLabel: "services",
    tabs: [
      {
        key: "aws",
        label: "AWS",
        summary: "Amazon Web Services.",
        total: "Supported",
        tone: "bg-amber-500",
        items: [
          { title: "Compute", meta: "Containers on managed Kubernetes", value: "Ready", note: "Scales with your load" },
          { title: "Database", meta: "Managed relational databases", value: "Ready", note: "Multi-zone with automatic backups" },
          { title: "Storage", meta: "Object storage", value: "Ready", note: "Encrypted, versioned files" },
        ],
      },
      {
        key: "azure",
        label: "Azure",
        summary: "Microsoft Azure.",
        total: "Supported",
        tone: "bg-sky-500",
        items: [
          { title: "Compute", meta: "Containers on managed Kubernetes", value: "Ready", note: "Integrates with Entra ID sign-in" },
          { title: "Database", meta: "Managed relational databases", value: "Ready", note: "Zone-redundant" },
          { title: "Storage", meta: "Blob storage", value: "Ready", note: "Encrypted with your keys" },
        ],
      },
      {
        key: "gcp",
        label: "Google Cloud",
        summary: "Google Cloud Platform.",
        total: "Supported",
        tone: "bg-emerald-500",
        items: [
          { title: "Compute", meta: "Containers on managed Kubernetes", value: "Ready", note: "Autoscaling nodes" },
          { title: "Database", meta: "Managed relational databases", value: "Ready", note: "High availability enabled" },
          { title: "Storage", meta: "Cloud storage", value: "Ready", note: "Lifecycle rules for cost" },
        ],
      },
      {
        key: "mixed",
        label: "Mixed",
        summary: "More than one provider at once.",
        total: "Flexible",
        tone: "bg-brand-purple",
        items: [
          { title: "Split by workload", meta: "Per-module placement", value: "Yes", note: "CRM on one cloud, analytics on another" },
          { title: "Cross-cloud failover", meta: "Automatic", value: "Yes", note: "Traffic shifts if a provider is down" },
          { title: "One control plane", meta: "Single dashboard", value: "Yes", note: "See every environment together" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Freedom to choose",
    title: "Your cloud strategy, not ours",
    intro: "Use the provider that fits your contracts, your skills and your region, and change your mind later.",
    items: [
      { icon: CloudCog, title: "Provider Choice", body: "Run on AWS, Azure or Google Cloud with the same features and the same support." },
      { icon: Layers, title: "Workload Placement", body: "Decide where each module runs, by cost, latency, data location or policy." },
      { icon: RefreshCw, title: "Cross-Cloud Failover", body: "Keep working through a provider outage by shifting traffic to another cloud." },
      { icon: LayoutDashboard, title: "Unified Management", body: "Monitor and manage every environment from one place, whatever it runs on." },
      { icon: Calculator, title: "Cost Visibility", body: "See what each workload costs on each provider, and spot where moving it would save money." },
      { icon: Unlock, title: "No Lock-In", body: "Your data and configuration are portable, so switching provider is a project, not a rewrite." },
    ],
  },
  ai: {
    eyebrow: "Avoiding lock-in",
    title: "A platform that doesn't depend on one vendor",
    description: "Multi-cloud isn't only about resilience. It gives you negotiating power, flexibility and a way to meet regional requirements.",
    points: [
      "Portable containers and standard data formats",
      "Provider-neutral configuration for every environment",
      "Cost and latency compared across clouds",
      "A tested path from one provider to another",
    ],
    cards: [
      { icon: Calculator, tone: "bg-amber-100 text-amber-700", title: "Cost comparison", body: "Analytics would cost about 18% less on Google Cloud in your region. Review the move plan?" },
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Failover tested", body: "Last month's drill moved 100% of traffic to a second provider in under 40 seconds." },
      { icon: MapPin, tone: "bg-sky-100 text-sky-700", title: "Regional fit", body: "Your German entity's data stays on the Frankfurt region of whichever cloud you choose." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module, on every cloud",
    intro: "Each module can run on a different provider while still working as one system.",
    slugs: ["crm", "finance", "hrms", "analytics", "ai"],
    links: {
      crm: "Run customer data on the provider you prefer",
      finance: "Keep financial workloads where audit requires",
      hrms: "Place people data in the right region",
      analytics: "Run heavy reports where compute is cheapest",
      ai: "Put AI workloads on the best-fit provider",
    },
  },
};
