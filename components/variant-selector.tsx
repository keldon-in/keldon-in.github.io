"use client";

import { useRef } from "react";
import {
  type Product,
  type ProductOption,
  type OptionValue,
  isValueAvailable,
  variantExists,
} from "@/lib/site";

/**
 * VariantSelector — accessible option pickers shared by the catalog card and
 * the PDP. Each axis renders as a radiogroup of chips (with roving tab-index +
 * arrow-key navigation) or, for long axes on the compact card, a native select.
 * Values that would lead to a non-existent or out-of-stock combination are
 * disabled, holding the other current selections fixed.
 */
export function VariantSelector({
  product,
  selected,
  onSelect,
  mode = "full",
}: {
  product: Product;
  selected: Record<string, string>;
  onSelect: (optionSlug: string, valueSlug: string) => void;
  mode?: "full" | "compact";
}) {
  const options = product.options ?? [];
  if (!options.length) return null;

  // The compact card shows the primary axis + one secondary axis only.
  const shown = mode === "compact" ? options.slice(0, 2) : options;

  return (
    <div className={mode === "compact" ? "space-y-3" : "space-y-6"}>
      {shown.map((option) => {
        const asSelect = mode === "compact" && (option.display === "select" || option.values.length > 6);
        return asSelect ? (
          <SelectAxis key={option.slug} product={product} option={option} selected={selected} onSelect={onSelect} />
        ) : (
          <ChipAxis
            key={option.slug}
            product={product}
            option={option}
            selected={selected}
            onSelect={onSelect}
            mode={mode}
          />
        );
      })}
    </div>
  );
}

function AxisHeader({ option, valueLabel }: { option: ProductOption; valueLabel?: string }) {
  return (
    <div className="mb-2 flex items-baseline justify-between gap-3">
      <span className="text-xs font-medium uppercase tracking-widest text-ink-mute">{option.name}</span>
      {valueLabel && <span className="text-xs text-ink-soft">{valueLabel}</span>}
    </div>
  );
}

function ChipAxis({
  product,
  option,
  selected,
  onSelect,
  mode,
}: {
  product: Product;
  option: ProductOption;
  selected: Record<string, string>;
  onSelect: (optionSlug: string, valueSlug: string) => void;
  mode: "full" | "compact";
}) {
  const groupRef = useRef<HTMLDivElement>(null);
  const current = selected[option.slug];
  const currentLabel = option.values.find((v) => v.slug === current)?.label;

  // Arrow-key navigation across enabled chips (roving tabindex).
  const onKeyDown = (e: React.KeyboardEvent) => {
    if (!["ArrowRight", "ArrowDown", "ArrowLeft", "ArrowUp"].includes(e.key)) return;
    e.preventDefault();
    const enabled = option.values.filter((v) => isValueAvailable(product, option.slug, v.slug, selected) || v.slug === current);
    const idx = enabled.findIndex((v) => v.slug === current);
    const dir = e.key === "ArrowRight" || e.key === "ArrowDown" ? 1 : -1;
    const next = enabled[(idx + dir + enabled.length) % enabled.length];
    if (next) {
      onSelect(option.slug, next.slug);
      const el = groupRef.current?.querySelector<HTMLButtonElement>(`[data-value="${next.slug}"]`);
      el?.focus();
    }
  };

  const chip = (value: OptionValue) => {
    const isSelected = current === value.slug;
    const available = isValueAvailable(product, option.slug, value.slug, selected);
    const exists = variantExists(product, option.slug, value.slug, selected);
    const disabled = !available;
    return (
      <button
        key={value.slug}
        type="button"
        role="radio"
        data-value={value.slug}
        aria-checked={isSelected}
        aria-disabled={disabled}
        tabIndex={isSelected ? 0 : -1}
        disabled={disabled}
        onClick={() => !disabled && onSelect(option.slug, value.slug)}
        title={!exists ? "Not available in this combination" : !available ? "Out of stock" : value.note}
        className={[
          "group relative inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm transition-all duration-300 ease-calm",
          isSelected
            ? "border-ink bg-ink text-paper"
            : disabled
              ? "cursor-not-allowed border-ink/10 text-ink-faint"
              : "border-ink/20 text-ink-soft hover:border-ink/50",
        ].join(" ")}
      >
        {value.swatch && (
          <span
            className="h-3 w-3 shrink-0 rounded-full ring-1 ring-black/10"
            style={{ backgroundColor: value.swatch }}
            aria-hidden="true"
          />
        )}
        <span className={disabled && !isSelected ? "line-through decoration-1" : ""}>{value.label}</span>
      </button>
    );
  };

  // Group into concern sections when values carry a `group` (full mode only).
  const grouped = mode === "full" && option.values.some((v) => v.group);
  const groupNames = grouped
    ? option.values.reduce<string[]>((acc, v) => {
        if (v.group && !acc.includes(v.group)) acc.push(v.group);
        return acc;
      }, [])
    : [];

  return (
    <div>
      <AxisHeader option={option} valueLabel={mode === "full" ? currentLabel : undefined} />
      <div
        ref={groupRef}
        role="radiogroup"
        aria-label={option.name}
        onKeyDown={onKeyDown}
        className={grouped ? "space-y-4" : "flex flex-wrap gap-2"}
      >
        {grouped
          ? groupNames.map((g) => (
              <div key={g}>
                <p className="mb-2 text-[0.65rem] font-medium uppercase tracking-widest text-ink-faint">{g}</p>
                <div className="flex flex-wrap gap-2">
                  {option.values.filter((v) => v.group === g).map(chip)}
                </div>
              </div>
            ))
          : option.values.map(chip)}
      </div>
      {mode === "full" && <NoteLine option={option} current={current} />}
    </div>
  );
}

function NoteLine({ option, current }: { option: ProductOption; current: string }) {
  const note = option.values.find((v) => v.slug === current)?.note;
  if (!note) return null;
  return <p className="mt-2 text-xs text-ink-mute">{note}</p>;
}

function SelectAxis({
  product,
  option,
  selected,
  onSelect,
}: {
  product: Product;
  option: ProductOption;
  selected: Record<string, string>;
  onSelect: (optionSlug: string, valueSlug: string) => void;
}) {
  const current = selected[option.slug];
  return (
    <label className="block">
      <span className="mb-1.5 block text-xs font-medium uppercase tracking-widest text-ink-mute">
        {option.name}
      </span>
      <div className="relative">
        <select
          value={current}
          onChange={(e) => onSelect(option.slug, e.target.value)}
          aria-label={option.name}
          className="w-full appearance-none rounded-xl border border-ink/20 bg-paper px-4 py-2.5 pr-10 text-sm text-ink transition-colors hover:border-ink/40 focus:border-ink focus:outline-none"
        >
          {(() => {
            const opt = (value: OptionValue) => {
              const available = isValueAvailable(product, option.slug, value.slug, selected);
              return (
                <option key={value.slug} value={value.slug} disabled={!available}>
                  {value.label}
                  {!available ? " (unavailable)" : ""}
                </option>
              );
            };
            const grouped = option.values.some((v) => v.group);
            if (!grouped) return option.values.map(opt);
            const groupNames = option.values.reduce<string[]>((acc, v) => {
              if (v.group && !acc.includes(v.group)) acc.push(v.group);
              return acc;
            }, []);
            return groupNames.map((g) => (
              <optgroup key={g} label={g}>
                {option.values.filter((v) => v.group === g).map(opt)}
              </optgroup>
            ));
          })()}
        </select>
        <svg
          className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-ink-mute"
          width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"
        >
          <path d="m6 9 6 6 6-6" />
        </svg>
      </div>
    </label>
  );
}
