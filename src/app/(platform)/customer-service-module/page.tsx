import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { ServiceDashboard } from "@/components/module-landing/previews/dashboards/ServiceDashboard";
import { servicePage } from "@/data/modules/service";
import { serviceLanding } from "@/data/landing/service";

export const metadata: Metadata = {
  title: "Customer Service",
  description: servicePage.description,
};

/** Platform → Customer Service. The site header and footer (with its CTA) come from the root layout. */
export default function ServicePage() {
  return <ModuleLandingPage data={serviceLanding} preview={<ServiceDashboard />} />;
}
