export function CosmicBackground() {
  return (
    <div aria-hidden="true" className="space-background fixed inset-0 -z-10 overflow-hidden">
      <div className="space-vignette" />
      <div className="starfield-layer stars-small" />
      <div className="starfield-layer stars-medium" />
      <div className="starfield-layer stars-large" />
      <div className="starfield-layer stars-glow" />
    </div>
  );
}
