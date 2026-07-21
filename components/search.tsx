"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { products } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

type Entry = { label: string; hint: string; href: string };

const INDEX: Entry[] = [
  ...products.map((p) => ({ label: p.name, hint: p.category, href: `/products/${p.slug}` })),
  { label: "Shop the collection", hint: "All products", href: "/products" },
  { label: "Our philosophy", hint: "What we believe", href: "/philosophy" },
  { label: "The Vision", hint: "The hundred-year company", href: "/vision" },
];

export function SearchButton({
  className = "",
  iconOnly = false,
}: {
  className?: string;
  iconOnly?: boolean;
}) {
  const [open, setOpen] = useState(false);
  const [q, setQ] = useState("");
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  const results = useMemo(() => {
    const term = q.trim().toLowerCase();
    if (!term) return INDEX;
    return INDEX.filter(
      (e) => e.label.toLowerCase().includes(term) || e.hint.toLowerCase().includes(term),
    );
  }, [q]);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className={`inline-flex items-center gap-1.5 transition-colors ${className}`}
        aria-label="Search"
      >
        <svg width={iconOnly ? 20 : 15} height={iconOnly ? 20 : 15} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
        {!iconOnly && "Search"}
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[95] flex justify-center px-4 pt-[12vh]"
            initial="hidden"
            animate="show"
            exit="hidden"
          >
            <motion.button
              aria-label="Close search"
              onClick={() => setOpen(false)}
              className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Search Keldon"
              className="relative h-fit w-full max-w-lg overflow-hidden rounded-2xl bg-paper shadow-2xl ring-1 ring-ink/10"
              variants={{
                hidden: { opacity: 0, y: reduce ? 0 : -16 },
                show: { opacity: 1, y: 0 },
              }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="flex items-center gap-3 border-b border-ink/10 px-5 py-4">
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-ink-mute"><circle cx="11" cy="11" r="7" /><path d="m21 21-4.3-4.3" /></svg>
                <input
                  autoFocus
                  value={q}
                  onChange={(e) => setQ(e.target.value)}
                  placeholder="Search products and pages…"
                  className="w-full bg-transparent text-base text-ink outline-none placeholder:text-ink-faint"
                />
                <button onClick={() => setOpen(false)} aria-label="Close" className="text-ink-mute hover:text-ink">
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
              </div>
              <ul className="max-h-[50vh] overflow-y-auto p-2">
                {results.length === 0 ? (
                  <li className="px-4 py-6 text-center text-sm text-ink-mute">Nothing found.</li>
                ) : (
                  results.map((e) => (
                    <li key={e.href + e.label}>
                      <Link
                        href={e.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center justify-between rounded-xl px-4 py-3 transition-colors hover:bg-paper-soft"
                      >
                        <span className="font-medium text-ink">{e.label}</span>
                        <span className="text-xs text-ink-mute">{e.hint}</span>
                      </Link>
                    </li>
                  ))
                )}
              </ul>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
