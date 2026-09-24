import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Careers",
  description: "Join the SortBoxs team and help build the future of business software.",
};

export default function CareersPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          eyebrow="Careers"
          title="Build the future of business software"
          description="We're always looking for people who want to help businesses do the impossible. Open roles will be listed here soon."
        />
      </Section>
    </>
  );
}
