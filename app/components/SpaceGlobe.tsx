"use client";

/* CSS-only earth — geen Three.js, geen WebGL context, geen kleurmanagement.
   De equirectangular earth-texture.jpg wordt als background gebruikt en
   horizontaal gescrolled voor de illusie van rotatie. Bovenop ligt een
   wolkenlaag (ook gescrolled, iets sneller) plus een radial-gradient die
   de sphere-shading en day/night terminator nadoet. Buitenom een
   atmosphere-glow en een buitenste halo. */

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
      {/* Buitenste blauwe halo (atmospheric scatter, gedimd) */}
      <div
        aria-hidden
        style={{
          position: "absolute",
          inset: -40,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at 50% 50%, rgba(80,160,255,0.18) 48%, rgba(80,160,255,0.08) 56%, rgba(80,160,255,0) 70%)",
          filter: "blur(6px)",
        }}
      />

      {/* De globe zelf */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          borderRadius: "50%",
          overflow: "hidden",
          boxShadow:
            "0 0 60px 4px rgba(70,140,255,0.18), inset 0 0 80px rgba(0,0,0,0.55)",
          background: "#03060f",
        }}
      >
        {/* Earth surface — equirectangular textuur die horizontaal scrollt */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundImage: "url(/earth-texture.jpg)",
            backgroundSize: "200% 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "0% 50%",
            animation: "spaceGlobeSpin 80s linear infinite",
          }}
        />

        {/* Wolkenlaag — zelfde truc, iets sneller, lager opacity */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            backgroundImage: "url(/earth-clouds.jpg)",
            backgroundSize: "200% 100%",
            backgroundRepeat: "repeat-x",
            backgroundPosition: "0% 50%",
            animation: "spaceGlobeClouds 60s linear infinite",
            mixBlendMode: "screen",
            opacity: 0.45,
          }}
        />

        {/* Sphere shading — radial gradient maakt de platte cirkel een bol:
            highlight linksboven (zonzijde), donkere terminator rechtsonder. */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            background:
              "radial-gradient(circle at 30% 25%, rgba(255,255,255,0.18) 0%, rgba(255,255,255,0) 35%), radial-gradient(circle at 70% 75%, rgba(0,0,12,0.85) 0%, rgba(0,0,12,0.55) 30%, rgba(0,0,12,0) 65%)",
          }}
        />

        {/* Innerlijke fresnel-rim — geeft de atmosfeer een gloed van binnenuit */}
        <div
          aria-hidden
          style={{
            position: "absolute",
            inset: 0,
            borderRadius: "50%",
            boxShadow:
              "inset 0 0 30px 6px rgba(120,180,255,0.45), inset 0 0 80px rgba(40,100,200,0.25)",
          }}
        />
      </div>

      <style jsx>{`
        @keyframes spaceGlobeSpin {
          from { background-position: 0% 50%; }
          to   { background-position: -200% 50%; }
        }
        @keyframes spaceGlobeClouds {
          from { background-position: 0% 50%; }
          to   { background-position: -200% 50%; }
        }
      `}</style>
    </div>
  );
}
