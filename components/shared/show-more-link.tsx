import { ButtonLink } from "@/components/ui/button";

export default function ShowMoreLink() {
  return (
    <ButtonLink
      href="/shop"
      variant="outline-primary"
      size="none"
      className="mx-auto mt-8 flex w-[15.3rem] rounded-none py-3 text-base font-semibold"
    >
      Show More
    </ButtonLink>
  );
}
