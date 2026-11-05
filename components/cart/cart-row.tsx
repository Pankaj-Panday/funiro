import { Minus, Plus, Trash2 } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import FormatPrice from "@/components/shared/format-price";
import { Button } from "@/components/ui/button";
import { useCart } from "@/lib/cart/cart-store";
import type { CartItem } from "@/types/cart/cart.types";

export const cartRowColumns = "sm:grid-cols-[repeat(4,1fr)_0.5fr]";

type Props = {
  item: CartItem;
};

export default function CartRow({ item }: Props) {
  const { id, productId, name, image, price, color, size, stock, quantity } = item;
  const updateQuantity = useCart((state) => state.updateQuantity);
  const removeItem = useCart((state) => state.removeItem);
  const productHref = `/product/${productId}`;

  return (
    <li
      className={`my-6 grid grid-cols-[1fr_auto] items-center gap-x-4 gap-y-3 sm:place-items-center sm:gap-0 ${cartRowColumns}`}
    >
      <div className="flex w-full items-start gap-3 sm:gap-[5%]">
        <Link
          href={productHref}
          className="bg-cream relative aspect-square w-20 shrink-0 overflow-hidden rounded-lg sm:w-[40%]"
        >
          <Image
            src={image}
            alt={name}
            fill
            className="object-cover"
            sizes="(min-width: 640px) 8vw, 80px"
          />
        </Link>

        <div className="min-w-0">
          <Link href={productHref} className="text-light hover:text-primary transition-colors">
            {name}
          </Link>

          <div className="mt-1 flex items-center gap-2">
            <span style={{ backgroundColor: color }} className="size-4 rounded-full" />
            <span className="bg-cream grid size-4 place-items-center rounded-[3px] text-xs">
              {size}
            </span>
          </div>

          <FormatPrice price={price} className="text-light mt-1 block sm:hidden" />
        </div>
      </div>

      <Button
        variant="ghost"
        size="icon"
        aria-label={`Remove ${name} from cart`}
        onClick={() => removeItem(id)}
        className="text-primary col-start-2 row-start-1 self-start justify-self-end sm:col-start-5 sm:self-center sm:justify-self-center"
      >
        <Trash2 className="size-5" />
      </Button>

      <FormatPrice
        price={price}
        className="text-light hidden sm:col-start-2 sm:row-start-1 sm:block"
      />

      <div className="flex items-center gap-1 sm:col-start-3 sm:row-start-1">
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Decrease quantity of ${name}`}
          disabled={quantity <= 1}
          onClick={() => updateQuantity(id, quantity - 1)}
        >
          <Minus className="size-4" />
        </Button>
        <span className="border-light min-w-8 rounded-[5px] border px-2 py-1 text-center">
          {quantity}
        </span>
        <Button
          variant="ghost"
          size="icon-xs"
          aria-label={`Increase quantity of ${name}`}
          disabled={quantity >= stock}
          onClick={() => updateQuantity(id, quantity + 1)}
        >
          <Plus className="size-4" />
        </Button>
      </div>

      <FormatPrice
        price={price * quantity}
        className="justify-self-end sm:col-start-4 sm:row-start-1 sm:justify-self-center"
      />
    </li>
  );
}
