import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Partners",
  description: "Partner with SortBoxs to bring the complete business platform to your customers.",
};

export default function PartnersPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          eyebrow="Partners"
          title="Grow with the SortBoxs partner program"
          description="Resellers, implementation partners and technology partners — let's build together."
        />
      </Section>
    </>
  );
}
