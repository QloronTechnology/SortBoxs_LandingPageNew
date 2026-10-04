import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { GenerativeAIDashboard } from "@/components/module-landing/previews/dashboards/GenerativeAIDashboard";
import { generativeAiLanding } from "@/data/landing/generative-ai";

export const metadata: Metadata = {
  title: "Generative AI",
  description: generativeAiLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Generative AI. The site header and footer come from the root layout. */
export default function GenerativeAiPage() {
  return <ModuleLandingPage data={generativeAiLanding} preview={<GenerativeAIDashboard />} />;
}
