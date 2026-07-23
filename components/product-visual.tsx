import { DropGlyph } from "@/components/marks";

/**
 * Product portraits as vector illustrations — a tapered HB+ bottle and a
 * multivitamin jar, each with a smooth cream KELDON label. Placeholders for
 * eventual studio photography.
 */

const LABEL = "#F4F1E7";
const INK = "#22302A";
const MUTE = "#5E685C";

export function ProductVisual({
  slug,
  className = "",
  accent,
  caption,
}: {
  slug: string;
  className?: string;
  /** Variant accent colour (drives Gummy Bite's bottle + wash). */
  accent?: string;
  /** Variant label shown under KELDON, e.g. the Gummy Bite formula name. */
  caption?: string;
}) {
  if (slug === "hb-plus") return <HBPlusVisual className={className} />;
  if (slug === "daily-herbals")
    return <CapsuleVisual className={className} accent={accent ?? "#4B7A54"} caption={caption ?? "Herbal"} />;
  return <GummyBiteVisual className={className} accent={accent ?? "#B7772A"} caption={caption ?? "Multivitamin"} />;
}

/** Mix a hex colour toward black (t<0) or white (t>0), for shading. */
function shade(hex: string, t: number) {
  const n = parseInt(hex.slice(1), 16);
  const r = (n >> 16) & 255,
    g = (n >> 8) & 255,
    b = n & 255;
  const mix = (c: number) => Math.round(t < 0 ? c * (1 + t) : c + (255 - c) * t);
  return `#${((1 << 24) + (mix(r) << 16) + (mix(g) << 8) + mix(b)).toString(16).slice(1)}`;
}

function GummyBiteVisual({
  className = "",
  accent,
  caption,
}: {
  className?: string;
  accent: string;
  caption: string;
}) {
  const uid = accent.replace("#", "");
  const light = shade(accent, 0.28);
  const dark = shade(accent, -0.28);
  const cap = shade(accent, -0.4);
  // Keep the caption legible in the fixed-width label.
  const capText = caption.length > 20 ? caption.slice(0, 19) + "…" : caption;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[24px] ${className}`}
      style={{ background: `linear-gradient(150deg, ${shade(accent, 0.82)}, ${shade(accent, 0.9)})` }}
    >
      <OrganicField tint={`${accent}22`} />
      <svg viewBox="0 0 260 430" className="relative h-[86%] w-auto drop-shadow-[0_24px_48px_rgba(34,48,42,0.20)]" aria-hidden="true">
        <defs>
          <linearGradient id={`gb-body-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={light} />
            <stop offset="0.45" stopColor={accent} />
            <stop offset="1" stopColor={dark} />
          </linearGradient>
          <linearGradient id={`gb-cap-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor={shade(accent, -0.25)} />
            <stop offset="1" stopColor={cap} />
          </linearGradient>
        </defs>
        {/* cap + collar */}
        <rect x="94" y="20" width="72" height="42" rx="12" fill={`url(#gb-cap-${uid})`} />
        <rect x="104" y="28" width="4" height="26" rx="2" fill="#ffffff" opacity="0.18" />
        <rect x="88" y="58" width="84" height="16" rx="6" fill={`url(#gb-cap-${uid})`} />
        {/* rounded gummy-jar body */}
        <rect x="58" y="72" width="144" height="330" rx="34" fill={`url(#gb-body-${uid})`} />
        <rect x="72" y="86" width="22" height="300" rx="11" fill="#ffffff" opacity="0.16" />
        {/* a few bunny gummies peeking at the base */}
        <g opacity="0.9">
          {[
            { x: 86, y: 356 },
            { x: 122, y: 366 },
            { x: 158, y: 356 },
          ].map((g, i) => (
            <g key={i} transform={`translate(${g.x} ${g.y})`} fill="#ffffff" opacity="0.85">
              <circle cx="0" cy="0" r="11" />
              <circle cx="-6" cy="-12" r="4" />
              <circle cx="6" cy="-12" r="4" />
            </g>
          ))}
        </g>
        {/* smooth cream label */}
        <rect x="72" y="150" width="116" height="150" rx="16" fill={LABEL} />
        <image href="/keldon-mark.png" x="120.5" y="164" width="19" height="26" preserveAspectRatio="xMidYMid meet" />
        <text x="130" y="220" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="15" letterSpacing="2.5" fill={INK}>KELDON</text>
        <text x="130" y="240" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="11" letterSpacing="1.5" fill={accent}>GUMMY BITE</text>
        <line x1="92" y1="252" x2="168" y2="252" stroke={accent} strokeWidth="1" opacity="0.4" />
        <text x="130" y="272" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="600" fontSize="9.5" letterSpacing="0.4" fill={MUTE}>{capText}</text>
      </svg>
    </div>
  );
}

function HBPlusVisual({ className = "" }: { className?: string }) {
  const body = "#6E1E2E";
  const cap = "#541722";
  return (
    <div className={`relative flex items-center justify-center overflow-hidden rounded-[24px] bg-pear-wash ${className}`}>
      <OrganicField tint="rgba(110,30,46,0.10)" />
      <svg viewBox="0 0 240 430" className="relative h-[82%] w-auto drop-shadow-[0_24px_48px_rgba(110,30,46,0.22)]" aria-hidden="true">
        {/* cap */}
        <rect x="102" y="10" width="36" height="28" rx="5" fill={cap} />
        <rect x="98" y="34" width="44" height="12" rx="3" fill={cap} />
        {/* body */}
        <path d="M120 46 C 108 46, 96 62, 84 122 L 40 396 C 38 408, 46 416, 58 416 L 182 416 C 194 416, 202 408, 200 396 L 156 122 C 144 62, 132 46, 120 46 Z" fill={body} />
        <path d="M120 46 C 112 46, 104 58, 96 106 L 82 320 L 112 320 Z" fill="#ffffff" opacity="0.10" />
        {/* smooth label, sized within the body */}
        <rect x="66" y="262" width="108" height="98" rx="12" fill={LABEL} />
        <image href="/keldon-mark.png" x="109.5" y="272" width="21" height="28.9" preserveAspectRatio="xMidYMid meet" />
        <text x="120" y="324" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="17" letterSpacing="3" fill={INK}>KELDON</text>
        <line x1="92" y1="331" x2="148" y2="331" stroke={body} strokeWidth="1" opacity="0.4" />
        <text x="120" y="348" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="600" fontSize="11" letterSpacing="1" fill={MUTE}>HB+ Syrup</text>
      </svg>
    </div>
  );
}

function CapsuleVisual({
  className = "",
  accent,
  caption,
}: {
  className?: string;
  accent: string;
  caption: string;
}) {
  const uid = accent.replace("#", "");
  const capText = caption.length > 20 ? caption.slice(0, 19) + "…" : caption;
  return (
    <div
      className={`relative flex items-center justify-center overflow-hidden rounded-[24px] ${className}`}
      style={{ background: `linear-gradient(150deg, ${shade(accent, 0.82)}, ${shade(accent, 0.9)})` }}
    >
      <OrganicField tint={`${accent}22`} />
      <svg viewBox="0 0 260 430" className="relative h-[86%] w-auto drop-shadow-[0_24px_48px_rgba(20,20,25,0.28)]" aria-hidden="true">
        <defs>
          <linearGradient id={`cap-body-${uid}`} x1="0" y1="0" x2="1" y2="0">
            <stop offset="0" stopColor="#3A3A40" />
            <stop offset="0.5" stopColor="#232327" />
            <stop offset="1" stopColor="#141416" />
          </linearGradient>
        </defs>
        {/* cap + collar */}
        <rect x="94" y="20" width="72" height="42" rx="10" fill="#1B1B1E" />
        <rect x="104" y="28" width="4" height="26" rx="2" fill="#ffffff" opacity="0.12" />
        <rect x="88" y="58" width="84" height="16" rx="6" fill="#1B1B1E" />
        {/* dark bottle body */}
        <rect x="58" y="72" width="144" height="330" rx="32" fill={`url(#cap-body-${uid})`} />
        <rect x="72" y="86" width="18" height="300" rx="9" fill="#ffffff" opacity="0.06" />
        {/* two capsules peeking near the base */}
        {[
          { x: 108, y: 356, r: -18 },
          { x: 152, y: 366, r: 12 },
        ].map((c, i) => (
          <g key={i} transform={`translate(${c.x} ${c.y}) rotate(${c.r})`}>
            <rect x="-20" y="-7" width="40" height="14" rx="7" fill={accent} opacity="0.92" />
            <rect x="-20" y="-7" width="40" height="5" rx="2.5" fill="#ffffff" opacity="0.22" />
            <line x1="0" y1="-7" x2="0" y2="7" stroke="#000000" strokeOpacity="0.18" strokeWidth="1" />
          </g>
        ))}
        {/* smooth cream label with an accent header band */}
        <rect x="70" y="150" width="120" height="176" rx="16" fill={LABEL} />
        <path d="M70 166 A16 16 0 0 1 86 150 H174 A16 16 0 0 1 190 166 V178 H70 Z" fill={accent} />
        <text x="130" y="171" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="9" letterSpacing="2" fill="#ffffff">DAILY HERBALS</text>
        <image href="/keldon-mark.png" x="120.5" y="190" width="19" height="26" preserveAspectRatio="xMidYMid meet" />
        <text x="130" y="246" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="700" fontSize="14" letterSpacing="2.5" fill={INK}>KELDON</text>
        <line x1="94" y1="258" x2="166" y2="258" stroke={accent} strokeWidth="1" opacity="0.5" />
        <text x="130" y="278" textAnchor="middle" fontFamily="var(--font-sans), sans-serif" fontWeight="600" fontSize="10.5" letterSpacing="0.3" fill={MUTE}>{capText}</text>
      </svg>
    </div>
  );
}

function OrganicField({ tint }: { tint: string }) {
  // Stable, collision-free id from the full tint (many accents share a length).
  const uid = tint.replace(/[^a-z0-9]/gi, "");
  return (
    <svg className="absolute inset-0 h-full w-full" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
      <defs>
        <radialGradient id={`of-${uid}`} cx="30%" cy="24%" r="80%">
          <stop offset="0" stopColor={tint} />
          <stop offset="1" stopColor="transparent" />
        </radialGradient>
      </defs>
      <rect width="100%" height="100%" fill={`url(#of-${uid})`} />
    </svg>
  );
}

export { DropGlyph };
