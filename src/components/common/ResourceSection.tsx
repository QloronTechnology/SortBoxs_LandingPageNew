import type { ResourceItem } from "@/types/common";
import { ResourceCard } from "@/components/cards/ResourceCard";

export function ResourceSection({ resources }: { resources: ResourceItem[] }) {
  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text 3xl:text-4xl">
        Latest Resources
      </h2>
      <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-1 3xl:mt-9 3xl:grid-cols-2 3xl:gap-6">
        {resources.map((resource) => (
          <ResourceCard key={resource.title} resource={resource} />
        ))}
      </div>
    </div>
  );
}
