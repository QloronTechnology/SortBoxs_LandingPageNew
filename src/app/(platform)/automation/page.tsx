import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { automationPage } from "@/data/modules/automation";

export const metadata: Metadata = {
  title: "Automation",
  description: automationPage.description,
};

export default function AutomationPage() {
  return <ModulePage data={automationPage} />;
}
