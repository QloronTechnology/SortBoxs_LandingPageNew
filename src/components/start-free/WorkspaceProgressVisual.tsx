"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { Check, Layers, PartyPopper, Settings, Users } from "lucide-react";
import type { ModuleSummary } from "@/types/module";
import { cn } from "@/lib/utils";
import { VisualPanel } from "./VisualPanel";

type StepState = "done" | "active" | "upcoming";

/**
 * Page 2's right-hand panel: visual only (no controls) — an animated progress trail toward "Ready to
 * Start", illustrated with the real selected modules and invited teammates from this session rather than
 * generic icons, so it reads as a continuation of the Workspace Setup step's visualization.
 */
export function WorkspaceProgressVisual({
  selectedModules,
  inviteEmails,
}: {
  selectedModules: ModuleSummary[];
  inviteEmails: string[];
}) {
  const [shown, setShown] = useState(false);
  useEffect(() => {
    const id = requestAnimationFrame(() => setShown(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const steps: {
    label: string;
    detail: string;
    icon: typeof Layers;
    state: StepState;
    extra?: React.ReactNode;
  }[] = [
    {
      label: "Your Modules",
      detail: `${selectedModules.length} module${selectedModules.length === 1 ? "" : "s"} selected`,
      icon: Layers,
      state: "done",
      extra: selectedModules.length > 0 && (
        <div className="mt-2 flex flex-wrap gap-1.5">
          {selectedModules.map((module) => (
            <span key={module.slug} className={cn("flex size-6 items-center justify-center rounded-md", module.iconBg)}>
              <Image src={module.icon} alt={module.name} width={12} height={12} />
            </span>
          ))}
        </div>
      ),
    },
    {
      label: "Your Team",
      detail: inviteEmails.length > 0 ? `${inviteEmails.length} teammate${inviteEmails.length === 1 ? "" : "s"} invited` : "Invite teammates (optional)",
      icon: Users,
      state: "done",
      extra: inviteEmails.length > 0 && (
        <div className="mt-2 flex -space-x-1.5">
          {inviteEmails.slice(0, 5).map((email) => (
            <span
              key={email}
              className="flex size-6 items-center justify-center rounded-full border-2 border-white bg-brand-purple-light text-[10px] font-bold text-brand-purple"
              title={email}
            >
              {email[0]?.toUpperCase()}
            </span>
          ))}
        </div>
      ),
    },
    { label: "Workspace Setup", detail: "Finishing your details", icon: Settings, state: "active" },
    { label: "Ready to Start", detail: "Create your free account", icon: PartyPopper, state: "upcoming" },
  ];

  return (
    <VisualPanel className="flex min-h-[320px] flex-col items-center justify-center p-6">
      {steps.map((step, i) => (
        <div key={step.label} className="flex flex-col items-center">
          {i > 0 && (
            <span className="relative h-6 w-px overflow-hidden bg-brand-border" aria-hidden>
              <span
                className="absolute inset-0 origin-top bg-brand-purple transition-transform duration-500 ease-out"
                style={{ transform: shown ? "scaleY(1)" : "scaleY(0)", transitionDelay: `${i * 150}ms` }}
              />
              <span
                className="animate-flow-down absolute left-1/2 size-1 -translate-x-1/2 rounded-full bg-brand-purple"
                style={{ animationDelay: `${i * 300}ms` }}
              />
            </span>
          )}
          <div
            className="flex items-start gap-3 rounded-xl border border-brand-border bg-white px-4 py-3 shadow-sm transition-all duration-500 ease-out"
            style={{
              transform: shown ? "translateY(0)" : "translateY(8px)",
              opacity: shown ? 1 : 0,
              transitionDelay: `${i * 150}ms`,
            }}
          >
            <span
              className={cn(
                "flex size-8 shrink-0 items-center justify-center rounded-full",
                step.state === "done" && "bg-emerald-500 text-white",
                step.state === "active" && "animate-pulse-glow bg-brand-purple text-white",
                step.state === "upcoming" && "bg-brand-border text-brand-muted"
              )}
            >
              {step.state === "done" ? <Check className="size-4" strokeWidth={3} aria-hidden /> : <step.icon className="size-4" aria-hidden />}
            </span>
            <div className="min-w-0 text-left">
              <p className="text-sm font-semibold text-brand-text">{step.label}</p>
              <p className="truncate text-xs text-brand-muted">{step.detail}</p>
              {step.extra}
            </div>
          </div>
        </div>
      ))}
    </VisualPanel>
  );
}
