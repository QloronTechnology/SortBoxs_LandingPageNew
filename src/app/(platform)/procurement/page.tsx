import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { procurementPage } from "@/data/modules/procurement";

export const metadata: Metadata = {
  title: "Procurement",
  description: procurementPage.description,
};

export default function ProcurementPage() {
  return <ModulePage data={procurementPage} />;
}
