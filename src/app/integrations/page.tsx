import type { Metadata } from "next";
import { IntegrationCard } from "@/components/cards/IntegrationCard";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { IntegrationHubDashboard } from "@/components/module-landing/previews/dashboards/IntegrationHubDashboard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { integrations } from "@/data/integrations";
import { integrationsLanding } from "@/data/landing/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect SortBoxs with the tools your team already uses.",
};

/** Platform → Integrations. Ends with the logo wall of every connected app. */
export default function IntegrationsPage() {
  return (
    <>
      <ModuleLandingPage data={integrationsLanding} preview={<IntegrationHubDashboard />} />
      <Section>
        <SectionHeader
          align="center"
          eyebrow="Works with"
          title="Connect the tools your team already uses."
          description="SortBoxs integrates with the productivity, communication and commerce tools your business relies on every day."
        />
        <div className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} integration={integration} />
          ))}
        </div>
      </Section>
    </>
  );
}
