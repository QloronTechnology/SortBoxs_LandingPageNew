import type { Metadata } from "next";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Use Cases",
  description: "See how businesses of every size use SortBoxs to run their operations.",
};

export default function UseCasesPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Use Cases"
          title="How businesses use SortBoxs"
          description="From startups to enterprises, teams use SortBoxs to unify their operations."
        />
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <div key={solution.name} className="rounded-2xl border border-brand-border bg-white p-8">
              <h3 className="text-xl font-semibold text-brand-text">{solution.name}</h3>
              <p className="mt-3 text-sm text-brand-muted">{solution.description}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
