import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AIAnalyticsDashboard } from "@/components/module-landing/previews/dashboards/AIAnalyticsDashboard";
import { aiAnalyticsLanding } from "@/data/landing/ai-analytics";

export const metadata: Metadata = {
  title: "AI Analytics",
  description: aiAnalyticsLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → AI Analytics. The site header and footer come from the root layout. */
export default function AiAnalyticsPage() {
  return <ModuleLandingPage data={aiAnalyticsLanding} preview={<AIAnalyticsDashboard />} />;
}
