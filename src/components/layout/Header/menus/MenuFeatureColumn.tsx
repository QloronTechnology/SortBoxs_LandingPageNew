import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MenuFeatureColumn as MenuFeatureColumnData } from "@/data/menus/types";
import { cn } from "@/lib/utils";
import { menuEyebrow, menuFocusRing, toneClasses } from "./menuStyles";

const sizes = {
  // Platform: dense 12-item columns.
  compact: {
    row: "gap-3 rounded-xl px-2 py-1.5",
    icon: "size-10",
    glyph: "size-5",
    title: "text-sm",
    description: "text-xs",
    arrow: "text-brand-muted",
  },
  // AI: fewer items, more breathing room.
  roomy: {
    row: "gap-3 rounded-xl px-2 py-1.5 3xl:gap-3.5 3xl:py-2",
    icon: "size-11",
    glyph: "size-5",
    title: "text-sm 3xl:text-[15px]",
    description: "text-[13px]",
    arrow: "text-brand-purple",
  },
} as const;

/** Mega-menu column of icon rows (title + description + sliding arrow), with an optional header link. */
export function MenuFeatureColumn({
  column,
  onNavigate,
  size = "compact",
  className,
}: {
  column: MenuFeatureColumnData;
  onNavigate?: () => void;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const s = sizes[size];

  return (
    <div className={className}>
      <div className="flex items-center justify-between gap-2 px-2 pt-1">
        <p className={menuEyebrow}>{column.heading}</p>
        {column.action && (
          <Link
            href={column.action.href}
            onClick={onNavigate}
            className={cn(
              "flex shrink-0 items-center gap-1 rounded text-xs font-medium text-brand-purple hover:underline",
              menuFocusRing
            )}
          >
            {column.action.label} <ArrowRight className="size-3" aria-hidden />
          </Link>
        )}
      </div>

      <ul className="mt-2 flex flex-col">
        {column.items.map(({ label, description, href, icon: Icon, tone }) => (
          <li key={label}>
            <Link
              href={href}
              onClick={onNavigate}
              className={cn("group flex items-center transition-colors hover:bg-slate-50", s.row, menuFocusRing)}
            >
              <span className={cn("flex shrink-0 items-center justify-center rounded-xl", s.icon, toneClasses[tone])}>
                <Icon className={s.glyph} aria-hidden />
              </span>
              <span className="min-w-0 flex-1">
                <span className={cn("block font-semibold text-brand-text group-hover:text-brand-purple", s.title)}>
                  {label}
                </span>
                <span className={cn("line-clamp-2 block leading-snug text-brand-muted", s.description)}>
                  {description}
                </span>
              </span>
              <ArrowRight
                className={cn(
                  "size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1 group-hover:text-brand-purple",
                  s.arrow
                )}
                aria-hidden
              />
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
