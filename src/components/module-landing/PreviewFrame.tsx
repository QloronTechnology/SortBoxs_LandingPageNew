import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";
import { Sparkles, TrendingUp } from "lucide-react";

interface PreviewFrameProps {
  title: string;
  period: string;
  children: ReactNode;
  /** The floating "AI insight" card. */
  insight: string;
  insightIcon?: LucideIcon;
  /** Small pill floating on the card's top-left corner. */
  badge: string;
  badgeIcon?: LucideIcon;
}

/** Card chrome shared by every module's decorative hero preview: the page's text says the same thing. */
export function PreviewFrame({
  title,
  period,
  children,
  insight,
  insightIcon: InsightIcon = Sparkles,
  badge,
  badgeIcon: BadgeIcon = TrendingUp,
}: PreviewFrameProps) {
  // `short` (globals.css): laptop-height screens scale the preview down so the whole hero fits above the fold.
  return (
    <div className="relative mx-auto w-full max-w-[620px] short:[zoom:0.86]">
      <span aria-hidden className="absolute -inset-6 rounded-[2.5rem] bg-[radial-gradient(ellipse_at_center,#e7e2fc_0%,rgba(231,226,252,0)_70%)]" />

      <div className="relative rounded-2xl bg-white p-5 shadow-[0_28px_60px_-26px_rgba(23,22,92,0.4)] ring-1 ring-brand-border sm:p-6 sm:pb-14">
        <div className="flex items-center justify-between">
          <h2 className="text-sm font-bold text-brand-text">{title}</h2>
          <span className="rounded-full bg-brand-surface px-2.5 py-1 text-[11px] font-semibold text-brand-muted">{period}</span>
        </div>
        {children}
      </div>

      <div className="relative z-10 mt-4 flex items-start gap-3 rounded-2xl bg-white p-4 shadow-[0_18px_40px_-20px_rgba(108,53,245,0.45)] ring-1 ring-brand-purple/20 sm:absolute sm:-right-6 sm:-bottom-14 sm:mt-0 sm:max-w-[290px]">
        <span className="flex size-9 shrink-0 items-center justify-center rounded-xl bg-brand-purple text-white">
          <InsightIcon className="size-4.5" aria-hidden />
        </span>
        <div>
          <p className="text-xs font-bold text-brand-purple">AI insight</p>
          <p key={insight} className="demo-rise mt-0.5 text-[13px] leading-snug text-brand-text">
            {insight}
          </p>
        </div>
      </div>

      <div className="absolute -top-4 -left-3 hidden items-center gap-1.5 rounded-full bg-white px-3 py-1.5 text-xs font-bold text-emerald-700 shadow-md ring-1 ring-emerald-100 sm:flex">
        <BadgeIcon className="size-3.5" aria-hidden /> {badge}
      </div>
    </div>
  );
}
