import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { ProcurementDashboard } from "@/components/module-landing/previews/dashboards/ProcurementDashboard";
import { procurementPage } from "@/data/modules/procurement";
import { procurementLanding } from "@/data/landing/procurement";

export const metadata: Metadata = {
  title: "Procurement",
  description: procurementPage.description,
};

/** Platform → Procurement. The site header and footer (with its CTA) come from the root layout. */
export default function ProcurementPage() {
  return <ModuleLandingPage data={procurementLanding} preview={<ProcurementDashboard />} />;
}
