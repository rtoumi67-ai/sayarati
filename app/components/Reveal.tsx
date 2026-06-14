"use client";

import { type ReactNode, useEffect, useRef, useState } from "react";

export default function Reveal({
  children,
  className,
  delayMs = 0,
}: {
  children: ReactNode;
  className?: string;
  delayMs?: number;
}) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [shown, setShown] = useState(false);
  const [reduce] = useState(
    () => typeof window !== "undefined" && (window.matchMedia?.("(prefers-reduced-motion: reduce)")?.matches ?? false),
  );

  useEffect(() => {
    if (reduce) return;
    const el = ref.current;
    if (!el) return;

    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            window.setTimeout(() => setShown(true), delayMs);
            io.disconnect();
            break;
          }
        }
      },
      { root: null, rootMargin: "0px 0px -10% 0px", threshold: 0.12 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, [delayMs, reduce]);

  const finalShown = reduce ? true : shown;

  return (
    <div
      ref={ref}
      className={[
        "transition-[opacity,transform] duration-700 ease-out will-change-[opacity,transform]",
        finalShown
          ? "opacity-100 translate-y-0"
          : "opacity-0 translate-y-3",
        className ?? "",
      ].join(" ")}
    >
      {children}
    </div>
  );
}
