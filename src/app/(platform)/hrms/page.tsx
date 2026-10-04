import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { HrmsDashboard } from "@/components/module-landing/previews/dashboards/HrmsDashboard";
import { hrmsPage } from "@/data/modules/hrms";
import { hrmsLanding } from "@/data/landing/hrms";

export const metadata: Metadata = {
  title: "HRMS",
  description: hrmsPage.description,
};

/** Platform → HRMS. The site header and footer (with its CTA) come from the root layout. */
export default function HRMSPage() {
  return <ModuleLandingPage data={hrmsLanding} preview={<HrmsDashboard />} />;
}
