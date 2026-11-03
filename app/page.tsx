import Categories from "@/components/homepage/category-section";
import ExploreSection from "@/components/homepage/explore-section";
import HeroSection from "@/components/homepage/hero-section";
import ProductShowCase from "@/components/homepage/product-showcase";
import SetupGallery from "@/components/homepage/setup-gallery";

export default function Home() {
  return (
    <>
      <HeroSection />
      <Categories />
      <ProductShowCase />
      <ExploreSection />
      <SetupGallery />
    </>
  );
}
