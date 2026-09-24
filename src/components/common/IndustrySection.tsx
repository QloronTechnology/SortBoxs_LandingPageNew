import Link from "next/link";
import type { IndustryItem } from "@/types/common";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routes } from "@/config/routes";

export function IndustrySection({ industries }: { industries: IndustryItem[] }) {
  return (
    <section className="bg-white pt-10 pb-4 lg:pt-12">
      <div className="container-page">
        <SectionHeader
          variant="compact"
          eyebrow="Built for every industry"
          title="Trusted by businesses across all industries."
          action={
            <Link href={routes.industries.all} className="text-sm font-semibold text-brand-purple hover:underline">
              View all<span className="hidden sm:inline"> Industries</span> →
            </Link>
          }
        />
      </div>

      <div className="mt-7">
        <ul className="container-page grid grid-cols-3 gap-y-1 py-3 sm:grid-cols-5 lg:grid-cols-10">
          {industries.map((industry) => {
            const Icon = industry.icon;
            return (
              <li key={industry.name}>
                <Link
                  href={industry.href}
                  className="group flex h-full flex-col items-center gap-2.5 rounded-xl px-1 py-3 text-center transition-colors hover:bg-brand-surface"
                >
                  <Icon
                    className="size-8 text-[#2f3ad6] transition-transform group-hover:-translate-y-0.5"
                    strokeWidth={2}
                    aria-hidden
                  />
                  <span className="text-sm leading-tight font-medium text-brand-text group-hover:text-brand-purple">
                    {industry.name}
                  </span>
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
