import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ModuleGrid } from "@/components/common/ModuleGrid";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Features",
  description: "Everything SortBoxs includes to run your entire business from one platform.",
};

export default function FeaturesPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Features"
          title="Everything you need, built in"
          description="From CRM to AI, every feature works together out of the box."
        />
      </Section>
      <Section>
        <ModuleGrid modules={modules} />
      </Section>
    </>
  );
}
