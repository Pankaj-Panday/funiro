import Image from "next/image";
import Link from "next/link";

import FormatPrice from "@/components/shared/format-price";
import type { Product } from "@/types/product/product.types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { id, name, category, price, rating, discountPercent, isNew, thumbnail } = product;

  const effectivePrice = discountPercent
    ? Math.round((price * (100 - discountPercent)) / 100)
    : price;

  return (
    <div className="h-full w-full min-w-60">
      <div className="relative h-75 w-full overflow-hidden sm:h-60">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {discountPercent > 0 && (
          <span className="bg-badge-sale text-primary-foreground absolute top-2 right-2 grid size-12 place-items-center rounded-full text-sm font-medium">
            -{discountPercent}%
          </span>
        )}

        {isNew && (
          <span className="bg-badge-new text-primary-foreground absolute top-16 right-2 grid size-12 place-items-center rounded-full text-sm font-medium">
            New
          </span>
        )}
      </div>

      <div className="bg-surface p-4 pb-7.5">
        <h4>
          <Link
            href={`/product/${id}`}
            className="text-ink mb-2 block text-xl leading-[1.2] font-semibold"
          >
            {name.toUpperCase()}
          </Link>
        </h4>

        <div className="text-muted-foreground mb-2 flex items-center justify-between text-base font-medium">
          <span>{category}</span>

          <span className="text-dark/70 text-sm font-normal">
            {rating > 0 ? `(${rating})` : "No rating"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <FormatPrice price={effectivePrice} className="text-ink text-xl font-semibold" />

          {discountPercent > 0 && (
            <s>
              <FormatPrice price={price} className="text-light text-base font-normal" />
            </s>
          )}
        </div>
      </div>
    </div>
  );
}
