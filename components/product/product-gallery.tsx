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
    <div className="flex flex-col-reverse gap-4 self-start md:flex-row md:justify-between">
      <div className="grid grid-cols-4 content-start gap-4 md:w-[17%] md:grid-cols-1">
        {images.map((image, index) => (
          <button
            key={image.url}
            type="button"
            aria-label={`Show image ${index + 1} of ${name}`}
            onClick={() => setActiveIndex(index)}
            className={cn(
              "relative aspect-square cursor-pointer overflow-hidden rounded-md",
              index === activeIndex && "outline-primary outline-2 outline-offset-2",
            )}
          >
            <Image
              src={image.url}
              alt=""
              fill
              className="object-cover"
              sizes="(min-width: 768px) 8vw, 22vw"
            />
          </button>
        ))}
      </div>

      <div className="bg-cream relative aspect-square w-full overflow-hidden rounded-xl md:w-[80%]">
        <Image
          src={images[activeIndex].url}
          alt={name}
          fill
          preload
          className="object-cover"
          sizes="(min-width: 1024px) 32vw, (min-width: 768px) 36vw, (min-width: 640px) 44vw, 92vw"
        />
      </div>
    </div>
  );
}
