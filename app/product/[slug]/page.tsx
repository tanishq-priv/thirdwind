import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductDetail } from "@/components/product-detail";
import { formatPrice, getProductBySlug, getRelatedProducts, products } from "@/lib/products";

type Props = {
  params: { slug: string };
};

export function generateStaticParams() {
  return products.map((product) => ({ slug: product.slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const product = getProductBySlug(params.slug);
  if (!product) return {};

  return {
    title: product.name,
    description: `${product.shortDescription} Available from ${formatPrice(product.discountedPrice)} through trusted marketplace links.`,
    openGraph: {
      title: product.name,
      description: product.shortDescription,
      type: "website"
    }
  };
}

export default function ProductPage({ params }: Props) {
  const product = getProductBySlug(params.slug);
  if (!product) notFound();

  const related = getRelatedProducts(product);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.name,
    brand: product.brand,
    category: product.category,
    description: product.shortDescription,
    offers: {
      "@type": "AggregateOffer",
      lowPrice: product.discountedPrice,
      highPrice: product.actualPrice,
      priceCurrency: "INR",
      availability: "https://schema.org/InStock"
    },
    aggregateRating: product.rating
      ? {
          "@type": "AggregateRating",
          ratingValue: product.rating,
          reviewCount: product.popularity
        }
      : undefined
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
      />
      <ProductDetail product={product} related={related} />
    </>
  );
}
