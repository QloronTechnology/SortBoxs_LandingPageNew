import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const automationPage: ModulePageData = {
  slug: "automation",
  name: "Automation",
  badge: "AUTOMATION",
  icon: assets.modules.automation,
  heading: "Automate workflows and save time.",
  description: "Create powerful workflows without coding and let SortBoxs handle the busywork.",
  features: [
    "Visual Workflow Builder",
    "Trigger-Based Actions",
    "Cross-Module Automation",
    "Approval Chains",
    "Scheduled Automations",
    "Notification Rules",
  ],
  cta: "Explore Automation",
  dashboardImage: assets.moduleIllustrations.automation,
};
