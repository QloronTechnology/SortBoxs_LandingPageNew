import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { ResourceCategory, ResourceItem } from "@/types/common";
import { cn } from "@/lib/utils";

// Each resource type gets its own label colour so mixed cards read apart at a glance.
const categoryColor: Record<ResourceCategory, string> = {
  BLOG: "text-brand-purple",
  "CASE STUDY": "text-emerald-600",
  GUIDE: "text-sky-600",
  WEBINAR: "text-amber-600",
};

export function ResourceCard({ resource }: { resource: ResourceItem }) {
  return (
    <div className="flex h-full flex-col rounded-lg border border-brand-border bg-white px-4 py-3.5">
      <p className={cn("text-base font-medium uppercase 3xl:text-xl", categoryColor[resource.category])}>
        {resource.category}
      </p>
      <h3 className="mt-1.5 text-sm leading-snug text-brand-muted 3xl:text-[15px]">{resource.title}</h3>
      <Link
        href={resource.href}
        className="mt-auto inline-flex items-center gap-1.5 pt-2.5 text-sm font-medium text-brand-purple hover:underline 3xl:text-lg"
      >
        Read More <ArrowRight className="size-4" aria-hidden />
      </Link>
    </div>
  );
}
