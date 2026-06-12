import type { Metadata } from "next";
import Link from "next/link";
import { ArrowRight, Boxes, Camera, Gamepad2, Headphones, Home, Laptop, Smartphone, Tablet, Watch } from "lucide-react";
import { categories, products, slugify } from "@/lib/products";

export const metadata: Metadata = {
  title: "Categories",
  description: "Browse premium electronics by category showroom."
};

const iconMap = [Smartphone, Laptop, Headphones, Watch, Tablet, Boxes, Gamepad2, Home, Camera];

export default function CategoriesPage() {
  return (
    <section className="container-shell section-space">
      <div className="mb-10 max-w-3xl">
        <p className="eyebrow">Category Halls</p>
        <h1 className="mt-3 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
          Every room has its own orbit.
        </h1>
        <p className="mt-5 text-lg leading-8 text-white/58">
          Move through focused product halls built for quick scanning, premium visual browsing, and marketplace-ready
          discovery.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {categories.map((category, index) => {
          const Icon = iconMap[index] ?? Boxes;
          const categoryProducts = products.filter((product) => product.category === category);
          const topBrands = Array.from(new Set(categoryProducts.map((product) => product.brand))).join(", ");

          return (
            <Link
              key={category}
              href={`/category/${slugify(category)}`}
              className="glass-panel glass-border group rounded-[2rem] p-6 transition hover:-translate-y-1 hover:shadow-glow"
            >
              <div className="mb-7 flex items-center justify-between">
                <div className="grid h-14 w-14 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan">
                  <Icon className="h-7 w-7" />
                </div>
                <ArrowRight className="h-5 w-5 text-white/30 transition group-hover:translate-x-1 group-hover:text-cyan" />
              </div>
              <h2 className="font-display text-3xl font-bold text-white">{category}</h2>
              <p className="mt-3 min-h-12 text-sm leading-6 text-white/54">
                {categoryProducts.length} curated product{categoryProducts.length === 1 ? "" : "s"} from {topBrands}.
              </p>
              <div className="mt-6 flex flex-wrap gap-2">
                {categoryProducts.flatMap((product) => product.badges).slice(0, 3).map((badge, badgeIndex) => (
                  <span
                    key={`${badge}-${badgeIndex}`}
                    className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs font-bold text-white/60"
                  >
                    {badge}
                  </span>
                ))}
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
