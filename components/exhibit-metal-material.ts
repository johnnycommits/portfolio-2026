import { Color, Mesh, MeshPhysicalMaterial } from "three";

/**
 * A shared gallery-metal treatment for 3D exhibits. The finish is intentionally
 * neutral so warm and cool gallery lights create the color, as they would on a
 * real polished sculpture.
 */
export function metallicExhibitMaterialFor(mesh: Mesh) {
  const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  const identity = `${mesh.name} ${source?.name ?? ""}`.toLowerCase();
  const isWheel = /tire|tyre|wheel/.test(identity);
  const isGlass = /glass|window|windscreen|windshield/.test(identity);
  const isLight = /light|lamp|head|blinker|brake|reverse/.test(identity);
  const isTrim = /badge|numberplate|bumper/.test(identity);
  const isUndercarriage = /bottom|inner|interior|suspension|steering/.test(identity);

  if (isGlass) {
    return new MeshPhysicalMaterial({
      color: new Color("#17191a"),
      metalness: 0.12,
      roughness: 0.08,
      clearcoat: 1,
      clearcoatRoughness: 0.035,
      envMapIntensity: 2.15,
    });
  }

  if (isLight) {
    return new MeshPhysicalMaterial({
      color: new Color("#d7b18c"),
      emissive: new Color("#a45d2d"),
      emissiveIntensity: 0.42,
      metalness: 0.42,
      roughness: 0.13,
      clearcoat: 0.9,
      clearcoatRoughness: 0.045,
      envMapIntensity: 2.1,
    });
  }

  if (isWheel) {
    return new MeshPhysicalMaterial({
      color: new Color("#191919"),
      metalness: 0.58,
      roughness: 0.4,
      clearcoat: 0.12,
      clearcoatRoughness: 0.28,
      envMapIntensity: 1.25,
    });
  }

  if (isUndercarriage) {
    return new MeshPhysicalMaterial({
      color: new Color("#252525"),
      metalness: 0.86,
      roughness: 0.27,
      clearcoat: 0.08,
      clearcoatRoughness: 0.24,
      envMapIntensity: 1.65,
    });
  }

  return new MeshPhysicalMaterial({
    color: new Color(isTrim ? "#aaa39c" : "#575553"),
    metalness: 0.97,
    roughness: isTrim ? 0.12 : 0.17,
    anisotropy: isTrim ? 0.25 : 0.48,
    anisotropyRotation: Math.PI / 2,
    clearcoat: 0.1,
    clearcoatRoughness: 0.16,
    envMapIntensity: isTrim ? 2.4 : 2.25,
  });
}
