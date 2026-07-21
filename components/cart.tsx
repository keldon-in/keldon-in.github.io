"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import Link from "next/link";
import {
  getProduct,
  getDefaultVariant,
  resolveSku,
  variantSummary,
  formatPrice,
  contact,
} from "@/lib/site";
import { ProductVisual } from "@/components/product-visual";

const EASE = [0.16, 1, 0.3, 1] as const;
const WA_NUMBER = "919152535156";
const STORAGE_KEY = "keldon-cart";

// A line item is keyed by variant SKU — the industry-standard cart primitive.
type CartItem = { sku: string; qty: number };

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  add: (sku: string, qty?: number) => void;
  setQty: (sku: string, qty: number) => void;
  remove: (sku: string) => void;
  clear: () => void;
  openCart: () => void;
  closeCart: () => void;
  isOpen: boolean;
};

const CartContext = createContext<CartContextValue | null>(null);

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [hydrated, setHydrated] = useState(false);
  const reduce = useReducedMotion();

  // Load persisted cart once on mount, migrating any legacy {slug} line items.
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Array<{ sku?: string; slug?: string; qty: number }>;
        const migrated = parsed
          .map((i) => {
            if (i.sku) return { sku: i.sku, qty: i.qty };
            if (i.slug) {
              const p = getProduct(i.slug);
              if (p) return { sku: getDefaultVariant(p).sku, qty: i.qty };
            }
            return null;
          })
          .filter((i): i is CartItem => Boolean(i && resolveSku(i.sku) && i.qty > 0));
        setItems(migrated);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
    if (window.location.hash === "#order") setIsOpen(true);
  }, []);

  // Persist on change.
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {
      /* ignore */
    }
  }, [items, hydrated]);

  const add = useCallback((sku: string, qty = 1) => {
    if (!resolveSku(sku)) return;
    setItems((prev) => {
      const existing = prev.find((i) => i.sku === sku);
      if (existing) {
        return prev.map((i) => (i.sku === sku ? { ...i, qty: Math.min(i.qty + qty, 99) } : i));
      }
      return [...prev, { sku, qty }];
    });
    setIsOpen(true);
  }, []);

  const setQty = useCallback((sku: string, qty: number) => {
    setItems((prev) =>
      qty <= 0
        ? prev.filter((i) => i.sku !== sku)
        : prev.map((i) => (i.sku === sku ? { ...i, qty: Math.min(qty, 99) } : i)),
    );
  }, []);

  const remove = useCallback(
    (sku: string) => setItems((prev) => prev.filter((i) => i.sku !== sku)),
    [],
  );
  const clear = useCallback(() => setItems([]), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const { count, subtotal } = useMemo(() => {
    let count = 0;
    let subtotal = 0;
    for (const i of items) {
      const resolved = resolveSku(i.sku);
      if (!resolved) continue;
      count += i.qty;
      subtotal += resolved.variant.price * i.qty;
    }
    return { count, subtotal };
  }, [items]);

  // Lock scroll + escape to close while the drawer is open.
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setIsOpen(false);
    document.addEventListener("keydown", onKey);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prev;
    };
  }, [isOpen]);

  const orderMessage = useMemo(() => {
    const lines = items.flatMap((i) => {
      const resolved = resolveSku(i.sku);
      if (!resolved) return [];
      const { product, variant } = resolved;
      const detail = variantSummary(product, variant) || product.form;
      return [
        `• ${product.name} — ${detail} × ${i.qty} · ${formatPrice(variant.price * i.qty)}  [${variant.sku}]`,
      ];
    });
    return [
      "Hello Keldon, I'd like to place an order:",
      "",
      ...lines,
      "",
      `Subtotal: ${formatPrice(subtotal)}`,
      "",
      "Name:",
      "Delivery address:",
      "Phone:",
    ].join("\n");
  }, [items, subtotal]);

  const whatsappHref = `https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(orderMessage)}`;
  const emailHref = `mailto:${contact.email}?subject=${encodeURIComponent(
    "New Keldon order",
  )}&body=${encodeURIComponent(orderMessage)}`;

  return (
    <CartContext.Provider
      value={{ items, count, subtotal, add, setQty, remove, clear, openCart, closeCart, isOpen }}
    >
      {children}

      <AnimatePresence>
        {isOpen && (
          <motion.div className="fixed inset-0 z-[90]" initial="hidden" animate="show" exit="hidden">
            <motion.button
              aria-label="Close cart"
              onClick={closeCart}
              className="absolute inset-0 bg-ink/40 backdrop-blur-[3px]"
              variants={{ hidden: { opacity: 0 }, show: { opacity: 1 } }}
              transition={{ duration: 0.4, ease: EASE }}
            />
            <motion.aside
              role="dialog"
              aria-modal="true"
              aria-label="Your order"
              className="absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-paper shadow-2xl"
              variants={{ hidden: { x: reduce ? 0 : "100%", opacity: reduce ? 0 : 1 }, show: { x: 0, opacity: 1 } }}
              transition={{ duration: 0.6, ease: EASE }}
            >
              <header className="flex items-center justify-between border-b border-ink/10 px-6 py-5">
                <div>
                  <p className="eyebrow">Your order</p>
                  <p className="mt-0.5 text-sm text-ink-mute">
                    {count === 0 ? "Empty" : `${count} item${count > 1 ? "s" : ""}`}
                  </p>
                </div>
                <button onClick={closeCart} aria-label="Close" className="text-ink-mute transition-colors hover:text-ink">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
                </button>
              </header>

              {items.length === 0 ? (
                <div className="flex flex-1 flex-col items-center justify-center px-8 text-center">
                  <p className="font-display text-2xl font-light text-ink">Your order is empty</p>
                  <p className="mt-3 max-w-xs text-sm leading-relaxed text-ink-mute">
                    Add a product and it will appear here, ready to send to us.
                  </p>
                  <Link
                    href="/products"
                    onClick={closeCart}
                    className="mt-7 inline-flex items-center gap-2 rounded-full bg-ink px-6 py-3 text-sm font-medium text-paper transition-colors hover:bg-evergreen"
                  >
                    Browse products
                  </Link>
                </div>
              ) : (
                <>
                  <div className="flex-1 overflow-y-auto px-6 py-4">
                    <ul className="divide-y divide-ink/8">
                      {items.map((item) => {
                        const resolved = resolveSku(item.sku);
                        if (!resolved) return null;
                        const { product, variant } = resolved;
                        const detail = variantSummary(product, variant) || product.form;
                        return (
                          <li key={item.sku} className="flex gap-4 py-5">
                            <ProductVisual
                              slug={product.slug}
                              accent={variant.accent}
                              caption={variant.title}
                              className="h-24 w-20 shrink-0 rounded-xl"
                            />
                            <div className="flex flex-1 flex-col">
                              <div className="flex justify-between gap-3">
                                <div>
                                  <Link href={`/products/${product.slug}`} onClick={closeCart} className="font-medium text-ink hover:text-evergreen">
                                    {product.name}
                                  </Link>
                                  <p className="mt-0.5 text-xs leading-relaxed text-ink-mute">{detail}</p>
                                </div>
                                <button
                                  onClick={() => remove(item.sku)}
                                  aria-label={`Remove ${product.name}`}
                                  className="text-ink-faint transition-colors hover:text-pear"
                                >
                                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m6 6 12 12M18 6 6 18" /></svg>
                                </button>
                              </div>
                              <div className="mt-auto flex items-center justify-between pt-3">
                                <QtyStepper qty={item.qty} onChange={(q) => setQty(item.sku, q)} />
                                <span className="font-display text-lg font-light text-ink">
                                  {formatPrice(variant.price * item.qty)}
                                </span>
                              </div>
                            </div>
                          </li>
                        );
                      })}
                    </ul>
                  </div>

                  <footer className="border-t border-ink/10 px-6 pb-6 pt-5">
                    <div className="flex items-baseline justify-between">
                      <span className="text-sm text-ink-mute">Subtotal</span>
                      <span className="font-display text-2xl font-light text-ink">{formatPrice(subtotal)}</span>
                    </div>
                    <p className="mt-2 text-xs leading-relaxed text-ink-mute">
                      Send us your order and we&rsquo;ll take care of the rest, personally.
                    </p>
                    <div className="mt-4 grid gap-2.5">
                      <a
                        href={whatsappHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center justify-center gap-2.5 rounded-full bg-evergreen px-6 py-4 text-sm font-medium text-paper transition-colors hover:bg-evergreen-deep"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3a9 9 0 0 0-7.7 13.6L3 21l4.5-1.2A9 9 0 1 0 12 3Z" /></svg>
                        Send order on WhatsApp
                      </a>
                      <a
                        href={emailHref}
                        className="inline-flex items-center justify-center gap-2.5 rounded-full border border-ink/25 px-6 py-4 text-sm font-medium text-ink transition-colors hover:border-ink hover:bg-ink hover:text-paper"
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><rect x="3" y="5" width="18" height="14" rx="2" /><path d="m4 7 8 6 8-6" /></svg>
                        Send order by email
                      </a>
                      <button onClick={clear} className="mt-1 text-xs text-ink-faint underline-offset-4 hover:text-ink hover:underline">
                        Clear order
                      </button>
                    </div>
                  </footer>
                </>
              )}
            </motion.aside>
          </motion.div>
        )}
      </AnimatePresence>
    </CartContext.Provider>
  );
}

function QtyStepper({ qty, onChange }: { qty: number; onChange: (q: number) => void }) {
  return (
    <div className="flex items-center gap-3 rounded-full border border-ink/15 px-1.5 py-1">
      <button
        onClick={() => onChange(qty - 1)}
        aria-label="Decrease quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-ink hover:text-paper"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M5 12h14" /></svg>
      </button>
      <span className="w-5 text-center text-sm tabular-nums text-ink">{qty}</span>
      <button
        onClick={() => onChange(qty + 1)}
        aria-label="Increase quantity"
        className="flex h-7 w-7 items-center justify-center rounded-full text-ink-mute transition-colors hover:bg-ink hover:text-paper"
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"><path d="M12 5v14M5 12h14" /></svg>
      </button>
    </div>
  );
}

/** Add-to-cart button used across the storefront. Adds a specific variant SKU. */
export function AddToCartButton({
  sku,
  qty = 1,
  className = "",
  variant = "solid",
  label = "Add to order",
  disabled = false,
}: {
  sku: string;
  qty?: number;
  className?: string;
  variant?: "solid" | "outline";
  label?: string;
  disabled?: boolean;
}) {
  const { add } = useCart();
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-500 ease-calm disabled:cursor-not-allowed disabled:opacity-40";
  const styles = {
    solid: "bg-ink px-7 py-3.5 text-paper hover:bg-evergreen",
    outline: "border border-ink/25 px-7 py-3.5 text-ink hover:border-ink hover:bg-ink hover:text-paper",
  }[variant];
  return (
    <button className={`${base} ${styles} ${className}`} onClick={() => add(sku, qty)} disabled={disabled}>
      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M6 6 5 3H2" /></svg>
      {label}
    </button>
  );
}

/** Cart icon + count for the header. */
export function CartButton({ className = "" }: { className?: string }) {
  const { count, openCart } = useCart();
  return (
    <button
      onClick={openCart}
      aria-label={`Open order${count ? `, ${count} items` : ""}`}
      className={`relative inline-flex items-center gap-2 rounded-full bg-ink px-5 py-3 text-sm font-medium text-paper transition-colors duration-500 hover:bg-evergreen ${className}`}
    >
      <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"><path d="M6 6h15l-1.5 9h-12z" /><circle cx="9" cy="20" r="1" /><circle cx="18" cy="20" r="1" /><path d="M6 6 5 3H2" /></svg>
      <span className="hidden sm:inline">Order</span>
      {count > 0 && (
        <span className="ml-0.5 flex h-5 min-w-5 items-center justify-center rounded-full bg-paper px-1.5 text-xs font-semibold text-ink tabular-nums">
          {count}
        </span>
      )}
    </button>
  );
}
