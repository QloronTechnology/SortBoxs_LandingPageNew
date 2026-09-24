import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { pricingModules } from "@/data/pricing";
import { routes } from "@/config/routes";
import { toneClasses } from "@/components/layout/Header/menus/menuStyles";
import { cn } from "@/lib/utils";

/** "Everything your business needs" — grid of module cards. */
export function PricingModules() {
  return (
    <section className="pb-16">
      <div className="container-page">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <h2 className="text-3xl font-bold text-brand-text">Everything your business needs</h2>
            <p className="mt-2 text-sm text-brand-muted sm:text-base">
              A complete suite of integrated modules to manage, automate, and grow your business.
            </p>
          </div>
          <Link
            href={routes.platform.all}
            className="inline-flex shrink-0 items-center gap-1.5 text-sm font-semibold text-brand-purple hover:underline"
          >
            Explore all Modules <ArrowRight className="size-4" aria-hidden />
          </Link>
        </div>

        <ul className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 2xl:grid-cols-6">
          {pricingModules.map(({ name, description, icon: Icon, tone, href }) => (
            <li key={name}>
              <Link
                href={href}
                className="group flex h-full items-center gap-3 rounded-lg border border-brand-border bg-white p-2.5 transition-all outline-none hover:border-brand-purple/40 hover:shadow-md hover:shadow-brand-purple/5 focus-visible:ring-2 focus-visible:ring-brand-purple/60"
              >
                <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-lg", toneClasses[tone])}>
                  <Icon className="size-5" aria-hidden />
                </span>
                <span className="min-w-0">
                  <span className="block truncate text-[15px] font-semibold text-brand-text group-hover:text-brand-purple">
                    {name}
                  </span>
                  <span className="block truncate text-xs text-brand-muted">{description}</span>
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
