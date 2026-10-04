import { Eye, Rocket, Sparkles, TrendingUp, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Eyebrow } from "./shared";

const outcomes: { icon: LucideIcon; title: string; body: string; height: string; tone: string }[] = [
  { icon: Sparkles, title: "Sell Smarter", body: "Give your team the information they need to act quickly.", height: "lg:min-h-[230px]", tone: "from-white/5 to-white/10" },
  { icon: Rocket, title: "Work Faster", body: "Automate repetitive sales activities.", height: "lg:min-h-[280px]", tone: "from-white/10 to-violet-400/20" },
  { icon: Eye, title: "Stay in Control", body: "Get visibility across the entire pipeline.", height: "lg:min-h-[330px]", tone: "from-violet-400/15 to-brand-purple/40" },
  { icon: TrendingUp, title: "Grow Revenue", body: "Use sales insights to make better decisions.", height: "lg:min-h-[380px]", tone: "from-brand-purple/40 to-brand-purple" },
];

/** Four outcomes as rising steps, so the section reads as growth rather than another card grid. */
export function SalesOutcomes() {
  return (
    <section className="overflow-hidden bg-[linear-gradient(135deg,#17165c_0%,#2a1f8f_100%)] py-16 text-white lg:py-24">
      <div className="container-page">
        <div className="max-w-2xl">
          <Eyebrow dark>Why SortBoxs Sales</Eyebrow>
          <h2 className="mt-4 text-3xl leading-tight font-extrabold sm:text-4xl">A sales team that gets better every quarter</h2>
          <p className="mt-4 leading-relaxed text-white/70">Each step builds on the one before it: better information leads to faster work, which leads to control and then to growth.</p>
        </div>

        <ol className="mt-12 grid items-end gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {outcomes.map(({ icon: Icon, title, body, height, tone }, index) => (
            <li key={title} className={cn("relative flex flex-col justify-end rounded-3xl bg-gradient-to-b p-6 ring-1 ring-white/15", tone, height)}>
              <span aria-hidden className="absolute top-5 right-6 text-5xl font-extrabold text-white/10">
                0{index + 1}
              </span>
              <span className="mb-auto flex size-12 items-center justify-center rounded-2xl bg-white text-brand-purple shadow-lg">
                <Icon className="size-6" aria-hidden />
              </span>
              <h3 className="mt-8 text-xl font-bold">{title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-white/75">{body}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
