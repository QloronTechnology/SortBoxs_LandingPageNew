import { Check, Sparkles } from "lucide-react";
import { freeModuleLimit, freePlan, startFreeModules } from "@/data/startFree";
import { useStartFree } from "./StartFreeProvider";

export function PlanSummaryPanel({ onChangeModules }: { onChangeModules: () => void }) {
  const { state } = useStartFree();
  const selectedModules = startFreeModules.filter((module) => state.selectedModules.includes(module.slug));

  return (
    <div className="rounded-xl border border-brand-border bg-white p-5 sm:p-6">
      <span className="flex size-10 items-center justify-center rounded-xl bg-brand-purple-light text-brand-purple">
        <Sparkles className="size-5" aria-hidden />
      </span>
      <h2 className="mt-3 text-lg font-bold text-brand-text">{freePlan.name}</h2>
      <p className="mt-1 text-2xl font-bold text-brand-purple">{freePlan.priceLabel}</p>
      <p className="mt-1 text-sm text-brand-muted">Up to {freePlan.userLimit} users</p>

      <div className="mt-4 border-t border-brand-border pt-4">
        <p className="text-sm font-semibold text-brand-text">
          Selected modules ({selectedModules.length}/{freeModuleLimit})
        </p>
        <ul className="mt-2.5 flex flex-col gap-2">
          {selectedModules.map((module) => (
            <li key={module.slug} className="flex items-center gap-2 text-sm text-brand-text">
              <span className="flex size-4 shrink-0 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
                <Check className="size-2.5" strokeWidth={3} aria-hidden />
              </span>
              {module.name}
            </li>
          ))}
        </ul>
        <button type="button" onClick={onChangeModules} className="mt-3 text-sm font-semibold text-brand-purple hover:underline">
          Change Modules
        </button>
      </div>

      <ul className="mt-4 flex flex-col gap-2 border-t border-brand-border pt-4">
        {freePlan.features.map((feature) => (
          <li key={feature} className="text-sm text-brand-muted">
            • {feature}
          </li>
        ))}
      </ul>
    </div>
  );
}
