import productsJson from "@/data/products.json";
import type { Product, SortKey } from "@/lib/types";

export const products = productsJson as Product[];

export const categories = [
  "Smartphones",
  "Laptops",
  "Earbuds",
  "Smartwatches",
  "Tablets",
  "Accessories",
  "Gaming Gear",
  "Smart Home",
  "Cameras"
];

export function slugify(value: string) {
  return value
    .toLowerCase()
    .replace(/&/g, "and")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

export function formatPrice(value: number) {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0
  }).format(value);
}

export function getDiscount(product: Product) {
  return Math.round(((product.actualPrice - product.discountedPrice) / product.actualPrice) * 100);
}

export function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug);
}

export function getProductsByCategory(categorySlug: string) {
  return products.filter((product) => slugify(product.category) === categorySlug);
}

export function getRelatedProducts(product: Product, limit = 4) {
  return products
    .filter((item) => item.slug !== product.slug)
    .sort((a, b) => {
      const categoryScore = Number(b.category === product.category) - Number(a.category === product.category);
      if (categoryScore !== 0) return categoryScore;
      return b.popularity - a.popularity;
    })
    .slice(0, limit);
}

export function filterProducts(
  source: Product[],
  filters: {
    query?: string;
    category?: string;
    brands?: string[];
    maxPrice?: number;
    minDiscount?: number;
    platform?: "amazon" | "flipkart" | "all";
    badge?: string;
    sort?: SortKey;
  }
) {
  const query = filters.query?.trim().toLowerCase();
  const brands = filters.brands ?? [];

  const filtered = source.filter((product) => {
    const searchable = [
      product.name,
      product.brand,
      product.category,
      product.shortDescription,
      product.longDescription,
      product.availability,
      ...product.tags,
      ...product.badges
    ]
      .join(" ")
      .toLowerCase();

    const matchesQuery = !query || searchable.includes(query);
    const matchesCategory = !filters.category || product.category === filters.category;
    const matchesBrand = brands.length === 0 || brands.includes(product.brand);
    const matchesPrice = !filters.maxPrice || product.discountedPrice <= filters.maxPrice;
    const matchesDiscount = !filters.minDiscount || getDiscount(product) >= filters.minDiscount;
    const matchesBadge = !filters.badge || product.badges.includes(filters.badge);
    const matchesPlatform =
      !filters.platform ||
      filters.platform === "all" ||
      (filters.platform === "amazon" ? Boolean(product.amazonLink) : Boolean(product.flipkartLink));

    return (
      matchesQuery &&
      matchesCategory &&
      matchesBrand &&
      matchesPrice &&
      matchesDiscount &&
      matchesPlatform &&
      matchesBadge
    );
  });

  return sortProducts(filtered, filters.sort ?? "popular");
}

export function sortProducts(source: Product[], sort: SortKey) {
  return [...source].sort((a, b) => {
    if (sort === "price-low") return a.discountedPrice - b.discountedPrice;
    if (sort === "price-high") return b.discountedPrice - a.discountedPrice;
    if (sort === "newest") return new Date(b.releaseDate).getTime() - new Date(a.releaseDate).getTime();
    if (sort === "discount") return getDiscount(b) - getDiscount(a);
    return b.popularity - a.popularity;
  });
}

export const brands = Array.from(new Set(products.map((product) => product.brand))).sort();
export const badges = Array.from(new Set(products.flatMap((product) => product.badges))).sort();
