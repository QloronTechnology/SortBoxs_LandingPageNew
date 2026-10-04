import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { SetupJourneyDashboard } from "@/components/module-landing/previews/dashboards/SetupJourneyDashboard";
import { howItWorksLanding } from "@/data/landing/how-it-works";

export const metadata: Metadata = {
  title: "How It Works",
  description: howItWorksLanding.hero.description,
};

/** Platform → How It Works. The site header and footer come from the root layout. */
export default function HowItWorksPage() {
  return <ModuleLandingPage data={howItWorksLanding} preview={<SetupJourneyDashboard />} />;
}
