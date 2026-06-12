export type Product = {
  name: string;
  slug: string;
  category: string;
  image: string;
  galleryImages: string[];
  actualPrice: number;
  discountedPrice: number;
  shortDescription: string;
  longDescription: string;
  features: string[];
  amazonLink: string;
  flipkartLink: string;
  tags: string[];
  availability: string;
  badges: string[];
  brand: string;
  rating?: number;
  popularity: number;
  releaseDate: string;
};

export type SortKey = "popular" | "price-low" | "price-high" | "newest" | "discount";
