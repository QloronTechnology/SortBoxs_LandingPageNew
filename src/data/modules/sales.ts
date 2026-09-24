import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const salesPage: ModulePageData = {
  slug: "sales",
  name: "Sales",
  badge: "SALES",
  icon: assets.modules.sales,
  heading: "Track opportunities and close deals faster.",
  description:
    "Give your sales team a single place to manage pipelines, forecast revenue and close deals with confidence.",
  features: [
    "Opportunity Tracking",
    "Sales Pipeline",
    "Quotes & Proposals",
    "Revenue Forecasting",
    "Team Performance",
    "AI Deal Insights",
  ],
  cta: "Explore Sales",
};
