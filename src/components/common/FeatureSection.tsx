import Image from "next/image";
import { Check } from "lucide-react";
import type { ReactNode } from "react";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

interface FeatureSectionProps {
  icon?: string;
  badge: string;
  title: string;
  description: string;
  features: string[];
  cta: { label: string; href: string };
  visual?: string;
  visualAlt?: string;
  visualNode?: ReactNode;
  reversed?: boolean;
  background?: "white" | "surface";
}

export function FeatureSection({
  icon,
  badge,
  title,
  description,
  features,
  cta,
  visual,
  visualAlt = "",
  visualNode,
  reversed = false,
  background = "surface",
}: FeatureSectionProps) {
  return (
    <section className={cn("py-14 lg:py-16", background === "surface" && "bg-brand-surface")}>
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-12 lg:gap-8">
        <div className={cn("lg:col-span-4", reversed && "lg:order-2")}>
          <div className="mb-5 flex items-center gap-3">
            <IconBox image={icon} size="md" />
            <Badge>{badge}</Badge>
          </div>
          <h2 className="text-3xl font-bold text-brand-text sm:text-4xl">{title}</h2>
          <p className="mt-4 text-base text-brand-muted">{description}</p>
          <Button href={cta.href} className="mt-7">
            {cta.label}
          </Button>
        </div>

        <div className={cn("lg:col-span-3", reversed && "lg:order-1")}>
          <ul className="flex flex-col gap-4">
            {features.map((feature) => (
              <li key={feature} className="flex items-center gap-3">
                <span className="flex size-6 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                  <Check className="size-3.5" aria-hidden />
                </span>
                <span className="text-[15px] font-medium text-brand-text">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-5">
          {visualNode ? (
            visualNode
          ) : visual ? (
            <div className="overflow-hidden rounded-2xl border border-brand-border bg-white p-2 shadow-sm">
              <Image
                src={visual}
                alt={visualAlt}
                width={640}
                height={420}
                className="h-auto w-full rounded-xl object-contain"
              />
            </div>
          ) : null}
        </div>
      </div>
    </section>
  );
}
