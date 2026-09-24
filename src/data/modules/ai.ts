import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const aiPage: ModulePageData = {
  slug: "ai",
  name: "AI",
  badge: "SORTBOX AI",
  icon: assets.modules.ai,
  heading: "Your AI Assistant for real business impact.",
  description:
    "Get insights, automate tasks, generate reports and make better decisions - all with the power of AI.",
  features: [
    "AI Assistant",
    "AI Agents",
    "AI Analytics",
    "AI Automation",
    "AI Insights",
    "Natural Language",
  ],
  cta: "Explore AI",
  dashboardImage: assets.dashboards.sortboxAi,
};
