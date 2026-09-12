import Image from "next/image";

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

export function ExhibitBoxes({ image, title }: { image: string; title: string }) {
  return (
    <span className="exhibit-rig" aria-hidden="true">
      <Cuboid className="pedestal-cuboid" />
      <span className="artifact-object">
        <Image
          src={image}
          alt=""
          fill
          sizes="(max-width: 700px) 70vw, 18vw"
          className="artifact-object__image"
          draggable={false}
          priority={title === "Loomis US"}
        />
      </span>
      <Cuboid className="glass-cuboid" />
    </span>
  );
}
