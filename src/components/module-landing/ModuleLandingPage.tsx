import type { ReactNode } from "react";
import { IndustrySection } from "@/components/common/IndustrySection";
import { industries } from "@/data/industries";
import type { ModuleLandingData } from "@/types/moduleLanding";
import { ModuleLandingHero } from "./ModuleLandingHero";
import { AIInsights, Capabilities, Connected, Explorer, Lifecycle } from "./ModuleLandingSections";

/** Platform module page: hero (with a module-specific `preview`), then the same sections for every module. */
export function ModuleLandingPage({
  data,
  preview,
  lifecycle,
}: {
  data: ModuleLandingData;
  preview: ReactNode;
  /** Replaces the standard step row, for pages that tell their story with a richer graphic. */
  lifecycle?: ReactNode;
}) {
  return (
    <>
      <ModuleLandingHero data={data} preview={preview} />
      {lifecycle ?? <Lifecycle data={data.lifecycle} />}
      <Explorer data={data.explorer} />
      <Capabilities data={data.capabilities} />
      <AIInsights data={data.ai} />
      <IndustrySection industries={industries} variant="cards" className="pt-16 pb-12 lg:pt-20 lg:pb-16" />
      <Connected data={data.connected} />
    </>
  );
}
