"use client";

import {
  type CSSProperties,
  type ReactNode,
  useEffect,
  useMemo,
  useRef,
} from "react";

export default function Tilt({
  children,
  className,
  max = 10,
  scale = 1.02,
  style,
}: {
  children: ReactNode;
  className?: string;
  max?: number;
  scale?: number;
  style?: CSSProperties;
}) {
  const ref = useRef<HTMLDivElement | null>(null);

  const reduce = useMemo(() => {
    if (typeof window === "undefined") return false;
    return window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false;
  }, []);

  useEffect(() => {
    if (reduce) return;
    if (typeof window !== "undefined") {
      const canHover =
        window.matchMedia?.("(hover: hover) and (pointer: fine)")?.matches ?? false;
      if (!canHover) return;
    }
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    let rect: DOMRect | null = null;
    const measure = () => {
      rect = el.getBoundingClientRect();
    };

    const onMove = (e: PointerEvent) => {
      if (!rect) measure();
      if (!rect) return;
      const px = (e.clientX - rect.left) / rect.width;
      const py = (e.clientY - rect.top) / rect.height;
      const rx = (py - 0.5) * -2 * max;
      const ry = (px - 0.5) * 2 * max;

      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-rx", `${rx.toFixed(2)}deg`);
        el.style.setProperty("--tilt-ry", `${ry.toFixed(2)}deg`);
        el.style.setProperty("--tilt-s", `${scale}`);
      });
    };

    const onLeave = () => {
      rect = null;
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.setProperty("--tilt-rx", "0deg");
        el.style.setProperty("--tilt-ry", "0deg");
        el.style.setProperty("--tilt-s", "1");
      });
    };

    const onEnter = () => {
      measure();
    };

    const onResize = () => {
      rect = null;
    };

    el.addEventListener("pointermove", onMove, { passive: true });
    el.addEventListener("pointerenter", onEnter, { passive: true });
    el.addEventListener("pointerleave", onLeave, { passive: true });
    window.addEventListener("resize", onResize, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerenter", onEnter);
      el.removeEventListener("pointerleave", onLeave);
      window.removeEventListener("resize", onResize);
    };
  }, [max, reduce, scale]);

  return (
    <div
      ref={ref}
      className={[
        "transform-gpu [transform-style:preserve-3d] [perspective:900px] will-change-transform",
        "[transform:rotateX(var(--tilt-rx,0deg))_rotateY(var(--tilt-ry,0deg))_scale(var(--tilt-s,1))]",
        className ?? "",
      ].join(" ")}
      style={style}
    >
      {children}
    </div>
  );
}
