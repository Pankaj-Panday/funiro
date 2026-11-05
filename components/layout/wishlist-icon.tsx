"use client";

import { Heart } from "lucide-react";

import { useWishlistIds } from "@/lib/wishlist/wishlist-store";

import CountBadge from "./count-badge";

export default function WishlistIcon() {
  const ids = useWishlistIds();

  return (
    <span className="relative block">
      <Heart className="h-5 w-5" />
      <CountBadge count={ids.length} />
    </span>
  );
}
