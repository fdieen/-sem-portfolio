"use client";

import { useRef, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

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

useTexture.preload(["/earth-texture.jpg", "/earth-clouds.jpg"]);

function EarthScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [dayMap, cloudsMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-clouds.jpg",
  ]);
  // Built-in materials gebruiken texture.colorSpace voor sRGB decode.
  dayMap.colorSpace = THREE.SRGBColorSpace;

  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.055;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.063;
  });

  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshBasicMaterial map={dayMap} toneMapped={false} />
      </mesh>
      <mesh ref={cloudsRef} scale={[1.012, 1.012, 1.012]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial
          alphaMap={cloudsMap}
          color={new THREE.Color(0xffffff)}
          transparent
          opacity={0.5}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
      <mesh scale={[1.035, 1.035, 1.035]}>
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
        <meshBasicMaterial
          color={new THREE.Color(0x2266ff)}
          transparent
          opacity={0.13}
          side={THREE.BackSide}
          blending={THREE.AdditiveBlending}
          depthWrite={false}
          toneMapped={false}
        />
      </mesh>
    </>
  );
}

export default function SpaceGlobe() {
  return (
    <div
      className="pointer-events-none select-none"
      style={{
        position: "absolute",
        bottom: "-165px",
        right: "-130px",
        width: 520,
        height: 520,
        zIndex: 0,
      }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.55], fov: 42 }}
        gl={{ antialias: true, alpha: false }}
        style={{ background: "#030c18", borderRadius: "50%" }}
        onCreated={({ gl }) => {
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <Suspense fallback={null}>
          <EarthScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
