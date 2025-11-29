import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, Sphere, Torus, Box, MeshDistortMaterial, Stars } from '@react-three/drei';
import * as THREE from 'three';

// Animated nebula clouds
const NebulaCloud = ({ position, color, scale }: { position: [number, number, number], color: string, scale: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.x = state.clock.getElapsedTime() * 0.05;
    meshRef.current.rotation.y = state.clock.getElapsedTime() * 0.08;
    meshRef.current.scale.setScalar(scale + Math.sin(state.clock.getElapsedTime() * 0.5) * 0.2);
  });

  return (
    <Sphere ref={meshRef} args={[1, 32, 32]} position={position}>
      <meshBasicMaterial color={color} transparent opacity={0.15} />
    </Sphere>
  );
};

// Shooting stars effect
const ShootingStar = ({ delay }: { delay: number }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const startPos = useMemo(() => ({
    x: (Math.random() - 0.5) * 100,
    y: Math.random() * 50 + 20,
    z: (Math.random() - 0.5) * 50 - 30
  }), []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = (state.clock.getElapsedTime() + delay) % 8;
    if (time < 2) {
      meshRef.current.visible = true;
      meshRef.current.position.x = startPos.x + time * 15;
      meshRef.current.position.y = startPos.y - time * 12;
      meshRef.current.position.z = startPos.z;
      meshRef.current.scale.x = 1 + time * 2;
    } else {
      meshRef.current.visible = false;
    }
  });

  return (
    <mesh ref={meshRef}>
      <boxGeometry args={[0.5, 0.02, 0.02]} />
      <meshBasicMaterial color="#ffffff" transparent opacity={0.8} />
    </mesh>
  );
};

// Floating particles
const FloatingParticles = () => {
  const pointsRef = useRef<THREE.Points>(null);
  
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(500 * 3);
    for (let i = 0; i < 500; i++) {
      positions[i * 3] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 1] = (Math.random() - 0.5) * 100;
      positions[i * 3 + 2] = (Math.random() - 0.5) * 100;
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.02;
    pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.01;
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={500}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial size={0.15} color="#4ECDC4" transparent opacity={0.6} sizeAttenuation />
    </points>
  );
};

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
      {/* Multiple star layers for depth */}
      <Stars radius={150} depth={80} count={8000} factor={6} saturation={0} fade speed={0.5} />
      <Stars radius={100} depth={50} count={3000} factor={3} saturation={0.5} fade speed={1} />
      <Stars radius={50} depth={30} count={1500} factor={2} saturation={1} fade speed={2} />
      
      {/* Floating particles */}
      <FloatingParticles />
      
      {/* Nebula clouds */}
      <NebulaCloud position={[-15, 10, -40]} color="#4ECDC4" scale={8} />
      <NebulaCloud position={[20, -5, -50]} color="#E94560" scale={10} />
      <NebulaCloud position={[0, 15, -60]} color="#9B59B6" scale={12} />
      <NebulaCloud position={[-25, -10, -45]} color="#3498DB" scale={6} />
      
      {/* Shooting stars */}
      {[...Array(5)].map((_, i) => (
        <ShootingStar key={i} delay={i * 1.5} />
      ))}
      
      {/* Lighting */}
      <ambientLight intensity={0.3} />
      <directionalLight position={[10, 10, 5]} intensity={0.8} />
      <pointLight position={[-10, -10, -10]} intensity={0.4} color="#4ECDC4" />
      <pointLight position={[10, 10, -20]} intensity={0.3} color="#E94560" />
      
      {/* Floating shapes */}
      <FloatingShape position={[-3, 2, 0]} geometry="sphere" />
      <FloatingShape position={[3, -1, -2]} geometry="torus" />
      <FloatingShape position={[0, 0, -5]} geometry="box" />
      <FloatingShape position={[-4, -2, -3]} geometry="sphere" />
      <FloatingShape position={[4, 1, -4]} geometry="torus" />
    </>
  );
};
