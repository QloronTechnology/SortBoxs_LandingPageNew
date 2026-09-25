"use client";

import { useState, type FormEvent } from "react";
import { TicketPercent, TriangleAlert, X } from "lucide-react";
import { evaluateCoupon, findCoupon } from "@/data/coupons";
import { cn, formatINR } from "@/lib/utils";
import { useCheckout, type AppliedCoupon } from "./CheckoutProvider";

/**
 * "Coupon code" section — an always-visible code field with Apply, replaced by a chip once applied. An
 * applied coupon is re-checked on every change (cycle, modules), and shows why if it stops applying.
 */
export function CouponField() {
  const { totals, dispatch } = useCheckout();

  return (
    <section aria-labelledby="coupon-heading" className="mt-5 border-t border-brand-border pt-5">
      <h3 id="coupon-heading" className="flex items-center gap-2 font-semibold text-brand-text">
        <TicketPercent className="size-5 text-brand-purple" aria-hidden /> Coupon code
      </h3>
      {totals.coupon ? (
        <AppliedChip
          applied={totals.coupon}
          period={totals.period}
          onRemove={() => dispatch({ type: "setCoupon", coupon: null })}
        />
      ) : (
        <CouponForm />
      )}
    </section>
  );
}

function CouponForm() {
  const { state, totals, dispatch } = useCheckout();
  const [code, setCode] = useState("");
  const [error, setError] = useState<string | null>(null);

  const apply = (event: FormEvent) => {
    event.preventDefault();
    const coupon = findCoupon(code);
    if (!coupon) {
      setError("This code isn't valid. Check the spelling and try again.");
      return;
    }
    const result = evaluateCoupon(coupon, {
      amount: totals.subtotal - totals.discount,
      cycle: state.cycle,
      months: totals.period === "year" ? 12 : 1,
    });
    if (result.error) {
      setError(result.error);
      return;
    }
    dispatch({ type: "setCoupon", coupon: coupon.code });
  };

  return (
    <form onSubmit={apply} className="mt-3" noValidate>
      <label htmlFor="coupon-code" className="sr-only">
        Coupon code
      </label>
      <div className="flex gap-2">
        <input
          id="coupon-code"
          value={code}
          onChange={(event) => {
            setCode(event.target.value.toUpperCase());
            setError(null);
          }}
          placeholder="Enter coupon code"
          autoComplete="off"
          autoCapitalize="characters"
          spellCheck={false}
          aria-invalid={!!error}
          aria-describedby={error ? "coupon-error" : undefined}
          className="h-11 min-w-0 flex-1 rounded-lg border border-brand-border px-3 text-[15px] tracking-wide text-brand-text uppercase outline-none placeholder:tracking-normal placeholder:normal-case focus-visible:border-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple/30 aria-invalid:border-red-400"
        />
        <button
          type="submit"
          disabled={!code.trim()}
          className="h-11 shrink-0 rounded-lg bg-brand-purple px-5 text-sm font-semibold text-white outline-none hover:bg-brand-purple-dark focus-visible:ring-2 focus-visible:ring-brand-purple/60 disabled:cursor-not-allowed disabled:opacity-40"
        >
          Apply
        </button>
      </div>
      {error && (
        <p id="coupon-error" role="alert" className="mt-1.5 text-xs text-red-600">
          {error}
        </p>
      )}
    </form>
  );
}

function AppliedChip({
  applied,
  period,
  onRemove,
}: {
  applied: AppliedCoupon;
  period: "month" | "year";
  onRemove: () => void;
}) {
  const inactive = !!applied.error;

  return (
    <div
      className={cn(
        "mt-3 flex items-start gap-3 rounded-lg border px-3.5 py-3",
        inactive ? "border-amber-200 bg-amber-50" : "border-emerald-200 bg-emerald-50"
      )}
    >
      {inactive ? (
        <TriangleAlert className="mt-0.5 size-5 shrink-0 text-amber-600" aria-hidden />
      ) : (
        <TicketPercent className="mt-0.5 size-5 shrink-0 text-emerald-600" aria-hidden />
      )}
      <div className="min-w-0 flex-1 text-sm" aria-live="polite">
        <p className={cn("font-semibold", inactive ? "text-amber-800" : "text-emerald-800")}>
          {applied.coupon.code}
          {!inactive && <span className="font-normal"> applied · {formatINR(applied.discount)} off / {period}</span>}
        </p>
        <p className={inactive ? "text-amber-700" : "text-emerald-700"}>{applied.error ?? applied.coupon.description}</p>
      </div>
      <button
        type="button"
        onClick={onRemove}
        aria-label={`Remove coupon ${applied.coupon.code}`}
        className="-mr-1 flex size-7 shrink-0 items-center justify-center rounded-md text-brand-muted outline-none hover:bg-white/70 hover:text-brand-text focus-visible:ring-2 focus-visible:ring-brand-purple/60"
      >
        <X className="size-4" aria-hidden />
      </button>
    </div>
  );
}
