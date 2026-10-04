"use client";

import { BookOpen, ChartColumn, Headphones, MessagesSquare, Timer, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { Crumbs } from "@/components/sales-pages/parts";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";

const steps: { icon: LucideIcon; tone: string; title: string; detail: string }[] = [
  { icon: MessagesSquare, tone: "bg-emerald-500", title: "Customer writes in", detail: "Priya starts a chat about her invoice." },
  { icon: Headphones, tone: "bg-sky-500", title: "A ticket is created", detail: "T-2041, assigned to Sana Khan, priority High." },
  { icon: BookOpen, tone: "bg-violet-500", title: "The answer is found", detail: "Sana inserts the 'Download an invoice' article." },
  { icon: Timer, tone: "bg-amber-500", title: "The deadline is met", detail: "Replied with 32 minutes of the target left." },
  { icon: ChartColumn, tone: "bg-indigo-500", title: "It is counted", detail: "Rated 5 stars and added to this week's report." },
];

/** One ticket's journey through the five Customer Service solutions, lit one step at a time. */
function Journey() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(steps.length, 1400, reduced, 2);
  const active = reduced ? steps.length : tick + 1;

  return (
    <MockWindow title="One ticket, start to finish">
      <ol className="relative p-4 sm:p-6" aria-label="A ticket's journey">
        {steps.map(({ icon: Icon, tone, title, detail }, index) => {
          const on = index < active;
          return (
            <li key={title} className="relative flex items-center gap-4 py-2.5">
              {index < steps.length - 1 && (
                <>
                  <span aria-hidden className="absolute top-1/2 left-[21px] h-full w-0.5 bg-brand-border" />
                  <span aria-hidden className="absolute top-1/2 left-[21px] w-0.5 bg-brand-purple transition-all duration-700" style={{ height: index < active - 1 ? "100%" : "0%" }} />
                </>
              )}
              <span className={cn("relative z-10 flex size-11 shrink-0 items-center justify-center rounded-2xl text-white ring-4 ring-white transition-all duration-500", on ? tone : "bg-brand-border", index === active - 1 && !reduced && "scale-110 shadow-lg")}>
                <Icon className="size-5" aria-hidden />
              </span>
              <span className={cn("min-w-0 transition-opacity duration-500", on ? "opacity-100" : "opacity-40")}>
                <span className="block text-sm font-extrabold text-brand-text">{title}</span>
                <span className="block text-xs text-brand-muted">{detail}</span>
              </span>
            </li>
          );
        })}
      </ol>
    </MockWindow>
  );
}

export function ServiceOverviewHero() {
  return (
    <HeroShell
      current="Customer Service"
      crumbs={<Crumbs current="Customer Service" parent={null} />}
      icon={Headphones}
      iconTone="bg-sky-100 text-sky-700"
      title="Deliver Exceptional"
      highlight="Support Experiences."
      description="Bring every request into one queue, answer faster with a shared knowledge base, keep your promises with SLAs, and learn from every conversation."
      visual={<Journey />}
    />
  );
}
