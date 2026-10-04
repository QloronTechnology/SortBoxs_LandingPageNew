"use client";

import { CalendarClock, Mail, Users } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { HeroShell, MockWindow } from "../shared";

const SUBJECT = "A festive offer, just for you";

function Composer() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(8, 800, reduced, 3);
  const step = reduced ? 8 : tick;
  const typed = reduced ? SUBJECT : SUBJECT.slice(0, Math.min(SUBJECT.length, step * 5));
  const show = (needed: number) => (step >= needed ? "opacity-100 translate-y-0" : "opacity-0 translate-y-2");

  return (
    <MockWindow title="Email composer">
      <div className="p-4 sm:p-5">
        <div className="flex flex-wrap items-center gap-2 text-[11px]">
          <span className="flex items-center gap-1.5 rounded-full bg-violet-100 px-2.5 py-1 font-bold text-violet-700">
            <Users className="size-3" aria-hidden /> To: New leads · 1,240 contacts
          </span>
          <span className={cn("flex items-center gap-1.5 rounded-full bg-emerald-100 px-2.5 py-1 font-bold text-emerald-700 transition-opacity duration-500", step >= 7 ? "opacity-100" : "opacity-0")}>
            <CalendarClock className="size-3" aria-hidden /> Scheduled: Tue, 10:00 AM
          </span>
        </div>

        <div className="mt-3 rounded-lg bg-brand-surface px-3 py-2 text-xs ring-1 ring-brand-border">
          <span className="text-brand-muted">Subject: </span>
          <span className="font-bold text-brand-text">{typed}</span>
          {!reduced && step < 4 && <span className="ml-0.5 inline-block h-3 w-px translate-y-0.5 animate-pulse bg-brand-purple" aria-hidden />}
        </div>

        <div className="mt-3 overflow-hidden rounded-2xl bg-brand-surface p-3 ring-1 ring-brand-border">
          <div className="mx-auto max-w-[360px] overflow-hidden rounded-xl bg-white shadow-sm ring-1 ring-brand-border">
            <div className={cn("flex h-20 items-center justify-center bg-gradient-to-br from-brand-purple to-violet-400 text-white transition-all duration-500", show(2))}>
              <span className="flex items-center gap-2 text-sm font-extrabold">
                <Mail className="size-4" aria-hidden /> Festive Offer
              </span>
            </div>
            <div className="space-y-2 p-4">
              <p className={cn("text-sm font-extrabold text-brand-text transition-all duration-500", show(3))}>Hi Priya, a little something for you</p>
              <div className={cn("space-y-1.5 transition-all duration-500", show(4))} aria-hidden>
                <span className="block h-1.5 rounded bg-brand-border" />
                <span className="block h-1.5 w-11/12 rounded bg-brand-border" />
                <span className="block h-1.5 w-2/3 rounded bg-brand-border" />
              </div>
              <span className={cn("mt-1 inline-block rounded-lg bg-brand-purple px-4 py-2 text-xs font-bold text-white transition-all duration-500", show(5))}>See the offer</span>
              <p className={cn("pt-2 text-[10px] text-brand-muted transition-all duration-500", show(6))}>You can unsubscribe at any time.</p>
            </div>
          </div>
        </div>
      </div>
    </MockWindow>
  );
}

export function EmailHero() {
  return (
    <HeroShell
      current="Email Marketing"
      icon={Mail}
      iconTone="bg-violet-100 text-violet-700"
      title="Send Emails People"
      highlight="Actually Want to Open."
      description="Build emails from simple blocks, send them to the right segment, and follow up automatically based on what each person does."
      visual={<Composer />}
    />
  );
}
