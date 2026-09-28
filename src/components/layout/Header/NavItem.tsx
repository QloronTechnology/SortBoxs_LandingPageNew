import type { MouseEvent, Ref } from "react";
import { ChevronDown } from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface NavItemTriggerProps {
  ref?: Ref<HTMLButtonElement>;
  label: string;
  isOpen: boolean;
  /** The current page belongs to this tab's section. */
  isActive?: boolean;
  /** id of the menu/panel this trigger opens (for aria-controls). */
  controls: string;
  onClick: (event: MouseEvent<HTMLButtonElement>) => void;
  onMouseEnter: () => void;
}

/** Purple text with a purple underline: marks both the open tab and the current page's tab. */
const highlighted =
  "text-brand-purple after:absolute after:inset-x-3 after:-bottom-px after:h-0.5 after:rounded-full after:bg-brand-purple";

export function NavItemTrigger({
  ref,
  label,
  isOpen,
  isActive = false,
  controls,
  onClick,
  onMouseEnter,
}: NavItemTriggerProps) {
  return (
    <button
      ref={ref}
      type="button"
      aria-expanded={isOpen}
      aria-haspopup="true"
      aria-controls={isOpen ? controls : undefined}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      className={cn(
        "relative flex items-center gap-1.5 rounded-lg px-3 py-2 text-[15px] font-medium text-brand-text transition-colors outline-none hover:text-brand-purple",
        "focus-visible:ring-2 focus-visible:ring-brand-purple/60",
        (isOpen || isActive) && highlighted,
        // Open: light purple tab as well.
        isOpen && "bg-brand-purple-light"
      )}
    >
      {label}
      <ChevronDown className={cn("size-4 transition-transform duration-200", isOpen && "rotate-180")} aria-hidden />
    </button>
  );
}

interface NavItemLinkProps {
  label: string;
  href: string;
  isActive?: boolean;
}

export function NavItemLink({ label, href, isActive = false }: NavItemLinkProps) {
  return (
    <Link
      href={href}
      aria-current={isActive ? "page" : undefined}
      className={cn(
        "relative rounded-lg px-3 py-2 text-[15px] font-medium text-brand-text transition-colors outline-none hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/60",
        isActive && highlighted
      )}
    >
      {label}
    </Link>
  );
}
