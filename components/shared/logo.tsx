import Link from "next/link";
import Image from "next/image";

interface LogoProps {
  small?: boolean;
  className?: string;
}

export default function Logo({ small = false, className }: LogoProps) {
  const size = small ? 24 : 34;

  return (
    <Link href="/" className={`flex items-center gap-[5px] ${className}`}>
      <Image
        src="/assets/logo.svg"
        alt="Funiro"
        width={25}
        height={16}
        style={{
          height: size,
          width: "auto",
        }}
      />

      <span
        className="font-bold text-black"
        style={{
          fontSize: size,
        }}
      >
        Funiro
      </span>
    </Link>
  );
}
