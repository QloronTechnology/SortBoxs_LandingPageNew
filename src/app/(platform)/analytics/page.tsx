import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AnalyticsDashboard } from "@/components/module-landing/previews/dashboards/AnalyticsDashboard";
import { analyticsPage } from "@/data/modules/analytics";
import { analyticsLanding } from "@/data/landing/analytics";

export const metadata: Metadata = {
  title: "Analytics",
  description: analyticsPage.description,
};

/** Platform → Analytics. The site header and footer (with its CTA) come from the root layout. */
export default function AnalyticsPage() {
  return <ModuleLandingPage data={analyticsLanding} preview={<AnalyticsDashboard />} />;
}
