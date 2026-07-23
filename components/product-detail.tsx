"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Container, Reveal, Float } from "@/components/primitives";
import { ProductVisual } from "@/components/product-visual";
import { VariantSelector } from "@/components/variant-selector";
import { useCart } from "@/components/cart";
import { useVariant } from "@/components/use-variant";
import { formatPrice, hasVariants, getVariantBySku, type Product } from "@/lib/site";

/**
 * ProductHero — the interactive top of the product detail page. It owns the
 * variant selection and updates the image, name, price, availability, SKU and
 * variant metadata in place. Deep links (?variant=SKU) are read on mount and
 * kept in sync via history.replaceState, so the page itself stays static and
 * SEO-friendly (no useSearchParams on the render path).
 */
export function ProductHero({ product }: { product: Product }) {
  const { selected, setSelected, setOption, variant } = useVariant(product);
  const { add } = useCart();
  const [qty, setQty] = useState(1);
  const mounted = useRef(false);

  const withVariants = hasVariants(product);
  const accent = variant.accent ?? (product.tint === "pear" ? "#6E1E2E" : "#B7772A");
  const outOfStock = variant.inStock === false;

  // Read a deep-linked variant on mount.
  useEffect(() => {
    const sku = new URLSearchParams(window.location.search).get("variant");
    if (sku) {
      const v = getVariantBySku(product, sku);
      if (v) setSelected({ ...v.options });
    }
    mounted.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [product]);

  // Keep the URL shareable as the selection changes.
  useEffect(() => {
    if (!mounted.current || !withVariants) return;
    window.history.replaceState(null, "", `${window.location.pathname}?variant=${variant.sku}`);
  }, [variant.sku, withVariants]);

  return (
    <section id="buy" className="scroll-mt-28 pt-28 md:pt-36">
      <Container>
        <Reveal immediate>
          <Link href="/products" className="eyebrow inline-flex items-center gap-2 text-ink-mute transition-colors hover:text-ink">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"><path d="M19 12H5M11 6 5 12l6 6" /></svg>
            All products
          </Link>
        </Reveal>

        <div className="mt-8 grid grid-cols-1 items-start gap-12 lg:grid-cols-2 lg:gap-20">
          {/* Visual — updates with the variant */}
          <Reveal immediate>
            <Float amplitude={7} duration={7}>
              <ProductVisual slug={product.slug} accent={accent} caption={variant.title} className="aspect-[4/5] w-full" />
            </Float>
          </Reveal>

          {/* Details + purchase */}
          <Reveal immediate delay={0.12}>
            <p className="eyebrow" style={{ color: accent }}>
              {product.category}
            </p>
            <h1 className="display-hero mt-4 text-ink" style={{ fontSize: "clamp(2.5rem,6vw,5rem)" }}>
              {product.name}
            </h1>
            {withVariants && (
              <p className="mt-3 font-display text-2xl font-light text-ink-soft" aria-live="polite">
                {variant.title}
              </p>
            )}
            <p className="mt-4 font-display text-xl font-light italic text-ink-soft">
              {product.essence}
            </p>
            <p className="mt-5 max-w-md leading-relaxed text-ink-mute">{product.summary}</p>
            {product.patent && (
              <p className="mt-4 text-xs uppercase tracking-widest text-ink-faint">
                A patented product · {product.patent}
              </p>
            )}

            {/* Purchase panel */}
            <div className="mt-8 rounded-2xl border border-ink/10 bg-paper-soft/50 p-5 md:p-6">
              <div className="flex items-baseline gap-3" aria-live="polite">
                <span className="font-display text-3xl font-light text-ink">{formatPrice(variant.price)}</span>
                {variant.mrp && variant.mrp > variant.price && (
                  <>
                    <span className="text-base text-ink-faint line-through">{formatPrice(variant.mrp)}</span>
                    <span className="rounded-full bg-evergreen/10 px-3 py-1 text-xs font-semibold text-evergreen">
                      Save {formatPrice(variant.mrp - variant.price)} (25% OFF)
                    </span>
                  </>
                )}
              </div>
              <p className="mt-1 flex items-center gap-2 text-xs text-ink-mute">
                <span className={`inline-block h-1.5 w-1.5 rounded-full ${outOfStock ? "bg-ink-faint" : "bg-evergreen"}`} aria-hidden="true" />
                {outOfStock ? "Currently unavailable" : "In stock"} · inclusive of taxes
              </p>

              {withVariants && (
                <div className="mt-6">
                  <VariantSelector product={product} selected={selected} onSelect={setOption} mode="full" />
                </div>
              )}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-3 rounded-full border border-ink/15 px-2 py-1.5">
                  <button
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                    aria-label="Decrease quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-ink hover:text-paper"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
                  </button>
                  <span className="w-6 text-center tabular-nums text-ink">{qty}</span>
                  <button
                    onClick={() => setQty((q) => Math.min(99, q + 1))}
                    aria-label="Increase quantity"
                    className="flex h-8 w-8 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-ink hover:text-paper"
                  >
                    <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
                  </button>
                </div>

                <button
                  onClick={() => !outOfStock && add(variant.sku, qty)}
                  disabled={outOfStock}
                  className="inline-flex flex-1 items-center justify-center gap-2 rounded-full bg-ink px-7 py-4 text-sm font-medium text-paper transition-all duration-500 ease-calm hover:bg-evergreen disabled:cursor-not-allowed disabled:opacity-40"
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M6 6 5 3H2" /></svg>
                  {outOfStock ? "Coming soon" : "Add to order"}
                </button>
              </div>

              {/* Variant metadata — updates with the selection */}
              {variant.meta && variant.meta.length > 0 && (
                <dl className="mt-6 space-y-1.5 border-t border-ink/8 pt-4 text-sm" aria-live="polite">
                  {variant.meta.map((m) => (
                    <div key={m.label} className="flex gap-3">
                      <dt className="w-28 shrink-0 text-ink-mute">{m.label}</dt>
                      <dd className="text-ink-soft">{m.value}</dd>
                    </div>
                  ))}
                </dl>
              )}

              <p className="mt-4 flex items-center gap-2 text-xs text-ink-mute">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className="text-evergreen"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" /></svg>
                Add to your order, then send it to us on WhatsApp.
              </p>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}
