'use client';

import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere } from '@react-three/drei';
import { useRef } from 'react';
import * as THREE from 'three';

const nodes = [
  { position: [-1.8, 0.8, 0], size: 0.12 },
  { position: [-0.8, -0.3, 0.5], size: 0.08 },
  { position: [0, 0.8, -0.3], size: 0.14 },
  { position: [0.9, -0.5, 0.2], size: 0.1 },
  { position: [1.8, 0.6, -0.2], size: 0.13 },
  { position: [0.2, -1, -0.6], size: 0.07 },
];

function MarketNodes() {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((_, delta) => {
    if (!groupRef.current) return;

    groupRef.current.rotation.y += delta * 0.08;
    groupRef.current.rotation.x = Math.sin(Date.now() * 0.0004) * 0.08;
  });

  return (
    <group ref={groupRef}>
      {nodes.map((node, index) => (
        <Sphere
          key={index}
          position={node.position as [number, number, number]}
          args={[node.size, 16, 16]}
        >
          <meshBasicMaterial color="#00f0ff" />
        </Sphere>
      ))}

      <mesh rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1.8, 0.008, 8, 64]} />
        <meshBasicMaterial color="#4edea3" transparent opacity={0.45} />
      </mesh>

      <mesh rotation={[0, Math.PI / 3, 0]}>
        <torusGeometry args={[1.25, 0.006, 8, 64]} />
        <meshBasicMaterial color="#00f0ff" transparent opacity={0.35} />
      </mesh>
    </group>
  );
}

export function Market3D() {
  return (
    <div className="h-24 w-full overflow-hidden rounded-[14px] bg-[#090909]">
      <Canvas
        camera={{ position: [0, 0, 4.5], fov: 45 }}
        dpr={[1, 1.5]}
      >
        <ambientLight intensity={0.5} />

        <MarketNodes />

        <OrbitControls
          enableZoom={false}
          enablePan={false}
          autoRotate={false}
          rotateSpeed={0.35}
        />
      </Canvas>
    </div>
  );
}