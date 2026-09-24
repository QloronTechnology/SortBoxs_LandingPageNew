import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ModuleGrid } from "@/components/common/ModuleGrid";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Platform",
  description: "Explore all 14 SortBoxs modules — one intelligent platform for your entire business.",
};

export default function PlatformPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Platform"
          title="Powerful Modules for Every Business Function"
          description="CRM, Sales, HRMS, Finance, Projects and more — all connected in one intelligent platform."
        />
      </Section>
      <Section>
        <ModuleGrid modules={modules} />
      </Section>
    </>
  );
}
