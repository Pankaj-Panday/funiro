import Image from "next/image";

import Rating from "@/components/shared/rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/product/product.types";

type Props = {
  product: Product;
};

const triggerClass =
  "text-lead flex-none cursor-pointer px-2 py-1 font-normal after:bg-primary data-active:font-medium";

export default function ProductTabs({ product }: Props) {
  const { name, category, stock, sizes, colors, images, rating, reviewCount } = product;

  return (
    <section className="border-border border-y py-8 lg:py-12">
      <Tabs defaultValue="description" className="content-container gap-8">
        <TabsList
          variant="line"
          className="w-full flex-wrap gap-x-2 gap-y-2 group-data-horizontal/tabs:h-auto sm:gap-x-6"
        >
          <TabsTrigger value="description" className={triggerClass}>
            Description
          </TabsTrigger>
          <TabsTrigger value="additional" className={triggerClass}>
            Additional Info
          </TabsTrigger>
          <TabsTrigger value="reviews" className={triggerClass}>
            Reviews [{reviewCount}]
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="text-base">
          <p className="text-light">{product.longDescription}</p>

          <div className="mt-8 grid gap-6 sm:grid-cols-2">
            {images.slice(1, 3).map((image) => (
              <div
                key={image.url}
                className="bg-cream relative aspect-4/3 overflow-hidden rounded-lg"
              >
                <Image
                  src={image.url}
                  alt={name}
                  fill
                  className="object-cover"
                  sizes="(min-width: 1024px) 41vw, (min-width: 640px) 46vw, 92vw"
                />
              </div>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="additional" className="text-base">
          <dl className="text-light mx-auto grid w-fit grid-cols-[auto_auto] items-center gap-x-10 gap-y-4">
            <dt>Category</dt>
            <dd className="text-dark">{category}</dd>

            <dt>Sizes</dt>
            <dd className="text-dark">{sizes.join(", ")}</dd>

            <dt>Colors</dt>
            <dd className="flex gap-2">
              {colors.map((color) => (
                <span
                  key={color}
                  style={{ backgroundColor: color }}
                  className="size-5 rounded-full"
                />
              ))}
            </dd>

            <dt>Units available</dt>
            <dd className="text-dark">{stock}</dd>
          </dl>
        </TabsContent>

        <TabsContent value="reviews" className="text-center text-base">
          {reviewCount > 0 ? (
            <>
              <p className="text-ink text-heading">{rating}</p>
              <div className="mt-2 flex justify-center">
                <Rating rating={rating} />
              </div>
              <p className="text-light mt-2">
                Based on {reviewCount} customer {reviewCount === 1 ? "review" : "reviews"}
              </p>
            </>
          ) : (
            <p className="text-light">No reviews yet.</p>
          )}
        </TabsContent>
      </Tabs>
    </section>
  );
}
