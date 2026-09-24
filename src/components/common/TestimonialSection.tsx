"use client";

import { useEffect, useState } from "react";
import type { Testimonial } from "@/types/common";
import { TestimonialCard } from "@/components/cards/TestimonialCard";
import { cn } from "@/lib/utils";

const ROTATE_MS = 6000;

export function TestimonialSection({ testimonials }: { testimonials: Testimonial[] }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const count = testimonials.length;

  useEffect(() => {
    if (count < 2 || paused) return;
    const timer = window.setInterval(() => setActive((index) => (index + 1) % count), ROTATE_MS);
    return () => window.clearInterval(timer);
  }, [count, paused, active]);

  return (
    <div>
      <h2 className="text-2xl font-bold text-brand-text 3xl:text-4xl">What Our Customers Say</h2>

      {/* All cards share one grid cell, so the carousel keeps the tallest card's height
          and never jumps as quotes of different lengths rotate in. */}
      <div
        className="mt-6 grid 3xl:mt-9"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
        onFocus={() => setPaused(true)}
        onBlur={() => setPaused(false)}
        aria-live={paused ? "polite" : "off"}
      >
        {testimonials.map((testimonial, index) => (
          <div
            key={testimonial.name}
            className={cn(
              "col-start-1 row-start-1 transition-opacity duration-500",
              index === active ? "opacity-100" : "pointer-events-none opacity-0"
            )}
            aria-hidden={index !== active}
          >
            <TestimonialCard testimonial={testimonial} />
          </div>
        ))}
      </div>

      {count > 1 && (
        <div className="mt-4 flex justify-center gap-2" role="tablist" aria-label="Testimonials">
          {testimonials.map((testimonial, index) => (
            <button
              key={testimonial.name}
              type="button"
              role="tab"
              aria-selected={index === active}
              aria-label={`Show testimonial from ${testimonial.name}`}
              onClick={() => setActive(index)}
              className={cn(
                "h-2.5 rounded-full transition-all",
                index === active
                  ? "w-6 bg-brand-purple"
                  : "w-2.5 bg-brand-purple/20 hover:bg-brand-purple/40"
              )}
            />
          ))}
        </div>
      )}
    </div>
  );
}
