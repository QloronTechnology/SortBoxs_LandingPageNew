import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const commercePage: ModulePageData = {
  slug: "commerce",
  name: "Commerce",
  badge: "COMMERCE",
  icon: assets.modules.commerce,
  heading: "Manage products, and transactions.",
  description: "Manage products, orders and transactions across every sales channel.",
  features: [
    "Product Catalog",
    "Order Management",
    "Multi-Channel Selling",
    "Payment Processing",
    "Shipping & Fulfillment",
    "Storefront Integrations",
  ],
  cta: "Explore Commerce",
};
