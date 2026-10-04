"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Sparkles } from "lucide-react";
import type { ModuleSummary } from "@/types/module";
import { moduleFlows } from "@/data/startFree";
import { cn } from "@/lib/utils";
import { useModulePresence } from "./useModulePresence";
import { VisualPanel } from "./VisualPanel";

const OUTER_R = 38;

function polar(index: number, count: number, radius: number) {
  const angle = (index / count) * Math.PI * 2 - Math.PI / 2; // 12 o'clock, clockwise
  return { x: 50 + radius * Math.cos(angle), y: 50 + radius * Math.sin(angle) };
}

/**
 * Live preview of the workspace the user is configuring on Start Free's Workspace Setup step — driven
 * entirely by `selectedModules` (the same ModuleSummary objects used by the left-hand module selector,
 * from data/modules.ts). One SortBoxs hub, with each selected module orbiting it on a spoke — the same
 * hub-and-ring language as the homepage's "Everything your business needs, connected" section
 * (EcosystemParallax.tsx), scaled down for the drawer.
 */
export function SelectedModuleVisualization({ selectedModules }: { selectedModules: ModuleSummary[] }) {
  return (
    <VisualPanel className="flex min-h-[320px] flex-col justify-center p-6">
      <OrbitStage modules={selectedModules} />
      <Caption modules={selectedModules} />
    </VisualPanel>
  );
}

function OrbitStage({ modules }: { modules: ModuleSummary[] }) {
  const items = useModulePresence(modules);
  const count = items.length;

  return (
    <div className="relative mx-auto aspect-square w-full max-w-[220px]">
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden>
        {count > 0 && (
          <circle cx="50" cy="50" r={OUTER_R} fill="none" stroke="#6c35f5" strokeOpacity="0.15" strokeWidth="0.6" strokeDasharray="1.2 2.4" />
        )}
        {items.map(({ module, phase }, index) => {
          const { x, y } = polar(index, count, OUTER_R);
          const visible = phase === "present";
          return (
            <line
              key={module.slug}
              x1={50}
              y1={50}
              x2={x}
              y2={y}
              stroke="#6c35f5"
              strokeWidth="0.6"
              strokeOpacity={visible ? 0.45 : 0}
              className="transition-opacity duration-500"
            />
          );
        })}
      </svg>

      {/* Orbiting accent dot — purely decorative, a sign of life once a workspace exists. */}
      {count > 0 && (
        <div className="pointer-events-none absolute inset-0 animate-spin-slow" aria-hidden>
          <span
            className="absolute left-1/2 size-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-brand-purple shadow-[0_0_8px_2px_rgba(108,53,245,0.5)]"
            style={{ top: `${50 - OUTER_R}%` }}
          />
        </div>
      )}

      {/* Hub. */}
      <div className="absolute inset-[30%] flex flex-col items-center justify-center rounded-full border border-brand-purple/30 bg-gradient-to-b from-white to-brand-purple-light shadow-[0_8px_28px_-6px_rgba(108,53,245,0.4)]">
        <span className={cn("flex items-center justify-center rounded-full bg-brand-purple text-white", count === 0 ? "size-9 animate-pulse-ring" : "size-8")}>
          <Sparkles className="size-4" aria-hidden />
        </span>
        <span className="mt-1 text-center text-[9px] leading-tight font-bold text-brand-text">
          SortBoxs
          <br />
          Platform
        </span>
      </div>

      {/* Module nodes. */}
      {items.map(({ module, phase }, index) => {
        const { x, y } = polar(index, count, OUTER_R);
        return (
          <div
            key={module.slug}
            className={cn(
              "absolute flex -translate-x-1/2 -translate-y-1/2 flex-col items-center gap-1 transition-all duration-500 ease-out",
              phase === "present" ? "scale-100 opacity-100" : "scale-50 opacity-0"
            )}
            style={{ left: `${x}%`, top: `${y}%` }}
          >
            <span className={cn("flex size-9 items-center justify-center rounded-full border-2 border-white shadow-md", module.iconBg)}>
              <Image src={module.icon} alt="" width={16} height={16} aria-hidden />
            </span>
            <span className="rounded-full bg-white px-1.5 py-0.5 text-[9px] font-semibold whitespace-nowrap text-brand-text shadow-sm">
              {module.name}
            </span>
          </div>
        );
      })}
    </div>
  );
}

function Caption({ modules }: { modules: ModuleSummary[] }) {
  if (modules.length === 0) {
    return (
      <div className="mt-5 text-center">
        <p className="text-sm font-bold text-brand-text">SortBoxs Platform</p>
        <p className="mt-1 text-sm text-brand-muted">Select modules to build your workspace</p>
      </div>
    );
  }

  if (modules.length === 1) {
    // Remounts (resetting the flow animation) whenever the single selected module changes.
    return <SingleModuleDetail key={modules[0].slug} module={modules[0]} />;
  }

  return (
    <p className="mt-5 text-center text-sm text-brand-muted">
      <span className="font-semibold text-brand-text">{modules.length} modules</span> connected to your workspace
    </p>
  );
}

function SingleModuleDetail({ module }: { module: ModuleSummary }) {
  const steps = moduleFlows[module.slug] ?? [];
  const [active, setActive] = useState(0);

  useEffect(() => {
    if (steps.length === 0) return;
    const id = setInterval(() => setActive((a) => (a + 1) % steps.length), 1100);
    return () => clearInterval(id);
  }, [steps.length]);

  return (
    <div className="mt-5">
      <p className="text-center text-sm font-bold text-brand-text">{module.name}</p>
      <p className="mt-0.5 text-center text-xs text-brand-muted">{module.description}</p>

      {steps.length > 0 && (
        <div className="mt-4 flex flex-wrap items-center justify-center gap-x-1 gap-y-2">
          {steps.map((step, i) => (
            <div key={step} className="flex items-center gap-1">
              {i > 0 && (
                <span className={cn("h-px w-3 transition-colors duration-500", i <= active ? "bg-brand-purple" : "bg-brand-border")} />
              )}
              <span
                className={cn(
                  "rounded-full border px-2.5 py-1 text-[11px] font-medium whitespace-nowrap transition-all duration-500",
                  i === active
                    ? "scale-105 border-brand-purple bg-brand-purple text-white shadow-sm shadow-brand-purple/30"
                    : "border-brand-border bg-white text-brand-muted"
                )}
              >
                {step}
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
