import type { Metadata } from "next";
import { Compass, Eye, Rocket, ShieldCheck, Sparkles } from "lucide-react";

export const metadata: Metadata = {
  title: "About",
  description: "The story and philosophy behind ThirdWind Galaxy."
};

export default function AboutPage() {
  return (
    <>
      <section className="container-shell section-space">
        <div className="grid gap-10 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
          <div>
            <p className="eyebrow">About ThirdWind Galaxy</p>
            <h1 className="mt-4 font-display text-5xl font-bold tracking-tight text-white sm:text-7xl">
              A calmer way to discover premium technology.
            </h1>
            <p className="mt-6 text-lg leading-8 text-white/62">
              ThirdWind Galaxy was created for shoppers who want electronics to feel considered, not chaotic. Instead of
              pushing checkout inside another crowded storefront, the site focuses on product discovery, visual clarity,
              useful comparison, and a trusted handoff to Amazon or Flipkart.
            </p>
          </div>
          <div className="glass-panel glass-border rounded-[3rem] p-8">
            <div className="grid gap-5">
              {[
                ["Clarity", "Useful details stay visible without overwhelming the product."],
                ["Quality", "The catalog favors premium intent, strong design, and trustworthy signals."],
                ["Innovation", "The showroom treats modern gadgets as objects worth exploring."],
                ["Trust", "Purchases happen on established marketplace seller pages."]
              ].map(([title, copy]) => (
                <div key={title} className="rounded-[2rem] border border-white/10 bg-white/[0.055] p-5">
                  <h2 className="font-display text-xl font-bold text-white">{title}</h2>
                  <p className="mt-2 text-sm leading-6 text-white/56">{copy}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="container-shell section-space pt-0">
        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {[
            [Compass, "Mission", "Make premium electronics easier to discover through fast, visual, and category-aware browsing."],
            [Eye, "Visual Discovery", "Present each product as a hero object with simple specs, price signals, and context."],
            [Rocket, "Marketplace Flow", "Send shoppers to Amazon or Flipkart when they are ready to buy, without pretending to be checkout."],
            [ShieldCheck, "Trust", "Keep the separation clear: showcase here, official seller transaction there."]
          ].map(([Icon, title, copy]) => {
            const TypedIcon = Icon as typeof Sparkles;
            return (
              <div key={title as string} className="glass-panel glass-border rounded-[2rem] p-6">
                <TypedIcon className="mb-5 h-8 w-8 text-cyan" />
                <h2 className="font-display text-2xl font-bold text-white">{title as string}</h2>
                <p className="mt-3 text-sm leading-6 text-white/56">{copy as string}</p>
              </div>
            );
          })}
        </div>
      </section>

      <section className="container-shell section-space pt-0">
        <div className="glass-panel glass-border rounded-[3rem] p-8 sm:p-10">
          <p className="eyebrow">Brand Philosophy</p>
          <div className="mt-5 grid gap-8 lg:grid-cols-[0.8fr_1.2fr]">
            <h2 className="font-display text-4xl font-bold text-white">Luxury is not clutter. It is confidence.</h2>
            <div className="space-y-5 text-base leading-8 text-white/60">
              <p>
                The showroom uses cinematic space, glass surfaces, and restrained motion to make comparison feel lighter.
                Search and filters remain fast because premium presentation should never slow down discovery.
              </p>
              <p>
                Support questions, affiliate partnerships, or product submissions can be routed through the brand team.
                The core promise stays the same: clear presentation, quality-first curation, and transparent marketplace
                redirection.
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
