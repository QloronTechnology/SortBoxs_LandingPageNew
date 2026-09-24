import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { financePage } from "@/data/modules/finance";

export const metadata: Metadata = {
  title: "Finance",
  description: financePage.description,
};

export default function FinancePage() {
  return <ModulePage data={financePage} />;
}
