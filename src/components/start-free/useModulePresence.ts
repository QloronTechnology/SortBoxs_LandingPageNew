import { useEffect, useState } from "react";
import type { ModuleSummary } from "@/types/module";

export type PresencePhase = "enter" | "present" | "exit";

export interface PresentModule {
  module: ModuleSummary;
  phase: PresencePhase;
}

/**
 * Keeps a module in the list (in an "exit" phase) for `exitMs` after it's deselected, so the hub
 * visualization can animate it out instead of snapping it away. A newly selected module starts in
 * "enter" for one tick, then flips to "present" so its mount transition has a starting state to animate
 * from.
 */
export function useModulePresence(modules: ModuleSummary[], exitMs = 300): PresentModule[] {
  const key = modules
    .map((module) => module.slug)
    .sort()
    .join(",");
  const [prevKey, setPrevKey] = useState(key);
  const [items, setItems] = useState<PresentModule[]>(() => modules.map((module) => ({ module, phase: "present" })));

  // Syncing internal state to a changed prop: adjust it during render (React's documented pattern for
  // this), rather than resetting it from an effect.
  if (key !== prevKey) {
    setPrevKey(key);
    setItems((prev) => {
      const prevSlugs = new Set(prev.map((item) => item.module.slug));
      const nextSlugs = new Set(modules.map((module) => module.slug));
      const kept = prev
        .filter((item) => item.phase !== "exit" || nextSlugs.has(item.module.slug))
        .map((item) => (nextSlugs.has(item.module.slug) ? item : { ...item, phase: "exit" as const }));
      const added: PresentModule[] = modules
        .filter((module) => !prevSlugs.has(module.slug))
        .map((module) => ({ module, phase: "enter" as const }));
      return [...kept, ...added];
    });
  }

  useEffect(() => {
    const timers: ReturnType<typeof setTimeout>[] = [];

    const entering = items.filter((item) => item.phase === "enter");
    if (entering.length > 0) {
      timers.push(
        setTimeout(() => {
          setItems((prev) => prev.map((item) => (item.phase === "enter" ? { ...item, phase: "present" } : item)));
        }, 20)
      );
    }

    items
      .filter((item) => item.phase === "exit")
      .forEach((item) => {
        timers.push(
          setTimeout(() => {
            setItems((prev) => prev.filter((p) => !(p.module.slug === item.module.slug && p.phase === "exit")));
          }, exitMs)
        );
      });

    return () => timers.forEach(clearTimeout);
  }, [items, exitMs]);

  return items;
}
