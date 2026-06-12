import type { Metadata } from "next";
import type { ReactNode } from "react";
import "@/app/globals.css";
import { Footer } from "@/components/footer";
import { Header } from "@/components/header";
import { CosmicBackground } from "@/components/cosmic-background";

export const metadata: Metadata = {
  title: {
    default: "ThirdWind Galaxy | Premium Futuristic Electronics",
    template: "%s | ThirdWind Galaxy"
  },
  description:
    "A cinematic luxury electronics showcase for premium phones, laptops, wearables, gaming gear, cameras, and smart home products.",
  keywords: ["premium electronics", "futuristic gadgets", "Amazon electronics", "Flipkart electronics", "luxury tech"],
  openGraph: {
    title: "ThirdWind Galaxy",
    description: "Premium tech in a futuristic galaxy.",
    type: "website"
  }
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Space+Grotesk:wght@500;600;700&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="font-sans antialiased">
        <CosmicBackground />
        <div className="noise-overlay" />
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
