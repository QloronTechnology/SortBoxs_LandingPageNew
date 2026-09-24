import Image from "next/image";
import { Quote, Star } from "lucide-react";
import type { Testimonial } from "@/types/common";

function initials(name: string) {
  return name
    .split(" ")
    .map((part) => part[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
}

export function TestimonialCard({ testimonial }: { testimonial: Testimonial }) {
  return (
    <div className="flex h-full flex-col justify-between rounded-lg border border-brand-border bg-white p-4 3xl:p-5">
      <div className="flex gap-3">
        <Quote
          className="size-6 shrink-0 rotate-180 fill-brand-purple text-brand-purple 3xl:size-8"
          aria-hidden
        />
        <p className="text-sm leading-relaxed text-brand-muted 3xl:text-lg 3xl:leading-[1.6]">
          {testimonial.quote}
        </p>
      </div>
      <div className="mt-6 flex items-center justify-between gap-3 3xl:mt-8">
        <div className="flex items-center gap-3">
          {testimonial.avatar ? (
            <Image
              src={testimonial.avatar}
              alt={testimonial.name}
              width={56}
              height={56}
              className="size-11 rounded-full object-cover 3xl:size-14"
            />
          ) : (
            <span
              className="flex size-11 shrink-0 items-center justify-center rounded-full bg-brand-purple-light text-sm font-semibold text-brand-purple 3xl:size-14 3xl:text-base"
              aria-hidden
            >
              {initials(testimonial.name)}
            </span>
          )}
          <div>
            <p className="text-base font-semibold text-brand-text 3xl:text-xl">{testimonial.name}</p>
            <p className="text-xs text-brand-muted 3xl:text-base">{testimonial.role}</p>
          </div>
        </div>
        {testimonial.rating && (
          <div
            className="flex shrink-0 items-center gap-0.5 text-amber-400"
            aria-label={`${testimonial.rating} out of 5 stars`}
          >
            {Array.from({ length: testimonial.rating }).map((_, index) => (
              <Star key={index} className="size-4 fill-current 3xl:size-5" aria-hidden />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
