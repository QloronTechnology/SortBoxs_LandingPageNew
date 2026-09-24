import { PricingHeroDashboard } from "./PricingHeroDashboard";
import { pricingHero } from "@/data/pricing";

export function PricingHero() {
  const { eyebrow, title, highlight, description, points } = pricingHero;

  return (
    <section className="bg-[#f6f5fe]">
      <div className="container-page grid items-center gap-10 pt-12 pb-20 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:pt-14 lg:pb-24">
        <div>
          <p className="text-sm font-medium tracking-[0.2em] text-brand-purple uppercase">{eyebrow}</p>
          <h1 className="mt-4 text-4xl leading-tight font-bold text-brand-text sm:text-5xl lg:text-[44px] xl:text-5xl">
            {title} <span className="block text-brand-purple">{highlight}</span>
          </h1>
          <p className="mt-4 text-base text-brand-muted sm:text-lg">{description}</p>
          <ul className="mt-6 flex flex-wrap gap-x-6 gap-y-3">
            {points.map(({ label, icon: Icon }) => (
              <li key={label} className="flex items-center gap-2 text-sm text-brand-text">
                <span className="flex size-7 items-center justify-center rounded-full bg-brand-purple-light text-brand-purple">
                  <Icon className="size-3.5" aria-hidden />
                </span>
                {label}
              </li>
            ))}
          </ul>
        </div>

        {/* Animated: search a user by name → open their profile (loops). */}
        <PricingHeroDashboard />
      </div>
    </section>
  );
}
