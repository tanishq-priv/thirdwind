"use client";

import { useEffect, useState } from "react";
import { products } from "@/lib/products";
import { readList } from "@/lib/storage";
import { ProductCard } from "@/components/product-card";

export function RecentlyViewed({ exclude }: { exclude?: string }) {
  const [recent, setRecent] = useState<string[]>([]);

  useEffect(() => {
    const read = () => setRecent(readList("recent-products"));
    read();
    window.addEventListener("recent-products:updated", read);
    return () => window.removeEventListener("recent-products:updated", read);
  }, []);

  const recentProducts = recent
    .filter((slug) => slug !== exclude)
    .map((slug) => products.find((product) => product.slug === slug))
    .filter(Boolean)
    .slice(0, 3);

  if (recentProducts.length === 0) return null;

  return (
    <section className="container-shell section-space pt-0">
      <div className="mb-7">
        <p className="eyebrow">Recently Viewed</p>
        <h2 className="mt-3 font-display text-3xl font-bold text-white">Return to your last orbit</h2>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recentProducts.map((product) => (
          <ProductCard key={product!.slug} product={product!} />
        ))}
      </div>
    </section>
  );
}
