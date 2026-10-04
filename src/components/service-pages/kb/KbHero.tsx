"use client";

import { BookOpen, Search } from "lucide-react";
import { cn } from "@/lib/utils";
import { useReducedMotion, useTicker } from "@/components/sales-solution/hooks";
import { HeroShell, MockWindow } from "@/components/marketing-pages/shared";
import { ServiceCrumbs } from "../shared";
import { articles } from "./kbData";

const QUERY = "download invoice";

function HelpCentre() {
  const reduced = useReducedMotion();
  const [tick] = useTicker(QUERY.length + 4, 220, reduced, 6);
  const typed = reduced ? QUERY : QUERY.slice(0, Math.min(tick, QUERY.length));
  const done = typed.length === QUERY.length;
  const results = done ? [articles[1], articles[2], articles[5]] : articles.slice(0, 3);

  return (
    <MockWindow title="Help centre">
      <div className="p-4 sm:p-5">
        <p className="text-center text-base font-extrabold text-brand-text">How can we help?</p>
        <div className="mt-3 flex items-center gap-2 rounded-xl bg-brand-surface px-3.5 py-2.5 ring-1 ring-brand-purple/30">
          <Search className="size-4 text-brand-purple" aria-hidden />
          <span className="text-sm font-semibold text-brand-text">
            {typed}
            {!reduced && !done && <span className="ml-0.5 inline-block h-4 w-px translate-y-0.5 animate-pulse bg-brand-purple" aria-hidden />}
            {typed.length === 0 && <span className="text-brand-muted/70">Search articles</span>}
          </span>
        </div>
        <ul className="mt-3 space-y-2">
          {results.map((article, index) => (
            <li key={`${done}-${article.id}`} className={cn("demo-rise flex items-start gap-3 rounded-xl bg-white p-3 ring-1", done && index === 0 ? "ring-2 ring-brand-purple" : "ring-brand-border")} style={{ "--d": `${index * 80}ms` } as React.CSSProperties}>
              <span className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-brand-purple-light text-brand-purple">
                <BookOpen className="size-4" aria-hidden />
              </span>
              <span>
                <span className="block text-[13px] font-bold text-brand-text">{article.title}</span>
                <span className="block text-[11px] text-brand-muted">{article.category} · {article.excerpt}</span>
              </span>
            </li>
          ))}
        </ul>
        <p className={cn("mt-3 rounded-lg bg-emerald-50 px-3 py-2 text-[11px] font-semibold text-emerald-800 transition-opacity duration-500", done ? "opacity-100" : "opacity-0")}>Found the answer. No ticket needed.</p>
      </div>
    </MockWindow>
  );
}

export function KbHero() {
  return (
    <HeroShell
      current="Knowledge Base"
      crumbs={<ServiceCrumbs current="Knowledge Base" />}
      icon={BookOpen}
      iconTone="bg-violet-100 text-violet-700"
      title="Answers Customers Can"
      highlight="Find on Their Own."
      description="Write help articles once, organise them so they are easy to find, and let customers and your own agents search them any time."
      visual={<HelpCentre />}
    />
  );
}
