import Link from "next/link";
import { ShieldCheck, Sparkles } from "lucide-react";
import { categories, slugify } from "@/lib/products";

export function Footer() {
  return (
    <footer className="border-t border-white/10 bg-void/80">
      <div className="container-shell grid gap-10 py-12 md:grid-cols-[1.2fr_1fr_1fr]">
        <div>
          <div className="mb-4 flex items-center gap-3">
            <span className="grid h-10 w-10 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10">
              <Sparkles className="h-5 w-5 text-cyan" />
            </span>
            <span className="font-display text-lg font-bold">ThirdWind Galaxy</span>
          </div>
          <p className="max-w-md text-sm leading-6 text-white/58">
            A showcase-first electronics catalog where premium products are discovered visually, then purchased through
            trusted marketplace seller pages.
          </p>
          <div className="mt-5 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 text-xs font-semibold text-white/64">
            <ShieldCheck className="h-4 w-4 text-cyan" />
            External checkout via Amazon and Flipkart
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.24em] text-white/60">Browse</h3>
          <div className="grid grid-cols-2 gap-3 text-sm text-white/62">
            {categories.slice(0, 8).map((category) => (
              <Link key={category} href={`/category/${slugify(category)}`} className="hover:text-cyan">
                {category}
              </Link>
            ))}
          </div>
        </div>
        <div>
          <h3 className="mb-4 font-display text-sm font-bold uppercase tracking-[0.24em] text-white/60">Showroom</h3>
          <div className="grid gap-3 text-sm text-white/62">
            <Link href="/products" className="hover:text-cyan">
              Search products
            </Link>
            <Link href="/categories" className="hover:text-cyan">
              Category halls
            </Link>
            <Link href="/about" className="hover:text-cyan">
              About the brand
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
