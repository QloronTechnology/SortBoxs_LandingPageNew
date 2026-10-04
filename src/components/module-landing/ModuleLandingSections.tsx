import type { CSSProperties } from "react";
import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import { InView } from "@/components/ui/InView";
import { modules } from "@/data/modules";
import { cn } from "@/lib/utils";
import { ModuleExplorer } from "./ModuleExplorer";
import type { ModuleLandingData } from "@/types/moduleLanding";

/** Stagger for `.about-rise` entrances (globals.css), which start once their InView scrolls in. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-brand-purple uppercase", className)}>
      <span aria-hidden className="h-0.5 w-7 rounded-full bg-brand-purple" />
      {children}
    </p>
  );
}

function SectionHeading({ eyebrow, title, intro, center = false }: { eyebrow: string; title: string; intro: string; center?: boolean }) {
  return (
    <div className={cn("max-w-2xl", center && "mx-auto text-center")}>
      <Eyebrow className={cn(center && "justify-center")}>{eyebrow}</Eyebrow>
      <h2 className="mt-4 text-3xl leading-tight font-extrabold text-brand-text sm:text-4xl">{title}</h2>
      <p className="mt-4 leading-relaxed text-brand-muted">{intro}</p>
    </div>
  );
}

/* ---------------------------------------------------------------- Lifecycle */

export function Lifecycle({ data }: { data: ModuleLandingData["lifecycle"] }) {
  const { eyebrow, title, intro, steps } = data;
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} center />

        <InView>
          <ol
            className={cn(
              "relative mt-14 grid grid-cols-1 gap-8 md:grid-cols-2 lg:gap-6",
              steps.length === 3 ? "lg:grid-cols-3" : "lg:grid-cols-4"
            )}
          >
            <span
              aria-hidden
              className="absolute top-7 right-[var(--inset)] left-[var(--inset)] hidden border-t-2 border-dashed border-brand-purple/30 lg:block"
              style={{ "--inset": `${50 / steps.length}%` } as CSSProperties}
            />
            {steps.map(({ icon: Icon, title: stepTitle, body }, index) => (
              <li key={stepTitle} className="about-rise relative flex flex-col items-center text-center" style={delay(index * 120)}>
                <span className="relative flex size-14 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-8 ring-white">
                  <Icon className="size-6" aria-hidden />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">
                    {index + 1}
                  </span>
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-text">{stepTitle}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted">{body}</p>
              </li>
            ))}
          </ol>
        </InView>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Pipeline */

export function Explorer({ data }: { data: ModuleLandingData["explorer"] }) {
  const { eyebrow, title, intro } = data;
  return (
    <section className="bg-brand-surface py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <ModuleExplorer explorer={data} />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Capabilities */

export function Capabilities({ data }: { data: ModuleLandingData["capabilities"] }) {
  const { eyebrow, title, intro, items } = data;
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} />
        <InView>
          <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {items.map(({ icon: Icon, title: itemTitle, body }, index) => (
              <article
                key={itemTitle}
                className="about-rise group rounded-2xl bg-white p-7 shadow-[0_14px_34px_-26px_rgba(23,22,92,0.45)] ring-1 ring-brand-border transition-all hover:-translate-y-1 hover:ring-brand-purple/30"
                style={delay(index * 80)}
              >
                <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white">
                  <Icon className="size-6" aria-hidden />
                </span>
                <h3 className="mt-5 text-lg font-bold text-brand-text">{itemTitle}</h3>
                <p className="mt-2 text-sm leading-relaxed text-brand-muted">{body}</p>
              </article>
            ))}
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- AI */

export function AIInsights({ data }: { data: ModuleLandingData["ai"] }) {
  const { eyebrow, title, description, points, cards } = data;
  return (
    <section className="overflow-hidden bg-brand-navy py-16 text-white lg:py-24">
      <div className="container-page grid items-center gap-12 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)] lg:gap-16">
        <div>
          <Eyebrow className="text-violet-300 [&>span]:bg-violet-300">{eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">{title}</h2>
          <p className="mt-5 max-w-xl leading-relaxed text-white/70">{description}</p>
          <ul className="mt-7 flex flex-col gap-3">
            {points.map((point) => (
              <li key={point} className="flex items-start gap-3 text-[15px] text-white/90">
                <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-brand-purple text-white">
                  <Check className="size-3" strokeWidth={3} aria-hidden />
                </span>
                {point}
              </li>
            ))}
          </ul>
        </div>

        <InView>
          <div className="relative">
            <span aria-hidden className="absolute -inset-8 rounded-full bg-brand-purple/25 blur-3xl" />
            <ul className="relative flex flex-col gap-4">
              {cards.map(({ icon: Icon, tone, title: cardTitle, body }, index) => (
                <li
                  key={cardTitle}
                  className={cn(
                    "about-rise flex items-start gap-4 rounded-2xl bg-white p-5 text-brand-text shadow-xl shadow-black/20",
                    index === 1 && "lg:ml-10",
                    index === 2 && "lg:ml-4"
                  )}
                  style={delay(index * 140)}
                >
                  <span className={cn("flex size-11 shrink-0 items-center justify-center rounded-xl", tone)}>
                    <Icon className="size-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-bold">{cardTitle}</p>
                    <p className="mt-1 text-sm leading-relaxed text-brand-muted">{body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </InView>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Connected modules */

export function Connected({ data }: { data: ModuleLandingData["connected"] }) {
  const { eyebrow, title, intro, slugs, links } = data;
  const connected = slugs.map((slug) => modules.find((module) => module.slug === slug)).filter((module) => module !== undefined);
  return (
    <section className="bg-brand-surface py-16 lg:py-20">
      <div className="container-page">
        <SectionHeading eyebrow={eyebrow} title={title} intro={intro} center />
        <ul className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-5">
          {connected.map((module) => (
            <li key={module.slug}>
              <Link
                href={module.href}
                className="group flex h-full flex-col rounded-2xl bg-white p-5 shadow-[0_14px_34px_-26px_rgba(23,22,92,0.45)] ring-1 ring-brand-border transition-all hover:-translate-y-1 hover:ring-brand-purple/40"
              >
                <span className={cn("flex size-11 items-center justify-center rounded-xl", module.iconBg)}>
                  <Image src={module.icon} alt="" width={22} height={22} aria-hidden />
                </span>
                <span className="mt-4 font-bold text-brand-text">{module.name}</span>
                <span className="mt-1.5 text-sm leading-relaxed text-brand-muted">{links[module.slug]}</span>
                <span className="mt-auto flex items-center gap-1 pt-4 text-sm font-semibold text-brand-purple">
                  Explore <ArrowRight className="size-4 transition-transform group-hover:translate-x-0.5" aria-hidden />
                </span>
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
