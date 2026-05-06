"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

// Lemniscaat van Bernoulli — het ∞ teken als 3D curve
class LemniscateCurve extends THREE.Curve<THREE.Vector3> {
  private scale: number;
  constructor(scale = 2.0) {
    super();
    this.scale = scale;
  }
  getPoint(t: number): THREE.Vector3 {
    const a = t * Math.PI * 2;
    const denom = 1 + Math.sin(a) * Math.sin(a);
    const x = (this.scale * Math.cos(a)) / denom;
    const y = (this.scale * Math.sin(a) * Math.cos(a)) / denom;
    const z = 0.35 * Math.sin(a * 2); // subtiele 3D diepte
    return new THREE.Vector3(x, y, z);
  }
}

function InfinityShape() {
  const ref = useRef<THREE.Mesh>(null);
  const curve = useMemo(() => new LemniscateCurve(1.6), []);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.25;
    ref.current.position.y = Math.sin(state.clock.elapsedTime * 0.5) * 0.08;
  });

  return (
    <mesh ref={ref}>
      <tubeGeometry args={[curve, 200, 0.14, 16, true]} />
      <meshStandardMaterial
        color="#6ee7f7"
        emissive="#0e7490"
        emissiveIntensity={1.2}
        roughness={0.08}
        metalness={0.5}
        side={THREE.DoubleSide}
      />
    </mesh>
  );
}

function Particles({ count = 180 }: { count?: number }) {
  const ref = useRef<THREE.Points>(null);

  const positions = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const curve = new LemniscateCurve(1.6);

    for (let i = 0; i < count; i++) {
      // Mix: deels langs de curve, deels random in ruimte
      if (i < count * 0.5) {
        // Langs de ∞ curve met kleine offset
        const t = i / (count * 0.5);
        const p = curve.getPoint(t);
        pos[i * 3]     = p.x + (Math.random() - 0.5) * 0.8;
        pos[i * 3 + 1] = p.y + (Math.random() - 0.5) * 0.8;
        pos[i * 3 + 2] = p.z + (Math.random() - 0.5) * 0.8;
      } else {
        // Random rondom in bol
        const r = 2.5 + Math.random() * 2;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(2 * Math.random() - 1);
        pos[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
        pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
        pos[i * 3 + 2] = r * Math.cos(phi);
      }
    }
    return pos;
  }, [count]);

  useFrame((state) => {
    if (!ref.current) return;
    ref.current.rotation.y = state.clock.elapsedTime * 0.04;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.03} color="#6ee7f7" transparent opacity={0.8} sizeAttenuation />
    </points>
  );
}

function OrbitingLight({ radius, speed, color, intensity, yOffset = 0 }: {
  radius: number; speed: number; color: string; intensity: number; yOffset?: number;
}) {
  const ref = useRef<THREE.PointLight>(null);
  const angle = useRef(Math.random() * Math.PI * 2);

  useFrame((_, delta) => {
    if (!ref.current) return;
    angle.current += delta * speed;
    ref.current.position.x = Math.cos(angle.current) * radius;
    ref.current.position.z = Math.sin(angle.current) * radius;
    ref.current.position.y = yOffset + Math.sin(angle.current * 0.5) * 1;
  });

  return <pointLight ref={ref} color={color} intensity={intensity} distance={10} />;
}

function Scene({ controlsRef, isMobile }: { controlsRef: React.RefObject<OrbitControlsImpl | null>; isMobile: boolean }) {
  return (
    <>
      <ambientLight intensity={0.3} />
      <OrbitingLight radius={3.5} speed={0.6}  color="#6ee7f7" intensity={80}  yOffset={0.5} />
      <OrbitingLight radius={3}   speed={-0.4} color="#a78bfa" intensity={60}  yOffset={-0.5} />
      {!isMobile && <OrbitingLight radius={4} speed={0.25} color="#f0abfc" intensity={30} yOffset={0} />}

      <InfinityShape />
      <Particles count={isMobile ? 60 : 180} />

      <OrbitControls
        ref={controlsRef}
        enableZoom={false}
        enablePan={false}
        enableRotate={!isMobile}
        rotateSpeed={0.5}
        dampingFactor={0.06}
        enableDamping
        autoRotate={false}
      />
    </>
  );
}

export default function Cube3D() {
  const controlsRef = useRef<OrbitControlsImpl>(null);
  const [isMobile, setIsMobile] = useState(false);
  const [dpr, setDpr] = useState(1);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth < 768);
      setDpr(Math.min(window.devicePixelRatio, 2));
    };
    check();
    window.addEventListener("resize", check);
    return () => window.removeEventListener("resize", check);
  }, []);

  return (
    <div
      className="relative w-full h-[380px] lg:h-[520px] cursor-grab active:cursor-grabbing"
      onMouseDown={() => { if (!isMobile && controlsRef.current) controlsRef.current.autoRotate = false; }}
      onMouseUp={() => { if (!isMobile && controlsRef.current) controlsRef.current.autoRotate = true; }}
    >
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 38 }}
        gl={{ alpha: true, antialias: !isMobile, toneMapping: THREE.ACESFilmicToneMapping, powerPreference: "high-performance" }}
        dpr={dpr}
        style={{ background: "transparent" }}
      >
        <Scene controlsRef={controlsRef} isMobile={isMobile} />
      </Canvas>

      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-16 bg-[#6ee7f7]/15 blur-3xl rounded-full pointer-events-none" />
    </div>
  );
}
