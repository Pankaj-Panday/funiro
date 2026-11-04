"use client";

import Image from "next/image";
import { useState } from "react";

import { cn } from "@/lib/utils";
import type { ProductImage } from "@/types/product/product.types";

type Props = {
  images: ProductImage[];
  name: string;
};

export default function ProductGallery({ images, name }: Props) {
  const [activeIndex, setActiveIndex] = useState(0);

  return (
    <div className="flex flex-col-reverse gap-4 self-start lg:flex-row lg:items-start">
      {/* Width solves for four thumbnails plus gaps matching the main image's height */}
      <div className="grid grid-cols-4 gap-4 lg:w-[calc((100%-4rem)/5)] lg:grid-cols-1">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            aria-label={`Show image ${index + 1} of ${name}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square cursor-pointer overflow-hidden rounded-lg opacity-70 transition-opacity hover:opacity-100",
              index === activeIndex && "outline-primary opacity-100 outline-2 outline-offset-2",
            )}
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 8vw, 22vw"
            />
          </button>
        ))}
      </div>

      <div className="bg-cream relative aspect-square w-full overflow-hidden rounded-xl lg:flex-1">
        <Image
          src={images[activeIndex].url}
          alt={name}
          fill
          preload
          className="object-cover"
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 46vw, 92vw"
        />
      </div>
    </div>
  );
}
