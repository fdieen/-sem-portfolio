"use client";

import { useEffect, useRef, useState } from "react";

/* ──────────────────────────────────────────────────────────────────────
   Port of dashersw/liquid-glass-js — WebGL-driven iOS 26 liquid glass.
   The shader and pipeline are kept faithful to the original repo:

     1. html2canvas snapshots the page body once into an off-screen
        canvas (shared across every LiquidGlass instance).
     2. Each element gets its own WebGL <canvas> overlay.
     3. A fragment shader samples that page snapshot with edge/rim/base
        refraction (driven by exp falloff curves on the distance-from-
        edge for the rounded-rect shape) and a 13×13 Gaussian blur.
     4. A soft top→bottom tint plus a sampled-background tint give the
        glass its "alive" feel.
     5. The shape's signed distance is used as an anti-aliased alpha
        mask so the canvas appears as a clean rounded rect.

   On scroll/resize the snapshot is invalidated and re-captured, so
   the refraction stays in sync with what's actually behind the glass.
   ────────────────────────────────────────────────────────────────────── */

let pageSnapshotCanvas: HTMLCanvasElement | null = null;
let pageSnapshotImage: HTMLImageElement | null = null;
let captureInFlight = false;
const captureWaiters: Array<() => void> = [];
const instanceCallbacks = new Set<() => void>();

async function ensurePageSnapshot(): Promise<HTMLImageElement> {
  if (pageSnapshotImage) return pageSnapshotImage;
  if (captureInFlight) {
    await new Promise<void>((resolve) => captureWaiters.push(resolve));
    if (pageSnapshotImage) return pageSnapshotImage;
  }

  captureInFlight = true;
  try {
    const { default: html2canvas } = await import("html2canvas");
    const snap = await html2canvas(document.body, {
      scale: 1,
      useCORS: true,
      allowTaint: true,
      backgroundColor: null,
      logging: false,
      ignoreElements: (el: Element) =>
        el.classList?.contains("liquid-glass-root"),
    });
    pageSnapshotCanvas = snap;
    const img = new Image();
    img.src = snap.toDataURL();
    await new Promise<void>((resolve) => {
      img.onload = () => resolve();
      img.onerror = () => resolve();
    });
    pageSnapshotImage = img;
  } finally {
    captureInFlight = false;
    const waiters = captureWaiters.splice(0);
    waiters.forEach((cb) => cb());
  }
  return pageSnapshotImage!;
}

function invalidateSnapshot() {
  pageSnapshotCanvas = null;
  pageSnapshotImage = null;
  instanceCallbacks.forEach((cb) => cb());
}

/* Re-capture the page snapshot whenever the layout settles after a
   resize. Scrolling alone doesn't need a fresh snapshot — the shader
   reads `u_scrollY` every frame and offsets the texture lookup. */
if (typeof window !== "undefined") {
  let resizeTimer: number | null = null;
  window.addEventListener("resize", () => {
    if (resizeTimer) window.clearTimeout(resizeTimer);
    resizeTimer = window.setTimeout(invalidateSnapshot, 250);
  });
}

const VERTEX_SHADER = `
attribute vec2 a_position;
attribute vec2 a_texcoord;
varying vec2 v_texcoord;
void main() {
  gl_Position = vec4(a_position, 0, 1);
  v_texcoord = a_texcoord;
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

uniform sampler2D u_image;
uniform vec2 u_resolution;
uniform vec2 u_textureSize;
uniform float u_scrollY;
uniform float u_blurRadius;
uniform float u_borderRadius;
uniform vec2 u_containerPosition;
uniform float u_edgeIntensity;
uniform float u_rimIntensity;
uniform float u_baseIntensity;
uniform float u_edgeDistance;
uniform float u_rimDistance;
uniform float u_baseDistance;
uniform float u_cornerBoost;
uniform float u_rippleEffect;
uniform float u_tintOpacity;
uniform float u_time;
uniform float u_twistAmount;
uniform float u_causticAmount;

varying vec2 v_texcoord;

float roundedRectDistance(vec2 coord, vec2 size, float radius) {
  vec2 center = size * 0.5;
  vec2 pixelCoord = coord * size;
  vec2 toCorner = abs(pixelCoord - center) - (center - radius);
  float outsideCorner = length(max(toCorner, 0.0));
  float insideCorner = min(max(toCorner.x, toCorner.y), 0.0);
  return outsideCorner + insideCorner - radius;
}

void main() {
  vec2 coord = v_texcoord;
  vec2 containerSize = u_resolution;
  vec2 textureSize = u_textureSize;
  vec2 containerCenter = u_containerPosition + vec2(0.0, u_scrollY);
  vec2 containerOffset = (coord - 0.5) * containerSize;
  vec2 pagePixel = containerCenter + containerOffset;
  vec2 textureCoord = pagePixel / textureSize;

  /* Signed distance to the rounded-rect edge. Negative outside the
     shape, zero on the edge, positive inside. */
  float distFromEdgeShape = -roundedRectDistance(coord, u_resolution, u_borderRadius);
  distFromEdgeShape = max(distFromEdgeShape, 0.0);

  vec2 shapeNormal = normalize(coord - vec2(0.5));
  float normalizedDistance = distFromEdgeShape;

  /* Swirl: rotate the refraction direction by an angle that varies
     with distance to the rim and with time. At u_twistAmount = 0 this
     is a no-op. On hover it cranks up and the whole shape spirals. */
  float swirlAngle = u_twistAmount * (1.6 + 0.6 * sin(u_time * 0.7))
                   * exp(-distFromEdgeShape * 0.04);
  float swCos = cos(swirlAngle);
  float swSin = sin(swirlAngle);
  shapeNormal = vec2(
    shapeNormal.x * swCos - shapeNormal.y * swSin,
    shapeNormal.x * swSin + shapeNormal.y * swCos
  );

  /* Three falloff bands of refraction: a soft "lensing" through the
     centre, an edge bend, and a tight rim bend at the very perimeter. */
  float baseIntensity = 1.0 - exp(-normalizedDistance * u_baseDistance);
  float edgeIntensity = exp(-normalizedDistance * u_edgeDistance);
  float rimIntensity = exp(-normalizedDistance * u_rimDistance);
  float totalIntensity =
    baseIntensity * u_baseIntensity +
    edgeIntensity * u_edgeIntensity +
    rimIntensity * u_rimIntensity;
  // Amplify the visible bend — keeps the user-facing uniforms in the
  // demo's familiar range while making the refraction read strongly
  // against a low-contrast page background.
  vec2 baseRefraction = shapeNormal * totalIntensity * 3.0;

  /* Extra inward bend right at the rounded corners. */
  float distFromLeft = coord.x;
  float distFromRight = 1.0 - coord.x;
  float distFromTop = coord.y;
  float distFromBottom = 1.0 - coord.y;
  float cornerProximityX = min(distFromLeft, distFromRight);
  float cornerProximityY = min(distFromTop, distFromBottom);
  float cornerDistance = max(cornerProximityX, cornerProximityY);
  float cornerNormalized = cornerDistance * min(u_resolution.x, u_resolution.y);
  float cornerBoost = exp(-cornerNormalized * 0.3) * u_cornerBoost;
  vec2 cornerRefraction = shapeNormal * cornerBoost * 3.0;

  /* Tangential ripple — animates over time so the swirl moves like a
     fluid. On hover, u_twistAmount lifts the ripple off the rim and lets
     it spread across the body of the glass, giving the entire shape a
     visible twisting flow rather than just a wiggle on the perimeter. */
  vec2 perpendicular = vec2(-shapeNormal.y, shapeNormal.x);
  float dirAngle = atan(shapeNormal.y, shapeNormal.x);
  float ripplePhase = distFromEdgeShape * 18.0 + dirAngle * 3.0 + u_time * 2.0;
  float rippleBand = sin(ripplePhase) * u_rippleEffect;
  /* Rim factor keeps the static look: ripple stays near the rim when
     u_twistAmount = 0. When u_twistAmount ramps up, the (+ twistAmount)
     term adds a constant floor so the ripple bleeds inward across the
     whole shape. */
  float rippleField = rippleBand * (rimIntensity + u_twistAmount);
  vec2 textureRefraction = perpendicular * rippleField * 2.5;

  textureCoord += baseRefraction + cornerRefraction + textureRefraction;

  /* 13×13 Gaussian blur sample of the page texture. */
  vec4 color = vec4(0.0);
  vec2 texelSize = 1.0 / u_textureSize;
  float sigma = max(u_blurRadius, 0.0001) / 2.0;
  vec2 blurStep = texelSize * sigma;
  float totalWeight = 0.0;
  for (float i = -6.0; i <= 6.0; i += 1.0) {
    for (float j = -6.0; j <= 6.0; j += 1.0) {
      float d = length(vec2(i, j));
      if (d > 6.0) continue;
      float weight = exp(-(d * d) / (2.0 * sigma * sigma));
      vec2 offset = vec2(i, j) * blurStep;
      color += texture2D(u_image, textureCoord + offset) * weight;
      totalWeight += weight;
    }
  }
  color /= totalWeight;

  /* Soft top-light gradient — slightly brighter at the top, darker at
     the bottom, to suggest light falling on the glass surface. */
  float gradientPosition = coord.y;
  vec3 topTint = vec3(1.0);
  vec3 bottomTint = vec3(0.7);
  vec3 gradientTint = mix(topTint, bottomTint, gradientPosition);
  vec3 tintedColor = mix(color.rgb, gradientTint, u_tintOpacity);
  color = vec4(tintedColor, color.a);

  /* Moving caustic highlight — two bright lobes that rotate around the
     shape, riding just inside the rim. This is what reads as the bright
     "glass surface" lines in real soap-bubble / liquid-glass refs. */
  float rimZone = exp(-distFromEdgeShape * 0.45);
  float causticAngle = atan(shapeNormal.y, shapeNormal.x);
  float causticPhase = causticAngle * 2.0 + u_time * 0.9;
  float caustic = max(0.0, sin(causticPhase) - 0.25) * 1.33;
  color.rgb = mix(color.rgb, vec3(1.0), caustic * rimZone * u_causticAmount);

  /* Visible spiral arms — bright streaks that spin through the glass on
     hover. Drawn procedurally so they show up regardless of what's
     behind the card. Fades to nothing at u_twistAmount = 0. */
  vec2 swirlCoord = coord - vec2(0.5);
  float swirlR = length(swirlCoord);
  float swirlA = atan(swirlCoord.y, swirlCoord.x);
  float armPattern = sin(swirlA * 3.0 + swirlR * 22.0 - u_time * 1.2);
  armPattern = pow(max(0.0, armPattern), 4.0);
  /* Stay inside the shape — fade to 0 right at the rim. */
  float armBodyMask = smoothstep(0.0, 12.0, distFromEdgeShape);
  float armHoverMask = smoothstep(0.0, 0.4, u_twistAmount);
  color.rgb = mix(color.rgb, vec3(1.0), armPattern * armBodyMask * armHoverMask * 0.3);

  /* Anti-aliased rounded-rect alpha mask. */
  float maskDistance = roundedRectDistance(coord, u_resolution, u_borderRadius);
  float mask = 1.0 - smoothstep(-1.0, 1.0, maskDistance);
  gl_FragColor = vec4(color.rgb, mask);
}
`;

function compileShader(gl: WebGLRenderingContext, type: number, source: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, source);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    console.error("Shader compile error:", gl.getShaderInfoLog(shader));
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

function linkProgram(gl: WebGLRenderingContext, vs: WebGLShader, fs: WebGLShader) {
  const program = gl.createProgram();
  if (!program) return null;
  gl.attachShader(program, vs);
  gl.attachShader(program, fs);
  gl.linkProgram(program);
  if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
    console.error("Program link error:", gl.getProgramInfoLog(program));
    gl.deleteProgram(program);
    return null;
  }
  return program;
}

type LiquidGlassProps = {
  children?: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
  /** Border radius in px. */
  borderRadius?: number;
  /** Top→bottom tint strength (0..1). */
  tintOpacity?: number;
  /** Gaussian blur radius for the page sample. */
  blurRadius?: number;
  /** How aggressively the rim bends light. */
  rimIntensity?: number;
  /** How aggressively the mid-zone bends light. */
  edgeIntensity?: number;
  /** How aggressively the body of the glass bends light. */
  baseIntensity?: number;
  edgeDistance?: number;
  rimDistance?: number;
  baseDistance?: number;
  cornerBoost?: number;
  rippleEffect?: number;
};

export default function LiquidGlass({
  children,
  className = "",
  style,
  borderRadius = 20,
  tintOpacity = 0.18,
  blurRadius = 5,
  rimIntensity = 0.35,
  edgeIntensity = 0.18,
  baseIntensity = 0.08,
  edgeDistance = 0.15,
  rimDistance = 0.8,
  baseDistance = 0.1,
  cornerBoost = 0.08,
  rippleEffect = 0.18,
}: LiquidGlassProps) {
  const rootRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hovered, setHovered] = useState(false);
  const hoverTargetRef = useRef(0);
  const hoverProgressRef = useRef(0);

  useEffect(() => {
    hoverTargetRef.current = hovered ? 1 : 0;
  }, [hovered]);

  useEffect(() => {
    const root = rootRef.current;
    const canvas = canvasRef.current;
    if (!root || !canvas) return;

    const gl = canvas.getContext("webgl", { preserveDrawingBuffer: true, premultipliedAlpha: false });
    if (!gl) {
      console.warn("WebGL not supported — LiquidGlass will fall back to a plain backdrop.");
      return;
    }

    let program: WebGLProgram | null = null;
    let texture: WebGLTexture | null = null;
    let positionBuffer: WebGLBuffer | null = null;
    let texcoordBuffer: WebGLBuffer | null = null;
    let resolutionLoc: WebGLUniformLocation | null = null;
    let textureSizeLoc: WebGLUniformLocation | null = null;
    let scrollYLoc: WebGLUniformLocation | null = null;
    let borderRadiusLoc: WebGLUniformLocation | null = null;
    let containerPositionLoc: WebGLUniformLocation | null = null;
    let blurRadiusLoc: WebGLUniformLocation | null = null;
    let edgeIntensityLoc: WebGLUniformLocation | null = null;
    let rimIntensityLoc: WebGLUniformLocation | null = null;
    let baseIntensityLoc: WebGLUniformLocation | null = null;
    let edgeDistanceLoc: WebGLUniformLocation | null = null;
    let rimDistanceLoc: WebGLUniformLocation | null = null;
    let baseDistanceLoc: WebGLUniformLocation | null = null;
    let cornerBoostLoc: WebGLUniformLocation | null = null;
    let rippleEffectLoc: WebGLUniformLocation | null = null;
    let tintOpacityLoc: WebGLUniformLocation | null = null;
    let timeLoc: WebGLUniformLocation | null = null;
    let twistAmountLoc: WebGLUniformLocation | null = null;
    let causticAmountLoc: WebGLUniformLocation | null = null;
    let imageLoc: WebGLUniformLocation | null = null;
    const startTime = performance.now();

    let cancelled = false;
    let rafId = 0;
    let needsDraw = true;

    function compile() {
      if (cancelled) return;
      const vs = compileShader(gl!, gl!.VERTEX_SHADER, VERTEX_SHADER);
      const fs = compileShader(gl!, gl!.FRAGMENT_SHADER, FRAGMENT_SHADER);
      if (!vs || !fs) return;
      program = linkProgram(gl!, vs, fs);
      if (!program) return;
      gl!.useProgram(program);

      positionBuffer = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
        gl!.STATIC_DRAW,
      );

      texcoordBuffer = gl!.createBuffer();
      gl!.bindBuffer(gl!.ARRAY_BUFFER, texcoordBuffer);
      gl!.bufferData(
        gl!.ARRAY_BUFFER,
        new Float32Array([0, 1, 1, 1, 0, 0, 0, 0, 1, 1, 1, 0]),
        gl!.STATIC_DRAW,
      );

      const positionLoc = gl!.getAttribLocation(program, "a_position");
      const texcoordLoc = gl!.getAttribLocation(program, "a_texcoord");
      resolutionLoc = gl!.getUniformLocation(program, "u_resolution");
      textureSizeLoc = gl!.getUniformLocation(program, "u_textureSize");
      scrollYLoc = gl!.getUniformLocation(program, "u_scrollY");
      borderRadiusLoc = gl!.getUniformLocation(program, "u_borderRadius");
      containerPositionLoc = gl!.getUniformLocation(program, "u_containerPosition");
      blurRadiusLoc = gl!.getUniformLocation(program, "u_blurRadius");
      edgeIntensityLoc = gl!.getUniformLocation(program, "u_edgeIntensity");
      rimIntensityLoc = gl!.getUniformLocation(program, "u_rimIntensity");
      baseIntensityLoc = gl!.getUniformLocation(program, "u_baseIntensity");
      edgeDistanceLoc = gl!.getUniformLocation(program, "u_edgeDistance");
      rimDistanceLoc = gl!.getUniformLocation(program, "u_rimDistance");
      baseDistanceLoc = gl!.getUniformLocation(program, "u_baseDistance");
      cornerBoostLoc = gl!.getUniformLocation(program, "u_cornerBoost");
      rippleEffectLoc = gl!.getUniformLocation(program, "u_rippleEffect");
      tintOpacityLoc = gl!.getUniformLocation(program, "u_tintOpacity");
      timeLoc = gl!.getUniformLocation(program, "u_time");
      twistAmountLoc = gl!.getUniformLocation(program, "u_twistAmount");
      causticAmountLoc = gl!.getUniformLocation(program, "u_causticAmount");
      imageLoc = gl!.getUniformLocation(program, "u_image");

      gl!.bindBuffer(gl!.ARRAY_BUFFER, positionBuffer);
      gl!.enableVertexAttribArray(positionLoc);
      gl!.vertexAttribPointer(positionLoc, 2, gl!.FLOAT, false, 0, 0);
      gl!.bindBuffer(gl!.ARRAY_BUFFER, texcoordBuffer);
      gl!.enableVertexAttribArray(texcoordLoc);
      gl!.vertexAttribPointer(texcoordLoc, 2, gl!.FLOAT, false, 0, 0);

      texture = gl!.createTexture();
      gl!.bindTexture(gl!.TEXTURE_2D, texture);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MIN_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_MAG_FILTER, gl!.LINEAR);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_S, gl!.CLAMP_TO_EDGE);
      gl!.texParameteri(gl!.TEXTURE_2D, gl!.TEXTURE_WRAP_T, gl!.CLAMP_TO_EDGE);

      gl!.enable(gl!.BLEND);
      gl!.blendFunc(gl!.SRC_ALPHA, gl!.ONE_MINUS_SRC_ALPHA);
      gl!.clearColor(0, 0, 0, 0);
    }

    function uploadTexture(img: HTMLImageElement) {
      if (!gl || !texture) return;
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, img);
      if (textureSizeLoc) gl.uniform2f(textureSizeLoc, img.width, img.height);
    }

    function resize() {
      if (!gl || !root) return;
      const rect = root.getBoundingClientRect();
      const w = Math.max(2, Math.ceil(rect.width));
      const h = Math.max(2, Math.ceil(rect.height));
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const cw = Math.round(w * dpr);
      const ch = Math.round(h * dpr);
      if (canvas!.width !== cw || canvas!.height !== ch) {
        canvas!.width = cw;
        canvas!.height = ch;
      }
      gl.viewport(0, 0, cw, ch);
      if (resolutionLoc) gl.uniform2f(resolutionLoc, w, h);
      const effectiveRadius = Math.min(borderRadius, Math.min(w, h) / 2);
      if (borderRadiusLoc) gl.uniform1f(borderRadiusLoc, effectiveRadius);
      needsDraw = true;
    }

    function updateUniforms() {
      if (!gl || !program) return;
      gl.useProgram(program);
      if (blurRadiusLoc) gl.uniform1f(blurRadiusLoc, blurRadius);
      if (edgeIntensityLoc) gl.uniform1f(edgeIntensityLoc, edgeIntensity);
      if (rimIntensityLoc) gl.uniform1f(rimIntensityLoc, rimIntensity);
      if (baseIntensityLoc) gl.uniform1f(baseIntensityLoc, baseIntensity);
      if (edgeDistanceLoc) gl.uniform1f(edgeDistanceLoc, edgeDistance);
      if (rimDistanceLoc) gl.uniform1f(rimDistanceLoc, rimDistance);
      if (baseDistanceLoc) gl.uniform1f(baseDistanceLoc, baseDistance);
      if (cornerBoostLoc) gl.uniform1f(cornerBoostLoc, cornerBoost);
      if (rippleEffectLoc) gl.uniform1f(rippleEffectLoc, rippleEffect);
      if (tintOpacityLoc) gl.uniform1f(tintOpacityLoc, tintOpacity);
      if (imageLoc) gl.uniform1i(imageLoc, 0);
      needsDraw = true;
    }

    function draw() {
      if (!gl || !program || !root || !texture) return;
      const rect = root.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      gl.useProgram(program);
      if (containerPositionLoc) gl.uniform2f(containerPositionLoc, centerX, centerY);
      if (scrollYLoc) gl.uniform1f(scrollYLoc, window.scrollY);

      /* On hover everything cranks: refraction, ripple, corner bend.
         twistAmount drives both the swirl rotation in the shader and
         how far the ripple bleeds from the rim into the body — at
         max it dominates the whole glass. causticAmount drives the
         bright moving highlights along the rim. */
      const p = hoverProgressRef.current;
      const intensityMul = 1 + p * 4.0;
      const rippleMul = 1 + p * 16.0;
      const cornerMul = 1 + p * 5.0;
      const t = (performance.now() - startTime) / 1000;
      if (rimIntensityLoc) gl.uniform1f(rimIntensityLoc, rimIntensity * intensityMul);
      if (edgeIntensityLoc) gl.uniform1f(edgeIntensityLoc, edgeIntensity * intensityMul);
      if (baseIntensityLoc) gl.uniform1f(baseIntensityLoc, baseIntensity * intensityMul);
      if (cornerBoostLoc) gl.uniform1f(cornerBoostLoc, cornerBoost * cornerMul);
      if (rippleEffectLoc) gl.uniform1f(rippleEffectLoc, rippleEffect * rippleMul);
      if (timeLoc) gl.uniform1f(timeLoc, t);
      if (twistAmountLoc) gl.uniform1f(twistAmountLoc, p * 2.2);
      if (causticAmountLoc) gl.uniform1f(causticAmountLoc, 0.2 + p * 1.1);

      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.clear(gl.COLOR_BUFFER_BIT);
      gl.drawArrays(gl.TRIANGLES, 0, 6);
    }

    function tick() {
      if (cancelled) return;
      const target = hoverTargetRef.current;
      const current = hoverProgressRef.current;
      const diff = target - current;
      if (Math.abs(diff) > 0.001) {
        hoverProgressRef.current = current + diff * 0.12;
      } else if (current !== target) {
        hoverProgressRef.current = target;
      }
      /* Always redraw — the shader is now animated by u_time so each
         frame produces a slightly different ripple / caustic, even when
         the user isn't hovering. */
      draw();
      needsDraw = false;
      rafId = window.requestAnimationFrame(tick);
    }

    compile();
    resize();
    updateUniforms();

    let resizeObserver: ResizeObserver | null = null;
    if (typeof ResizeObserver !== "undefined") {
      resizeObserver = new ResizeObserver(() => {
        resize();
      });
      resizeObserver.observe(root);
    }

    const onScroll = () => {
      needsDraw = true;
    };
    window.addEventListener("scroll", onScroll, { passive: true });

    const onSnapshotInvalidated = () => {
      ensurePageSnapshot().then((img) => {
        if (cancelled) return;
        uploadTexture(img);
        needsDraw = true;
      });
    };
    instanceCallbacks.add(onSnapshotInvalidated);

    ensurePageSnapshot().then((img) => {
      if (cancelled) return;
      uploadTexture(img);
      needsDraw = true;
      tick();
    });

    return () => {
      cancelled = true;
      window.cancelAnimationFrame(rafId);
      window.removeEventListener("scroll", onScroll);
      instanceCallbacks.delete(onSnapshotInvalidated);
      resizeObserver?.disconnect();
      if (texture) gl.deleteTexture(texture);
      if (positionBuffer) gl.deleteBuffer(positionBuffer);
      if (texcoordBuffer) gl.deleteBuffer(texcoordBuffer);
      if (program) gl.deleteProgram(program);
    };
  }, [
    borderRadius,
    tintOpacity,
    blurRadius,
    rimIntensity,
    edgeIntensity,
    baseIntensity,
    edgeDistance,
    rimDistance,
    baseDistance,
    cornerBoost,
    rippleEffect,
  ]);

  return (
    <div
      ref={rootRef}
      className={`liquid-glass-root ${className}`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative",
        isolation: "isolate",
        borderRadius,
        // Almost no frost at all — the WebGL canvas + glare layers carry
        // the entire glass look. The CSS just contributes the rim shadow
        // and the bezel highlight stripe.
        background: "transparent",
        border: "1px solid rgba(255,255,255,0.18)",
        boxShadow: hovered
          ? "0 14px 38px rgba(0,0,0,0.34), 0 0 0 1px rgba(255,255,255,0.10), inset 0 0 0 1px rgba(255,255,255,0.08), inset 0 1px 0 rgba(255,255,255,0.5), inset 0 -1px 0 rgba(0,0,0,0.28)"
          : "0 8px 28px rgba(0,0,0,0.22), inset 0 0 0 1px rgba(255,255,255,0.06), inset 0 1px 0 rgba(255,255,255,0.4), inset 0 -1px 0 rgba(0,0,0,0.25)",
        transform: hovered
          ? "scale(1.03) rotate(1.4deg)"
          : "scale(1) rotate(0deg)",
        transition:
          "transform 360ms cubic-bezier(0.2, 0.7, 0.3, 1), box-shadow 280ms ease",
        willChange: "transform",
        overflow: "hidden",
        ...style,
      }}
    >
      {/* WebGL refraction layer — full opacity so the bent/distorted
          page underneath is the dominant visual. */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          borderRadius: "inherit",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Strong directional glare — light sweeping from upper-left down
          to lower-right, creating the classic glossy-glass sheen. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "inherit",
          background:
            "linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.10) 22%, rgba(255,255,255,0) 45%, rgba(255,255,255,0) 60%, rgba(255,255,255,0.06) 80%, rgba(0,0,0,0.20) 100%)",
          pointerEvents: "none",
          zIndex: 1,
        }}
      />

      {/* Top bezel glare — bright streak just under the top rim, like a
          highlight on the curved edge of thick glass. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: 2,
          left: "5%",
          right: "5%",
          height: 2,
          borderRadius: "inherit",
          background:
            "linear-gradient(to right, rgba(255,255,255,0) 0%, rgba(255,255,255,0.85) 50%, rgba(255,255,255,0) 100%)",
          filter: "blur(0.6px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Secondary inner glare — softer, mid-card highlight that adds
          the "wet glass" sparkle near the upper-left corner. */}
      <span
        aria-hidden="true"
        style={{
          position: "absolute",
          top: "10%",
          left: "8%",
          width: "30%",
          height: "20%",
          borderRadius: "50%",
          background:
            "radial-gradient(ellipse at center, rgba(255,255,255,0.22) 0%, rgba(255,255,255,0) 70%)",
          filter: "blur(8px)",
          pointerEvents: "none",
          zIndex: 2,
        }}
      />

      {/* Content sits on top of every glass layer. */}
      <div style={{ position: "relative", zIndex: 3 }}>{children}</div>
    </div>
  );
}
