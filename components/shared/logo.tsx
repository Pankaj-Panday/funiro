import Image from "next/image";
import Link from "next/link";

import { cn } from "@/lib/utils";

interface LogoProps {
  small?: boolean;
  className?: string;
}

export default function Logo({ small = false, className }: LogoProps) {
  return (
    <Link href="/" className={cn("flex items-center gap-[5px]", className)}>
      <Image
        src="/assets/logo.svg"
        alt="Funiro"
        width={25}
        height={16}
        className={cn("w-auto", small ? "h-6" : "h-[34px]")}
      />

      <span className={cn("text-dark font-bold", small ? "text-2xl" : "text-4xl")}>Funiro</span>
    </Link>
  );
}
