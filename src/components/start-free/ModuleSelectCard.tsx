import Image from "next/image";
import { Check } from "lucide-react";
import type { ModuleSummary } from "@/types/module";
import { cn } from "@/lib/utils";

export function ModuleSelectCard({
  module,
  selected,
  disabled,
  onToggle,
}: {
  module: ModuleSummary;
  selected: boolean;
  /** Selection limit reached and this card isn't the one already selected. */
  disabled: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onToggle}
      disabled={disabled}
      aria-pressed={selected}
      className={cn(
        "flex items-start gap-3 rounded-xl border p-4 text-left transition-colors",
        selected
          ? "border-brand-purple bg-brand-purple-light/50"
          : "border-brand-border bg-white hover:border-brand-purple/30",
        disabled && "cursor-not-allowed opacity-50 hover:border-brand-border"
      )}
    >
      <span className={cn("flex size-10 shrink-0 items-center justify-center rounded-lg", module.iconBg)}>
        <Image src={module.icon} alt="" width={20} height={20} aria-hidden />
      </span>
      <div className="min-w-0 flex-1">
        <p className="text-sm font-semibold text-brand-text">{module.name}</p>
        <p className="mt-0.5 text-xs leading-snug text-brand-muted">{module.description}</p>
      </div>
      <span
        aria-hidden
        className={cn(
          "flex size-5 shrink-0 items-center justify-center rounded-full border-2 transition-colors",
          selected ? "border-brand-purple bg-brand-purple text-white" : "border-brand-border bg-white"
        )}
      >
        {selected && <Check className="size-3" strokeWidth={3} />}
      </span>
    </button>
  );
}
