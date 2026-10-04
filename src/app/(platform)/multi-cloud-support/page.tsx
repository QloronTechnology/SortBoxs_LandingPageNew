import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { MultiCloudDashboard } from "@/components/module-landing/previews/dashboards/MultiCloudDashboard";
import { multiCloudLanding } from "@/data/landing/multi-cloud";

export const metadata: Metadata = {
  title: "Multi-Cloud Support",
  description: multiCloudLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Multi-Cloud Support. The site header and footer come from the root layout. */
export default function MultiCloudSupportPage() {
  return <ModuleLandingPage data={multiCloudLanding} preview={<MultiCloudDashboard />} />;
}
