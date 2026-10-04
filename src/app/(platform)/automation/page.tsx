import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { AutomationDashboard } from "@/components/module-landing/previews/dashboards/AutomationDashboard";
import { automationPage } from "@/data/modules/automation";
import { automationLanding } from "@/data/landing/automation";

export const metadata: Metadata = {
  title: "Automation",
  description: automationPage.description,
};

/** Platform → Automation. The site header and footer (with its CTA) come from the root layout. */
export default function AutomationPage() {
  return <ModuleLandingPage data={automationLanding} preview={<AutomationDashboard />} />;
}
