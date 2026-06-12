export function LoadingSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
      {Array.from({ length: 6 }).map((_, index) => (
        <div key={index} className="glass-panel rounded-[2rem] p-4">
          <div className="h-56 rounded-[1.5rem] bg-[linear-gradient(110deg,rgba(255,255,255,.05),rgba(255,255,255,.14),rgba(255,255,255,.05))] bg-[length:200%_100%] animate-shimmer" />
          <div className="mt-5 h-4 w-2/3 rounded-full bg-white/10" />
          <div className="mt-3 h-4 w-full rounded-full bg-white/10" />
          <div className="mt-3 h-4 w-1/2 rounded-full bg-white/10" />
        </div>
      ))}
    </div>
  );
}
