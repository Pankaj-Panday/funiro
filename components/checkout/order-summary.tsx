import Link from "next/link";
import { type Control, Controller } from "react-hook-form";

import FormatPrice from "@/components/shared/format-price";
import { Button } from "@/components/ui/button";
import { Field, FieldLabel } from "@/components/ui/field";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { paymentMethods } from "@/constants/checkout/checkout.constants";
import type { getCartTotals } from "@/lib/cart/cart-totals";
import type { CheckoutValues } from "@/lib/checkout/checkout-schema";
import type { CartItem } from "@/types/cart/cart.types";

type Props = {
  control: Control<CheckoutValues>;
  items: CartItem[];
  totals: ReturnType<typeof getCartTotals>;
  submitting: boolean;
};

export default function OrderSummary({ control, items, totals, submitting }: Props) {
  return (
    // Stays in view beside the much taller billing form on wider screens.
    <div className="self-start sm:sticky sm:top-[calc(var(--spacing-header)+2rem)]">
      <h3 className="text-subheading mb-8 font-medium">Your Order</h3>

      <ul className="border-border mb-6 space-y-3 border-b pb-6">
        {items.map((item) => (
          <li key={item.id} className="flex justify-between gap-4">
            <span className="text-light">
              {item.name} <span className="text-dark">× {item.quantity}</span>
            </span>
            <FormatPrice price={item.price * item.quantity} className="font-light" />
          </li>
        ))}
      </ul>

      <dl className="space-y-4.75">
        <div className="flex items-center justify-between">
          <dt>Subtotal</dt>
          <dd className="font-light">
            <FormatPrice price={totals.subtotal} />
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Shipping</dt>
          <dd className="font-light">
            <FormatPrice price={totals.shipping} />
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Total</dt>
          <dd className="text-primary text-subheading font-bold">
            <FormatPrice price={totals.total} />
          </dd>
        </div>
      </dl>

      <hr className="border-light mt-8 mb-6" />

      <p className="mb-4 font-medium">Select a payment method</p>

      <Controller
        name="paymentMethod"
        control={control}
        render={({ field }) => (
          <RadioGroup
            name={field.name}
            value={field.value}
            onValueChange={field.onChange}
            className="gap-3"
          >
            {paymentMethods.map((method) => (
              <Field key={method.value} orientation="horizontal" className="gap-3">
                <RadioGroupItem
                  value={method.value}
                  id={`payment-${method.value}`}
                  className="border-light data-checked:border-primary data-checked:bg-primary cursor-pointer"
                />
                <FieldLabel
                  htmlFor={`payment-${method.value}`}
                  className="cursor-pointer text-base font-normal"
                >
                  {method.label}
                </FieldLabel>
              </Field>
            ))}
          </RadioGroup>
        )}
      />

      <p className="mt-6.5 mb-10 font-light">
        Your personal data will be used to support your experience throughout this website, to
        manage access to your account, and for other purposes described in our{" "}
        <Link href="/privacy" className="text-dark hover:text-primary font-semibold">
          privacy policy
        </Link>
        .
      </p>

      <Button
        type="submit"
        variant="outline"
        size="none"
        disabled={submitting}
        className="mx-auto flex w-[45%] min-w-56 rounded-[10px] px-12 py-4 text-xl font-normal"
      >
        Place order
      </Button>
    </div>
  );
}
