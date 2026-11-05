"use client";

import ProductGrid from "@/components/shared/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { useStoreReady } from "@/lib/list-store";
import { cn } from "@/lib/utils";
import { useWishlistIds } from "@/lib/wishlist/wishlist-store";
import type { Product } from "@/types/product/product.types";

type Props = {
  products: Product[];
};

export default function WishlistContents({ products }: Props) {
  const ids = useWishlistIds();
  const ready = useStoreReady();

  const wishlist = ids.flatMap((id) => products.find((product) => product.id === id) ?? []);

  // The saved list only exists in the browser, so stay hidden instead of flashing an empty state.
  return (
    <section className={cn("content-container mt-20 min-h-60", !ready && "invisible")}>
      {wishlist.length > 0 ? (
        <ProductGrid products={wishlist} />
      ) : (
        <div className="text-center">
          <p>Wishlist is empty</p>
          <ButtonLink href="/shop" variant="outline-primary" className="mt-6 h-11 px-8 text-base">
            Continue Shopping
          </ButtonLink>
        </div>
      )}
    </section>
  );
}
