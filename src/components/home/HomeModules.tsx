import { SectionHeader } from "@/components/ui/SectionHeader";
import { Section } from "@/components/ui/Section";
import { ModuleGrid } from "@/components/common/ModuleGrid";
import { modules } from "@/data/modules";
import { routes } from "@/config/routes";

export function HomeModules() {
  return (
    <Section>
      <SectionHeader
        eyebrow="Our Modules"
        title="Powerful Modules for Every Business Function"
        action={
          <a href={routes.platform.all} className="text-sm font-semibold text-brand-purple hover:underline">
            View all Modules →
          </a>
        }
      />
      <div className="mt-10">
        <ModuleGrid modules={modules} />
      </div>
    </Section>
  );
}
