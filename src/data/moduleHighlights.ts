import { assets } from "@/config/assets";
import { routes } from "@/config/routes";

export const moduleHighlights = [
  {
    name: "Finance",
    description: "Invoices, payments, expenses and complete financial operations.",
    image: assets.moduleIllustrations.finance,
    tint: "#e3f7ea",
    href: routes.platform.finance,
  },
  {
    name: "Projects",
    description: "Invoices, payments, expenses and complete financial operations.",
    image: assets.moduleIllustrations.projects,
    tint: "#e6ecfd",
    href: routes.platform.projects,
  },
  {
    name: "Procurement",
    description: "Manage vendors, purchase orders and approvals.",
    image: assets.moduleIllustrations.procurement,
    tint: "#fde7ec",
    href: routes.platform.procurement,
  },
  {
    name: "Inventory",
    description: "Track products, warehouses, stock and transfers.",
    image: assets.moduleIllustrations.inventory,
    tint: "#dff5f1",
    href: routes.platform.inventory,
  },
  {
    name: "Marketing",
    description: "Run targeted campaigns and convert leads.",
    image: assets.moduleIllustrations.marketing,
    tint: "#efe9fe",
    href: routes.platform.marketing,
  },
  {
    name: "Automation",
    description: "Create powerful workflows without coding.",
    image: assets.moduleIllustrations.automation,
    tint: "#e8e9fd",
    href: routes.platform.automation,
  },
  {
    name: "Analytics",
    description: "Make data-driven decisions with real-time insights.",
    image: assets.moduleIllustrations.analytics,
    tint: "#fdf3dc",
    href: routes.platform.analytics,
  },
];
