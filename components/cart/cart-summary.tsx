import FormatPrice from "@/components/shared/format-price";
import { ButtonLink } from "@/components/ui/button";
import type { getCartTotals } from "@/lib/cart/cart-totals";

type Props = {
  totals: ReturnType<typeof getCartTotals>;
};

export default function CartSummary({ totals }: Props) {
  const { totalItems, subtotal, shipping, total } = totals;

  return (
    <aside className="bg-cream w-full self-start pb-12 sm:w-1/2 xl:w-full">
      <h2 className="text-heading mt-4 mb-11 text-center font-semibold">Cart Total</h2>

      <dl className="mx-auto w-[85%] space-y-4 font-medium">
        <div className="flex justify-between">
          <dt>Subtotal:</dt>
          <dd className="font-normal">
            <FormatPrice price={subtotal} />
          </dd>
        </div>
        <div className="flex justify-between">
          <dt>Shipping:</dt>
          <dd className="font-normal">
            <FormatPrice price={shipping} />
          </dd>
        </div>
        <div className="flex items-center justify-between">
          <dt>Total:</dt>
          <dd className="text-primary text-xl">
            <FormatPrice price={total} />
          </dd>
        </div>
      </dl>

      {totalItems > 0 && (
        <ButtonLink
          href="/checkout"
          variant="outline"
          size="none"
          className="mx-auto mt-12 flex w-4/5 rounded-[1rem] py-3.5 text-xl font-normal"
        >
          Check out
        </ButtonLink>
      )}
    </aside>
  );
}
