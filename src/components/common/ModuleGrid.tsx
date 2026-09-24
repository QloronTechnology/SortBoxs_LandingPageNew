import type { ModuleSummary } from "@/types/module";
import { ModuleCard } from "@/components/cards/ModuleCard";

export function ModuleGrid({ modules }: { modules: ModuleSummary[] }) {
  return (
    <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-7">
      {modules.map((module) => (
        <ModuleCard key={module.slug} module={module} />
      ))}
    </div>
  );
}
