import { Check, Minus } from "lucide-react";
import { planComparison, pricingPlans } from "@/data/pricing";

/** "Compare Plans" feature matrix. Scrolls horizontally on narrow screens. */
export function PlanComparison() {
  return (
    <section className="bg-white py-16">
      <div className="container-page">
        <h2 className="text-3xl font-bold text-brand-text">Compare Plans</h2>
        <p className="mt-2 text-sm text-brand-muted sm:text-base">
          See what&apos;s included in each plan and choose the right fit for your business.
        </p>

        <div className="mt-8 overflow-x-auto rounded-lg border border-brand-border bg-white">
          <table className="w-full min-w-[640px] border-collapse text-left">
            <caption className="sr-only">Features included in each plan</caption>
            <thead>
              <tr className="bg-[#f4f3fd]">
                <th scope="col" className="w-[27%] px-6 py-4 text-base font-medium text-brand-text sm:px-12 sm:text-lg">
                  Feature
                </th>
                {pricingPlans.map((plan) => (
                  <th
                    key={plan.name}
                    scope="col"
                    className="border-l border-brand-border px-4 py-4 text-center text-base font-medium text-brand-text sm:text-lg"
                  >
                    {plan.name}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {planComparison.map(({ feature, included }) => (
                <tr key={feature} className="border-t border-brand-border">
                  <th scope="row" className="px-6 py-2 text-sm font-normal text-brand-muted sm:px-12 sm:text-[15px]">
                    {feature}
                  </th>
                  {included.map((yes, index) => (
                    <td key={pricingPlans[index].name} className="border-l border-brand-border px-4 py-2 text-center">
                      {yes ? (
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
