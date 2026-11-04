import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import ProductBreadcrumb from "@/components/product/product-breadcrumb";
import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import ProductTabs from "@/components/product/product-tabs";
import ProductGrid from "@/components/shared/product-grid";
import { getProductById, getProductIds, getRelatedProducts } from "@/lib/product/get-product";

type Props = {
  params: Promise<{ id: string }>;
};

export function generateStaticParams() {
  return getProductIds().map((id) => ({ id: String(id) }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) return {};

  return {
    title: `${product.name} | Funiro`,
    description: product.shortDescription,
  };
}

export default async function ProductPage({ params }: Props) {
  const { id } = await params;
  const product = getProductById(Number(id));

  if (!product) notFound();

  const relatedProducts = getRelatedProducts(product);

  return (
    <>
      <ProductBreadcrumb name={product.name} />

      <section className="content-container my-8 grid gap-8 md:grid-cols-2 lg:my-12 lg:gap-16">
        <ProductGallery key={`gallery-${product.id}`} images={product.images} name={product.name} />
        <ProductInfo key={`info-${product.id}`} product={product} />
      </section>

      <ProductTabs product={product} />

      {relatedProducts.length > 0 && (
        <section className="content-container my-12 lg:my-18">
          <h2 className="text-ink text-heading text-center font-medium">Related Products</h2>

          <ProductGrid products={relatedProducts} />

          <Link
            href="/shop"
            className="border-primary text-primary active:bg-primary active:text-primary-foreground mx-auto mt-8 block w-[15.3rem] border px-[4.6rem] py-3 text-center font-semibold transition-colors duration-100"
          >
            Show More
          </Link>
        </section>
      )}
    </>
  );
}
