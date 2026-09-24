import Link from "next/link";
import type { IndustryItem } from "@/types/common";

export function IndustryCard({ industry }: { industry: IndustryItem }) {
  const Icon = industry.icon;

  return (
    <Link
      href={industry.href}
      className="group flex flex-col items-center gap-3 rounded-2xl px-3 py-5 text-center transition-colors hover:bg-brand-surface"
    >
      <span className="flex size-12 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white">
        <Icon className="size-6" aria-hidden />
      </span>
      <span className="text-sm font-semibold text-brand-text">{industry.name}</span>
    </Link>
  );
}
