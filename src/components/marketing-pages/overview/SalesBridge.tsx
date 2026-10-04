import Link from "next/link";
import { ArrowRight, Handshake, Megaphone } from "lucide-react";
import { routes } from "@/config/routes";
import { SectionHead } from "@/components/sales-solution/shared";

const marketing = ["A campaign brings in the lead", "The lead is scored on what they did", "Every email and page visit is logged"];
const sales = ["A rep is assigned and sees the full story", "Follow-ups and the deal are created for them", "Won revenue is reported back to the campaign"];

/** Marketing and Sales share one record: what each side does, and the hand-over between them. */
export function SalesBridge() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Better together" title="Marketing and Sales, on one record" intro="A lead does not start over when it moves to sales. The campaign that found it, and the result it led to, stay connected." />
        <div className="mx-auto mt-12 grid max-w-5xl items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr] lg:gap-6">
          <div className="rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-border sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-700">
              <Megaphone className="size-6" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-extrabold text-brand-text">Marketing</h3>
            <ul className="mt-4 space-y-3 text-sm text-brand-text">
              {marketing.map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-emerald-500" aria-hidden />{item}</li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center justify-center" aria-hidden>
            <span className="h-5 w-px bg-brand-purple/30 lg:h-full" />
            <span className="my-1 flex items-center gap-2 rounded-full bg-brand-purple px-4 py-2 text-center text-xs font-bold text-white shadow-lg shadow-brand-purple/30 lg:my-3 lg:flex-col lg:gap-1 lg:rounded-2xl lg:py-3">
              Hot lead handed over
              <ArrowRight className="size-4 rotate-90 lg:rotate-0" />
            </span>
            <span className="h-5 w-px bg-brand-purple/30 lg:h-full" />
          </div>

          <div className="rounded-3xl bg-brand-navy p-6 text-white sm:p-8">
            <span className="flex size-12 items-center justify-center rounded-2xl bg-white/15">
              <Handshake className="size-6" aria-hidden />
            </span>
            <h3 className="mt-4 text-lg font-extrabold">Sales</h3>
            <ul className="mt-4 space-y-3 text-sm text-white/85">
              {sales.map((item) => (
                <li key={item} className="flex gap-3"><span className="mt-1.5 size-2 shrink-0 rounded-full bg-violet-300" aria-hidden />{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="mx-auto mt-10 flex max-w-xl flex-wrap justify-center gap-3">
          {[
            ["See the hand-over in Lead Generation", routes.solutions.leadGeneration],
            ["Explore SortBoxs Sales", routes.solutions.sales],
          ].map(([label, href]) => (
            <Link key={href} href={href} className="group inline-flex items-center gap-2 rounded-xl bg-brand-surface px-5 py-3 text-sm font-semibold text-brand-purple ring-1 ring-brand-border transition-colors hover:bg-brand-purple-light">
              {label} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
