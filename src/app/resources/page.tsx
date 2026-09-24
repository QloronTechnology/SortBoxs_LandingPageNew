import type { Metadata } from "next";
import Link from "next/link";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { ResourceCard } from "@/components/cards/ResourceCard";
import { resources } from "@/data/resources";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Resources",
  description: "Guides, blogs and webinars to help you get the most out of SortBoxs.",
};

const categories = [
  { label: "Blog", href: routes.resources.blog },
  { label: "Guides", href: routes.resources.guides },
  { label: "Webinars", href: routes.resources.webinars },
  { label: "Case Studies", href: routes.resources.caseStudies },
  { label: "Help Center", href: routes.resources.helpCenter },
  { label: "API Documentation", href: routes.resources.apiDocumentation },
];

export default function ResourcesPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Resources"
          title="Guides, insights and updates"
          description="Everything you need to get more out of SortBoxs."
        />
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          {categories.map((category) => (
            <Link
              key={category.href}
              href={category.href}
              className="rounded-full border border-brand-border bg-white px-4 py-2 text-sm font-semibold text-brand-text hover:border-brand-purple hover:text-brand-purple"
            >
              {category.label}
            </Link>
          ))}
        </div>
      </Section>
      <Section>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {resources.map((resource) => (
            <ResourceCard key={resource.title} resource={resource} />
          ))}
        </div>
      </Section>
    </>
  );
}
