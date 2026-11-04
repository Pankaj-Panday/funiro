import { ChevronRight } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

type Props = {
  title: string;
};

export default function PageBanner({ title }: Props) {
  return (
    <section className="relative grid h-79 place-content-center overflow-hidden text-center">
      <Image
        src="/assets/shared/secondaryHeaderBg.jpg"
        alt=""
        fill
        preload
        sizes="100vw"
        className="scale-105 object-cover blur-xs"
      />
      <div className="bg-background/40 absolute inset-0 md:hidden" />

      <div className="text-dark relative">
        <h1 className="text-title mb-0.5 font-medium">{title}</h1>

        <p className="flex items-center justify-center gap-0.5">
          <Link href="/" className="hover:text-primary font-medium transition-colors">
            Home
          </Link>
          <ChevronRight className="size-5" />
          {title}
        </p>
      </div>
    </section>
  );
}
