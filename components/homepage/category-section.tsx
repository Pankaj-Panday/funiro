import Image from "next/image";
import Link from "next/link";

import { categories } from "@/constants/homepage/homepage";

export default function Categories() {
  return (
    <section className="mt-14">
      <div className="page-container">
        <h2 className="text-heading text-ink text-center font-semibold">Browse The Range</h2>

        <p className="text-ink-muted mt-2 text-center text-xl">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit.
        </p>

        <div className="mt-[3.8rem] flex flex-wrap justify-center gap-6">
          {categories.map((category) => (
            <div key={category.name} className="w-4/5 min-w-68 md:w-[30%]">
              <Link href="/shop" className="block overflow-hidden rounded-[10px]">
                <Image
                  src={category.img}
                  alt={category.name}
                  width={500}
                  height={650}
                  className="h-full w-full object-cover transition-transform duration-200 ease-out hover:scale-105"
                />
              </Link>

              <h3 className="text-subheading mt-3 text-center font-bold md:mt-7.5">
                <Link href="/shop" className="text-ink">
                  {category.name}
                </Link>
              </h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
