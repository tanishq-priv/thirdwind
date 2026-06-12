import Link from "next/link";
import { ArrowLeft, SearchX } from "lucide-react";

export default function NotFound() {
  return (
    <section className="container-shell grid min-h-[70vh] place-items-center py-20 text-center">
      <div className="glass-panel glass-border max-w-xl rounded-[3rem] p-10">
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full bg-cyan/10 text-cyan">
          <SearchX className="h-9 w-9" />
        </div>
        <h1 className="font-display text-4xl font-bold text-white">This orbit is empty</h1>
        <p className="mt-4 text-white/56">The product or category you were looking for is no longer in this showroom.</p>
        <Link
          href="/products"
          className="mt-7 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-void hover:bg-cyan"
        >
          <ArrowLeft className="h-4 w-4" />
          Explore products
        </Link>
      </div>
    </section>
  );
}
