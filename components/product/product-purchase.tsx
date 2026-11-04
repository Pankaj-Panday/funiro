"use client";

import { Heart, Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  sizes: string[];
  colors: string[];
  stock: number;
};

const actionClass = "border-dark h-12 rounded-2xl text-base";

export default function ProductPurchase({ sizes, colors, stock }: Props) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const outOfStock = stock < 1;

  return (
    <div className="mt-6">
      <p className="text-light mb-3 text-sm">Size</p>
      <div className="flex gap-3">
        {sizes.map((size) => (
          <Button
            key={size}
            variant={size === selectedSize ? "default" : "ghost"}
            size="icon"
            onClick={() => setSelectedSize(size)}
            className={cn("cursor-pointer", size !== selectedSize && "bg-cream")}
          >
            {size}
          </Button>
        ))}
      </div>

      <p className="text-light mt-5 mb-3 text-sm">Color</p>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Select color ${color}`}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={cn(
              "size-7.5 cursor-pointer rounded-full opacity-50 transition-opacity",
              color === selectedColor && "outline-primary opacity-100 outline-2 outline-offset-2",
            )}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-3">
        <div className="border-dark flex h-12 items-center rounded-2xl border px-1">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Decrease quantity"
            disabled={outOfStock || quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className="cursor-pointer"
          >
            <Minus />
          </Button>
          <span className="min-w-8 text-center text-base">{quantity}</span>
          <Button
            variant="ghost"
            size="icon"
            aria-label="Increase quantity"
            disabled={outOfStock || quantity >= stock}
            onClick={() => setQuantity(quantity + 1)}
            className="cursor-pointer"
          >
            <Plus />
          </Button>
        </div>

        <Button
          variant="outline"
          disabled={outOfStock}
          className={cn(actionClass, "flex-1 cursor-pointer px-6 sm:flex-none")}
        >
          Add to Cart
        </Button>

        <Button variant="outline" className={cn(actionClass, "cursor-pointer px-6")}>
          <Heart />
          Wishlist
        </Button>
      </div>
    </div>
  );
}
