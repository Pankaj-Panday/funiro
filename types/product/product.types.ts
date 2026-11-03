export interface ProductImage {
  url: string;
  name: string;
}

export interface Product {
  id: number;
  name: string;
  category: string;
  price: number;
  discountPercent: number;
  featured: boolean;
  isNew: boolean;
  thumbnail: string;
  rating: number;
  reviewCount: number;
  stock: number;
  relatedProducts: number[];
  sizes: string[];
  images: ProductImage[];
  colors: string[];
  shortDescription: string;
  tags: string[];
  longDescription: string;
}
