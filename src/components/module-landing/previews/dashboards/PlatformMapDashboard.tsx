"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";
import { PreviewFrame } from "../../PreviewFrame";

/** Which modules hand data to which. Illustrative of the connected data model. */
const relations: Record<string, string[]> = {
  crm: ["sales", "marketing", "service", "finance", "analytics"],
  sales: ["crm", "marketing", "finance", "analytics", "commerce"],
  service: ["crm", "ai", "analytics", "automation"],
  hrms: ["finance", "projects", "ai-interview", "analytics", "automation"],
  finance: ["crm", "sales", "procurement", "hrms", "analytics"],
  projects: ["hrms", "finance", "crm", "automation"],
  procurement: ["inventory", "finance", "projects"],
  inventory: ["procurement", "commerce", "finance", "sales"],
  marketing: ["crm", "sales", "analytics", "automation", "ai"],
  analytics: ["crm", "sales", "finance", "hrms", "ai"],
  automation: ["crm", "hrms", "finance", "service", "ai"],
  "ai-interview": ["hrms", "ai"],
  ai: ["crm", "hrms", "finance", "analytics", "automation"],
  commerce: ["inventory", "finance", "crm", "marketing"],
};

const positions = modules.map((_, index) => {
  const angle = (index / modules.length) * Math.PI * 2 - Math.PI / 2;
  return { x: 50 + 42 * Math.cos(angle), y: 50 + 37 * Math.sin(angle) };
});

export function PlatformMapDashboard() {
  const [selected, setSelected] = useState("crm");
  const current = modules.find((module) => module.slug === selected)!;
  const related = relations[selected] ?? [];
  const center = { x: 50, y: 50 };
  const indexOf = (slug: string) => modules.findIndex((module) => module.slug === slug);
  const links = related.map((slug) => modules.find((module) => module.slug === slug)).filter((module) => module !== undefined);

  const insight = `${current.name} shares data with ${related.length} modules, like ${links
    .slice(0, 2)
    .map((module) => module.name)
    .join(" and ")}. Click one to follow it.`;

  return (
    <PreviewFrame title="Platform Map" period="14 modules" insight={insight} badge="One connected platform">
      <div className="relative mt-4 h-[236px] rounded-xl bg-gradient-to-br from-brand-surface to-brand-purple-light">
        <svg aria-hidden viewBox="0 0 100 100" preserveAspectRatio="none" className="absolute inset-0 size-full">
          {positions.map((position, index) => (
            <line key={index} x1={center.x} y1={center.y} x2={position.x} y2={position.y} stroke="#6c35f5" strokeOpacity="0.1" strokeWidth="1" vectorEffect="non-scaling-stroke" />
          ))}
          {related.map((slug) => {
            const position = positions[indexOf(slug)];
            const origin = positions[indexOf(selected)];
            return <line key={slug} x1={origin.x} y1={origin.y} x2={position.x} y2={position.y} stroke="#6c35f5" strokeWidth="1.8" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" />;
          })}
        </svg>

        <div className="absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg shadow-brand-purple/30 ring-2 ring-brand-purple/20">
          <Image src="/images/sortboxs-icon.png" alt="SortBoxs" width={34} height={34} />
        </div>

        {modules.map((module, index) => {
          const isSelected = module.slug === selected;
          const isRelated = related.includes(module.slug);
          return (
            <button
              key={module.slug}
              type="button"
              aria-pressed={isSelected}
              aria-label={module.name}
              title={module.name}
              onClick={() => setSelected(module.slug)}
              style={{ left: `${positions[index].x}%`, top: `${positions[index].y}%` }}
              className={cn(
                "absolute flex size-8 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-white outline-none ring-2 transition-all focus-visible:ring-brand-purple sm:size-9",
                isSelected ? "z-10 scale-125 shadow-xl ring-brand-purple" : isRelated ? "ring-emerald-400" : "opacity-55 ring-brand-border hover:opacity-100"
              )}
            >
              <Image src={module.icon} alt="" width={18} height={18} aria-hidden />
            </button>
          );
        })}
      </div>

      <div key={selected} className="demo-rise mt-3 rounded-xl bg-white p-3 ring-1 ring-brand-border">
        <div className="flex items-start gap-3">
          <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-xl", current.iconBg)}>
            <Image src={current.icon} alt="" width={22} height={22} aria-hidden />
          </span>
          <div className="min-w-0 flex-1">
            <p className="text-[13px] font-extrabold text-brand-text">{current.name}</p>
            <p className="text-[11px] text-brand-muted">{current.tagline}</p>
          </div>
          <Link
            href={current.href}
            className="flex shrink-0 items-center gap-1 rounded-lg bg-brand-purple px-2.5 py-1.5 text-[11px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            Open <ArrowRight className="size-3" aria-hidden />
          </Link>
        </div>
        <div className="mt-2 flex flex-wrap items-center gap-1.5">
          <span className="text-[10px] font-semibold text-brand-muted">Connects with</span>
          {links.map((module) => (
            <button
              key={module.slug}
              type="button"
              onClick={() => setSelected(module.slug)}
              className="rounded-full bg-emerald-50 px-2 py-0.5 text-[10px] font-semibold text-emerald-800 ring-1 ring-emerald-200 outline-none hover:bg-emerald-100 focus-visible:ring-2 focus-visible:ring-brand-purple/60"
            >
              {module.name}
            </button>
          ))}
        </div>
      </div>
    </PreviewFrame>
  );
}
