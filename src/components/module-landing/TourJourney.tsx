import type { CSSProperties, ReactNode } from "react";
import { Check, Handshake, FolderKanban, UserPlus, Wallet, type LucideIcon } from "lucide-react";
import { InView } from "@/components/ui/InView";
import { cn } from "@/lib/utils";

/** Platform Tour: one customer followed through four modules, as an infographic. Figures are illustrative. */

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

function LeadVisual() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center gap-2.5">
        <span className="flex size-9 items-center justify-center rounded-full bg-emerald-100 text-xs font-extrabold text-emerald-700">AT</span>
        <div>
          <p className="text-sm leading-tight font-extrabold text-brand-text">Aurora Textiles</p>
          <p className="text-[11px] text-brand-muted">Website form, 2:14 PM</p>
        </div>
        <span className="ml-auto flex size-10 items-center justify-center rounded-full border-4 border-brand-purple/80 text-[11px] font-extrabold text-brand-text">86</span>
      </div>
      <div className="flex flex-wrap gap-1.5">
        <span className="rounded-full bg-brand-purple-light px-2 py-0.5 text-[10px] font-bold text-brand-purple">Lead score 86</span>
        <span className="rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">Auto-assigned</span>
      </div>
    </div>
  );
}

function DealVisual() {
  const stages = [
    { label: "Lead", width: "100%", tone: "from-violet-400 to-brand-purple" },
    { label: "Proposal", width: "72%", tone: "from-sky-400 to-sky-600" },
    { label: "Won", width: "48%", tone: "from-emerald-400 to-emerald-600" },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-1.5">
        {stages.map((stage) => (
          <div key={stage.label} className="flex items-center gap-2">
            <span className="w-14 text-[10px] font-semibold text-brand-muted">{stage.label}</span>
            <span className="h-3.5 flex-1 rounded bg-brand-surface">
              <span className={cn("block h-full rounded bg-gradient-to-r", stage.tone)} style={{ width: stage.width }} />
            </span>
          </div>
        ))}
      </div>
      <p className="flex items-center justify-between text-[11px] font-semibold text-brand-muted">
        Deal value <span className="text-base font-extrabold text-emerald-600">₹3.1L</span>
      </p>
    </div>
  );
}

function ProjectVisual() {
  const rows = [
    { label: "Kickoff", left: "0%", width: "24%", tone: "bg-violet-500" },
    { label: "Design", left: "18%", width: "30%", tone: "bg-sky-500" },
    { label: "Build", left: "42%", width: "36%", tone: "bg-brand-purple" },
    { label: "Launch", left: "76%", width: "24%", tone: "bg-emerald-500" },
  ];
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="space-y-1.5">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center gap-2">
            <span className="w-11 text-[10px] font-semibold text-brand-muted">{row.label}</span>
            <span className="relative h-3 flex-1 rounded bg-brand-surface">
              <span className={cn("absolute inset-y-0 rounded", row.tone)} style={{ left: row.left, width: row.width }} />
            </span>
          </div>
        ))}
      </div>
      <p className="text-[11px] font-semibold text-brand-muted">12 tasks across 4 people</p>
    </div>
  );
}

function InvoiceVisual() {
  return (
    <div className="flex h-full flex-col justify-between">
      <div className="flex items-center justify-between">
        <span className="text-[11px] font-bold text-brand-muted">INV-1042</span>
        <span className="flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-[10px] font-bold text-emerald-700">
          <Check className="size-3" aria-hidden /> Paid
        </span>
      </div>
      <div>
        <p className="text-xl leading-none font-extrabold text-brand-text">₹3,10,000</p>
        <p className="mt-1 text-[11px] text-brand-muted">GST applied, reminder not needed</p>
      </div>
      <div className="flex gap-1" aria-hidden>
        {["Draft", "Sent", "Paid"].map((step) => (
          <span key={step} className="h-1.5 flex-1 rounded-full bg-brand-purple" />
        ))}
      </div>
    </div>
  );
}

const stages: { icon: LucideIcon; module: string; title: string; day: string; body: string; visual: ReactNode; tone: string }[] = [
  { icon: UserPlus, module: "CRM", title: "Capture", day: "Day 0", body: "A lead arrives from the website, is scored and goes to the right owner.", visual: <LeadVisual />, tone: "bg-emerald-500" },
  { icon: Handshake, module: "Sales", title: "Win", day: "Day 14", body: "The deal moves through the pipeline and closes, with the history attached.", visual: <DealVisual />, tone: "bg-brand-purple" },
  { icon: FolderKanban, module: "Projects", title: "Deliver", day: "Week 1 to 6", body: "The won deal becomes a project, with tasks, owners and deadlines.", visual: <ProjectVisual />, tone: "bg-sky-500" },
  { icon: Wallet, module: "Finance", title: "Get paid", day: "Day 29", body: "The invoice is created from the deal and the payment closes the loop.", visual: <InvoiceVisual />, tone: "bg-amber-500" },
];

const handovers = ["Qualified in 2 days", "Handed over instantly", "Invoiced on delivery"];

const summary = [
  { value: "29 days", label: "From first lead to cash in the bank" },
  { value: "0", label: "Times anyone re-enters customer data" },
  { value: "1", label: "Record that follows the customer across 4 modules" },
];

export function TourJourney() {
  return (
    <section className="bg-white py-16 lg:py-20">
      <div className="container-page">
        <div className="mx-auto max-w-2xl text-center">
          <p className="flex items-center justify-center gap-3 text-xs font-bold tracking-[0.18em] text-brand-purple uppercase">
            <span aria-hidden className="h-0.5 w-7 rounded-full bg-brand-purple" />
            The story
          </p>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold text-brand-text sm:text-4xl">One customer, from first hello to final payment</h2>
          <p className="mt-4 leading-relaxed text-brand-muted">
            The tour follows a single customer through four modules, so you can see what each hand-over looks like. Figures are sample data.
          </p>
        </div>

        <InView>
          <ol className="relative mt-14 grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4 lg:gap-5">
            <span aria-hidden className="absolute top-7 right-[12.5%] left-[12.5%] hidden border-t-2 border-dashed border-brand-purple/30 lg:block" />
            {handovers.map((text, index) => (
              <span
                key={text}
                aria-hidden
                className="absolute top-7 z-10 hidden -translate-x-1/2 -translate-y-1/2 rounded-full bg-white px-2.5 py-1 text-[10px] font-bold text-brand-purple shadow-sm ring-1 ring-brand-purple/20 lg:block"
                style={{ left: `${25 * (index + 1)}%` }}
              >
                {text}
              </span>
            ))}
            {stages.map(({ icon: Icon, module, title, day, body, visual, tone }, index) => (
              <li key={title} className="about-rise relative flex flex-col items-center text-center" style={delay(index * 120)}>
                <span className={cn("relative flex size-14 items-center justify-center rounded-2xl text-white shadow-lg ring-8 ring-white", tone)}>
                  <Icon className="size-6" aria-hidden />
                  <span className="absolute -top-2 -right-2 flex size-6 items-center justify-center rounded-full bg-white text-xs font-bold text-brand-purple ring-1 ring-brand-border">{index + 1}</span>
                </span>
                <p className="mt-4 text-[11px] font-bold tracking-wide text-brand-muted uppercase">
                  {module} <span aria-hidden>·</span> {day}
                </p>
                <h3 className="mt-1 text-lg font-bold text-brand-text">{title}</h3>
                <p className="mt-2 max-w-xs text-sm leading-relaxed text-brand-muted">{body}</p>
                <div className="mt-5 h-[136px] w-full max-w-xs rounded-2xl bg-white p-3.5 text-left shadow-[0_18px_36px_-22px_rgba(23,22,92,0.4)] ring-1 ring-brand-border">{visual}</div>
              </li>
            ))}
          </ol>
        </InView>

        <dl className="mt-14 grid gap-4 sm:grid-cols-3">
          {summary.map((item) => (
            <div key={item.label} className="rounded-2xl bg-brand-surface p-5 text-center ring-1 ring-brand-border">
              <dt className="text-3xl font-extrabold text-brand-purple">{item.value}</dt>
              <dd className="mt-1 text-sm text-brand-muted">{item.label}</dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
