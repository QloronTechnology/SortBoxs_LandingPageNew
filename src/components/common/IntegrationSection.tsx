import Image from "next/image";
import Link from "next/link";
import type { IntegrationItem } from "@/types/common";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

function IntegrationLogo({ integration }: { integration: IntegrationItem }) {
  return (
    <li
      className={cn(
        "transition-transform duration-200 hover:-translate-y-1",
        // Centre the wordmark on the icons rather than on icon + label.
        integration.wordmark && "mb-[calc(40px*var(--logo-scale))] w-full text-center sm:w-auto"
      )}
    >
      <Image
        src={integration.logo}
        alt={integration.name}
        width={integration.width}
        height={integration.height}
        // Logos ship at design size; --logo-scale shrinks them on narrower screens.
        style={{ height: `calc(${integration.height}px * var(--logo-scale))`, width: "auto" }}
        className="max-w-none"
      />
    </li>
  );
}

export function IntegrationSection({ integrations }: { integrations: IntegrationItem[] }) {
  return (
    <Section className="py-10 lg:py-12">
      <SectionHeader
        variant="compact"
        eyebrow="Integrations"
        title="Connect the tools your team already uses."
        action={
          <Link href={routes.integrations} className="text-sm font-semibold text-brand-purple hover:underline">
            View all<span className="hidden sm:inline"> Integrations</span> →
          </Link>
        }
      />

      <ul className="mt-10 flex flex-wrap items-end justify-center gap-x-8 gap-y-8 [--logo-scale:0.72] sm:gap-x-10 lg:flex-nowrap lg:justify-between lg:gap-x-4 lg:[--logo-scale:0.8] xl:[--logo-scale:0.9] 2xl:[--logo-scale:1]">
        {integrations.map((integration) => (
          <IntegrationLogo key={integration.name} integration={integration} />
        ))}
      </ul>
    </Section>
  );
}
