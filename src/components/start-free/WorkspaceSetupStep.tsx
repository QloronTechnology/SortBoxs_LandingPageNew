"use client";

import { useEffect, useRef } from "react";
import { Check, CircleAlert, Loader2, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { freeModuleLimit, startFreeModules } from "@/data/startFree";
import { useStartFree } from "./StartFreeProvider";
import { ModuleSelectCard } from "./ModuleSelectCard";
import { SelectedModuleVisualization } from "./SelectedModuleVisualization";
import { checkDomainAvailability, sanitizeDomainInput } from "@/lib/domainCheck";

export function WorkspaceSetupStep() {
  const { state, dispatch } = useStartFree();
  const { domain, domainStatus, selectedModules } = state;
  const checkToken = useRef(0);

  useEffect(() => {
    if (!domain) return;
    const token = ++checkToken.current;
    dispatch({ type: "setDomainStatus", status: "checking" });
    const timer = setTimeout(async () => {
      const result = await checkDomainAvailability(domain);
      if (checkToken.current === token) dispatch({ type: "setDomainStatus", status: result });
    }, 450);
    return () => clearTimeout(timer);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [domain]);

  const atLimit = selectedModules.length >= freeModuleLimit;
  const selectedModuleObjects = startFreeModules.filter((module) => selectedModules.includes(module.slug));

  return (
    <div className="flex flex-col gap-6">
      <div>
        {/* Company Domain */}
        <section className="rounded-xl border border-brand-border bg-white p-5 sm:p-6">
          <h2 className="text-lg font-bold text-brand-text">Company Domain</h2>
          <p className="mt-1 text-sm text-brand-muted">
            Enter your company domain to create your workspace. This will be used for your team&apos;s login URL.
          </p>

          <div className="mt-4">
            <div
              className={cn(
                "flex h-12 w-full items-center rounded-lg border bg-white pl-3.5 text-[15px] focus-within:border-brand-purple focus-within:ring-2 focus-within:ring-brand-purple/30",
                domainStatus === "unavailable" || domainStatus === "invalid" ? "border-red-400" : "border-brand-border"
              )}
            >
              <span className="shrink-0 text-brand-muted">https://</span>
              <input
                id="workspace-domain"
                value={domain}
                onChange={(event) => dispatch({ type: "setDomain", domain: sanitizeDomainInput(event.target.value) })}
                placeholder="yourcompany"
                autoComplete="off"
                autoCapitalize="off"
                spellCheck={false}
                aria-describedby="domain-status"
                className="min-w-0 flex-1 bg-transparent px-1 text-brand-text outline-none placeholder:text-brand-muted/70"
              />
              <span className="shrink-0 pr-3.5 text-brand-muted">.sortboxs.com</span>
            </div>
            <div id="domain-status" className="mt-2 flex min-h-5 items-center gap-1.5 text-sm" aria-live="polite">
              {domainStatus === "checking" && (
                <span className="flex items-center gap-1.5 text-brand-muted">
                  <Loader2 className="size-3.5 animate-spin" aria-hidden /> Checking...
                </span>
              )}
              {domainStatus === "available" && (
                <span className="flex items-center gap-1.5 font-medium text-emerald-600">
                  <Check className="size-4" aria-hidden /> Available
                </span>
              )}
              {domainStatus === "unavailable" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <X className="size-4" aria-hidden /> That domain is already taken
                </span>
              )}
              {domainStatus === "invalid" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <CircleAlert className="size-4" aria-hidden /> Enter at least 3 letters, numbers or hyphens
                </span>
              )}
              {domainStatus === "error" && (
                <span className="flex items-center gap-1.5 font-medium text-red-600">
                  <CircleAlert className="size-4" aria-hidden /> Couldn&apos;t check availability. Edit the domain to retry.
                </span>
              )}
            </div>
          </div>
        </section>

        {/* Module selection */}
        <section className="mt-6 rounded-xl border border-brand-border bg-white p-5 sm:p-6">
          <div className="flex flex-wrap items-center justify-between gap-2">
            <div>
              <h2 className="text-lg font-bold text-brand-text">Choose Your Modules</h2>
              <p className="mt-1 text-sm text-brand-muted">You can always add more modules later.</p>
            </div>
            <span
              className={cn(
                "shrink-0 rounded-full px-3 py-1 text-sm font-semibold",
                atLimit ? "bg-brand-purple text-white" : "bg-brand-purple-light text-brand-purple"
              )}
            >
              Selected {selectedModules.length} / {freeModuleLimit}
            </span>
          </div>

          <div className="mt-4 grid grid-cols-1 gap-3 sm:grid-cols-2">
            {startFreeModules.map((module) => {
              const selected = selectedModules.includes(module.slug);
              return (
                <ModuleSelectCard
                  key={module.slug}
                  module={module}
                  selected={selected}
                  disabled={!selected && atLimit}
                  onToggle={() => dispatch({ type: "toggleModule", slug: module.slug, limit: freeModuleLimit })}
                />
              );
            })}
          </div>
        </section>
      </div>

      {/* Narrow drawer / mobile: shown inline. Wide drawer: the drawer's own right panel takes over (lg:hidden). */}
      <div className="lg:hidden">
        <SelectedModuleVisualization selectedModules={selectedModuleObjects} />
      </div>
    </div>
  );
}
