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

useTexture.preload(["/earth-texture.jpg", "/earth-night.jpg", "/earth-clouds.jpg"]);

function EarthScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const cloudsRef = useRef<THREE.Mesh>(null);
  const [dayMap, nightMap, cloudsMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-night.jpg",
    "/earth-clouds.jpg",
  ]);
  // Built-in materials respecteren texture.colorSpace correct, dus zet 'm
  // hier zodat de sRGB-JPGs niet als linear gesampled worden (=zwart).
  dayMap.colorSpace = THREE.SRGBColorSpace;
  nightMap.colorSpace = THREE.SRGBColorSpace;
  // cloudsMap blijft alpha — geen color decode nodig
  useFrame((_, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.055;
    if (cloudsRef.current) cloudsRef.current.rotation.y += delta * 0.063;
  });
  return (
    <>
      {/* Earth — meshStandardMaterial krijgt z'n dag/nacht-shading automatisch
          van de directionalLight die op zonpositie staat. emissiveMap = de
          night-texture (city lights), die alleen zichtbaar wordt waar het
          dag-licht weg is. */}
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 96, 96]} />
        <meshStandardMaterial
          map={dayMap}
          emissiveMap={nightMap}
          emissive={new THREE.Color(0xffd07a)}
          emissiveIntensity={1.4}
          roughness={1}
          metalness={0}
        />
      </mesh>
      {/* Clouds — losse iets snellere sphere met cloudsMap als alpha. */}
      <mesh ref={cloudsRef} scale={[1.012, 1.012, 1.012]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshStandardMaterial
          alphaMap={cloudsMap}
          color={new THREE.Color(0xffffff)}
          transparent
          opacity={0.55}
          roughness={1}
          metalness={0}
          depthWrite={false}
        />
      </mesh>
      {/* Atmosphere rim — onveranderd. */}
      <mesh scale={[1.04, 1.04, 1.04]}>
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
        onCreated={({ gl }) => {
          // Forceer SRGB output zodat linear-shading correct terug naar
          // sRGB encoded wordt — anders blijft alles pikzwart.
          gl.outputColorSpace = THREE.SRGBColorSpace;
        }}
      >
        <directionalLight position={[4, 2, 3]} intensity={2.4} color="#fff8f0" />
        <directionalLight position={[-2, -1, -2]} intensity={0.06} color="#224488" />
        <ambientLight intensity={0.18} />
        <Suspense fallback={null}>
          <EarthScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
