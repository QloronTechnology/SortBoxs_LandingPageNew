import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { CloudDeploymentDashboard } from "@/components/module-landing/previews/dashboards/CloudDeploymentDashboard";
import { cloudOnPremiseLanding } from "@/data/landing/cloud-on-premise";

export const metadata: Metadata = {
  title: "Cloud & On-Premise",
  description: cloudOnPremiseLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Cloud & On-Premise. The site header and footer come from the root layout. */
export default function CloudOnPremisePage() {
  return <ModuleLandingPage data={cloudOnPremiseLanding} preview={<CloudDeploymentDashboard />} />;
}
