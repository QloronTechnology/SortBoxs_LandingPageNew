import type { ReactNode } from "react";
import Link from "next/link";
import { ArrowRight, BookOpen, ChartColumn, Headphones, MessagesSquare, Timer, type LucideIcon } from "lucide-react";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/sales-solution/shared";

const art: Record<string, ReactNode> = {
  tickets: (
    <div className="w-full max-w-[210px] space-y-1.5" aria-hidden>
      {["bg-rose-400", "bg-amber-400", "bg-sky-400"].map((tone) => (
        <span key={tone} className="flex items-center gap-2 rounded-lg bg-white p-2 shadow-sm">
          <span className={cn("size-2.5 rounded-full", tone)} />
          <span className="h-1.5 flex-1 rounded bg-brand-border" />
        </span>
      ))}
    </div>
  ),
  kb: (
    <div className="w-full max-w-[200px] rounded-xl bg-white p-3 shadow-sm" aria-hidden>
      <span className="flex h-6 items-center rounded-md bg-brand-surface px-2"><span className="h-1.5 w-1/2 rounded bg-brand-border" /></span>
      <span className="mt-2 block h-1.5 rounded bg-brand-border" />
      <span className="mt-1.5 block h-1.5 w-3/4 rounded bg-brand-border" />
    </div>
  ),
  sla: (
    <div className="w-full max-w-[200px] space-y-2" aria-hidden>
      {[["w-3/5", "bg-emerald-500"], ["w-4/5", "bg-amber-500"], ["w-full", "bg-rose-500"]].map(([w, tone]) => (
        <span key={tone} className="block h-2.5 rounded-full bg-white"><span className={cn("block h-full rounded-full", w, tone)} /></span>
      ))}
    </div>
  ),
  omni: (
    <div className="flex items-center gap-2" aria-hidden>
      {["bg-violet-500", "bg-sky-500", "bg-emerald-500"].map((tone) => (
        <span key={tone} className={cn("size-9 rounded-full ring-4 ring-white/70", tone)} />
      ))}
    </div>
  ),
  insights: (
    <div className="flex h-16 items-end gap-2" aria-hidden>
      {[28, 44, 36, 58, 50, 70].map((height, i) => (
        <span key={i} className="w-5 rounded-t bg-gradient-to-t from-brand-purple to-violet-300" style={{ height }} />
      ))}
    </div>
  ),
};

const items: { icon: LucideIcon; title: string; body: string; href: string; art: string; span: string; accent: string }[] = [
  { icon: Headphones, title: "Ticket Management", body: "One queue for every request, with owners, priorities, notes and ready-made replies.", href: routes.solutions.ticketManagement, art: "tickets", span: "lg:col-span-3", accent: "from-sky-100 to-indigo-100" },
  { icon: BookOpen, title: "Knowledge Base", body: "Reviewed articles that customers and agents can search at any time.", href: routes.solutions.knowledgeBase, art: "kb", span: "lg:col-span-3", accent: "from-violet-100 to-brand-purple-light" },
  { icon: Timer, title: "SLA Management", body: "Response and resolution targets, with a clock on every ticket.", href: routes.solutions.slaManagement, art: "sla", span: "lg:col-span-2", accent: "from-amber-100 to-orange-100" },
  { icon: MessagesSquare, title: "Omnichannel Support", body: "Email, chat, phone, social and forms in one conversation.", href: routes.solutions.omnichannelSupport, art: "omni", span: "lg:col-span-2", accent: "from-emerald-100 to-teal-100" },
  { icon: ChartColumn, title: "Customer Insights", body: "Volume, speed, satisfaction, topics and customer health.", href: routes.solutions.customerInsights, art: "insights", span: "lg:col-span-2", accent: "from-rose-100 to-pink-100" },
];

/** The five Customer Service solutions as a bento grid. */
export function ServiceCapabilities() {
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The Customer Service solution" title="Everything Your Support Team Needs" intro="Five connected solutions. Use one, or all of them together." />
        <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-6">
          {items.map(({ icon: Icon, title, body, href, art: artKey, span, accent }) => (
            <li key={title} className={cn("group relative overflow-hidden rounded-3xl bg-white ring-1 ring-brand-border transition-shadow hover:shadow-[0_24px_50px_-28px_rgba(108,53,245,0.55)]", span)}>
              <div className={cn("flex h-32 items-center justify-center bg-gradient-to-br", accent)}>{art[artKey]}</div>
              <div className="p-6">
                <span className="-mt-14 mb-3 flex size-12 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-4 ring-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="text-lg font-bold text-brand-text">{title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                <Link href={href} className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-brand-purple outline-none after:absolute after:inset-0 focus-visible:underline">
                  Explore {title} <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </Link>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
