import Image from "next/image";
import Link from "next/link";
import { ChevronRight } from "lucide-react";
import { Badge } from "@/components/ui/Badge";
import { IconBox } from "@/components/ui/IconBox";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import type { ModulePageData } from "@/types/module";

export function ModuleHero({ data }: { data: ModulePageData }) {
  return (
    <section className="bg-brand-surface py-14 lg:py-16">
      <div className="container-page">
        <nav aria-label="Breadcrumb" className="mb-6 flex items-center gap-1.5 text-sm text-brand-muted">
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

        <div className="mb-5 flex items-center gap-3">
          <IconBox image={data.icon} alt="" size="md" />
          <Badge>{data.badge}</Badge>
        </div>
        <h1 className="max-w-2xl text-4xl font-extrabold text-brand-text sm:text-5xl">
          {data.heading}
        </h1>
        <p className="mt-5 max-w-xl text-base text-brand-muted sm:text-lg">{data.description}</p>
        <div className="mt-8 flex flex-wrap gap-4">
          <Button href={routes.signup}>Start Free</Button>
          <Button href={routes.demo} variant="outline">
            Book a Demo
          </Button>
        </div>
      </div>
    </section>
  );
}

export function ModuleVisual({ src, alt }: { src?: string; alt: string }) {
  if (!src) return null;
  return (
    <div className="overflow-hidden rounded-2xl border border-brand-border bg-white p-2 shadow-sm">
      <Image src={src} alt={alt} width={720} height={480} className="h-auto w-full rounded-xl object-contain" />
    </div>
  );
}
