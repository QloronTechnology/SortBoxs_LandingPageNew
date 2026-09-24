import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const analyticsPage: ModulePageData = {
  slug: "analytics",
  name: "Analytics",
  badge: "ANALYTICS",
  icon: assets.modules.analytics,
  heading: "Turn data into actionable insights.",
  description: "Make data-driven decisions with real-time dashboards and reports.",
  features: [
    "Real-Time Dashboards",
    "Custom Reports",
    "Business Growth Metrics",
    "Cross-Module Insights",
    "Data Export",
    "AI-Powered Forecasts",
  ],
  cta: "Explore Analytics",
  dashboardImage: assets.moduleIllustrations.analytics,
};
