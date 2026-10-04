import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { CustomModelsDashboard } from "@/components/module-landing/previews/dashboards/CustomModelsDashboard";
import { customModelsLanding } from "@/data/landing/custom-models";

export const metadata: Metadata = {
  title: "Custom AI Models",
  description: customModelsLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Custom AI Models. The site header and footer come from the root layout. */
export default function CustomAiModelsPage() {
  return <ModuleLandingPage data={customModelsLanding} preview={<CustomModelsDashboard />} />;
}
