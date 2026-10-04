import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { SalesPreview } from "@/components/module-landing/previews/SalesPreview";
import { salesPage } from "@/data/modules/sales";
import { salesLanding } from "@/data/landing/sales";

export const metadata: Metadata = {
  title: "Sales",
  description: salesPage.description,
};

/** Platform → Sales. The site header and footer (with its CTA) come from the root layout. */
export default function SalesPage() {
  return <ModuleLandingPage data={salesLanding} preview={<SalesPreview />} />;
}
