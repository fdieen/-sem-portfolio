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
    p = fract(p * vec2(127.1, 311.7));
    p += dot(p, p + 19.19);
    return fract(p.x * p.y);
  }
  float noise(vec2 p) {
    vec2 i = floor(p); vec2 f = fract(p);
    f = f*f*(3.0-2.0*f);
    return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1,1)),f.x),f.y);
  }
  float fbm(vec2 p) {
    float v=0.0; float a=0.5;
    for(int i=0;i<5;i++){v+=a*noise(p);p*=2.1;a*=0.5;}
    return v;
  }

  void main() {
    vec2 uv = vUv;
    float n1 = fbm(vec2(uv.x*4.0, uv.y*4.0));
    float n2 = fbm(vec2(uv.x*9.0+3.1, uv.y*9.0+1.7));
    float n3 = fbm(vec2(uv.x*18.0, uv.y*18.0));

    // Base terrain blend
    float terrain = n1*0.55 + n2*0.30 + n3*0.15;

    // Mars color palette
    vec3 rust    = vec3(0.76, 0.27, 0.10);
    vec3 orange  = vec3(0.82, 0.42, 0.18);
    vec3 tan     = vec3(0.80, 0.56, 0.32);
    vec3 dark    = vec3(0.40, 0.14, 0.06);
    vec3 dust    = vec3(0.85, 0.62, 0.38);

    vec3 col;
    if      (terrain < 0.25) col = mix(dark,   rust,   terrain/0.25);
    else if (terrain < 0.50) col = mix(rust,   orange, (terrain-0.25)/0.25);
    else if (terrain < 0.75) col = mix(orange, tan,    (terrain-0.50)/0.25);
    else                     col = mix(tan,    dust,   (terrain-0.75)/0.25);

    // Valles Marineris — dark canyon band around equator
    float vmLon = fract(uv.x - 0.42);
    float vmLat = abs(uv.y - 0.48);
    float vm = smoothstep(0.22, 0.0, vmLon) * smoothstep(0.0, 0.22, vmLon)
             * smoothstep(0.08, 0.0, vmLat);
    col = mix(col, dark * 0.7, vm * 0.65);

    // Olympus Mons — slightly lighter highland
    vec2 om = uv - vec2(0.28, 0.56);
    float oms = smoothstep(0.12, 0.0, length(om * vec2(1.8, 2.5)));
    col = mix(col, dust * 1.05, oms * 0.45);

    // Polar ice caps
    float northCap = smoothstep(0.12, 0.02, 1.0 - uv.y);
    float southCap = smoothstep(0.10, 0.01, uv.y);
    vec3 icecol = vec3(0.92, 0.88, 0.84);
    col = mix(col, icecol, northCap * 0.90);
    col = mix(col, icecol, southCap * 0.75);

    // Lighting
    float sunDot = dot(normalize(vWorldNormal), normalize(vec3(4.0, 2.0, 3.0)));
    col *= smoothstep(-0.5, 0.9, sunDot) * 0.40 + 0.60;

    gl_FragColor = vec4(col, 1.0);
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
    gl_FragColor = vec4(0.88, 0.38, 0.14, rim * 0.75);
  }
`;

function MarsMesh() {
  const ref = useRef<THREE.Mesh>(null);
  useFrame((_, delta) => {
    if (ref.current) ref.current.rotation.y += delta * 0.042;
  });
  return (
    <>
      <mesh ref={ref}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial vertexShader={planetVert} fragmentShader={planetFrag} />
      </mesh>
      <mesh scale={[1.028, 1.028, 1.028]}>
        <sphereGeometry args={[1, 48, 48]} />
        <shaderMaterial
          vertexShader={atmVert} fragmentShader={atmFrag}
          side={THREE.FrontSide} transparent depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={[1.10, 1.10, 1.10]}>
        <sphereGeometry args={[1, 32, 32]} />
        <meshBasicMaterial
          color={new THREE.Color(0xcc3300)} transparent opacity={0.09}
          side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false}
        />
      </mesh>
    </>
  );
}

interface MarsGlobeProps {
  onClick?: () => void;
  size?: number;
}

export default function MarsGlobe({ onClick, size = 340 }: MarsGlobeProps) {
  return (
    <button
      onClick={onClick}
      className="group relative focus:outline-none cursor-pointer"
      style={{ width: size + 80, height: size + 80 }}
      aria-label="Ontdek het werkproces"
    >
      <span className="absolute inset-0 rounded-full border border-[#cc3300]/15 animate-ping" style={{ animationDuration: "3.5s" }} />
      <span className="absolute rounded-full border border-[#cc3300]/22 group-hover:border-[#ff6633]/45 transition-all duration-700" style={{ inset: 20 }} />
      <span className="absolute rounded-full border border-[#cc3300]/10 group-hover:border-[#ff6633]/22 transition-all duration-700" style={{ inset: 8 }} />
      <span className="absolute rounded-full bg-[#992200]/7 group-hover:bg-[#cc3300]/15 transition-all duration-700 blur-3xl" style={{ inset: 30 }} />

      <div
        className="absolute rounded-full overflow-hidden transition-all duration-700 group-hover:shadow-[0_0_100px_rgba(200,60,20,0.28),0_0_260px_rgba(160,40,10,0.14)]"
        style={{ inset: 40, boxShadow: "0 0 70px rgba(180,50,15,0.12)", filter: "blur(0.7px)" }}
      >
        <Canvas
          camera={{ position: [0, 0, 2.55], fov: 42 }}
          gl={{ antialias: true, alpha: false }}
          style={{ background: "#030c18", width: "100%", height: "100%" }}
        >
          <directionalLight position={[4, 2, 3]} intensity={2.0} color="#fff4f0" />
          <directionalLight position={[-2, -1, -2]} intensity={0.05} color="#330800" />
          <ambientLight intensity={0.10} />
          <MarsMesh />
        </Canvas>
      </div>

      <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none">
        <span
          className="text-white text-xs tracking-[0.28em] uppercase font-medium"
          style={{ textShadow: "0 0 30px rgba(220,80,30,1), 0 0 60px rgba(180,40,10,0.6)" }}
        >
          Ontdek
        </span>
      </div>
    </button>
  );
}
