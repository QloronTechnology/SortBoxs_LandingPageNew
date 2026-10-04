import { BookOpen, ChartColumn, Gauge, Headphones, Inbox, Layers, MessagesSquare, Search, Send, Tag, Timer, Users, UserRound, Zap, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { Crumbs, NextSteps, type FamilyLink } from "@/components/sales-pages/parts";

/** Shared pieces for the Customer Service solution pages (Ticket Management, Knowledge Base, SLA Management, Omnichannel Support, Customer Insights). */

const parent = { label: "Customer Service", href: routes.solutions.customerService };

export const serviceFamily: FamilyLink[] = [
  { label: "Ticket Management", href: routes.solutions.ticketManagement, body: "Every request in one queue, with an owner." },
  { label: "Knowledge Base", href: routes.solutions.knowledgeBase, body: "Answers customers can find on their own." },
  { label: "SLA Management", href: routes.solutions.slaManagement, body: "Promises you can see, track and keep." },
  { label: "Omnichannel Support", href: routes.solutions.omnichannelSupport, body: "One conversation across every channel." },
  { label: "Customer Insights", href: routes.solutions.customerInsights, body: "Learn what customers need and how you are doing." },
];

const steps: Record<string, { title: string; steps: { icon: LucideIcon; title: string; body: string }[] }> = {
  "Ticket Management": {
    title: "Your support queue in three steps",
    steps: [
      { icon: Inbox, title: "Bring requests in", body: "Connect the places customers write to, so every request becomes a ticket." },
      { icon: Tag, title: "Set priorities and owners", body: "Choose how tickets are categorised, prioritised and assigned." },
      { icon: Send, title: "Reply and resolve", body: "Work tickets from one inbox, using notes and ready-made replies." },
    ],
  },
  "Knowledge Base": {
    title: "Your help centre in three steps",
    steps: [
      { icon: BookOpen, title: "Write your first articles", body: "Start with the questions your team answers most often." },
      { icon: Layers, title: "Organise by category", body: "Group articles so customers can browse as well as search." },
      { icon: Search, title: "Publish and share", body: "Publish for customers, and suggest articles to agents while they reply." },
    ],
  },
  "SLA Management": {
    title: "Your first SLA in three steps",
    steps: [
      { icon: Gauge, title: "Define the targets", body: "Set response and resolution times for each priority." },
      { icon: Timer, title: "Choose working hours", body: "Count time against the hours your team actually works." },
      { icon: Zap, title: "Add escalations", body: "Decide who is told, and when, as a ticket nears its deadline." },
    ],
  },
  "Omnichannel Support": {
    title: "Every channel in three steps",
    steps: [
      { icon: MessagesSquare, title: "Connect your channels", body: "Add email, chat, phone, social and web forms to one inbox." },
      { icon: Users, title: "Route to the right team", body: "Send each conversation to the people with the right skills." },
      { icon: UserRound, title: "Reply with full context", body: "See the customer's history on every channel before you answer." },
    ],
  },
  "Customer Insights": {
    title: "Your first insights in three steps",
    steps: [
      { icon: Headphones, title: "Work tickets as usual", body: "Tickets, replies and ratings are the data. There is nothing extra to feed in." },
      { icon: ChartColumn, title: "Open your dashboard", body: "See volume, response times, satisfaction and top topics." },
      { icon: Zap, title: "Act on what you find", body: "Fix the common causes, and follow up with customers who are at risk." },
    ],
  },
};

export function ServiceCrumbs({ current }: { current: string }) {
  return <Crumbs current={current} parent={parent} />;
}

export function ServiceNextSteps({ current, tone }: { current: string; tone?: "white" | "surface" }) {
  return <NextSteps current={current} content={steps[current]} family={serviceFamily} familyLabel="More from SortBoxs Customer Service" tone={tone} />;
}

export const priorityTone = {
  Urgent: "bg-rose-100 text-rose-700",
  High: "bg-amber-100 text-amber-700",
  Normal: "bg-sky-100 text-sky-700",
  Low: "bg-slate-100 text-slate-600",
} as const;
export type Priority = keyof typeof priorityTone;
