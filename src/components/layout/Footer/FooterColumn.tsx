import Link from "next/link";
import { cn } from "@/lib/utils";

interface FooterColumnProps {
  heading: string;
  links: { label: string; href: string }[];
  dark?: boolean;
}

export function FooterColumn({ heading, links, dark = false }: FooterColumnProps) {
  return (
    <div>
      <p className={cn("mb-4 font-semibold", dark ? "text-white" : "text-brand-text")}>{heading}</p>
      <ul className="flex flex-col gap-3">
        {links.map((link) => (
          <li key={link.label}>
            <Link
              href={link.href}
              className={cn(
                "text-sm transition-colors",
                dark ? "text-white/65 hover:text-white" : "text-brand-muted hover:text-brand-purple"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
