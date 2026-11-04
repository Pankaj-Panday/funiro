import type { CartItem } from "@/types/cart/cart.types";

const roundToPaise = (amount: number) => Math.round(amount * 100) / 100;

export function getCartTotals(items: CartItem[]) {
  const totalItems = items.reduce((total, item) => total + item.quantity, 0);
  const subtotal = items.reduce((total, item) => total + item.price * item.quantity, 0);
  const shipping = subtotal > 0 ? roundToPaise(Math.min(50 + subtotal * 0.01, 200)) : 0;

  return { totalItems, subtotal, shipping, total: roundToPaise(subtotal + shipping) };
}
