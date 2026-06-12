"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, Heart, ShieldCheck, Sparkles, Star } from "lucide-react";
import { formatPrice, getDiscount, slugify } from "@/lib/products";
import { readList, toggleListValue, writeRecentProduct } from "@/lib/storage";
import type { Product } from "@/lib/types";
import { MarketplaceButtons } from "@/components/marketplace-buttons";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { RecentlyViewed } from "@/components/recently-viewed";

export function ProductDetail({ product, related }: { product: Product; related: Product[] }) {
  const [imageIndex, setImageIndex] = useState(0);
  const [saved, setSaved] = useState(false);
  const discount = getDiscount(product);

  useEffect(() => {
    writeRecentProduct(product.slug);
    setSaved(readList("saved-products").includes(product.slug));
  }, [product.slug]);

  return (
    <>
      <section className="container-shell section-space">
        <Link href="/products" className="mb-8 inline-flex items-center gap-2 text-sm font-bold text-white/58 hover:text-cyan">
          <ArrowLeft className="h-4 w-4" />
          Back to products
        </Link>

        <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
          <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} className="grid gap-4">
            <ProductVisual product={product} size="hero" imageIndex={imageIndex} priority />
            <div className="grid grid-cols-3 gap-3">
              {product.galleryImages.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  onClick={() => setImageIndex(index)}
                  className={`rounded-[1.5rem] border p-1 transition ${
                    imageIndex === index ? "border-cyan/70 bg-cyan/10" : "border-white/10 bg-white/5 hover:border-cyan/30"
                  }`}
                >
                  <ProductVisual product={product} size="thumb" imageIndex={index} />
                </button>
              ))}
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="glass-panel glass-border self-start rounded-[3rem] p-6 sm:p-8"
          >
            <div className="mb-4 flex flex-wrap gap-2">
              <Link
                href={`/category/${slugify(product.category)}`}
                className="rounded-full border border-cyan/20 bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan"
              >
                {product.category}
              </Link>
              {product.badges.map((badge) => (
                <span key={badge} className="rounded-full border border-white/10 bg-white/10 px-3 py-1 text-xs font-bold text-white/72">
                  {badge}
                </span>
              ))}
            </div>
            <h1 className="font-display text-4xl font-bold tracking-tight text-white sm:text-6xl">{product.name}</h1>
            <p className="mt-3 text-lg text-white/54">{product.brand}</p>

            <div className="mt-6 flex flex-wrap items-center gap-3">
              {product.rating ? (
                <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-bold text-white">
                  <Star className="h-4 w-4 fill-cyan text-cyan" />
                  {product.rating} premium trust score
                </span>
              ) : null}
              <span className="inline-flex items-center gap-2 rounded-full bg-plasma/15 px-4 py-2 text-sm font-bold text-white">
                <Sparkles className="h-4 w-4 text-plasma" />
                {product.availability}
              </span>
            </div>

            <p className="mt-7 text-base leading-8 text-white/64">{product.longDescription}</p>

            <div className="mt-7 rounded-[2rem] border border-white/10 bg-black/20 p-5">
              <div className="flex items-end justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.22em] text-white/42">Discovery price</p>
                  <p className="mt-2 font-display text-4xl font-bold text-white">{formatPrice(product.discountedPrice)}</p>
                </div>
                <div className="text-right">
                  <p className="text-white/42 line-through">{formatPrice(product.actualPrice)}</p>
                  <p className="font-bold text-cyan">{discount}% off</p>
                </div>
              </div>
              <div className="mt-4 rounded-2xl border border-cyan/20 bg-cyan/10 px-4 py-3 text-sm font-semibold text-cyan">
                Offer highlight: compare marketplace pricing before purchase.
              </div>
            </div>

            <div className="mt-7">
              <MarketplaceButtons product={product} />
              <button
                type="button"
                onClick={() => setSaved(toggleListValue("saved-products", product.slug).includes(product.slug))}
                className={`focus-ring mt-3 inline-flex w-full items-center justify-center gap-2 rounded-full border px-5 py-3 text-sm font-bold transition sm:w-auto ${
                  saved ? "border-cyan/50 bg-cyan text-void" : "border-white/10 bg-white/10 text-white hover:border-cyan/40"
                }`}
              >
                <Heart className={`h-4 w-4 ${saved ? "fill-current" : ""}`} />
                {saved ? "Saved for later" : "Save for later"}
              </button>
            </div>

            <div className="mt-7 grid gap-3">
              <div className="flex items-center gap-2 text-sm font-bold text-white">
                <ShieldCheck className="h-4 w-4 text-cyan" />
                Redirects to official seller page
              </div>
              <p className="text-sm leading-6 text-white/48">
                ThirdWind Galaxy helps you discover and compare products. Checkout, payment, delivery, and returns are
                handled by the external marketplace.
              </p>
            </div>
          </motion.div>
        </div>
      </section>

      <section className="container-shell section-space pt-0">
        <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">
          <div>
            <p className="eyebrow">Specifications</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Built for premium intent</h2>
          </div>
          <div className="grid gap-3">
            {product.features.map((feature) => (
              <div key={feature} className="glass-panel flex items-center gap-3 rounded-3xl p-4">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan" />
                <span className="text-sm font-medium text-white/72">{feature}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-space pt-0">
        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="eyebrow">Related Products</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Nearby in the galaxy</h2>
          </div>
          <Link href={`/category/${slugify(product.category)}`} className="hidden text-sm font-bold text-cyan hover:text-white sm:inline">
            More {product.category}
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.slug} product={item} />
          ))}
        </div>
      </section>

      <RecentlyViewed exclude={product.slug} />
    </>
  );
}
