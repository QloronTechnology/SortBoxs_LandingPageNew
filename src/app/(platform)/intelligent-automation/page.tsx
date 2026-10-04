import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { IntelligentAutomationDashboard } from "@/components/module-landing/previews/dashboards/IntelligentAutomationDashboard";
import { intelligentAutomationLanding } from "@/data/landing/intelligent-automation";

export const metadata: Metadata = {
  title: "Intelligent Automation",
  description: intelligentAutomationLanding.hero.description,
};

/** Platform → AI-Powered Capabilities → Intelligent Automation. The site header and footer come from the root layout. */
export default function IntelligentAutomationPage() {
  return <ModuleLandingPage data={intelligentAutomationLanding} preview={<IntelligentAutomationDashboard />} />;
}
