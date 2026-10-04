import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { ScalableDashboard } from "@/components/module-landing/previews/dashboards/ScalableDashboard";
import { scalableArchitectureLanding } from "@/data/landing/scalable-architecture";

export const metadata: Metadata = {
  title: "Scalable Architecture",
  description: scalableArchitectureLanding.hero.description,
};

/** Platform → Technology & Infrastructure → Scalable Architecture. The site header and footer come from the root layout. */
export default function ScalableArchitecturePage() {
  return <ModuleLandingPage data={scalableArchitectureLanding} preview={<ScalableDashboard />} />;
}
