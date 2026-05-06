"use client";

import { useRef, Suspense, useState, useEffect } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const earthVertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const earthFragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D cloudsTexture;
  uniform vec3 sunDirection;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    float sunDot = dot(vWorldNormal, normalize(sunDirection));
    float blend = smoothstep(-0.3, 0.3, sunDot);
    vec4 day = texture2D(dayTexture, vUv);
    vec4 night = texture2D(nightTexture, vUv);
    night.rgb *= 2.2;
    day.rgb *= 1.1;
    vec4 earth = mix(night, day, blend);
    float cloud = texture2D(cloudsTexture, vUv).r;
    float cloudOpacity = cloud * 0.45 * blend;
    earth.rgb = mix(earth.rgb, vec3(1.0), cloudOpacity);
    gl_FragColor = earth;
  }
`;

const atmVertexShader = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const atmFragmentShader = `
  varying vec3 vNormal;
  void main() {
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 1.4);
    gl_FragColor = vec4(0.18, 0.55, 1.0, rim * 0.85);
  }
`;

const SUN_DIR = new THREE.Vector3(4, 2, 3).normalize();

// Everything in one component — useTexture suspends ALL children until ready
function EarthScene({ onReady }: { onReady: () => void }) {
  const meshRef = useRef<THREE.Mesh>(null);
  const { gl } = useThree();

  const [dayMap, nightMap, cloudsMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-night.jpg",
    "/earth-clouds.jpg",
  ]);

  useEffect(() => {
    // Pre-upload all textures to GPU so they appear fully in one frame
    gl.initTexture(dayMap);
    gl.initTexture(nightMap);
    gl.initTexture(cloudsMap);
    // Signal parent after one RAF so GPU upload is complete
    const raf = requestAnimationFrame(() => onReady());
    return () => cancelAnimationFrame(raf);
  }, [dayMap, nightMap, cloudsMap, gl, onReady]);

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.055;
  });

  return (
    <>
      {/* Earth — single mesh, all layers in one shader */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={earthVertexShader}
          fragmentShader={earthFragmentShader}
          uniforms={{
            dayTexture: { value: dayMap },
            nightTexture: { value: nightMap },
            cloudsTexture: { value: cloudsMap },
            sunDirection: { value: SUN_DIR },
          }}
        />
      </mesh>

      {/* Atmosphere — inside same component, renders only when textures ready */}
      <mesh scale={[1.025, 1.025, 1.025]}>
        <sphereGeometry args={[1, 64, 64]} />
        <shaderMaterial
          vertexShader={atmVertexShader}
          fragmentShader={atmFragmentShader}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
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
  const [ready, setReady] = useState(false);

  return (
    <button
      onClick={onClick}
      className="group relative focus:outline-none cursor-pointer"
      style={{ width: size + 80, height: size + 80 }}
      aria-label="Ontdek het werkproces"
    >
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
      <span
        className="absolute rounded-full bg-[#1144cc]/8 group-hover:bg-[#2255ee]/18 transition-all duration-700 blur-3xl"
        style={{ inset: 30 }}
      />

      <div
        className="absolute rounded-full overflow-hidden transition-all duration-700
          group-hover:shadow-[0_0_100px_rgba(68,136,255,0.28),0_0_260px_rgba(17,68,204,0.15)]"
        style={{ inset: 40, boxShadow: "0 0 70px rgba(68,136,255,0.12)" }}
      >
        {/* Fade in only after GPU upload complete — masks texture pop-in */}
        <div
          style={{
            width: "100%", height: "100%",
            opacity: ready ? 1 : 0,
            transition: "opacity 0.5s ease",
          }}
        >
          <Canvas
            camera={{ position: [0, 0, 2.55], fov: 42 }}
            gl={{ antialias: true, alpha: false }}
            style={{ background: "#030c18" }}
          >
            <directionalLight position={[4, 2, 3]} intensity={2.2} color="#fff8f0" />
            <directionalLight position={[-2, -1, -2]} intensity={0.04} color="#224488" />
            <ambientLight intensity={0.05} />

            <Suspense fallback={null}>
              <EarthScene onReady={() => setReady(true)} />
            </Suspense>
          </Canvas>
        </div>
      </div>

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
