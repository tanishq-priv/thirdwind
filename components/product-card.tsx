"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Check, GitCompare, Heart, Star } from "lucide-react";
import { useEffect, useState } from "react";
import { formatPrice, getDiscount } from "@/lib/products";
import { readList, toggleListValue } from "@/lib/storage";
import type { Product } from "@/lib/types";
import { MarketplaceButtons } from "@/components/marketplace-buttons";
import { ProductVisual } from "@/components/product-visual";

export function ProductCard({
  product,
  onCompareToggle,
  compared = false
}: {
  product: Product;
  onCompareToggle?: (slug: string) => void;
  compared?: boolean;
}) {
  const [saved, setSaved] = useState(false);
  const discount = getDiscount(product);

  useEffect(() => {
    setSaved(readList("saved-products").includes(product.slug));
    const handler = () => setSaved(readList("saved-products").includes(product.slug));
    window.addEventListener("saved-products:updated", handler);
    return () => window.removeEventListener("saved-products:updated", handler);
  }, [product.slug]);

  return (
    <motion.article
      layout
      whileHover={{ y: -8, rotateX: 1.2, rotateY: -1.2 }}
      transition={{ type: "spring", stiffness: 280, damping: 24 }}
      className="glass-panel glass-border group relative flex h-full flex-col overflow-hidden rounded-[2rem]"
    >
      <div className="absolute inset-x-8 top-0 h-px bg-gradient-to-r from-transparent via-cyan/70 to-transparent opacity-70" />
      <Link href={`/product/${product.slug}`} className="block p-3 pb-0">
        <ProductVisual product={product} />
      </Link>

      <div className="flex flex-1 flex-col p-5">
        <div className="mb-3 flex flex-wrap gap-2">
          <span className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
            {product.category}
          </span>
          {product.badges.slice(0, 2).map((badge) => (
            <span key={badge} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/74">
              {badge}
            </span>
          ))}
        </div>

        <div className="mb-3 flex items-start justify-between gap-3">
          <div>
            <Link href={`/product/${product.slug}`} className="font-display text-xl font-bold text-white hover:text-cyan">
              {product.name}
            </Link>
            <p className="mt-1 text-sm text-white/52">{product.brand}</p>
          </div>
          {product.rating ? (
            <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs font-bold text-white/72">
              <Star className="h-3.5 w-3.5 fill-cyan text-cyan" />
              {product.rating}
            </span>
          ) : null}
        </div>

        <p className="mb-5 line-clamp-2 min-h-12 text-sm leading-6 text-white/60">{product.shortDescription}</p>

        <div className="mb-5 rounded-3xl border border-white/10 bg-black/20 p-4">
          <div className="flex items-end justify-between gap-3">
            <div>
              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-white/38">Showroom price</p>
              <p className="mt-1 font-display text-2xl font-bold text-white">{formatPrice(product.discountedPrice)}</p>
            </div>
            <div className="text-right">
              <p className="text-sm text-white/42 line-through">{formatPrice(product.actualPrice)}</p>
              <p className="text-sm font-bold text-cyan">{discount}% off</p>
            </div>
          </div>
        </div>

        <div className="mt-auto flex items-center justify-between gap-3">
          <MarketplaceButtons product={product} compact />
          <div className="flex gap-2">
            <button
              type="button"
              onClick={() => setSaved(toggleListValue("saved-products", product.slug).includes(product.slug))}
              className={`focus-ring grid h-10 w-10 place-items-center rounded-full border transition ${
                saved ? "border-cyan/50 bg-cyan text-void" : "border-white/10 bg-white/10 text-white/70 hover:text-white"
              }`}
              aria-label={saved ? `Remove ${product.name} from saved products` : `Save ${product.name} for later`}
              title="Save for later"
            >
              <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
            </button>
            {onCompareToggle ? (
              <button
                type="button"
                onClick={() => onCompareToggle(product.slug)}
                className={`focus-ring grid h-10 w-10 place-items-center rounded-full border transition ${
                  compared ? "border-plasma/50 bg-plasma text-white" : "border-white/10 bg-white/10 text-white/70 hover:text-white"
                }`}
                aria-label={compared ? `Remove ${product.name} from comparison` : `Compare ${product.name}`}
                title="Compare products"
              >
                {compared ? <Check className="h-4 w-4" /> : <GitCompare className="h-4 w-4" />}
              </button>
            ) : null}
          </div>
        </div>
      </div>
    </motion.article>
  );
}
