import { useSyncExternalStore } from "react";

import { getEffectivePrice } from "@/lib/product-price";
import type { CartItem } from "@/types/cart/cart.types";
import type { Product } from "@/types/product/product.types";

const STORAGE_KEY = "funiro-cart";
const EMPTY_CART: CartItem[] = [];

const listeners = new Set<() => void>();
let items: CartItem[] | null = null;

function readStorage() {
  try {
    const parsed = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    return Array.isArray(parsed) ? (parsed as CartItem[]) : EMPTY_CART;
  } catch {
    return EMPTY_CART;
  }
}

function getItems() {
  items ??= readStorage();
  return items;
}

function setItems(nextItems: CartItem[]) {
  items = nextItems;

  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(nextItems));
  } catch {
    // Storage can be full or blocked; the cart still works until the page reloads.
  }

  listeners.forEach((listener) => listener());
}

function subscribe(listener: () => void) {
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
  };
}

// Keeps other open tabs from overwriting the cart with an old copy.
if (typeof window !== "undefined") {
  window.addEventListener("storage", (event) => {
    // The key is null when another tab calls localStorage.clear().
    if (event.key !== STORAGE_KEY && event.key !== null) return;

    items = readStorage();
    listeners.forEach((listener) => listener());
  });
}

export function useCartItems() {
  return useSyncExternalStore(subscribe, getItems, () => EMPTY_CART);
}

export function useCartReady() {
  return useSyncExternalStore(
    subscribe,
    () => true,
    () => false,
  );
}

const clampQuantity = (quantity: number, stock: number) => Math.min(Math.max(quantity, 1), stock);

export function addToCart(
  product: Product,
  { color, size, quantity }: Pick<CartItem, "color" | "size" | "quantity">,
) {
  const id = `${product.id}-${color}-${size}`;
  const current = getItems();

  if (current.some((item) => item.id === id)) {
    setItems(
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

  setItems([
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
  setItems(
    getItems().map((item) =>
      item.id === id ? { ...item, quantity: clampQuantity(quantity, item.stock) } : item,
    ),
  );
}

export function removeFromCart(id: string) {
  setItems(getItems().filter((item) => item.id !== id));
}

export function clearCart() {
  setItems([]);
}
