"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { Loader2, Rocket, X } from "lucide-react";
import { useLocationHash } from "@/components/checkout/checkoutRequest";
import { Button } from "@/components/ui/Button";
import { StartFreeProvider, useStartFree } from "./StartFreeProvider";
import { StartFreeStepper } from "./StartFreeStepper";
import { WorkspaceSetupStep } from "./WorkspaceSetupStep";
import { YourDetailsStep, type YourDetailsStepHandle } from "./YourDetailsStep";
import { SelectedModuleVisualization } from "./SelectedModuleVisualization";
import { WorkspaceProgressVisual } from "./WorkspaceProgressVisual";
import { StartFreeSuccess } from "./StartFreeSuccess";
import { clearSavedStartFree } from "./StartFreeProvider";
import { createFreeAccount } from "./startFreeApi";
import { closeStartFree, START_FREE_HASH, useStartFreeLinks } from "./startFreeRequest";
import { startFreeModules } from "@/data/startFree";

const copy = {
  1: {
    eyebrow: "CREATE YOUR ACCOUNT",
    heading: "Set Up Your SortBoxs Workspace",
    description: "Choose your domain and the modules you want to get started with. You can always add more modules later.",
  },
  2: {
    eyebrow: "CREATE YOUR ACCOUNT",
    heading: "Tell Us About Yourself",
    description: "Add your details and invite your team members. We'll set up your workspace and send invitations so your team can get started.",
  },
} as const;

/**
 * Renders the Start Free drawer whenever the URL hash is #start-free (see startFreeRequest.ts). Mounted
 * once in the root layout, so every "Start Free" button on every page opens it — a right-hand drawer over
 * whatever page is open, the same shell as the checkout drawer. Portalled to <body> so the sticky header's
 * backdrop-blur doesn't become its containing block.
 */
export function StartFreeDrawerHost() {
  useStartFreeLinks();
  const open = useLocationHash() === START_FREE_HASH; // false on the server
  if (!open) return null;
  // Re-opening the drawer restores any unfinished progress from sessionStorage (StartFreeProvider), the
  // same way the checkout drawer does.
  return createPortal(
    <StartFreeProvider>
      <DrawerPanel onClose={closeStartFree} />
    </StartFreeProvider>,
    document.body
  );
}

function DrawerPanel({ onClose }: { onClose: () => void }) {
  const { state } = useStartFree();
  const [step, setStep] = useState<1 | 2>(1);
  const [submitting, setSubmitting] = useState(false);
  const [done, setDone] = useState(false);
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const details = useRef<YourDetailsStepHandle>(null);

  // Modal behaviour: lock page scroll, focus the panel, close on Escape, restore focus on close.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const overflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    panel.current?.focus();
    const onKey = (event: KeyboardEvent) => event.key === "Escape" && onClose();
    document.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      document.removeEventListener("keydown", onKey);
      previous?.focus();
    };
  }, [onClose]);

  const goTo = (next: 1 | 2) => {
    setStep(next);
    body.current?.scrollTo({ top: 0 });
  };

  const canContinueStep1 = state.domainStatus === "available" && state.selectedModules.length > 0;

  const handleCreateAccount = () => {
    if (!details.current?.validate()) return;
    handleSubmit();
  };

  const handleSubmit = async () => {
    if (submitting) return; // guards against a duplicate submission from a double click
    setSubmitting(true);
    try {
      await createFreeAccount({
        domain: state.domain,
        selectedModules: state.selectedModules,
        fullName: state.fullName,
        workEmail: state.workEmail,
        phone: state.phone,
        phoneCountry: state.phoneCountry,
        jobTitle: state.jobTitle,
        companyName: state.companyName,
        companySize: state.companySize,
        inviteEmails: state.inviteEmails,
      });
      clearSavedStartFree();
      setDone(true);
      body.current?.scrollTo({ top: 0 });
    } finally {
      setSubmitting(false);
    }
  };

  const { eyebrow, heading, description } = copy[step];

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close Start Free"
        onClick={onClose}
        className="drawer-fade absolute inset-0 cursor-default bg-brand-navy/50 backdrop-blur-[2px]"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="start-free-title"
        tabIndex={-1}
        className="drawer-in absolute inset-y-0 right-0 flex w-[90%] flex-col bg-white shadow-2xl outline-none"
      >
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 bg-brand-purple px-4 text-white sm:px-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <Rocket className="size-5" aria-hidden /> Start Free
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close Start Free"
            className="flex size-9 items-center justify-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        {/* Progress and the primary CTA belong to the left (form) column only — never spanning the right
            visualization. */}
        <div className="flex flex-1 overflow-hidden">
        <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
          {!done && <StartFreeStepper current={step} onSelect={goTo} />}

          <div ref={body} className="flex-1 overflow-y-auto overscroll-contain">
            {done ? (
              <div className="px-4 py-6 sm:px-6">
                <StartFreeSuccess domain={state.domain} email={state.workEmail} onClose={onClose} />
              </div>
            ) : (
              <>
                <div className="bg-[linear-gradient(110deg,#f6f4ff_0%,#f1eefe_55%,#e9e3ff_100%)] px-4 py-5 sm:px-6">
                  <p className="text-xs font-semibold tracking-[0.2em] text-brand-purple uppercase">{eyebrow}</p>
                  <h2 id="start-free-title" className="mt-1 text-2xl font-bold text-brand-text">
                    {heading}
                  </h2>
                  <p className="mt-1.5 text-sm text-brand-muted">{description}</p>
                </div>

                <div className="px-4 py-5 sm:px-6">
                  {step === 1 ? <WorkspaceSetupStep /> : <YourDetailsStep ref={details} onChangeModules={() => goTo(1)} />}
                </div>
              </>
            )}
          </div>

          {/* Sticky footer: stays visible while the form above scrolls, same as the checkout drawer. */}
          {!done && (
            <footer className="flex shrink-0 items-center gap-3 border-t border-brand-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(23,22,92,0.2)] sm:px-6">
              {step === 1 ? (
                <Button
                  type="button"
                  onClick={() => goTo(2)}
                  disabled={!canContinueStep1}
                  className="w-full disabled:cursor-not-allowed disabled:opacity-50 sm:ml-auto sm:w-auto"
                >
                  Continue to Your Details
                </Button>
              ) : (
                <div className="flex w-full gap-3 sm:ml-auto sm:w-auto">
                  <Button variant="outline" type="button" onClick={() => goTo(1)} disabled={submitting}>
                    Back
                  </Button>
                  <Button type="button" onClick={handleCreateAccount} disabled={submitting} className="flex-1 sm:flex-none">
                    {submitting ? (
                      <span className="flex items-center gap-2">
                        <Loader2 className="size-4 animate-spin" aria-hidden /> Creating Account...
                      </span>
                    ) : (
                      "Create Free Account"
                    )}
                  </Button>
                </div>
              )}
            </footer>
          )}
        </div>

        {/* Right panel: visual only, live preview of the workspace being configured — a full-height
            canvas, never interrupted by the header, progress or form controls. */}
        {!done && (
          <aside className="hidden w-[380px] shrink-0 overflow-y-auto border-l border-brand-border bg-[#faf9ff] p-6 lg:flex lg:flex-col lg:justify-center">
            {step === 1 ? (
              <SelectedModuleVisualization
                selectedModules={startFreeModules.filter((module) => state.selectedModules.includes(module.slug))}
              />
            ) : (
              <WorkspaceProgressVisual
                selectedModules={startFreeModules.filter((module) => state.selectedModules.includes(module.slug))}
                inviteEmails={state.inviteEmails}
              />
            )}
          </aside>
        )}
        </div>
      </div>
    </div>
  );
}
