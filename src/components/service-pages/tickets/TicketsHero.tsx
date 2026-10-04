"use client";

import { Headphones, StickyNote } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, avatarTones } from "@/components/sales-solution/shared";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";
import { priorityTone } from "../shared";
import { ServiceCrumbs } from "../shared";
import { tickets } from "./ticketData";

const statusTone = { New: "bg-sky-100 text-sky-700", Open: "bg-violet-100 text-violet-700", Pending: "bg-amber-100 text-amber-700", Resolved: "bg-emerald-100 text-emerald-700" } as const;
const flow = ["New", "Open", "Open", "Pending", "Resolved"] as const;

/** An inbox on the left, and the first ticket working its way from New to Resolved on the right. */
function Inbox() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(5, 1500, reduced, 2);
  const step = reduced ? 4 : tick;
  const status = flow[step];
  const featured = tickets[0];

  return (
    <MockWindow title="Support inbox">
      <div className="grid gap-0 sm:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <ul className="divide-y divide-brand-border border-b border-brand-border sm:border-r sm:border-b-0">
          {tickets.slice(0, 5).map((ticket, index) => (
            <li key={ticket.id} className={cn("flex items-start gap-2.5 px-3.5 py-3 transition-colors", index === 0 ? "bg-brand-purple-light/60" : "bg-white")}>
              <Avatar name={ticket.customer} tone={avatarTones[index % avatarTones.length]} className="size-7 text-[9px]" />
              <span className="min-w-0 flex-1">
                <span className="block truncate text-[12px] font-bold text-brand-text">{ticket.subject}</span>
                <span className="mt-0.5 flex items-center gap-1.5 text-[10px] text-brand-muted">
                  <span className={cn("rounded-full px-1.5 py-0.5 font-bold", priorityTone[ticket.priority])}>{ticket.priority}</span>
                  {ticket.id} · {ticket.age}
                </span>
              </span>
            </li>
          ))}
        </ul>

        <div className="p-4">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-[10px] font-semibold text-brand-muted">{featured.id} · {featured.channel}</p>
              <p className="text-sm font-extrabold text-brand-text">{featured.subject}</p>
            </div>
            <span key={status} className={cn("demo-rise rounded-full px-2.5 py-1 text-[10px] font-bold", statusTone[status])}>{status}</span>
          </div>
          <div className="mt-3 space-y-2.5">
            <p className="rounded-2xl rounded-tl-sm bg-brand-surface px-3 py-2 text-[11px] leading-relaxed text-brand-text">{featured.message}</p>
            <p className={cn("flex items-center gap-1.5 text-[10px] font-semibold text-brand-purple transition-opacity duration-500", step >= 1 ? "opacity-100" : "opacity-0")}>
              <Avatar name="Sana Khan" tone={avatarTones[1]} className="size-5 text-[8px]" /> Assigned to Sana Khan
            </p>
            <p className={cn("flex items-start gap-1.5 rounded-xl bg-amber-50 px-3 py-2 text-[10px] text-amber-900 transition-opacity duration-500", step >= 2 ? "opacity-100" : "opacity-0")}>
              <StickyNote className="mt-0.5 size-3 shrink-0" aria-hidden /> Internal note: invoice file was regenerated, checking the link.
            </p>
            <p className={cn("ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-brand-purple px-3 py-2 text-[11px] leading-relaxed text-white transition-opacity duration-500", step >= 3 ? "opacity-100" : "opacity-0")}>
              Thanks Priya. I have re-sent your March invoice. Could you try it now?
            </p>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function TicketsHero() {
  return (
    <HeroShell
      current="Ticket Management"
      crumbs={<ServiceCrumbs current="Ticket Management" />}
      icon={Headphones}
      iconTone="bg-sky-100 text-sky-700"
      title="Every Request Heard."
      highlight="Every Ticket Resolved."
      description="Bring every customer request into one queue, give each ticket an owner and a priority, and keep working until it is resolved."
      visual={<Inbox />}
    />
  );
}
