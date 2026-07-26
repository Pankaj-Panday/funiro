import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="h-[calc(100vh-var(--header-height))] max-h-180 min-h-100 bg-[url('/assets/homepage/heroSectionbg.jpg')] bg-cover bg-bottom bg-no-repeat">
      <div className="page-container flex h-full items-center justify-end">
        <div className="w-full rounded-[10px] bg-[#FFF3E3] px-10 pt-[3.8rem] pb-[2.4rem] lg:w-1/2">
          <p className="text-[0.875rem] font-semibold tracking-[3px] text-[#333333] uppercase">
            New Arrival
          </p>

          <h1 className="text-primary mt-1 mb-4 text-[3.25rem] leading-[1.4] font-bold sm:leading-[1.1]">
            Discover Our <br /> New Collection
          </h1>

          <p className="mb-8 text-[1.125rem] leading-6 font-medium text-[#333333] sm:leading-[1.3]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis.
          </p>

          <Link
            href="/shop"
            className="bg-primary active:bg-primary-active inline-block px-[4.2rem] py-[1.3rem] text-white"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
}
