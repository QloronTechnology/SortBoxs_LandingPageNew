import type { Metadata } from "next";
import { HomeSecurity } from "@/components/home/HomeSecurity";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Security",
  description: "Enterprise-grade security practices that protect your business data.",
};

export default function SecurityPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Security"
          title="Enterprise-Grade Security"
          description="Your data is protected with industry-leading security practices at every layer."
        />
      </Section>
      <HomeSecurity />
    </>
  );
}
