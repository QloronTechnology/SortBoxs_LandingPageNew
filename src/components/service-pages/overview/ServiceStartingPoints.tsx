"use client";

import { BarChart3, Headphones, Settings2, UserRound } from "lucide-react";
import { routes } from "@/config/routes";
import { StartingPoints, type Role } from "@/components/sales-solution/SalesStartingPoints";

const roles: Role[] = [
  {
    key: "agent",
    icon: Headphones,
    title: "Support agent",
    summary: "Answer faster, with everything in front of you.",
    first: ["Work every request from one inbox", "See the customer's full history on each channel", "Insert help articles into your reply"],
    links: [
      { label: "Ticket Management", href: routes.solutions.ticketManagement },
      { label: "Omnichannel Support", href: routes.solutions.omnichannelSupport },
    ],
  },
  {
    key: "lead",
    icon: UserRound,
    title: "Support lead",
    summary: "Keep the queue healthy and the promises kept.",
    first: ["Watch tickets that are close to their deadline", "Rebalance work across the team", "Review results with your agents"],
    links: [
      { label: "SLA Management", href: routes.solutions.slaManagement },
      { label: "Customer Insights", href: routes.solutions.customerInsights },
    ],
  },
  {
    key: "success",
    icon: BarChart3,
    title: "Customer success",
    summary: "Know which customers need a call.",
    first: ["See health scores for every account", "Spot the topics customers keep raising", "Follow up on poor ratings"],
    links: [
      { label: "Customer Insights", href: routes.solutions.customerInsights },
      { label: "Knowledge Base", href: routes.solutions.knowledgeBase },
    ],
  },
  {
    key: "ops",
    icon: Settings2,
    title: "Support operations",
    summary: "Set the structure once, so the team can focus on customers.",
    first: ["Define priorities, targets and escalations", "Set up routing across channels", "Organise the help centre"],
    links: [
      { label: "SLA Management", href: routes.solutions.slaManagement },
      { label: "Knowledge Base", href: routes.solutions.knowledgeBase },
    ],
  },
];

/** Closes the Customer Service overview: pick a role, see where to start. The site footer's own CTA follows it. */
export function ServiceStartingPoints() {
  return <StartingPoints roles={roles} eyebrow="Where to start" title="Where Would Your Team Start?" intro="Pick the role closest to yours and see what to look at first." />;
}
