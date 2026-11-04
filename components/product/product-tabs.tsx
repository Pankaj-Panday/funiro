import Image from "next/image";

import Rating from "@/components/shared/rating";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { Product } from "@/types/product/product.types";

type Props = {
  product: Product;
};

// The hidden ::before reserves the medium-weight width, so switching tabs can't shift the row
const triggerClass =
  "text-subheading text-light data-active:text-dark inline-grid h-auto flex-none cursor-pointer justify-items-center rounded-none border-0 p-0 font-normal transition-colors group-data-[variant=line]/tabs-list:data-active:after:opacity-0 before:invisible before:h-0 before:overflow-hidden before:font-medium before:content-[attr(data-label)] data-active:font-medium";

export default function ProductTabs({ product }: Props) {
  const { name, category, stock, sizes, colors, images, rating, reviewCount } = product;

  return (
    <section className="border-border border-y py-8 sm:py-12">
      <Tabs defaultValue="description" className="content-container gap-9">
        <TabsList
          variant="line"
          className="w-full flex-col items-start gap-2.5 p-0 group-data-horizontal/tabs:h-auto sm:flex-row sm:justify-center sm:gap-12.5"
        >
          <TabsTrigger value="description" data-label="Description" className={triggerClass}>
            Description
          </TabsTrigger>
          <TabsTrigger
            value="additional"
            data-label="Additional Information"
            className={triggerClass}
          >
            Additional Information
          </TabsTrigger>
          <TabsTrigger
            value="reviews"
            data-label={`Reviews [${reviewCount}]`}
            className={triggerClass}
          >
            Reviews [{reviewCount}]
          </TabsTrigger>
        </TabsList>

        <TabsContent value="description" className="text-base">
          <p className="text-light">{product.longDescription}</p>

          <div className="mt-8.5 grid gap-8 sm:grid-cols-2 sm:gap-[4%]">
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
