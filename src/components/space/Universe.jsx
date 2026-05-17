import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls, useTexture } from "@react-three/drei";
import { useRef, useMemo } from "react";
import { useSystemStore } from "../../state/systemStore";

/* -------------------- SYSTEM INTENSITY -------------------- */
function useSystem() {
  const { battery, cpu, notifications } = useSystemStore();

  return {
    battery,
    cpu,
    notifications,
    unstable: battery < 20 || cpu > 90,
    intensity: battery < 30 ? 1.4 : 1,
  };
}

/* -------------------- 🌍 PLANET -------------------- */
function Planet() {
  const texture = useTexture(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );

  const { battery, intensity } = useSystem();
  const ref = useRef();

  useFrame(({ mouse }) => {
    if (!ref.current) return;

    ref.current.rotation.y += 0.001 * intensity;
    ref.current.rotation.x = mouse.y * 0.08;

    const scale = battery < 20 ? 0.95 : 1;
    ref.current.scale.setScalar(scale);
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[2.2, 64, 64]} />
      <meshStandardMaterial
        map={texture}
        emissive={"#00040a"}
        emissiveIntensity={0.25}
      />
    </mesh>
  );
}

/* -------------------- 🌙 MOON -------------------- */
function Moon({ radius, speed, size }) {
  const texture = useTexture(
    "https://threejs.org/examples/textures/planets/moon_1024.jpg"
  );

  const { intensity } = useSystem();
  const ref = useRef();

  useFrame(({ clock }) => {
    if (!ref.current) return;

    const t = clock.getElapsedTime() * speed * intensity;

    ref.current.position.x = Math.cos(t) * radius;
    ref.current.position.z = Math.sin(t) * radius;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

/* -------------------- ⭐ STARS -------------------- */
function Stars() {
  const { unstable } = useSystem();
  const ref = useRef();

  const stars = useMemo(
    () =>
      Array.from({ length: 500 }).map(() => [
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
        (Math.random() - 0.5) * 80,
      ]),
    []
  );

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.y += 0.00015;
  });

  return (
    <group ref={ref}>
      {stars.map((pos, i) => (
        <mesh key={i} position={pos}>
          <sphereGeometry args={[0.02, 6, 6]} />
          <meshBasicMaterial color={unstable ? "#ff5555" : "#ffffff"} />
        </mesh>
      ))}
    </group>
  );
}

/* -------------------- ☀ CPU OBJECT -------------------- */
function CPUCore() {
  const { cpu } = useSystem();
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.scale.setScalar(1 + cpu / 200);
  });

  return (
    <mesh ref={ref} position={[5, 0, 0]}>
      <sphereGeometry args={[0.9, 32, 32]} />
      <meshStandardMaterial emissive={"#ff9900"} emissiveIntensity={1.2} />
    </mesh>
  );
}

/* -------------------- 🧠 RAM OBJECT -------------------- */
function RAMCore() {
  const { cpu } = useSystem();
  const ref = useRef();

  useFrame(() => {
    if (!ref.current) return;
    ref.current.rotation.z += cpu / 50000;
  });

  return (
    <mesh ref={ref} position={[-5, 0, 0]}>
      <sphereGeometry args={[0.7, 32, 32]} />
      <meshStandardMaterial color={"#1d4ed8"} />
    </mesh>
  );
}

/* -------------------- 🌑 ECLIPSE -------------------- */
function Eclipse() {
  const { notifications } = useSystem();
  const ref = useRef();

  const active = notifications.length > 0;

  useFrame(() => {
    if (!ref.current) return;

    ref.current.material.opacity += active ? 0.02 : -0.02;
    ref.current.material.opacity = Math.max(0, Math.min(0.5, ref.current.material.opacity));
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[6.5, 64, 64]} />
      <meshBasicMaterial color="black" transparent opacity={0} />
    </mesh>
  );
}

/* -------------------- 🚀 UNIVERSE -------------------- */
export default function Universe() {
  const { battery, cpu } = useSystem();

  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 7] }}>

        <ambientLight intensity={battery < 20 ? 0.15 : 0.35} />
        <directionalLight position={[5, 5, 5]} intensity={cpu > 90 ? 1 : 2} />

        <Planet />

        <Moon radius={3.5} speed={0.8} size={0.3} />
        <Moon radius={4.5} speed={0.5} size={0.2} />
        <Moon radius={5.5} speed={0.3} size={0.15} />

        <CPUCore />
        <RAMCore />

        <Stars />
        <Eclipse />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate
          autoRotateSpeed={0.2}
        />
      </Canvas>
    </div>
  );
}