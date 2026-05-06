"use client";

import { motion } from "framer-motion";
import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";
import SpaceGlobe from "./SpaceGlobe";
import Satellite from "./Satellite";
import StarField from "./StarField";

const moonVertexShader = `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;
  void main() {
    vUv = uv;
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const moonFragmentShader = `
  uniform sampler2D moonTex;
  uniform vec3 lightDir;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  varying vec2 vUv;

  void main() {
    // Base texture maar sterk gedesatureerd en afgezwakt
    vec4 tex = texture2D(moonTex, vUv);
    float grey = dot(tex.rgb, vec3(0.33));
    vec3 base = vec3(0.52, 0.54, 0.58); // blauwgrijs

    // Mix texture subtiel in voor lichte variatie
    base = mix(base, vec3(grey * 0.7 + 0.3), 0.25);

    // Diffuse shading
    float diff = max(dot(vWorldNormal, normalize(lightDir)), 0.0);
    // Zachte overgang — geen harde dag/nacht
    float shade = smoothstep(0.0, 0.8, diff) * 0.7 + 0.15;

    // Fresnel rim — blauwig gloed aan de rand
    float fresnel = pow(1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0))), 2.5);
    vec3 rimColor = vec3(0.3, 0.55, 0.85);

    vec3 color = base * shade;
    color += rimColor * fresnel * 0.35;

    // Lichte highlight aan de lichtbron kant
    float spec = pow(max(dot(vNormal, normalize(vec3(0.6, 0.5, 1.0))), 0.0), 12.0);
    color += vec3(0.6, 0.7, 0.85) * spec * 0.12;

    gl_FragColor = vec4(color, 1.0);
  }
`;

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
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={moonVertexShader}
          fragmentShader={moonFragmentShader}
          uniforms={{
            moonTex: { value: moonMap },
            lightDir: { value: new THREE.Vector3(3, 2, 2).normalize() },
          }}
        />
      </mesh>
      {/* Rim glow */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0x2244aa)} transparent opacity={0.1} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
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
