export const sortOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Alphabet: A-Z" },
  { value: "name-desc", label: "Alphabet: Z-A" },
] as const;

export const pageSizes = [4, 8, 12, 16, 20, 24, 28, 32];

export const PRICE_STEP = 500;

const DEFAULT_PAGE_SIZE = 12;

export type ShopSort = (typeof sortOptions)[number]["value"];

export type ShopFilters = {
  q: string;
  category: string;
  rating: number | null;
  color: string;
  maxPrice: number | null;
  sort: ShopSort | null;
  show: number;
  view: "grid" | "list";
};

export type ShopFilterOptions = {
  categories: string[];
  colors: string[];
  minPrice: number;
  maxPrice: number;
};

export type RawSearchParams = Record<string, string | string[] | undefined>;

const first = (value: string | string[] | undefined) =>
  (Array.isArray(value) ? value[0] : value) ?? "";

export function parseShopFilters(raw: RawSearchParams, options: ShopFilterOptions): ShopFilters {
  const category = first(raw.category);
  const color = first(raw.color);
  const rating = Number(first(raw.rating));
  const price = Number(first(raw.price));
  const show = Number(first(raw.show));
  const sort = sortOptions.find((option) => option.value === first(raw.sort));

  return {
    q: first(raw.q),
    category: options.categories.includes(category) ? category : "",
    rating: rating === 3 || rating === 4 ? rating : null,
    color: options.colors.includes(color) ? color : "",
    maxPrice: price >= options.minPrice && price < options.maxPrice ? price : null,
    sort: sort?.value ?? null,
    show: pageSizes.includes(show) ? show : DEFAULT_PAGE_SIZE,
    view: first(raw.view) === "list" ? "list" : "grid",
  };
}

export function toShopQuery(filters: ShopFilters) {
  const params = new URLSearchParams();

  if (filters.q) params.set("q", filters.q);
  if (filters.category) params.set("category", filters.category);
  if (filters.rating) params.set("rating", String(filters.rating));
  if (filters.color) params.set("color", filters.color);
  if (filters.maxPrice) params.set("price", String(filters.maxPrice));
  if (filters.sort) params.set("sort", filters.sort);
  if (filters.show !== DEFAULT_PAGE_SIZE) params.set("show", String(filters.show));
  if (filters.view === "list") params.set("view", "list");

  const query = params.toString();
  return query ? `?${query}` : "";
}

export function hasActiveFilters({ q, category, rating, color, maxPrice }: ShopFilters) {
  return Boolean(q || category || rating || color || maxPrice);
}
