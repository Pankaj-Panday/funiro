import type { Metadata } from "next";
import Image from "next/image";

import FeaturesStrip from "@/components/shared/features-strip";
import PageBanner from "@/components/shared/page-banner";
import { aboutSections } from "@/constants/about/about.constants";

export const metadata: Metadata = {
  title: "About | Funiro",
};

export default function AboutPage() {
  return (
    <>
      <PageBanner title="About" />

      <div className="content-container mt-16 mb-4 space-y-14 md:space-y-18">
        {aboutSections.map((section, index) => (
          <section
            key={section.title}
            className="flex flex-col gap-6 md:flex-row md:justify-between md:gap-0 md:even:flex-row-reverse"
          >
            <Image
              src={section.image}
              alt={section.alt}
              width={section.width}
              height={section.height}
              loading={index === 0 ? "eager" : "lazy"}
              sizes="(min-width: 768px) 50vw, 100vw"
              className="h-auto w-full self-start md:w-[49%]"
            />

            <div className="md:w-[49%]">
              <h2 className="text-dark text-subheading mb-6 font-bold">{section.title}</h2>
              <p className="text-body text-lead">{section.body}</p>
            </div>
          </section>
        ))}
      </div>

      <FeaturesStrip />
    </>
  );
}
