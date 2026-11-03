import Image from "next/image";

import { features } from "@/constants/shared/features.constants";

export default function FeaturesStrip() {
  return (
    <section className="bg-cream mt-21 py-14 md:py-25">
      <div className="mx-auto grid w-[95%] max-w-400 gap-8 sm:grid-cols-2 xl:flex xl:justify-between">
        {features.map((feature) => (
          <div key={feature.name} className="flex gap-2.5 xl:shrink-0">
            <Image src={feature.icon} alt="" width={60} height={60} className="size-15 shrink-0" />

            <div>
              <h2 className="text-foreground mb-0.5 text-2xl leading-normal font-semibold">
                {feature.name}
              </h2>
              <p className="text-muted-foreground text-xl leading-normal xl:text-lg 2xl:text-xl">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
