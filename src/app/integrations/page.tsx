import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IntegrationCard } from "@/components/cards/IntegrationCard";
import { integrations } from "@/data/integrations";

export const metadata: Metadata = {
  title: "Integrations",
  description: "Connect SortBoxs with the tools your team already uses.",
};

export default function IntegrationsPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Integrations"
          title="Connect the tools your team already uses."
          description="SortBoxs integrates with the productivity, communication and commerce tools your business relies on every day."
        />
      </Section>
      <Section>
        <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
          {integrations.map((integration) => (
            <IntegrationCard key={integration.name} integration={integration} />
          ))}
        </div>
      </Section>
    </>
  );
}
