import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { CrmPreview } from "@/components/module-landing/previews/CrmPreview";
import { crmPage } from "@/data/modules/crm";
import { crmLanding } from "@/data/landing/crm";

export const metadata: Metadata = {
  title: "CRM",
  description: crmPage.description,
};

/** Platform → CRM. The site header and footer (with its CTA) come from the root layout. */
export default function CRMPage() {
  return <ModuleLandingPage data={crmLanding} preview={<CrmPreview />} />;
}
