import Categories from "@/components/homepage/category-section";
import HeroSection from "@/components/homepage/hero-section";
import ProductShowCase from "@/components/homepage/product-showcase";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductShowCase />
    </>
  );
}
