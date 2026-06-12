import { RotateCcw, SearchX } from "lucide-react";

export function EmptyState({ onReset }: { onReset?: () => void }) {
  return (
    <div className="glass-panel glass-border grid min-h-[360px] place-items-center rounded-[2rem] p-8 text-center">
      <div>
        <div className="mx-auto mb-6 grid h-20 w-20 place-items-center rounded-full border border-cyan/20 bg-cyan/10">
          <SearchX className="h-9 w-9 text-cyan" />
        </div>
        <h3 className="font-display text-2xl font-bold text-white">No products found in this orbit</h3>
        <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-white/58">
          Try a different keyword, loosen the price or discount filters, or reset the showroom view.
        </p>
        {onReset ? (
          <button
            type="button"
            onClick={onReset}
            className="focus-ring mt-6 inline-flex items-center gap-2 rounded-full bg-white px-5 py-3 text-sm font-bold text-void transition hover:bg-cyan"
          >
            <RotateCcw className="h-4 w-4" />
            Reset filters
          </button>
        ) : null}
      </div>
    </div>
  );
}
