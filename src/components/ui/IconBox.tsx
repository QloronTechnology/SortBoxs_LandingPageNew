import Image from "next/image";
import type { IconType } from "@/types/common";
import { cn } from "@/lib/utils";

interface IconBoxProps {
  icon?: IconType;
  image?: string;
  alt?: string;
  bgClassName?: string;
  size?: "sm" | "md" | "lg";
  className?: string;
}

const sizeMap = {
  sm: { box: "size-9 rounded-lg", icon: 18, iconClass: "size-4" },
  md: { box: "size-12 rounded-xl", icon: 24, iconClass: "size-6" },
  lg: { box: "size-16 rounded-2xl", icon: 32, iconClass: "size-8" },
};

export function IconBox({
  icon: Icon,
  image,
  alt = "",
  bgClassName = "bg-brand-purple-light",
  size = "md",
  className,
}: IconBoxProps) {
  const { box, icon, iconClass } = sizeMap[size];

  return (
    <div
      className={cn(
        "flex shrink-0 items-center justify-center",
        box,
        bgClassName,
        className
      )}
    >
      {image ? (
        <Image src={image} alt={alt} width={icon} height={icon} className="object-contain" />
      ) : Icon ? (
        <Icon className={cn(iconClass, "text-brand-purple")} aria-hidden />
      ) : null}
    </div>
  );
}
