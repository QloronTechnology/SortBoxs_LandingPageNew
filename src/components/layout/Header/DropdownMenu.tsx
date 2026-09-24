import Link from "next/link";
import type { NavColumn } from "@/types/navigation";

interface DropdownMenuProps {
  columns: NavColumn[];
  onNavigate?: () => void;
}

export function DropdownMenu({ columns, onNavigate }: DropdownMenuProps) {
  return (
    <div
      role="menu"
      className="absolute top-full left-0 z-40 mt-2 min-w-64 rounded-2xl border border-brand-border bg-white p-2 shadow-xl shadow-brand-navy/10"
    >
      {columns.map((column) => (
        <ul key={column.heading} className="flex flex-col">
          {column.items.map((item) => (
            <li key={item.href}>
              <Link
                href={item.href}
                onClick={onNavigate}
                role="menuitem"
                className="block rounded-xl px-4 py-2.5 text-[15px] font-medium text-brand-text transition-colors hover:bg-brand-surface hover:text-brand-purple"
              >
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      ))}
    </div>
  );
}
