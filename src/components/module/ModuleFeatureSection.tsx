import { Check } from "lucide-react";
import { ModuleVisual } from "./ModuleHero";
import type { ModulePageData } from "@/types/module";

export function ModuleFeatureSection({ data }: { data: ModulePageData }) {
  return (
    <section className="py-14 lg:py-16">
      <div className="container-page grid grid-cols-1 gap-10 lg:grid-cols-2">
        <ul className="flex flex-col gap-4">
          {data.features.map((feature) => (
            <li key={feature} className="flex items-center gap-3">
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                <Check className="size-3.5" aria-hidden />
              </span>
              <span className="text-[15px] font-medium text-brand-text">{feature}</span>
            </li>
          ))}
        </ul>
        <ModuleVisual src={data.dashboardImage} alt={`${data.name} overview`} />
      </div>
    </section>
  );
}
