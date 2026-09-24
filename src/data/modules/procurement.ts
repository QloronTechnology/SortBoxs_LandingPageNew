import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const procurementPage: ModulePageData = {
  slug: "procurement",
  name: "Procurement",
  badge: "PROCUREMENT",
  icon: assets.modules.procurement,
  heading: "Manage purchasing and vendors.",
  description: "Manage vendors, purchase orders and approvals from one streamlined workflow.",
  features: [
    "Purchase Requisitions",
    "Vendor Management",
    "Purchase Orders",
    "Approval Workflows",
    "Contract Tracking",
    "Spend Analysis",
  ],
  cta: "Explore Procurement",
  dashboardImage: assets.moduleIllustrations.procurement,
};
