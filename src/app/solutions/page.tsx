import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { solutions } from "@/data/solutions";

export const metadata: Metadata = {
  title: "Solutions",
  description: "SortBoxs solutions for startups, small businesses and enterprises.",
};

export default function SolutionsPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Solutions"
          title="Built for businesses of every size"
          description="Whichever stage your business is at, SortBoxs has a solution that fits."
        />
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {solutions.map((solution) => (
            <Link
              key={solution.name}
              href={solution.href}
              className="group rounded-2xl border border-brand-border bg-white p-8 transition-shadow hover:shadow-lg"
            >
              <h3 className="text-xl font-semibold text-brand-text group-hover:text-brand-purple">
                {solution.name}
              </h3>
              <p className="mt-3 text-sm text-brand-muted">{solution.description}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple">
                Learn more <ArrowRight className="size-4" aria-hidden />
              </span>
            </Link>
          ))}
        </div>
      </Section>
    </>
  );
}
