"use client";

import { useEffect, useState } from "react";

/* Single source of truth for the "should I run heavy effects?" decision.
 *
 * - `supportsHover`: device has a real mouse / pointer:fine. False on
 *   touch devices, which means hover-only UX should fall back to a static
 *   look (cards can't react to taps the way they react to a cursor).
 * - `reducedMotion`: user asked the OS to limit animation.
 * - `isCompact`: viewport narrower than ~md breakpoint. Used to skip
 *   heavy 3D scenes that would torch a phone's GPU/battery.
 *
 * SSR-safe defaults assume desktop so first paint matches the markup the
 * server emits; the hook upgrades to real values on mount.
 */
export function useDeviceCapabilities() {
  const [state, setState] = useState({
    supportsHover: true,
    reducedMotion: false,
    isCompact: false,
  });

  useEffect(() => {
    if (typeof window === "undefined") return;

    const hover = window.matchMedia("(hover: hover) and (pointer: fine)");
    const motion = window.matchMedia("(prefers-reduced-motion: reduce)");
    const compact = window.matchMedia("(max-width: 767px)");

    const sync = () =>
      setState({
        supportsHover: hover.matches,
        reducedMotion: motion.matches,
        isCompact: compact.matches,
      });

    sync();
    hover.addEventListener("change", sync);
    motion.addEventListener("change", sync);
    compact.addEventListener("change", sync);
    return () => {
      hover.removeEventListener("change", sync);
      motion.removeEventListener("change", sync);
      compact.removeEventListener("change", sync);
    };
  }, []);

  return state;
}
