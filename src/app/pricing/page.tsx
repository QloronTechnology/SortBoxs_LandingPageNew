import type { Metadata } from "next";
import { Check } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { SectionHeader } from "@/components/ui/SectionHeader";
import { Button } from "@/components/ui/Button";
import { FAQSection } from "@/components/common/FAQSection";
import { faqs } from "@/data/faq";
import { routes } from "@/config/routes";

export const metadata: Metadata = {
  title: "Pricing",
  description: "Simple, transparent pricing that scales with your business.",
};

const plans = [
  {
    name: "Starter",
    price: "Free",
    description: "For individuals and small teams getting started.",
    features: ["Up to 3 users", "Core CRM & Sales", "Community support"],
  },
  {
    name: "Growth",
    price: "Contact Us",
    description: "For growing businesses that need the full platform.",
    features: ["Unlimited users", "All 14 modules", "AI Assistant", "Priority support"],
    highlighted: true,
  },
  {
    name: "Enterprise",
    price: "Contact Us",
    description: "For enterprises that need scale, security and control.",
    features: ["Custom SLAs", "Advanced security & audit logs", "Dedicated success manager"],
  },
];

export default function PricingPage() {
  return (
    <>
      <Section className="bg-brand-surface">
        <SectionHeader
          align="center"
          eyebrow="Pricing"
          title="Simple, transparent pricing"
          description="Start free and scale up as your business grows. No hidden fees."
        />
        <div className="mt-12 grid grid-cols-1 gap-6 md:grid-cols-3">
          {plans.map((plan) => (
            <div
              key={plan.name}
              className={`flex flex-col rounded-2xl border p-8 ${
                plan.highlighted
                  ? "border-brand-purple bg-white shadow-xl shadow-brand-purple/10"
                  : "border-brand-border bg-white"
              }`}
            >
              <h3 className="text-lg font-semibold text-brand-text">{plan.name}</h3>
              <p className="mt-2 text-3xl font-bold text-brand-text">{plan.price}</p>
              <p className="mt-2 text-sm text-brand-muted">{plan.description}</p>
              <ul className="mt-6 flex flex-1 flex-col gap-3">
                {plan.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-2 text-sm text-brand-text">
                    <Check className="size-4 text-brand-purple" aria-hidden />
                    {feature}
                  </li>
                ))}
              </ul>
              <Button
                href={routes.signup}
                variant={plan.highlighted ? "primary" : "outline"}
                className="mt-8 justify-center"
              >
                Get Started
              </Button>
            </div>
          ))}
        </div>
      </Section>

      <Section>
        <FAQSection faqs={faqs} />
      </Section>

    </>
  );
}
