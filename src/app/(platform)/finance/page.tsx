import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { FinanceDashboard } from "@/components/module-landing/previews/dashboards/FinanceDashboard";
import { financePage } from "@/data/modules/finance";
import { financeLanding } from "@/data/landing/finance";

export const metadata: Metadata = {
  title: "Finance",
  description: financePage.description,
};

/** Platform → Finance. The site header and footer (with its CTA) come from the root layout. */
export default function FinancePage() {
  return <ModuleLandingPage data={financeLanding} preview={<FinanceDashboard />} />;
}
