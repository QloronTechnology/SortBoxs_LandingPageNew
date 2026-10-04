import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { GlobalInfraDashboard } from "@/components/module-landing/previews/dashboards/GlobalInfraDashboard";
import { globalInfrastructureLanding } from "@/data/landing/global-infrastructure";

export const metadata: Metadata = {
  title: "Global Infrastructure",
  description: globalInfrastructureLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Global Infrastructure. The site header and footer come from the root layout. */
export default function GlobalInfrastructurePage() {
  return <ModuleLandingPage data={globalInfrastructureLanding} preview={<GlobalInfraDashboard />} />;
}
