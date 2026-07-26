"use client";

import { Heart, ShoppingCart, User } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

import { Sheet, SheetClose, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { navItems } from "@/constants/header/header.constants";

import Logo from "../shared/logo";
import { HamburgerIcon } from "./hamburger-icon";
import { useMediaQuery } from "@/hooks/useMediaQuery";

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const isDesktop = useMediaQuery("(min-width: 841px)");

  useEffect(() => {
    if (isDesktop) {
      setOpen(false);
    }
  }, [isDesktop]);

  return (
    <>
      <header className="sticky top-0 z-40 bg-white">
        <div className="page-container flex h-24 items-center justify-between gap-12.5">
          <Logo />

          <div className="hidden w-[62%] justify-between gap-12.5 min-[841px]:flex">
            <nav className="w-[48%] max-[934px]:w-auto">
              <ul className="flex justify-between gap-7.5">
                {navItems.map((item) => (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={`font-medium capitalize transition-colors ${
                        pathname === item.href ? "text-primary" : "text-dark"
                      }`}
                    >
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>

            <nav className="text-dark w-[15%] max-[934px]:w-auto">
              <ul className="flex justify-between gap-3.75">
                <li>
                  <Link href="#">
                    <User className="h-5 w-5" />
                  </Link>
                </li>

                <li>
                  <Link href="/wishlist">
                    <Heart className="h-5 w-5" />
                  </Link>
                </li>

                <li>
                  <Link href="/cart">
                    <ShoppingCart className="h-5 w-5" />
                  </Link>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <Sheet open={open} onOpenChange={setOpen}>
        <div className="pointer-events-none fixed inset-x-0 top-0 z-50 min-[841px]:hidden">
          <div className="mx-auto flex h-24 w-[calc(82%+40px)] max-w-7xl items-center justify-end max-[1048px]:w-[92%]">
            <SheetTrigger
              render={
                <HamburgerIcon
                  open={open}
                  onClick={() => setOpen((prev) => !prev)}
                  className="pointer-events-auto"
                />
              }
            />
          </div>
        </div>

        <SheetContent
          side="right"
          showCloseButton={false}
          className="w-screen items-center justify-start gap-7.5 overflow-y-auto pt-31.5 data-[side=right]:w-screen data-[side=right]:sm:max-w-120"
        >
          <SheetTitle className="sr-only">Menu</SheetTitle>

          <nav aria-label="secondary">
            <ul className="flex gap-10.25">
              <li>
                <SheetClose render={<Link href="#" />}>
                  <User className="h-5 w-5" />
                </SheetClose>
              </li>

              <li>
                <SheetClose render={<Link href="/wishlist" />}>
                  <Heart className="h-5 w-5" />
                </SheetClose>
              </li>

              <li>
                <SheetClose render={<Link href="/cart" />}>
                  <ShoppingCart className="h-5 w-5" />
                </SheetClose>
              </li>
            </ul>
          </nav>

          <nav aria-label="primary">
            <ul className="flex flex-col items-center gap-7.5">
              {navItems.map((item) => (
                <li key={item.href}>
                  <SheetClose
                    render={
                      <Link
                        href={item.href}
                        className={`font-medium capitalize transition-colors ${
                          pathname === item.href ? "text-primary" : "text-dark"
                        }`}
                      />
                    }
                  >
                    {item.label}
                  </SheetClose>
                </li>
              ))}
            </ul>
          </nav>
        </SheetContent>
      </Sheet>
    </>
  );
}
