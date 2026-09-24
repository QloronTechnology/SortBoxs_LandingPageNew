import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { IndustryCard } from "@/components/cards/IndustryCard";
import { industries } from "@/data/industries";

export const metadata: Metadata = {
  title: "Industries",
  description: "SortBoxs is trusted by businesses across every industry.",
};

export default function IndustriesPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Industries"
          title="Trusted by businesses across all industries"
          description="From technology to healthcare, SortBoxs adapts to the way your industry works."
        />
      </Section>
      <Section>
        <div className="grid grid-cols-2 gap-2 sm:grid-cols-5">
          {industries.map((industry) => (
            <IndustryCard key={industry.name} industry={industry} />
          ))}
        </div>
      </Section>
    </>
  );
}
