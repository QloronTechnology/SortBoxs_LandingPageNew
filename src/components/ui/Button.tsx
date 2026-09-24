import Link from "next/link";
import type { AnchorHTMLAttributes, ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";
import type { IconType } from "@/types/common";

type Variant = "primary" | "secondary" | "outline" | "ghost" | "dark";
type Size = "sm" | "md" | "lg";

interface BaseProps {
  variant?: Variant;
  size?: Size;
  icon?: IconType;
  iconPosition?: "left" | "right";
  className?: string;
  children: ReactNode;
}

type ButtonAsLink = BaseProps &
  AnchorHTMLAttributes<HTMLAnchorElement> & {
    href: string;
  };

type ButtonAsButton = BaseProps &
  ButtonHTMLAttributes<HTMLButtonElement> & {
    href?: undefined;
  };

export type ButtonProps = ButtonAsLink | ButtonAsButton;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand-purple text-white hover:bg-brand-purple-dark shadow-sm shadow-brand-purple/20",
  secondary: "bg-brand-purple-light text-brand-purple hover:bg-brand-purple/15",
  outline: "border border-brand-purple text-brand-purple hover:bg-brand-purple-light",
  ghost: "text-brand-text hover:bg-brand-surface",
  dark: "bg-brand-navy text-white hover:bg-brand-navy/90",
};

const sizeClasses: Record<Size, string> = {
  sm: "text-sm px-4 py-2 gap-1.5 rounded-lg",
  md: "text-[15px] px-6 py-3 gap-2 rounded-xl",
  lg: "text-base px-8 py-4 gap-2.5 rounded-xl",
};

export function Button({
  variant = "primary",
  size = "md",
  icon: Icon,
  iconPosition = "right",
  className,
  children,
  href,
  ...rest
}: ButtonProps) {
  const classes = cn(
    "inline-flex items-center justify-center font-semibold transition-colors whitespace-nowrap",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {Icon && iconPosition === "left" && <Icon className="size-4" aria-hidden />}
      {children}
      {Icon && iconPosition === "right" && <Icon className="size-4" aria-hidden />}
    </>
  );

  if (href) {
    return (
      <Link href={href} className={classes} {...(rest as AnchorHTMLAttributes<HTMLAnchorElement>)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={classes} {...(rest as ButtonHTMLAttributes<HTMLButtonElement>)}>
      {content}
    </button>
  );
}
