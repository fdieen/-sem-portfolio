"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform vec3 sunDirection;

  varying vec2 vUv;
  varying vec3 vWorldNormal;

  void main() {
    float sunDot = dot(vWorldNormal, normalize(sunDirection));
    // Smooth blend: fully night at -0.3, fully day at 0.3
    float blend = smoothstep(-0.3, 0.3, sunDot);

    vec4 day = texture2D(dayTexture, vUv);
    vec4 night = texture2D(nightTexture, vUv);

    // Boost city lights on night side
    night.rgb *= 2.2;

    // Slightly boost day brightness
    day.rgb *= 1.1;

    gl_FragColor = mix(night, day, blend);
  }
`;

const atmosphereVertexShader = `
  varying vec3 vNormal;

  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmosphereFragmentShader = `
  varying vec3 vNormal;

  void main() {
    // Fresnel-like rim effect: strong at edges, fade to center
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 1.4);
    gl_FragColor = vec4(0.18, 0.55, 1.0, rim * 0.85);
  }
`;

const SUN_DIR = new THREE.Vector3(4, 2, 3).normalize();

// Preload all textures immediately when the module loads
useTexture.preload(["/earth-texture.jpg", "/earth-night.jpg", "/earth-clouds.jpg"]);

function FallbackGlobe() {
  return (
    <mesh>
      <sphereGeometry args={[1, 32, 32]} />
      <meshBasicMaterial color={new THREE.Color(0x071828)} />
    </mesh>
  );
}

function Earth() {
  const earthRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);

  const [dayMap, nightMap, cloudsMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-night.jpg",
    "/earth-clouds.jpg",
  ]);

  useFrame((_, delta) => {
    if (earthRef.current) earthRef.current.rotation.y += delta * 0.055;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.06;
  });

  return (
    <>
      {/* Earth — day/night shader */}
      <mesh ref={earthRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            dayTexture: { value: dayMap },
            nightTexture: { value: nightMap },
            sunDirection: { value: SUN_DIR },
          }}
        />
      </mesh>

      {/* Cloud layer — additive blending: black=invisible, white=cloud */}
      <mesh ref={cloudsRef} scale={[1.004, 1.004, 1.004]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          map={cloudsMap}
          blending={THREE.AdditiveBlending}
          transparent
          opacity={0.38}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

function Atmosphere() {
  return (
    <>
      {/* Fresnel atmosphere — blue rim glow */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={atmosphereVertexShader}
          fragmentShader={atmosphereFragmentShader}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Outer haze */}
      <mesh scale={[1.07, 1.07, 1.07]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          color={new THREE.Color(0x2255ee)}
          transparent
          opacity={0.06}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>

      {/* Far glow */}
      <mesh scale={[1.14, 1.14, 1.14]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0x1144cc)}
          transparent
          opacity={0.03}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

interface EarthGlobeProps {
  onClick?: () => void;
  size?: number;
}

export default function EarthGlobe({ onClick, size = 340 }: EarthGlobeProps) {
  return (
    <button
      onClick={onClick}
      className="group relative focus:outline-none cursor-pointer"
      style={{ width: size + 80, height: size + 80 }}
      aria-label="Ontdek het werkproces"
    >
      {/* Pulserende ringen */}
      <span
        className="absolute inset-0 rounded-full border border-[#4488ff]/12 animate-ping"
        style={{ animationDuration: "3.5s" }}
      />
      <span
        className="absolute rounded-full border border-[#4488ff]/20 group-hover:border-[#6ee7f7]/45 transition-all duration-700"
        style={{ inset: 20 }}
      />
      <span
        className="absolute rounded-full border border-[#4488ff]/10 group-hover:border-[#6ee7f7]/25 transition-all duration-700"
        style={{ inset: 8 }}
      />

      {/* Achtergrond glow */}
      <span
        className="absolute rounded-full bg-[#1144cc]/8 group-hover:bg-[#2255ee]/18 transition-all duration-700 blur-3xl"
        style={{ inset: 30 }}
      />

      {/* Globe canvas */}
      <div
        className="absolute rounded-full overflow-hidden transition-all duration-700
          group-hover:shadow-[0_0_100px_rgba(68,136,255,0.28),0_0_260px_rgba(17,68,204,0.15)]"
        style={{
          inset: 40,
          boxShadow: "0 0 70px rgba(68,136,255,0.12)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.55], fov: 42 }}
          gl={{ antialias: true, alpha: true }}
          style={{ background: "transparent" }}
        >
          {/* Main sun light — upper left */}
          <directionalLight position={[4, 2, 3]} intensity={2.2} color="#fff8f0" />
          {/* Subtle fill from opposite side */}
          <directionalLight position={[-2, -1, -2]} intensity={0.04} color="#224488" />
          <ambientLight intensity={0.05} />

          <Suspense fallback={<FallbackGlobe />}>
            <Earth />
            <Atmosphere />
          </Suspense>
        </Canvas>
      </div>

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span
          className="text-white text-xs tracking-[0.28em] uppercase font-medium"
          style={{ textShadow: "0 0 30px rgba(68,136,255,1), 0 0 60px rgba(68,136,255,0.5)" }}
        >
          Ontdek
        </span>
      </div>
    </button>
  );
}
