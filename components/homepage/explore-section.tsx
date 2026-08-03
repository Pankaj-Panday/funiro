import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import ExploreCarousel from "./explore-carousel";
import { exploreSlides } from "@/constants/homepage/homepage";

export default function ExploreSection() {
  return (
    <section className="mt-[4.3rem] bg-[#FCF8F3] py-11">
      <div className="mx-auto flex w-[95%] max-w-[90rem] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="w-full lg:w-[42%]">
          <h2 className="text-4xl leading-tight font-bold text-[#3A3A3A]">
            50+ Beautiful rooms inspiration
          </h2>

          <p className="mt-3 max-w-md leading-7 text-[#616161]">
            Our designer already made a lot of beautiful prototype of rooms that inspire you.
          </p>

          <Link
            href="/shop"
            className="bg-primary hover:bg-primary/90 mt-6 inline-flex min-w-44 items-center justify-center px-9 py-3 font-semibold text-white transition-colors"
          >
            Explore More
          </Link>
        </div>

        {/* Featured Room */}
        <div className="relative h-[36.3rem] w-full max-w-[25.2rem] overflow-hidden">
          <Image
            src="/assets/homepage/exploreBedRoom.jpg"
            alt="Bedroom"
            fill
            className="object-cover"
          />

          <div className="absolute bottom-[6%] left-[6%] bg-white/70 px-8 py-8 backdrop-blur-sm">
            <p className="mb-2 flex items-center text-sm font-medium text-[#616161]">
              <span>01</span>

              <span className="mx-2 h-px w-7 bg-[#616161]" />

              <span>Bedroom</span>
            </p>

            <h3 className="text-[1.75rem] font-semibold text-[#3A3A3A]">Inner Peace</h3>

            <Link
              href="/shop"
              className="bg-primary absolute bottom-0 left-full flex h-12 w-12 items-center justify-center text-white"
            >
              <ArrowRight className="h-5 w-5" />
            </Link>
          </div>
        </div>

        {/* Carousel */}
        <div className="h-[34rem] w-full max-w-[23.2rem] self-start">
          <ExploreCarousel slides={exploreSlides} />
        </div>
      </div>
    </section>
  );
}
