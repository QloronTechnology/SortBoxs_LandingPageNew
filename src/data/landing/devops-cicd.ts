import { Archive, GitBranch, GitCommitHorizontal, FlaskConical, Hammer, Layers, Rocket, RotateCcw, ShieldCheck, TestTube2, UserCheck } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /devops-cicd. Layout lives in components/module-landing/. Figures are illustrative. */

export const devopsLanding: ModuleLandingData = {
  slug: "devops-cicd",
  name: "DevOps & CI/CD",
  icon: GitBranch,
  iconTone: "bg-purple-100 text-purple-700",
  hero: {
    eyebrow: "SortBoxs Delivery Pipeline",
    title: "Ship safely,",
    highlight: "ship often.",
    description:
      "An automated pipeline builds, tests, scans and releases every change, so improvements reach you quickly and without drama.",
    points: ["Every change tested automatically", "Security scanning before release", "Instant rollback if anything looks wrong"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "From a code change to your screen",
    intro: "No change reaches production without passing the same gates, every time.",
    steps: [
      { icon: GitCommitHorizontal, title: "Commit", body: "An engineer proposes a change, and a teammate reviews it before it can be merged." },
      { icon: TestTube2, title: "Build & test", body: "The change is built and thousands of automated tests run in minutes." },
      { icon: ShieldCheck, title: "Scan", body: "Code, dependencies and containers are scanned for vulnerabilities and licence issues." },
      { icon: Rocket, title: "Release", body: "The change rolls out gradually, with health checks and automatic rollback." },
    ],
  },
  explorer: {
    eyebrow: "Pipeline stages",
    title: "The checks every change passes",
    intro: "Pick a stage to see what runs and what has to be true to move on.",
    label: "Pipeline stages",
    metricLabel: "Typical time",
    itemLabel: "checks",
    tabs: [
      {
        key: "build",
        label: "Build",
        summary: "Turning code into a package.",
        total: "~4 min",
        tone: "bg-sky-500",
        items: [
          { title: "Compile", meta: "Every service", value: "Pass", note: "Reproducible, versioned builds" },
          { title: "Package", meta: "Container images", value: "Pass", note: "Signed and stored in a private registry" },
          { title: "Cache", meta: "Dependencies", value: "Fast", note: "Unchanged parts are reused" },
        ],
      },
      {
        key: "test",
        label: "Test",
        summary: "Proving it still works.",
        total: "~9 min",
        tone: "bg-emerald-500",
        items: [
          { title: "Unit tests", meta: "Thousands", value: "Pass", note: "Run in parallel on every commit" },
          { title: "Integration tests", meta: "Across services", value: "Pass", note: "Against a realistic environment" },
          { title: "End-to-end tests", meta: "Key user journeys", value: "Pass", note: "Sign in, create, approve, pay" },
        ],
      },
      {
        key: "security",
        label: "Security",
        summary: "Catching problems early.",
        total: "~6 min",
        tone: "bg-red-500",
        items: [
          { title: "Dependency scan", meta: "Known vulnerabilities", value: "Clean", note: "Blocks critical issues" },
          { title: "Code analysis", meta: "Static checks", value: "Clean", note: "Flags risky patterns" },
          { title: "Container scan", meta: "Images", value: "Clean", note: "Checks the base image too" },
        ],
      },
      {
        key: "release",
        label: "Release",
        summary: "Reaching production safely.",
        total: "~12 min",
        tone: "bg-brand-purple",
        items: [
          { title: "Staging", meta: "Production-like", value: "Pass", note: "Final checks before real users" },
          { title: "Gradual rollout", meta: "5%, then 25%, then 100%", value: "Live", note: "Watched at every step" },
          { title: "Rollback", meta: "Automatic", value: "Ready", note: "Triggers if errors rise" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Delivery done properly",
    title: "A pipeline you can trust, because it never skips a step",
    intro: "Speed and safety aren't opposites. Automation is what makes both possible.",
    items: [
      { icon: Hammer, title: "Automated Builds", body: "Every change is built the same way, producing signed, versioned packages." },
      { icon: FlaskConical, title: "Test Automation", body: "Unit, integration and end-to-end tests run on every change, in parallel." },
      { icon: ShieldCheck, title: "Security Scanning", body: "Code, dependencies and containers are checked before anything can ship." },
      { icon: Layers, title: "Environments", body: "Development, staging and production are kept alike, so surprises are rare." },
      { icon: UserCheck, title: "Approval Gates", body: "Sensitive changes need a human sign-off, recorded in the audit trail." },
      { icon: RotateCcw, title: "Instant Rollback", body: "If a release misbehaves, it's reverted automatically in moments." },
    ],
  },
  ai: {
    eyebrow: "Change management",
    title: "Frequent releases, calm customers",
    description: "Small, frequent changes are safer than rare, large ones. The pipeline is how we keep them small and keep you informed.",
    points: [
      "Small changes released many times a week",
      "Gradual rollouts watched by automatic health checks",
      "A changelog and notice for anything you'll notice",
      "A full audit trail of who changed what and when",
    ],
    cards: [
      { icon: Rocket, tone: "bg-purple-100 text-purple-700", title: "Gradual rollout", body: "Release 4.2.1 is live for 25% of traffic. Error rates are flat, so it continues to 100%." },
      { icon: RotateCcw, tone: "bg-red-100 text-red-700", title: "Automatic rollback", body: "Errors rose 3× on a canary. The release was reverted in 48 seconds, before most users noticed." },
      { icon: Archive, tone: "bg-emerald-100 text-emerald-700", title: "Audit trail", body: "Every deployment is recorded with its author, reviewer, tests and approval." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "New features reach every module faster",
    intro: "The same pipeline ships improvements to every module, with the same safety checks.",
    slugs: ["crm", "finance", "hrms", "automation", "ai"],
    links: {
      crm: "Improvements shipped weekly, not yearly",
      finance: "Extra checks for money-moving changes",
      hrms: "Payroll changes gated by approval",
      automation: "New triggers and actions released often",
      ai: "Models and agents updated safely",
    },
  },
};