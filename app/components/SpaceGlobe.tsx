"use client";

import { useRef, useMemo, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { useTexture } from "@react-three/drei";
import * as THREE from "three";

const vertexShader = `
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;
  void main() {
    vUv = uv;
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    vec4 wp = modelMatrix * vec4(position, 1.0);
    vWorldPos = wp.xyz;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const fragmentShader = `
  uniform sampler2D dayTexture;
  uniform sampler2D nightTexture;
  uniform sampler2D cloudsTexture;
  uniform sampler2D normalMap;
  uniform vec3 sunDirection;
  uniform vec3 cameraDir;
  varying vec2 vUv;
  varying vec3 vWorldNormal;
  varying vec3 vWorldPos;

  vec3 perturbNormal(vec3 N, vec2 uv) {
    // Tangent-space normal lookup, lightly weighted so terrain shows
    // without overwhelming the texture.
    vec3 mapN = texture2D(normalMap, uv).xyz * 2.0 - 1.0;
    mapN.xy *= 0.55;
    // Build a crude tangent frame from world normal — fine for a slow-
    // rotating distant globe.
    vec3 T = normalize(cross(vec3(0.0, 1.0, 0.0), N));
    vec3 B = normalize(cross(N, T));
    return normalize(T * mapN.x + B * mapN.y + N * mapN.z);
  }

  void main() {
    vec3 N = perturbNormal(normalize(vWorldNormal), vUv);
    vec3 L = normalize(sunDirection);
    float sunDot = dot(N, L);

    // Smooth day/night terminator — soft band around the sub-solar
    // boundary so the shadow line reads as atmospheric rather than a hard
    // edge.
    float blend = smoothstep(-0.18, 0.22, sunDot);

    vec3 dayCol = texture2D(dayTexture, vUv).rgb;
    vec3 nightCol = texture2D(nightTexture, vUv).rgb;

    // Day side: lambertian-ish shaded day texture (kept warm at the
    // terminator, brighter near sub-solar point).
    vec3 lit = dayCol * (0.35 + 0.85 * max(sunDot, 0.0));

    // Night side: city lights only show where it's genuinely dark.
    float nightMask = smoothstep(0.15, -0.05, sunDot);
    vec3 night = nightCol * 2.4 * nightMask;
    // Faint blue moonlight on the dark side keeps the silhouette readable.
    vec3 moonlit = dayCol * 0.045 * nightMask * vec3(0.55, 0.7, 1.0);

    vec3 earth = mix(moonlit + night, lit, blend);

    // Specular ocean glint — only where the day texture's blue channel
    // dominates (water) and only on the sun-facing hemisphere.
    vec3 V = normalize(cameraDir);
    vec3 H = normalize(L + V);
    float spec = pow(max(dot(N, H), 0.0), 32.0);
    float water = smoothstep(0.18, 0.45, dayCol.b - dayCol.r);
    earth += vec3(0.9, 0.95, 1.0) * spec * water * max(sunDot, 0.0) * 0.6;

    // Atmospheric scattering at the limb — warm rim on the day side, cool
    // on the terminator.
    float rim = pow(1.0 - max(dot(N, V), 0.0), 2.5);
    vec3 atmTint = mix(vec3(0.25, 0.45, 0.9), vec3(0.95, 0.7, 0.5), pow(max(sunDot, 0.0), 0.6));
    earth += atmTint * rim * 0.35 * blend;

    // Clouds — only lit by the sun, with a subtle shadow on the surface
    // underneath for depth.
    float cloud = texture2D(cloudsTexture, vUv).r;
    float cloudLit = cloud * (0.3 + 0.7 * max(sunDot, 0.0));
    earth *= 1.0 - cloud * 0.25 * blend; // soft cast shadow
    earth = mix(earth, vec3(1.0), cloudLit * 0.55 * blend);

    gl_FragColor = vec4(earth, 1.0);
  }
`;

const atmFragmentShader = `
  uniform vec3 sunDirection;
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  void main() {
    float rim = 1.0 - abs(dot(vNormal, vec3(0.0, 0.0, 1.0)));
    rim = pow(rim, 2.0);
    float sunDot = max(dot(normalize(vWorldNormal), normalize(sunDirection)), 0.0);
    // Atmosphere is bright cyan on the day limb, fades to deep blue on
    // the night side instead of glowing uniformly.
    vec3 dayTint = vec3(0.32, 0.62, 1.0);
    vec3 nightTint = vec3(0.05, 0.10, 0.22);
    vec3 col = mix(nightTint, dayTint, pow(sunDot, 0.5));
    gl_FragColor = vec4(col, rim * (0.45 + 0.85 * sunDot));
  }
`;

const atmVertexShaderFull = `
  varying vec3 vNormal;
  varying vec3 vWorldNormal;
  void main() {
    vNormal = normalize(normalMatrix * normal);
    vWorldNormal = normalize(mat3(modelMatrix) * normal);
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

const SUN_DIR = new THREE.Vector3(4, 2, 3).normalize();
useTexture.preload([
  "/earth-texture.jpg",
  "/earth-night.jpg",
  "/earth-clouds.jpg",
  "/earth-normal.png",
]);

function EarthScene() {
  const meshRef = useRef<THREE.Mesh>(null);
  const [dayMap, nightMap, cloudsMap, normalMap] = useTexture([
    "/earth-texture.jpg",
    "/earth-night.jpg",
    "/earth-clouds.jpg",
    "/earth-normal.png",
  ]);
  // Three.js r152+ leest texture defaults als linear — color-maps moeten SRGB zijn anders blijft alles pikzwart
  useMemo(() => {
    dayMap.colorSpace = THREE.SRGBColorSpace;
    nightMap.colorSpace = THREE.SRGBColorSpace;
    cloudsMap.colorSpace = THREE.SRGBColorSpace;
    // Normal map blijft linear — geen sRGB conversie
    dayMap.anisotropy = 8;
    nightMap.anisotropy = 8;
    cloudsMap.anisotropy = 8;
    normalMap.anisotropy = 8;
    dayMap.needsUpdate = true;
    nightMap.needsUpdate = true;
    cloudsMap.needsUpdate = true;
    normalMap.needsUpdate = true;
  }, [dayMap, nightMap, cloudsMap, normalMap]);
  const earthMaterial = useMemo(() => {
    return new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms: {
        dayTexture: { value: dayMap },
        nightTexture: { value: nightMap },
        cloudsTexture: { value: cloudsMap },
        normalMap: { value: normalMap },
        sunDirection: { value: SUN_DIR },
        cameraDir: { value: new THREE.Vector3(0, 0, 1) },
      },
    });
  }, [dayMap, nightMap, cloudsMap, normalMap]);
  useFrame((state, delta) => {
    if (meshRef.current) meshRef.current.rotation.y += delta * 0.04;
    (earthMaterial.uniforms.cameraDir.value as THREE.Vector3)
      .copy(state.camera.position)
      .normalize();
  });
  return (
    <>
      <mesh ref={meshRef}>
        <sphereGeometry args={[1, 128, 128]} />
        <primitive object={earthMaterial} attach="material" />
      </mesh>
      <mesh scale={[1.022, 1.022, 1.022]}>
        <sphereGeometry args={[1, 96, 96]} />
        <shaderMaterial
          vertexShader={atmVertexShaderFull}
          fragmentShader={atmFragmentShader}
          uniforms={{ sunDirection: { value: SUN_DIR } }}
          side={THREE.FrontSide}
          transparent
          depthWrite={false}
          blending={THREE.AdditiveBlending}
        />
      </mesh>
      <mesh scale={[1.14, 1.14, 1.14]}>
        <sphereGeometry args={[1, 64, 64]} />
        <meshBasicMaterial color={new THREE.Color(0x2266ff)} transparent opacity={0.09} side={THREE.BackSide} blending={THREE.AdditiveBlending} depthWrite={false} />
      </mesh>
    </>
  );
}

export default function SpaceGlobe() {
  return (
    <div
      className="pointer-events-none select-none"
      style={{ position:"absolute", bottom:"-165px", right:"-130px", width:520, height:520, zIndex:0 }}
    >
      <Canvas
        camera={{ position: [0, 0, 2.55], fov: 42 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent", borderRadius: "50%" }}
      >
        <Suspense fallback={null}>
          <EarthScene />
        </Suspense>
      </Canvas>
    </div>
  );
}
