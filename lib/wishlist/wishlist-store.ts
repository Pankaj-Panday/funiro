import { createListStore } from "@/lib/list-store";

const store = createListStore<number>("funiro-wishlist");

export const useWishlistIds = store.useItems;

export function toggleWishlist(productId: number) {
  const ids = store.get();

  store.set(ids.includes(productId) ? ids.filter((id) => id !== productId) : [...ids, productId]);
}
