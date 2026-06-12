"use client";

import { AnimatePresence, motion } from "framer-motion";
import { GitCompare, X } from "lucide-react";
import { formatPrice, getDiscount } from "@/lib/products";
import type { Product } from "@/lib/types";

export function CompareDock({
  products,
  selected,
  onRemove,
  onClear
}: {
  products: Product[];
  selected: string[];
  onRemove: (slug: string) => void;
  onClear: () => void;
}) {
  const compared = selected.map((slug) => products.find((product) => product.slug === slug)).filter(Boolean) as Product[];

  return (
    <AnimatePresence>
      {compared.length > 0 ? (
        <motion.aside
          initial={{ y: 120, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: 120, opacity: 0 }}
          className="fixed inset-x-3 bottom-3 z-50 mx-auto max-w-5xl rounded-[2rem] border border-white/10 bg-void/88 p-3 shadow-glow backdrop-blur-2xl sm:p-4"
        >
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white">
              <GitCompare className="h-4 w-4 text-cyan" />
              Compare {compared.length} product{compared.length === 1 ? "" : "s"}
            </div>
            <button type="button" onClick={onClear} className="text-xs font-bold text-white/50 hover:text-cyan">
              Clear all
            </button>
          </div>
          <div className="grid gap-2 md:grid-cols-3">
            {compared.map((product) => (
              <div key={product.slug} className="rounded-3xl border border-white/10 bg-white/[0.055] p-3">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <div>
                    <p className="font-display text-sm font-bold text-white">{product.name}</p>
                    <p className="text-xs text-white/46">{product.brand}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => onRemove(product.slug)}
                    className="grid h-7 w-7 place-items-center rounded-full bg-white/10 text-white/60 hover:text-white"
                    aria-label={`Remove ${product.name} from comparison`}
                  >
                    <X className="h-3.5 w-3.5" />
                  </button>
                </div>
                <div className="grid grid-cols-3 gap-2 text-xs">
                  <span className="rounded-2xl bg-black/20 p-2 text-white/48">
                    Price
                    <strong className="mt-1 block text-white">{formatPrice(product.discountedPrice)}</strong>
                  </span>
                  <span className="rounded-2xl bg-black/20 p-2 text-white/48">
                    Off
                    <strong className="mt-1 block text-cyan">{getDiscount(product)}%</strong>
                  </span>
                  <span className="rounded-2xl bg-black/20 p-2 text-white/48">
                    Rating
                    <strong className="mt-1 block text-white">{product.rating ?? "New"}</strong>
                  </span>
                </div>
              </div>
            ))}
          </div>
        </motion.aside>
      ) : null}
    </AnimatePresence>
  );
}
