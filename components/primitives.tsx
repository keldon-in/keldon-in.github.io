"use client";

import { motion, useReducedMotion, type Variants } from "framer-motion";
import type { ReactNode } from "react";

const EASE = [0.16, 1, 0.3, 1] as const;

/**
 * Reveal — the core scroll gesture of the site. Content rises and fades in
 * slowly, once, as it enters the viewport. Honours reduced-motion.
 */
export function Reveal({
  children,
  className = "",
  delay = 0,
  y = 24,
  as = "div",
  immediate = false,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
  y?: number;
  as?: "div" | "span" | "li" | "section";
  /** Animate on mount rather than on scroll — for above-the-fold content. */
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();
  const MotionTag = motion[as] as typeof motion.div;
  const target = { opacity: 1, y: 0 };

  return (
    <MotionTag
      className={className}
      initial={reduce ? false : { opacity: 0, y }}
      {...(immediate
        ? { animate: target }
        : { whileInView: target, viewport: { once: true, margin: "-12% 0px -12% 0px" } })}
      transition={{ duration: 1.1, ease: EASE, delay }}
    >
      {children}
    </MotionTag>
  );
}

/**
 * StaggerLines — reveals a list of lines/phrases in sequence. Used for the
 * editorial manifesto passages so text arrives like breath.
 */
export function StaggerLines({
  lines,
  className = "",
  lineClassName = "",
  immediate = false,
}: {
  lines: string[];
  className?: string;
  lineClassName?: string;
  immediate?: boolean;
}) {
  const reduce = useReducedMotion();

  const container: Variants = {
    hidden: {},
    show: { transition: { staggerChildren: reduce ? 0 : 0.14, delayChildren: 0.05 } },
  };
  const line: Variants = {
    hidden: { opacity: 0, y: 18 },
    show: {
      opacity: 1,
      y: 0,
      transition: { duration: reduce ? 0.35 : 1, ease: EASE },
    },
  };

  return (
    <motion.div
      className={className}
      variants={container}
      initial="hidden"
      {...(immediate
        ? { animate: "show" }
        : { whileInView: "show", viewport: { once: true, margin: "-15% 0px -15% 0px" } })}
    >
      {lines.map((l, i) => (
        // pb/-mb pair: the reveal mask needs room for descenders (y, j, g)
        // while keeping the visual line rhythm unchanged.
        <span key={i} className="block overflow-hidden pb-[0.14em] -mb-[0.14em]">
          <motion.span variants={line} className={`block ${lineClassName}`}>
            {l}
          </motion.span>
        </span>
      ))}
    </motion.div>
  );
}

/**
 * Float — a slow, continuous vertical drift for hero/feature objects. Subtle by
 * design so it reads as premium, not playful. Honours reduced-motion.
 */
export function Float({
  children,
  className = "",
  amplitude = 10,
  duration = 6,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  amplitude?: number;
  duration?: number;
  delay?: number;
}) {
  const reduce = useReducedMotion();
  if (reduce) return <div className={className}>{children}</div>;
  return (
    <motion.div
      className={className}
      animate={{ y: [0, -amplitude, 0] }}
      transition={{ duration, repeat: Infinity, ease: "easeInOut", delay }}
    >
      {children}
    </motion.div>
  );
}

export function Container({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className={`mx-auto w-full max-w-container px-6 md:px-10 ${className}`}>
      {children}
    </div>
  );
}

export function Grain() {
  return <div className="grain" aria-hidden="true" />;
}
