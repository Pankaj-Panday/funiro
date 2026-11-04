"use client";

import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import { clearCart, useCartItems, useCartReady } from "@/lib/cart/cart-store";
import { getCartTotals } from "@/lib/cart/cart-totals";
import { cn } from "@/lib/utils";

import CartRow, { cartRowColumns } from "./cart-row";
import CartSummary from "./cart-summary";

const titles = ["Product", "Price", "Quantity", "Subtotal"];

export default function CartContents() {
  const items = useCartItems();
  const ready = useCartReady();

  // The saved cart only exists in the browser, so stay hidden instead of flashing an empty cart.
  return (
    <section
      className={cn(
        "content-container mt-18 flex min-h-90 flex-col gap-20 xl:grid xl:grid-cols-[2.5fr_1fr] xl:gap-7.5",
        !ready && "invisible",
      )}
    >
      <div>
        <div
          className={cn(
            "bg-cream hidden place-items-center py-4 font-medium sm:grid",
            cartRowColumns,
          )}
        >
          {titles.map((title) => (
            <h2 key={title}>{title}</h2>
          ))}
        </div>

        {items.length === 0 ? (
          <div className="pt-12 text-center">
            <p>No Items in Cart</p>
            <Link
              href="/shop"
              className={cn(
                buttonVariants({ variant: "outline" }),
                "border-primary text-primary hover:text-primary mt-6 h-11 rounded-lg px-8 text-base",
              )}
            >
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <ul>
              {items.map((item) => (
                <CartRow key={item.id} item={item} />
              ))}
            </ul>

            <hr className="border-light" />

            <Button
              onClick={clearCart}
              className="mt-8 h-auto cursor-pointer rounded-lg border-0 px-8 py-2.75 text-xs tracking-[1px]"
            >
              Clear All
            </Button>
          </>
        )}
      </div>

      <CartSummary totals={getCartTotals(items)} />
    </section>
  );
}
