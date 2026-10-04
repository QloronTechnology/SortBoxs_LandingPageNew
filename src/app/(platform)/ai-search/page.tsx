import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AISearchDashboard } from "@/components/module-landing/previews/dashboards/AISearchDashboard";
import { aiSearchLanding } from "@/data/landing/ai-search";

export const metadata: Metadata = {
  title: "AI Search",
  description: aiSearchLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → AI Search. The site header and footer come from the root layout. */
export default function AiSearchPage() {
  return <ModuleLandingPage data={aiSearchLanding} preview={<AISearchDashboard />} />;
}
