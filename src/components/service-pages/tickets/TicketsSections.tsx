"use client";

import { useState } from "react";
import { CheckCircle2, Copy, Hourglass, Inbox, Layers, MessageSquareReply, StickyNote, Tag, UserCheck, UserRound, Wrench, Zap, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Avatar, SampleTag, SectionHead, avatarTones } from "@/components/sales-solution/shared";
import { priorityTone, type Priority } from "../shared";
import { agents, tickets as initialTickets, type Status, type Ticket } from "./ticketData";

const statusTone: Record<Status, string> = { New: "bg-sky-100 text-sky-700", Open: "bg-violet-100 text-violet-700", Pending: "bg-amber-100 text-amber-700", Resolved: "bg-emerald-100 text-emerald-700" };

/* ---------------------------------------------------------------- Lifecycle */

const lifecycle: { icon: LucideIcon; label: string; what: string }[] = [
  { icon: Inbox, label: "New", what: "A request arrives from email, chat, a web form or a call, and becomes a ticket with the customer attached." },
  { icon: UserCheck, label: "Assigned", what: "The ticket goes to an agent or a team, by rules or by hand, with a priority and category." },
  { icon: Wrench, label: "In progress", what: "The agent works on it, adds internal notes and uses ready-made replies." },
  { icon: Hourglass, label: "Waiting", what: "The ticket waits on the customer or another team, and the clock reflects that." },
  { icon: CheckCircle2, label: "Resolved", what: "The customer has their answer, and the ticket is marked resolved with the reply on record." },
];

export function TicketLifecycle() {
  const reduced = useReducedMotion();
  const [taken, setTaken] = useState(false);
  const [tick, setTick] = useTicker(lifecycle.length, 2600, reduced || taken, 0);
  const active = reduced && !taken ? 0 : tick;

  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="The life of a ticket" title="From first message to resolved" intro="Every ticket moves through the same simple stages. Select one to see what happens there." />
        <ol aria-label="Ticket stages" className="relative mx-auto mt-12 grid max-w-4xl gap-3 sm:grid-cols-5 sm:gap-0">
          <span aria-hidden className="absolute top-[34px] right-[10%] left-[10%] hidden h-0.5 bg-brand-purple/20 sm:block" />
          {lifecycle.map(({ icon: Icon, label }, index) => (
            <li key={label} className="flex sm:justify-center">
              <button type="button" aria-current={index === active ? "step" : undefined} onClick={() => { setTaken(true); setTick(index); }} className="group flex w-full items-center gap-3 rounded-2xl p-2 text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple sm:w-auto sm:flex-col sm:text-center">
                <span className={cn("relative flex size-[68px] shrink-0 items-center justify-center rounded-2xl ring-4 ring-brand-surface transition-all duration-300", index === active ? "scale-105 bg-brand-purple text-white shadow-lg shadow-brand-purple/30" : index < active ? "bg-emerald-500 text-white" : "bg-white text-brand-purple shadow-sm group-hover:bg-brand-purple-light")}>
                  <Icon className="size-6" aria-hidden />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                </span>
                <span className={cn("text-sm font-bold", index === active ? "text-brand-purple" : "text-brand-text")}>{label}</span>
              </button>
            </li>
          ))}
        </ol>
        <p key={active} className="demo-rise mx-auto mt-8 max-w-2xl rounded-2xl bg-white p-5 text-center text-sm leading-relaxed text-brand-text ring-1 ring-brand-border">{lifecycle[active].what}</p>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Interactive queue */

const filters: ("All" | Status)[] = ["All", "New", "Open", "Pending", "Resolved"];

export function TicketQueue() {
  const [items, setItems] = useState<Ticket[]>(initialTickets);
  const [filter, setFilter] = useState<"All" | Status>("All");
  const [selectedId, setSelectedId] = useState(initialTickets[0].id);
  const [notes, setNotes] = useState<Record<string, string[]>>({});
  const [draft, setDraft] = useState("");

  const visible = items.filter((ticket) => filter === "All" || ticket.status === filter);
  const selected = items.find((ticket) => ticket.id === selectedId) ?? items[0];
  const update = (id: string, patch: Partial<Ticket>) => setItems((current) => current.map((ticket) => (ticket.id === id ? { ...ticket, ...patch } : ticket)));
  const count = (status: "All" | Status) => items.filter((ticket) => status === "All" || ticket.status === status).length;

  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow="Try the inbox" title="Triage a queue the way your team would" intro="Filter the queue, open a ticket, change its owner or priority, add a note and resolve it. Everything here responds." />
        <div className="mx-auto mt-12 max-w-6xl overflow-hidden rounded-3xl bg-white shadow-[0_30px_70px_-44px_rgba(23,22,92,0.5)] ring-1 ring-brand-border">
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-brand-border bg-brand-surface px-4 py-3">
            <div role="group" aria-label="Status" className="flex flex-wrap gap-1.5">
              {filters.map((item) => (
                <button key={item} type="button" aria-pressed={filter === item} onClick={() => setFilter(item)} className={cn("rounded-full px-3 py-1.5 text-xs font-semibold outline-none ring-1 transition-colors focus-visible:ring-2 focus-visible:ring-brand-purple", filter === item ? "bg-brand-purple text-white ring-brand-purple" : "bg-white text-brand-muted ring-brand-border hover:text-brand-text")}>
                  {item} <span className="opacity-70">{count(item)}</span>
                </button>
              ))}
            </div>
            <SampleTag />
          </div>

          <div className="grid lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
            <ul className="max-h-[440px] divide-y divide-brand-border overflow-y-auto border-b border-brand-border lg:border-r lg:border-b-0">
              {visible.length === 0 && <li className="px-5 py-10 text-center text-sm text-brand-muted">No tickets with this status.</li>}
              {visible.map((ticket, index) => (
                <li key={ticket.id}>
                  <button type="button" aria-pressed={ticket.id === selected.id} onClick={() => setSelectedId(ticket.id)} className={cn("flex w-full items-start gap-3 px-4 py-3.5 text-left outline-none transition-colors focus-visible:bg-brand-purple-light", ticket.id === selected.id ? "bg-brand-purple-light/70" : "hover:bg-brand-surface")}>
                    <Avatar name={ticket.customer} tone={avatarTones[index % avatarTones.length]} className="size-8 text-[10px]" />
                    <span className="min-w-0 flex-1">
                      <span className="block truncate text-sm font-bold text-brand-text">{ticket.subject}</span>
                      <span className="mt-1 flex flex-wrap items-center gap-1.5 text-[11px] text-brand-muted">
                        <span className={cn("rounded-full px-2 py-0.5 font-bold", priorityTone[ticket.priority])}>{ticket.priority}</span>
                        <span className={cn("rounded-full px-2 py-0.5 font-bold", statusTone[ticket.status])}>{ticket.status}</span>
                        {ticket.id} · {ticket.assignee}
                      </span>
                    </span>
                  </button>
                </li>
              ))}
            </ul>

            <div key={selected.id} className="demo-rise p-5 sm:p-6">
              <div className="flex flex-wrap items-start justify-between gap-3">
                <div>
                  <p className="text-xs text-brand-muted">{selected.id} · {selected.channel} · {selected.age} ago</p>
                  <h3 className="text-lg font-extrabold text-brand-text">{selected.subject}</h3>
                  <p className="text-xs text-brand-muted">{selected.customer}, {selected.company}</p>
                </div>
                <span className={cn("rounded-full px-3 py-1 text-xs font-bold", statusTone[selected.status])}>{selected.status}</span>
              </div>
              <p className="mt-4 rounded-2xl rounded-tl-sm bg-brand-surface p-3.5 text-sm leading-relaxed text-brand-text">{selected.message}</p>

              <div className="mt-4 grid gap-3 sm:grid-cols-2">
                <label className="block text-xs font-bold tracking-wide text-brand-muted uppercase">
                  Assigned to
                  <select value={selected.assignee} onChange={(event) => update(selected.id, { assignee: event.target.value, status: selected.status === "New" ? "Open" : selected.status })} className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-brand-text ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
                    {["Unassigned", ...agents].map((agent) => (
                      <option key={agent}>{agent}</option>
                    ))}
                  </select>
                </label>
                <label className="block text-xs font-bold tracking-wide text-brand-muted uppercase">
                  Priority
                  <select value={selected.priority} onChange={(event) => update(selected.id, { priority: event.target.value as Priority })} className="mt-1.5 w-full rounded-xl bg-white px-3 py-2.5 text-sm font-semibold text-brand-text ring-1 ring-brand-border outline-none focus-visible:ring-2 focus-visible:ring-brand-purple">
                    {(Object.keys(priorityTone) as Priority[]).map((priority) => (
                      <option key={priority}>{priority}</option>
                    ))}
                  </select>
                </label>
              </div>

              <div className="mt-4">
                <label htmlFor="ticket-note" className="flex items-center gap-1.5 text-xs font-bold tracking-wide text-brand-muted uppercase">
                  <StickyNote className="size-3.5" aria-hidden /> Internal note
                </label>
                <form
                  className="mt-1.5 flex gap-2"
                  onSubmit={(event) => {
                    event.preventDefault();
                    if (!draft.trim()) return;
                    setNotes((current) => ({ ...current, [selected.id]: [...(current[selected.id] ?? []), draft.trim()] }));
                    setDraft("");
                  }}
                >
                  <input id="ticket-note" value={draft} onChange={(event) => setDraft(event.target.value)} placeholder="Only your team can see this" className="min-w-0 flex-1 rounded-xl bg-white px-3 py-2.5 text-sm ring-1 ring-brand-border outline-none placeholder:text-brand-muted/70 focus-visible:ring-2 focus-visible:ring-brand-purple" />
                  <button type="submit" className="rounded-xl bg-brand-surface px-4 text-sm font-semibold text-brand-purple ring-1 ring-brand-border outline-none hover:bg-brand-purple-light focus-visible:ring-2 focus-visible:ring-brand-purple">Add</button>
                </form>
                <ul className="mt-2 space-y-1.5">
                  {(notes[selected.id] ?? []).map((note, index) => (
                    <li key={`${note}-${index}`} className="demo-rise rounded-lg bg-amber-50 px-3 py-2 text-xs text-amber-900">{note}</li>
                  ))}
                </ul>
              </div>

              <button type="button" onClick={() => update(selected.id, { status: selected.status === "Resolved" ? "Open" : "Resolved" })} className={cn("mt-5 flex w-full items-center justify-center gap-2 rounded-xl px-5 py-3 text-sm font-semibold outline-none transition-colors focus-visible:ring-2 focus-visible:ring-offset-2", selected.status === "Resolved" ? "bg-brand-surface text-brand-text ring-1 ring-brand-border hover:bg-brand-purple-light focus-visible:ring-brand-purple" : "bg-emerald-500 text-white hover:bg-emerald-600 focus-visible:ring-emerald-500")}>
                <CheckCircle2 className="size-4" aria-hidden /> {selected.status === "Resolved" ? "Reopen ticket" : "Mark as resolved"}
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Anatomy */

const parts: { icon: LucideIcon; title: string; body: string }[] = [
  { icon: UserCheck, title: "Automatic assignment", body: "Route by category, skill or workload, so tickets reach the right person." },
  { icon: Tag, title: "Priorities and categories", body: "Sort the urgent from the routine, and the billing from the technical." },
  { icon: StickyNote, title: "Internal notes", body: "Share context with teammates without the customer seeing it." },
  { icon: MessageSquareReply, title: "Ready-made replies", body: "Answer common questions in a click, then personalise." },
  { icon: Copy, title: "Merge duplicates", body: "Combine repeat requests so the customer gets one answer." },
  { icon: Layers, title: "Saved views", body: "Keep filters like 'my open tickets' one click away." },
];

export function TicketAnatomy() {
  const [hot, setHot] = useState<number | null>(null);
  return (
    <section className="bg-brand-surface py-16 lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:gap-16">
        <div className="relative mx-auto w-full max-w-md rounded-3xl bg-white p-6 shadow-[0_30px_70px_-40px_rgba(23,22,92,0.55)] ring-1 ring-brand-border">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-brand-muted">T-2041</span>
            <SampleTag />
          </div>
          <p className="mt-2 text-lg font-extrabold text-brand-text">Cannot download my invoice</p>
          <div className="mt-4 flex flex-wrap gap-2 text-[11px] font-bold">
            <span className={cn("relative rounded-full bg-amber-100 px-2.5 py-1 text-amber-700 transition-shadow", hot === 1 && "ring-2 ring-brand-purple")}>High</span>
            <span className={cn("relative rounded-full bg-violet-100 px-2.5 py-1 text-violet-700 transition-shadow", hot === 1 && "ring-2 ring-brand-purple")}>Billing</span>
            <span className={cn("flex items-center gap-1.5 rounded-full bg-brand-surface px-2.5 py-1 text-brand-text transition-shadow", hot === 0 && "ring-2 ring-brand-purple")}><UserRound className="size-3" aria-hidden /> Sana Khan</span>
          </div>
          <p className="mt-4 rounded-2xl rounded-tl-sm bg-brand-surface p-3 text-xs leading-relaxed text-brand-text">The download button on my March invoice does nothing.</p>
          <p className={cn("mt-3 rounded-xl bg-amber-50 px-3 py-2 text-xs text-amber-900 transition-shadow", hot === 2 && "ring-2 ring-brand-purple")}>Note: file regenerated, checking the link.</p>
          <p className={cn("mt-3 flex items-center gap-2 rounded-xl bg-brand-purple px-3 py-2 text-xs text-white transition-shadow", hot === 3 && "ring-2 ring-brand-purple ring-offset-2")}><Zap className="size-3.5" aria-hidden /> Ready-made reply: Invoice re-sent</p>
          <div className="mt-3 flex gap-2 text-[11px] font-semibold text-brand-muted">
            <span className={cn("rounded-lg bg-brand-surface px-2.5 py-1.5 transition-shadow", hot === 4 && "ring-2 ring-brand-purple")}>Merge with T-2029</span>
            <span className={cn("rounded-lg bg-brand-surface px-2.5 py-1.5 transition-shadow", hot === 5 && "ring-2 ring-brand-purple")}>Saved view: Billing, high</span>
          </div>
        </div>
        <div>
          <SectionHead eyebrow="Everything on a ticket" title="Tools that keep tickets moving" intro="Point at a capability to see where it sits on the ticket." />
          <ul className="mt-8 grid gap-3 sm:grid-cols-2">
            {parts.map(({ icon: Icon, title, body }, index) => (
              <li key={title}>
                <button type="button" onMouseEnter={() => setHot(index)} onMouseLeave={() => setHot(null)} onFocus={() => setHot(index)} onBlur={() => setHot(null)} className={cn("flex h-full w-full gap-3 rounded-2xl bg-white p-3.5 text-left outline-none ring-1 transition-all focus-visible:ring-2 focus-visible:ring-brand-purple", hot === index ? "ring-2 ring-brand-purple" : "ring-brand-border")}>
                  <span className={cn("flex size-9 shrink-0 items-center justify-center rounded-xl transition-colors", hot === index ? "bg-brand-purple text-white" : "bg-brand-purple-light text-brand-purple")}>
                    <Icon className="size-4.5" aria-hidden />
                  </span>
                  <span>
                    <span className="block text-[13px] font-bold text-brand-text">{title}</span>
                    <span className="block text-xs leading-snug text-brand-muted">{body}</span>
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
