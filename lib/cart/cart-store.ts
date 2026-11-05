import { create } from "zustand";
import { persist } from "zustand/middleware";

import { getEffectivePrice } from "@/lib/product-price";
import { syncAcrossTabs } from "@/lib/sync-across-tabs";
import type { CartItem } from "@/types/cart/cart.types";
import type { Product } from "@/types/product/product.types";

type CartState = {
  items: CartItem[];
  addItem: (product: Product, options: Pick<CartItem, "color" | "size" | "quantity">) => void;
  updateQuantity: (id: string, quantity: number) => void;
  removeItem: (id: string) => void;
  clear: () => void;
};

const clampQuantity = (quantity: number, stock: number) => Math.min(Math.max(quantity, 1), stock);

export const useCart = create<CartState>()(
  persist(
    (set) => ({
      items: [],

      addItem: (product, { color, size, quantity }) =>
        set((state) => {
          const id = `${product.id}-${color}-${size}`;
          const price = getEffectivePrice(product);

          if (state.items.some((item) => item.id === id)) {
            return {
              items: state.items.map((item) =>
                item.id === id
                  ? {
                      ...item,
                      price,
                      stock: product.stock,
                      quantity: clampQuantity(item.quantity + quantity, product.stock),
                    }
                  : item,
              ),
            };
          }

          const newItem = {
            id,
            productId: product.id,
            name: product.name,
            image: product.thumbnail,
            price,
            color,
            size,
            stock: product.stock,
            quantity: clampQuantity(quantity, product.stock),
          };

          return { items: [...state.items, newItem] };
        }),

      updateQuantity: (id, quantity) =>
        set((state) => ({
          items: state.items.map((item) =>
            item.id === id ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
          ),
        })),

      removeItem: (id) => set((state) => ({ items: state.items.filter((item) => item.id !== id) })),

      clear: () => set({ items: [] }),
    }),
    { name: "funiro-cart" },
  ),
);

syncAcrossTabs(useCart);
