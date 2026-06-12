"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Menu, Search, ShoppingBag, Sparkles, X } from "lucide-react";
import { useState } from "react";
import { categories, slugify } from "@/lib/products";

const navItems = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Products" },
  { href: "/categories", label: "Categories" },
  { href: "/about", label: "About" }
];

export function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b border-white/10 bg-void/70 backdrop-blur-2xl">
      <div className="container-shell flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3">
          <span className="grid h-11 w-11 place-items-center rounded-2xl border border-cyan/30 bg-cyan/10 shadow-glow">
            <Sparkles className="h-5 w-5 text-cyan" />
          </span>
          <span>
            <span className="block font-display text-lg font-bold tracking-wide text-white">ThirdWind Galaxy</span>
            <span className="block text-xs text-white/48">Luxury tech showroom</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 rounded-full border border-white/10 bg-white/[0.055] p-1 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={`rounded-full px-4 py-2 text-sm font-semibold transition ${
                pathname === item.href ? "bg-white text-void" : "text-white/72 hover:bg-white/10 hover:text-white"
              }`}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Link
            href="/products"
            className="focus-ring inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:border-cyan/40 hover:bg-cyan/10"
          >
            <Search className="h-4 w-4" />
            Search
          </Link>
          <Link
            href="/products"
            className="focus-ring inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-bold text-void transition hover:bg-cyan"
          >
            <ShoppingBag className="h-4 w-4" />
            Explore
          </Link>
        </div>

        <button
          type="button"
          onClick={() => setOpen((value) => !value)}
          className="focus-ring grid h-11 w-11 place-items-center rounded-full border border-white/10 bg-white/10 text-white lg:hidden"
          aria-label="Toggle navigation"
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {open ? (
        <div className="container-shell pb-5 lg:hidden">
          <div className="glass-panel glass-border rounded-3xl p-3">
            <div className="grid gap-1">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="rounded-2xl px-4 py-3 text-sm font-semibold text-white/78 hover:bg-white/10 hover:text-white"
                >
                  {item.label}
                </Link>
              ))}
            </div>
            <div className="mt-3 flex flex-wrap gap-2 border-t border-white/10 pt-3">
              {categories.slice(0, 5).map((category) => (
                <Link
                  key={category}
                  href={`/category/${slugify(category)}`}
                  onClick={() => setOpen(false)}
                  className="rounded-full border border-white/10 bg-white/5 px-3 py-2 text-xs font-semibold text-white/70"
                >
                  {category}
                </Link>
              ))}
            </div>
          </div>
        </div>
      ) : null}
    </header>
  );
}
