"use client";

import { useEffect, useRef, useState } from "react";

import FormatPrice from "@/components/shared/format-price";
import Rating from "@/components/shared/rating";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Slider } from "@/components/ui/slider";
import { PRICE_STEP, type ShopFilterOptions, type ShopFilters } from "@/lib/shop/shop-filters";
import { cn } from "@/lib/utils";

import FilterSelect from "./filter-select";

const SEARCH_DEBOUNCE_MS = 300;

const headingClass = "text-ink mb-3 font-medium";

const firstValue = (value: number | readonly number[]) =>
  typeof value === "number" ? value : value[0];

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

  function commitPrice(value: number) {
    onChange({ maxPrice: value < options.maxPrice ? value : null });
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
          <FilterSelect
            label="Category"
            className="w-40"
            value={filters.category || null}
            items={[
              { label: "All", value: null },
              ...options.categories.map((category) => ({ label: category, value: category })),
            ]}
            onChange={(category) => onChange({ category: category ?? "" })}
          />
        </div>

        <div>
          <h3 className={headingClass}>Rating</h3>
          <RadioGroup
            value={filters.rating === null ? "any" : String(filters.rating)}
            onValueChange={(value) => onChange({ rating: value === "any" ? null : Number(value) })}
          >
            {[4, 3].map((rating) => (
              <Label key={rating} className="gap-1.5 font-normal">
                <RadioGroupItem value={String(rating)} className="border-light" />
                <Rating rating={rating} /> ({rating}+)
              </Label>
            ))}
            <Label className="gap-1.5 font-normal">
              <RadioGroupItem value="any" className="border-light" />
              Any
            </Label>
          </RadioGroup>
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
          <Slider
            aria-label="Maximum price"
            className="mt-3"
            min={options.minPrice}
            max={options.maxPrice}
            step={PRICE_STEP}
            value={[price]}
            onValueChange={(value) => setPriceDraft(firstValue(value))}
            onValueCommitted={(value) => commitPrice(firstValue(value))}
          />
        </div>
      </div>

      <div className="mt-6 flex flex-wrap items-center gap-4">
        <Input
          type="text"
          aria-label="Search products"
          placeholder="Search Product"
          value={searchDraft ?? filters.q}
          onChange={(e) => handleSearch(e.target.value)}
          className="border-light placeholder:text-light focus-visible:border-primary focus-visible:ring-primary/30 h-10 w-52 rounded-[7px]"
        />
        <Button
          type="button"
          onClick={handleReset}
          className="bg-ink hover:bg-ink/90 text-primary-foreground h-10 cursor-pointer rounded-[7px] px-6 text-xs tracking-[2px] uppercase"
        >
          Reset filters
        </Button>
      </div>
    </div>
  );
}
