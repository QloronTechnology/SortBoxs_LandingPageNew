import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";

export const metadata: Metadata = {
  title: "Newsroom",
  description: "The latest news and announcements from SortBoxs.",
};

export default function NewsroomPage() {
  return (
    <Section className="bg-brand-surface">
      <SectionHeader
        eyebrow="Newsroom"
        title="Latest news from SortBoxs"
        description="Announcements and press coverage will be published here."
      />
    </Section>
  );
}
