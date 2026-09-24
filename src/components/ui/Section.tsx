import type { HTMLAttributes } from "react";
import { cn } from "@/lib/utils";

interface SectionProps extends HTMLAttributes<HTMLElement> {
  as?: "section" | "div";
  containerClassName?: string;
}

export function Section({
  as: Component = "section",
  className,
  containerClassName,
  children,
  ...rest
}: SectionProps) {
  return (
    <Component className={cn("py-16 lg:py-20", className)} {...rest}>
      <div className={cn("container-page", containerClassName)}>{children}</div>
    </Component>
  );
}
