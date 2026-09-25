"use client";

import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";
import { ArrowRight, FileText, LoaderCircle, LockKeyhole, X } from "lucide-react";
import { checkoutHero, checkoutSteps, type CheckoutStepId } from "@/data/checkout";
import { formatINR } from "@/lib/utils";
import { CheckoutProvider, clearSavedCheckout, useCheckout } from "./CheckoutProvider";
import { payWithRazorpay } from "./razorpayCheckout";
import { requestInvoice } from "./invoiceRequest";
import { effectiveMethod } from "./BillingStep";
import { closeCheckout, parseCheckoutHash, syncCheckoutHash, useLocationHash } from "./checkoutRequest";
import { CheckoutStepper } from "./CheckoutStepper";
import { BillingCycleToggle, ConfigureModules } from "./ConfigureStep";
import { PlanStep } from "./PlanStep";
import { BillingStep, type BillingStepHandle } from "./BillingStep";
import { ReviewStep } from "./ReviewStep";
import { InvoiceRequested, PaymentSuccess } from "./OrderConfirmation";
import { PlanSummary } from "./PlanSummary";

/**
 * The checkout, as a right-hand drawer over /pricing. Render once per page: it opens whenever the URL
 * hash asks for a checkout (see checkoutRequest.ts) — from a plan card ("Get Started") or "Customize
 * Your Plan". Step 1 shows the chosen plan, or the module picker for a custom plan. The step is local
 * state, the plan summary sits below, and Continue lives in a sticky footer. Portalled to <body> so the
 * sticky site header's backdrop-blur doesn't become its containing block.
 */
export function CheckoutDrawerHost() {
  const request = parseCheckoutHash(useLocationHash()); // null on the server
  // A new checkout link (hashchange) starts a fresh checkout; our own replaceState syncs don't fire it.
  const [session, setSession] = useState(0);
  useEffect(() => {
    const onHashChange = () => setSession((n) => n + 1);
    window.addEventListener("hashchange", onHashChange);
    return () => window.removeEventListener("hashchange", onHashChange);
  }, []);

  if (!request) return null;
  return createPortal(
    <CheckoutProvider key={session} request={request}>
      <DrawerPanel onClose={closeCheckout} />
    </CheckoutProvider>,
    document.body
  );
}

function DrawerPanel({ onClose }: { onClose: () => void }) {
  const { state, totals, ready } = useCheckout();
  const [step, setStep] = useState<CheckoutStepId>("configure");
  const [payment, setPayment] = useState<
    | { phase: "idle" | "paying" }
    | { phase: "error"; message: string }
    | { phase: "paid"; orderId: string; paymentId: string; amount: number }
    | { phase: "invoiced"; requestId: string; amount: number; period: "month" | "year"; email: string }
  >({ phase: "idle" });
  const done = payment.phase === "paid" || payment.phase === "invoiced";
  const invoice = effectiveMethod(state, totals) === "invoice";
  const panel = useRef<HTMLDivElement>(null);
  const body = useRef<HTMLDivElement>(null);
  const billing = useRef<BillingStepHandle>(null);

  const stepIndex = checkoutSteps.findIndex((s) => s.id === step);
  const next = checkoutSteps[stepIndex + 1];

  const goTo = (id: CheckoutStepId) => {
    setStep(id);
    body.current?.scrollTo({ top: 0 });
  };

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

  // Switching plan or cycle inside the drawer updates the link, so a refresh reopens the same thing.
  useEffect(() => {
    if (ready) syncCheckoutHash({ plan: state.plan, cycle: state.plan ? state.cycle : null });
  }, [ready, state.plan, state.cycle]);

  const pay = async () => {
    setPayment({ phase: "paying" });

    // Invoice / bank transfer: no online payment — send the request, then show what happens next.
    if (invoice) {
      const request = await requestInvoice(state);
      if (request.status === "requested") {
        clearSavedCheckout();
        setPayment({ phase: "invoiced", ...request });
        body.current?.scrollTo({ top: 0 });
      } else {
        setPayment({ phase: "error", message: request.message });
      }
      return;
    }

    const result = await payWithRazorpay(state);
    if (result.status === "paid") {
      clearSavedCheckout();
      setPayment({ phase: "paid", orderId: result.orderId, paymentId: result.paymentId, amount: result.amount });
      body.current?.scrollTo({ top: 0 });
    } else {
      setPayment(result.status === "failed" ? { phase: "error", message: result.message } : { phase: "idle" });
    }
  };

  const addModules = () => {
    if (step !== "configure") setStep("configure");
    requestAnimationFrame(() => document.getElementById("modules")?.scrollIntoView({ behavior: "smooth" }));
  };

  return (
    <div className="fixed inset-0 z-[70]">
      <button
        type="button"
        aria-label="Close checkout"
        onClick={onClose}
        className="drawer-fade absolute inset-0 cursor-default bg-brand-navy/50 backdrop-blur-[2px]"
      />

      <div
        ref={panel}
        role="dialog"
        aria-modal="true"
        aria-labelledby="drawer-title"
        tabIndex={-1}
        className="drawer-in absolute inset-y-0 right-0 flex w-full max-w-[760px] flex-col bg-white shadow-2xl outline-none"
      >
        <header className="flex h-14 shrink-0 items-center justify-between gap-3 bg-brand-purple px-4 text-white sm:px-5">
          <p className="flex items-center gap-2 text-sm font-semibold">
            <LockKeyhole className="size-5" aria-hidden /> Secure Checkout
          </p>
          <button
            type="button"
            onClick={onClose}
            aria-label="Close checkout"
            className="flex size-9 items-center justify-center rounded-full outline-none hover:bg-white/15 focus-visible:ring-2 focus-visible:ring-white"
          >
            <X className="size-5" aria-hidden />
          </button>
        </header>

        <CheckoutStepper current={step} onSelect={goTo} compact complete={done} />

        <div ref={body} className="flex-1 overflow-y-auto overscroll-contain">
          {payment.phase === "paid" ? (
            <PaymentSuccess {...payment} />
          ) : payment.phase === "invoiced" ? (
            <InvoiceRequested {...payment} />
          ) : (
          <>
          <div className="bg-[linear-gradient(110deg,#f6f4ff_0%,#f1eefe_55%,#e9e3ff_100%)] px-4 py-5 sm:px-6">
            <p className="text-xs font-semibold tracking-[0.2em] text-brand-purple uppercase">
              Step {stepIndex + 1} of {checkoutSteps.length}
            </p>
            <h2 id="drawer-title" className="mt-1 text-2xl font-bold text-brand-text">
              {step === "review"
                ? "Review your order"
                : step !== "configure"
                ? checkoutSteps[stepIndex].label
                : totals.plan
                  ? `Get started with ${totals.plan.name}`
                  : checkoutHero.title}
            </h2>
            {step === "review" && (
              <p className="mt-1.5 text-sm text-brand-muted">
                Please review your subscription details before completing the payment.
              </p>
            )}
            {step === "billing" && (
              <p className="mt-1.5 text-sm text-brand-muted">
                Almost there! Add your billing details and payment information to activate your SortBoxs workspace.
              </p>
            )}
            {step === "configure" && (
              <>
                <p className="mt-1.5 text-sm text-brand-muted">
                  {totals.plan
                    ? "Choose how many users you need and how you'd like to be billed."
                    : checkoutHero.description}
                </p>
                <div className="mt-4">
                  <BillingCycleToggle size="md" />
                </div>
              </>
            )}
          </div>

          <div className="flex flex-col gap-6 px-4 py-5 sm:px-6">
            {step === "configure" && (totals.plan ? <PlanStep /> : <ConfigureModules gridClassName="sm:grid-cols-2" />)}
            {step === "billing" && <BillingStep ref={billing} />}
            {step === "review" && (
              <ReviewStep onEditPlan={() => goTo("configure")} onEditBilling={() => goTo("billing")} payError={payment.phase === "error" ? payment.message : null} />
            )}
            <div id="drawer-plan" className="scroll-mt-4">
              <PlanSummary
                onAddModules={addModules}
                onEditPlan={step !== "configure" ? () => goTo("configure") : undefined}
                readOnly={step === "review"}
                className="shadow-none"
              />
            </div>
          </div>
          </>
          )}
        </div>

        {done ? (
          <footer className="flex shrink-0 justify-end border-t border-brand-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] sm:px-6">
            <button
              type="button"
              onClick={onClose}
              className="flex h-11 items-center gap-2 rounded-lg bg-brand-purple px-6 text-[15px] font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60"
            >
              Done
            </button>
          </footer>
        ) : (
        <footer className="flex shrink-0 items-center gap-3 border-t border-brand-border bg-white px-4 pt-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] shadow-[0_-8px_24px_-12px_rgba(23,22,92,0.2)] sm:px-6">
          <button
            type="button"
            onClick={() => document.getElementById("drawer-plan")?.scrollIntoView({ behavior: "smooth" })}
            className="min-w-0 flex-1 rounded text-left outline-none focus-visible:ring-2 focus-visible:ring-brand-purple/60"
          >
            <span className="block truncate text-xs text-brand-muted">
              Total ({totals.period === "year" ? "Yearly" : "Monthly"})
              {/* Plan details and the link only where there's room. */}
              <span className="hidden sm:inline">
                {" · "}
                {totals.plan
                  ? `${totals.plan.name} · ${totals.totalUsers} ${totals.totalUsers === 1 ? "user" : "users"}`
                  : `${totals.lines.length} ${totals.lines.length === 1 ? "module" : "modules"}`}
                {" · "}
                <span className="text-brand-purple underline">View plan</span>
              </span>
            </span>
            <span className="flex items-baseline gap-1.5 whitespace-nowrap">
              {/* Period at the amount's size, in the quieter muted colour: ₹29,494 / Month */}
              <span className="text-lg sm:text-xl">
                <span className="font-bold text-brand-purple tabular-nums">{formatINR(totals.total)}</span>{" "}
                <span className="text-brand-muted">/ {totals.period === "year" ? "Year" : "Month"}</span>
              </span>
              {totals.tax.pending && <span className="text-xs text-brand-muted sm:text-sm">+ tax</span>}
            </span>
          </button>

          <button
            type="button"
            onClick={
              next
                ? () => {
                    // Step 2 checks its form first and points at the first problem.
                    if (step === "billing" && !billing.current?.validate()) return;
                    goTo(next.id);
                  }
                : pay
            }
            disabled={
              next ? !totals.canContinue : !totals.canContinue || !state.termsAccepted || payment.phase === "paying"
            }
            aria-busy={payment.phase === "paying"}
            className="flex h-11 shrink-0 items-center gap-2 rounded-lg bg-brand-purple px-4 text-[15px] font-semibold whitespace-nowrap text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:bg-brand-purple/40 sm:px-5"
          >
            {!next &&
              (payment.phase === "paying" ? (
                <LoaderCircle className="size-4 animate-spin" aria-hidden />
              ) : invoice ? (
                <FileText className="size-4" aria-hidden />
              ) : (
                <LockKeyhole className="size-4" aria-hidden />
              ))}
            {next ? (
              <>
                <span className="sm:hidden">Continue</span>
                <span className="hidden sm:inline">Continue to {next.id === "billing" ? "Billing" : "Review"}</span>
              </>
            ) : payment.phase === "paying" ? (
              invoice ? "Sending…" : "Waiting for payment…"
            ) : invoice ? (
              "Request Invoice"
            ) : (
              <>
                Pay <span className="hidden sm:inline">{formatINR(totals.total)} Now</span>
              </>
            )}
            {next && <ArrowRight className="size-4" aria-hidden />}
          </button>
        </footer>
        )}
      </div>
    </div>
  );
}
