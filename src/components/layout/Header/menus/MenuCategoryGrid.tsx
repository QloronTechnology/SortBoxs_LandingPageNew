import Link from "next/link";
import { ArrowRight } from "lucide-react";
import type { MenuCategory } from "@/data/menus/types";
import { cn } from "@/lib/utils";
import { menuFocusRing, toneClasses } from "./menuStyles";

interface NavigateProps {
  onNavigate?: () => void;
}

/**
 * 4 columns × 2 rows of category cards (Solutions, Industries). Column i stacks categories i and
 * i + 4 so the thin dividers run the full height of the grid. Categories beyond the first 8
 * render as a third row of wide cards, each spanning 2 columns with its links in 2 sub-columns.
 */
export function MenuCategoryGrid({ categories, onNavigate }: { categories: MenuCategory[] } & NavigateProps) {
  const main = categories.slice(0, 8);
  const wide = categories.slice(8);
  const columns = [0, 1, 2, 3].map((index) => [main[index], main[index + 4]].filter(Boolean));

  return (
    <div className="min-w-0">
      <div className="grid grid-cols-4">
        {columns.map((column) => (
          <div key={column[0].title} className="flex flex-col gap-7 border-l border-brand-border px-2.5 py-1">
            {column.map((category) => (
              <MenuCategoryBlock key={category.title} category={category} onNavigate={onNavigate} />
            ))}
          </div>
        ))}
      </div>

      {wide.length > 0 && (
        <div className="mt-5 grid grid-cols-2 border-t border-brand-border pt-5">
          {wide.map((category) => (
            <div key={category.title} className="border-l border-brand-border px-2.5">
              <MenuCategoryBlock category={category} onNavigate={onNavigate} linkColumns={2} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

/** Category header (icon LEFT, top-aligned with the title; text RIGHT) followed by its links. */
export function MenuCategoryBlock({
  category,
  onNavigate,
  linkColumns = 1,
}: { category: MenuCategory; linkColumns?: 1 | 2 } & NavigateProps) {
  const { title, description, href, icon: Icon, tone, links } = category;

  return (
    <div>
      <Link href={href} onClick={onNavigate} className={cn("group flex items-start gap-3 rounded-lg", menuFocusRing)}>
        <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", toneClasses[tone])}>
          <Icon className="size-5" aria-hidden />
        </span>
        <span className="min-w-0">
          <span className="block text-lg leading-snug font-semibold text-brand-text group-hover:text-brand-purple">
            {title}
          </span>
          <span className="mt-0.5 block text-sm leading-snug text-brand-muted">{description}</span>
        </span>
      </Link>

      {/* Link list aligns with the column's left edge, as in the designs. */}
      <ul className={cn("mt-3", linkColumns === 2 ? "grid grid-cols-2 gap-x-6" : "flex flex-col")}>
        {links.map((link) => (
          <li key={link.label}>
            <MenuArrowLink href={link.href} label={link.label} onNavigate={onNavigate} />
          </li>
        ))}
      </ul>
    </div>
  );
}

/** Purple link with a trailing → that slides right on hover. 14px below 1700px, 15px above (long labels). */
export function MenuArrowLink({ href, label, onNavigate }: { href: string; label: string } & NavigateProps) {
  return (
    <Link
      href={href}
      onClick={onNavigate}
      className={cn(
        "group flex items-center justify-between gap-1.5 rounded-md py-1.5 text-sm text-brand-purple transition-colors hover:text-brand-purple-dark 3xl:text-[15px]",
        menuFocusRing
      )}
    >
      <span className="min-w-0">{label}</span>
      <ArrowRight className="size-4 shrink-0 transition-transform duration-200 group-hover:translate-x-1" aria-hidden />
    </Link>
  );
}
