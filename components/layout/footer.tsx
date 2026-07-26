"use client";

import { helpLinks, navLinks } from "@/constants/footer/footer.constants";
import Link from "next/link";
import Logo from "../shared/logo";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

export default function Footer() {
  const pathname = usePathname();

  return (
    <footer className="border-dark/20 text-dark border-t bg-white">
      <div className="page-container mx-auto">
        <div className="mt-[50px] flex flex-col gap-[50px] lg:flex-row lg:justify-between">
          {/* Logo */}
          <div>
            <div className="mb-5 lg:mb-[54px]">
              <Logo small />
            </div>

            <p className="text-light">
              400 University Drive Suite 200 Coral
              <br />
              Gables,
              <br />
              FL 33134 USA
            </p>
          </div>

          {/* Navigation */}
          <div>
            <h4 className="text-light mb-5 font-medium capitalize lg:mb-[54px]">Links</h4>

            <ul className="space-y-[46px] max-lg:space-y-[14px] lg:space-y-[46px]">
              {navLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-primary font-medium capitalize transition-colors",
                      pathname === item.href && "text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Help */}
          <div>
            <h4 className="text-light mb-5 font-medium capitalize lg:mb-[54px]">Help</h4>

            <ul className="space-y-[46px] max-lg:space-y-[14px] lg:space-y-[46px]">
              {helpLinks.map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className={cn(
                      "hover:text-primary font-medium capitalize transition-colors",
                      pathname === item.href && "text-primary",
                    )}
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Newsletter */}
          <div>
            <h4 className="text-light mb-5 font-medium capitalize lg:mb-[54px]">Newsletter</h4>

            <form className="flex flex-wrap gap-3">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                autoComplete="off"
                className="border-dark placeholder:text-light w-[200px] border-0 border-b bg-transparent px-[2px] py-[9px] text-sm outline-none placeholder:text-sm placeholder:font-normal"
              />

              <button
                type="submit"
                className="hover:text-primary border-dark border-0 border-b bg-transparent px-[2px] py-[9px] text-sm font-medium uppercase transition-colors active:pb-[7px]"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>

        <hr className="mt-12 border-[#D9D9D9]" />

        <p className="my-[35px]">{new Date().getFullYear()} Funiro. All rights reserved.</p>
      </div>
    </footer>
  );
}
