import Link from "next/link";

import productsList from "@/data/productData";

import ProductGrid from "../shared/product-grid";

export default function ProductShowCase() {
  const featuredProducts = productsList.filter((product) => product.featured);

  return (
    <section className="mt-14">
      <div className="page-container">
        <h2 className="text-heading text-ink text-center font-bold">Our Products</h2>

        <ProductGrid products={featuredProducts} />

        <Link
          href="/shop"
          className="border-primary text-primary active:bg-primary active:text-primary-foreground mx-auto mt-8 block w-[15.3rem] border px-[4.6rem] py-3 text-center font-semibold transition-colors duration-100"
        >
          Show More
        </Link>
      </div>
    </section>
  );
}
