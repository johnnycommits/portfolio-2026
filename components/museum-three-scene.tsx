"use client";

import { Component, Suspense, useEffect, useMemo, useRef, type ReactNode } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Html, Lightformer, RoundedBox, useGLTF, useProgress, useTexture } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  Color,
  DoubleSide,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  NoColorSpace,
  Object3D,
  PerspectiveCamera,
  RepeatWrapping,
  SRGBColorSpace,
  SpotLight as ThreeSpotLight,
  type Texture,
} from "three";

type MuseumThreeSceneProps = {
  projectIds: string[];
  projects: Array<{ id: string; title: string; subtitle: string; index: string }>;
  hoveredId: string | null;
  selectedId: string | null;
  scrollProgress: number;
};

const MODEL_PATH = "/models/loomis/md84-armored-bronze.glb";
const FLOOR_TEXTURE_PATH = "/textures/dark-polished-concrete.png";

function bronzeMaterialFor(mesh: Mesh) {
  const source = Array.isArray(mesh.material) ? mesh.material[0] : mesh.material;
  const identity = `${mesh.name} ${source?.name ?? ""}`.toLowerCase();
  const isTire = /tire|tyre|rubber|wheel/.test(identity);
  const isGlass = /glass|window|windscreen/.test(identity);
  const isLight = /light|lamp|head/.test(identity);
  return new MeshPhysicalMaterial({
    color: new Color(isTire ? "#171310" : isGlass ? "#382922" : isLight ? "#f0b16b" : "#9d6034"),
    metalness: isTire ? 0.34 : 0.86,
    roughness: isTire ? 0.62 : isGlass ? 0.2 : 0.29,
    clearcoat: isGlass || isLight ? 0.9 : 0.34,
    clearcoatRoughness: 0.16,
    envMapIntensity: 1.25,
  });
}

function ArmoredTruck({ hovered }: { hovered: boolean }) {
  const { scene } = useGLTF(MODEL_PATH);
  const truckRef = useRef<Group>(null);
  const sculpture = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      object.material = bronzeMaterialFor(object);
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
    truckRef.current.rotation.y = MathUtils.damp(truckRef.current.rotation.y, hovered ? -0.24 : 0.07, 4.5, delta);
    truckRef.current.position.y = MathUtils.damp(truckRef.current.position.y, hovered ? 0.08 : 0, 5, delta);
  });

  return <group ref={truckRef}><primitive object={sculpture} scale={0.36} position={[0.18, 2.15, 0.3]} /></group>;
}

class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error("Unable to render the Loomis 3D model", error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function GlassCover({ lifted }: { lifted: boolean }) {
  const coverRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!coverRef.current) return;
    coverRef.current.position.y = MathUtils.damp(coverRef.current.position.y, lifted ? 4.9 : 0, 3.1, delta);
  });
  return (
    <group ref={coverRef}>
      <RoundedBox args={[2.16, 2.54, 1.84]} radius={0.035} smoothness={4} position={[0, 2.57, 0]}>
        <meshPhysicalMaterial
          color="#f0e6dc"
          transmission={0.9}
          thickness={0.055}
          roughness={0.045}
          metalness={0}
          ior={1.47}
          transparent
          opacity={0.11}
          depthWrite={false}
          clearcoat={1}
          clearcoatRoughness={0.045}
          attenuationColor="#f1d8c1"
          attenuationDistance={30}
          envMapIntensity={1.1}
          side={DoubleSide}
        />
        <Edges threshold={18} color="#e7b27e" opacity={0.42} transparent />
      </RoundedBox>
    </group>
  );
}

function Pedestal({ texture, bumpTexture }: { texture: Texture; bumpTexture: Texture }) {
  return (
    <group>
      <RoundedBox args={[2.22, 1.28, 1.9]} radius={0.026} smoothness={3} position={[0, 0.64, 0]} castShadow receiveShadow>
        <meshPhysicalMaterial
          map={texture}
          bumpMap={bumpTexture}
          bumpScale={0.018}
          color="#51473f"
          metalness={0.45}
          roughness={0.4}
          clearcoat={0.18}
          clearcoatRoughness={0.46}
          envMapIntensity={1.05}
        />
        <Edges threshold={30} color="#66503c" opacity={0.28} transparent />
      </RoundedBox>
      <mesh position={[0, 1.292, 0]} receiveShadow>
        <boxGeometry args={[2.2, 0.035, 1.88]} />
        <meshPhysicalMaterial color="#5a3924" metalness={0.76} roughness={0.22} clearcoat={0.35} />
      </mesh>
    </group>
  );
}

function GlobalSpotlight({ name, source, target }: {
  name: string;
  source: [number, number, number];
  target: [number, number, number];
}) {
  const lightRef = useRef<ThreeSpotLight>(null);
  const targetObject = useMemo(() => {
    const object = new Object3D();
    object.name = `${name}-target`;
    object.position.set(...target);
    return object;
  }, [name, target]);

  return (
    <>
      <spotLight
        name={name}
        ref={lightRef}
        target={targetObject}
        position={source}
        intensity={2200}
        distance={28}
        angle={0.5}
        penumbra={0.96}
        decay={2}
        color="#ffc28a"
        castShadow
        shadow-mapSize-width={2048}
        shadow-mapSize-height={2048}
        shadow-bias={-0.00018}
        shadow-normalBias={0.025}
      />
      <primitive object={targetObject} />
    </>
  );
}

function SceneIntroduction() {
  return (
    <Html center position={[0, 5.7, 0]} zIndexRange={[20, 20]} style={{ pointerEvents: "none" }}>
      <section className="scene-work-intro" aria-labelledby="selected-work-title">
        <span aria-hidden="true">01</span>
        <h1 id="selected-work-title">Selected Work</h1>
        <p className="eyebrow">Real problems. Real people. Real impact.</p>
        <i aria-hidden="true" />
        <p>A collection of products, experiences, and explorations built at the intersection<br className="scene-intro-wide-break" /> of design, engineering, and curiosity.</p>
      </section>
    </Html>
  );
}

function SceneExhibitLabel({ title, subtitle, index }: { title: string; subtitle: string; index: string }) {
  return (
    <Html center position={[0, -0.34, 0.5]} zIndexRange={[18, 18]} style={{ pointerEvents: "none" }}>
      <div className="scene-exhibit-label" aria-hidden="true">
        <span>
          <strong>{title}</strong>
          <small>{subtitle}</small>
        </span>
        <span className="scene-exhibit-index">{index}</span>
      </div>
    </Html>
  );
}

function Exhibit({ id, index, x, title, subtitle, displayIndex, hovered, selectedId, mobile, texture, bumpTexture }: {
  id: string;
  index: number;
  x: number;
  title: string;
  subtitle: string;
  displayIndex: string;
  hovered: boolean;
  selectedId: string | null;
  mobile: boolean;
  texture: Texture;
  bumpTexture: Texture;
}) {
  const groupRef = useRef<Group>(null);
  const { viewport, camera } = useThree();
  const selected = selectedId === id;
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const currentViewport = viewport.getCurrentViewport(camera, [0, 2, 0]);
    const selectedX = mobile ? 0 : -currentViewport.width * 0.235;
    const destination = selectedId ? (selected ? selectedX : x * 1.8) : x;
    groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, destination, 3.3, delta);
    groupRef.current.scale.setScalar(MathUtils.damp(groupRef.current.scale.x, selected ? 1.14 : 1, 3.3, delta));
  });
  const yaw = selectedId ? 0 : MathUtils.degToRad((index - 2.5) * 0.95);
  return (
    <group name={`exhibit-${id}`} ref={groupRef} position={[x, 0, 0]} rotation={[0, yaw, 0]}>
      <Pedestal texture={texture} bumpTexture={bumpTexture} />
      {id === "loomis-us" && (
        <ModelBoundary><Suspense fallback={null}><ArmoredTruck hovered={hovered} /></Suspense></ModelBoundary>
      )}
      <GlassCover lifted={selected} />
      {!selectedId && <SceneExhibitLabel title={title} subtitle={subtitle} index={displayIndex} />}
    </group>
  );
}

function CameraRig({ selectedId }: { selectedId: string | null }) {
  const { camera, size } = useThree();
  useFrame((_, delta) => {
    const perspectiveCamera = camera as PerspectiveCamera;
    const mobile = size.width <= 900;
    const targetZ = mobile ? (selectedId ? 8.6 : 9.5) : (selectedId ? 10.2 : 18.5);
    const targetY = mobile ? 1.75 : 1.85;
    perspectiveCamera.position.z = MathUtils.damp(perspectiveCamera.position.z, targetZ, 3.2, delta);
    perspectiveCamera.position.y = MathUtils.damp(perspectiveCamera.position.y, targetY, 3.2, delta);
    perspectiveCamera.lookAt(0, mobile ? 3.05 : 3.35, 0);
    perspectiveCamera.updateProjectionMatrix();
  });
  return null;
}

function MuseumWorld({ projectIds, projects, hoveredId, selectedId, scrollProgress }: MuseumThreeSceneProps) {
  const { size } = useThree();
  const mobile = size.width <= 900;
  const sourceTexture = useTexture(FLOOR_TEXTURE_PATH);
  const floorTexture = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const floorBump = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const pedestalTexture = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const pedestalBump = useMemo(() => sourceTexture.clone(), [sourceTexture]);

  useEffect(() => {
    [floorTexture, floorBump, pedestalTexture, pedestalBump].forEach((texture) => {
      texture.wrapS = RepeatWrapping;
      texture.wrapT = RepeatWrapping;
      texture.needsUpdate = true;
    });
    floorTexture.colorSpace = SRGBColorSpace;
    floorTexture.repeat.set(7, 4);
    floorBump.colorSpace = NoColorSpace;
    floorBump.repeat.set(7, 4);
    pedestalTexture.colorSpace = SRGBColorSpace;
    pedestalTexture.repeat.set(1.2, 1.2);
    pedestalBump.colorSpace = NoColorSpace;
    pedestalBump.repeat.set(1.2, 1.2);
    return () => {
      floorTexture.dispose();
      floorBump.dispose();
      pedestalTexture.dispose();
      pedestalBump.dispose();
    };
  }, [floorTexture, floorBump, pedestalTexture, pedestalBump]);

  const spacing = mobile ? 2.7 : 2.48;
  const mobileOffset = scrollProgress * spacing * (projectIds.length - 1);
  return (
    <>
      <CameraRig selectedId={selectedId} />
      {!selectedId && <SceneIntroduction />}
      <fog attach="fog" args={["#030303", 15, 34]} />
      <mesh name="museum-back-wall" position={[0, 5.1, -5]} receiveShadow>
        <planeGeometry args={[44, 16]} />
        <meshBasicMaterial color="#030303" />
      </mesh>
      <ambientLight name="museum-fill" intensity={0.28} color="#9d8a78" />
      <hemisphereLight name="ceiling-fill" args={["#bba995", "#160d08", 0.46]} />
      <directionalLight name="front-fill" position={[0, 5.5, 10]} intensity={0.52} color="#b58f70" />
      <GlobalSpotlight name="left-overhead-spot" source={[-5.4, 10.8, 4.8]} target={[-3.25, 0.15, 1.65]} />
      <GlobalSpotlight name="right-overhead-spot" source={[5.4, 10.8, 4.8]} target={[3.25, 0.15, 1.65]} />
      <Environment resolution={192}>
        <Lightformer intensity={4.2} color="#ffd0a3" position={[0, 8, -2]} scale={[13, 1.2, 1]} />
        <Lightformer intensity={2.4} color="#aec4d1" position={[-10, 3, 2]} rotation-y={Math.PI / 2} scale={[7, 1.5, 1]} />
        <Lightformer intensity={3} color="#d78549" position={[10, 2, 1]} rotation-y={-Math.PI / 2} scale={[6, 1.5, 1]} />
      </Environment>
      <mesh name="museum-floor" rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.015, 0]} receiveShadow>
        <planeGeometry args={[46, 28]} />
        <meshPhysicalMaterial
          map={floorTexture}
          bumpMap={floorBump}
          bumpScale={0.045}
          color="#8a817a"
          metalness={0.28}
          roughness={0.46}
          clearcoat={0.24}
          clearcoatRoughness={0.42}
          envMapIntensity={0.68}
        />
      </mesh>
      <group position={[mobile && !selectedId ? -mobileOffset : 0, 0, 0]}>
        {projectIds.map((id, index) => {
          const x = mobile ? index * spacing : (index - (projectIds.length - 1) / 2) * spacing;
          const project = projects.find((candidate) => candidate.id === id);
          return (
            <Exhibit
              key={id}
              id={id}
              index={index}
              x={x}
              title={project?.title ?? id}
              subtitle={project?.subtitle ?? ""}
              displayIndex={project?.index ?? String(index + 1).padStart(2, "0")}
              hovered={hoveredId === id}
              selectedId={selectedId}
              mobile={mobile}
              texture={pedestalTexture}
              bumpTexture={pedestalBump}
            />
          );
        })}
      </group>
    </>
  );
}

function LoadingStatus() {
  const { active, progress, errors } = useProgress();
  if (errors.length > 0) return <span className="museum-model-status is-error">Model unavailable</span>;
  if (!active) return null;
  return <span className="museum-model-status">Loading sculpture {Math.round(progress)}%</span>;
}

export function MuseumThreeScene(props: MuseumThreeSceneProps) {
  return (
    <div className="museum-three-world">
      <Canvas
        shadows="percentage"
        dpr={[1, 1.5]}
        camera={{ position: [0, 1.85, 18.5], fov: 28, near: 0.1, far: 60 }}
        gl={{ alpha: true, antialias: true, powerPreference: "default" }}
        onCreated={({ gl, camera }) => {
          gl.domElement.setAttribute("aria-hidden", "true");
          gl.outputColorSpace = SRGBColorSpace;
          gl.toneMapping = ACESFilmicToneMapping;
          gl.toneMappingExposure = 1.18;
          camera.lookAt(0, 3.35, 0);
        }}
        fallback={<span className="museum-model-status is-error">3D preview unavailable</span>}
      >
        <Suspense fallback={null}><MuseumWorld {...props} /></Suspense>
      </Canvas>
      <LoadingStatus />
    </div>
  );
}

useGLTF.preload(MODEL_PATH);
useTexture.preload(FLOOR_TEXTURE_PATH);
