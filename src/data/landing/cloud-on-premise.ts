import { ArrowLeftRight, ClipboardCheck, Cloud, GitMerge, Lock, MapPin, Rocket, Server, Settings, Split } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /cloud-on-premise (Platform → Technology & Infrastructure). Layout lives in components/module-landing/. Figures are illustrative. */

export const cloudOnPremiseLanding: ModuleLandingData = {
  slug: "cloud-on-premise",
  name: "Cloud & On-Premise",
  icon: Cloud,
  iconTone: "bg-emerald-100 text-emerald-700",
  hero: {
    eyebrow: "SortBoxs Deployment",
    title: "Run SortBoxs where it",
    highlight: "makes sense for you.",
    description:
      "Use the managed cloud, run SortBoxs in your own private cloud, or keep it fully on-premise. It's the same product and the same features, with your choice of home for your data.",
    points: ["Managed cloud, ready in minutes", "Private cloud or on-premise when you need control", "Move between options as you grow"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a decision to a running system",
    intro: "Our team helps you choose, deploy and move, so the infrastructure question never slows down the project.",
    steps: [
      { icon: ClipboardCheck, title: "Assess", body: "Share your security, compliance and data-location needs. We map them to the options that fit." },
      { icon: Split, title: "Choose", body: "Pick managed cloud, private cloud, on-premise or a hybrid of them, and change your mind later if you need to." },
      { icon: Rocket, title: "Deploy", body: "We stand up the environment, connect your identity provider and migrate your data with you." },
      { icon: Settings, title: "Operate", body: "Updates, monitoring and backups follow the model you chose, from fully managed to fully yours." },
    ],
  },
  explorer: {
    eyebrow: "Deployment options",
    title: "Four ways to run the same platform",
    intro: "Pick an option to see how it compares on setup, control and who looks after it.",
    label: "Deployment options",
    metricLabel: "Typical go-live",
    itemLabel: "aspects",
    tabs: [
      {
        key: "cloud",
        label: "Managed cloud",
        summary: "We host and run everything for you.",
        total: "Minutes",
        tone: "bg-emerald-500",
        items: [
          { title: "Setup", meta: "Self-service", value: "Minutes", note: "Create your workspace and invite your team" },
          { title: "Operations", meta: "Handled by SortBoxs", value: "Managed", note: "Updates, scaling and backups included" },
          { title: "Control", meta: "Workspace level", value: "Standard", note: "Roles, SSO and audit logs" },
        ],
      },
      {
        key: "private",
        label: "Private cloud",
        summary: "Your own cloud account, run with us.",
        total: "Days",
        tone: "bg-sky-500",
        items: [
          { title: "Setup", meta: "Guided by our team", value: "Days", note: "Deployed into your cloud subscription" },
          { title: "Operations", meta: "Shared", value: "Co-managed", note: "We run it, you own the account" },
          { title: "Control", meta: "Account level", value: "High", note: "Your network rules and your keys" },
        ],
      },
      {
        key: "onprem",
        label: "On-premise",
        summary: "Inside your own data centre.",
        total: "Weeks",
        tone: "bg-amber-500",
        items: [
          { title: "Setup", meta: "Project with our engineers", value: "Weeks", note: "Hardware, network and install planned together" },
          { title: "Operations", meta: "Your IT team", value: "Yours", note: "Updates on your schedule, with our support" },
          { title: "Control", meta: "Full", value: "Maximum", note: "Data never leaves your premises" },
        ],
      },
      {
        key: "hybrid",
        label: "Hybrid",
        summary: "Keep sensitive data local, the rest in the cloud.",
        total: "Weeks",
        tone: "bg-brand-purple",
        items: [
          { title: "Setup", meta: "Phased", value: "Weeks", note: "Start in the cloud, move sensitive parts later" },
          { title: "Operations", meta: "Split", value: "Mixed", note: "Each part follows its own model" },
          { title: "Control", meta: "By data type", value: "Flexible", note: "Choose what stays on-premise" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Deployment without compromise",
    title: "The same SortBoxs, wherever it lives",
    intro: "No cut-down versions. Every option runs the full platform, with the same upgrades and the same support.",
    items: [
      { icon: Cloud, title: "Managed Cloud", body: "Start immediately on a secure, fully managed environment, with nothing to install or maintain." },
      { icon: Lock, title: "Private Cloud", body: "Run in your own cloud account with your own network rules and encryption keys." },
      { icon: Server, title: "On-Premise", body: "Install in your data centre when policy or regulation says data must stay on site." },
      { icon: GitMerge, title: "Hybrid Deployment", body: "Keep sensitive modules or records local and run the rest in the cloud, as one connected system." },
      { icon: MapPin, title: "Data Residency", body: "Choose the country or region where your data is stored and processed." },
      { icon: ArrowLeftRight, title: "Migration Tools", body: "Move between options with guided tooling, and keep your configuration and history." },
    ],
  },
  ai: {
    eyebrow: "Control and compliance",
    title: "You decide where your data lives",
    description: "Whichever option you choose, the security controls are the same. What changes is how much of the environment you hold yourself.",
    points: [
      "Choose the country and region for your data",
      "Bring your own encryption keys on private options",
      "Apply updates on your schedule when self-hosting",
      "Move to another option later without starting over",
    ],
    cards: [
      { icon: MapPin, tone: "bg-emerald-100 text-emerald-700", title: "Data residency", body: "Your workspace data is stored in India and never replicated outside the region you pick." },
      { icon: Settings, tone: "bg-sky-100 text-sky-700", title: "Update control", body: "Release 4.2 is ready. Schedule it for Saturday night, or hold it until your next change window." },
      { icon: ArrowLeftRight, tone: "bg-brand-purple-light text-brand-purple", title: "Migration plan", body: "Moving to private cloud keeps your users, settings and history, with about two hours of read-only time." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "Every module, in whichever home you choose",
    intro: "Deployment is a choice about infrastructure, not features. All modules and AI capabilities are available in every option.",
    slugs: ["crm", "hrms", "finance", "analytics", "ai"],
    links: {
      crm: "Customer data in the region you choose",
      hrms: "Employee records kept where policy requires",
      finance: "Financial data under your own controls",
      analytics: "Reports that run where the data lives",
      ai: "AI features in every deployment option",
    },
  },
};