import { Canvas, useFrame } from "@react-three/fiber";

import {
  OrbitControls,
  Stars,
  Sparkles,
  useTexture,
} from "@react-three/drei";

import {
  EffectComposer,
  Bloom,
  ChromaticAberration,
  Noise,
  Vignette,
} from "@react-three/postprocessing";

import {
  BlendFunction,
} from "postprocessing";

import {
  useRef,
  useMemo,
} from "react";

import * as THREE from "three";



/* =========================================================
   GIANT PLANET
========================================================= */

function GiantPlanet() {
  const ref = useRef();

  const texture = useTexture(
    "/textures/jupiter.jpg"
  );

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime;

    ref.current.rotation.y += 0.0006;

    ref.current.rotation.x =
      mouse.y * 0.05;

    ref.current.position.y =
      Math.sin(t * 0.25) * 0.25;
  });

  return (
    <group position={[-6, 0, -6]}>

      



      



      {/* planet */}

      <mesh ref={ref}>
        <sphereGeometry args={[5.5, 128, 128]} />

        <meshStandardMaterial
          map={texture}
          roughness={0.92}
          metalness={0.05}
          emissive="#1d4ed8"
          emissiveIntensity={0.15}
        />
      </mesh>

    </group>
  );
}



/* =========================================================
   MOON
========================================================= */

function Moon() {
  const ref = useRef();

  const texture = useTexture(
    "/textures/moon.jpg"
  );

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.elapsedTime * 0.2;

    ref.current.position.x =
      Math.sin(t) * 11;

    ref.current.position.z =
      Math.cos(t) * 7 - 6;

    ref.current.position.y =
      Math.sin(t * 2) * 0.6;

    ref.current.rotation.y += 0.0015;
  });

  return (
    <mesh ref={ref}>

      <sphereGeometry args={[1.3, 64, 64]} />

      <meshStandardMaterial
        map={texture}
        roughness={1}
      />

    </mesh>
  );
}



/* =========================================================
   ASTEROIDS
========================================================= */

function Asteroids() {
  const ref = useRef();

  const texture = useTexture(
    "/textures/asteroid.jpg"
  );

  const asteroids = useMemo(() => {
    return Array.from({ length: 40 }, () => ({
      position: [
        (Math.random() - 0.5) * 40,
        (Math.random() - 0.5) * 20,
        (Math.random() - 0.5) * 40,
      ],
      scale:
        Math.random() * 0.6 + 0.15,
    }));
  }, []);

  useFrame(() => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.0005;
  });

  return (
    <group ref={ref}>

      {asteroids.map((a, i) => (
        <mesh
          key={i}
          position={a.position}
          scale={a.scale}
        >

          <icosahedronGeometry
            args={[1, 1]}
          />

          <meshStandardMaterial
            map={texture}
            roughness={1}
          />

        </mesh>
      ))}

    </group>
  );
}



/* =========================================================
   NEBULA
========================================================= */

function Nebula() {
  const texture = useTexture(
    "/textures/nebula.jpg"
  );

  return (
    <mesh position={[12, 3, -28]}>

      <planeGeometry args={[60, 40]} />

      <meshBasicMaterial
        map={texture}
        transparent
        opacity={0.28}
        depthWrite={false}
      />

    </mesh>
  );
}



/* =========================================================
   GALAXY
========================================================= */

function Galaxy() {
  const texture = useTexture(
    "/textures/galaxyy.jpg"
  );

  return (
    <mesh position={[0, 0, -55]}>

      <sphereGeometry args={[80, 64, 64]} />

      <meshBasicMaterial
        map={texture}
        side={THREE.BackSide}
      />

    </mesh>
  );
}



/* =========================================================
   SPACE DUST
========================================================= */

function SpaceDust() {
  return (
    <Sparkles
      count={700}
      scale={[60, 30, 60]}
      size={2}
      speed={0.3}
    />
  );
}



/* =========================================================
   MAIN
========================================================= */

export default function Universe() {
  return (
    <div className="fixed inset-0 -z-10">

      <Canvas
        gl={{
          antialias: true,
          alpha: true,
        }}
        camera={{
          position: [0, 0, 18],
          fov: 45,
        }}
        
      >

        <color
          attach="background"
          args={["#02050d"]}
        />



        {/* FOG */}

        <fog
          attach="fog"
          args={["#02050d", 18, 90]}
        />



        {/* LIGHTS */}

        <ambientLight intensity={0.35} />

        <directionalLight
          position={[10, 10, 5]}
          intensity={2.5}
          color="#93c5fd"
        />

        <pointLight
          position={[-10, 0, -10]}
          intensity={4}
          color="#2563eb"
        />



        {/* BACKGROUND */}

        <Galaxy />

        <Nebula />



        {/* OBJECTS */}

        <GiantPlanet />

        <Moon />

        <Asteroids />



        {/* PARTICLES */}

        <Stars
          radius={120}
          depth={80}
          count={9000}
          factor={4}
          fade
          speed={0.5}
        />

        <SpaceDust />



        {/* EXTRA FX */}

        <Sparkles
          count={150}
          scale={20}
          size={5}
          speed={0.4}
        />



        {/* POST PROCESSING */}

        <EffectComposer>

          <Bloom
            intensity={0.9}
            luminanceThreshold={0}
            luminanceSmoothing={0.9}
          />

          <ChromaticAberration
            blendFunction={BlendFunction.NORMAL}
            offset={[0.0005, 0.0012]}
          />

          <Noise opacity={0.03} />

          <Vignette
            eskil={false}
            offset={0.15}
            darkness={1.1}
          />

        </EffectComposer>



        {/* CAMERA */}

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.12}
        />

      </Canvas>

    </div>
  );
}
