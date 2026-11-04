import FormatPrice from "@/components/shared/format-price";
import Rating from "@/components/shared/rating";
import { getEffectivePrice } from "@/lib/product-price";
import type { Product } from "@/types/product/product.types";

import CopyLinkButton from "./copy-link-button";
import ProductPurchase from "./product-purchase";

type Props = {
  product: Product;
};

export default function ProductInfo({ product }: Props) {
  const { name, price, discountPercent, rating, reviewCount, shortDescription } = product;
  const { category, tags, stock, sizes, colors } = product;

  return (
    <div>
      <h1 className="text-ink text-heading">{name}</h1>

      <p className="mt-2 flex items-baseline gap-3">
        <FormatPrice price={getEffectivePrice(product)} className="text-subheading font-medium" />
        {discountPercent > 0 && (
          <s>
            <FormatPrice price={price} className="text-light text-lead" />
          </s>
        )}
      </p>

      <div className="mt-3 flex items-center gap-4">
        <Rating rating={rating} />
        <span className="border-light text-light border-l pl-4 text-sm">
          {reviewCount > 0
            ? `${reviewCount} customer ${reviewCount === 1 ? "review" : "reviews"}`
            : "No reviews yet"}
        </span>
      </div>

      <p className="mt-4 lg:w-[85%]">{shortDescription}</p>

      <ProductPurchase sizes={sizes} colors={colors} stock={stock} />

      <hr className="border-border my-8" />

      <dl className="text-light grid grid-cols-[auto_1fr] items-center gap-x-6 gap-y-3 text-base">
        <dt>Stock</dt>
        <dd className={stock > 0 ? undefined : "text-destructive font-medium"}>
          {stock > 0 ? "In Stock" : "Out of Stock"}
        </dd>

        <dt>Category</dt>
        <dd>{category}</dd>

        <dt>Tags</dt>
        <dd className="capitalize">{tags.join(", ")}</dd>

        <dt>Share</dt>
        <dd>
          <CopyLinkButton />
        </dd>
      </dl>
    </div>
  );
}
