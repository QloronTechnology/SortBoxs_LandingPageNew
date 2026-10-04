import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AIRecommendationsDashboard } from "@/components/module-landing/previews/dashboards/AIRecommendationsDashboard";
import { aiRecommendationsLanding } from "@/data/landing/ai-recommendations";

export const metadata: Metadata = {
  title: "AI Recommendations",
  description: aiRecommendationsLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → AI Recommendations. The site header and footer come from the root layout. */
export default function AiRecommendationsPage() {
  return <ModuleLandingPage data={aiRecommendationsLanding} preview={<AIRecommendationsDashboard />} />;
}
