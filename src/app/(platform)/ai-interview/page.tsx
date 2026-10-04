import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AIInterviewDashboard } from "@/components/module-landing/previews/dashboards/AIInterviewDashboard";
import { aiInterviewPage } from "@/data/modules/ai-interview";
import { aiInterviewLanding } from "@/data/landing/ai-interview";

export const metadata: Metadata = {
  title: "AI Interview",
  description: aiInterviewPage.description,
};

/** Platform → AI Interview. The site header and footer (with its CTA) come from the root layout. */
export default function AIInterviewPage() {
  return <ModuleLandingPage data={aiInterviewLanding} preview={<AIInterviewDashboard />} />;
}
