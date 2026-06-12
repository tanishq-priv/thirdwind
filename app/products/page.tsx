import type { Metadata } from "next";
import { ProductExplorer } from "@/components/product-explorer";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Explore Products",
  description: "Search, filter, compare, and discover premium electronics across trusted marketplace links."
};

export default function ProductsPage() {
  return <ProductExplorer products={products} />;
}
