import {
  Archive,
  BadgeCheck,
  ChartColumnIncreasing,
  Cloud,
  FileLock2,
  KeyRound,
  Layers,
  LayoutGrid,
  LockKeyhole,
  ScrollText,
  Settings2,
  ShieldCheck,
  TrendingUp,
  UsersRound,
  Zap,
} from "lucide-react";
import type { IconType } from "@/types/common";

/**
 * Content for /company/about (layout from the "About SortBoxs" reference design). Kept to what the site
 * already says — platform, modules, security badges, STATS in lib/constants.ts — no invented history,
 * founders or figures.
 */

export const aboutHero = {
  eyebrow: "About SortBoxs",
  lines: ["One Platform.", "Every Team.", "Built to Simplify Business."],
  /** Index of the line shown in brand purple. */
  highlight: 1,
  description:
    "SortBoxs connects your CRM, Sales, Customer Service, HRMS, Finance, Projects, Procurement, Inventory, Marketing, Analytics, Automation, AI Interview, AI and Commerce in one intelligent business platform.",
};

export const aboutStory = {
  eyebrow: "Our story",
  title: ["Building a More", "Connected Way to Work"],
  paragraphs: [
    "Businesses today use multiple disconnected tools to manage people, customers, projects, finances and operations. This creates data silos, manual work and lack of visibility.",
    "SortBoxs was created to bring everything together — helping businesses work smarter, faster and more collaboratively from one intelligent platform.",
  ],
  after: {
    title: "A More Connected Business",
    points: ["Unified data", "Automated workflows", "Real-time insights", "Better collaboration", "More growth opportunities"],
  },
};

export const aboutValues = {
  eyebrow: "Our values",
  title: "What We Believe",
  intro:
    "We are driven by a simple belief — powerful business software should be easy to use, connect all your teams and help you focus on what really matters: growth.",
  items: [
    { icon: Layers, title: "Unify Operations", body: "Bring all your business functions together in one seamless platform." },
    { icon: Zap, title: "Boost Productivity", body: "Automate repetitive work and help teams achieve more with less effort." },
    { icon: ChartColumnIncreasing, title: "Make Smarter Decisions", body: "Turn your business data into clear, actionable insights." },
    { icon: TrendingUp, title: "Scale with Confidence", body: "Give growing businesses the tools, flexibility and reliability they need." },
  ] satisfies { icon: IconType; title: string; body: string }[],
};

export const aboutImpact = { eyebrow: "Our impact", title: "Trusted by Businesses Worldwide" };

export const aboutPlatform = {
  eyebrow: "Our platform",
  title: "Built for Every Business Function",
  description: "SortBoxs brings all your teams, data and processes together with powerful, easy to use modules.",
  link: "Explore All Modules",
  /** Extra tile after the modules. */
  complete: { icon: LayoutGrid, title: "Complete Platform", body: "Everything your business needs" },
};

export const aboutApproach = {
  eyebrow: "Our approach",
  title: "How We Think About Business Software",
  description: "We focus on three core principles to help businesses work smarter and grow faster.",
  steps: [
    { icon: UsersRound, title: "Connect Teams & Data", body: "Bring all your business functions and data together in one unified platform." },
    { icon: Settings2, title: "Automate Repetitive Work", body: "Eliminate manual work with smart automation and streamlined processes." },
    { icon: ChartColumnIncreasing, title: "Turn Data into Insights", body: "Give you real-time visibility and actionable insights to make better decisions." },
  ] satisfies { icon: IconType; title: string; body: string }[],
};

/** Same badges as the home page's security band (components/home/HomeSecurity.tsx). */
export const aboutSecurity = {
  eyebrow: "Your data is safe",
  title: "Security and Trust",
  description: "We follow industry best practices to keep your data secure, private and always available.",
  badges: [
    { icon: ShieldCheck, lines: ["SOC 2", "Certified"] },
    { icon: BadgeCheck, lines: ["ISO 27001", "Compliant"] },
    { icon: LockKeyhole, lines: ["Data", "Encryption"] },
    { icon: KeyRound, lines: ["Role-Based", "Access Control"] },
    { icon: ScrollText, lines: ["Audit Logs &", "Monitoring"] },
    { icon: Archive, lines: ["Regular", "Backups"] },
    { icon: FileLock2, lines: ["API", "Security"] },
    { icon: Cloud, lines: ["Secure", "Infrastructure"] },
  ] satisfies { icon: IconType; lines: string[] }[],
};


/** Purple call-to-action band (the reference's "Ready to Bring Your Business Together?"). */
export const aboutBanner = {
  title: "Ready to Bring Your Business Together?",
  description: "See how SortBoxs can help you connect your teams, automate workflows and grow your business from one intelligent platform.",
  /** Sample dashboard figures (revenue as on the home page dashboard). */
  revenue: { label: "Total Revenue", value: "₹18.4L", change: "12%" },
  deals: { label: "Active Deals", value: "320", change: "10%" },
  teams: { label: "Your Teams", sublabel: "All in One Platform", initials: ["S", "H", "F", "P"], more: "+6" },
  performance: { label: "Team Performance", bars: [100, 70, 55, 62, 80] },
  /** Handwritten note, as in the reference. */
  note: ["One Platform", "Higher Productivity", "Greater Growth"],
};
