import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const marketingPage: ModulePageData = {
  slug: "marketing",
  name: "Marketing",
  badge: "MARKETING",
  icon: assets.modules.marketing,
  heading: "Run campaigns and grow your brand.",
  description: "Run targeted campaigns and convert leads with connected marketing tools.",
  features: [
    "Campaign Management",
    "Email Marketing",
    "Lead Scoring",
    "Landing Pages",
    "Marketing Automation",
    "Campaign Analytics",
  ],
  cta: "Explore Marketing",
  dashboardImage: assets.moduleIllustrations.marketing,
};
