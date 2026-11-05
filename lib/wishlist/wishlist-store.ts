import { create } from "zustand";
import { persist } from "zustand/middleware";

import { syncAcrossTabs } from "@/lib/sync-across-tabs";

type WishlistState = {
  ids: number[];
  toggle: (productId: number) => void;
};

export const useWishlist = create<WishlistState>()(
  persist(
    (set) => ({
      ids: [],

      toggle: (productId) =>
        set((state) => ({
          ids: state.ids.includes(productId)
            ? state.ids.filter((id) => id !== productId)
            : [...state.ids, productId],
        })),
    }),
    { name: "funiro-wishlist" },
  ),
);

syncAcrossTabs(useWishlist);
