"use client";

import * as React from "react";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

import { Carousel, CarouselApi, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { ExploreSlide } from "@/types/homepage/homepage.types";

interface ExploreCarouselProps {
  slides: ExploreSlide[];
}

export default function ExploreCarousel({ slides }: ExploreCarouselProps) {
  const [api, setApi] = React.useState<CarouselApi>();
  const [current, setCurrent] = React.useState(0);

  React.useEffect(() => {
    if (!api) return;

    const onSelect = () => {
      setCurrent(api.selectedScrollSnap());
    };

    onSelect();

    api.on("select", onSelect);

    return () => {
      api.off("select", onSelect);
    };
  }, [api]);

  return (
    <div className="flex h-full flex-col">
      <Carousel
        setApi={setApi}
        opts={{
          loop: true,
          align: "start",
        }}
        className="flex-1"
      >
        <CarouselContent>
          {slides.map((slide) => (
            <CarouselItem key={slide.id}>
              <div className="relative h-[34rem] w-full overflow-hidden">
                <Image src={slide.image} alt="" fill className="object-cover" priority />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>

        <button
          onClick={() => api?.scrollNext()}
          className="absolute top-1/2 right-4 z-20 flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full bg-white shadow-lg transition hover:scale-105 active:scale-95"
        >
          <ChevronRight className="text-primary h-5 w-5" />
        </button>
      </Carousel>

      <div className="mt-10 flex items-center gap-5 pl-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => api?.scrollTo(index)}
            className={`h-[11px] w-[11px] rounded-full transition-all ${
              current === index ? "bg-primary ring-primary ring-1 ring-offset-8" : "bg-neutral-300"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
