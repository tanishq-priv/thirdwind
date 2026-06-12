import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductExplorer } from "@/components/product-explorer";
import { categories, getProductsByCategory, slugify } from "@/lib/products";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return categories.map((category) => ({ slug: slugify(category) }));
}

export function generateMetadata({ params }: Props): Metadata {
  const category = categories.find((item) => slugify(item) === params.slug);
  if (!category) return {};

  return {
    title: `${category} Showcase`,
    description: `Discover premium ${category.toLowerCase()} with filters, sorting, comparison, and marketplace links.`
  };
}

export default function CategoryPage({ params }: Props) {
  const category = categories.find((item) => slugify(item) === params.slug);
  if (!category) notFound();

  const categoryProducts = getProductsByCategory(params.slug);

  return (
    <>
      <section className="container-shell pt-14 sm:pt-20">
        <div className="glass-panel glass-border overflow-hidden rounded-[3rem] p-8 sm:p-10">
          <p className="eyebrow">{category} Showroom</p>
          <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">{category}</h1>
          <p className="mt-5 max-w-3xl text-lg leading-8 text-white/58">
            A focused orbit of premium {category.toLowerCase()} selected for design, performance, trust signals, and
            marketplace availability.
          </p>
        </div>
      </section>
      <ProductExplorer products={categoryProducts} lockedCategory={category} />
    </>
  );
}
