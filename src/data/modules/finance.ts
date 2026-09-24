import { assets } from "@/config/assets";
import type { ModulePageData } from "@/types/module";

export const financePage: ModulePageData = {
  slug: "finance",
  name: "Finance",
  badge: "FINANCE",
  icon: assets.modules.finance,
  heading: "Track expenses, invoices and financial health.",
  description:
    "Invoices, payments, expenses and complete financial operations in one connected view.",
  features: [
    "Invoicing & Billing",
    "Expense Management",
    "Accounts Payable",
    "Financial Reporting",
    "Budgeting & Forecasting",
    "Tax & Compliance",
  ],
  cta: "Explore Finance",
  dashboardImage: assets.moduleIllustrations.finance,
};
