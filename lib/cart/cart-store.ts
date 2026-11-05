import { createListStore } from "@/lib/list-store";
import { getEffectivePrice } from "@/lib/product-price";
import type { CartItem } from "@/types/cart/cart.types";
import type { Product } from "@/types/product/product.types";

const store = createListStore<CartItem>("funiro-cart");

export const useCartItems = store.useItems;

const clampQuantity = (quantity: number, stock: number) => Math.min(Math.max(quantity, 1), stock);

export function addToCart(
  product: Product,
  { color, size, quantity }: Pick<CartItem, "color" | "size" | "quantity">,
) {
  const id = `${product.id}-${color}-${size}`;
  const current = store.get();

  if (current.some((item) => item.id === id)) {
    store.set(
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              price: getEffectivePrice(product),
              stock: product.stock,
              quantity: clampQuantity(item.quantity + quantity, product.stock),
            }
          : item,
      ),
    );
    return;
  }

  store.set([
    ...current,
    {
      id,
      productId: product.id,
      name: product.name,
      image: product.thumbnail,
      price: getEffectivePrice(product),
      color,
      size,
      stock: product.stock,
      quantity: clampQuantity(quantity, product.stock),
    },
  ]);
}

export function updateCartQuantity(id: string, quantity: number) {
  store.set(
    store
      .get()
      .map((item) =>
        item.id === id ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
      ),
  );
}

export function removeFromCart(id: string) {
  store.set(store.get().filter((item) => item.id !== id));
}

export function clearCart() {
  store.set([]);
}
