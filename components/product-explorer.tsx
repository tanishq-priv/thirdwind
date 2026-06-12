"use client";

import { AnimatePresence, motion } from "framer-motion";
import { Filter, Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { badges, brands, categories, filterProducts, formatPrice } from "@/lib/products";
import type { Product, SortKey } from "@/lib/types";
import { CompareDock } from "@/components/compare-dock";
import { EmptyState } from "@/components/empty-state";
import { ProductCard } from "@/components/product-card";

const sortOptions: { label: string; value: SortKey }[] = [
  { label: "Popularity", value: "popular" },
  { label: "Newest", value: "newest" },
  { label: "Price low", value: "price-low" },
  { label: "Price high", value: "price-high" },
  { label: "Discount", value: "discount" }
];

export function ProductExplorer({
  products,
  lockedCategory
}: {
  products: Product[];
  lockedCategory?: string;
}) {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState(lockedCategory ?? "");
  const [selectedBrands, setSelectedBrands] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(250000);
  const [minDiscount, setMinDiscount] = useState(0);
  const [platform, setPlatform] = useState<"all" | "amazon" | "flipkart">("all");
  const [badge, setBadge] = useState("");
  const [sort, setSort] = useState<SortKey>("popular");
  const [compare, setCompare] = useState<string[]>([]);
  const [mobileFilters, setMobileFilters] = useState(false);

  const filtered = useMemo(
    () =>
      filterProducts(products, {
        query,
        category: lockedCategory ?? category,
        brands: selectedBrands,
        maxPrice,
        minDiscount,
        platform,
        badge,
        sort
      }),
    [products, query, lockedCategory, category, selectedBrands, maxPrice, minDiscount, platform, badge, sort]
  );

  const suggestions = useMemo(() => {
    const all = Array.from(
      new Set(products.flatMap((product) => [product.name, product.brand, product.category, ...product.tags]))
    );
    if (!query.trim()) return all.slice(0, 7);
    return all.filter((item) => item.toLowerCase().includes(query.toLowerCase())).slice(0, 7);
  }, [products, query]);

  function resetFilters() {
    setQuery("");
    setCategory(lockedCategory ?? "");
    setSelectedBrands([]);
    setMaxPrice(250000);
    setMinDiscount(0);
    setPlatform("all");
    setBadge("");
    setSort("popular");
  }

  function toggleBrand(brand: string) {
    setSelectedBrands((current) =>
      current.includes(brand) ? current.filter((item) => item !== brand) : [...current, brand]
    );
  }

  function toggleCompare(slug: string) {
    setCompare((current) => {
      if (current.includes(slug)) return current.filter((item) => item !== slug);
      return [...current, slug].slice(-3);
    });
  }

  const filterPanel = (
    <div className="grid gap-5">
      {!lockedCategory ? (
        <div>
          <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">Category</label>
          <select
            value={category}
            onChange={(event) => setCategory(event.target.value)}
            className="focus-ring w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
          >
            <option value="">All categories</option>
            {categories.map((item) => (
              <option key={item} value={item}>
                {item}
              </option>
            ))}
          </select>
        </div>
      ) : null}

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">
          Max price: {formatPrice(maxPrice)}
        </label>
        <input
          type="range"
          min="15000"
          max="250000"
          step="5000"
          value={maxPrice}
          onChange={(event) => setMaxPrice(Number(event.target.value))}
          className="w-full accent-cyan"
        />
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">
          Minimum discount: {minDiscount}%
        </label>
        <input
          type="range"
          min="0"
          max="35"
          step="5"
          value={minDiscount}
          onChange={(event) => setMinDiscount(Number(event.target.value))}
          className="w-full accent-plasma"
        />
      </div>

      <div>
        <label className="mb-3 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">Brand</label>
        <div className="flex flex-wrap gap-2">
          {brands.map((brand) => (
            <button
              key={brand}
              type="button"
              onClick={() => toggleBrand(brand)}
              className={`rounded-full border px-3 py-2 text-xs font-bold transition ${
                selectedBrands.includes(brand)
                  ? "border-cyan/50 bg-cyan text-void"
                  : "border-white/10 bg-white/5 text-white/62 hover:text-white"
              }`}
            >
              {brand}
            </button>
          ))}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">Availability</label>
        <select
          value={platform}
          onChange={(event) => setPlatform(event.target.value as "all" | "amazon" | "flipkart")}
          className="focus-ring w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
        >
          <option value="all">Amazon and Flipkart</option>
          <option value="amazon">Amazon</option>
          <option value="flipkart">Flipkart</option>
        </select>
      </div>

      <div>
        <label className="mb-2 block text-xs font-bold uppercase tracking-[0.22em] text-white/42">Badge</label>
        <select
          value={badge}
          onChange={(event) => setBadge(event.target.value)}
          className="focus-ring w-full rounded-2xl border border-white/10 bg-black/30 px-4 py-3 text-sm text-white"
        >
          <option value="">Any badge</option>
          {badges.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      <button
        type="button"
        onClick={resetFilters}
        className="focus-ring rounded-full border border-white/10 bg-white/10 px-5 py-3 text-sm font-bold text-white hover:border-cyan/40"
      >
        Reset filters
      </button>
    </div>
  );

  return (
    <section className="container-shell section-space">
      <div className="mb-8 grid gap-5 lg:grid-cols-[1fr_auto] lg:items-end">
        <div>
          <p className="eyebrow">Search and Discovery</p>
          <h1 className="mt-3 font-display text-4xl font-bold tracking-tight text-white sm:text-5xl">
            Find rare electronics by mood, spec, category, or intent.
          </h1>
        </div>
        <div className="flex items-center gap-3 rounded-full border border-white/10 bg-white/[0.055] p-1">
          {sortOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => setSort(option.value)}
              className={`rounded-full px-3 py-2 text-xs font-bold transition sm:px-4 ${
                sort === option.value ? "bg-white text-void" : "text-white/58 hover:text-white"
              }`}
            >
              {option.label}
            </button>
          ))}
        </div>
      </div>

      <div className="sticky top-20 z-30 mb-8 rounded-[2rem] border border-white/10 bg-void/78 p-3 shadow-card backdrop-blur-2xl">
        <div className="grid gap-3 lg:grid-cols-[1fr_auto]">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-cyan" />
            <input
              value={query}
              onChange={(event) => setQuery(event.target.value)}
              placeholder="Search by gaming, laptop, premium, watch, camera, brand, tag..."
              className="focus-ring w-full rounded-[1.4rem] border border-white/10 bg-black/30 py-4 pl-12 pr-4 text-sm text-white placeholder:text-white/34"
            />
          </div>
          <button
            type="button"
            onClick={() => setMobileFilters(true)}
            className="focus-ring inline-flex items-center justify-center gap-2 rounded-[1.4rem] border border-white/10 bg-white/10 px-5 py-4 text-sm font-bold text-white lg:hidden"
          >
            <Filter className="h-4 w-4" />
            Filters
          </button>
        </div>
        <div className="mt-3 flex gap-2 overflow-x-auto pb-1">
          {suggestions.map((suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => setQuery(suggestion)}
              className="shrink-0 rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/58 hover:border-cyan/30 hover:text-cyan"
            >
              {suggestion}
            </button>
          ))}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[300px_1fr]">
        <aside className="glass-panel glass-border sticky top-44 hidden self-start rounded-[2rem] p-5 lg:block">
          <div className="mb-5 flex items-center gap-2 font-display text-lg font-bold">
            <SlidersHorizontal className="h-5 w-5 text-cyan" />
            Filters
          </div>
          {filterPanel}
        </aside>

        <div>
          <div className="mb-5 flex items-center justify-between gap-3 text-sm text-white/54">
            <span>
              Showing <strong className="text-white">{filtered.length}</strong> of {products.length} products
            </span>
            <span className="hidden rounded-full border border-white/10 bg-white/5 px-3 py-1.5 text-xs font-semibold sm:inline-flex">
              Compare up to 3
            </span>
          </div>

          {filtered.length > 0 ? (
            <motion.div layout className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              <AnimatePresence mode="popLayout">
                {filtered.map((product) => (
                  <ProductCard
                    key={product.slug}
                    product={product}
                    onCompareToggle={toggleCompare}
                    compared={compare.includes(product.slug)}
                  />
                ))}
              </AnimatePresence>
            </motion.div>
          ) : (
            <EmptyState onReset={resetFilters} />
          )}
        </div>
      </div>

      <AnimatePresence>
        {mobileFilters ? (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-black/70 p-4 backdrop-blur-xl lg:hidden"
          >
            <motion.div
              initial={{ y: 40 }}
              animate={{ y: 0 }}
              exit={{ y: 40 }}
              className="glass-panel ml-auto h-full max-w-md overflow-y-auto rounded-[2rem] p-5"
            >
              <div className="mb-6 flex items-center justify-between">
                <div className="font-display text-xl font-bold">Filters</div>
                <button
                  type="button"
                  onClick={() => setMobileFilters(false)}
                  className="grid h-10 w-10 place-items-center rounded-full bg-white/10"
                  aria-label="Close filters"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>
              {filterPanel}
            </motion.div>
          </motion.div>
        ) : null}
      </AnimatePresence>

      <CompareDock products={products} selected={compare} onRemove={toggleCompare} onClear={() => setCompare([])} />
    </section>
  );
}
