import type { Metadata } from "next";

import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";
import ProductGrid from "@/components/shared/product-grid";
import ProductList from "@/components/shop/product-list";
import ShopControls from "@/components/shop/shop-controls";
import { getShopFilterOptions, getShopProducts } from "@/lib/shop/get-shop-products";
import { parseShopFilters, type RawSearchParams } from "@/lib/shop/shop-filters";

export const metadata: Metadata = {
  title: "Shop | Funiro",
};

type Props = {
  searchParams: Promise<RawSearchParams>;
};

export default async function ShopPage({ searchParams }: Props) {
  const options = getShopFilterOptions();
  const filters = parseShopFilters(await searchParams, options);
  const products = getShopProducts(filters);
  const visibleProducts = products.slice(0, filters.show);

  return (
    <>
      <PageBanner title="Shop" />

      <ShopControls
        filters={filters}
        options={options}
        shown={visibleProducts.length}
        total={products.length}
      />

      <div className="content-container">
        {products.length === 0 ? (
          <p className="my-20 text-center">No Products Found. Try changing the filters.</p>
        ) : filters.view === "grid" ? (
          <ProductGrid products={visibleProducts} />
        ) : (
          <ProductList products={visibleProducts} />
        )}
      </div>

      <FeaturesStrip />
    </>
  );
}
