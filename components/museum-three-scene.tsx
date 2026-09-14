"use client";

import { Component, Suspense, useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { Edges, Environment, Html, Lightformer, MeshTransmissionMaterial, RoundedBox, SpotLight as VolumetricSpotLight, useDepthBuffer, useGLTF, useProgress, useTexture } from "@react-three/drei";
import {
  ACESFilmicToneMapping,
  AdditiveBlending,
  CanvasTexture,
  DoubleSide,
  type DepthTexture,
  Group,
  MathUtils,
  Mesh,
  MeshPhysicalMaterial,
  NoColorSpace,
  Object3D,
  PerspectiveCamera,
  RepeatWrapping,
  Shape,
  SRGBColorSpace,
  SpotLight as ThreeSpotLight,
  type Texture,
} from "three";
import { metallicExhibitMaterialFor } from "./exhibit-metal-material";

type MuseumThreeSceneProps = {
  projectIds: string[];
  projects: Array<{ id: string; title: string; subtitle: string; index: string }>;
  hoveredId: string | null;
  selectedId: string | null;
  rotationResetToken: number;
  scrollProgress: number;
};

const MODEL_PATH = "/models/loomis/md84-armored-bronze.glb";
const OX_MODEL_PATH = "/models/eleox/ox-bronze.glb?v=smooth-300k";
const HARD_HAT_MODEL_PATH = "/models/chevron/safety-helmet.glb";
const ANVIL_MODEL_PATH = "/models/champion-labs/anvil.glb";
const FLOOR_TEXTURE_PATH = "/textures/dark-polished-concrete.png";
const TURNTABLE_RADIANS_PER_SECOND = (Math.PI * 2) / 18;

function nearestEquivalentAngle(current: number, displayAngle: number) {
  return current + MathUtils.euclideanModulo(displayAngle - current + Math.PI, Math.PI * 2) - Math.PI;
}

function usePrefersReducedMotion() {
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setPrefersReducedMotion(query.matches);
    updatePreference();
    query.addEventListener("change", updatePreference);
    return () => query.removeEventListener("change", updatePreference);
  }, []);

  return prefersReducedMotion;
}

function useTurntableMotion({
  groupRef,
  rotating,
  resetToken,
  displayAngle,
  restingY,
  hoveredY,
  reduceMotion,
}: {
  groupRef: RefObject<Group | null>;
  rotating: boolean;
  resetToken: number;
  displayAngle: number;
  restingY: number;
  hoveredY: number;
  reduceMotion: boolean;
}) {
  const previousResetToken = useRef(resetToken);
  const resetTarget = useRef(displayAngle);
  const resetting = useRef(false);

  useEffect(() => {
    if (previousResetToken.current === resetToken) return;
    previousResetToken.current = resetToken;
    if (!groupRef.current) return;
    resetTarget.current = nearestEquivalentAngle(groupRef.current.rotation.y, displayAngle);
    resetting.current = true;
  }, [displayAngle, groupRef, resetToken]);

  useFrame((_, delta) => {
    const group = groupRef.current;
    if (!group) return;

    if (resetting.current) {
      if (reduceMotion) {
        group.rotation.y = resetTarget.current;
        resetting.current = false;
      } else {
        group.rotation.y = MathUtils.damp(group.rotation.y, resetTarget.current, 5.2, delta);
        if (Math.abs(group.rotation.y - resetTarget.current) < 0.001) {
          group.rotation.y = resetTarget.current;
          resetting.current = false;
        }
      }
    } else if (rotating && !reduceMotion) {
      group.rotation.y += TURNTABLE_RADIANS_PER_SECOND * Math.min(delta, 0.05);
    }

    group.position.y = MathUtils.damp(
      group.position.y,
      rotating && !reduceMotion ? hoveredY : restingY,
      5,
      delta,
    );
  });
}

type SculptureInteractionProps = {
  rotating: boolean;
  resetToken: number;
  reduceMotion: boolean;
};

function ArmoredTruck({ rotating, resetToken, reduceMotion }: SculptureInteractionProps) {
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

  useTurntableMotion({
    groupRef: truckRef,
    rotating,
    resetToken,
    displayAngle: 0.07,
    restingY: 0,
    hoveredY: 0.08,
    reduceMotion,
  });

  return <group ref={truckRef}><primitive object={sculpture} scale={0.36} position={[0.18, 2.15, 0.3]} /></group>;
}

function OxSculpture({ rotating, resetToken, reduceMotion }: SculptureInteractionProps) {
  const { scene } = useGLTF(OX_MODEL_PATH);
  const oxRef = useRef<Group>(null);
  const sculpture = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      object.material = new MeshPhysicalMaterial({
        color: "#25211f",
        metalness: 0.88,
        roughness: 0.34,
        clearcoat: 0.14,
        clearcoatRoughness: 0.3,
        envMapIntensity: 1.15,
        side: DoubleSide,
      });
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

  useTurntableMotion({
    groupRef: oxRef,
    rotating,
    resetToken,
    displayAngle: Math.PI / 2 + 0.07,
    restingY: 0.65,
    hoveredY: 0.71,
    reduceMotion,
  });

  return (
    <group ref={oxRef} position={[0.03, 0.65, -0.13]} rotation={[0, Math.PI / 2 + 0.07, 0]}>
      <primitive object={sculpture} scale={0.145} />
    </group>
  );
}

function HardHatSculpture({ rotating, resetToken, reduceMotion }: SculptureInteractionProps) {
  const { scene } = useGLTF(HARD_HAT_MODEL_PATH);
  const helmetRef = useRef<Group>(null);
  const sculpture = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      object.material = new MeshPhysicalMaterial({
        color: "#463c36",
        metalness: 0.92,
        roughness: 0.28,
        clearcoat: 0.2,
        clearcoatRoughness: 0.22,
        envMapIntensity: 1.9,
        side: DoubleSide,
      });
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

  useTurntableMotion({
    groupRef: helmetRef,
    rotating,
    resetToken,
    displayAngle: -0.36,
    restingY: 1.57,
    hoveredY: 1.64,
    reduceMotion,
  });

  return (
    <group ref={helmetRef} position={[0.02, 1.57, 0.03]} rotation={[0, -0.36, 0]}>
      <primitive object={sculpture} scale={0.58} />
    </group>
  );
}

function ChampionAnvil({ rotating, resetToken, reduceMotion }: SculptureInteractionProps) {
  const { scene } = useGLTF(ANVIL_MODEL_PATH);
  const anvilRef = useRef<Group>(null);
  const sculpture = useMemo(() => {
    const clone = scene.clone(true);
    clone.traverse((object: Object3D) => {
      if (!(object instanceof Mesh)) return;
      object.material = new MeshPhysicalMaterial({
        color: "#403934",
        metalness: 0.94,
        roughness: 0.24,
        clearcoat: 0.16,
        clearcoatRoughness: 0.2,
        envMapIntensity: 1.85,
        side: DoubleSide,
      });
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

  useTurntableMotion({
    groupRef: anvilRef,
    rotating,
    resetToken,
    displayAngle: Math.PI / 2 + 0.08,
    restingY: 1.31,
    hoveredY: 1.39,
    reduceMotion,
  });

  return (
    <group ref={anvilRef} position={[0, 1.31, 0]} rotation={[0, Math.PI / 2 + 0.08, 0]}>
      <primitive object={sculpture} scale={0.0072} />
    </group>
  );
}

function AdceteraMark({ rotating, resetToken, reduceMotion }: SculptureInteractionProps) {
  const markRef = useRef<Group>(null);
  const shape = useMemo(() => {
    const mark = new Shape();
    mark.moveTo(0, 1.92);
    mark.lineTo(0.86, 0);
    mark.lineTo(0.49, 0);
    mark.lineTo(0, 1.12);
    mark.lineTo(-0.49, 0);
    mark.lineTo(-0.86, 0);
    mark.closePath();
    return mark;
  }, []);
  const extrudeSettings = useMemo(
    () => ({
      depth: 0.48,
      bevelEnabled: true,
      bevelThickness: 0.045,
      bevelSize: 0.035,
      bevelSegments: 5,
      curveSegments: 1,
      steps: 1,
    }),
    [],
  );

  useTurntableMotion({
    groupRef: markRef,
    rotating,
    resetToken,
    displayAngle: 0.08,
    restingY: 1.36,
    hoveredY: 1.44,
    reduceMotion,
  });

  return (
    <group ref={markRef} position={[0, 1.36, 0]} rotation={[0, 0.08, 0]} scale={0.42}>
      <mesh position={[0, 0, -0.24]} castShadow receiveShadow>
        <extrudeGeometry args={[shape, extrudeSettings]} />
        <meshPhysicalMaterial
          color="#575553"
          metalness={0.97}
          roughness={0.17}
          anisotropy={0.48}
          anisotropyRotation={Math.PI / 2}
          clearcoat={0.1}
          clearcoatRoughness={0.16}
          envMapIntensity={2.25}
        />
        <Edges threshold={24} color="#b7906d" opacity={0.3} transparent />
      </mesh>
    </group>
  );
}

class ModelBoundary extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() { return { failed: true }; }
  componentDidCatch(error: Error) { console.error("Unable to render the exhibit 3D model", error); }
  render() { return this.state.failed ? null : this.props.children; }
}

function createGlassSheenTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 512;
  canvas.height = 512;
  const context = canvas.getContext("2d");
  if (context) {
    const sheen = context.createLinearGradient(0, 512, 512, 0);
    sheen.addColorStop(0, "rgba(255,255,255,0)");
    sheen.addColorStop(0.18, "rgba(255,238,222,0.02)");
    sheen.addColorStop(0.28, "rgba(255,244,232,0.34)");
    sheen.addColorStop(0.36, "rgba(255,255,255,0.055)");
    sheen.addColorStop(0.54, "rgba(255,255,255,0)");
    sheen.addColorStop(0.69, "rgba(235,180,130,0.14)");
    sheen.addColorStop(0.78, "rgba(255,255,255,0)");
    context.fillStyle = sheen;
    context.fillRect(0, 0, 512, 512);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function createGlassGlintTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 128;
  canvas.height = 128;
  const context = canvas.getContext("2d");
  if (context) {
    const glow = context.createRadialGradient(64, 64, 0, 64, 64, 64);
    glow.addColorStop(0, "rgba(255,255,255,1)");
    glow.addColorStop(0.08, "rgba(255,226,194,.95)");
    glow.addColorStop(0.3, "rgba(232,164,104,.28)");
    glow.addColorStop(1, "rgba(0,0,0,0)");
    context.fillStyle = glow;
    context.fillRect(0, 0, 128, 128);
  }
  const texture = new CanvasTexture(canvas);
  texture.colorSpace = SRGBColorSpace;
  return texture;
}

function GlassCover({ lifted, sheenTexture, glintTexture }: {
  lifted: boolean;
  sheenTexture: Texture;
  glintTexture: Texture;
}) {
  const coverRef = useRef<Group>(null);
  useFrame((_, delta) => {
    if (!coverRef.current) return;
    coverRef.current.position.y = MathUtils.damp(coverRef.current.position.y, lifted ? 4.9 : 0, 3.1, delta);
  });
  return (
    <group name="glass-cover" ref={coverRef}>
      <RoundedBox args={[2.16, 1.4, 1.84]} radius={0.035} smoothness={4} position={[0, 2.01, 0]}>
        <MeshTransmissionMaterial
          transmissionSampler
          samples={8}
          color="#f7e9dc"
          transmission={1}
          thickness={0.075}
          roughness={0.018}
          ior={1.47}
          chromaticAberration={0.008}
          anisotropy={0.12}
          anisotropicBlur={0.06}
          distortion={0.018}
          distortionScale={0.05}
          clearcoat={1}
          clearcoatRoughness={0.008}
          attenuationColor="#f4d7ba"
          attenuationDistance={18}
          envMapIntensity={1.8}
          side={DoubleSide}
        />
        <Edges threshold={18} color="#f4c89e" opacity={0.68} transparent />
      </RoundedBox>
      <mesh name="glass-front-sheen" position={[0, 2.01, 0.926]}>
        <planeGeometry args={[2.08, 1.32]} />
        <meshBasicMaterial
          map={sheenTexture}
          transparent
          opacity={0.42}
          depthWrite={false}
          toneMapped={false}
          blending={AdditiveBlending}
        />
      </mesh>
      {[
        [-1.04, 2.66, 0.95, 0.2],
        [1.04, 2.66, 0.95, 0.14],
        [-1.04, 1.34, 0.95, 0.12],
        [1.04, 1.34, 0.95, 0.17],
      ].map(([x, y, z, size], index) => (
        <sprite key={index} position={[x, y, z]} scale={[size, size, 1]}>
          <spriteMaterial
            map={glintTexture}
            color="#ffd3a8"
            transparent
            opacity={0.82}
            depthWrite={false}
            toneMapped={false}
            blending={AdditiveBlending}
          />
        </sprite>
      ))}
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

function GlobalSpotlight({ name, source, target, depthBuffer }: {
  name: string;
  source: [number, number, number];
  target: [number, number, number];
  depthBuffer: DepthTexture;
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
      <VolumetricSpotLight
        name={name}
        ref={lightRef}
        target={targetObject}
        position={source}
        intensity={2380}
        distance={15}
        angle={0.5}
        penumbra={0.96}
        decay={2}
        color="#ffdec2"
        volumetric
        depthBuffer={depthBuffer}
        opacity={0.145}
        attenuation={20}
        anglePower={3.6}
        radiusTop={0.08}
        radiusBottom={3.15}
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

function SceneIntroduction({ mobile }: { mobile: boolean }) {
  const anchoredY = mobile ? 5.1 : 4.3;
  return (
    <Html center position={[0, anchoredY, 0]} zIndexRange={[20, 20]} style={{ pointerEvents: "none" }}>
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

function Exhibit({ id, index, projectCount, x, title, subtitle, displayIndex, hovered, selectedId, mobile, reduceMotion, rotationResetToken, texture, bumpTexture, glassSheenTexture, glassGlintTexture }: {
  id: string;
  index: number;
  projectCount: number;
  x: number;
  title: string;
  subtitle: string;
  displayIndex: string;
  hovered: boolean;
  selectedId: string | null;
  mobile: boolean;
  reduceMotion: boolean;
  rotationResetToken: number;
  texture: Texture;
  bumpTexture: Texture;
  glassSheenTexture: Texture;
  glassGlintTexture: Texture;
}) {
  const groupRef = useRef<Group>(null);
  const { viewport, camera } = useThree();
  const selected = selectedId === id;
  const rotating = hovered && !mobile;
  useFrame((_, delta) => {
    if (!groupRef.current) return;
    const currentViewport = viewport.getCurrentViewport(camera, [0, 2, 0]);
    const selectedX = mobile ? 0 : -currentViewport.width * 0.235;
    const destination = selectedId ? (selected ? selectedX : x * 1.8) : x;
    groupRef.current.position.x = MathUtils.damp(groupRef.current.position.x, destination, 3.3, delta);
    groupRef.current.scale.setScalar(MathUtils.damp(groupRef.current.scale.x, selected ? 1.14 : 1, 3.3, delta));
  });
  const yaw = selectedId ? 0 : MathUtils.degToRad((index - (projectCount - 1) / 2) * 0.95);
  return (
    <group name={`exhibit-${id}`} ref={groupRef} position={[x, 0, 0]} rotation={[0, yaw, 0]}>
      <Pedestal texture={texture} bumpTexture={bumpTexture} />
      {(!selectedId || selected) && id === "champion-labs" && (
        <ModelBoundary><Suspense fallback={null}><ChampionAnvil rotating={rotating} resetToken={rotationResetToken} reduceMotion={reduceMotion} /></Suspense></ModelBoundary>
      )}
      {(!selectedId || selected) && id === "loomis-us" && (
        <ModelBoundary><Suspense fallback={null}><ArmoredTruck rotating={rotating} resetToken={rotationResetToken} reduceMotion={reduceMotion} /></Suspense></ModelBoundary>
      )}
      {(!selectedId || selected) && id === "eleox" && (
        <ModelBoundary><Suspense fallback={null}><OxSculpture rotating={rotating} resetToken={rotationResetToken} reduceMotion={reduceMotion} /></Suspense></ModelBoundary>
      )}
      {(!selectedId || selected) && id === "adcetera" && <AdceteraMark rotating={rotating} resetToken={rotationResetToken} reduceMotion={reduceMotion} />}
      {(!selectedId || selected) && id === "chevron" && (
        <ModelBoundary><Suspense fallback={null}><HardHatSculpture rotating={rotating} resetToken={rotationResetToken} reduceMotion={reduceMotion} /></Suspense></ModelBoundary>
      )}
      <GlassCover lifted={selected} sheenTexture={glassSheenTexture} glintTexture={glassGlintTexture} />
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
    const lookAtY = mobile
      ? (selectedId ? 3.05 : 2.45)
      : (selectedId ? 3.35 : 1.95);
    perspectiveCamera.position.z = MathUtils.damp(perspectiveCamera.position.z, targetZ, 3.2, delta);
    perspectiveCamera.position.y = MathUtils.damp(perspectiveCamera.position.y, targetY, 3.2, delta);
    perspectiveCamera.lookAt(0, lookAtY, 0);
    perspectiveCamera.updateProjectionMatrix();
  });
  return null;
}

function MuseumWorld({ projectIds, projects, hoveredId, selectedId, rotationResetToken, scrollProgress }: MuseumThreeSceneProps) {
  const { size } = useThree();
  const mobile = size.width <= 900;
  const reduceMotion = usePrefersReducedMotion();
  const depthBuffer = useDepthBuffer({ size: mobile ? 256 : 512, frames: Infinity });
  const sourceTexture = useTexture(FLOOR_TEXTURE_PATH);
  const floorTexture = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const floorBump = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const pedestalTexture = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const pedestalBump = useMemo(() => sourceTexture.clone(), [sourceTexture]);
  const glassSheenTexture = useMemo(createGlassSheenTexture, []);
  const glassGlintTexture = useMemo(createGlassGlintTexture, []);

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
      glassSheenTexture.dispose();
      glassGlintTexture.dispose();
    };
  }, [floorTexture, floorBump, pedestalTexture, pedestalBump, glassSheenTexture, glassGlintTexture]);

  const spacing = mobile ? 2.7 : 2.48;
  const mobileOffset = scrollProgress * spacing * (projectIds.length - 1);
  return (
    <>
      <CameraRig selectedId={selectedId} />
      {!selectedId && <SceneIntroduction mobile={mobile} />}
      <fog attach="fog" args={["#030303", 15, 34]} />
      <mesh name="museum-back-wall" position={[0, 5.1, -5]} receiveShadow>
        <planeGeometry args={[44, 16]} />
        <meshBasicMaterial color="#030303" />
      </mesh>
      <ambientLight name="museum-fill" intensity={0.28} color="#9d8a78" />
      <hemisphereLight name="ceiling-fill" args={["#bba995", "#160d08", 0.46]} />
      <directionalLight name="front-fill" position={[0, 5.5, 10]} intensity={0.58} color="#c9bbb0" />
      <GlobalSpotlight name="left-overhead-spot" source={[-5.4, 10.8, 4.8]} target={[-3.25, 0.15, 1.65]} depthBuffer={depthBuffer} />
      <GlobalSpotlight name="right-overhead-spot" source={[5.4, 10.8, 4.8]} target={[3.25, 0.15, 1.65]} depthBuffer={depthBuffer} />
      <Environment resolution={192}>
        <Lightformer intensity={4.2} color="#ffe2c9" position={[0, 8, -2]} scale={[13, 1.2, 1]} />
        <Lightformer intensity={2.4} color="#aec4d1" position={[-10, 3, 2]} rotation-y={Math.PI / 2} scale={[7, 1.5, 1]} />
        <Lightformer intensity={3} color="#dca26f" position={[10, 2, 1]} rotation-y={-Math.PI / 2} scale={[6, 1.5, 1]} />
        <Lightformer intensity={6.5} color="#fff0e1" position={[0, 5.8, 7.5]} target={[0, 2.4, 0]} scale={[11, 0.16, 1]} />
        <Lightformer intensity={2.8} color="#fff1e2" position={[-4.2, 3.8, 7]} scale={[0.12, 6.5, 1]} />
        <Lightformer intensity={2.6} color="#e7b07c" position={[4.5, 3.2, 6.5]} scale={[0.1, 5.2, 1]} />
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
              projectCount={projectIds.length}
              x={x}
              title={project?.title ?? id}
              subtitle={project?.subtitle ?? ""}
              displayIndex={project?.index ?? String(index + 1).padStart(2, "0")}
              hovered={hoveredId === id}
              selectedId={selectedId}
              mobile={mobile}
              reduceMotion={reduceMotion}
              rotationResetToken={rotationResetToken}
              texture={pedestalTexture}
              bumpTexture={pedestalBump}
              glassSheenTexture={glassSheenTexture}
              glassGlintTexture={glassGlintTexture}
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
useGLTF.preload(OX_MODEL_PATH);
useGLTF.preload(HARD_HAT_MODEL_PATH);
useGLTF.preload(ANVIL_MODEL_PATH);
useTexture.preload(FLOOR_TEXTURE_PATH);
