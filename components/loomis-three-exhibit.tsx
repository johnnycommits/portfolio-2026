"use client";

import { Suspense, useEffect, useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { ContactShadows, Edges, Environment, Lightformer, useGLTF } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  Group,
  MathUtils,
  Mesh,
  Object3D,
  SRGBColorSpace,
} from "three";
import { metallicExhibitMaterialFor } from "./exhibit-metal-material";

type LoomisThreeExhibitProps = {
  hovered: boolean;
  selected: boolean;
};

const MODEL_PATH = "/models/loomis/md84-armored-bronze.glb";

function ArmoredTruck({ hovered }: { hovered: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const truckRef = useRef<Group>(null);
  const sculpture = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      object.material = metallicExhibitMaterialFor(object);
      object.castShadow = true;
      object.receiveShadow = true;
    });
    return clone;
  }, [scene]);

  useEffect(() => () => {
    sculpture.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      const materials = Array.isArray(object.material) ? object.material : [object.material];
      materials.forEach((material) => material.dispose());
    });
  }, [sculpture]);

  useFrame((_, delta) => {
    if (!truckRef.current) return;
    truckRef.current.rotation.y = MathUtils.damp(
      truckRef.current.rotation.y,
      hovered ? -0.22 : 0.08,
      4.5,
      delta,
    );
    truckRef.current.position.y = MathUtils.damp(
      truckRef.current.position.y,
      hovered ? 0.08 : 0,
      5,
      delta,
    );
  });

  return (
    <group ref={truckRef} position={[0, 0, 0]}>
      <primitive
        object={sculpture}
        scale={0.46}
        position={[0.237, 0.509, 0.383]}
      />
    </group>
  );
}

function GlassCover({ selected }: { selected: boolean }) {
  const glassRef = useRef<Group>(null);

  useFrame((_, delta) => {
    if (!glassRef.current) return;
    glassRef.current.position.y = MathUtils.damp(
      glassRef.current.position.y,
      selected ? 4.7 : 0,
      3.2,
      delta,
    );
  });

  return (
    <group ref={glassRef}>
      <mesh position={[0, 1.72, 0]} castShadow>
        <boxGeometry args={[3.8, 4.45, 3.4]} />
        <meshPhysicalMaterial
          color="#f6d5b6"
          transparent
          opacity={0.12}
          transmission={0.88}
          thickness={0.09}
          roughness={0.12}
          metalness={0.02}
          ior={1.48}
          depthWrite={false}
        />
        <Edges threshold={15} color="#e8b47e" opacity={0.58} transparent />
      </mesh>
    </group>
  );
}

function ExhibitScene({ hovered, selected }: LoomisThreeExhibitProps) {
  return (
    <>
      <ambientLight intensity={1.18} color="#c8b5a1" />
      <hemisphereLight args={["#f0d4b8", "#140d09", 1.1]} />
      <spotLight
        position={[-4.5, 7.5, 6]}
        intensity={210}
        angle={0.42}
        penumbra={0.75}
        color="#ffc58b"
        castShadow
      />
      <spotLight position={[5, 4, -3]} intensity={125} angle={0.55} penumbra={0.9} color="#8da8bd" />
      <pointLight position={[0, -0.15, 2.8]} intensity={28} color="#d88945" />
      <Environment resolution={128}>
        <Lightformer intensity={5.5} color="#fff1e5" position={[-4.5, 3.2, 4]} scale={[0.16, 5.5, 1]} />
        <Lightformer intensity={4.2} color="#d6e2e8" position={[4.8, 2.8, 2]} rotation-y={-Math.PI / 2} scale={[5, 0.7, 1]} />
        <Lightformer intensity={6.4} color="#ffc28c" position={[0, 6.5, 3]} scale={[8, 0.2, 1]} />
        <Lightformer intensity={3.6} color="#c77b43" position={[4.2, 1.2, 4]} scale={[0.12, 3.8, 1]} />
      </Environment>

      <group rotation={[0, -0.16, 0]} position={[0, -0.42, 0]}>
        <mesh position={[0, -1.02, 0]} receiveShadow castShadow>
          <boxGeometry args={[3.8, 1.2, 3.4]} />
          <meshStandardMaterial color="#090807" metalness={0.72} roughness={0.28} />
          <Edges threshold={28} color="#806447" opacity={0.34} transparent />
        </mesh>
        <mesh position={[0, -0.405, 0]} receiveShadow>
          <boxGeometry args={[3.8, 0.035, 3.4]} />
          <meshStandardMaterial color="#17120e" metalness={0.88} roughness={0.2} />
        </mesh>

        <Suspense fallback={null}>
          <ArmoredTruck hovered={hovered} />
        </Suspense>
        <GlassCover selected={selected} />
      </group>

      <ContactShadows
        position={[0, -1.96, 0]}
        opacity={0.72}
        scale={8}
        blur={2.6}
        far={5}
        color="#000000"
      />
    </>
  );
}

export function LoomisThreeExhibit(props: LoomisThreeExhibitProps) {
  return (
    <span className="three-exhibit" aria-hidden="true">
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [6.4, 4.2, 8.6], fov: 28, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.06;
        }}
      >
        <ExhibitScene {...props} />
      </Canvas>
    </span>
  );
}

useGLTF.preload(MODEL_PATH);
