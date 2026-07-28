import Categories from "@/components/homepage/category-section";
import HeroSection from "@/components/homepage/hero-section";
import ProductShowCase from "@/components/homepage/product-showcase";
import SetupGallery from "@/components/homepage/setup-gallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductShowCase />
      <SetupGallery />
    </>
  );
}
