import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

/**
 * Shared chrome for Start Free's "visual only" panels (SelectedModuleVisualization,
 * WorkspaceProgressVisual) — used both in the drawer's right-hand aside and inline on narrow
 * drawers/mobile.
 */
export function VisualPanel({ children, className }: { children: ReactNode; className?: string }) {
  return <div className={cn("rounded-xl border border-brand-border bg-brand-purple-light/30", className)}>{children}</div>;
}
