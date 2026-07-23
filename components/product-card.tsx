"use client";

import Link from "next/link";
import { ProductVisual } from "@/components/product-visual";
import { AddToCartButton } from "@/components/cart";
import { VariantSelector } from "@/components/variant-selector";
import { useVariant } from "@/components/use-variant";
import { formatPrice, hasVariants, type Product } from "@/lib/site";

const tintHex = (t: Product["tint"]) => (t === "pear" ? "#6E1E2E" : "#B7772A");

export function ProductCard({ product }: { product: Product }) {
  const { selected, setOption, variant } = useVariant(product);
  const withVariants = hasVariants(product);
  const accent = variant.accent ?? tintHex(product.tint);

  // Dynamic, variant-driven fields.
  const primary = product.options?.[0];
  const primaryValue = primary?.values.find((v) => v.slug === selected[primary.slug]);
  const benefit = primaryValue?.note ?? product.benefit;
  const countLabel =
    variant.meta?.find((m) => m.label === "Count")?.value ?? product.form.split(" · ")[0];
  const outOfStock = variant.inStock === false;
  const detailHref = `/products/${product.slug}${withVariants ? `?variant=${variant.sku}` : ""}`;

  return (
    <div className="group flex h-full flex-col overflow-hidden rounded-[28px] border border-ink/8 bg-paper-soft/40 transition-all duration-700 ease-calm hover:border-ink/20 hover:shadow-xl">
      <Link href={detailHref} className="block" aria-label={product.name}>
        <div className="relative overflow-hidden">
          <ProductVisual
            slug={product.slug}
            accent={accent}
            caption={variant.title}
            className="aspect-[5/4] w-full transition-transform duration-700 ease-calm group-hover:scale-105"
          />
          {product.badge && (
            <span className="absolute left-4 top-4 rounded-full bg-ink px-3 py-1 text-xs font-medium text-paper">
              {product.badge}
            </span>
          )}
          {variant.mrp && variant.mrp > variant.price && (
            <span className="absolute right-4 top-4 rounded-full bg-[#1b2c22] px-3 py-1 text-xs font-medium text-paper shadow-md">
              25% OFF · Save {formatPrice(variant.mrp - variant.price)}
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-1 flex-col p-6 md:p-7">
        <p className="eyebrow" style={{ color: accent }}>
          {product.category}
        </p>
        <Link href={detailHref}>
          <h3 className="display-md mt-2 text-ink transition-colors group-hover:text-evergreen">
            {product.name}
          </h3>
        </Link>
        <p className="mt-2 min-h-[2.5rem] text-sm leading-relaxed text-ink-mute" aria-live="polite">
          {benefit}
        </p>

        {withVariants ? (
          <div className="mt-4">
            <VariantSelector product={product} selected={selected} onSelect={setOption} mode="compact" />
          </div>
        ) : (
          <ul className="mt-4 flex flex-wrap gap-1.5">
            {product.attributes.slice(0, 3).map((a) => (
              <li key={a} className="rounded-full border border-ink/12 px-2.5 py-1 text-[0.7rem] text-ink-soft">
                {a}
              </li>
            ))}
          </ul>
        )}

        <div className="mt-auto pt-6">
          <div className="flex items-baseline gap-2 flex-wrap" aria-live="polite">
            <span className="font-display text-2xl font-light text-ink">{formatPrice(variant.price)}</span>
            {variant.mrp && variant.mrp > variant.price && (
              <>
                <span className="text-sm text-ink-faint line-through">{formatPrice(variant.mrp)}</span>
                <span className="rounded-full bg-evergreen/10 px-2 py-0.5 text-[0.68rem] font-semibold text-evergreen">
                  25% OFF
                </span>
              </>
            )}
            <span className="ml-auto text-xs text-ink-mute">
              {outOfStock ? "Coming soon" : countLabel}
            </span>
          </div>

          <div className="mt-4 flex items-center gap-3">
            <AddToCartButton
              sku={variant.sku}
              disabled={outOfStock}
              className="flex-1 px-5 py-3.5"
              label={outOfStock ? "Coming soon" : "Add to order"}
            />
            <Link
              href={detailHref}
              className="inline-flex shrink-0 items-center justify-center rounded-full border border-ink/20 px-5 py-3.5 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
            >
              Details
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
