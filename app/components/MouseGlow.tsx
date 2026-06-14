"use client";

import { useEffect } from "react";

export default function MouseGlow() {
  useEffect(() => {
    const reduce =
      window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
    if (reduce) return;
    const fine =
      window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
    if (!fine) return;

    const root = document.documentElement;

    let raf = 0;
    let px = 50;
    let py = 50;
    let nextX = px;
    let nextY = py;

    const commit = () => {
      raf = 0;
      if (nextX === px && nextY === py) return;
      px = nextX;
      py = nextY;
      root.style.setProperty("--mx", `${px.toFixed(2)}%`);
      root.style.setProperty("--my", `${py.toFixed(2)}%`);
    };

    const onMove = (e: PointerEvent) => {
      nextX = (e.clientX / window.innerWidth) * 100;
      nextY = (e.clientY / window.innerHeight) * 100;
      if (!raf) raf = requestAnimationFrame(commit);
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("pointermove", onMove);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
