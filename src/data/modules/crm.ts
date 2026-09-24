import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const crmPage: ModulePageData = {
  slug: "crm",
  name: "CRM",
  badge: "CRM",
  icon: assets.modules.crm,
  heading: "Turn every customer interaction into growth.",
  description:
    "Manage leads, accounts, contacts, opportunities and build long-term customer relationships with AI-powered insights.",
  features: [
    "Leads & Accounts",
    "Opportunities",
    "Pipeline Management",
    "Activities & Tasks",
    "Customer Timeline",
    "AI Recommendations",
  ],
  cta: "Explore CRM",
  dashboardImage: assets.dashboards.crm,
};
