import { NodeIO } from "@gltf-transform/core";

const input = process.argv[2];

if (!input) {
  throw new Error("Usage: node scripts/inspect-gltf.mjs <model.glb>");
}

const document = await new NodeIO().read(input);
const root = document.getRoot();

const meshes = root.listMeshes().map((mesh) => ({
  name: mesh.getName(),
  primitives: mesh.listPrimitives().map((primitive) => {
    const position = primitive.getAttribute("POSITION");
    const min = [Infinity, Infinity, Infinity];
    const max = [-Infinity, -Infinity, -Infinity];

    if (position) {
      const value = [0, 0, 0];
      for (let index = 0; index < position.getCount(); index += 1) {
        position.getElement(index, value);
        for (let axis = 0; axis < 3; axis += 1) {
          min[axis] = Math.min(min[axis], value[axis]);
          max[axis] = Math.max(max[axis], value[axis]);
        }
      }
    }

    const yHistogram = [];
    if (position) {
      const bins = 40;
      for (let bin = 0; bin < bins; bin += 1) {
        yHistogram.push({ count: 0, minX: Infinity, maxX: -Infinity, minZ: Infinity, maxZ: -Infinity });
      }
      const value = [0, 0, 0];
      const span = max[1] - min[1] || 1;
      for (let index = 0; index < position.getCount(); index += 1) {
        position.getElement(index, value);
        const bin = Math.min(bins - 1, Math.floor(((value[1] - min[1]) / span) * bins));
        const stats = yHistogram[bin];
        stats.count += 1;
        stats.minX = Math.min(stats.minX, value[0]);
        stats.maxX = Math.max(stats.maxX, value[0]);
        stats.minZ = Math.min(stats.minZ, value[2]);
        stats.maxZ = Math.max(stats.maxZ, value[2]);
      }
      yHistogram.forEach((stats, index) => {
        stats.yMin = min[1] + (index / bins) * span;
        stats.yMax = min[1] + ((index + 1) / bins) * span;
      });
    }

    return {
      mode: primitive.getMode(),
      vertices: position?.getCount() ?? 0,
      indices: primitive.getIndices()?.getCount() ?? 0,
      attributes: primitive.listSemantics(),
      bounds: { min, max },
      material: primitive.getMaterial()?.getName() ?? "",
      yHistogram,
    };
  }),
}));

console.log(JSON.stringify({ meshes }, null, 2));
