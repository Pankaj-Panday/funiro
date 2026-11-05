"use client";

import ProductGrid from "@/components/shared/product-grid";
import { ButtonLink } from "@/components/ui/button";
import { useHydrated } from "@/hooks/use-hydrated";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist/wishlist-store";
import type { Product } from "@/types/product/product.types";

type Props = {
  products: Product[];
};

export default function WishlistContents({ products }: Props) {
  const ids = useWishlist((state) => state.ids);
  const hydrated = useHydrated();

  const wishlist = ids.flatMap((id) => products.find((product) => product.id === id) ?? []);

  // The saved list only exists in the browser, so stay hidden instead of flashing an empty state.
  return (
    <section className={cn("content-container mt-20 min-h-60", !hydrated && "invisible")}>
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
