import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Box, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

const FloatingShape = ({ position, geometry }: { position: [number, number, number], geometry: 'sphere' | 'torus' | 'box' }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.2;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.3;
  });

  const shapes = {
    sphere: <Sphere args={[1, 64, 64]} ref={meshRef}>
      <MeshDistortMaterial
        color="#4ECDC4"
        attach="material"
        distort={0.3}
        speed={2}
        roughness={0.2}
        metalness={0.8}
      />
    </Sphere>,
    torus: <Torus args={[1, 0.4, 16, 100]} ref={meshRef}>
      <MeshDistortMaterial
        color="#E94560"
        attach="material"
        distort={0.2}
        speed={1.5}
        roughness={0.1}
        metalness={0.9}
      />
    </Torus>,
    box: <Box args={[1.5, 1.5, 1.5]} ref={meshRef}>
      <MeshDistortMaterial
        color="#9B59B6"
        attach="material"
        distort={0.4}
        speed={1.8}
        roughness={0.3}
        metalness={0.7}
      />
    </Box>
  };

  return (
    <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
      <group position={position}>
        {shapes[geometry]}
      </group>
    </Float>
  );
};

export const HeroScene = () => {
  return (
    <>
      <Stars radius={100} depth={50} count={5000} factor={4} saturation={0} fade speed={1} />
      <ambientLight intensity={0.5} />
      <directionalLight position={[10, 10, 5]} intensity={1} />
      <pointLight position={[-10, -10, -10]} intensity={0.5} color="#4ECDC4" />
      
      <FloatingShape position={[-3, 2, 0]} geometry="sphere" />
      <FloatingShape position={[3, -1, -2]} geometry="torus" />
      <FloatingShape position={[0, 0, -5]} geometry="box" />
      <FloatingShape position={[-4, -2, -3]} geometry="sphere" />
      <FloatingShape position={[4, 1, -4]} geometry="torus" />
    </>
  );
};
