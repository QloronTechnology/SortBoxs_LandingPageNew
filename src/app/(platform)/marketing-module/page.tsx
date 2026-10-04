import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { MarketingDashboard } from "@/components/module-landing/previews/dashboards/MarketingDashboard";
import { marketingPage } from "@/data/modules/marketing";
import { marketingLanding } from "@/data/landing/marketing";

export const metadata: Metadata = {
  title: "Marketing",
  description: marketingPage.description,
};

/** Platform → Marketing. The site header and footer (with its CTA) come from the root layout. */
export default function MarketingPage() {
  return <ModuleLandingPage data={marketingLanding} preview={<MarketingDashboard />} />;
}
