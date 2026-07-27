import FormatPrice from "@/components/shared/format-price";
import Image from "next/image";
import Link from "next/link";

type Props = {
  product: any;
};

export default function ProductCard({ product }: Props) {
  const { id, name, category, price, rating, discountPercent, isNew, isWishlisted, thumbnail } =
    product;

  const effectivePrice = discountPercent
    ? Math.round((price * (100 - discountPercent)) / 100)
    : price;

  return (
    <div className="h-full w-full min-w-60">
      <div className="relative h-75 w-full overflow-hidden sm:h-60">
        <Image
          src={thumbnail}
          alt={name}
          fill
          className="object-cover"
          sizes="(min-width: 1280px) 25vw, (min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
        />

        {discountPercent > 0 && (
          <span className="absolute top-2 right-2 grid size-12 place-items-center rounded-full bg-[#E97171] text-sm font-medium text-white">
            -{discountPercent}%
          </span>
        )}

        {isNew && (
          <span className="absolute top-16 right-2 grid size-12 place-items-center rounded-full bg-[#2EC1AC] text-sm font-medium text-white">
            New
          </span>
        )}
      </div>

      <div className="bg-[#F4F5F7] p-4 pb-7.5">
        <h4>
          <Link
            href={`/product/${id}`}
            className="mb-2 block text-2xl leading-[1.2] font-semibold text-[#3A3A3A] sm:text-[1.3rem]"
          >
            {name.toUpperCase()}
          </Link>
        </h4>

        <div className="mb-2 flex items-center justify-between text-base font-medium text-[#898989]">
          <span>{category}</span>

          <span className="text-sm font-normal text-black/70">
            {rating > 0 ? `(${rating})` : "No rating"}
          </span>
        </div>

        <div className="flex items-center justify-between">
          <FormatPrice price={effectivePrice} className="text-xl font-semibold text-[#3A3A3A]" />

          {discountPercent > 0 && (
            <s>
              <FormatPrice price={price} className="text-base font-normal text-[#B0B0B0]" />
            </s>
          )}
        </div>
      </div>
    </div>
  );
}
