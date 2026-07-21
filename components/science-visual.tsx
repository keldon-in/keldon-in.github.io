"use client";

import { motion, useReducedMotion } from "framer-motion";

/**
 * ScienceVisual — an animated "nature meets science" motif: the Keldon leaf at
 * the centre, breathing gently, with two molecular orbits circling it, soft
 * pulse rings, and nutrients rising like bubbles. Honours reduced-motion.
 */
export function ScienceVisual() {
  const reduce = useReducedMotion();

  const orbit = (duration: number, direction: 1 | -1 = 1) =>
    reduce
      ? {}
      : {
          animate: { rotate: 360 * direction },
          transition: { duration, repeat: Infinity, ease: "linear" as const },
        };

  return (
    <div
      className="relative flex aspect-[5/4] w-full items-center justify-center overflow-hidden rounded-[28px]"
      style={{
        background:
          "radial-gradient(90% 90% at 40% 20%, rgba(196,207,180,0.55), transparent 60%), linear-gradient(160deg,#ECE8DA,#F4F1E7)",
      }}
    >
      <svg viewBox="0 0 300 240" className="h-[86%] w-auto" aria-hidden="true">
        {/* Pulse rings */}
        {!reduce &&
          [0, 1, 2].map((n) => (
            <motion.circle
              key={n}
              cx={150}
              cy={120}
              r={30}
              fill="none"
              stroke="#2F4A3A"
              strokeWidth={1}
              initial={{ scale: 0.5, opacity: 0.35 }}
              animate={{ scale: 2.6, opacity: 0 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeOut",
                delay: n * 1.33,
              }}
              style={{ transformOrigin: "150px 120px" }}
            />
          ))}

        {/* Rising nutrient bubbles */}
        {!reduce &&
          [
            { x: 96, r: 3.5, d: 0, dur: 5.5 },
            { x: 150, r: 5, d: 1.6, dur: 6.5 },
            { x: 205, r: 3, d: 0.8, dur: 5 },
            { x: 176, r: 2.5, d: 2.6, dur: 7 },
            { x: 120, r: 2.5, d: 3.4, dur: 6 },
          ].map((b, i) => (
            <motion.circle
              key={i}
              cx={b.x}
              r={b.r}
              fill="#A7B795"
              initial={{ cy: 215, opacity: 0 }}
              animate={{ cy: 30, opacity: [0, 0.7, 0.7, 0] }}
              transition={{
                duration: b.dur,
                repeat: Infinity,
                ease: "easeInOut",
                delay: b.d,
              }}
            />
          ))}

        {/* Molecular orbits around the leaf */}
        <g transform="translate(150 120)">
          {/* orbit 1 */}
          <g transform="rotate(-18)">
            <ellipse rx={104} ry={46} fill="none" stroke="#4C6553" strokeWidth={1.2} opacity={0.4} />
            <motion.g {...orbit(14, 1)}>
              <circle cx={104} cy={0} r={6} fill="#2F4A3A" />
              <circle cx={-104} cy={0} r={4} fill="#6E1E2E" />
            </motion.g>
          </g>
          {/* orbit 2 */}
          <g transform="rotate(64)">
            <ellipse rx={112} ry={40} fill="none" stroke="#A7B795" strokeWidth={1.2} opacity={0.55} />
            <motion.g {...orbit(19, -1)}>
              <circle cx={112} cy={0} r={5} fill="#4C6553" />
              <circle cx={-112} cy={0} r={3.5} fill="#9B7B2E" />
            </motion.g>
          </g>
        </g>

        {/* Central leaf, breathing */}
        <g transform="translate(150 120)">
          <circle r={40} fill="#ffffff" opacity={0.55} />
          <motion.g
            animate={reduce ? undefined : { scale: [1, 1.06, 1] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
            style={{ transformOrigin: "center" }}
          >
            <image href="/keldon-mark.png" x={-23} y={-32} width={46} height={64} preserveAspectRatio="xMidYMid meet" />
          </motion.g>
        </g>
      </svg>
    </div>
  );
}
