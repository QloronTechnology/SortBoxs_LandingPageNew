import { ModuleHero } from "./ModuleHero";
import { ModuleFeatureSection } from "./ModuleFeatureSection";
import type { ModulePageData } from "@/types/module";

export function ModulePage({ data }: { data: ModulePageData }) {
  return (
    <>
      <ModuleHero data={data} />
      <ModuleFeatureSection data={data} />
    </>
  );
}
