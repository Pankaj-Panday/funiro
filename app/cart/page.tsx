import type { Metadata } from "next";

import CartContents from "@/components/cart/cart-contents";
import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";

export const metadata: Metadata = {
  title: "Cart | Funiro",
};

export default function CartPage() {
  return (
    <>
      <PageBanner title="Cart" />
      <CartContents />
      <FeaturesStrip />
    </>
  );
}
