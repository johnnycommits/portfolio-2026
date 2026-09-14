import { NodeIO } from "@gltf-transform/core";
import { dedup, prune } from "@gltf-transform/functions";

const [input, output] = process.argv.slice(2);

if (!input || !output) {
  throw new Error("Usage: node scripts/prepare-metallic-model.mjs <input.glb> <output.glb>");
}

const io = new NodeIO();
const document = await io.read(input);
const root = document.getRoot();

for (const mesh of root.listMeshes()) {
  for (const primitive of mesh.listPrimitives()) {
    primitive.setMaterial(null);
  }
}

await document.transform(dedup(), prune());
await io.write(output, document);

const bytes = root
  .listMeshes()
  .flatMap((mesh) => mesh.listPrimitives())
  .reduce((total, primitive) => total + (primitive.getIndices()?.getCount() ?? 0), 0);

console.log(`Prepared ${output} (${bytes} indices, runtime material)`);
