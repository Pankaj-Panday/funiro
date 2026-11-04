"use client";

import { LayoutGrid, List, SlidersHorizontal } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useOptimistic, useRef, useState, useTransition } from "react";

import {
  hasActiveFilters,
  pageSizes,
  type ShopFilterOptions,
  type ShopFilters,
  type ShopSort,
  sortOptions,
  toShopQuery,
} from "@/lib/shop/shop-filters";
import { cn } from "@/lib/utils";

import FilterPanel from "./filter-panel";

const selectClass = "bg-background border-light ml-3 rounded-[7px] border p-2";

type Props = {
  filters: ShopFilters;
  options: ShopFilterOptions;
  shown: number;
  total: number;
};

export default function ShopControls({ filters, options, shown, total }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const [, startTransition] = useTransition();
  const [optimisticFilters, setOptimisticFilters] = useOptimistic(filters);
  const [panelOpen, setPanelOpen] = useState(() => hasActiveFilters(filters));

  // The debounced search calls this from an older render, so read the latest filters from a ref.
  const latestFilters = useRef(filters);
  useEffect(() => {
    latestFilters.current = optimisticFilters;
  }, [optimisticFilters]);

  function updateFilters(changes: Partial<ShopFilters>) {
    const next = { ...latestFilters.current, ...changes };
    latestFilters.current = next;

    startTransition(() => {
      setOptimisticFilters(next);
      router.replace(`${pathname}${toShopQuery(next)}`, { scroll: false });
    });
  }

  return (
    <>
      <section className="bg-cream py-9">
        <div className="content-container flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="order-1 flex flex-wrap items-center gap-6 lg:order-0">
            <button
              type="button"
              onClick={() => setPanelOpen((open) => !open)}
              className={cn(
                "inline-flex cursor-pointer items-center gap-2",
                panelOpen && "text-primary",
              )}
            >
              <SlidersHorizontal className="size-6" />
              Filter
            </button>

            <button
              type="button"
              aria-label="Grid view"
              onClick={() => updateFilters({ view: "grid" })}
              className={cn("cursor-pointer", optimisticFilters.view === "grid" && "text-primary")}
            >
              <LayoutGrid className="size-6" />
            </button>

            <button
              type="button"
              aria-label="List view"
              onClick={() => updateFilters({ view: "list" })}
              className={cn("cursor-pointer", optimisticFilters.view === "list" && "text-primary")}
            >
              <List className="size-6" />
            </button>

            <span className="lg:border-light max-sm:w-full sm:ml-auto lg:ml-0 lg:border-l-2 lg:pl-8">
              {total > 0 ? `Showing 1–${shown} of ${total} results` : "No result found"}
            </span>
          </div>

          <div className="flex flex-wrap gap-x-8 gap-y-4">
            <label>
              Show
              <select
                value={optimisticFilters.show}
                onChange={(e) => updateFilters({ show: Number(e.target.value) })}
                className={selectClass}
              >
                {pageSizes.map((size) => (
                  <option key={size}>{size}</option>
                ))}
              </select>
            </label>

            <label>
              Sort by
              <select
                value={optimisticFilters.sort ?? ""}
                onChange={(e) =>
                  updateFilters({ sort: (e.target.value || null) as ShopSort | null })
                }
                className={selectClass}
              >
                <option value="">--Select--</option>
                {sortOptions.map(({ value, label }) => (
                  <option key={value} value={value}>
                    {label}
                  </option>
                ))}
              </select>
            </label>
          </div>
        </div>
      </section>

      {panelOpen && (
        <FilterPanel filters={optimisticFilters} options={options} onChange={updateFilters} />
      )}
    </>
  );
}
