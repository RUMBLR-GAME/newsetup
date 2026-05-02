"use client";

import { useRef, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type TiltCardProps = {
  children: ReactNode;
  className?: string;
  maxTilt?: number; // degrees
};

export default function TiltCard({
  children,
  className = "",
  maxTilt = 10,
}: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  // Spring-smoothed values for buttery motion
  const sx = useSpring(x, { stiffness: 220, damping: 22, mass: 0.5 });
  const sy = useSpring(y, { stiffness: 220, damping: 22, mass: 0.5 });

  // Convert -0.5..0.5 mouse position to rotation degrees
  const rotateY = useTransform(sx, [-0.5, 0.5], [-maxTilt, maxTilt]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [maxTilt, -maxTilt]);

  // Gloss highlight follows the cursor
  const glossX = useTransform(sx, [-0.5, 0.5], ["20%", "80%"]);
  const glossY = useTransform(sy, [-0.5, 0.5], ["20%", "80%"]);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width - 0.5;
    const py = (e.clientY - rect.top) / rect.height - 0.5;
    x.set(px);
    y.set(py);
  };

  const onLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <div
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      className={className}
      style={{ perspective: 1200 }}
    >
      <motion.div
        style={{
          rotateX,
          rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        {children}
        {/* Gloss highlight overlay */}
        <motion.div
          aria-hidden
          className="absolute inset-0 rounded-3xl pointer-events-none mix-blend-overlay"
          style={{
            background: useTransform(
              [glossX, glossY] as any,
              ([gx, gy]: any) =>
                `radial-gradient(circle at ${gx} ${gy}, rgba(255,255,255,0.35) 0%, transparent 50%)`
            ) as any,
          }}
        />
      </motion.div>
    </div>
  );
}
