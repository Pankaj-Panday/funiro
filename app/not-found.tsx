import { ArrowRight, Compass, Home } from "lucide-react";
import type { Metadata } from "next";

import { ButtonLink } from "@/components/ui/button";

export const metadata: Metadata = {
  title: "Page Not Found | Funiro",
  description: "The page you are looking for could not be found.",
};

export default function NotFound() {
  return (
    <section className="page-container flex flex-col items-center py-20 text-center sm:py-28 lg:py-32">
      <div className="text-primary flex items-center gap-2">
        <Compass className="size-4" />
        <span className="text-sm font-medium tracking-wide uppercase">Error 404</span>
      </div>

      <div className="relative mt-6 flex items-center justify-center sm:mt-8">
        <span
          aria-hidden="true"
          className="border-primary/15 absolute size-40 rounded-full border sm:size-56 lg:size-64"
        />
        <p aria-hidden="true" className="text-primary text-9xl leading-none font-bold">
          404
        </p>
      </div>

      <h1 className="text-dark text-heading mt-6 font-semibold">Page not found</h1>

      <p className="text-light mt-4 max-w-md">
        Sorry, we couldn&apos;t find the page you were looking for. It may have been moved, renamed,
        or never existed.
      </p>

      <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
        <ButtonLink href="/" size="lg" className="h-11 gap-2 px-6">
          <Home className="size-4" />
          Back to Home
        </ButtonLink>

        <ButtonLink href="/shop" variant="outline" size="lg" className="h-11 gap-2 px-6">
          Continue Shopping
          <ArrowRight className="size-4 transition-transform duration-200 group-hover/button:translate-x-1" />
        </ButtonLink>
      </div>
    </section>
  );
}
