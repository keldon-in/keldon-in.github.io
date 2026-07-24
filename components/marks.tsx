/**
 * KeldonEmblem — the Keldon leaf mark, straight from the brand logo
 * (public/keldon-mark.png, cropped from logo.png). Set the display height via
 * className (width follows the ~1.4:1 aspect). Use `light` on dark backgrounds
 * (renders the cream recolour, since the emblem itself is dark green).
 */
export function KeldonEmblem({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src={light ? "/keldon-mark-light.png" : "/keldon-mark.png"}
      alt="Keldon"
      width={747}
      height={1026}
      className={`w-auto ${className}`}
      decoding="async"
    />
  );
}

/**
 * KeldonWordmark — "KELDON" set in the display serif, uppercase and tracked to
 * echo the logotype. Rendered as text so it stays crisp and inherits the font.
 */
export function KeldonWordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`font-display font-normal uppercase tracking-[0.18em] ${className}`}
      aria-hidden="true"
    >
      Keldon
    </span>
  );
}

/**
 * KeldonLockup — the full brand lockup. Horizontal (emblem beside wordmark) by
 * default; vertical stacks emblem over wordmark + tagline like the logo.
 */
export function KeldonLockup({
  className = "",
  orientation = "horizontal",
  showTagline = false,
  emblemClass = "",
  wordmarkClass = "",
}: {
  className?: string;
  orientation?: "horizontal" | "vertical";
  showTagline?: boolean;
  emblemClass?: string;
  wordmarkClass?: string;
}) {
  if (orientation === "vertical") {
    return (
      <span className={`flex flex-col items-center leading-none ${className}`}>
        <KeldonEmblem className={emblemClass || "h-12 w-12"} />
        <KeldonWordmark className={`mt-3 ${wordmarkClass || "text-2xl"}`} />
        {showTagline && (
          <span className="mt-2 text-[0.55rem] uppercase tracking-[0.25em] text-ink-mute">
            Rooted in Nature. Refined by Science.
          </span>
        )}
      </span>
    );
  }
  return (
    <span className={`flex items-center gap-3 leading-none ${className}`}>
      <KeldonEmblem className={emblemClass || "h-9 w-9"} />
      <span className="flex flex-col">
        <KeldonWordmark className={wordmarkClass || "text-2xl"} />
        {showTagline && (
          <span className="mt-1 text-[0.5rem] uppercase tracking-[0.24em] text-ink-mute">
            Rooted in Nature. Refined by Science.
          </span>
        )}
      </span>
    </span>
  );
}

/**
 * AarubyMark — the official Aaruby Nutraceuticals logo (public/aaruby.png).
 * Intrinsic size 402×128; control display height via className (width auto).
 */
export function AarubyMark({ className = "" }: { className?: string }) {
  // eslint-disable-next-line @next/next/no-img-element
  return (
    <img
      src="/aaruby.png"
      alt="Aaruby Nutraceuticals"
      width={402}
      height={128}
      className={`w-auto ${className}`}
      loading="lazy"
      decoding="async"
    />
  );
}

/**
 * FssaiMark — FSSAI license & registration number lockup matching standard regulatory formatting.
 */
export function FssaiMark({
  className = "",
  light = false,
}: {
  className?: string;
  light?: boolean;
}) {
  return (
    <div
      className={`inline-flex items-center gap-2 font-sans ${
        light ? "text-paper/85" : "text-ink-soft"
      } ${className}`}
    >
      <span className="font-bold tracking-tight text-sm select-none">
        <span className={light ? "text-paper" : "text-[#002f6c]"}>f</span>
        <span className={light ? "text-paper" : "text-[#002f6c]"}>s</span>
        <span className={light ? "text-paper" : "text-[#002f6c]"}>s</span>
        <span className={light ? "text-amber-400" : "text-[#e26d24]"}>a</span>
        <span className={light ? "text-emerald-400" : "text-[#207a3c]"}>i</span>
      </span>
      <span className="text-xs font-medium tracking-tight">
        Reg. No.:- <span className="font-semibold tabular-nums">30260423124228410</span>
      </span>
    </div>
  );
}

/** Small hemoglobin-drop glyph echoing the HB+ product identity. */
export function DropGlyph({ className = "" }: { className?: string }) {
  return (
    <svg viewBox="0 0 32 40" className={className} aria-hidden="true">
      <path d="M16 1C16 1 3 16 3 26a13 13 0 1 0 26 0C29 16 16 1 16 1Z" fill="currentColor" />
    </svg>
  );
}
