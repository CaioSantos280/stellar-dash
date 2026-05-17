import { useTexture } from "@react-three/drei";

export default function Planet() {
  const texture = useTexture(
    "https://threejs.org/examples/textures/land_ocean_ice_cloud_2048.jpg"
  );

  return (
    <mesh>
      <sphereGeometry args={[2.2, 128, 128]} />
      <meshStandardMaterial
        map={texture}
        roughness={0.6}
        metalness={0.1}
      />
    </mesh>
  );
}