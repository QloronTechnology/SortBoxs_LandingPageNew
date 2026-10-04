import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { TourJourney } from "@/components/module-landing/TourJourney";
import { TourDashboard } from "@/components/module-landing/previews/dashboards/TourDashboard";
import { platformTourLanding } from "@/data/landing/platform-tour";

export const metadata: Metadata = {
  title: "Platform Tour",
  description: platformTourLanding.hero.description,
};

/** Platform → Platform Tour. The site header and footer come from the root layout. */
export default function PlatformTourPage() {
  return <ModuleLandingPage data={platformTourLanding} preview={<TourDashboard />} lifecycle={<TourJourney />} />;
}
