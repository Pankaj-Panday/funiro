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
  const { category, tags, stock } = product;

  const details = [
    {
      label: "Stock",
      value:
        stock > 0 ? "In Stock" : <span className="text-destructive font-medium">Out of Stock</span>,
    },
    { label: "Category", value: category },
    { label: "Tags", value: tags.join(", ") },
    { label: "Share", value: <CopyLinkButton /> },
  ];

  return (
    <div>
      <h1 className="text-heading text-dark leading-normal">{name}</h1>

      <p className="mb-2.5 flex items-baseline gap-2.5">
        <FormatPrice price={getEffectivePrice(product)} className="text-subheading font-medium" />
        {discountPercent > 0 && (
          <s>
            <FormatPrice price={price} className="text-light text-lead" />
          </s>
        )}
      </p>

      <div className="flex items-center gap-8">
        <Rating rating={rating} />
        <span className="border-light text-light border-l-2 py-1 pl-8 text-sm">
          {reviewCount > 0
            ? `${reviewCount} customer ${reviewCount === 1 ? "review" : "reviews"}`
            : "No reviews yet"}
        </span>
      </div>

      <p className="mt-4.5 lg:w-[70%]">{shortDescription}</p>

      <ProductPurchase product={product} />

      <hr className="border-border my-8 sm:mt-15 sm:mb-10 lg:mt-20" />

      <table className="text-light text-base capitalize">
        <tbody>
          {details.map(({ label, value }) => (
            <tr key={label} className="h-8">
              <td>{label}</td>
              <td className="pr-2 pl-8">:</td>
              <td>{value}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
