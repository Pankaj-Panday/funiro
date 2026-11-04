import { ArrowRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { ButtonLink } from "@/components/ui/button";
import { exploreSlides } from "@/constants/homepage/homepage";

import ExploreCarousel from "./explore-carousel";

export default function ExploreSection() {
  return (
    <section className="bg-cream-light mt-[4.3rem] py-11">
      <div className="mx-auto flex w-[95%] max-w-[90rem] flex-col gap-8 lg:flex-row lg:items-center lg:justify-between">
        {/* Left Content */}
        <div className="w-full lg:w-[42%]">
          <h2 className="text-heading text-ink font-bold">50+ Beautiful rooms inspiration</h2>

          <p className="text-ink-muted mt-3 max-w-md leading-7">
            Our designer already made a lot of beautiful prototype of rooms that inspire you.
          </p>

          <ButtonLink
            href="/shop"
            size="none"
            className="mt-6 min-w-44 rounded-none px-9 py-3 text-base font-semibold"
          >
            Explore More
          </ButtonLink>
        </div>

        {/* Featured Room */}
        <div className="relative h-[36.3rem] w-full max-w-[25.2rem] overflow-hidden">
          <Image
            src="/assets/homepage/exploreBedRoom.jpg"
            alt="Bedroom"
            fill
            className="object-cover"
          />

          <div className="bg-background/70 absolute bottom-[6%] left-[6%] px-8 py-8 backdrop-blur-sm">
            <p className="text-ink-muted mb-2 flex items-center text-sm font-medium">
              <span>01</span>

              <span className="bg-ink-muted mx-2 h-px w-7" />

              <span>Bedroom</span>
            </p>

            <h3 className="text-subheading text-ink font-semibold">Inner Peace</h3>

            <Link
              href="/shop"
              className="bg-primary text-primary-foreground absolute bottom-0 left-full flex h-12 w-12 items-center justify-center"
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
