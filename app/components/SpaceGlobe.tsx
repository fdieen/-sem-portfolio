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
    earth.rgb = mix(earth.rgb, vec3(1.0), cloud * 0.45 * blend);
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
    rim = pow(rim, 1.0);
    gl_FragColor = vec4(0.18, 0.58, 1.0, rim * 1.15);
  }
`;

const SUN_DIR = new THREE.Vector3(4, 2, 3).normalize();
useTexture.preload(["/earth-texture.jpg", "/earth-night.jpg", "/earth-clouds.jpg"]);

function EarthScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dayMap, nightMap, cloudsMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-night.jpg",
    "/earth-clouds.jpg",
  ]);
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.055;
  });
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={vertexShader}
          fragmentShader={fragmentShader}
          uniforms={{
            dayTexture: { value: dayMap },
            nightTexture: { value: nightMap },
            cloudsTexture: { value: cloudsMap },
            sunDirection: { value: SUN_DIR },
          }}
        />
      </mesh>
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
      <mesh scale={[1.10, 1.10, 1.10]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0x2266ff)} transparent opacity={0.13} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function SpaceGlobe() {
  return (
    <div
      className="pointer-events-none select-none"
      style={{ position:"absolute", bottom:"-165px", right:"-130px", width:520, height:520, zIndex:0, filter:"blur(0.7px)" }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.55], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#030c18", borderRadius: "50%" }}
      >
        <directionalLight position={[4, 2, 3]} intensity={2.2} color="#fff8f0" />
        <directionalLight position={[-2, -1, -2]} intensity={0.04} color="#224488" />
        <ambientLight intensity={0.05} />
        <Suspense fallback={null}>
          <EarthScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
