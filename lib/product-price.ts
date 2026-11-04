import type { Product } from "@/types/product/product.types";

export function getEffectivePrice({ price, discountPercent }: Product) {
  return discountPercent ? Math.round((price * (100 - discountPercent)) / 100) : price;
}
