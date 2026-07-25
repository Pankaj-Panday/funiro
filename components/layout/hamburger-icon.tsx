"use client";

import { ComponentProps } from "react";

import { cn } from "@/lib/utils";

interface HamburgerIconProps extends ComponentProps<"button"> {
  open: boolean;
}

export function HamburgerIcon({ open, className, ...props }: HamburgerIconProps) {
  return (
    <button
      type="button"
      aria-label="Toggle menu"
      className={cn(
        "z-50 flex cursor-pointer flex-col gap-1.25 min-[841px]:hidden",
        className,
      )}
      {...props}
    >
      <span
        className={cn(
          "bg-primary h-[3px] w-[25px] rounded transition-all duration-300",
          open && "-translate-x-[7px]",
        )}
      />

      <span className="bg-primary h-[3px] w-[25px] rounded transition-all duration-300" />

      <span
        className={cn(
          "bg-primary h-[3px] w-[25px] rounded transition-all duration-300",
          open && "-translate-x-[7px]",
        )}
      />
    </button>
  );
}
