import type { ReactNode } from "react";

interface MegaPanelProps {
  id: string;
  label: string;
  children: ReactNode;
}

/**
 * Reusable full-width mega-menu shell that drops in right below the header.
 * `fixed` + `top-full` works because the header's backdrop-blur makes <header> the containing
 * block for fixed descendants, so top-full = the header's bottom edge at any header height.
 * Content is supplied by a per-menu component (see ./menus).
 */
export function MegaPanel({ id, label, children }: MegaPanelProps) {
  return (
    // pt-3 keeps a hover "bridge" between the header and the card so the pointer
    // never crosses dead space on its way down.
    <div id={id} role="region" aria-label={label} className="fixed inset-x-0 top-full z-40 pt-3">
      <div className="container-page">
        <div className="mega-panel-in max-h-[calc(100vh-150px)] overflow-y-auto overscroll-contain rounded-2xl border border-brand-border bg-white shadow-[0_24px_60px_-12px_rgba(23,22,92,0.25)]">
          {children}
        </div>
      </div>
    </div>
  );
}
