"use client";

import { Pointer } from "lucide-react";

interface MouseCursorProps {
  x: number;
  y: number;
  visible: boolean;
  clicking: boolean;
}

export function MouseCursor({ x, y, visible, clicking }: MouseCursorProps) {
  return (
    <div
      className="pointer-events-none absolute z-30 transition-[left,top,opacity] duration-[900ms] ease-in-out"
      style={{
        left: `${x}%`,
        top: `${y}%`,
        opacity: visible ? 1 : 0,
      }}
    >
      <div
        className="relative transition-transform duration-200 ease-out"
        style={{ transform: clicking ? "scale(0.82)" : "scale(1)" }}
      >
        <Pointer className="size-5 fill-white text-brand-navy drop-shadow-md" strokeWidth={1.75} />
        {clicking && (
          <span className="absolute top-0 left-0 size-5 animate-ping rounded-full bg-brand-purple/40" />
        )}
      </div>
    </div>
  );
}
