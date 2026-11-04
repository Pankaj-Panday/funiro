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
    <Breadcrumb className="bg-cream py-8">
      <BreadcrumbList className="content-container text-light gap-0 text-base">
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/" />}>Home</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-dark mx-4 [&>svg]:size-5" />
        <BreadcrumbItem>
          <BreadcrumbLink render={<Link href="/shop" />}>Shop</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator className="text-dark ml-4 [&>svg]:size-5" />
        <BreadcrumbItem>
          <BreadcrumbPage className="border-light text-dark ml-8 flex min-h-8 items-center border-l-2 pl-8">
            {name}
          </BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}
