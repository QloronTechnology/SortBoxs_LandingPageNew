import type { CSSProperties } from "react";
import Image from "next/image";
import { Caveat } from "next/font/google";
import Link from "next/link";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { InView } from "@/components/ui/InView";
import { StatsSection } from "@/components/common/StatsSection";
import { AboutHeroDashboard } from "./AboutHeroDashboard";
import { StoryAnimation } from "./StoryAnimation";
import { routes } from "@/config/routes";
import {
  aboutApproach,
  aboutBanner,
  aboutHero,
  aboutImpact,
  aboutPlatform,
  aboutSecurity,
  aboutStory,
  aboutValues,
} from "@/data/about";
import { modules } from "@/data/modules";
import { STATS } from "@/lib/constants";
import { cn } from "@/lib/utils";

/** Stagger for `.about-rise` entrances (globals.css), which start when their InView scrolls in. */
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function Eyebrow({ children, className }: { children: string; className?: string }) {
  return (
    <p className={cn("flex items-center gap-3 text-xs font-bold tracking-[0.18em] text-brand-purple uppercase", className)}>
      <span aria-hidden className="h-0.5 w-7 rounded-full bg-brand-purple" />
      {children}
    </p>
  );
}

function ModuleIcon({ icon, bg, size = "size-9", image = 18 }: { icon: string; bg: string; size?: string; image?: number }) {
  return (
    <span className={cn("flex shrink-0 items-center justify-center rounded-xl", size, bg)}>
      <Image src={icon} alt="" width={image} height={image} aria-hidden />
    </span>
  );
}

/* ---------------------------------------------------------------- Hero */

/** Module tiles on an ellipse around the product image; each links to its module page. */
function ModuleOrbit() {
  const count = modules.length;
  return (
    <div className="relative mx-auto aspect-[4/3] w-full max-w-[660px]">
      <svg aria-hidden viewBox="0 0 100 75" preserveAspectRatio="none" className="absolute inset-0 size-full">
        <ellipse
          cx="50"
          cy="37.5"
          rx="45"
          ry="32"
          fill="none"
          stroke="var(--color-brand-purple)"
          strokeOpacity="0.22"
          strokeDasharray="1.2 1.4"
          vectorEffect="non-scaling-stroke"
        />
      </svg>
      <span aria-hidden className="absolute inset-[18%] rounded-full bg-brand-purple/10 blur-3xl" />

      <AboutHeroDashboard className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" style={{ width: "64%" }} />

      <ul aria-label="SortBoxs modules">
        {modules.map((module, index) => {
          const angle = ((-90 + (index * 360) / count) * Math.PI) / 180;
          const x = 50 + 45 * Math.cos(angle);
          const y = 50 + (32 / 37.5) * 50 * Math.sin(angle);
          return (
            <li key={module.slug} className="absolute z-10 -translate-x-1/2 -translate-y-1/2" style={{ left: `${x}%`, top: `${y}%` }}>
              <Link
                href={module.href}
                className="group flex flex-col items-center gap-1 outline-none motion-safe:animate-[float-y_4s_ease-in-out_infinite]"
                style={{ animationDelay: `${(index % 5) * 0.45}s` }}
              >
                <span className="flex size-11 items-center justify-center rounded-2xl bg-white shadow-[0_10px_24px_-10px_rgba(76,43,180,0.45)] ring-1 ring-brand-border transition-transform group-hover:scale-110 group-focus-visible:ring-2 group-focus-visible:ring-brand-purple lg:size-12">
                  <ModuleIcon icon={module.icon} bg={module.iconBg} size="size-8" image={16} />
                </span>
                <span className="rounded-md bg-white/85 px-1.5 text-[10.5px] font-semibold whitespace-nowrap text-brand-text backdrop-blur-sm group-hover:text-brand-purple lg:text-[11px]">
                  {module.name}
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export function AboutHero() {
  return (
    <section className="relative overflow-hidden bg-[linear-gradient(180deg,var(--color-brand-surface)_0%,#fff_100%)] pt-10 pb-14 lg:pt-12 lg:pb-16">
      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,0.9fr)_minmax(0,1.1fr)]">
        <div>
          <Eyebrow>{aboutHero.eyebrow}</Eyebrow>
          <h1 className="mt-5 text-4xl leading-[1.08] font-extrabold tracking-tight text-brand-text sm:text-5xl xl:text-[3.5rem]">
            {aboutHero.lines.map((line, index) => (
              <span key={line} className={cn("block", index === aboutHero.highlight && "text-brand-purple")}>
                {line}
              </span>
            ))}
          </h1>
          <p className="mt-6 max-w-xl text-base leading-relaxed text-brand-muted">{aboutHero.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={routes.demo} size="lg" icon={ArrowRight}>
              Book a Demo
            </Button>
            <Button href={routes.signup} variant="outline" size="lg">
              Start Free
            </Button>
          </div>
        </div>

        {/* Orbit from sm; phones get the dashboard and a scrollable row of modules instead. */}
        <div className="hidden sm:block">
          <ModuleOrbit />
        </div>
        <div className="sm:hidden">
          <AboutHeroDashboard className="w-full" />
          <ul aria-label="SortBoxs modules" className="-mx-5 mt-4 flex gap-2 overflow-x-auto px-5 pb-2">
            {modules.map((module) => (
              <li key={module.slug} className="shrink-0">
                <Link
                  href={module.href}
                  className="flex items-center gap-2 rounded-xl bg-white py-1.5 pr-3 pl-1.5 text-xs font-semibold text-brand-text ring-1 ring-brand-border"
                >
                  <ModuleIcon icon={module.icon} bg={module.iconBg} size="size-7" image={14} />
                  {module.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Our story */

export function AboutStory() {
  return (
    <section className="border-t border-brand-border/60 bg-white py-16 lg:py-20">
      <div className="container-page grid grid-cols-1 items-center gap-12 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)]">
        <div>
          <Eyebrow>{aboutStory.eyebrow}</Eyebrow>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold text-brand-text sm:text-4xl">
            {aboutStory.title.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h2>
          {aboutStory.paragraphs.map((paragraph) => (
            <p key={paragraph} className="mt-5 max-w-xl leading-relaxed text-brand-muted">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Before → after, animated: scattered tools connect around SortBoxs. Decorative: the text says it. */}
        <StoryAnimation />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Values, impact */

export function AboutValues() {
  return (
    <section className="bg-brand-surface py-16 lg:py-20">
      <div className="container-page">
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-[auto_1fr] lg:items-end lg:gap-16">
          <div>
            <Eyebrow>{aboutValues.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-brand-text sm:text-4xl">{aboutValues.title}</h2>
          </div>
          <p className="max-w-2xl leading-relaxed text-brand-muted">{aboutValues.intro}</p>
        </div>
        <div className="mt-10 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {aboutValues.items.map(({ icon: Icon, title, body }) => (
            <article
              key={title}
              className="group rounded-2xl bg-white p-6 shadow-[0_14px_34px_-26px_rgba(23,22,92,0.45)] ring-1 ring-brand-border transition-all hover:-translate-y-1 hover:ring-brand-purple/30"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-5 font-bold text-brand-text">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-brand-muted">{body}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export function AboutImpact() {
  return (
    // Divider: it follows Our Story, also white.
    <section className="border-t border-brand-border/60 bg-white py-14 lg:py-16">
      <div className="container-page">
        <Eyebrow>{aboutImpact.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold text-brand-text sm:text-4xl">{aboutImpact.title}</h2>
        <StatsSection stats={STATS} className="mt-9 justify-between gap-x-10" />
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Platform */

export function AboutPlatform() {
  const { complete } = aboutPlatform;
  return (
    <section className="bg-brand-surface py-16 lg:py-20">
      <div className="container-page">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <Eyebrow>{aboutPlatform.eyebrow}</Eyebrow>
            <h2 className="mt-4 text-3xl font-extrabold text-brand-text sm:text-4xl">{aboutPlatform.title}</h2>
            <p className="mt-3 max-w-2xl leading-relaxed text-brand-muted">{aboutPlatform.description}</p>
          </div>
          <Link
            href={routes.platform.all}
            // Same size as the home page's "View all Modules →" (HomeModules).
            className="inline-flex shrink-0 items-center gap-1 rounded-lg text-sm font-semibold text-brand-purple outline-none hover:underline focus-visible:ring-2 focus-visible:ring-brand-purple/40"
          >
            {aboutPlatform.link} <ArrowRight className="size-3.5" aria-hidden />
          </Link>
        </div>

        <ul className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {modules.map((module) => (
            <li key={module.slug}>
              <Link
                href={module.href}
                className="group flex h-full items-start gap-3.5 rounded-2xl bg-white p-4 ring-1 ring-brand-border transition-all outline-none hover:-translate-y-0.5 hover:shadow-[0_14px_30px_-20px_rgba(76,43,180,0.45)] hover:ring-brand-purple/30 focus-visible:ring-2 focus-visible:ring-brand-purple"
              >
                <ModuleIcon icon={module.icon} bg={module.iconBg} size="size-10" image={20} />
                <span className="min-w-0">
                  <span className="block font-semibold text-brand-text group-hover:text-brand-purple">{module.name}</span>
                  <span className="mt-0.5 block text-sm leading-snug text-brand-muted">{module.description}</span>
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              href={routes.platform.all}
              className="group flex h-full items-start gap-3.5 rounded-2xl bg-[linear-gradient(135deg,#f3effe,#ede8fe)] p-4 ring-1 ring-brand-purple/20 transition-all outline-none hover:-translate-y-0.5 focus-visible:ring-2 focus-visible:ring-brand-purple"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-brand-purple text-white">
                <complete.icon className="size-5" aria-hidden />
              </span>
              <span className="min-w-0">
                <span className="block font-semibold text-brand-purple">{complete.title}</span>
                <span className="mt-0.5 block text-sm leading-snug text-brand-muted">{complete.body}</span>
              </span>
            </Link>
          </li>
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Approach, security */

export function AboutApproach() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <Eyebrow>{aboutApproach.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold text-brand-text sm:text-4xl">{aboutApproach.title}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-brand-muted">{aboutApproach.description}</p>

        <InView className="mt-10 grid grid-cols-1 items-stretch gap-4 lg:grid-cols-[1fr_auto_1fr_auto_1fr]">
          {aboutApproach.steps.map(({ icon: Icon, title, body }, index) => (
            <div key={title} className="contents">
              {index > 0 && (
                <ArrowRight
                  aria-hidden
                  className="about-rise mx-auto size-6 rotate-90 self-center text-brand-purple lg:rotate-0"
                  style={delay(index * 250 - 100)}
                />
              )}
              <article
                className={cn(
                  "about-rise flex items-start gap-4 rounded-2xl bg-white p-6 ring-1 transition-all hover:-translate-y-0.5",
                  index === 0 ? "shadow-[0_18px_40px_-26px_rgba(76,43,180,0.6)] ring-brand-purple/30" : "ring-brand-border hover:ring-brand-purple/30"
                )}
                style={delay(index * 250)}
              >
                <span className="flex size-12 shrink-0 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple">
                  <Icon className="size-6" aria-hidden />
                </span>
                <div>
                  <h3 className="font-bold text-brand-text">{title}</h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-brand-muted">{body}</p>
                </div>
              </article>
            </div>
          ))}
        </InView>
      </div>
    </section>
  );
}

export function AboutSecurity() {
  return (
    <section className="bg-brand-surface py-16 lg:py-20">
      <div className="container-page">
        <Eyebrow>{aboutSecurity.eyebrow}</Eyebrow>
        <h2 className="mt-4 text-3xl font-extrabold text-brand-text sm:text-4xl">{aboutSecurity.title}</h2>
        <p className="mt-3 max-w-2xl leading-relaxed text-brand-muted">{aboutSecurity.description}</p>
        <ul className="mt-10 grid grid-cols-2 gap-4 sm:grid-cols-4 xl:grid-cols-8">
          {aboutSecurity.badges.map(({ icon: Icon, lines }) => (
            <li
              key={lines.join(" ")}
              className="group flex flex-col items-center rounded-2xl bg-white px-3 py-5 text-center ring-1 ring-brand-border transition-all hover:-translate-y-0.5 hover:ring-brand-purple/30"
            >
              <span className="flex size-12 items-center justify-center rounded-2xl bg-brand-purple-light text-brand-purple transition-colors group-hover:bg-brand-purple group-hover:text-white">
                <Icon className="size-6" aria-hidden />
              </span>
              <span className="mt-3 text-sm leading-snug font-semibold text-brand-text">
                {lines.map((line) => (
                  <span key={line} className="block">
                    {line}
                  </span>
                ))}
              </span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

/* ---------------------------------------------------------------- Banner */

const handwriting = Caveat({ subsets: ["latin"], weight: "600" });

/** White dashboard card in the banner collage, placed by % of the collage box. */
function BannerCard({ className, style, children }: { className?: string; style: CSSProperties; children: React.ReactNode }) {
  return (
    <div
      className={cn(
        "absolute rounded-xl bg-white p-3 text-brand-text shadow-[0_22px_44px_-18px_rgba(10,6,60,0.6)] motion-safe:animate-[float-y_5s_ease-in-out_infinite]",
        className
      )}
      style={style}
    >
      {children}
    </div>
  );
}

/**
 * "Ready to Bring Your Business Together?" — full-width purple band that closes the page, laid out as in
 * the reference: copy and buttons on the left; on the right a cluster of dashboard cards (revenue,
 * active deals, teams, team performance) and a handwritten note. The cluster is decorative.
 */
export function AboutBanner() {
  const { revenue, deals, teams, performance, note } = aboutBanner;
  return (
    <section className="relative isolate overflow-hidden bg-[linear-gradient(100deg,#4b17d0_0%,#5a22e6_55%,#6a33f0_100%)] py-12 lg:py-14">
      <span aria-hidden className="absolute top-1/2 right-[18%] -z-10 size-[30rem] -translate-y-1/2 rounded-full bg-white/[0.06] blur-2xl" />

      <div className="container-page grid grid-cols-1 items-center gap-10 lg:grid-cols-[minmax(0,1.15fr)_minmax(0,1fr)]">
        <div>
          <h2 className="text-2xl leading-tight font-bold text-white sm:text-3xl xl:text-[2rem]">{aboutBanner.title}</h2>
          <p className="mt-4 max-w-[36rem] text-base leading-relaxed text-white/85">{aboutBanner.description}</p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Button href={routes.demo} size="lg" icon={ArrowRight} className="rounded-lg bg-white px-10 text-brand-purple shadow-none hover:bg-white/90">
              Book a Demo
            </Button>
            <Button href={routes.signup} variant="outline" size="lg" className="rounded-lg border-white/60 px-12 text-white hover:bg-white/10">
              Start Free
            </Button>
          </div>
        </div>

        {/* Card cluster (decorative), proportions from the reference */}
        <div aria-hidden className="relative mx-auto hidden h-[270px] w-full max-w-[540px] sm:block">
          <BannerCard style={{ left: "0%", top: "8%", width: "31%" }}>
            <p className="text-[11px] text-brand-muted">{revenue.label}</p>
            <p className="mt-1.5 text-[22px] leading-none font-bold">{revenue.value}</p>
            <p className="mt-1.5 flex items-center gap-1 text-[11px] font-semibold text-emerald-600">
              <TrendingUp className="size-3" /> {revenue.change}
            </p>
          </BannerCard>

          <BannerCard style={{ left: "35%", top: "0%", width: "23%", animationDelay: "1.2s" }}>
            <p className="text-[11px] text-brand-muted">{deals.label}</p>
            <p className="mt-1 text-[18px] leading-none font-bold">{deals.value}</p>
            <p className="mt-1 flex items-center gap-1 text-[10.5px] font-semibold text-emerald-600">
              <TrendingUp className="size-3" /> {deals.change}
            </p>
          </BannerCard>

          {/* Handwritten note with a curved arrow pointing back at the cards */}
          <div className={cn(handwriting.className, "absolute top-[2%] right-0 w-[28%] text-[17px] leading-[1.15] text-white/90")}>
            <svg viewBox="0 0 40 30" className="absolute top-[30%] -left-[36%] w-10 text-white/80" fill="none">
              {/* Swoosh from the note down-left towards the cards, arrowhead at the lower-left end */}
              <path d="M37 4C27 3 15 9 7 24" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
              <path d="M4 17l3 7 7-3" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            {note.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </div>

          <BannerCard style={{ left: "14%", top: "56%", width: "33%", animationDelay: "0.6s" }} className="z-10">
            <p className="text-[11px] font-semibold">{teams.label}</p>
            <p className="text-[10px] text-brand-muted">{teams.sublabel}</p>
            <div className="mt-2 flex -space-x-1.5">
              {teams.initials.map((initial, index) => (
                <span
                  key={initial}
                  className={cn(
                    "flex size-7 items-center justify-center rounded-full text-[10.5px] font-bold text-white ring-2 ring-white",
                    ["bg-amber-700", "bg-rose-700", "bg-stone-600", "bg-orange-800"][index]
                  )}
                >
                  {initial}
                </span>
              ))}
              <span className="flex size-7 items-center justify-center rounded-full bg-brand-purple-light text-[10px] font-bold text-brand-purple ring-2 ring-white">
                {teams.more}
              </span>
            </div>
          </BannerCard>

          <BannerCard style={{ left: "47%", top: "38%", width: "53%", animationDelay: "1.8s" }}>
            <p className="text-[11px] font-semibold">{performance.label}</p>
            <div className="mt-3 flex h-[92px] items-end gap-3 px-1">
              {performance.bars.map((height, index) => (
                <span
                  key={index}
                  className="flex-1 rounded-t-md bg-[linear-gradient(180deg,#c4b5fd,#8b5cf6)]"
                  style={{ height: `${height}%` }}
                />
              ))}
            </div>
          </BannerCard>
        </div>
      </div>
    </section>
  );
}
