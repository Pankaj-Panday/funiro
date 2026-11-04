import type { Metadata } from "next";
import { notFound } from "next/navigation";

import ProductBreadcrumb from "@/components/product/product-breadcrumb";
import ProductGallery from "@/components/product/product-gallery";
import ProductInfo from "@/components/product/product-info";
import ProductTabs from "@/components/product/product-tabs";
import ProductGrid from "@/components/shared/product-grid";
import ShowMoreLink from "@/components/shared/show-more-link";
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

      <section className="content-container mt-8 mb-16.5 grid gap-6 sm:grid-cols-2 sm:gap-x-[4%]">
        <ProductGallery key={`gallery-${product.id}`} images={product.images} name={product.name} />
        <ProductInfo key={`info-${product.id}`} product={product} />
      </section>

      <ProductTabs product={product} />

      {relatedProducts.length > 0 && (
        <section className="content-container my-8 sm:mt-18.5 sm:mb-14.5">
          <h2 className="text-heading text-dark mb-6 text-center font-medium">Related Products</h2>

          <ProductGrid products={relatedProducts} />

          <ShowMoreLink />
        </section>
      )}
    </>
  );
}
