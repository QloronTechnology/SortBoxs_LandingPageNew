import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ContactForm } from "@/components/common/ContactForm";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with the SortBoxs team.",
};

export default function ContactPage() {
  return (
    <Section className="bg-brand-surface">
      <SectionHeader
        eyebrow="Support"
        title="We're here to help"
        description="Reach out and our team will get back to you shortly."
      />
      <ContactForm />
    </Section>
  );
}
