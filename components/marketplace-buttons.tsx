import { ExternalLink, ShoppingBag } from "lucide-react";
import type { Product } from "@/lib/types";

export function MarketplaceButtons({ product, compact = false }: { product: Product; compact?: boolean }) {
  const base =
    "focus-ring inline-flex items-center justify-center gap-2 rounded-full font-bold transition hover:-translate-y-0.5";
  const size = compact ? "px-3 py-2 text-xs" : "px-5 py-3 text-sm";

  return (
    <div className={`flex ${compact ? "gap-2" : "flex-col gap-3 sm:flex-row"}`}>
      <a
        href={product.amazonLink}
        target="_blank"
        rel="noreferrer noopener sponsored"
        className={`${base} ${size} bg-white text-void hover:bg-cyan`}
        aria-label={`Buy ${product.name} on Amazon`}
      >
        <ShoppingBag className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        Amazon
      </a>
      <a
        href={product.flipkartLink}
        target="_blank"
        rel="noreferrer noopener sponsored"
        className={`${base} ${size} border border-cyan/30 bg-cyan/10 text-cyan hover:bg-cyan hover:text-void`}
        aria-label={`Buy ${product.name} on Flipkart`}
      >
        <ExternalLink className={compact ? "h-3.5 w-3.5" : "h-4 w-4"} />
        Flipkart
      </a>
    </div>
  );
}
