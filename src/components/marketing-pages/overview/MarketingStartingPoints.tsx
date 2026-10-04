"use client";

import { BarChart3, LineChart, Mail, Megaphone } from "lucide-react";
import { routes } from "@/config/routes";
import { StartingPoints, type Role } from "@/components/sales-solution/SalesStartingPoints";

const roles: Role[] = [
  {
    key: "manager",
    icon: Megaphone,
    title: "Marketing manager",
    summary: "Keep every campaign on plan and on budget.",
    first: ["Put every campaign on one calendar", "Watch budget used against budget planned", "Review results with the team"],
    links: [
      { label: "Campaign Management", href: routes.solutions.campaignManagement },
      { label: "Marketing Analytics", href: routes.solutions.marketingAnalytics },
    ],
  },
  {
    key: "demand",
    icon: LineChart,
    title: "Demand generation",
    summary: "Bring in more of the right leads.",
    first: ["Capture leads from every channel", "Score leads on fit and behaviour", "Hand the ready ones to sales"],
    links: [
      { label: "Lead Generation", href: routes.solutions.leadGeneration },
      { label: "Customer Journey", href: routes.solutions.customerJourney },
    ],
  },
  {
    key: "email",
    icon: Mail,
    title: "Email and content",
    summary: "Send messages that feel written for the reader.",
    first: ["Build emails from simple blocks", "Send to the right segment", "Set up follow-up sequences"],
    links: [
      { label: "Email Marketing", href: routes.solutions.emailMarketing },
      { label: "Customer Journey", href: routes.solutions.customerJourney },
    ],
  },
  {
    key: "ops",
    icon: BarChart3,
    title: "Marketing operations",
    summary: "Make the numbers trustworthy and easy to read.",
    first: ["Compare channels on the same terms", "Choose how credit is attributed", "Share one dashboard with leadership"],
    links: [
      { label: "Marketing Analytics", href: routes.solutions.marketingAnalytics },
      { label: "Lead Generation", href: routes.solutions.leadGeneration },
    ],
  },
];

/** Closes the Marketing overview: pick a role, see where to start. The site footer's own CTA follows it. */
export function MarketingStartingPoints() {
  return <StartingPoints roles={roles} eyebrow="Where to start" title="Where Would Your Team Start?" intro="Pick the role closest to yours and see what to look at first." />;
}
