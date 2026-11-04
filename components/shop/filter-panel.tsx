"use client";

import { useEffect, useRef, useState } from "react";

import FormatPrice from "@/components/shared/format-price";
import Rating from "@/components/shared/rating";
import { PRICE_STEP, type ShopFilterOptions, type ShopFilters } from "@/lib/shop/shop-filters";
import { cn } from "@/lib/utils";

const SEARCH_DEBOUNCE_MS = 300;

const headingClass = "text-ink mb-3 font-medium";

type Props = {
  filters: ShopFilters;
  options: ShopFilterOptions;
  onChange: (changes: Partial<ShopFilters>) => void;
};

export default function FilterPanel({ filters, options, onChange }: Props) {
  const [searchDraft, setSearchDraft] = useState<string | null>(null);
  const [priceDraft, setPriceDraft] = useState<number | null>(null);
  const searchTimer = useRef<ReturnType<typeof setTimeout>>(undefined);

  useEffect(() => () => clearTimeout(searchTimer.current), []);

  const price = priceDraft ?? filters.maxPrice ?? options.maxPrice;

  function handleSearch(value: string) {
    setSearchDraft(value);
    clearTimeout(searchTimer.current);
    searchTimer.current = setTimeout(() => {
      onChange({ q: value });
      setSearchDraft(null);
    }, SEARCH_DEBOUNCE_MS);
  }

  function commitPrice() {
    if (priceDraft === null) return;
    onChange({ maxPrice: priceDraft < options.maxPrice ? priceDraft : null });
    setPriceDraft(null);
  }

  function handleReset() {
    clearTimeout(searchTimer.current);
    setSearchDraft(null);
    setPriceDraft(null);
    onChange({ q: "", category: "", rating: null, color: "", maxPrice: null });
  }

  return (
    <div className="content-container py-8">
      <div className="grid gap-x-12 gap-y-6 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <h3 className={headingClass}>Categories</h3>
          <select
            value={filters.category}
            onChange={(e) => onChange({ category: e.target.value })}
            className="bg-background border-light w-40 rounded-[7px] border p-2"
          >
            <option value="">All</option>
            {options.categories.map((category) => (
              <option key={category}>{category}</option>
            ))}
          </select>
        </div>

        <div>
          <h3 className={headingClass}>Rating</h3>
          <div className="flex flex-col gap-2 text-sm">
            {[4, 3].map((rating) => (
              <label key={rating} className="flex items-center gap-1">
                <input
                  type="radio"
                  name="rating"
                  checked={filters.rating === rating}
                  onChange={() => onChange({ rating })}
                  className="accent-primary"
                />
                <Rating rating={rating} /> ({rating}+)
              </label>
            ))}
            <label className="flex items-center gap-1">
              <input
                type="radio"
                name="rating"
                checked={filters.rating === null}
                onChange={() => onChange({ rating: null })}
                className="accent-primary"
              />
              Any
            </label>
          </div>
        </div>

        <div>
          <h3 className={headingClass}>Colors</h3>
          <div className="flex flex-wrap items-center gap-2">
            <button
              type="button"
              onClick={() => onChange({ color: "" })}
              className={cn("cursor-pointer", !filters.color && "text-primary font-medium")}
            >
              All
            </button>
            {options.colors.map((color) => (
              <button
                key={color}
                type="button"
                aria-label={`Filter by color ${color}`}
                onClick={() => onChange({ color })}
                style={{ backgroundColor: color }}
                className={cn(
                  "size-5 cursor-pointer rounded-full opacity-50",
                  filters.color === color &&
                    "outline-primary opacity-100 outline-2 outline-offset-2",
                )}
              />
            ))}
          </div>
        </div>

        <div>
          <h3 className={headingClass}>
            Price (<FormatPrice price={options.minPrice} /> -{" "}
            <FormatPrice price={options.maxPrice} />)
          </h3>
          <FormatPrice price={price} className="text-primary font-medium" />
          <input
            type="range"
            aria-label="Maximum price"
            min={options.minPrice}
            max={options.maxPrice}
            step={PRICE_STEP}
            value={price}
            onChange={(e) => setPriceDraft(Number(e.target.value))}
            onPointerUp={commitPrice}
            onKeyUp={commitPrice}
            className="accent-primary mt-2 block w-full"
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <input
          type="text"
          aria-label="Search products"
          placeholder="Search Product"
          value={searchDraft ?? filters.q}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-light placeholder:text-light focus:border-primary w-52 rounded-[7px] border p-2 outline-none"
        />
        <button
          type="button"
          onClick={handleReset}
          className="bg-ink hover:bg-ink/90 text-primary-foreground cursor-pointer rounded-[7px] px-6 py-2 text-xs font-medium tracking-[2px] uppercase transition-colors"
        >
          Reset filters
        </button>
      </div>
    </div>
  );
}
