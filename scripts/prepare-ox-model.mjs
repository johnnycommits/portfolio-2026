import { NodeIO } from "@gltf-transform/core";
import { dedup, prune, simplify, weld } from "@gltf-transform/functions";
import { MeshoptSimplifier } from "meshoptimizer";

const [input, output, cutoffArg = "4.58"] = process.argv.slice(2);
const cutoff = Number(cutoffArg);

if (!input || !output || !Number.isFinite(cutoff)) {
  throw new Error("Usage: node scripts/prepare-ox-model.mjs <input.glb> <output.glb> [cutoff-y]");
}

const io = new NodeIO();
const document = await io.read(input);
const root = document.getRoot();
const primitive = root.listMeshes()[0]?.listPrimitives()[0];

if (!primitive || primitive.getMode() !== 4) {
  throw new Error("Expected one indexed triangle primitive.");
}

const positionAccessor = primitive.getAttribute("POSITION");
const uvAccessor = primitive.getAttribute("TEXCOORD_0");
const indexAccessor = primitive.getIndices();

if (!positionAccessor || !indexAccessor) {
  throw new Error("The source mesh must include positions and indices.");
}

const positions = positionAccessor.getArray();
const uvs = uvAccessor?.getArray() ?? null;
const indices = indexAccessor.getArray();
const sourceToOutput = new Int32Array(positionAccessor.getCount()).fill(-1);
const edgeToOutput = new Map();
const outputPositions = [];
const outputUvs = [];
const outputIndices = [];

function sourceVertex(sourceIndex) {
  return {
    sourceIndex,
    edgeKey: null,
    position: [
      positions[sourceIndex * 3],
      positions[sourceIndex * 3 + 1],
      positions[sourceIndex * 3 + 2],
    ],
    uv: uvs ? [uvs[sourceIndex * 2], uvs[sourceIndex * 2 + 1]] : null,
  };
}

function intersection(a, b) {
  const low = Math.min(a.sourceIndex, b.sourceIndex);
  const high = Math.max(a.sourceIndex, b.sourceIndex);
  const edgeKey = `${low}:${high}`;
  const deltaY = b.position[1] - a.position[1];
  const t = deltaY === 0 ? 0 : (cutoff - a.position[1]) / deltaY;

  return {
    sourceIndex: -1,
    edgeKey,
    position: [
      a.position[0] + (b.position[0] - a.position[0]) * t,
      cutoff,
      a.position[2] + (b.position[2] - a.position[2]) * t,
    ],
    uv:
      a.uv && b.uv
        ? [a.uv[0] + (b.uv[0] - a.uv[0]) * t, a.uv[1] + (b.uv[1] - a.uv[1]) * t]
        : null,
  };
}

function clipTriangle(vertices) {
  const clipped = [];
  for (let index = 0; index < vertices.length; index += 1) {
    const current = vertices[index];
    const next = vertices[(index + 1) % vertices.length];
    const currentInside = current.position[1] >= cutoff;
    const nextInside = next.position[1] >= cutoff;

    if (currentInside) clipped.push(current);
    if (currentInside !== nextInside) clipped.push(intersection(current, next));
  }
  return clipped;
}

function outputIndex(vertex) {
  if (vertex.sourceIndex >= 0) {
    const existing = sourceToOutput[vertex.sourceIndex];
    if (existing >= 0) return existing;
  } else {
    const existing = edgeToOutput.get(vertex.edgeKey);
    if (existing !== undefined) return existing;
  }

  const created = outputPositions.length / 3;
  outputPositions.push(...vertex.position);
  if (vertex.uv) outputUvs.push(...vertex.uv);

  if (vertex.sourceIndex >= 0) sourceToOutput[vertex.sourceIndex] = created;
  else edgeToOutput.set(vertex.edgeKey, created);

  return created;
}

function addSmoothNormals(targetPrimitive) {
  const targetPositions = targetPrimitive.getAttribute("POSITION");
  const targetIndices = targetPrimitive.getIndices();
  if (!targetPositions || !targetIndices) return;

  const positionArray = targetPositions.getArray();
  const indexArray = targetIndices.getArray();
  const normalArray = new Float32Array(targetPositions.getCount() * 3);

  for (let index = 0; index < indexArray.length; index += 3) {
    const a = indexArray[index] * 3;
    const b = indexArray[index + 1] * 3;
    const c = indexArray[index + 2] * 3;
    const abx = positionArray[b] - positionArray[a];
    const aby = positionArray[b + 1] - positionArray[a + 1];
    const abz = positionArray[b + 2] - positionArray[a + 2];
    const acx = positionArray[c] - positionArray[a];
    const acy = positionArray[c + 1] - positionArray[a + 1];
    const acz = positionArray[c + 2] - positionArray[a + 2];
    const nx = aby * acz - abz * acy;
    const ny = abz * acx - abx * acz;
    const nz = abx * acy - aby * acx;

    for (const vertex of [a, b, c]) {
      normalArray[vertex] += nx;
      normalArray[vertex + 1] += ny;
      normalArray[vertex + 2] += nz;
    }
  }

  for (let index = 0; index < normalArray.length; index += 3) {
    const length = Math.hypot(normalArray[index], normalArray[index + 1], normalArray[index + 2]) || 1;
    normalArray[index] /= length;
    normalArray[index + 1] /= length;
    normalArray[index + 2] /= length;
  }

  targetPrimitive.setAttribute(
    "NORMAL",
    document.createAccessor("Ox smooth normals").setType("VEC3").setArray(normalArray),
  );
}

for (let index = 0; index < indices.length; index += 3) {
  const clipped = clipTriangle([
    sourceVertex(indices[index]),
    sourceVertex(indices[index + 1]),
    sourceVertex(indices[index + 2]),
  ]);

  if (clipped.length < 3) continue;
  const first = outputIndex(clipped[0]);
  for (let vertex = 1; vertex < clipped.length - 1; vertex += 1) {
    outputIndices.push(first, outputIndex(clipped[vertex]), outputIndex(clipped[vertex + 1]));
  }
}

positionAccessor.setArray(new Float32Array(outputPositions));
indexAccessor.setArray(new Uint32Array(outputIndices));

// The exhibit uses a custom metal material, so the large scan texture and its UV
// seams are intentionally removed. This also makes aggressive simplification safer.
if (uvAccessor) primitive.setAttribute("TEXCOORD_0", null);
const metal = document
  .createMaterial("Eleox dark bronze")
  .setBaseColorFactor([0.055, 0.065, 0.075, 1])
  .setMetallicFactor(0.92)
  .setRoughnessFactor(0.29);
primitive.setMaterial(metal);

await document.transform(
  weld({ tolerance: 0.00001 }),
  simplify({ simplifier: MeshoptSimplifier, ratio: 0.12, error: 0.02, lockBorder: true }),
);

for (const mesh of root.listMeshes()) {
  for (const meshPrimitive of mesh.listPrimitives()) addSmoothNormals(meshPrimitive);
}

await document.transform(dedup(), prune());

await io.write(output, document);

const finalPrimitive = root.listMeshes()[0]?.listPrimitives()[0];
const finalPosition = finalPrimitive?.getAttribute("POSITION");
const finalIndices = finalPrimitive?.getIndices();
console.log(
  JSON.stringify(
    {
      cutoff,
      vertices: finalPosition?.getCount() ?? 0,
      triangles: finalIndices
        ? Math.floor(finalIndices.getCount() / 3)
        : Math.floor((finalPosition?.getCount() ?? 0) / 3),
    },
    null,
    2,
  ),
);
