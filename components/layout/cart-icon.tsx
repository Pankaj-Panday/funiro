"use client";

import { ShoppingCart } from "lucide-react";

import { useCart } from "@/lib/cart/cart-store";
import { getCartTotals } from "@/lib/cart/cart-totals";

import CountBadge from "./count-badge";

export default function CartIcon() {
  const { totalItems } = getCartTotals(useCart((state) => state.items));

  return (
    <span className="relative block">
      <ShoppingCart className="h-5 w-5" />
      <CountBadge count={totalItems} />
    </span>
  );
}
