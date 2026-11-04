import type { Product } from "@/types/product/product.types";

import ProductCard from "./product-card";

type Props = {
  products: Product[];
};

export default function ProductGrid({ products }: Props) {
  return (
    <ul className="mx-auto my-8 grid w-[70%] gap-8 sm:w-full sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
      {products.map((product) => (
        <li key={product.id}>
          <ProductCard product={product} />
        </li>
      ))}
    </ul>
  );
}
