import type { Metadata } from "next";
import { ModuleGrid } from "@/components/common/ModuleGrid";
import { ModuleLandingPage } from "@/components/module-landing/ModuleLandingPage";
import { PlatformMapDashboard } from "@/components/module-landing/previews/dashboards/PlatformMapDashboard";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { platformOverviewLanding } from "@/data/landing/platform-overview";
import { modules } from "@/data/modules";

export const metadata: Metadata = {
  title: "Platform",
  description: "Explore all 14 SortBoxs modules. One intelligent platform for your entire business.",
};

/** Platform → Platform Overview. Ends with the full module grid, so every module is one click away. */
export default function PlatformPage() {
  return (
    <>
      <ModuleLandingPage data={platformOverviewLanding} preview={<PlatformMapDashboard />} />
      <Section>
        <SectionHeader
          align="center"
          eyebrow="All modules"
          title="Powerful Modules for Every Business Function"
          description="CRM, Sales, HRMS, Finance, Projects and more, all connected in one intelligent platform."
        />
        <div className="mt-10">
          <ModuleGrid modules={modules} />
        </div>
      </Section>
    </>
  );
}
