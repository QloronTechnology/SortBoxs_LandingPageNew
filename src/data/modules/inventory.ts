import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const inventoryPage: ModulePageData = {
  slug: "inventory",
  name: "Inventory",
  badge: "INVENTORY",
  icon: assets.modules.inventory,
  heading: "Track stock and manage warehouses.",
  description: "Track products, warehouses and stock transfers with real-time visibility.",
  features: [
    "Stock Tracking",
    "Warehouse Management",
    "Stock Transfers",
    "Reorder Alerts",
    "Batch & Serial Tracking",
    "Inventory Valuation",
  ],
  cta: "Explore Inventory",
  dashboardImage: assets.moduleIllustrations.inventory,
};
