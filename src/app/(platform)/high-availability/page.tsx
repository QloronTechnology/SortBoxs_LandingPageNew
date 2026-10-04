import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { HighAvailabilityDashboard } from "@/components/module-landing/previews/dashboards/HighAvailabilityDashboard";
import { highAvailabilityLanding } from "@/data/landing/high-availability";

export const metadata: Metadata = {
  title: "High Availability",
  description: highAvailabilityLanding.hero.description,
};

/** Platform → Technology & Infrastructure → High Availability. The site header and footer come from the root layout. */
export default function HighAvailabilityPage() {
  return <ModuleLandingPage data={highAvailabilityLanding} preview={<HighAvailabilityDashboard />} />;
}
