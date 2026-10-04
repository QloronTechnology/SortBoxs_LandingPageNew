import Link from "next/link";
import { ArrowRight, Handshake, Megaphone, Users, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { SectionHead } from "@/components/sales-solution/shared";

const links: { icon: LucideIcon; title: string; body: string; href: string; cta: string }[] = [
  { icon: Users, title: "CRM", body: "Every ticket sits on the customer record, with their deals, orders and history beside it.", href: routes.platform.crm, cta: "See CRM" },
  { icon: Handshake, title: "Sales", body: "Renewals, upsell chances and unhappy accounts are visible to the people who own them.", href: routes.solutions.sales, cta: "Explore Sales" },
  { icon: Megaphone, title: "Marketing", body: "Tell customers about the fixes and new articles their feedback led to.", href: routes.solutions.marketing, cta: "Explore Marketing" },
];

/** Support is connected to the rest of SortBoxs: three places where it meets other teams. */
export function ServiceBridge() {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Better together" title="Support that is part of the whole business" intro="A support conversation is never only about support. It matters to sales, marketing and the customer record, and it all stays connected." />
        <ul className="mx-auto mt-12 grid max-w-5xl gap-5 md:grid-cols-3">
          {links.map(({ icon: Icon, title, body, href, cta }) => (
            <li key={title} className="group flex flex-col rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-border transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(108,53,245,0.55)]">
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/25">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-4 text-lg font-extrabold text-brand-text">{title}</h3>
              <p className="mt-2 flex-1 text-sm leading-relaxed text-brand-muted">{body}</p>
              <Link href={href} className="mt-5 inline-flex w-fit items-center gap-2 text-sm font-semibold text-brand-purple outline-none focus-visible:underline">
                {cta} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
