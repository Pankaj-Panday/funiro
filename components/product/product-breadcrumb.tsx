import Link from "next/link";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

type Props = {
  name: string;
};

export default function ProductBreadcrumb({ name }: Props) {
  return (
    <Breadcrumb className="bg-cream py-6 lg:py-8">
      <BreadcrumbList className="content-container text-light gap-3 text-base">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-dark" />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-dark" />
        <BreadcrumbItem>
          <BreadcrumbPage className="border-light text-dark border-l-2 py-1 pl-4">
            {name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
