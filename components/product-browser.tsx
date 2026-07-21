"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { useSearchParams } from "next/navigation";
import { ProductCard } from "@/components/product-card";
import { products, categories, type Product, type Category } from "@/lib/site";

const EASE = [0.16, 1, 0.3, 1] as const;

export function ProductBrowser({
  allProducts = products,
  allCategories = categories,
}: {
  allProducts?: Product[];
  allCategories?: Category[];
}) {
  // Only show category tabs that actually contain products.
  const usable = useMemo(
    () => allCategories.filter((c) => allProducts.some((p) => p.categorySlug === c.slug)),
    [allCategories, allProducts],
  );

  // Deep-link support: /products?c=<slug> preselects a category.
  const params = useSearchParams();
  const requested = params.get("c");
  const initial = requested && usable.some((c) => c.slug === requested) ? requested : "all";
  const [active, setActive] = useState(initial);

  const visible = useMemo(
    () => (active === "all" ? allProducts : allProducts.filter((p) => p.categorySlug === active)),
    [active, allProducts],
  );

  const tabs = [{ slug: "all", name: "All" }, ...usable];

  return (
    <div>
      {/* Filter tabs — scale to any number of categories */}
      {usable.length > 1 && (
        <div className="flex flex-wrap items-center gap-2">
          {tabs.map((t) => {
            const on = active === t.slug;
            return (
              <button
                key={t.slug}
                onClick={() => setActive(t.slug)}
                aria-pressed={on}
                className={`rounded-full px-5 py-2.5 text-sm font-medium transition-all duration-500 ease-calm ${
                  on
                    ? "bg-ink text-paper"
                    : "border border-ink/15 text-ink-soft hover:border-ink/40"
                }`}
              >
                {t.name}
              </button>
            );
          })}
          <span className="ml-auto text-sm text-ink-mute">
            {visible.length} {visible.length === 1 ? "product" : "products"}
          </span>
        </div>
      )}

      <motion.div
        key={active}
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        className="mt-8 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 md:gap-8"
      >
        {visible.map((p) => (
          <ProductCard key={p.slug} product={p} />
        ))}
      </motion.div>
    </div>
  );
}
