import { Blocks, Compass, Eye, Network, Radio, Rocket, ShieldCheck, Waypoints } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /microservices-architecture. Layout lives in components/module-landing/. Figures are illustrative. */

export const microservicesLanding: ModuleLandingData = {
  slug: "microservices-architecture",
  name: "Microservices Architecture",
  icon: Blocks,
  iconTone: "bg-pink-100 text-pink-700",
  hero: {
    eyebrow: "SortBoxs Architecture",
    title: "Small services, one",
    highlight: "reliable platform.",
    description:
      "SortBoxs is built from independent services that deploy, scale and fail on their own, so new features ship faster and problems stay contained.",
    points: ["Independent deployments, no big-bang releases", "Failures stay contained to one service", "Each service scales on its own"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a feature to a safe release",
    intro: "Splitting the platform into services changes how it's built, shipped and kept healthy.",
    steps: [
      { icon: Blocks, title: "Decompose", body: "Each business capability, like billing or search, is its own service with a clear boundary." },
      { icon: Rocket, title: "Deploy", body: "Teams release their service independently, many times a day, without waiting for anyone else." },
      { icon: Network, title: "Communicate", body: "Services talk through well-defined APIs and events, so each can change without breaking others." },
      { icon: Eye, title: "Observe", body: "Every service reports its health, so problems are found and fixed quickly." },
    ],
  },
  explorer: {
    eyebrow: "The service map",
    title: "What the platform is made of",
    intro: "Pick a layer to see the kind of services that live there.",
    label: "Service layers",
    metricLabel: "Services",
    itemLabel: "services",
    tabs: [
      {
        key: "edge",
        label: "Edge",
        summary: "Where requests arrive.",
        total: "3",
        tone: "bg-sky-500",
        items: [
          { title: "API gateway", meta: "Single front door", value: "Live", note: "Routing, rate limits and authentication" },
          { title: "Web front end", meta: "Browser apps", value: "Live", note: "Served from the nearest edge location" },
          { title: "Realtime service", meta: "Live updates", value: "Live", note: "Pushes changes to open screens" },
        ],
      },
      {
        key: "core",
        label: "Business",
        summary: "What each module does.",
        total: "12",
        tone: "bg-brand-purple",
        items: [
          { title: "CRM service", meta: "Customers and deals", value: "Live", note: "Owns its own data" },
          { title: "Billing service", meta: "Invoices and payments", value: "Live", note: "Deploys separately from CRM" },
          { title: "HR service", meta: "People and payroll", value: "Live", note: "Scales for month-end" },
        ],
      },
      {
        key: "platform",
        label: "Platform",
        summary: "Shared building blocks.",
        total: "8",
        tone: "bg-emerald-500",
        items: [
          { title: "Identity", meta: "Sign-in and permissions", value: "Live", note: "One source of truth for access" },
          { title: "Search", meta: "Across every module", value: "Live", note: "Indexes changes as they happen" },
          { title: "Notifications", meta: "Email, push, in-app", value: "Live", note: "Queues so nothing is lost" },
        ],
      },
      {
        key: "data",
        label: "Data & AI",
        summary: "Storage and intelligence.",
        total: "6",
        tone: "bg-amber-500",
        items: [
          { title: "Event stream", meta: "Messaging backbone", value: "Live", note: "Services react to events" },
          { title: "Analytics", meta: "Reports and dashboards", value: "Live", note: "Reads from a separate store" },
          { title: "AI services", meta: "Models and agents", value: "Live", note: "Scale independently of the app" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Why it matters to you",
    title: "An architecture that benefits customers",
    intro: "Microservices aren't a goal in themselves. They're how SortBoxs ships faster and fails more gently.",
    items: [
      { icon: Rocket, title: "Independent Deploys", body: "A fix to one module goes live on its own, without a platform-wide release." },
      { icon: ShieldCheck, title: "Fault Isolation", body: "If one service struggles, circuit breakers keep the rest of the platform running." },
      { icon: Radio, title: "Event-Driven Messaging", body: "Services react to events, so work flows across modules without tight coupling." },
      { icon: Waypoints, title: "API Gateway", body: "One consistent front door handles authentication, routing and rate limits." },
      { icon: Compass, title: "Service Discovery", body: "Services find each other automatically, even as instances come and go." },
      { icon: Eye, title: "Built-In Observability", body: "Each service ships metrics, logs and traces, so we can see across the whole system." },
    ],
  },
  ai: {
    eyebrow: "Resilience by design",
    title: "When one part has a bad day, the rest carry on",
    description: "Services are designed to expect failure in their neighbours and to degrade gracefully, instead of falling over together.",
    points: [
      "Circuit breakers stop failures spreading",
      "Timeouts and retries are standard in every service",
      "Releases roll out gradually and roll back automatically",
      "Each service has its own capacity and limits",
    ],
    cards: [
      { icon: ShieldCheck, tone: "bg-emerald-100 text-emerald-700", title: "Contained failure", body: "The report service slowed down. Circuit breakers kept the rest of the app responsive." },
      { icon: Rocket, tone: "bg-brand-purple-light text-brand-purple", title: "Safe release", body: "Billing v2.8 went to 5% of traffic first, then 100% once errors stayed flat." },
      { icon: Network, tone: "bg-sky-100 text-sky-700", title: "Graceful fallback", body: "Search was unavailable for 40 seconds. Lists and records kept working from the main database." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Each module, its own service",
    intro: "Every SortBoxs module is built as a service, so they can grow, change and recover independently.",
    slugs: ["crm", "finance", "hrms", "inventory", "ai"],
    links: {
      crm: "Updated and scaled without touching billing",
      finance: "Its own data and its own release cycle",
      hrms: "Scales for payroll days alone",
      inventory: "Reacts to orders through events",
      ai: "AI services that scale on their own",
    },
  },
};
