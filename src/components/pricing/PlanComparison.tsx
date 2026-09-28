"use client";

import { Check, Minus } from "lucide-react";
import { enterprisePlan } from "@/data/pricing";
import { usePricingPlans } from "./usePricingPlans";

/**
 * "Compare Plans" feature matrix, built from the backend plans' modules (admins create plans, so there's
 * no fixed table). Rows are every module any plan includes; Enterprise includes everything. Hidden until
 * the plans load. Scrolls horizontally on narrow screens.
 */
export function PlanComparison() {
  const plans = usePricingPlans();
  if (plans.status !== "ready" || plans.plans.length === 0) return null;

  const features = [...new Set(plans.plans.flatMap((plan) => plan.features))];
  const columns = [
    ...plans.plans.map((plan) => ({ name: plan.name, has: (feature: string) => plan.features.includes(feature) })),
    { name: enterprisePlan.name, has: () => true },
  ];

  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-brand-text">Compare Plans</h2>
        <p className="mt-2 text-sm text-brand-muted sm:text-base">
          See what&apos;s included in each plan and choose the right fit for your business.
        </p>

        <div className="mt-8 overflow-x-auto rounded-lg border border-brand-border bg-white">
          <table className="w-full min-w-[480px] border-collapse text-left">
            <caption className="sr-only">Features included in each plan</caption>
            <thead>
              <tr className="bg-[#f4f3fd]">
                <th scope="col" className="w-[27%] px-6 py-4 text-base font-medium text-brand-text sm:px-12 sm:text-lg">
                  Feature
                </th>
                {columns.map((column) => (
                  <th
                    key={column.name}
                    scope="col"
                    className="border-l border-brand-border px-4 py-4 text-center text-base font-medium text-brand-text sm:text-lg"
                  >
                    {column.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {features.map((feature) => (
                <tr key={feature} className="border-t border-brand-border">
                  <th scope="row" className="px-6 py-2 text-sm font-normal text-brand-muted sm:px-12 sm:text-[15px]">
                    {feature}
                  </th>
                  {columns.map((column) => (
                    <td key={column.name} className="border-l border-brand-border px-4 py-2 text-center">
                      {column.has(feature) ? (
                        <Check className="mx-auto size-4 text-brand-purple" strokeWidth={2.5} aria-label="Included" />
                      ) : (
                        <Minus className="mx-auto size-4 text-brand-muted" strokeWidth={2.5} aria-label="Not included" />
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
}
