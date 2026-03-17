import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Sem van Dieen | Webdesign & Development";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#05060f",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
          position: "relative",
          overflow: "hidden",
        }}
      >
        {/* Glow blobs */}
        <div style={{
          position: "absolute", top: -100, left: -100,
          width: 500, height: 500,
          background: "radial-gradient(circle, rgba(110,231,247,0.15) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />
        <div style={{
          position: "absolute", bottom: -80, right: -80,
          width: 400, height: 400,
          background: "radial-gradient(circle, rgba(124,58,237,0.12) 0%, transparent 70%)",
          borderRadius: "50%",
        }} />

        {/* Grid overlay */}
        <div style={{
          position: "absolute", inset: 0,
          backgroundImage: "linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)",
          backgroundSize: "60px 60px",
        }} />

        {/* Name */}
        <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24 }}>
          <span style={{ color: "#f0f0f0", fontSize: 28, fontWeight: 700, letterSpacing: -0.5 }}>
            Sem van Dieen
          </span>
          <span style={{ color: "#6ee7f7", fontSize: 28, fontWeight: 700 }}>.</span>
        </div>

        {/* Headline */}
        <div style={{ fontSize: 72, fontWeight: 900, color: "#f0f0f0", lineHeight: 1.05, letterSpacing: -2, marginBottom: 24 }}>
          Ik bouw websites
          <br />
          <span style={{ color: "#6ee7f7" }}>die werken.</span>
        </div>

        {/* Subtext */}
        <div style={{ fontSize: 22, color: "rgba(240,240,240,0.4)", maxWidth: 600 }}>
          Webshops en bedrijfswebsites volledig op maat. Neem contact op voor een vrijblijvende offerte.
        </div>

        {/* Bottom badge */}
        <div style={{
          position: "absolute", bottom: 60, right: 80,
          background: "rgba(110,231,247,0.1)",
          border: "1px solid rgba(110,231,247,0.2)",
          borderRadius: 12,
          padding: "10px 20px",
          color: "#6ee7f7",
          fontSize: 16,
          fontWeight: 600,
        }}>
          sem.vdieen@gmail.com
        </div>
      </div>
    ),
    { ...size }
  );
}
