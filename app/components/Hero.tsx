"use client";

import { motion } from "framer-motion";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import SpaceGlobe from "./SpaceGlobe";
import Satellite from "./Satellite";
import StarField from "./StarField";

useTexture.preload(["/moon-texture.jpg"]);

function MoonMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [moonMap] = useTexture(["/moon-texture.jpg"]);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.018;
  });
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <meshStandardMaterial
          map={moonMap}
          roughness={0.82}
          metalness={0.0}
        />
      </mesh>
      {/* Subtiele atmosferische rand */}
      <mesh scale={[1.02, 1.02, 1.02]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0x334455)} transparent opacity={0.08} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

function MoonGlobe() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.4, delay: 0.5 }}
      className="hidden lg:block absolute pointer-events-none"
      style={{ top: "-60px", left: "-80px", animation: "moonFloat 11s ease-in-out infinite", zIndex: 2, width: 320, height: 320 }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.55], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#030c18", borderRadius: "50%", width: "100%", height: "100%" }}
      >
        <directionalLight position={[3, 2, 2]} intensity={1.2} color="#e8f0ff" />
        <directionalLight position={[-2, -1, -2]} intensity={0.08} color="#223355" />
        <ambientLight intensity={0.22} />
        <Suspense fallback={null}>
          <MoonMesh />
        </Suspense>
      </Canvas>
    </motion.div>
  );
}

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background grid */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage:
            "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }}
      />

      {/* Paarse blob linksboven */}
      <div className="absolute -top-20 -left-20 w-[300px] h-[300px] sm:w-[500px] sm:h-[500px] bg-[#7c3aed]/20 blur-[120px] rounded-full pointer-events-none" />
      {/* Cyaan blob rechtsonder */}
      <div className="absolute bottom-0 right-0 w-[250px] h-[250px] sm:w-[400px] sm:h-[400px] bg-[#06b6d4]/15 blur-[100px] rounded-full pointer-events-none" />
      {/* Kleine roze blob midden */}
      <div className="absolute top-1/2 left-1/3 w-[150px] h-[150px] sm:w-[250px] sm:h-[250px] bg-[#ec4899]/8 blur-[90px] rounded-full pointer-events-none" />

      <div className="relative z-10 max-w-6xl mx-auto px-6 flex items-center pt-24 pb-16 min-h-screen">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="text-5xl lg:text-7xl font-bold tracking-tight leading-[1.05] mb-6"
          >
            Gevonden worden
            <br />
            <span className="text-[#6ee7f7]">begint hier.</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
            className="text-white/50 text-lg leading-relaxed mb-10 max-w-md"
          >
            Van webshop tot bedrijfswebsite, uw unieke ideeën breng ik tot leven.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
            className="flex flex-wrap items-center gap-4"
          >
            <a
              href="/projecten"
              className="bg-[#6ee7f7] text-[#080808] font-semibold px-7 py-3.5 rounded-full hover:bg-white transition-colors duration-200 text-sm"
            >
              Bekijk mijn werk
            </a>
            <a
              href="#contact"
              className="text-white/60 hover:text-white transition-colors text-sm flex items-center gap-2 group"
            >
              Neem contact op
              <span className="group-hover:translate-x-1 transition-transform">→</span>
            </a>
          </motion.div>
        </div>
      </div>



      <MoonGlobe />

      {/* Sterren + globe + satelliet */}
      <StarField />
      <SpaceGlobe />
      <Satellite />

      <div className="absolute bottom-0 left-0 right-0 h-32 pointer-events-none" style={{ background: 'linear-gradient(to bottom, transparent, #05060f)', opacity: 0.85 }} />
    </section>
  );
}
