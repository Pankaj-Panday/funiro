"use client";

import { Heart } from "lucide-react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useWishlist } from "@/lib/wishlist/wishlist-store";

type Props = {
  productId: number;
  name: string;
  className?: string;
};

export default function WishlistButton({ productId, name, className }: Props) {
  const wishlisted = useWishlist((state) => state.ids.includes(productId));
  const toggle = useWishlist((state) => state.toggle);

  // The solid backing keeps the button readable over any product photo.
  return (
    <span className={cn("bg-background z-10 rounded-full", className)}>
      <Button
        variant="ghost"
        size="icon"
        aria-label={`${wishlisted ? "Remove" : "Add"} ${name} ${wishlisted ? "from" : "to"} wishlist`}
        aria-pressed={wishlisted}
        onClick={() => toggle(productId)}
        className="rounded-full"
      >
        <Heart className={cn("size-4.5", wishlisted && "fill-primary text-primary")} />
      </Button>
    </span>
  );
}
