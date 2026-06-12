/* eslint-disable @next/next/no-img-element */
import type { Product } from "@/lib/types";

const silhouettes: Record<string, { shell: string; inner: string; detail: string }> = {
  Smartphones: {
    shell: "h-44 w-24 rounded-[2rem]",
    inner: "inset-3 rounded-[1.45rem]",
    detail: "left-1/2 top-4 h-1.5 w-8 -translate-x-1/2 rounded-full"
  },
  Laptops: {
    shell: "h-28 w-52 rounded-2xl",
    inner: "inset-x-4 inset-y-3 rounded-xl",
    detail: "left-1/2 bottom-[-1.15rem] h-4 w-64 -translate-x-1/2 rounded-b-[2rem]"
  },
  Earbuds: {
    shell: "h-28 w-48 rounded-[2.5rem]",
    inner: "inset-5 rounded-[2rem]",
    detail: "left-1/2 top-1/2 h-16 w-28 -translate-x-1/2 -translate-y-1/2 rounded-full"
  },
  Smartwatches: {
    shell: "h-36 w-28 rounded-[2.2rem]",
    inner: "inset-4 rounded-[1.7rem]",
    detail: "left-1/2 top-[-2.8rem] h-16 w-12 -translate-x-1/2 rounded-t-full"
  },
  Tablets: {
    shell: "h-36 w-56 rounded-[2rem]",
    inner: "inset-4 rounded-[1.45rem]",
    detail: "right-6 top-1/2 h-1.5 w-1.5 -translate-y-1/2 rounded-full"
  },
  Accessories: {
    shell: "h-28 w-48 rounded-[2rem]",
    inner: "inset-5 rounded-[1.45rem]",
    detail: "left-1/2 top-1/2 h-12 w-12 -translate-x-1/2 -translate-y-1/2 rounded-full"
  },
  "Gaming Gear": {
    shell: "h-36 w-36 rounded-[2.4rem]",
    inner: "inset-5 rounded-[2rem]",
    detail: "left-1/2 bottom-6 h-6 w-20 -translate-x-1/2 rounded-full"
  },
  "Smart Home": {
    shell: "h-36 w-36 rounded-full",
    inner: "inset-7 rounded-full",
    detail: "left-1/2 bottom-7 h-2 w-16 -translate-x-1/2 rounded-full"
  },
  Cameras: {
    shell: "h-32 w-48 rounded-[1.6rem]",
    inner: "left-1/2 top-1/2 h-24 w-24 -translate-x-1/2 -translate-y-1/2 rounded-full",
    detail: "right-8 top-6 h-5 w-9 rounded-full"
  }
};

export function ProductVisual({
  product,
  size = "card",
  imageIndex = 0,
  priority = false
}: {
  product: Product;
  size?: "card" | "hero" | "thumb";
  imageIndex?: number;
  priority?: boolean;
}) {
  const isHero = size === "hero";
  const isThumb = size === "thumb";
  const silhouette = silhouettes[product.category] ?? silhouettes.Accessories;
  const rotate = imageIndex === 1 ? "rotate-[-8deg]" : imageIndex === 2 ? "rotate-[8deg]" : "rotate-0";
  const visualSrc = product.galleryImages[imageIndex] || product.image;
  const hasRealImage =
    Boolean(visualSrc) &&
    (visualSrc.startsWith("data:image/") ||
      visualSrc.startsWith("http://") ||
      visualSrc.startsWith("https://") ||
      visualSrc.startsWith("/uploads/"));

  return (
    <div
      role="img"
      aria-label={`${product.name} ${product.category} visual`}
      className={`product-halo relative isolate grid overflow-hidden rounded-[2rem] border border-white/10 bg-orbit/70 ${
        isHero ? "min-h-[420px] place-items-center p-8 md:min-h-[600px]" : isThumb ? "h-24 place-items-center p-3" : "h-64 place-items-center p-6"
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(255,255,255,.18),transparent_34%)]" />
      <div className="absolute left-1/2 top-1/2 h-[74%] w-[74%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-cyan/20" />
      <div className="absolute left-1/2 top-1/2 h-[52%] w-[52%] -translate-x-1/2 -translate-y-1/2 rounded-full border border-plasma/20" />
      {hasRealImage ? (
        <div className="relative z-10 grid h-full w-full place-items-center">
          <img
            src={visualSrc}
            alt={`${product.name} product image`}
            className={`mx-auto max-w-[88%] object-contain drop-shadow-[0_32px_48px_rgba(0,0,0,.72)] ${
              isThumb ? "max-h-20" : isHero ? "max-h-[520px]" : "max-h-56"
            }`}
          />
        </div>
      ) : (
        <div
          className={`relative z-10 ${rotate} transition-transform duration-500 ${
            isThumb ? "scale-[0.48]" : isHero ? "scale-[1.42] sm:scale-[1.72]" : "scale-100"
          }`}
        >
          <div
            className={`${silhouette.shell} relative bg-[linear-gradient(145deg,rgba(255,255,255,.82),rgba(148,163,184,.16)_32%,rgba(12,15,34,.98)_64%,rgba(103,232,249,.32))] p-px shadow-[0_34px_80px_rgba(0,0,0,.72),0_0_54px_rgba(34,211,238,.22)]`}
          >
            <div className="absolute inset-0 rounded-[inherit] bg-[linear-gradient(135deg,rgba(255,255,255,.18),transparent_38%,rgba(139,92,246,.22))]" />
            <div
              className={`absolute ${silhouette.inner} bg-[radial-gradient(circle_at_38%_22%,rgba(103,232,249,.78),transparent_18%),radial-gradient(circle_at_72%_72%,rgba(139,92,246,.74),transparent_26%),linear-gradient(145deg,#090b19,#141b3d_55%,#050713)] shadow-inner`}
            />
            <div className={`absolute ${silhouette.detail} bg-cyan/70 shadow-[0_0_18px_rgba(34,211,238,.75)]`} />
            <div className="absolute inset-x-4 top-5 h-px bg-white/40" />
            <div className="absolute bottom-4 left-1/2 h-1.5 w-10 -translate-x-1/2 rounded-full bg-white/20" />
          </div>
          <div className="mt-5 text-center font-display text-[0.58rem] font-bold uppercase tracking-[0.34em] text-cyan/80">
            {priority ? product.brand : product.category}
          </div>
        </div>
      )}
      <div className="absolute bottom-5 left-1/2 h-3 w-1/2 -translate-x-1/2 rounded-full bg-cyan/20 blur-xl" />
    </div>
  );
}
