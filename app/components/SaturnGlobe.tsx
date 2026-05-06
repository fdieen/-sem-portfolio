"use client";

import { useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

const planetVert = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const planetFrag = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;

  float hash(vec2 p) {
    p = fract(p * vec2(127.34, 311.87));
    p += dot(p, p + 19.23);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }

  void main() {
    float turb = noise(vec2(vUv.x * 4.0, vUv.y * 16.0)) * 0.025;
    float by = vUv.y + turb;

    float b  = sin(by * 3.14159 * 10.0) * 0.5 + 0.5;
    b += sin(by * 3.14159 * 5.5)  * 0.18;
    b += sin(by * 3.14159 * 18.0) * 0.06;
    b = clamp(b * 0.80, 0.0, 1.0);

    vec3 cream  = vec3(0.96, 0.91, 0.76);
    vec3 yellow = vec3(0.88, 0.78, 0.50);
    vec3 tan    = vec3(0.78, 0.62, 0.34);
    vec3 amber  = vec3(0.66, 0.45, 0.20);

    vec3 col;
    if      (b < 0.33) col = mix(amber, tan,    b / 0.33);
    else if (b < 0.66) col = mix(tan,   yellow, (b-0.33)/0.33);
    else               col = mix(yellow,cream,  (b-0.66)/0.34);

    float polar = smoothstep(0.18, 0.0, vUv.y) + smoothstep(0.82, 1.0, vUv.y);
    col = mix(col, vec3(0.42, 0.28, 0.12), polar * 0.38);

    float sunDot = dot(normalize(vWorldNormal), normalize(vec3(4.0, 2.0, 3.0)));
    col *= smoothstep(-0.5, 0.9, sunDot) * 0.35 + 0.65;

    gl_FragColor = vec4(col, 1.0);
  }
`;

const ringVert = `
  varying float vR;
  uniform float innerR;
  uniform float outerR;
  void main() {
    float dist = length(position.xz);
    vR = (dist - innerR) / (outerR - innerR);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const ringFrag = `
  varying float vR;
  void main() {
    float r = clamp(vR, 0.0, 1.0);
    float alpha = 0.0;

    if      (r < 0.14) alpha = 0.18 * (r / 0.14);
    else if (r < 0.48) { float t=(r-0.14)/0.34; alpha = 0.88 + sin(t*3.14159*7.0)*0.07; }
    else if (r < 0.56) { float t=(r-0.48)/0.08; alpha = mix(0.88, 0.03, smoothstep(0.0,1.0,t)); }
    else if (r < 0.90) { float t=(r-0.56)/0.34; alpha = 0.70 - t*0.14 + sin(t*3.14159*5.0)*0.04; }
    else               alpha = 0.56 * (1.0-(r-0.90)/0.10);

    vec3 col = mix(vec3(0.97,0.93,0.84), vec3(0.82,0.74,0.58), r*0.65);
    float gap = smoothstep(0.50,0.53,r) * (1.0-smoothstep(0.53,0.56,r));
    col = mix(col, vec3(0.08,0.06,0.04), gap);

    gl_FragColor = vec4(col, alpha * 0.90);
  }
`;

const atmVert = `
  varying vec3 vNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;
const atmFrag = `
  varying vec3 vNormal;
  void main() {
    float rim = pow(1.0 - abs(dot(vNormal, vec3(0.0,0.0,1.0))), 1.2);
    gl_FragColor = vec4(0.90, 0.76, 0.42, rim * 0.85);
  }
`;

const INNER = 1.22;
const OUTER = 2.24;
const TILT  = new THREE.Euler(Math.PI * 0.15, 0.4, 0.0);

function SaturnScene() {
  const planetRef = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (planetRef.current) planetRef.current.rotation.y += delta * 0.036;
  });

  return (
    <group rotation={TILT}>
      {/* Back half of ring — renders behind planet */}
      <mesh renderOrder={0}>
        <ringGeometry args={[INNER, OUTER, 200]} />
        <shaderMaterial
          vertexShader={ringVert}
          fragmentShader={ringFrag}
          uniforms={{ innerR: { value: INNER }, outerR: { value: OUTER } }}
          side={THREE.BackSide}
          transparent depthWrite={false}
        />
      </mesh>

      {/* Planet */}
      <mesh ref={planetRef} renderOrder={1}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial vertexShader={planetVert} fragmentShader={planetFrag} />
      </mesh>

      {/* Atmosphere rim */}
      <mesh scale={[1.026, 1.026, 1.026]} renderOrder={2}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmVert} fragmentShader={atmFrag}
          side={THREE.FrontSide} transparent depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>

      {/* Front half of ring — renders in front of planet */}
      <mesh renderOrder={3}>
        <ringGeometry args={[INNER, OUTER, 200]} />
        <shaderMaterial
          vertexShader={ringVert}
          fragmentShader={ringFrag}
          uniforms={{ innerR: { value: INNER }, outerR: { value: OUTER } }}
          side={THREE.FrontSide}
          transparent depthWrite={false}
        />
      </mesh>
    </group>
  );
}

interface SaturnGlobeProps {
  onClick?: () => void;
  size?: number;
}

export default function SaturnGlobe({ onClick, size = 340 }: SaturnGlobeProps) {
  const pad = 180;
  return (
    <button
      onClick={onClick}
      className="group relative focus:outline-none cursor-pointer"
      style={{ width: size + pad, height: size + pad }}
      aria-label="Ontdek het werkproces"
    >
      {/* Pulse rings */}
      <span
        className="absolute inset-0 rounded-full border border-[#c89040]/15 animate-ping"
        style={{ animationDuration: "3.5s" }}
      />
      <span
        className="absolute rounded-full border border-[#c89040]/20 group-hover:border-[#f0d080]/42 transition-all duration-700"
        style={{ inset: 20 }}
      />
      <span
        className="absolute rounded-full bg-[#aa7010]/5 group-hover:bg-[#cc9020]/12 transition-all duration-700 blur-3xl"
        style={{ inset: 30 }}
      />

      {/* Canvas — full button area, transparent bg so rings aren't clipped */}
      <div
        className="absolute inset-0 transition-all duration-700"
        style={{
          filter: "blur(0.7px)",
          boxShadow: "0 0 80px rgba(180,130,40,0.10)",
        }}
      >
        <Canvas
          camera={{ position: [0, 0, 3.2], fov: 58 }}
          gl={{ antialias: true, alpha: true }}
          style={{ width: "100%", height: "100%" }}
        >
          <directionalLight position={[4, 2, 3]} intensity={2.1} color="#fff8e0" />
          <directionalLight position={[-2, -1, -2]} intensity={0.05} color="#332200" />
          <ambientLight intensity={0.08} />
          <SaturnScene />
        </Canvas>
      </div>

      {/* Hover label */}
      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span
          className="text-white text-xs tracking-[0.28em] uppercase font-medium"
          style={{ textShadow: "0 0 30px rgba(200,160,60,1), 0 0 60px rgba(180,120,20,0.6)" }}
        >
          Ontdek
        </span>
      </div>
    </button>
  );
}
