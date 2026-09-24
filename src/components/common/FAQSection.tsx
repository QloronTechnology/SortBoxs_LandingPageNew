import type { FAQItem } from "@/types/common";
import { Accordion } from "@/components/ui/Accordion";
import { routes } from "@/config/routes";

export function FAQSection({ faqs }: { faqs: FAQItem[] }) {
  return (
    <div>
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-brand-text 3xl:text-4xl">
          Frequently Asked Questions
        </h2>
        <a
          href={routes.resources.helpCenter}
          className="hidden shrink-0 text-sm font-semibold text-brand-purple hover:underline sm:inline"
        >
          View all FAQ&apos;s →
        </a>
      </div>
      <Accordion items={faqs} className="mt-6 3xl:mt-9" />
    </div>
  );
}
