import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function StarField() {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(2000 * 3);

    for (let i = 0; i < 2000; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 100;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 100;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }

    return temp;
  }, []);

  useFrame((state, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.05;
      meshRef.current.rotation.x += delta * 0.02;
    }
  });

  return (
    <points ref={meshRef}>
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
        sizeAttenuation
        color="#ffffff"
        transparent
        opacity={1}
      />
    </points>
  );
}

export default function Stars() {
  return (
    <div
      style={{
        position: "fixed",
        inset: 0,
        backgroundColor: "#050816",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <Canvas
        style={{ width: "100vw", height: "100vh" }}
        camera={{ position: [0, 0, 5] }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}