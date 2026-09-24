import Image from "next/image";
import type { CompanyLogo } from "@/types/common";
import { cn } from "@/lib/utils";

interface LogoCloudProps {
  logos: CompanyLogo[];
  className?: string;
  marquee?: boolean;
}

function LogoItem({ company }: { company: CompanyLogo }) {
  if (company.logo) {
    return (
      <Image
        src={company.logo}
        alt={company.name}
        width={160}
        height={48}
        className="h-8 w-auto shrink-0 object-contain sm:h-11"
      />
    );
  }

  return (
    <span
      className="shrink-0 text-2xl font-bold text-brand-text/70"
      title={`${company.name} (recreated wordmark — logo asset not supplied)`}
    >
      {company.name}
    </span>
  );
}

export function LogoCloud({ logos, className, marquee = false }: LogoCloudProps) {
  if (marquee) {
    return (
      <div className={cn("marquee-mask overflow-hidden", className)}>
        <div className="animate-marquee flex w-max items-center gap-12">
          {[...logos, ...logos].map((company, index) => (
            <LogoItem key={`${company.name}-${index}`} company={company} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-wrap items-center gap-x-12 gap-y-5", className)}>
      {logos.map((company) => (
        <LogoItem key={company.name} company={company} />
      ))}
    </div>
  );
}
