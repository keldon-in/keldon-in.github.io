"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { KeldonEmblem, KeldonWordmark } from "@/components/marks";
import { CartButton } from "@/components/cart";
import { SearchButton } from "@/components/search";
import { getCategoriesInUse, getFeaturedProducts } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

const mainNav = [
  { href: "/products", label: "Shop" },
  { href: "/philosophy", label: "Our Science" },
  { href: "/vision", label: "The Vision" },
];

const menuCategories = getCategoriesInUse();
const menuFeatured = getFeaturedProducts().slice(0, 3);

export function SiteHeader() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => setMenuOpen(false), [pathname]);

  return (
    <header className="fixed inset-x-0 top-0 z-[70] bg-paper/95 shadow-[0_1px_0_rgba(34,48,42,0.07)] backdrop-blur-md">
      {/* Main row — logo · nav · actions */}
      <div className="mx-auto flex max-w-container items-center justify-between gap-4 px-5 py-3.5 md:px-10 md:py-4">
        {/* Logo */}
        <Link href="/" className="group flex items-center gap-2.5" aria-label="Keldon, home">
          <KeldonEmblem className="h-11 shrink-0 md:h-14" />
          <span className="flex flex-col leading-none">
            <KeldonWordmark className="text-xl text-ink transition-colors group-hover:text-evergreen md:text-2xl" />
            <span className="mt-1 hidden text-[0.5rem] font-medium uppercase tracking-[0.26em] text-ink-mute sm:block">
              Rooted in Nature. Refined by Science.
            </span>
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-8 md:flex">
          {/* Products dropdown */}
          <div
            className="relative"
            onMouseEnter={() => setProductsOpen(true)}
            onMouseLeave={() => setProductsOpen(false)}
          >
            <Link
              href="/products"
              className="flex items-center gap-1.5 py-2 text-sm font-medium uppercase tracking-wide text-ink transition-colors hover:text-evergreen"
              aria-expanded={productsOpen}
              onFocus={() => setProductsOpen(true)}
            >
              Shop
              <svg
                width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                className={`transition-transform duration-300 ${productsOpen ? "rotate-180" : ""}`}
              ><path d="m6 9 6 6 6-6" /></svg>
            </Link>
            <AnimatePresence>
              {productsOpen && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 8 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  className="absolute left-1/2 top-full grid w-[34rem] -translate-x-1/2 grid-cols-2 gap-2 overflow-hidden rounded-2xl border border-ink/10 bg-paper p-3 shadow-xl"
                >
                  <div>
                    <p className="px-3 pb-1 pt-2 text-[0.65rem] uppercase tracking-widest text-ink-faint">Shop by need</p>
                    {menuCategories.map((c) => (
                      <Link key={c.slug} href={`/products?c=${c.slug}`} className="block rounded-xl px-3 py-2.5 transition-colors hover:bg-paper-soft">
                        <span className="block text-sm font-medium text-ink">{c.name}</span>
                        <span className="block text-xs text-ink-mute">{c.blurb}</span>
                      </Link>
                    ))}
                    <Link href="/products" className="mt-1 block rounded-xl px-3 py-2.5 text-sm font-medium text-evergreen transition-colors hover:bg-paper-soft">
                      View all products →
                    </Link>
                  </div>
                  <div className="rounded-xl bg-paper-soft/60 p-1">
                    <p className="px-3 pb-1 pt-2 text-[0.65rem] uppercase tracking-widest text-ink-faint">Featured</p>
                    {menuFeatured.map((p) => (
                      <Link key={p.slug} href={`/products/${p.slug}`} className="flex items-center gap-3 rounded-xl px-3 py-2 transition-colors hover:bg-paper">
                        <span className="text-sm font-medium text-ink">{p.name}</span>
                        {p.badge && (
                          <span className="ml-auto rounded-full bg-ink/8 px-2 py-0.5 text-[0.6rem] uppercase tracking-wide text-ink-mute">{p.badge}</span>
                        )}
                      </Link>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {mainNav.slice(1).map((item) => {
            const active = pathname === item.href;
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`py-2 text-sm font-medium uppercase tracking-wide transition-colors ${active ? "text-evergreen" : "text-ink hover:text-evergreen"}`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Actions */}
        <div className="flex items-center gap-2 md:gap-4">
          <SearchButton iconOnly className="hidden h-9 w-9 items-center justify-center rounded-full text-ink hover:text-evergreen md:inline-flex" />
          <CartButton />
          <button
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="p-1 text-ink md:hidden"
          >
            <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round">
              {menuOpen ? <path d="m6 6 12 12M18 6 6 18" /> : <path d="M4 8h16M4 16h16" />}
            </svg>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="overflow-hidden border-t border-ink/8 bg-paper md:hidden"
          >
            <div className="flex flex-col px-5 py-4">
              <Link href="/products" className="border-b border-ink/6 py-3 font-display text-2xl font-light text-ink">Shop</Link>
              <div className="flex flex-col gap-2 border-b border-ink/6 py-3 pl-4">
                {menuCategories.map((c) => (
                  <Link key={c.slug} href={`/products?c=${c.slug}`} className="text-sm text-ink-mute">{c.name}</Link>
                ))}
              </div>
              {mainNav.slice(1).map((item) => (
                <Link key={item.href} href={item.href} className="border-b border-ink/6 py-3 font-display text-2xl font-light text-ink">{item.label}</Link>
              ))}
              <div className="mt-4">
                <SearchButton className="text-sm text-ink-mute" />
              </div>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
