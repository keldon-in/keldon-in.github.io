"use client";

import { useCallback, useMemo, useState } from "react";
import {
  type Product,
  getOptions,
  getVariants,
  getDefaultVariant,
  findVariant,
} from "@/lib/site";

/**
 * useVariant — the single source of client-side variant state, shared by the
 * catalog card and the product detail page. Given a product it tracks the
 * selected option values, resolves them to a concrete variant, and reconciles
 * selections that would otherwise land on a non-existent combination (the
 * "smart selection" behaviour leading storefronts use).
 */
export function useVariant(product: Product, initialSku?: string) {
  const options = useMemo(() => getOptions(product), [product]);
  const variants = useMemo(() => getVariants(product), [product]);

  const initial = useMemo<Record<string, string>>(() => {
    if (initialSku) {
      const v = variants.find((x) => x.sku === initialSku);
      if (v) return { ...v.options };
    }
    return { ...getDefaultVariant(product).options };
  }, [product, initialSku, variants]);

  const [selected, setSelected] = useState<Record<string, string>>(initial);

  const setOption = useCallback(
    (optionSlug: string, valueSlug: string) => {
      setSelected((prev) => {
        const desired = { ...prev, [optionSlug]: valueSlug };
        if (findVariant(product, desired)) return desired;
        // No exact match: keep the just-picked value fixed and choose the
        // candidate variant that preserves the most of the other selections.
        const candidates = variants.filter((v) => v.options[optionSlug] === valueSlug);
        if (!candidates.length) return desired;
        const score = (v: (typeof variants)[number]) =>
          options.reduce((s, o) => s + (v.options[o.slug] === desired[o.slug] ? 1 : 0), 0) +
          (v.inStock !== false ? 0.1 : 0);
        const best = [...candidates].sort((a, b) => score(b) - score(a))[0];
        return { ...best.options };
      });
    },
    [product, options, variants],
  );

  const variant = useMemo(
    () => findVariant(product, selected) ?? getDefaultVariant(product),
    [product, selected],
  );

  return { options, selected, setOption, setSelected, variant };
}
