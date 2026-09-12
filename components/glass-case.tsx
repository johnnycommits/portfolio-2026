const faces = ["front", "back", "left", "right", "top", "bottom"] as const;

function Cuboid({ className }: { className: string }) {
  return (
    <span className={`cuboid ${className}`}>
      {faces.map((face) => (
        <span key={face} className={`cuboid__face cuboid__face--${face}`} />
      ))}
    </span>
  );
}

export function ExhibitBoxes() {
  return (
    <span className="exhibit-rig" aria-hidden="true">
      <Cuboid className="pedestal-cuboid" />
      <Cuboid className="glass-cuboid" />
    </span>
  );
}
