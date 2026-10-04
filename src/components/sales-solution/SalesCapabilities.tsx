import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, FileText, GitBranch, LayoutGrid, LineChart, Workflow, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SectionHead } from "./shared";

/** Tiny static illustrations, one per capability. */
const art: Record<string, ReactNode> = {
  automation: (
    <div className="flex items-center gap-1.5">
      {["Lead", "Assign", "Follow up"].map((label, index) => (
        <span key={label} className="flex items-center gap-1.5">
          <span className="rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-purple shadow-sm">{label}</span>
          {index < 2 && <ArrowRight className="size-3 text-brand-purple/60" aria-hidden />}
        </span>
      ))}
    </div>
  ),
  pipeline: (
    <div className="flex items-end gap-1.5">
      {[28, 44, 36, 24, 52].map((height, index) => (
        <span key={index} className="w-5 rounded-t bg-gradient-to-t from-brand-purple to-violet-300" style={{ height }} />
      ))}
    </div>
  ),
  quotes: (
    <div className="w-24 space-y-1.5 rounded-lg bg-white p-2 shadow-sm">
      <span className="block h-1.5 w-2/3 rounded bg-brand-border" />
      <span className="block h-1.5 rounded bg-brand-border" />
      <span className="block h-1.5 w-1/2 rounded bg-brand-border" />
      <span className="block h-2 w-full rounded bg-brand-purple/70" />
    </div>
  ),
  analytics: (
    <svg viewBox="0 0 90 44" className="h-11 w-24" aria-hidden>
      <path d="M2 38 L20 26 L38 31 L58 14 L88 5" fill="none" stroke="#6c35f5" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M2 38 L20 26 L38 31 L58 14 L88 5 L88 44 L2 44 Z" fill="#6c35f5" opacity="0.12" />
    </svg>
  ),
  territory: (
    <div className="grid grid-cols-5 gap-1" aria-hidden>
      {Array.from({ length: 15 }, (_, index) => (
        <span key={index} className={cn("size-3 rounded-[3px]", [0, 1, 2, 6, 7, 11].includes(index) ? "bg-brand-purple" : [3, 4, 8, 12, 13].includes(index) ? "bg-violet-300" : "bg-white")} />
      ))}
    </div>
  ),
};

const capabilities: { id: string; href: string; icon: LucideIcon; title: string; body: string; art: string; span: string; accent: string }[] = [
  { id: "automation", href: routes.solutions.salesAutomation, icon: Workflow, title: "Sales Automation", body: "Automate repetitive sales processes and follow-ups.", art: "automation", span: "lg:col-span-3", accent: "from-violet-100 to-brand-purple-light" },
  { id: "pipeline", href: routes.solutions.pipelineManagement, icon: GitBranch, title: "Pipeline Management", body: "Track opportunities from first contact to close.", art: "pipeline", span: "lg:col-span-3", accent: "from-sky-100 to-indigo-100" },
  { id: "quotes", href: routes.solutions.quotesOrders, icon: FileText, title: "Quotes & Orders", body: "Move smoothly from proposal to order.", art: "quotes", span: "lg:col-span-2", accent: "from-amber-100 to-orange-100" },
  { id: "analytics", href: routes.solutions.salesAnalytics, icon: LineChart, title: "Sales Analytics", body: "Turn sales activity into actionable insights.", art: "analytics", span: "lg:col-span-2", accent: "from-emerald-100 to-teal-100" },
  { id: "territory", href: routes.solutions.territoryManagement, icon: LayoutGrid, title: "Territory Management", body: "Organize accounts and sales ownership across territories.", art: "territory", span: "lg:col-span-2", accent: "from-rose-100 to-pink-100" },
];

export function SalesCapabilities() {
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The Sales solution" title="Everything Your Sales Team Needs" intro="Five connected capabilities, built around the way deals actually move." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {capabilities.map(({ id, href, icon: Icon, title, body, art: artKey, span, accent }) => (
            <li key={id} className={cn("group relative overflow-hidden rounded-3xl bg-white ring-1 ring-brand-border transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(108,53,245,0.55)]", span)}>
              <div className={cn("flex h-32 items-center justify-center bg-gradient-to-br", accent)}>{art[artKey]}</div>
              <div className="p-6">
                <span className="-mt-14 mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-4 ring-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-brand-text">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple outline-none after:absolute after:inset-0 focus-visible:underline">
                  See how it works <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
