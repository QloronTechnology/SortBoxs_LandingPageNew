import type { ReactNode } from "react";
import Image from "next/image";
import Link from "next/link";
import { Check, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { routes } from "@/config/routes";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";
import type { ModuleLandingData } from "@/types/moduleLanding";

export function ModuleLandingHero({ data, preview }: { data: ModuleLandingData; preview: ReactNode }) {
  const { eyebrow, title, highlight, description, points } = data.hero;
  const summary = modules.find((item) => item.slug === data.slug);
  const Icon = data.icon;
  return (
    <section className="overflow-hidden bg-brand-surface">
      <div className="container-page grid items-center gap-10 pt-8 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-start lg:gap-10 lg:pt-10 lg:pb-20">
        <div>
          <nav aria-label="Breadcrumb" className="mb-4 flex items-center gap-1.5 text-sm text-brand-muted">
            <Link href={routes.home} className="hover:text-brand-purple">
              Home
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <Link href={routes.platform.all} className="hover:text-brand-purple">
              Platform
            </Link>
            <ChevronRight className="size-3.5" aria-hidden />
            <span className="text-brand-text">{data.name}</span>
          </nav>

          <div className="flex items-center gap-3">
            {summary ? (
              <span className={cn("flex size-9 items-center justify-center rounded-xl", summary.iconBg)}>
                <Image src={summary.icon} alt="" width={20} height={20} aria-hidden />
              </span>
            ) : (
              Icon && (
                <span className={cn("flex size-9 items-center justify-center rounded-xl", data.iconTone)}>
                  <Icon className="size-5" aria-hidden />
                </span>
              )
            )}
            <Badge>{eyebrow}</Badge>
          </div>

          <h1 className="mt-4 text-4xl leading-[1.1] font-extrabold text-brand-text sm:text-5xl lg:text-4xl xl:text-5xl">
            {title} <span className="text-brand-purple">{highlight}</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-brand-muted">{description}</p>

          <ul className="mt-4 flex flex-wrap gap-x-6 gap-y-2">
            {points.map((point) => (
              <li key={point} className="flex items-center gap-2.5 text-sm font-medium text-brand-text">
                <span className="flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>

          <div className="mt-7 flex flex-wrap gap-4">
            <Button href={routes.signup} size="lg">
              Start Free
            </Button>
            <Button href={routes.demo} variant="outline" size="lg">
              Book a Demo
            </Button>
          </div>
        </div>

        {preview}
      </div>
    </section>
  );
}
