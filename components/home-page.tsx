"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, BadgeIndianRupee, Boxes, Orbit, ShieldCheck, Sparkles, Zap } from "lucide-react";
import { categories, formatPrice, getDiscount, products, slugify } from "@/lib/products";
import { ProductCard } from "@/components/product-card";
import { ProductVisual } from "@/components/product-visual";
import { RecentlyViewed } from "@/components/recently-viewed";

const featured = products.filter((product) => product.badges.includes("Premium Choice") || product.badges.includes("Editor's Pick")).slice(0, 3);
const deals = [...products].sort((a, b) => getDiscount(b) - getDiscount(a)).slice(0, 3);
const heroProduct = products[1];

export function HomePage() {
  return (
    <>
      <section className="star-hero-shell relative isolate grid min-h-[calc(100vh-5rem)] place-items-center overflow-hidden border-b border-white/10 px-4 py-20 text-center">
        <div className="absolute inset-0 -z-10 bg-black/20" />
        <motion.div
          initial={{ opacity: 0, y: 22, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="mx-auto max-w-5xl"
        >
          <h1 className="hero-title-glow font-display text-6xl font-bold tracking-tight text-white sm:text-8xl lg:text-[8.5rem]">
            Thirdwind
          </h1>
          <p className="mt-7 text-xl font-semibold text-white/58 sm:text-2xl">Innovating Tomorrow&apos;s Technology</p>
          <Link
            href="#showroom"
            className="focus-ring mt-12 inline-flex min-h-16 items-center justify-center rounded-2xl border border-white/20 bg-white/[0.075] px-12 text-lg font-bold text-white shadow-[inset_0_1px_0_rgba(255,255,255,.18),0_18px_60px_rgba(0,0,0,.45)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-white/36 hover:bg-white/[0.12] hover:shadow-glow"
          >
            Shop Now
          </Link>
        </motion.div>
      </section>

      <section id="showroom" className="container-shell grid min-h-[calc(100vh-5rem)] scroll-mt-20 items-center gap-10 py-12 lg:grid-cols-[1fr_0.9fr] lg:py-16">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7 }}>
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-cyan/20 bg-cyan/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.22em] text-cyan">
            <Sparkles className="h-4 w-4" />
            Featured Galaxy Picks
          </div>
          <h1 className="text-balance font-display text-5xl font-bold tracking-tight text-white sm:text-7xl xl:text-8xl">
            Premium tech in a futuristic galaxy
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-white/62">
            ThirdWind Galaxy is a cinematic discovery layer for rare-feeling electronics, premium gadgets, and modern
            accessories. Browse visually, compare quickly, then complete purchase through trusted marketplaces.
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Link
              href="/products"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-4 text-sm font-bold text-void transition hover:bg-cyan"
            >
              Explore Products
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              href="/categories"
              className="focus-ring inline-flex items-center justify-center gap-2 rounded-full border border-white/10 bg-white/10 px-6 py-4 text-sm font-bold text-white transition hover:border-cyan/40 hover:bg-cyan/10"
            >
              Browse Categories
              <Boxes className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {[
              ["9", "curated categories"],
              ["2", "trusted marketplaces"],
              ["0", "checkout friction"]
            ].map(([value, label]) => (
              <div key={label} className="rounded-3xl border border-white/10 bg-white/[0.055] p-4 backdrop-blur-xl">
                <div className="font-display text-3xl font-bold text-white">{value}</div>
                <div className="mt-1 text-xs font-semibold uppercase tracking-[0.18em] text-white/42">{label}</div>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.85, delay: 0.1 }}
          className="relative"
        >
          <div className="absolute -inset-10 rounded-full bg-cyan/10 blur-3xl" />
          <div className="glass-panel glass-border relative overflow-hidden rounded-[3rem] p-4">
            <ProductVisual product={heroProduct} size="hero" priority />
            <div className="absolute bottom-6 left-6 right-6 rounded-[2rem] border border-white/10 bg-void/72 p-5 backdrop-blur-2xl">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <p className="text-xs font-bold uppercase tracking-[0.24em] text-cyan">Launch spotlight</p>
                  <h2 className="mt-2 font-display text-2xl font-bold text-white">{heroProduct.name}</h2>
                </div>
                <div className="text-right">
                  <p className="text-sm text-white/42 line-through">{formatPrice(heroProduct.actualPrice)}</p>
                  <p className="font-display text-2xl font-bold text-white">{formatPrice(heroProduct.discountedPrice)}</p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </section>

      <section className="container-shell section-space">
        <div className="mb-8 flex flex-col justify-between gap-4 md:flex-row md:items-end">
          <div>
            <p className="eyebrow">Category Halls</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Browse by product universe</h2>
          </div>
          <Link href="/categories" className="inline-flex items-center gap-2 text-sm font-bold text-cyan hover:text-white">
            View all categories
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {categories.map((category, index) => (
            <Link
              key={category}
              href={`/category/${slugify(category)}`}
              className="glass-panel glass-border group rounded-[2rem] p-5 transition hover:-translate-y-1 hover:border-cyan/30"
            >
              <div className="mb-5 grid h-12 w-12 place-items-center rounded-2xl bg-cyan/10 text-cyan">
                {index % 3 === 0 ? <Orbit /> : index % 3 === 1 ? <Zap /> : <Boxes />}
              </div>
              <h3 className="font-display text-xl font-bold text-white">{category}</h3>
              <p className="mt-2 text-sm text-white/50">
                {products.filter((product) => product.category === category).length} curated picks
              </p>
            </Link>
          ))}
        </div>
      </section>

      <section className="container-shell section-space">
        <div className="mb-8">
          <p className="eyebrow">Premium Highlights</p>
          <h2 className="mt-3 font-display text-4xl font-bold text-white">Featured Galaxy Picks</h2>
        </div>
        <div className="grid gap-6 lg:grid-cols-3">
          {featured.map((product) => (
            <ProductCard key={product.slug} product={product} />
          ))}
        </div>
      </section>

      <section className="container-shell section-space">
        <div className="grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
          <div className="glass-panel glass-border rounded-[2rem] p-8">
            <BadgeIndianRupee className="mb-5 h-10 w-10 text-cyan" />
            <p className="eyebrow">Best Deals</p>
            <h2 className="mt-3 font-display text-4xl font-bold text-white">Price drops that still feel premium.</h2>
            <p className="mt-4 text-sm leading-6 text-white/58">
              Deals are presented as discovery cues. Marketplace pricing can change, so final checkout always happens on
              the official Amazon or Flipkart seller page.
            </p>
          </div>
          <div className="grid gap-4">
            {deals.map((product) => (
              <Link
                key={product.slug}
                href={`/product/${product.slug}`}
                className="glass-panel glass-border flex items-center justify-between gap-4 rounded-[2rem] p-4 transition hover:-translate-y-1"
              >
                <div>
                  <div className="mb-2 inline-flex rounded-full bg-cyan/10 px-3 py-1 text-xs font-bold text-cyan">
                    {getDiscount(product)}% price drop
                  </div>
                  <h3 className="font-display text-xl font-bold text-white">{product.name}</h3>
                  <p className="mt-1 text-sm text-white/48">{product.shortDescription}</p>
                </div>
                <div className="hidden text-right sm:block">
                  <p className="text-sm text-white/42 line-through">{formatPrice(product.actualPrice)}</p>
                  <p className="font-display text-xl font-bold text-white">{formatPrice(product.discountedPrice)}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className="container-shell section-space">
        <div className="glass-panel glass-border grid gap-6 rounded-[3rem] p-8 md:grid-cols-3">
          {[
            [ShieldCheck, "Trusted marketplace flow", "Every buy button redirects to Amazon or Flipkart in a new tab."],
            [Orbit, "Visual-first discovery", "Products are framed like rare objects, not crowded shelf listings."],
            [Sparkles, "Curated premium signals", "Badges, discount cues, ratings, and availability stay easy to scan."]
          ].map(([Icon, title, copy]) => {
            const TypedIcon = Icon as typeof ShieldCheck;
            return (
              <div key={title as string}>
                <TypedIcon className="mb-4 h-8 w-8 text-cyan" />
                <h3 className="font-display text-xl font-bold text-white">{title as string}</h3>
                <p className="mt-2 text-sm leading-6 text-white/56">{copy as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <RecentlyViewed />
    </>
  );
}
