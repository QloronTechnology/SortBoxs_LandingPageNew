import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { CommerceDashboard } from "@/components/module-landing/previews/dashboards/CommerceDashboard";
import { commercePage } from "@/data/modules/commerce";
import { commerceLanding } from "@/data/landing/commerce";

export const metadata: Metadata = {
  title: "Commerce",
  description: commercePage.description,
};

/** Platform → Commerce. The site header and footer (with its CTA) come from the root layout. */
export default function CommercePage() {
  return <ModuleLandingPage data={commerceLanding} preview={<CommerceDashboard />} />;
}
