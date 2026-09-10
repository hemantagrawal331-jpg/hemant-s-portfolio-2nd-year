export function SiteAtmosphere() {
  return (
    <div className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
      <div className="tech-grid tech-grid-shift absolute inset-0" />
      <div className="glow-orb left-[-8%] top-[18%] h-[42vh] w-[42vw] bg-[radial-gradient(circle,var(--accent-dim),transparent_68%)]" />
      <div
        className="glow-orb bottom-[8%] right-[-6%] h-[36vh] w-[36vw] bg-[radial-gradient(circle,var(--accent-dim),transparent_70%)]"
        style={{ animationDelay: "-8s" }}
      />
    </div>
  );
}
