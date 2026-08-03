import { ExploreSlide, GalleryImage } from "@/types/homepage/homepage.types";

export const categories = [
  { img: "/assets/homepage/category1.jpg", name: "Dining" },
  { img: "/assets/homepage/category2.jpg", name: "Living" },
  { img: "/assets/homepage/category3.jpg", name: "Bedroom" },
];

export const galleryImages: GalleryImage[] = [
  {
    id: 1,
    src: "/assets/homepage/galleryImg1.jpg",
    alt: "Modern shelving unit with indoor plants and home decor",
    className: "lg:row-span-3 lg:bg-right",
  },
  {
    id: 2,
    src: "/assets/homepage/galleryImg2.jpg",
    alt: "Minimal home office desk with a laptop and vintage radio",
    className: "lg:col-start-2 lg:col-span-2 lg:row-start-2 lg:row-span-2",
  },
  {
    id: 3,
    src: "/assets/homepage/galleryImg3.jpg",
    alt: "Wooden armchair in a cozy living room corner",
    className: "lg:col-start-4 lg:row-start-3 lg:row-span-3",
  },
  {
    id: 4,
    src: "/assets/homepage/galleryImg4.jpg",
    alt: "Wooden side tables with a vase of flowers and a camera",
    className: "lg:col-start-5 lg:col-span-2 lg:row-start-2 lg:row-span-3",
  },
  {
    id: 5,
    src: "/assets/homepage/galleryImg5.jpg",
    alt: "Bright dining room with a modern pendant light",
    className: "lg:col-start-7 lg:col-span-2 lg:row-start-1 lg:row-span-4",
  },
  {
    id: 6,
    src: "/assets/homepage/galleryImg6.jpg",
    alt: "Contemporary bedroom with a padded headboard",
    className: "lg:col-start-1 lg:col-span-2 lg:row-start-4 lg:row-span-4 lg:bg-right",
  },
  {
    id: 7,
    src: "/assets/homepage/galleryImg7.jpg",
    alt: "Sunlit dining area with a wooden table and indoor plants",
    className: "lg:col-start-3 lg:row-start-4 lg:row-span-3",
  },
  {
    id: 8,
    src: "/assets/homepage/galleryImg8.jpg",
    alt: "Framed wall art with decorative vase on a marble surface",
    className: "lg:col-start-5 lg:row-start-5 lg:row-span-3",
  },
  {
    id: 9,
    src: "/assets/homepage/galleryImg9.jpg",
    alt: "Modern kitchen with open shelves and patterned backsplash",
    className: "lg:col-start-6 lg:col-span-2 lg:row-start-5 lg:row-span-2 lg:bg-left",
  },
];

export const exploreSlides: ExploreSlide[] = [
  {
    id: 1,
    image: "/assets/homepage/sliderImg1.jpg",
  },
  {
    id: 2,
    image: "/assets/homepage/sliderImg2.jpg",
  },
  {
    id: 3,
    image: "/assets/homepage/sliderImg3.jpg",
  },
  {
    id: 4,
    image: "/assets/homepage/sliderImg4.jpg",
  },
];
