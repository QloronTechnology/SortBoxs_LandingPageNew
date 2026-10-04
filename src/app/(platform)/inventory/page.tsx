import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { InventoryDashboard } from "@/components/module-landing/previews/dashboards/InventoryDashboard";
import { inventoryPage } from "@/data/modules/inventory";
import { inventoryLanding } from "@/data/landing/inventory";

export const metadata: Metadata = {
  title: "Inventory",
  description: inventoryPage.description,
};

/** Platform → Inventory. The site header and footer (with its CTA) come from the root layout. */
export default function InventoryPage() {
  return <ModuleLandingPage data={inventoryLanding} preview={<InventoryDashboard />} />;
}
