"use client";

import { useEffect, useRef, useState, type HTMLAttributes } from "react";

/**
 * Sets `data-inview="true"` once the element scrolls into view, so CSS
 * animations scoped under `[data-inview="true"]` start only when visible.
 */
export function InView({ children, ...rest }: HTMLAttributes<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.3 },
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} data-inview={inView} {...rest}>
      {children}
    </div>
  );
}
