import { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";

function StarField() {
  const meshRef = useRef();

  const particles = useMemo(() => {
    const temp = new Float32Array(1500 * 3);

    for (let i = 0; i < 1500; i++) {
      temp[i * 3] = (Math.random() - 0.5) * 160;
      temp[i * 3 + 1] = (Math.random() - 0.5) * 160;
      temp[i * 3 + 2] = (Math.random() - 0.5) * 160;
    }

    return temp;
  }, []);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.y += delta * 0.003;
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
        size={0.12}
        sizeAttenuation
        color="#8ec5ff"
        transparent
        opacity={0.7}
        depthWrite={false}
      />
    </points>
  );
}

export default function Stars() {
  return (
    <div
      className="
        fixed inset-0
        pointer-events-none
        z-[1]
      "
    >
      <Canvas
        camera={{ position: [0, 0, 5] }}
        gl={{ alpha: true }}
      >
        <StarField />
      </Canvas>
    </div>
  );
}