import type { Metadata } from "next";

import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";
import WishlistContents from "@/components/wishlist/wishlist-contents";
import { getAllProducts } from "@/lib/product/get-product";

export const metadata: Metadata = {
  title: "Wishlist | Funiro",
};

export default function WishlistPage() {
  return (
    <>
      <PageBanner title="Wishlist" />
      <WishlistContents products={getAllProducts()} />
      <FeaturesStrip />
    </>
  );
}
