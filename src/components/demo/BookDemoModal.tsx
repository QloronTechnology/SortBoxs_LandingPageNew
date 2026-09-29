"use client";

import { useEffect, useLayoutEffect, useRef, useState, type KeyboardEvent, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { X } from "lucide-react";
import { Logo } from "@/components/ui/Logo";
import { useLocationHash } from "@/components/checkout/checkoutRequest";
import { bookDemoBenefits, bookDemoCopy } from "@/data/bookDemo";
import { cn } from "@/lib/utils";
import { BOOK_DEMO_HASH, closeBookDemo, useBookDemoLinks } from "./bookDemoRequest";
import { BookDemoForm } from "./BookDemoForm";
import { BookDemoJourneyAnimation } from "./BookDemoJourneyAnimation";
import { BookDemoSuccess } from "./BookDemoSuccess";
import { useBookDemo } from "./useBookDemo";

/**
 * Renders the Book a Demo modal whenever the URL hash is #book-demo (see bookDemoRequest.ts). Mounted
 * once in the root layout, so every "Book a Demo" button on every page opens it. Portalled to <body> so
 * the sticky header's backdrop-blur doesn't become its containing block.
 */
export function BookDemoHost() {
  useBookDemoLinks();
  const open = useLocationHash() === BOOK_DEMO_HASH; // false on the server
  if (!open) return null;
  return createPortal(<BookDemoModal onClose={closeBookDemo} />, document.body);
}

const FOCUSABLE = 'a[href], button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])';

function BookDemoModal({ onClose }: { onClose: () => void }) {
  const dialog = useRef<HTMLDivElement>(null);
  const scroller = useRef<HTMLDivElement>(null);
  const formColumn = useRef<HTMLElement>(null);
  const { state: booking, submit } = useBookDemo();
  const booked = booking.phase === "booked";

  // Modal behaviour: lock page scroll, focus the dialog, restore focus on close. The lock is on <html>
  // so it doesn't fight the mobile menu, which locks <body> and may be closing at the same moment.
  useEffect(() => {
    const previous = document.activeElement as HTMLElement | null;
    const root = document.documentElement;
    const overflow = root.style.overflow;
    root.style.overflow = "hidden";
    dialog.current?.focus({ preventScroll: true });
    return () => {
      root.style.overflow = overflow;
      previous?.focus?.({ preventScroll: true });
    };
  }, []);

  // Booked: show the confirmation from the top.
  useEffect(() => {
    if (booked) {
      scroller.current?.scrollTo({ top: 0 });
      formColumn.current?.scrollTo({ top: 0 });
      dialog.current?.focus({ preventScroll: true });
    }
  }, [booked]);

  const onKeyDown = (event: KeyboardEvent) => {
    if (event.key === "Escape") {
      event.preventDefault();
      onClose();
    } else if (event.key === "Tab") {
      // Keep Tab inside the dialog.
      const items = Array.from(dialog.current?.querySelectorAll<HTMLElement>(FOCUSABLE) ?? []).filter((el) => el.offsetParent !== null);
      if (!items.length) return;
      const first = items[0];
      const last = items[items.length - 1];
      if (event.shiftKey && (document.activeElement === first || document.activeElement === dialog.current)) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    }
  };

  return (
    <div ref={scroller} className="fixed inset-0 z-[70] overflow-y-auto overscroll-contain">
      <div aria-hidden onClick={onClose} className="drawer-fade fixed inset-0 bg-brand-navy/55 backdrop-blur-[3px]" />

      {/* Desktop (lg+): the modal is capped to the viewport so it all fits on one laptop screen; if a
          screen is shorter still, only the form column scrolls. Below lg the whole sheet scrolls. */}
      <div className="pointer-events-none relative flex min-h-full items-stretch justify-center sm:items-center sm:p-4">
        <div
          ref={dialog}
          role="dialog"
          aria-modal="true"
          aria-labelledby="book-demo-title"
          tabIndex={-1}
          onKeyDown={onKeyDown}
          className="demo-modal-in pointer-events-auto relative w-full max-w-[1240px] overflow-clip bg-white shadow-[0_30px_80px_-20px_rgba(23,22,92,0.45)] outline-none sm:rounded-[20px] lg:flex lg:max-h-[calc(100dvh-2rem)] lg:min-h-[min(48rem,calc(100dvh-2rem))] lg:flex-col"
        >
          {/* Sticky, zero-height row: the close button stays reachable while the modal scrolls. */}
          <div className="sticky top-0 z-20 h-0">
            <button
              type="button"
              onClick={onClose}
              aria-label="Close book a demo"
              className="absolute top-3 right-3 flex size-10 items-center justify-center rounded-full bg-white/90 text-brand-text shadow-sm ring-1 ring-brand-border outline-none backdrop-blur transition-colors hover:bg-brand-purple-light hover:text-brand-purple focus-visible:ring-2 focus-visible:ring-brand-purple sm:top-5 sm:right-5 lg:top-3.5 lg:right-5 lg:bg-transparent lg:shadow-none lg:ring-0 lg:hover:bg-brand-purple-light"
            >
              <X className="size-6" strokeWidth={1.75} aria-hidden />
            </button>
          </div>

          <div className="grid lg:min-h-0 lg:flex-auto lg:grid-cols-[36%_1fr] lg:grid-rows-[minmax(0,1fr)]">
            <BrandPanel />

            <section
              ref={formColumn}
              className="min-w-0 px-5 pt-6 pb-8 sm:px-8 lg:flex lg:min-h-0 lg:flex-col lg:overflow-y-auto lg:overscroll-contain lg:px-8 lg:pt-4 lg:pb-4 short:pt-3 short:pb-3 xl:px-10"
              aria-label={booked ? "Booking confirmation" : "Booking details"}>
              {booked ? (
                <BookDemoSuccess request={booking.request} onClose={onClose} />
              ) : (
                <>
                  <header className="mb-5 pr-12 lg:mb-3.5">
                    {/* Visual repeat of the panel heading (the dialog's name), so not a second h2. */}
                    <p className="hidden items-center gap-3 text-[26px] leading-tight font-bold text-brand-text lg:flex xl:text-[24px]">
                      <span aria-hidden>{bookDemoCopy.title}</span>
                    </p>
                    <p className="max-w-[26rem] text-[15px] leading-relaxed text-brand-muted lg:mt-1 lg:max-w-none lg:text-[13.5px] lg:leading-snug lg:text-balance short:hidden">{bookDemoCopy.formIntro}</p>
                  </header>
                  <BookDemoForm booking={booking} onSubmit={submit} />
                </>
              )}
            </section>
          </div>
        </div>
      </div>
    </div>
  );
}

/** Left column: logo, pitch, benefits and the booking-journey animation. Stacks above the form on mobile. */
function BrandPanel() {
  return (
    <aside className="relative isolate flex min-w-0 flex-col overflow-hidden bg-[linear-gradient(165deg,#f7f5ff_0%,#f0ebff_48%,#e6ddff_100%)] px-5 pt-6 pb-6 sm:px-8 sm:pt-8 lg:min-h-0 lg:px-8 lg:pt-7 lg:pb-7 xl:px-10">
      {/* Soft brand glows */}
      <span aria-hidden className="absolute -top-24 -left-20 -z-10 size-72 rounded-full bg-white/70 blur-3xl" />
      <span aria-hidden className="absolute right-[-6rem] bottom-24 -z-10 size-80 rounded-full bg-brand-purple/15 blur-3xl" />

      <Logo width={150} height={34} className="self-start [&_img]:h-8 [&_img]:w-auto sm:[&_img]:h-9 lg:[&_img]:h-10" />

      <h2 id="book-demo-title" className="mt-6 text-[34px] leading-[1.08] font-extrabold tracking-tight text-brand-text sm:text-[42px] lg:mt-9 lg:text-[40px] xl:text-[46px] short:mt-6 short:text-[36px]">
        Book a <span className="text-brand-purple">Demo</span>
      </h2>
      <p className="mt-3 max-w-[30rem] text-[15px] leading-relaxed text-brand-text/75 sm:text-base lg:mt-4 lg:text-[15px] xl:text-base short:mt-3 short:text-sm">
        {bookDemoCopy.intro}
      </p>

      <ul className="mt-6 grid gap-3 sm:grid-cols-3 sm:gap-4 lg:mt-5 lg:grid-cols-1 lg:gap-2.5 short:mt-4 short:gap-2">
        {bookDemoBenefits.map(({ icon: Icon, label }) => (
          <li key={label} className="flex items-center gap-3.5 sm:flex-col sm:items-start sm:gap-2.5 lg:flex-row lg:items-center lg:gap-3.5">
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-white text-brand-purple shadow-[0_6px_18px_-6px_rgba(108,53,245,0.35)] ring-1 ring-brand-purple/10 lg:size-10">
              <Icon className="size-5" aria-hidden />
            </span>
            <span className="text-[15px] leading-snug text-brand-text/85 xl:text-[15px] short:text-sm">{label}</span>
          </li>
        ))}
      </ul>

      {/* Looping mini-UI of the booking journey (decorative). On desktop it takes the height left in the
          panel and scales down to fit; on a stacked layout it sits below the benefits. */}
      <ScaleToFit className="mt-6 lg:mt-7">
        <BookDemoJourneyAnimation className="w-full max-w-[26rem] lg:max-w-none" />
      </ScaleToFit>
    </aside>
  );
}

/**
 * Desktop only (the child is absolutely positioned from lg): shrinks its child to the height left in the
 * panel, and hides it when it would get too small to read. Below lg the child keeps its natural size.
 */
function ScaleToFit({ className, children }: { className?: string; children: ReactNode }) {
  const outer = useRef<HTMLDivElement>(null);
  const inner = useRef<HTMLDivElement>(null);
  const [scale, setScale] = useState(1);

  useLayoutEffect(() => {
    const measure = () => {
      if (!outer.current || !inner.current) return;
      if (getComputedStyle(inner.current).position !== "absolute") return setScale(1);
      const available = outer.current.clientHeight;
      const needed = inner.current.offsetHeight;
      setScale(needed ? Math.min(1, available / needed) : 1);
    };
    measure();
    const observer = new ResizeObserver(measure);
    if (outer.current) observer.observe(outer.current);
    if (inner.current) observer.observe(inner.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={outer} className={cn("relative lg:min-h-0 lg:flex-1", className)}>
      <div
        ref={inner}
        className={cn("lg:absolute lg:inset-x-0 lg:top-0 lg:origin-top-left", scale < 0.62 && "lg:invisible")}
        style={scale < 1 ? { transform: `scale(${scale})` } : undefined}
      >
        {children}
      </div>
    </div>
  );
}
