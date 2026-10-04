import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AIAssistantDashboard } from "@/components/module-landing/previews/dashboards/AIAssistantDashboard";
import { aiPage } from "@/data/modules/ai";
import { aiLanding } from "@/data/landing/ai";

export const metadata: Metadata = {
  title: "AI Assistant",
  description: aiPage.description,
};

/** Platform → AI Assistant. The site header and footer (with its CTA) come from the root layout. */
export default function AIPage() {
  return <ModuleLandingPage data={aiLanding} preview={<AIAssistantDashboard />} />;
}
