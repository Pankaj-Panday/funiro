import Image from "next/image";

import { cn } from "@/lib/utils";
import { galleryImages } from "@/constants/homepage/homepage";

export default function SetupGallery() {
  return (
    <section className="mx-auto mt-[4.2rem] mb-12.5 w-full max-w-360">
      <p className="mb-2 text-center text-xl leading-6 font-semibold text-[#616161]">
        Share your setup with
      </p>

      <h2 className="text-center text-[2.5rem] leading-[1.2] font-bold text-[#3a3a3a]">
        #FuniroFurniture
      </h2>

      <div className="mt-5 h-auto xl:h-180">
        <div className="mx-auto grid auto-rows-75 grid-cols-[250px] place-content-center gap-3 sm:grid-cols-[250px_250px] lg:-mt-5 lg:h-180 lg:grid-cols-[1fr_1fr_3.6fr_3.1fr_1.8fr_1.1fr_1.3fr_1.3fr] lg:grid-rows-[1fr_1.2fr_3.3fr_0.7fr_1.2fr_1.2fr_0.9fr]">
          {galleryImages.map((image) => (
            <div key={image.id} className={cn("relative overflow-hidden", image.className)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={image.id <= 3}
                sizes="
                  (max-width: 639px) 250px,
                  (max-width: 1023px) 250px,
                  20vw
                "
                className="object-cover"
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
