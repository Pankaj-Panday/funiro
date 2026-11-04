import productsList from "@/data/productData";
import { getEffectivePrice } from "@/lib/product-price";
import type { Product } from "@/types/product/product.types";

import {
  PRICE_STEP,
  type ShopFilterOptions,
  type ShopFilters,
  type ShopSort,
} from "./shop-filters";

const roundUpToStep = (price: number) => Math.ceil(price / PRICE_STEP) * PRICE_STEP;

export function getShopFilterOptions(): ShopFilterOptions {
  const prices = productsList.map(getEffectivePrice);

  return {
    categories: [...new Set(productsList.map((product) => product.category))],
    colors: [...new Set(productsList.flatMap((product) => product.colors))],
    minPrice: roundUpToStep(Math.min(...prices)),
    maxPrice: roundUpToStep(Math.max(...prices)),
  };
}

const comparators: Record<ShopSort, (a: Product, b: Product) => number> = {
  "price-asc": (a, b) => getEffectivePrice(a) - getEffectivePrice(b),
  "price-desc": (a, b) => getEffectivePrice(b) - getEffectivePrice(a),
  "name-asc": (a, b) => a.name.localeCompare(b.name),
  "name-desc": (a, b) => b.name.localeCompare(a.name),
};

export function getShopProducts({ q, category, rating, color, maxPrice, sort }: ShopFilters) {
  const search = q.trim().toLowerCase();

  const products = productsList.filter(
    (product) =>
      (!search || product.name.toLowerCase().includes(search)) &&
      (!category || product.category === category) &&
      (!rating || product.rating >= rating) &&
      (!color || product.colors.includes(color)) &&
      (!maxPrice || getEffectivePrice(product) <= maxPrice),
  );

  return sort ? products.sort(comparators[sort]) : products;
}
