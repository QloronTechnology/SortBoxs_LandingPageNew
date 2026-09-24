import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { salesPage } from "@/data/modules/sales";

export const metadata: Metadata = {
  title: "Sales",
  description: salesPage.description,
};

export default function SalesPage() {
  return <ModulePage data={salesPage} />;
}
