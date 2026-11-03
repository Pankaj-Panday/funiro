import Link from "next/link";

export default function HeroSection() {
  return (
    <section className="h-[calc(100vh-var(--header-height))] max-h-180 min-h-100 bg-[url('/assets/homepage/heroSectionbg.jpg')] bg-cover bg-bottom bg-no-repeat">
      <div className="page-container flex h-full items-center justify-end">
        <div className="bg-peach w-full rounded-[10px] px-10 pt-[3.8rem] pb-[2.4rem] lg:w-1/2">
          <p className="text-ink text-sm font-semibold tracking-[3px] uppercase">New Arrival</p>

          <h1 className="text-primary text-display mt-1 mb-4 font-bold">
            Discover Our <br /> New Collection
          </h1>

          <p className="text-ink mb-8 text-lg leading-6 font-medium sm:leading-[1.3]">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut elit tellus, luctus nec
            ullamcorper mattis.
          </p>

          <Link
            href="/shop"
            className="bg-primary active:bg-primary-active text-primary-foreground inline-block px-[4.2rem] py-[1.3rem]"
          >
            Buy Now
          </Link>
        </div>
      </div>
    </section>
  );
}
