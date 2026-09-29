"use client";

import { useCallback, useEffect, useLayoutEffect, useRef, useState, type ReactNode, type RefObject } from "react";
import { createPortal } from "react-dom";
import { cn } from "@/lib/utils";

const GAP = 6;
const MARGIN = 8;

/**
 * A dropdown layer portalled to <body> with fixed positioning, so it's never clipped by a scrolling
 * modal or an overflow-hidden card. Sits below its anchor (or above when there's more room there),
 * follows it on scroll/resize, stays inside the viewport, and calls `onDismiss` on a pointer-down
 * outside itself and the trigger (the anchor, unless a separate `triggerRef` is given).
 */
export function Popover({
  anchorRef,
  triggerRef,
  onDismiss,
  children,
  matchWidth = true,
  className,
}: {
  anchorRef: RefObject<HTMLElement | null>;
  /** The control that toggles it, when that isn't the anchor: pointer-downs on it don't dismiss. */
  triggerRef?: RefObject<HTMLElement | null>;
  onDismiss: () => void;
  children: ReactNode;
  /** true: at least as wide as the anchor. "exact": exactly as wide as the anchor. */
  matchWidth?: boolean | "exact";
  className?: string;
}) {
  const layer = useRef<HTMLDivElement>(null);
  // Before the first measurement: transparent, not visibility:hidden, so content can take focus on open.
  const [style, setStyle] = useState<React.CSSProperties>({ position: "fixed", top: 0, left: 0, opacity: 0 });

  const place = useCallback(() => {
    const anchor = anchorRef.current?.getBoundingClientRect();
    const el = layer.current;
    if (!anchor || !el) return;
    const vw = document.documentElement.clientWidth;
    const vh = window.innerHeight;
    const below = vh - anchor.bottom - GAP - MARGIN;
    const above = anchor.top - GAP - MARGIN;
    const height = el.scrollHeight;
    const up = height > below && above > below;
    const maxHeight = Math.max(160, up ? above : below);
    const exact = matchWidth === "exact";
    const width = Math.min(exact ? anchor.width : Math.max(el.offsetWidth, matchWidth ? anchor.width : 0), vw - MARGIN * 2);
    const left = Math.min(Math.max(MARGIN, anchor.left), vw - width - MARGIN);
    setStyle({
      position: "fixed",
      left,
      width: exact ? width : undefined,
      minWidth: matchWidth ? Math.min(anchor.width, vw - MARGIN * 2) : undefined,
      maxWidth: vw - MARGIN * 2,
      maxHeight,
      ...(up ? { bottom: vh - anchor.top + GAP } : { top: anchor.bottom + GAP }),
    });
  }, [anchorRef, matchWidth]);

  useLayoutEffect(place, [place]);

  useEffect(() => {
    // Content can change size (search results), so re-place on resize of the layer too.
    const observer = new ResizeObserver(() => place());
    if (layer.current) observer.observe(layer.current);
    window.addEventListener("resize", place);
    window.addEventListener("scroll", place, true);
    const onPointer = (event: PointerEvent) => {
      const target = event.target as Node;
      const trigger = (triggerRef ?? anchorRef).current;
      if (!layer.current?.contains(target) && !trigger?.contains(target)) onDismiss();
    };
    document.addEventListener("pointerdown", onPointer);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", place);
      window.removeEventListener("scroll", place, true);
      document.removeEventListener("pointerdown", onPointer);
    };
  }, [place, anchorRef, triggerRef, onDismiss]);

  return createPortal(
    <div
      ref={layer}
      style={style}
      className={cn(
        "z-[90] flex flex-col overflow-hidden rounded-xl border border-brand-border bg-white shadow-[0_12px_32px_-8px_rgba(24,20,70,0.25)]",
        className
      )}
    >
      {children}
    </div>,
    document.body
  );
}
