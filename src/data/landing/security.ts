import { BadgeCheck, Cloud, FileDown, FileLock2, KeyRound, Lock, LockKeyhole, ScanSearch, ScrollText, ShieldCheck, Siren, UserCheck } from "lucide-react";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Content for /security (Platform → Technology & Infrastructure → Enterprise Security). Layout lives in components/module-landing/. Figures are illustrative. */

export const securityLanding: ModuleLandingData = {
  slug: "security",
  name: "Enterprise Security",
  icon: Lock,
  iconTone: "bg-pink-100 text-pink-700",
  hero: {
    eyebrow: "SortBoxs Security",
    title: "Enterprise-grade security,",
    highlight: "built in, not bolted on.",
    description:
      "Encryption, access controls, audit trails and compliance practices protect your business data at every layer, from the browser to the backup.",
    points: ["Encrypted in transit and at rest", "Single sign-on, MFA and role-based access", "A complete audit trail of every action"],
  },
  lifecycle: {
    eyebrow: "How it works",
    title: "Defence in layers, from prevention to response",
    intro: "No single control is trusted to do everything. Each layer assumes the one before it might fail.",
    steps: [
      { icon: ShieldCheck, title: "Protect", body: "Data is encrypted in transit and at rest, and infrastructure is hardened and patched by default." },
      { icon: KeyRound, title: "Control", body: "Single sign-on, multi-factor authentication and role-based access decide who can see and do what." },
      { icon: ScanSearch, title: "Detect", body: "Every action is logged, and unusual activity is flagged the moment it happens." },
      { icon: Siren, title: "Respond", body: "Alerts, session controls and tested recovery plans let you act quickly when something looks wrong." },
    ],
  },
  explorer: {
    eyebrow: "Security controls",
    title: "What protects your data",
    intro: "Pick an area to see the controls that sit behind it.",
    label: "Security areas",
    metricLabel: "Coverage",
    itemLabel: "controls",
    tabs: [
      {
        key: "data",
        label: "Data protection",
        summary: "Keeping information unreadable to anyone who shouldn't see it.",
        total: "3 layers",
        tone: "bg-brand-purple",
        items: [
          { title: "Encryption in transit", meta: "Every connection", value: "TLS 1.2+", note: "Browser, app and API traffic" },
          { title: "Encryption at rest", meta: "Databases, files and backups", value: "AES-256", note: "Applied automatically" },
          { title: "Key management", meta: "Private deployments", value: "Your keys", note: "Bring your own encryption keys" },
        ],
      },
      {
        key: "identity",
        label: "Identity & access",
        summary: "Making sure the right people see the right things.",
        total: "4 controls",
        tone: "bg-sky-500",
        items: [
          { title: "Single sign-on", meta: "SAML and OpenID Connect", value: "Supported", note: "Use your own identity provider" },
          { title: "Multi-factor authentication", meta: "Enforced by policy", value: "Required", note: "Authenticator apps and security keys" },
          { title: "Role-based access", meta: "Custom roles", value: "Field level", note: "Control view, edit, export and delete" },
        ],
      },
      {
        key: "monitoring",
        label: "Monitoring",
        summary: "Seeing everything that happens, and spotting what doesn't belong.",
        total: "24/7",
        tone: "bg-emerald-500",
        items: [
          { title: "Audit logs", meta: "Every sign-in, read, change and export", value: "Immutable", note: "Searchable and exportable" },
          { title: "Anomaly alerts", meta: "New country, mass export, odd hours", value: "Real time", note: "Routed to your admins" },
          { title: "Log streaming", meta: "To your own tools", value: "SIEM", note: "Send events to your security platform" },
        ],
      },
      {
        key: "compliance",
        label: "Compliance",
        summary: "Independent proof that the controls work.",
        total: "Audited",
        tone: "bg-amber-500",
        items: [
          { title: "SOC 2", meta: "Independent audit", value: "Certified", note: "Report available under NDA" },
          { title: "ISO 27001", meta: "Information security management", value: "Compliant", note: "Reviewed on a regular cycle" },
          { title: "Data privacy", meta: "GDPR-ready controls", value: "Built in", note: "Export, erasure and consent tools" },
        ],
      },
    ],
  },
  capabilities: {
    eyebrow: "Security for the whole platform",
    title: "The protections your security team asks about",
    intro: "Every item here applies to every module, so there's no weak corner of the product.",
    items: [
      { icon: LockKeyhole, title: "Encryption Everywhere", body: "TLS for every connection and AES-256 for every database, file and backup, applied automatically." },
      { icon: KeyRound, title: "Single Sign-On & MFA", body: "Connect your identity provider, require multi-factor authentication and set session timeouts." },
      { icon: UserCheck, title: "Role-Based Access", body: "Define who can view, edit, export and delete in each module, down to individual fields." },
      { icon: ScrollText, title: "Audit Logs & Monitoring", body: "A tamper-resistant record of every action, with alerts on unusual behaviour." },
      { icon: FileLock2, title: "API Security", body: "Scoped keys and OAuth, signed webhooks, rate limits and a log of every call." },
      { icon: Cloud, title: "Secure Infrastructure", body: "Hardened, redundant infrastructure with regular backups and tested recovery plans." },
    ],
  },
  ai: {
    eyebrow: "Privacy and trust",
    title: "Your data is yours, and we treat it that way",
    description:
      "Security isn't only about keeping attackers out. It's also about being clear on who inside can see what, including us.",
    points: [
      "Your data isn't used to train models for other customers",
      "Support staff access is limited, logged and time-bound",
      "Independent audits, with reports shared on request",
      "Export or delete your data whenever you need to",
    ],
    cards: [
      { icon: UserCheck, tone: "bg-brand-purple-light text-brand-purple", title: "Least-privilege staff access", body: "Support can view your workspace only after you approve it, for a limited time, and every view is logged." },
      { icon: BadgeCheck, tone: "bg-emerald-100 text-emerald-700", title: "Independently audited", body: "Auditors test the controls, not just the paperwork, and the results are available to you." },
      { icon: FileDown, tone: "bg-sky-100 text-sky-700", title: "Export and erasure", body: "Download all your data in standard formats, or request deletion and receive confirmation." },
    ],
  },
  connected: {
    eyebrow: "Part of one platform",
    title: "One security model across every module",
    intro: "Roles, sign-in and audit logs are shared, so you configure them once and they apply everywhere.",
    slugs: ["crm", "finance", "hrms", "service", "ai"],
    links: {
      crm: "Field-level permissions on customer data",
      finance: "Approvals and audit trails on money",
      hrms: "Tight controls on sensitive people data",
      service: "Customer data in tickets stays protected",
      ai: "AI that respects every permission",
    },
  },
};