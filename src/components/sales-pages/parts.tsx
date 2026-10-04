import Link from "next/link";
import { Activity, ArrowRight, BarChart3, Check, ChevronRight, FileText, Gauge, GitBranch, Handshake, Layers, ListChecks, MapPinned, Package, ShieldCheck, UserCheck, Users, X, Zap, type LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/Button";
import { routes } from "@/config/routes";
import { cn } from "@/lib/utils";
import { SectionHead } from "@/components/sales-solution/shared";

/** Building blocks shared by the five Sales solution pages (Automation, Pipeline, Quotes & Orders, Analytics, Territory). */

export function Crumbs({ current, dark = false, parent = { label: "Sales", href: routes.solutions.sales } }: { current: string; dark?: boolean; parent?: { label: string; href: string } | null }) {
  const link = dark ? "hover:text-white" : "hover:text-brand-purple";
  return (
    <nav aria-label="Breadcrumb" className={cn("mb-4 flex flex-wrap items-center gap-1.5 text-sm", dark ? "text-white/60" : "text-brand-muted")}>
      <Link href={routes.home} className={link}>Home</Link>
      <ChevronRight className="size-3.5" aria-hidden />
      <Link href={routes.solutions.all} className={link}>Solutions</Link>
      <ChevronRight className="size-3.5" aria-hidden />
      {parent && (
        <>
          <Link href={parent.href} className={link}>{parent.label}</Link>
          <ChevronRight className="size-3.5" aria-hidden />
        </>
      )}
      <span className={dark ? "text-white" : "text-brand-text"}>{current}</span>
    </nav>
  );
}

export function HeroCopy({
  icon: Icon,
  iconTone = "bg-violet-100 text-violet-700",
  eyebrow,
  title,
  highlight,
  description,
  dark = false,
  center = false,
  className,
}: {
  icon?: LucideIcon;
  iconTone?: string;
  eyebrow: string;
  title: string;
  highlight: string;
  description: string;
  dark?: boolean;
  center?: boolean;
  className?: string;
}) {
  return (
    <div className={cn(center && "mx-auto text-center", className)}>
      <div className={cn("flex items-center gap-3", center && "justify-center")}>
        {Icon && (
          <span className={cn("flex size-9 items-center justify-center rounded-xl", iconTone)}>
            <Icon className="size-5" aria-hidden />
          </span>
        )}
        <p className={cn("inline-flex items-center rounded-full px-3.5 py-1.5 text-sm font-semibold", dark ? "bg-white/10 text-violet-200" : "bg-brand-purple-light text-brand-purple")}>{eyebrow}</p>
      </div>
      <h1 className={cn("mt-4 text-4xl leading-[1.1] font-extrabold sm:text-5xl lg:text-4xl xl:text-5xl", dark ? "text-white" : "text-brand-text")}>
        {title} <span className={dark ? "text-violet-300" : "text-brand-purple"}>{highlight}</span>
      </h1>
      <p className={cn("mt-5 max-w-xl text-base leading-relaxed sm:text-lg", dark ? "text-white/70" : "text-brand-muted", center && "mx-auto")}>{description}</p>
      <div className={cn("mt-7 flex gap-3 sm:flex-wrap sm:gap-4", center && "justify-center")}>
        <Button href={routes.signup} size="lg" icon={ArrowRight} className={cn("flex-1 px-4 sm:flex-none sm:px-8", dark && "bg-white text-brand-purple shadow-none hover:bg-white/90")}>
          Start Free
        </Button>
        <Button href={routes.demo} variant="outline" size="lg" className={cn("flex-1 px-4 sm:flex-none sm:px-8", dark && "border-white text-white hover:bg-white/10")}>
          Book a Demo
        </Button>
      </div>
    </div>
  );
}

/** "Problem → Solution": the usual way of working on the left, the SortBoxs way on the right. */
export function Compare({
  eyebrow,
  title,
  intro,
  without,
  withTitle = "With SortBoxs",
  withItems,
}: {
  eyebrow: string;
  title: string;
  intro: string;
  without: { title: string; body: string }[];
  withTitle?: string;
  withItems: { title: string; body: string }[];
}) {
  return (
    <section className="bg-white py-16 lg:py-24">
      <div className="container-page">
        <SectionHead center eyebrow={eyebrow} title={title} intro={intro} />
        <div className="mt-12 grid gap-5 lg:grid-cols-2 lg:gap-8">
          <div className="rounded-3xl bg-brand-surface p-6 ring-1 ring-brand-border sm:p-8">
            <p className="text-xs font-bold tracking-[0.16em] text-brand-muted uppercase">Without it</p>
            <ul className="mt-5 space-y-5">
              {without.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-rose-100 text-rose-600">
                    <X className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold text-brand-text">{item.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-brand-muted">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div className="rounded-3xl bg-[linear-gradient(135deg,#17165c_0%,#3b25b5_100%)] p-6 text-white shadow-[0_30px_60px_-34px_rgba(23,22,92,0.8)] sm:p-8">
            <p className="text-xs font-bold tracking-[0.16em] text-violet-300 uppercase">{withTitle}</p>
            <ul className="mt-5 space-y-5">
              {withItems.map((item) => (
                <li key={item.title} className="flex gap-3.5">
                  <span className="mt-0.5 flex size-6 shrink-0 items-center justify-center rounded-full bg-emerald-400 text-brand-navy">
                    <Check className="size-3.5" strokeWidth={3} aria-hidden />
                  </span>
                  <div>
                    <h3 className="text-[15px] font-bold">{item.title}</h3>
                    <p className="mt-0.5 text-sm leading-relaxed text-white/70">{item.body}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

export interface OutcomeItem {
  icon: LucideIcon;
  title: string;
  body: string;
}

/** Business outcomes, written as plain benefits (no percentages or customer claims). */
export function Outcomes({ eyebrow = "Business outcomes", title, intro, items, tone = "surface" }: { eyebrow?: string; title: string; intro: string; items: OutcomeItem[]; tone?: "surface" | "white" }) {
  return (
    <section className={cn("py-16 lg:py-24", tone === "white" ? "bg-white" : "bg-brand-surface")}>
      <div className="container-page grid gap-12 lg:grid-cols-[minmax(0,0.8fr)_minmax(0,1.4fr)] lg:gap-16">
        <SectionHead eyebrow={eyebrow} title={title} intro={intro} className="lg:sticky lg:top-28 lg:self-start" />
        <ul className="grid gap-4 sm:grid-cols-2">
          {items.map(({ icon: Icon, title: itemTitle, body }) => (
            <li key={itemTitle} className={cn("flex gap-4 rounded-2xl p-4 ring-1 ring-brand-border sm:block sm:p-5", tone === "white" ? "bg-brand-surface" : "bg-white")}>
              <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
                <Icon className="size-5" aria-hidden />
              </span>
              <div>
                <h3 className="text-base font-bold text-brand-text sm:mt-4">{itemTitle}</h3>
                <p className="mt-1 text-sm leading-relaxed text-brand-muted sm:mt-1.5">{body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export interface FamilyLink {
  label: string;
  href: string;
  body: string;
}

const family: FamilyLink[] = [
  { label: "Sales Automation", href: routes.solutions.salesAutomation, body: "Follow-ups and workflows on autopilot." },
  { label: "Pipeline Management", href: routes.solutions.pipelineManagement, body: "Every deal on one visual board." },
  { label: "Quotes & Orders", href: routes.solutions.quotesOrders, body: "From proposal to order, connected." },
  { label: "Sales Analytics", href: routes.solutions.salesAnalytics, body: "Performance you can read at a glance." },
  { label: "Territory Management", href: routes.solutions.territoryManagement, body: "Clear ownership across regions." },
];

/** What the first three steps look like for each solution. The site footer's own CTA closes the page after this. */
const startSteps: Record<string, { title: string; steps: { icon: LucideIcon; title: string; body: string }[] }> = {
  "Sales Automation": {
    title: "Your first automation in three steps",
    steps: [
      { icon: Zap, title: "Pick a trigger", body: "Start with something that already happens, like a new lead, a stage change or a deal gone quiet." },
      { icon: ListChecks, title: "Choose the actions", body: "Assign an owner, send an email, create a task or set a reminder, in the order you want." },
      { icon: Activity, title: "Switch it on", body: "Watch the activity log fill in as leads move through, and adjust the rule whenever you need." },
    ],
  },
  "Pipeline Management": {
    title: "Your pipeline, ready in three steps",
    steps: [
      { icon: Layers, title: "Set your stages", body: "Name the stages your deals really go through, from New Lead to Won." },
      { icon: Handshake, title: "Add your deals", body: "Bring in the opportunities you are working, with owner, value and close date." },
      { icon: GitBranch, title: "Move them forward", body: "Drag each deal as it progresses and the totals and forecast keep up." },
    ],
  },
  "Quotes & Orders": {
    title: "Your first quote in three steps",
    steps: [
      { icon: Package, title: "Add your products", body: "List the products and services you sell, with their prices." },
      { icon: ShieldCheck, title: "Set the approval rule", body: "Decide how much discount a rep can give before a manager has to approve." },
      { icon: FileText, title: "Send and convert", body: "Send the quote, and turn it into an order when the customer accepts." },
    ],
  },
  "Sales Analytics": {
    title: "A dashboard that fills itself in",
    steps: [
      { icon: Handshake, title: "Work your deals as usual", body: "Leads, deals, quotes and orders are the data. There is nothing extra to feed in." },
      { icon: BarChart3, title: "Open your dashboard", body: "See pipeline, revenue, conversion and team results as soon as deals are in." },
      { icon: Users, title: "Review with the team", body: "Use the same numbers in your pipeline reviews and one-to-ones." },
    ],
  },
  "Territory Management": {
    title: "Your territories in three steps",
    steps: [
      { icon: MapPinned, title: "Create regions and territories", body: "Group the market the way your team is organised." },
      { icon: UserCheck, title: "Assign reps and accounts", body: "Give every territory an owner and every account a home." },
      { icon: Gauge, title: "Check coverage and results", body: "Spot unowned accounts and compare each territory against its target." },
    ],
  },
};

/** Sales pages: three getting-started steps for the page, then links to the other four. */
export function SolutionCTA({ current }: { current: string }) {
  return <NextSteps current={current} content={startSteps[current]} family={family} familyLabel="More from SortBoxs Sales" />;
}

/** Getting started (three steps) plus links to the sibling solutions. The site footer's own CTA follows. */
export function NextSteps({
  current,
  content,
  family: siblings,
  familyLabel,
  tone = "white",
}: {
  tone?: "white" | "surface";
  current: string;
  content?: { title: string; steps: { icon: LucideIcon; title: string; body: string }[] };
  family: FamilyLink[];
  familyLabel: string;
}) {
  const onSurface = tone === "surface";
  return (
    <section className={cn("py-16 lg:py-24", onSurface ? "bg-brand-surface" : "bg-white")}>
      <div className="container-page">
        {content && (
          <>
            <SectionHead center eyebrow="Getting started" title={content.title} intro="No long project needed. Start with the first step and build up from there." />
            <ol className="relative mt-14 grid gap-8 md:grid-cols-3 md:gap-6">
              <span aria-hidden className="absolute top-7 right-[16.7%] left-[16.7%] hidden border-t-2 border-dashed border-brand-purple/30 md:block" />
              {content.steps.map(({ icon: Icon, title, body }, index) => (
                <li key={title} className="relative flex flex-col items-center text-center">
                  <span className={cn("relative flex size-14 items-center justify-center rounded-2xl bg-brand-purple text-white shadow-lg shadow-brand-purple/30 ring-8", onSurface ? "ring-brand-surface" : "ring-white")}>
                    <Icon className="size-6" aria-hidden />
                    <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                  </span>
                  <h3 className="mt-5 text-lg font-bold text-brand-text">{title}</h3>
                  <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted">{body}</p>
                </li>
              ))}
            </ol>
          </>
        )}

        <nav aria-label={familyLabel} className="mt-16">
          <p className="text-center text-sm font-semibold text-brand-muted">{familyLabel}</p>
          <ul className="mt-4 grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {siblings
              .filter((item) => item.label !== current)
              .map((item) => (
                <li key={item.href}>
                  <Link href={item.href} className={cn("group flex h-full items-center justify-between gap-3 rounded-2xl p-4 ring-1 ring-brand-border transition-colors hover:bg-brand-purple-light", onSurface ? "bg-white" : "bg-brand-surface")}>
                    <span>
                      <span className="block text-sm font-bold text-brand-text">{item.label}</span>
                      <span className="mt-0.5 block text-xs text-brand-muted">{item.body}</span>
                    </span>
                    <ArrowRight className="size-4 shrink-0 text-brand-purple transition-transform group-hover:translate-x-0.5" aria-hidden />
                  </Link>
                </li>
              ))}
          </ul>
        </nav>
      </div>
    </section>
  );
}
