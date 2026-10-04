import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { BrandStudioDashboard } from "@/components/module-landing/previews/dashboards/BrandStudioDashboard";
import { whiteLabelLanding } from "@/data/landing/white-label";

export const metadata: Metadata = {
  title: "White-Label Options",
  description: whiteLabelLanding.hero.description,
};

/** Platform → White-Label Options. The site header and footer come from the root layout. */
export default function WhiteLabelPage() {
  return <ModuleLandingPage data={whiteLabelLanding} preview={<BrandStudioDashboard />} />;
}
