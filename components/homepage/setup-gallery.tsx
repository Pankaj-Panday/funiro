import Image from "next/image";

import { galleryImages } from "@/constants/homepage/homepage";
import { cn } from "@/lib/utils";

export default function SetupGallery() {
  return (
    <section className="mx-auto mt-[4.2rem] mb-12.5 w-full max-w-360">
      <p className="text-ink-muted mb-2 text-center text-xl leading-6 font-semibold">
        Share your setup with
      </p>

      <h2 className="text-heading text-ink text-center font-bold">#FuniroFurniture</h2>

      <div className="mt-5 h-auto xl:h-180">
        <div className="mx-auto grid auto-rows-75 grid-cols-[250px] place-content-center gap-3 sm:grid-cols-[250px_250px] lg:-mt-5 lg:h-180 lg:grid-cols-[1fr_1fr_3.6fr_3.1fr_1.8fr_1.1fr_1.3fr_1.3fr] lg:grid-rows-[1fr_1.2fr_3.3fr_0.7fr_1.2fr_1.2fr_0.9fr]">
          {galleryImages.map((image) => (
            <div key={image.id} className={cn("relative overflow-hidden", image.className)}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
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
