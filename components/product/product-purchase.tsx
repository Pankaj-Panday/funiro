"use client";

import { Minus, Plus } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Props = {
  sizes: string[];
  colors: string[];
  stock: number;
};

const actionHeight = "h-11 sm:h-13 lg:h-16";
const actionClass = `border-dark cursor-pointer rounded-[1rem] bg-transparent px-6 text-xl font-normal sm:px-8 ${actionHeight}`;
const stepperClass = "h-full w-6 cursor-pointer rounded-none px-0 sm:w-8";

export default function ProductPurchase({ sizes, colors, stock }: Props) {
  const [selectedSize, setSelectedSize] = useState(sizes[0]);
  const [selectedColor, setSelectedColor] = useState(colors[0]);
  const [quantity, setQuantity] = useState(1);

  const outOfStock = stock < 1;

  return (
    <div>
      <p className="text-light mt-6 mb-3.5 text-sm">Size</p>
      <div className="flex gap-4">
        {sizes.map((size) => (
          <button
            key={size}
            type="button"
            onClick={() => setSelectedSize(size)}
            className={cn(
              "size-7.5 cursor-pointer rounded-[5px] text-sm",
              size === selectedSize
                ? "bg-primary text-primary-foreground"
                : "bg-cream hover:bg-primary/15",
            )}
          >
            {size}
          </button>
        ))}
      </div>

      <p className="text-light mt-4.5 mb-3.5 text-sm">Color</p>
      <div className="flex gap-4">
        {colors.map((color) => (
          <button
            key={color}
            type="button"
            aria-label={`Select color ${color}`}
            onClick={() => setSelectedColor(color)}
            style={{ backgroundColor: color }}
            className={cn(
              "size-7.5 cursor-pointer rounded-full opacity-50",
              color === selectedColor && "outline-primary opacity-100 outline-2 outline-offset-2",
            )}
          />
        ))}
      </div>

      <div className="mt-8 flex flex-wrap gap-1.5 lg:gap-5">
        <div
          className={cn(
            "border-dark flex items-center overflow-hidden rounded-[1rem] border",
            actionHeight,
          )}
        >
          <Button
            variant="ghost"
            aria-label="Decrease quantity"
            disabled={outOfStock || quantity <= 1}
            onClick={() => setQuantity(quantity - 1)}
            className={stepperClass}
          >
            <Minus />
          </Button>
          <span className="min-w-8 text-center text-xl">{quantity}</span>
          <Button
            variant="ghost"
            aria-label="Increase quantity"
            disabled={outOfStock || quantity >= stock}
            onClick={() => setQuantity(quantity + 1)}
            className={stepperClass}
          >
            <Plus />
          </Button>
        </div>

        <Button variant="outline" disabled={outOfStock} className={actionClass}>
          Add To Cart
        </Button>

        <Button variant="outline" className={cn(actionClass, "min-w-42")}>
          Wishlist
        </Button>
      </div>
    </div>
  );
}
