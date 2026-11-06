import type { Metadata } from "next";

import CheckoutContents from "@/components/checkout/checkout-contents";
import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";

export const metadata: Metadata = {
  title: "Checkout | Funiro",
};

export default function CheckoutPage() {
  return (
    <>
      <PageBanner title="Checkout" />
      <CheckoutContents />
      <FeaturesStrip />
    </>
  );
}
