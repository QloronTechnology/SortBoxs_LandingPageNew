import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { NlpDashboard } from "@/components/module-landing/previews/dashboards/NlpDashboard";
import { nlpLanding } from "@/data/landing/nlp";

export const metadata: Metadata = {
  title: "Natural Language Processing",
  description: nlpLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Natural Language Processing. The site header and footer come from the root layout. */
export default function NaturalLanguageProcessingPage() {
  return <ModuleLandingPage data={nlpLanding} preview={<NlpDashboard />} />;
}
