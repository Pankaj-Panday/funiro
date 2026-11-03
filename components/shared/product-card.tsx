import Image from "next/image";
import Link from "next/link";

import FormatPrice from "@/components/shared/format-price";
import type { Product } from "@/types/product/product.types";

type Props = {
  product: Product;
};

export default function ProductCard({ product }: Props) {
  const { id, name, category, price, rating, discountPercent, isNew, thumbnail } =
    product;

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
          <span className="absolute top-2 right-2 grid size-12 place-items-center rounded-full bg-badge-sale text-sm font-medium text-primary-foreground">
            -{discountPercent}%
          </span>
        )}

        {isNew && (
          <span className="absolute top-16 right-2 grid size-12 place-items-center rounded-full bg-badge-new text-sm font-medium text-primary-foreground">
            New
          </span>
        )}
      </div>

      <div className="bg-surface p-4 pb-7.5">
        <h4>
          <Link
            href={`/product/${id}`}
            className="mb-2 block text-xl leading-[1.2] font-semibold text-ink"
          >
            {name.toUpperCase()}
          </Link>
        </h4>

        <div className="mb-2 flex items-center justify-between text-base font-medium text-muted-foreground">
          <span>{category}</span>

          <span className="text-sm font-normal text-dark/70">
            {rating > 0 ? `(${rating})` : "No rating"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <FormatPrice price={effectivePrice} className="text-xl font-semibold text-ink" />

          {discountPercent > 0 && (
            <s>
              <FormatPrice price={price} className="text-base font-normal text-light" />
            </s>
          )}
        </div>
      </div>
    </div>
  );
}
