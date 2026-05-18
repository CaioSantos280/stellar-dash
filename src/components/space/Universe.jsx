import { Canvas, useFrame } from "@react-three/fiber";
import {
  OrbitControls,
  Billboard,
  useTexture,
} from "@react-three/drei";

import {
  useRef,
  useMemo,
} from "react";

function Planet({
  position,
  size,
  speed,
  textureUrl,
  glowColor = "#60a5fa",
  ring = false,
}) {
  const ref = useRef();

  const texture = useTexture(textureUrl);

  useFrame(({ clock, mouse }) => {
    if (!ref.current) return;

    ref.current.rotation.y += speed;

    ref.current.position.y =
      position[1] +
      Math.sin(clock.elapsedTime * 0.4) * 0.08;

    ref.current.rotation.x =
      mouse.y * 0.05;
  });

  return (
    <group position={position}>

      <mesh ref={ref}>
        <sphereGeometry args={[size, 128, 128]} />

        <meshStandardMaterial
          map={texture}
          roughness={0.72}
          metalness={0.12}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[size * 1.14, 64, 64]} />

        <meshBasicMaterial
          color={glowColor}
          transparent
          opacity={0.12}
          side={2}
        />
      </mesh>

      {ring && (
        <mesh rotation={[1.6, 0.2, 0]}>
          <torusGeometry
            args={[size * 1.55, 0.08, 32, 200]}
          />

          <meshBasicMaterial
            color="#7dd3fc"
            transparent
            opacity={0.45}
          />
        </mesh>
      )}

    </group>
  );
}

function Nebula({
  position,
  scale,
  color,
}) {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.z += 0.0007;

    ref.current.material.opacity =
      0.04 +
      Math.sin(clock.elapsedTime * 0.4) * 0.01;
  });

  return (
    <Billboard position={position}>
      <mesh ref={ref} scale={scale}>

        <planeGeometry args={[1, 1]} />

        <meshBasicMaterial
          color={color}
          transparent
          opacity={0.05}
          depthWrite={false}
        />

      </mesh>
    </Billboard>
  );
}

function Stars() {
  const ref = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(5000 * 3);

    for (let i = 0; i < 5000; i++) {
      temp[i * 3] =
        (Math.random() - 0.5) * 500;

      temp[i * 3 + 1] =
        (Math.random() - 0.5) * 500;

      temp[i * 3 + 2] =
        (Math.random() - 0.5) * 500;
    }

    return temp;
  }, []);

  useFrame(({ mouse }, delta) => {
    if (!ref.current) return;

    ref.current.rotation.y += delta * 0.003;

    ref.current.rotation.x =
      mouse.y * 0.03;

    ref.current.rotation.y +=
      mouse.x * 0.0005;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        size={0.14}
        sizeAttenuation
        color="#dbeafe"
        transparent
        opacity={1}
        depthWrite={false}
      />
    </points>
  );
}

function EnergyParticles() {
  const ref = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(1200 * 3);

    for (let i = 0; i < 1200; i++) {
      temp[i * 3] =
        (Math.random() - 0.5) * 60;

      temp[i * 3 + 1] =
        (Math.random() - 0.5) * 30;

      temp[i * 3 + 2] =
        (Math.random() - 0.5) * 60;
    }

    return temp;
  }, []);

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.y =
      clock.elapsedTime * 0.025;

    ref.current.rotation.x =
      Math.sin(clock.elapsedTime * 0.2) * 0.08;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>

        <bufferAttribute
          attach="attributes-position"
          count={particles.length / 3}
          array={particles}
          itemSize={3}
        />

      </bufferGeometry>

      <pointsMaterial
        size={0.05}
        color="#38bdf8"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

function Grid() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.position.z =
      (clock.getElapsedTime() * 0.25) % 2;
  });

  return (
    <group
      ref={ref}
      rotation={[-1.4, 0, 0]}
    >

      {Array.from({ length: 35 }).map((_, i) => (
        <mesh
          key={i}
          position={[0, i * 0.6 - 10, -20]}
        >

          <boxGeometry args={[60, 0.015, 0.015]} />

          <meshBasicMaterial
            color="#0ea5e9"
            transparent
            opacity={0.18}
            toneMapped={false}
          />

        </mesh>
      ))}

    </group>
  );
}

function HUD() {
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    ref.current.rotation.z =
      Math.sin(clock.elapsedTime * 0.2) * 0.03;
  });

  return (
    <group ref={ref}>

      <mesh position={[0, 0, -12]}>
        <torusGeometry
          args={[7, 0.015, 16, 200]}
        />

        <meshBasicMaterial
          color="#38bdf8"
          transparent
          opacity={0.15}
        />
      </mesh>

      <mesh position={[0, 0, -10]}>
        <ringGeometry
          args={[4.5, 4.52, 128]}
        />

        <meshBasicMaterial
          color="#60a5fa"
          transparent
          opacity={0.08}
          side={2}
        />
      </mesh>

    </group>
  );
}

export default function Universe() {
  return (
    <div className="fixed inset-0 -z-10">

      <Canvas
        camera={{
          position: [0, 0, 24],
          fov: 40,
        }}
      >

        <fog
          attach="fog"
          args={["#02050d", 20, 80]}
        />

        <ambientLight intensity={0.45} />

        <directionalLight
          position={[10, 8, 5]}
          intensity={2.8}
          color="#60a5fa"
        />

        <pointLight
          position={[-15, -10, -10]}
          intensity={2}
          color="#0ea5e9"
        />

        <pointLight
          position={[15, 10, 10]}
          intensity={1.5}
          color="#2563eb"
        />

        <Planet
  position={[-7, -1, 0]}
  size={4.8}
  speed={0.0008}
  textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/jupiter2_1024.jpg"
  glowColor="#2563eb"
/>

<Planet
  position={[5, 2, -4]}
  size={1.8}
  speed={0.0015}
  textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/earth_atmos_2048.jpg"
  glowColor="#38bdf8"
/>

<Planet
  position={[2, -4, -8]}
  size={0.9}
  speed={0.002}
  textureUrl="https://raw.githubusercontent.com/mrdoob/three.js/dev/examples/textures/planets/mars_1k_color.jpg"
  glowColor="#7dd3fc"
/>

        <Nebula
          position={[10, 4, -18]}
          scale={18}
          color="#2563eb"
        />

        <Nebula
          position={[-14, -6, -20]}
          scale={24}
          color="#0ea5e9"
        />

        <Nebula
          position={[0, 10, -30]}
          scale={32}
          color="#38bdf8"
        />

        <Nebula
          position={[18, -10, -40]}
          scale={40}
          color="#1d4ed8"
        />

        <Grid />

        <HUD />

        <Stars />

        <EnergyParticles />

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