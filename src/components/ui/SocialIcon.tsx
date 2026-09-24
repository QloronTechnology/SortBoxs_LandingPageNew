import type { SVGProps } from "react";

export type SocialNetwork = "facebook" | "instagram" | "linkedin" | "x";

/** Brand glyphs as inline SVG (24×24, currentColor) so they stay crisp and themeable. */
export function SocialIcon({ network, ...props }: { network: SocialNetwork } & SVGProps<SVGSVGElement>) {
  const common = { viewBox: "0 0 24 24", "aria-hidden": true, ...props } as const;

  switch (network) {
    case "facebook":
      return (
        <svg {...common} fill="currentColor">
          <path d="M14 13.5h2.5l1-4H14v-2c0-1.03 0-2 2-2h1.5V2.14c-.326-.043-1.557-.14-2.857-.14C11.928 2 10 3.657 10 6.7v2.8H7v4h3V22h4v-8.5z" />
        </svg>
      );
    case "instagram":
      return (
        <svg {...common} fill="none" stroke="currentColor" strokeWidth={2}>
          <rect x="3" y="3" width="18" height="18" rx="5" />
          <circle cx="12" cy="12" r="4" />
          <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
        </svg>
      );
    case "linkedin":
      return (
        <svg {...common} fill="currentColor">
          <path d="M6.94 5a2 2 0 1 1-4-.002 2 2 0 0 1 4 .002zM7 8.48H3V21h4V8.48zm6.32 0H9.34V21h3.94v-6.57c0-3.66 4.77-4 4.77 0V21H22v-7.93c0-6.17-7.06-5.94-8.72-2.91l.04-1.68z" />
        </svg>
      );
    case "x":
      return (
        <svg {...common} fill="currentColor">
          <path d="M17.687 3.063l-4.996 5.711-4.32-5.711H2.112l7.477 9.776-7.086 8.099h3.034l5.469-6.25 4.78 6.25h6.102l-7.794-10.304 6.625-7.571h-3.032zm-1.064 16.06L5.654 4.782h1.803l10.846 14.34h-1.68z" />
        </svg>
      );
  }
}
