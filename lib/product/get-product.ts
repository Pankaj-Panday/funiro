import productsList from "@/data/productData";
import type { Product } from "@/types/product/product.types";

export function getAllProducts() {
  return productsList;
}

export function getProductIds() {
  return productsList.map((product) => product.id);
}

export function getProductById(id: number) {
  return productsList.find((product) => product.id === id);
}

export function getRelatedProducts({ id, relatedProducts }: Product) {
  return productsList.filter(
    (product) => product.id !== id && relatedProducts.includes(product.id),
  );
}
