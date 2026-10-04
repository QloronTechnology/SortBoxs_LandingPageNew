export type CharacterLook = {
  skin: string;
  skinShade: string;
  hair: string;
  hairStyle: "long" | "short" | "bun";
  shirt: string;
  collar: string;
  wallFrom: string;
  wallTo: string;
  glasses?: boolean;
  beard?: boolean;
};

/**
 * Cartoon candidate on a video call: headset on, blinking, nodding and talking. Pure SVG, animated with CSS
 * (.char-* in globals.css). Decorative, so hidden from assistive tech.
 */
export function InterviewCharacter({ look, className }: { look: CharacterLook; className?: string }) {
  const { skin, skinShade, hair, hairStyle, shirt, collar, wallFrom, wallTo, glasses, beard } = look;
  const uid = `${hairStyle}-${shirt.replace("#", "")}`;
  return (
    <svg aria-hidden viewBox="-20 0 240 130" preserveAspectRatio="xMidYMax slice" className={className}>
      <defs>
        <linearGradient id={`wall-${uid}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={wallFrom} />
          <stop offset="1" stopColor={wallTo} />
        </linearGradient>
        <radialGradient id={`light-${uid}`} cx="0.8" cy="0.25" r="0.6">
          <stop offset="0" stopColor="#fff" stopOpacity="0.45" />
          <stop offset="1" stopColor="#fff" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* room */}
      <rect x="-20" width="240" height="130" fill={`url(#wall-${uid})`} />
      <rect x="-20" width="240" height="130" fill={`url(#light-${uid})`} />
      <rect x="146" y="20" width="42" height="50" rx="4" fill="#fff" fillOpacity="0.28" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
      <path d="M167 20v50M146 45h42" stroke="#fff" strokeOpacity="0.55" strokeWidth="1.5" />
      <rect x="10" y="64" width="50" height="3.5" rx="1.5" fill="#000" fillOpacity="0.25" />
      {[
        [14, 48, 6, 16, "#f59e0b"],
        [21, 52, 5, 12, "#ffffff"],
        [27, 46, 7, 18, "#ef4444"],
        [35, 51, 5, 13, "#fde68a"],
        [41, 49, 6, 15, "#38bdf8"],
        [48, 53, 5, 11, "#ffffff"],
      ].map(([x, y, w, h, fill]) => (
        <rect key={String(x)} x={x as number} y={y as number} width={w as number} height={h as number} rx="1" fill={fill as string} fillOpacity="0.8" />
      ))}
      <circle cx="170" cy="104" r="9" fill="#16a34a" fillOpacity="0.55" />
      <path d="M170 110c-1 6-1 10 0 14" stroke="#15803d" strokeOpacity="0.6" strokeWidth="2" fill="none" />
      <rect x="-20" y="116" width="240" height="14" fill="#000" fillOpacity="0.22" />

      {/* body */}
      <g className="char-bob">
        <path d="M46 132C46 102 70 92 100 92s54 10 54 40Z" fill={shirt} />
        <path d="M86 93l14 15 14-15" fill="none" stroke={collar} strokeWidth="3" strokeLinejoin="round" strokeLinecap="round" />
        <rect x="90" y="78" width="20" height="18" rx="7" fill={skinShade} />

        {/* hair behind the head */}
        {hairStyle === "long" && <path d="M71 60C68 28 132 28 129 60l7 50c-14-8-58-8-72 0Z" fill={hair} />}

        {/* head */}
        <circle cx="74" cy="64" r="5" fill={skin} />
        <circle cx="126" cy="64" r="5" fill={skin} />
        <ellipse cx="100" cy="62" rx="26" ry="30" fill={skin} />
        {beard && <path d="M76 68c2 22 14 30 24 30s22-8 24-30c-4 8-12 12-24 12S80 76 76 68Z" fill={hair} fillOpacity="0.55" />}

        {/* hair front */}
        {hairStyle === "short" && <path d="M73 56C70 30 130 30 127 56c-4-9-12-13-22-14-9 1-17 3-24 8-3 2-6 4-8 6Z" fill={hair} />}
        {hairStyle === "long" && <path d="M74 56C72 33 128 33 126 56c-8-10-28-14-52 0Z" fill={hair} />}
        {hairStyle === "bun" && (
          <>
            <circle cx="100" cy="27" r="9" fill={hair} />
            <path d="M73 56C70 32 130 32 127 56c-6-9-16-12-27-12S79 47 73 56Z" fill={hair} />
          </>
        )}

        {/* face */}
        <g className="char-look">
          <path d="M85 52q6-3 12 0M103 52q6-3 12 0" stroke={hair} strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <ellipse cx="91" cy="61" rx="5" ry="4.6" fill="#fff" />
          <ellipse cx="109" cy="61" rx="5" ry="4.6" fill="#fff" />
          <circle cx="91.6" cy="61.5" r="2.5" fill="#2b2140" />
          <circle cx="109.6" cy="61.5" r="2.5" fill="#2b2140" />
          <circle cx="92.4" cy="60.6" r=".8" fill="#fff" />
          <circle cx="110.4" cy="60.6" r=".8" fill="#fff" />
        </g>
        <ellipse className="char-lid" cx="91" cy="61" rx="5.6" ry="5" fill={skin} />
        <ellipse className="char-lid" cx="109" cy="61" rx="5.6" ry="5" fill={skin} />
        {glasses && (
          <g fill="none" stroke="#1f2937" strokeWidth="1.5">
            <circle cx="91" cy="61" r="8" />
            <circle cx="109" cy="61" r="8" />
            <path d="M99 61h2" />
          </g>
        )}
        <path d="M100 62q-3 8 1 9" stroke={skinShade} strokeWidth="1.6" strokeLinecap="round" fill="none" />
        <circle cx="84" cy="72" r="4" fill="#f87171" fillOpacity="0.28" />
        <circle cx="116" cy="72" r="4" fill="#f87171" fillOpacity="0.28" />
        <ellipse className="char-mouth" cx="100" cy="80" rx="5.5" ry="4.2" fill="#5b1f2e" />
        <path d="M95 77.8h10" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" opacity="0.9" />

        {/* headset */}
        <path d="M72 58C70 24 130 24 128 58" fill="none" stroke="#1f2937" strokeWidth="3.2" strokeLinecap="round" />
        <rect x="65" y="55" width="9" height="16" rx="4.5" fill="#111827" />
        <rect x="126" y="55" width="9" height="16" rx="4.5" fill="#111827" />
        <path d="M69 70q2 14 20 14" fill="none" stroke="#1f2937" strokeWidth="2" strokeLinecap="round" />
        <circle cx="90" cy="84" r="3.2" fill="#111827" />
      </g>
    </svg>
  );
}
