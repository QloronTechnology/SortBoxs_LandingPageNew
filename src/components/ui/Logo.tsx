import Image from "next/image";
import Link from "next/link";
import { assets } from "@/config/assets";
import { site } from "@/config/site";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  width?: number;
  height?: number;
}

export function Logo({ className, width = 168, height = 52 }: LogoProps) {
  return (
    <Link href={routes.home} className={cn("inline-flex items-center", className)}>
      <Image
        src={assets.brand.logo}
        alt={site.name}
        width={width}
        height={height}
        priority
        className="h-auto w-auto"
      />
    </Link>
  );
}
