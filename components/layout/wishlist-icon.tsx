"use client";

import { Heart } from "lucide-react";

import { useWishlist } from "@/lib/wishlist/wishlist-store";

import CountBadge from "./count-badge";

export default function WishlistIcon() {
  const count = useWishlist((state) => state.ids.length);

  return (
    <span className="relative block">
      <Heart className="h-5 w-5" />
      <CountBadge count={count} />
    </span>
  );
}
