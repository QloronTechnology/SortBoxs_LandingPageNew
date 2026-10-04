"use client";

import { useId, useState } from "react";
import { ArrowRight, User } from "lucide-react";
import { cn } from "@/lib/utils";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Tabs with the cards in the selected tab. Sample data; nothing here is fetched. */
export function ModuleExplorer({ explorer }: { explorer: ModuleLandingData["explorer"] }) {
  const { tabs, label, metricLabel, itemLabel } = explorer;
  const id = useId();
  const [activeKey, setActiveKey] = useState(tabs[0].key);
  const active = tabs.find((tab) => tab.key === activeKey) ?? tabs[0];
  const activeIndex = tabs.indexOf(active);
  const next = tabs[activeIndex + 1];

  return (
    <div className="mt-10 rounded-3xl bg-white p-4 shadow-[0_24px_60px_-34px_rgba(23,22,92,0.45)] ring-1 ring-brand-border sm:p-6">
      <div role="tablist" aria-label={label} className="grid grid-cols-2 gap-2 sm:grid-cols-3 lg:flex">
        {tabs.map((tab, index) => {
          const selected = tab.key === activeKey;
          return (
            <button
              key={tab.key}
              type="button"
              role="tab"
              id={`${id}-tab-${tab.key}`}
              aria-selected={selected}
              aria-controls={`${id}-panel`}
              onClick={() => setActiveKey(tab.key)}
              className={cn(
                "flex flex-col items-start gap-1 rounded-xl px-4 py-3 text-left ring-1 transition-colors outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60 lg:flex-1",
                selected ? "bg-brand-purple-light ring-brand-purple/40" : "bg-white ring-brand-border hover:bg-brand-surface"
              )}
            >
              <span className="flex items-center gap-2 text-sm font-bold text-brand-text">
                <span className={cn("size-2.5 rounded-full", tab.tone)} aria-hidden />
                {tab.label}
              </span>
              <span className="text-xs text-brand-muted">
                {tab.items.length} {itemLabel} · {tab.total}
              </span>
              <span className="sr-only">
                Tab {index + 1} of {tabs.length}
              </span>
            </button>
          );
        })}
      </div>

      <div
        role="tabpanel"
        id={`${id}-panel`}
        aria-labelledby={`${id}-tab-${active.key}`}
        className="mt-5 rounded-2xl bg-brand-surface p-4 sm:p-6"
      >
        <div className="flex flex-wrap items-end justify-between gap-2">
          <div>
            <h3 className="text-lg font-bold text-brand-text">{active.label}</h3>
            <p className="text-sm text-brand-muted">{active.summary}</p>
          </div>
          <p className="text-sm text-brand-muted">
            {metricLabel} <span className="text-xl font-extrabold text-brand-text">{active.total}</span>
          </p>
        </div>

        <ul className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-3">
          {active.items.map((item) => (
            <li key={item.title} className="rounded-xl bg-white p-4 ring-1 ring-brand-border">
              <div className="flex items-center justify-between gap-3">
                <p className="truncate font-semibold text-brand-text">{item.title}</p>
                <p className="shrink-0 font-bold text-brand-purple">{item.value}</p>
              </div>
              <p className="mt-1 flex items-center gap-1.5 text-xs text-brand-muted">
                <User className="size-3.5 shrink-0" aria-hidden /> {item.meta}
              </p>
              <p className="mt-3 rounded-lg bg-brand-surface px-3 py-2 text-xs text-brand-text">{item.note}</p>
            </li>
          ))}
        </ul>

        {next && (
          <button
            type="button"
            onClick={() => setActiveKey(next.key)}
            className="mt-4 ml-auto flex items-center gap-1.5 rounded-lg px-3 py-2 text-sm font-semibold text-brand-purple outline-none hover:bg-white focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            Next: {next.label} <ArrowRight className="size-4" aria-hidden />
          </button>
        )}
      </div>
    </div>
  );
}
