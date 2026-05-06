"use client";

import { useRef, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
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
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  float hash(vec2 p) {
    p = fract(p * vec2(127.34, 311.87));
    p += dot(p, p + 19.23);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    return mix(
      mix(hash(i), hash(i + vec2(1,0)), f.x),
      mix(hash(i + vec2(0,1)), hash(i + vec2(1,1)), f.x),
      f.y
    );
  }
  float fbm(vec2 p) {
    float v = 0.0; float a = 0.5;
    for (int i = 0; i < 5; i++) { v += a * noise(p); p *= 2.1; a *= 0.5; }
    return v;
  }

  void main() {
    vec2 uv = vUv;

    // Horizontal turbulence
    float turb = fbm(vec2(uv.x * 4.0, uv.y * 12.0)) * 0.055;
    float by = uv.y + turb;

    // Layered bands
    float b  = sin(by * 3.14159 * 13.0) * 0.5 + 0.5;
    b += sin(by * 3.14159 * 7.5)  * 0.22;
    b += sin(by * 3.14159 * 20.0) * 0.09;
    b += sin(by * 3.14159 * 3.2)  * 0.15;
    b = clamp(b * 0.72, 0.0, 1.0);

    // Color stops
    vec3 cream  = vec3(0.96, 0.90, 0.76);
    vec3 tan    = vec3(0.84, 0.64, 0.40);
    vec3 orange = vec3(0.70, 0.36, 0.14);
    vec3 brown  = vec3(0.42, 0.20, 0.07);

    vec3 col;
    if (b < 0.25)      col = mix(brown,  orange, b / 0.25);
    else if (b < 0.50) col = mix(orange, tan,   (b - 0.25) / 0.25);
    else if (b < 0.75) col = mix(tan,    cream,  (b - 0.50) / 0.25);
    else               col = mix(cream,  tan,   (b - 0.75) / 0.25);

    // Fine streaks
    float streak = fbm(vec2(uv.x * 12.0, by * 28.0)) * 0.12;
    col = mix(col, tan, streak);

    // Great Red Spot
    vec2 grs = (uv - vec2(0.70, 0.365)) * vec2(3.2, 6.5);
    float grsDist = length(grs);
    float grsBlob  = smoothstep(0.38, 0.20, grsDist);
    float grsRing  = smoothstep(0.52, 0.38, grsDist) - grsBlob;
    col = mix(col, vec3(0.72, 0.13, 0.05), grsBlob * 0.92);
    col = mix(col, vec3(0.88, 0.38, 0.18), grsRing * 0.5);

    // Small oval storm (white oval BA area)
    vec2 ba = (uv - vec2(0.30, 0.40)) * vec2(4.5, 9.0);
    float baBlob = smoothstep(0.28, 0.14, length(ba));
    col = mix(col, vec3(0.95, 0.88, 0.78), baBlob * 0.7);

    // Polar darkening
    float polarDark = smoothstep(0.25, 0.0, uv.y) + smoothstep(0.75, 1.0, uv.y);
    col = mix(col, vec3(0.22, 0.12, 0.06), polarDark * 0.55);

    // Directional lighting
    float sunDot = dot(normalize(vWorldNormal), normalize(vec3(4.0, 2.0, 3.0)));
    float lit = smoothstep(-0.5, 0.9, sunDot) * 0.38 + 0.62;
    col *= lit;

    gl_FragColor = vec4(col, 1.0);
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
    rim = pow(rim, 1.1);
    gl_FragColor = vec4(0.82, 0.52, 0.22, rim * 1.0);
  }
`;

function JupiterMesh() {
  const meshRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.045;
  });
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial vertexShader={vertexShader} fragmentShader={fragmentShader} />
      </mesh>
      {/* Atmosphere rim */}
      <mesh scale={[1.028, 1.028, 1.028]}>
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
      {/* Outer halo */}
      <mesh scale={[1.10, 1.10, 1.10]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0xcc6622)}
          transparent opacity={0.10}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
        />
      </mesh>
    </>
  );
}

interface JupiterGlobeProps {
  onClick?: () => void;
  size?: number;
}

export default function JupiterGlobe({ onClick, size = 340 }: JupiterGlobeProps) {
  return (
    <button
      onClick={onClick}
      className="group relative focus:outline-none cursor-pointer"
      style={{ width: size + 80, height: size + 80 }}
      aria-label="Ontdek het werkproces"
    >
      <span
        className="absolute inset-0 rounded-full border border-[#cc6622]/18 animate-ping"
        style={{ animationDuration: "3.5s" }}
      />
      <span
        className="absolute rounded-full border border-[#cc6622]/25 group-hover:border-[#f0a060]/50 transition-all duration-700"
        style={{ inset: 20 }}
      />
      <span
        className="absolute rounded-full border border-[#cc6622]/12 group-hover:border-[#f0a060]/28 transition-all duration-700"
        style={{ inset: 8 }}
      />
      <span
        className="absolute rounded-full bg-[#aa4411]/8 group-hover:bg-[#cc5522]/18 transition-all duration-700 blur-3xl"
        style={{ inset: 30 }}
      />

      <div
        className="absolute rounded-full overflow-hidden transition-all duration-700
          group-hover:shadow-[0_0_100px_rgba(200,100,40,0.30),0_0_260px_rgba(160,70,20,0.15)]"
        style={{ inset: 40, boxShadow: "0 0 70px rgba(180,80,30,0.14)", filter: "blur(0.7px)" }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.55], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#030c18" }}
        >
          <directionalLight position={[4, 2, 3]} intensity={1.8} color="#fff4e8" />
          <directionalLight position={[-2, -1, -2]} intensity={0.06} color="#442211" />
          <ambientLight intensity={0.12} />
          <JupiterMesh />
        </Canvas>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span
          className="text-white text-xs tracking-[0.28em] uppercase font-medium"
          style={{ textShadow: "0 0 30px rgba(200,100,40,1), 0 0 60px rgba(180,80,20,0.6)" }}
        >
          Ontdek
        </span>
      </div>
    </button>
  );
}
