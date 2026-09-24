import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { inventoryPage } from "@/data/modules/inventory";

export const metadata: Metadata = {
  title: "Inventory",
  description: inventoryPage.description,
};

export default function InventoryPage() {
  return <ModulePage data={inventoryPage} />;
}
