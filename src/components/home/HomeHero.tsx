import { Check, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { TRUST_INDICATORS } from "@/lib/constants";
import { HomeDashboard } from "@/components/dashboard/HomeDashboard";

export function HomeHero() {
  return (
    <section className="overflow-hidden bg-brand-surface pt-6 pb-16 lg:pt-8 lg:pb-24">
      <div className="container-page grid grid-cols-1 items-start gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <p className="mb-3 text-sm font-bold tracking-wider text-brand-purple uppercase">
            The Complete Business Operating Platform
          </p>
          <h1 className="text-4xl leading-tight font-extrabold text-brand-text sm:text-5xl lg:text-[3.4rem]">
            Run Your Business From One <span className="text-brand-purple">Intelligent Platform.</span>
          </h1>
          <p className="mt-6 max-w-lg text-base text-brand-muted sm:text-lg">
            Sortboxs connects CRM, sales, HRMS, service, finance, projects, procurement,
            inventory, marketing, analysis, and AI in one powerful business platform.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={routes.signup} size="lg" icon={ArrowRight}>
              Start Free
            </Button>
            <Button href={routes.demo} variant="outline" size="lg">
              Book a Demo
            </Button>
          </div>
          <ul className="mt-9 flex flex-wrap gap-x-6 gap-y-3">
            {TRUST_INDICATORS.map((label) => (
              <li key={label} className="flex items-center gap-2 text-sm font-medium text-brand-text">
                <span className="flex size-5 items-center justify-center rounded-full bg-brand-purple text-white">
                  <Check className="size-3" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        <div className="lg:col-span-7">
          <HomeDashboard />
        </div>
      </div>
    </section>
  );
}
