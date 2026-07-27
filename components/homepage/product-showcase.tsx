import productsList from "@/data/productData";
import Link from "next/link";
import ProductCard from "../shared/product-card";

export default function ProductShowCase() {
  const featuredProducts = productsList.filter((product) => product.featured);

  return (
    <section className="mt-14">
      <div className="page-container">
        <h2 className="text-center text-[2.5rem] font-bold text-[#333333]">Our Products</h2>

        <ul className="mx-auto my-8 grid w-[70%] gap-8 sm:w-full sm:grid-cols-2 sm:gap-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-8">
          {featuredProducts?.map((product) => (
            <li key={product.id}>
              <ProductCard product={product} />
            </li>
          ))}
        </ul>

        <Link
          href="/shop"
          className="border-primary text-primary active:bg-primary mx-auto mt-8 block w-[15.3rem] border px-[4.6rem] py-3 text-center font-semibold transition-colors duration-100 active:text-white"
        >
          Show More
        </Link>
      </div>
    </section>
  );
}
