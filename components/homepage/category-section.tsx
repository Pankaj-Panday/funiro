import { categories } from "@/constants/homepage/homepage";
import Image from "next/image";
import Link from "next/link";

export default function Categories() {
  return (
    <section className="mt-14">
      <div className="page-container">
        <h2 className="text-center text-[2rem] font-semibold text-[#333333]">Browse The Range</h2>

        <p className="mt-2 text-center text-xl text-[#666666]">
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

              <h3 className="mt-3 text-center text-2xl font-bold md:mt-7.5">
                <Link href="/shop" className="text-[#333333]">
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
