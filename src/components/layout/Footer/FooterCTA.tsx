import Image from "next/image";
import { ArrowRight, CalendarCheck, CreditCard, ShieldCheck } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { assets } from "@/config/assets";
import { routes } from "@/config/routes";

const trustPoints = [
  { icon: CreditCard, label: "No credit card required" },
  { icon: CalendarCheck, label: "14-day free trial" },
  { icon: ShieldCheck, label: "Full platform access" },
];

/** "Ready to Transform" band that opens the site footer on every page. */
export function FooterCTA() {
  return (
    <section className="relative overflow-hidden bg-brand-navy">
      <Image
        src={assets.backgrounds.ctaMountain}
        alt=""
        fill
        sizes="100vw"
        aria-hidden
        className="object-cover object-center"
      />
      {/* Tagline "writes" itself in left-to-right when scrolled into view, then floats. */}
      <InView className="absolute top-8 right-4 hidden w-36 xl:block 3xl:right-6 3xl:w-48">
        <Image
          src={assets.illustrations.taglineWatermark}
          alt=""
          width={220}
          height={90}
          aria-hidden
          className="tagline-write w-full"
        />
      </InView>

      {/* Right padding lives on an inner wrapper: .container-page sets padding-inline in
          unlayered CSS, which would override a utility on the same element. */}
      <div className="relative container-page">
        <div className="flex flex-col gap-8 py-10 lg:flex-row lg:items-start lg:justify-between lg:py-12 xl:pr-40 3xl:py-14 3xl:pr-56">
          <div className="max-w-xl min-w-0 lg:flex-1">
            <h2 className="text-2xl font-bold text-white sm:text-3xl lg:text-2xl 3xl:text-4xl">
              Ready to Transform Your Business?
            </h2>
            <p className="mt-3 max-w-[38rem] text-sm leading-relaxed text-white/90 3xl:text-[17px]">
              Join thousands of businesses already using Sortboxs to work smarter, Faster and grow
              bigger.
            </p>
          </div>

          <div className="flex shrink-0 flex-col gap-6 lg:items-end lg:pt-1">
            <div className="flex flex-wrap gap-4 3xl:gap-6">
              <Button
                href={routes.signup}
                size="lg"
                icon={ArrowRight}
                className="rounded-lg bg-white text-brand-purple shadow-none hover:bg-white/90 3xl:px-10 3xl:py-5 3xl:text-xl"
              >
                Start Free
              </Button>
              <Button
                href={routes.demo}
                variant="outline"
                size="lg"
                className="rounded-lg border-white text-white hover:bg-white/10 3xl:px-10 3xl:py-5 3xl:text-xl"
              >
                Book a Demo
              </Button>
            </div>
            <ul className="flex flex-wrap gap-x-4 gap-y-2 lg:mt-6 lg:justify-end 3xl:mt-10 3xl:gap-x-6">
              {trustPoints.map((point) => (
                <li key={point.label} className="flex items-center gap-2 text-[13px] whitespace-nowrap text-white 3xl:text-base">
                  <span className="flex size-6 items-center justify-center rounded-full bg-white text-brand-navy 3xl:size-7">
                    <point.icon className="size-3.5" aria-hidden />
                  </span>
                  {point.label}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
