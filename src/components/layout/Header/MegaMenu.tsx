import Link from "next/link";
import type { NavColumn } from "@/types/navigation";

interface MegaMenuProps {
  columns: NavColumn[];
  onNavigate?: () => void;
}

export function MegaMenu({ columns, onNavigate }: MegaMenuProps) {
  return (
    <div
      role="menu"
      className="fixed inset-x-0 top-full z-40 border-t border-brand-border bg-white shadow-xl shadow-brand-navy/5"
    >
      <div className="container-page grid grid-cols-3 gap-8 py-8">
        {columns.map((column) => (
          <div key={column.heading}>
            <p className="mb-4 text-xs font-bold tracking-wider text-brand-muted uppercase">
              {column.heading}
            </p>
            <ul className="flex flex-col gap-1">
              {column.items.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    onClick={onNavigate}
                    role="menuitem"
                    className="group block rounded-lg px-3 py-2.5 -mx-3 transition-colors hover:bg-brand-surface"
                  >
                    <span className="block text-[15px] font-semibold text-brand-text group-hover:text-brand-purple">
                      {item.label}
                    </span>
                    {item.description && (
                      <span className="mt-0.5 block text-sm text-brand-muted">
                        {item.description}
                      </span>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
