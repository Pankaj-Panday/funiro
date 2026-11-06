"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import FormatPrice from "@/components/shared/format-price";
import { ButtonLink } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { useCart } from "@/lib/cart/cart-store";
import { getCartTotals } from "@/lib/cart/cart-totals";
import { checkoutSchema, type CheckoutValues } from "@/lib/checkout/checkout-schema";
import { cn } from "@/lib/utils";

import BillingFields from "./billing-fields";
import OrderSummary from "./order-summary";

type PlacedOrder = {
  name: string;
  email: string;
  total: number;
};

const defaultValues: CheckoutValues = {
  fullName: "",
  mobile: "",
  email: "",
  building: "",
  area: "",
  landmark: "",
  pincode: "",
  city: "",
  state: "",
  paymentMethod: "card",
};

export default function CheckoutContents() {
  const hydrated = useHydrated();
  const items = useCart((state) => state.items);
  const clearCart = useCart((state) => state.clear);
  const [placedOrder, setPlacedOrder] = useState<PlacedOrder | null>(null);

  const form = useForm<CheckoutValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues,
    mode: "onTouched",
  });

  const totals = getCartTotals(items);

  // Phase 2 sends this to the server, which recalculates prices and takes payment.
  function onSubmit(values: CheckoutValues) {
    setPlacedOrder({ name: values.fullName, email: values.email, total: totals.total });
    clearCart();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (placedOrder) {
    return (
      <section className="content-container mt-16 text-center">
        <h2 className="text-heading font-semibold">Thank you, {placedOrder.name}!</h2>
        <p className="text-light mx-auto mt-4 max-w-xl">
          Your order of <FormatPrice price={placedOrder.total} className="text-dark font-medium" />{" "}
          has been placed. We&apos;ll send the details to{" "}
          <span className="text-dark">{placedOrder.email}</span>.
        </p>
        <ButtonLink href="/shop" variant="outline-primary" className="mt-8 h-11 px-8 text-base">
          Continue Shopping
        </ButtonLink>
      </section>
    );
  }

  return (
    <section className={cn("content-container mt-16 min-h-90", !hydrated && "invisible")}>
      {items.length === 0 ? (
        <div className="pt-12 text-center">
          <p>Your cart is empty, so there&apos;s nothing to check out yet.</p>
          <ButtonLink href="/shop" variant="outline-primary" className="mt-6 h-11 px-8 text-base">
            Continue Shopping
          </ButtonLink>
        </div>
      ) : (
        <>
          <h2 className="text-heading mb-9 font-semibold">Billing Details</h2>

          <form
            onSubmit={form.handleSubmit(onSubmit)}
            noValidate
            className="grid gap-12 sm:grid-cols-2 sm:gap-7"
          >
            <BillingFields control={form.control} />
            <OrderSummary
              control={form.control}
              items={items}
              totals={totals}
              submitting={form.formState.isSubmitting}
            />
          </form>
        </>
      )}
    </section>
  );
}
