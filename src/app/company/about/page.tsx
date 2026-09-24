import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about SortBoxs and our mission to make business impossible-to-be simple.",
};

export default function AboutPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          eyebrow="About Us"
          title="Nothing Impossible to be"
          description="SortBoxs was built on a simple idea: every business, no matter its size, deserves one intelligent platform to run its entire operation — instead of a dozen disconnected tools."
        />
      </Section>
    </>
  );
}
