import Image from "next/image";
import Link from "next/link";

import FormatPrice from "@/components/shared/format-price";
import WishlistButton from "@/components/wishlist/wishlist-button";
import { getEffectivePrice } from "@/lib/product-price";
import type { Product } from "@/types/product/product.types";

type Props = {
  products: Product[];
};

const badgeClass =
  "text-primary-foreground rounded-[5px] p-1 text-sm sm:grid sm:size-10 sm:place-items-center sm:rounded-full sm:p-0";

export default function ProductList({ products }: Props) {
  return (
    <ul className="mx-auto my-8 max-w-208 space-y-4">
      {products.map((product) => (
        <li key={product.id} className="bg-surface relative flex gap-4 p-2">
          <figure className="bg-background border-border relative aspect-[1/1.1] w-[30%] max-w-50 min-w-32 shrink-0 rounded-[3px] border">
            <Image
              src={product.thumbnail}
              alt={product.name}
              fill
              sizes="(min-width: 640px) 200px, 128px"
              className="rounded-[3px] object-cover p-1"
            />
          </figure>

          <div className="min-w-0">
            <h3 className="mb-2">
              <Link
                href={`/product/${product.id}`}
                className="text-ink text-subheading leading-tight font-semibold"
              >
                {product.name.toUpperCase()}
              </Link>
            </h3>

            <p className="text-muted-foreground mb-2 font-medium">{product.category}</p>

            <p className="text-dark/70 mb-2 text-sm">
              {product.rating > 0 ? `(${product.rating})` : "No rating"}
            </p>

            <div className="flex flex-col gap-1">
              {product.discountPercent > 0 && (
                <s>
                  <FormatPrice price={product.price} className="text-light" />
                </s>
              )}
              <FormatPrice
                price={getEffectivePrice(product)}
                className="text-ink text-xl font-semibold"
              />
            </div>
          </div>

          <WishlistButton
            productId={product.id}
            name={product.name}
            className="absolute right-3 bottom-3"
          />

          <div className="absolute top-4 left-4 flex gap-1 sm:top-3 sm:right-3 sm:left-auto">
            {product.discountPercent > 0 && (
              <span className={`bg-badge-sale ${badgeClass}`}>-{product.discountPercent}%</span>
            )}
            {product.isNew && <span className={`bg-badge-new ${badgeClass}`}>New</span>}
          </div>
        </li>
      ))}
    </ul>
  );
}
