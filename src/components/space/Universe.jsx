import { Canvas } from "@react-three/fiber";
import { OrbitControls, Sphere } from "@react-three/drei";

function Planet() {
  return (
    <Sphere args={[1, 32, 32]}>
      <meshStandardMaterial color="royalblue" />
    </Sphere>
  );
}

export default function Universe() {
  return (
    <Canvas camera={{ position: [0, 0, 5] }}>
      <ambientLight intensity={0.5} />
      <pointLight position={[10, 10, 10]} />

      <Planet />

      <OrbitControls />
    </Canvas>
  );
}