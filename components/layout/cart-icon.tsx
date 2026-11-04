"use client";

import { ShoppingCart } from "lucide-react";

import { useCartItems } from "@/lib/cart/cart-store";
import { getCartTotals } from "@/lib/cart/cart-totals";

export default function CartIcon() {
  const { totalItems } = getCartTotals(useCartItems());

  return (
    <span className="relative block">
      <ShoppingCart className="h-5 w-5" />
      {totalItems > 0 && (
        <span className="bg-primary text-primary-foreground absolute -top-3 left-2.5 grid size-5.5 place-items-center rounded-full text-xs">
          {totalItems > 99 ? "99+" : totalItems}
        </span>
      )}
    </span>
  );
}
