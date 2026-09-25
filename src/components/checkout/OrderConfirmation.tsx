"use client";

import { useState, type CSSProperties, type ReactNode } from "react";
import { Check, CircleCheck, Copy, FileText, Headset, Mail } from "lucide-react";
import { invoiceTermsDays } from "@/data/payment";
import { site } from "@/config/site";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout } from "./CheckoutProvider";
import { findPhoneCountry, formatPhone } from "@/data/phone";

/** "Thank you, Nikhilesh!" — first name when we have one. */
const greeting = (fullName: string) => {
  const first = fullName.trim().split(/\s+/)[0];
  return first ? `Thank you, ${first}!` : "Thank you!";
};

/** Stagger helper for the oc-* animations in globals.css. */
const delay = (ms: number) => ({ "--delay": `${ms}ms` }) as CSSProperties;

/** Burst dots around the icon on a successful payment: [x, y] offsets and colour. */
const burst: [number, number, string][] = [
  [-58, -34, "bg-brand-purple"],
  [60, -30, "bg-emerald-400"],
  [-66, 18, "bg-amber-400"],
  [66, 22, "bg-brand-purple"],
  [-30, -60, "bg-emerald-400"],
  [32, -62, "bg-amber-400"],
  [-40, 52, "bg-brand-purple/70"],
  [42, 54, "bg-emerald-400"],
];

/**
 * The drawer's last screen, for both endings of the checkout: an invoice request (no payment yet) or a
 * verified online payment. Same layout — status header, order summary, what happens next, and help.
 */

export function InvoiceRequested({ requestId, amount }: { requestId: string; amount: number }) {
  const { state } = useCheckout();
  const { email } = state.billing;
  const phone = formatPhone(state.billing.phone, findPhoneCountry(state.billing.phoneCountry));
  const thanks = greeting(state.billing.fullName);

  return (
    <Confirmation
      icon={<FileText className="size-8" aria-hidden />}
      status={{ label: "Awaiting payment", tone: "amber" }}
      title="Invoice request received"
      intro={`${thanks} No payment has been taken. Your plan is reserved while you complete the bank transfer.`}
      reference={{ label: "Reference number", value: requestId, hint: "Quote this on your bank transfer" }}
      amountLabel="Amount due"
      amount={amount}
      extraRows={[
        ["Invoice sent to", email],
        ["Payment terms", `${invoiceTermsDays} days from the invoice date`],
      ]}
      timeline={[
        { title: "Request received", text: "We have your order details.", state: "done" },
        { title: "Invoice emailed", text: `A tax invoice for ${formatINR(amount)} goes to ${email}.`, state: "current" },
        {
          title: "Pay by bank transfer",
          text: `Use the bank details on the invoice and quote ${requestId}.`,
          state: "upcoming",
        },
        { title: "Workspace activated", text: "Once we confirm your payment, your account goes live.", state: "upcoming" },
      ]}
      help={`A SortBoxs representative will call you${phone ? ` on ${phone}` : ""} within one business day to help with your order and onboarding.`}
    />
  );
}

export function PaymentSuccess({ orderId, paymentId, amount }: { orderId: string; paymentId: string; amount: number }) {
  const { state } = useCheckout();
  const { email } = state.billing;
  const thanks = greeting(state.billing.fullName);

  return (
    <Confirmation
      icon={<CircleCheck className="size-8" aria-hidden />}
      status={{ label: "Paid", tone: "green" }}
      title="Payment successful"
      intro={`${thanks} We've received ${formatINR(amount)} and your SortBoxs workspace is being set up.`}
      reference={{ label: "Payment ID", value: paymentId, hint: "Keep this for your records" }}
      amountLabel="Amount paid"
      amount={amount}
      extraRows={[
        ["Order ID", orderId],
        ["Receipt sent to", email],
      ]}
      timeline={[
        { title: "Payment confirmed", text: "Verified with Razorpay.", state: "done" },
        { title: "Workspace set-up", text: "We're preparing your modules and users.", state: "current" },
        { title: "Welcome email", text: `Sign-in details and your tax invoice go to ${email}.`, state: "upcoming" },
      ]}
      help="Our onboarding team will reach out to help you get started."
      celebrate
    />
  );
}

type Step = { title: string; text: string; state: "done" | "current" | "upcoming" };

function Confirmation({
  icon,
  status,
  title,
  intro,
  reference,
  amountLabel,
  amount,
  extraRows,
  timeline,
  help,
  celebrate = false,
}: {
  icon: ReactNode;
  status: { label: string; tone: "amber" | "green" };
  title: string;
  intro: string;
  reference: { label: string; value: string; hint: string };
  amountLabel: string;
  amount: number;
  extraRows: [string, string][];
  timeline: Step[];
  help: string;
  /** Paid orders get a small burst of dots; invoice requests don't (nothing is paid yet). */
  celebrate?: boolean;
}) {
  const { state, totals } = useCheckout();
  const planLabel = totals.plan
    ? `${totals.plan.name} · ${totals.totalUsers} ${totals.totalUsers === 1 ? "user" : "users"}`
    : `${totals.lines.length} ${totals.lines.length === 1 ? "module" : "modules"} · ${totals.totalUsers} users`;

  return (
    <div role="status">
      {/* Status header */}
      <div className="relative overflow-hidden bg-[linear-gradient(135deg,#f6f4ff_0%,#ece6ff_100%)] px-5 pt-8 pb-7 text-center sm:px-8">
        <span aria-hidden className="absolute -top-16 -right-10 size-48 rounded-full bg-white/50" />
        <span aria-hidden className="absolute -bottom-20 -left-12 size-48 rounded-full bg-white/40" />
        <div className="relative">
          <span className="relative mx-auto block size-16">
            <span aria-hidden className="oc-ripple absolute inset-0 rounded-2xl bg-brand-purple/25" style={delay(450)} />
            {celebrate &&
              burst.map(([dx, dy, color], i) => (
                <span
                  key={i}
                  aria-hidden
                  className={cn("oc-burst absolute top-1/2 left-1/2 size-2 rounded-full", color)}
                  style={{ ...delay(420 + (i % 3) * 40), "--dx": `${dx}px`, "--dy": `${dy}px` } as CSSProperties}
                />
              ))}
            <span
              className="oc-pop relative flex size-16 items-center justify-center rounded-2xl bg-white text-brand-purple shadow-lg shadow-brand-purple/10"
              style={delay(100)}
            >
              {icon}
            </span>
            <span
              className="oc-pop absolute -right-1.5 -bottom-1.5 flex size-6 items-center justify-center rounded-full bg-emerald-500 text-white ring-4 ring-[#efe9ff]"
              style={delay(450)}
            >
              <Check className="size-3.5" strokeWidth={3} aria-hidden />
            </span>
          </span>
          <span
            style={delay(350)}
            className={cn(
              "oc-rise mt-5 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-semibold",
              status.tone === "amber" ? "bg-amber-100 text-amber-800" : "bg-emerald-100 text-emerald-800"
            )}
          >
            <span className={cn("size-1.5 rounded-full", status.tone === "amber" ? "bg-amber-500" : "bg-emerald-500")} />
            {status.label}
          </span>
          <h2 id="drawer-title" className="oc-rise mt-3 text-2xl font-bold text-brand-text sm:text-[28px]" style={delay(430)}>
            {title}
          </h2>
          <p className="oc-rise mx-auto mt-2 max-w-md text-[15px] text-brand-muted" style={delay(510)}>
            {intro}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-4 px-4 py-5 sm:px-6">
        {/* Order summary */}
        <section aria-label="Order summary" className="oc-rise overflow-hidden rounded-xl border border-brand-border" style={delay(620)}>
          <div className="flex flex-wrap items-center justify-between gap-3 border-b border-dashed border-brand-border bg-[#faf9ff] px-4 py-3.5 sm:px-5">
            <div className="min-w-0">
              <p className="text-xs font-medium tracking-wide text-brand-muted uppercase">{reference.label}</p>
              <p className="font-mono text-lg font-semibold text-brand-text [overflow-wrap:anywhere]">{reference.value}</p>
              <p className="text-xs text-brand-muted">{reference.hint}</p>
            </div>
            <CopyButton value={reference.value} />
          </div>
          <dl className="grid grid-cols-1 gap-x-6 gap-y-3 px-4 py-4 text-sm sm:grid-cols-2 sm:px-5">
            <div className="sm:col-span-2 flex items-baseline justify-between gap-3 rounded-lg bg-brand-purple-light/60 px-3.5 py-2.5">
              <dt className="font-medium text-brand-purple">{amountLabel}</dt>
              <dd className="text-xl font-bold text-brand-purple tabular-nums">
                {formatINR(amount)}{" "}
                <span className="text-sm font-normal text-brand-muted">/ {totals.period === "year" ? "Year" : "Month"}</span>
              </dd>
            </div>
            <SummaryRow label="Plan">{planLabel}</SummaryRow>
            <SummaryRow label="Billing">{state.cycle === "yearly" ? "Yearly" : "Monthly"}</SummaryRow>
            {extraRows.map(([label, value]) => (
              <SummaryRow key={label} label={label}>
                {value}
              </SummaryRow>
            ))}
          </dl>
        </section>

        {/* What happens next */}
        <section
          aria-labelledby="next-steps"
          className="oc-rise rounded-xl border border-brand-border px-4 py-4 sm:px-5"
          style={delay(720)}
        >
          <h3 id="next-steps" className="font-semibold text-brand-text">
            What happens next
          </h3>
          <ol className="mt-4">
            {timeline.map((step, index) => (
              <li key={step.title} className="oc-rise relative flex gap-3.5 pb-5 last:pb-0" style={delay(850 + index * 110)}>
                {index < timeline.length - 1 && (
                  <span aria-hidden className="absolute top-7 bottom-0 left-[13px] w-0.5 bg-brand-border">
                    {/* A finished step's connector draws down towards the next one. */}
                    {step.state === "done" && (
                      <span className="oc-draw-down absolute inset-0 bg-emerald-400" style={delay(1000 + index * 110)} />
                    )}
                  </span>
                )}
                <span
                  className={cn(
                    "relative flex size-7 shrink-0 items-center justify-center rounded-full text-xs font-semibold",
                    step.state === "done" && "bg-emerald-500 text-white",
                    step.state === "current" && "oc-breathe bg-brand-purple text-white",
                    step.state === "upcoming" && "border-2 border-brand-border bg-white text-brand-muted"
                  )}
                >
                  {step.state === "done" ? <Check className="size-4" strokeWidth={3} aria-hidden /> : index + 1}
                </span>
                <span className="min-w-0 pt-0.5">
                  <span className="flex flex-wrap items-center gap-2">
                    <span className={cn("font-semibold", step.state === "upcoming" ? "text-brand-muted" : "text-brand-text")}>
                      {step.title}
                    </span>
                    {step.state === "current" && (
                      <span className="rounded-full bg-brand-purple-light px-2 py-0.5 text-[11px] font-medium text-brand-purple">
                        Next
                      </span>
                    )}
                  </span>
                  <span className="block text-sm text-brand-muted [overflow-wrap:anywhere]">{step.text}</span>
                </span>
              </li>
            ))}
          </ol>
        </section>

        {/* Help */}
        <section
          aria-label="Help"
          className="oc-rise flex items-start gap-3.5 rounded-xl bg-brand-surface px-4 py-4 sm:px-5"
          style={delay(820)}
        >
          <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple shadow-sm">
            <Headset className="size-5" aria-hidden />
          </span>
          <div className="min-w-0 text-sm">
            <p className="text-brand-text">{help}</p>
            <a
              href={`mailto:${site.supportEmail}`}
              className="mt-1.5 inline-flex items-center gap-1.5 font-medium text-brand-purple hover:underline"
            >
              <Mail className="size-4" aria-hidden /> {site.supportEmail}
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}

function SummaryRow({ label, children }: { label: string; children: ReactNode }) {
  return (
    <div className="min-w-0">
      <dt className="text-xs text-brand-muted">{label}</dt>
      <dd className="font-medium text-brand-text [overflow-wrap:anywhere]">{children}</dd>
    </div>
  );
}

function CopyButton({ value }: { value: string }) {
  const [copied, setCopied] = useState(false);

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(value);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Clipboard blocked: the value is on screen to copy by hand.
    }
  };

  return (
    <button
      type="button"
      onClick={copy}
      className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-brand-border bg-white px-3 text-sm font-medium text-brand-text outline-none hover:border-brand-purple/40 focus-visible:ring-2 focus-visible:ring-brand-purple/60"
    >
      {copied ? (
        <Check key="copied" className="oc-pop size-4 text-emerald-600" strokeWidth={3} aria-hidden />
      ) : (
        <Copy className="size-4" aria-hidden />
      )}
      <span aria-live="polite">{copied ? "Copied" : "Copy"}</span>
    </button>
  );
}
