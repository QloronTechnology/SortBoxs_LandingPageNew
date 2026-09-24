import type { Metadata } from "next";
import { ModulePage } from "@/components/module/ModulePage";
import { crmPage } from "@/data/modules/crm";

export const metadata: Metadata = {
  title: "CRM",
  description: crmPage.description,
};

export default function CRMPage() {
  return <ModulePage data={crmPage} />;
}
