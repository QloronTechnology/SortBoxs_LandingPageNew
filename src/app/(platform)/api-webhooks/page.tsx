import type { Metadata } from "next";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { ApiWebhooksDashboard } from "@/components/module-landing/previews/dashboards/ApiWebhooksDashboard";
import { apiWebhooksLanding } from "@/data/landing/api-webhooks";

export const metadata: Metadata = {
  title: "API & Webhooks",
  description: apiWebhooksLanding.hero.description,
};

/** Platform → Technology & Infrastructure → API & Webhooks. The site header and footer come from the root layout. */
export default function ApiWebhooksPage() {
  return <ModuleLandingPage data={apiWebhooksLanding} preview={<ApiWebhooksDashboard />} />;
}
