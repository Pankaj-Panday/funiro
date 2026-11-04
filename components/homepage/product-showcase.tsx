import ShowMoreLink from "@/components/shared/show-more-link";
import productsList from "@/data/productData";

import ProductGrid from "../shared/product-grid";

export default function ProductShowCase() {
  const featuredProducts = productsList.filter((product) => product.featured);

  return (
    <section className="mt-14">
      <div className="page-container">
        <h2 className="text-heading text-ink text-center font-bold">Our Products</h2>

        <ProductGrid products={featuredProducts} />

        <ShowMoreLink />
      </div>
    </section>
  );
}
