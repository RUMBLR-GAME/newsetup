"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * Mouse-reactive iPhone mockup showing the Fluid app.
 *
 * - Tilts up to ±10° on X/Y based on mouse position over its parent container.
 * - Internal layers (card, particles, content) parallax at different depths
 *   for a holographic feel.
 * - The card uses the real Fluid logo SVG and the real Solana logomark.
 * - Touch devices: tilt is disabled, only the gentle floating animation runs.
 */
export default function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  const rotateY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  const cardX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const contentX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const contentY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const sheenX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);
  const sheenBg = useTransform(
    sheenX,
    (v) =>
      `radial-gradient(ellipse 80% 100% at ${v} 0%, rgba(255,255,255,0.4) 0%, transparent 60%)`
  );

  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  function handleMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isTouch) return;
    const rect = containerRef.current?.getBoundingClientRect();
    if (!rect) return;
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    mouseX.set(x);
    mouseY.set(y);
  }

  function handleLeave() {
    mouseX.set(0);
    mouseY.set(0);
  }

  return (
    <div
      ref={containerRef}
      onMouseMove={handleMove}
      onMouseLeave={handleLeave}
      className="relative flex items-center justify-center w-full h-full"
      style={{ perspective: "1400px" }}
    >
      {/* Ambient mint glow behind phone */}
      <div
        aria-hidden
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(102,205,131,0.18) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* Floating purple orb top-left */}
      <div
        aria-hidden
        className="absolute top-[12%] left-[8%] w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.4) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Floating mint orb bottom-right */}
      <div
        aria-hidden
        className="absolute bottom-[14%] right-[8%] w-40 h-40 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(102,205,131,0.35) 0%, transparent 70%)",
          filter: "blur(40px)",
        }}
      />

      {/* === Phone === */}
      <motion.div
        animate={isTouch ? { y: [0, -8, 0] } : undefined}
        transition={
          isTouch
            ? { duration: 6, repeat: Infinity, ease: "easeInOut" }
            : undefined
        }
        style={{
          rotateX: isTouch ? 0 : rotateX,
          rotateY: isTouch ? 0 : rotateY,
          transformStyle: "preserve-3d",
        }}
        className="relative"
      >
        <div
          aria-hidden
          className="absolute inset-0 rounded-[54px] pointer-events-none"
          style={{
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.7), 0 60px 120px rgba(0,0,0,0.5), 0 0 80px rgba(102,205,131,0.15)",
            transform: "translateZ(-1px)",
          }}
        />

        {/* Phone body */}
        <div
          className="relative w-[300px] h-[612px] rounded-[54px] overflow-hidden"
          style={{
            background:
              "linear-gradient(145deg, #161616 0%, #0a0a0a 50%, #050505 100%)",
            boxShadow:
              "inset 0 0 0 1.5px rgba(255,255,255,0.04), inset 0 1px 0 rgba(255,255,255,0.08), 0 0 0 1px rgba(0,0,0,0.5)",
          }}
        >
          {/* Inner screen */}
          <div
            className="absolute inset-[8px] rounded-[46px] overflow-hidden"
            style={{ background: "#000" }}
          >
            {/* Status bar */}
            <div className="relative h-12 flex items-center justify-between px-7 pt-3 text-white text-[13px] font-semibold tabular-nums">
              <span>9:41</span>
              <div className="absolute left-1/2 top-2 -translate-x-1/2 w-[100px] h-[28px] rounded-full bg-black" />
              <div className="flex items-center gap-1.5">
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
                  <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                  <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" />
                  <rect x="7" y="3" width="2.5" height="7" rx="0.5" />
                  <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
                </svg>
                <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
                  <rect x="0" y="0" width="19" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.4" fill="none" />
                  <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
                  <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* App content */}
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative px-5 pt-2 h-full"
            >
              {/* Top app bar — Fluid logo + avatar */}
              <div className="flex items-center justify-between mb-6">
                {/* Real Fluid logo (mint, smaller scale for app header) */}
                <svg
                  viewBox="0 0 197.65 117.46"
                  className="h-7 w-auto"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  aria-label="Fluid"
                >
                  <path
                    fill="#FFFFFF"
                    d="M131.72,50.07c4.75-4.63,10.74-5.41,16.77-2.72l2.7-11.58c.24-1.04,2.27-2.63,3.32-2.66,1.23-.04,3.51,2.37,3.22,3.63l-6.53,28.33c-.84,3.66,3.12,2.47,5.55,5.55.68.86-.83,3.78-1.94,4.09-2.79.77-6.34-.87-8.64-2.98-5.4,4.66-12.62,5.1-17.75-.06-4.3,3.94-9.91,4.54-14.44,1.01-4.78,3.22-10.47,3.24-14.55-.97-5.26,4.54-12.11,4.18-16.9.26-2.7,1.77-6.02,3.12-8.79,3.11-2.2-.01-6.12-2.2-6.96-4.83-1.15-3.62-.22-7.55.51-11.96l-13.1,7.79c.51,8.2.94,16.63-1.31,24.27-1.71,5.81-6.87,8.54-12.14,7.51s-8.06-6.13-7.31-12c1.06-8.3,5.43-15.36,11.98-20.87,1.37-1.15,2-3.24,1.59-5.46l-10.23,4.86c-1.17.56-4.06-1.3-4.25-2.51s1.21-3.21,2.5-3.9l11.44-6.11c-.4-11.81-1.81-26.73,6.19-32.47,2.58-1.86,7.91-2.33,10.59-.77,10.11,5.91,3.94,23.79-8.62,34.89-.99.88-1.35,3.53-.67,4.74,23.49-9.55,17.91-34.77,24.7-34.81,1.2,0,2.95,1.93,3.38,3.4l-9.86,41.05c3.91,1.19,6.66-.74,7.47-3.76l5.45-20.18c.32-1.2,2.64-2.37,3.66-2.32,1.22.07,3.01,2.75,2.68,4.01l-4.51,17.23c-.31,1.18.57,4.32,1.52,5,3.11,2.22,9.2-1.48,10.79-7.95l2.93-11.92c.31-1.24,3.19-2.51,4.23-2.13,1.22.44,2.43,2.75,2.03,4.42l-3.89,16.3c-.21.87,3.22,2.27,3.93,1.75.89-.65,2.69-2.15,2.98-3.35l3.13-12.87c.44-1.81,2.38-3.45,3.93-3.14,1.87.36,2.9,2.73,2.5,4.57l-3.04,14.13c9.91,3.21,5.55-9.61,13.76-17.61ZM53.09,45.31c9.02-8.03,10.63-21.55,5.84-21.25-5.94.36-7.05,11.61-5.84,21.25ZM139.7,68.06c4.72-1.71,9.1-11.84,4.26-14.78-5.72-3.48-11.93,5.03-11.26,10.42.24,1.92,1.23,4.24,2.35,4.76.94.43,3.09.16,4.66-.41ZM47.85,71.79c-7.59,6.91-10.31,19.17-5.31,19.85s6.18-10.55,5.31-19.85Z"
                  />
                  <circle fill="#66CD83" cx="120.45" cy="41.01" r="3.99" />
                </svg>
                <div className="w-9 h-9 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <span className="text-[11px] font-bold text-white/80">G</span>
                </div>
              </div>

              {/* Balance label + amount */}
              <div className="mb-5">
                <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase font-bold mb-1.5">
                  Balance
                </p>
                <p className="text-white text-[32px] font-bold tracking-tight tabular-nums leading-none">
                  $4,287
                  <span className="text-white/40 text-[22px]">.34</span>
                </p>
              </div>

              {/* Hero card — mint mesh gradient */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                className="relative rounded-3xl p-5 mb-5 overflow-hidden"
              >
                {/* Mint mesh gradient */}
                <div
                  className="absolute inset-0 rounded-3xl"
                  style={{
                    background:
                      "linear-gradient(135deg, #66CD83 0%, #4CB66A 50%, #3D9656 100%)",
                  }}
                />
                {/* Soft sheen that shifts with mouse */}
                <motion.div
                  aria-hidden
                  className="absolute inset-0 rounded-3xl opacity-50"
                  style={{ background: sheenBg }}
                />
                {/* Card content */}
                <div className="relative">
                  {/* Top row — Fluid logo (black variant) + AUDD label */}
                  <div className="flex items-center justify-between mb-10">
                    <svg
                      viewBox="0 0 197.65 117.46"
                      className="h-5 w-auto"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                      aria-label="Fluid"
                    >
                      <path
                        fill="#0F2E1A"
                        d="M131.72,50.07c4.75-4.63,10.74-5.41,16.77-2.72l2.7-11.58c.24-1.04,2.27-2.63,3.32-2.66,1.23-.04,3.51,2.37,3.22,3.63l-6.53,28.33c-.84,3.66,3.12,2.47,5.55,5.55.68.86-.83,3.78-1.94,4.09-2.79.77-6.34-.87-8.64-2.98-5.4,4.66-12.62,5.1-17.75-.06-4.3,3.94-9.91,4.54-14.44,1.01-4.78,3.22-10.47,3.24-14.55-.97-5.26,4.54-12.11,4.18-16.9.26-2.7,1.77-6.02,3.12-8.79,3.11-2.2-.01-6.12-2.2-6.96-4.83-1.15-3.62-.22-7.55.51-11.96l-13.1,7.79c.51,8.2.94,16.63-1.31,24.27-1.71,5.81-6.87,8.54-12.14,7.51s-8.06-6.13-7.31-12c1.06-8.3,5.43-15.36,11.98-20.87,1.37-1.15,2-3.24,1.59-5.46l-10.23,4.86c-1.17.56-4.06-1.3-4.25-2.51s1.21-3.21,2.5-3.9l11.44-6.11c-.4-11.81-1.81-26.73,6.19-32.47,2.58-1.86,7.91-2.33,10.59-.77,10.11,5.91,3.94,23.79-8.62,34.89-.99.88-1.35,3.53-.67,4.74,23.49-9.55,17.91-34.77,24.7-34.81,1.2,0,2.95,1.93,3.38,3.4l-9.86,41.05c3.91,1.19,6.66-.74,7.47-3.76l5.45-20.18c.32-1.2,2.64-2.37,3.66-2.32,1.22.07,3.01,2.75,2.68,4.01l-4.51,17.23c-.31,1.18.57,4.32,1.52,5,3.11,2.22,9.2-1.48,10.79-7.95l2.93-11.92c.31-1.24,3.19-2.51,4.23-2.13,1.22.44,2.43,2.75,2.03,4.42l-3.89,16.3c-.21.87,3.22,2.27,3.93,1.75.89-.65,2.69-2.15,2.98-3.35l3.13-12.87c.44-1.81,2.38-3.45,3.93-3.14,1.87.36,2.9,2.73,2.5,4.57l-3.04,14.13c9.91,3.21,5.55-9.61,13.76-17.61ZM53.09,45.31c9.02-8.03,10.63-21.55,5.84-21.25-5.94.36-7.05,11.61-5.84,21.25ZM139.7,68.06c4.72-1.71,9.1-11.84,4.26-14.78-5.72-3.48-11.93,5.03-11.26,10.42.24,1.92,1.23,4.24,2.35,4.76.94.43,3.09.16,4.66-.41ZM47.85,71.79c-7.59,6.91-10.31,19.17-5.31,19.85s6.18-10.55,5.31-19.85Z"
                      />
                      <circle fill="#FFFFFF" cx="120.45" cy="41.01" r="3.99" />
                    </svg>
                    <span className="text-[10px] tracking-[0.18em] text-mint-ink/60 uppercase font-bold">
                      AUDD
                    </span>
                  </div>
                  <p className="text-mint-ink/55 text-[10px] tracking-[0.14em] uppercase font-bold mb-1">
                    Available
                  </p>
                  <p className="text-mint-ink text-[26px] font-bold tracking-tight tabular-nums leading-none mb-5">
                    A$ 4,287.34
                  </p>
                  {/* Bottom row of card — card number + Solana logomark */}
                  <div className="flex items-center justify-between">
                    <span className="text-mint-ink/50 text-[10px] tracking-[0.14em] uppercase font-bold">
                      •••• 4321
                    </span>
                    {/* Real Solana logomark */}
                    <div className="flex items-center gap-1.5">
                      <svg
                        viewBox="0 0 508 400"
                        className="h-3 w-auto"
                        xmlns="http://www.w3.org/2000/svg"
                        aria-label="Solana"
                      >
                        <defs>
                          <linearGradient
                            id="phone-sol-grad"
                            x1="0"
                            y1="0"
                            x2="508"
                            y2="0"
                            gradientUnits="userSpaceOnUse"
                          >
                            <stop offset="0%" stopColor="#9945FF" />
                            <stop offset="100%" stopColor="#14F195" />
                          </linearGradient>
                        </defs>
                        <path
                          d="M82 18 H433 a18 18 0 0 1 14 7 L496 78 a8 8 0 0 1 -6 13 H75 a18 18 0 0 1 -14 -7 L12 32 a8 8 0 0 1 6 -13 H82 Z"
                          fill="url(#phone-sol-grad)"
                        />
                        <path
                          d="M75 154 H426 a18 18 0 0 1 14 7 L489 215 a8 8 0 0 1 -6 13 H82 a18 18 0 0 1 -14 -7 L19 167 a8 8 0 0 1 6 -13 H75 Z"
                          transform="matrix(-1 0 0 1 508 0)"
                          fill="url(#phone-sol-grad)"
                        />
                        <path
                          d="M82 290 H433 a18 18 0 0 1 14 7 L496 350 a8 8 0 0 1 -6 13 H75 a18 18 0 0 1 -14 -7 L12 304 a8 8 0 0 1 6 -13 H82 Z"
                          fill="url(#phone-sol-grad)"
                        />
                      </svg>
                      <span className="text-mint-ink text-[11px] font-bold tracking-tight">
                        Solana
                      </span>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Recent label */}
              <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase font-bold mb-3">
                Recent
              </p>

              {/* Tx 1 */}
              <div className="flex items-center gap-3 mb-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-mint-mid/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L7 11L11 7M7 11V3"
                      stroke="#66CD83"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold leading-tight">
                    From Maya
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5">
                    Just now · 0.4s
                  </p>
                </div>
                <p className="text-mint-glow font-bold text-[14px] tabular-nums">
                  +$48
                </p>
              </div>

              {/* Tx 2 */}
              <div className="flex items-center gap-3 mb-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-white/[0.06] flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L7 3L11 7M7 3V11"
                      stroke="white"
                      strokeOpacity="0.7"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold leading-tight">
                    Coffee · The Edge
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5">
                    8:14 AM · Brisbane
                  </p>
                </div>
                <p className="text-white/85 font-bold text-[14px] tabular-nums">
                  −$5.50
                </p>
              </div>

              {/* Tx 3 */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-mint-mid/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L7 11L11 7M7 11V3"
                      stroke="#66CD83"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-white text-[13px] font-semibold leading-tight">
                    Payday
                  </p>
                  <p className="text-white/40 text-[11px] mt-0.5">
                    Yesterday · 0.4s
                  </p>
                </div>
                <p className="text-mint-glow font-bold text-[14px] tabular-nums">
                  +$2,100
                </p>
              </div>
            </motion.div>
          </div>

          {/* Side button (right) */}
          <div
            aria-hidden
            className="absolute right-[-1.5px] top-[180px] w-[3px] h-[64px] rounded-l-sm"
            style={{
              background: "linear-gradient(to right, #1a1a1a, #0a0a0a)",
            }}
          />
          {/* Volume buttons (left) */}
          <div
            aria-hidden
            className="absolute left-[-1.5px] top-[140px] w-[3px] h-[40px] rounded-r-sm"
            style={{ background: "linear-gradient(to left, #1a1a1a, #0a0a0a)" }}
          />
          <div
            aria-hidden
            className="absolute left-[-1.5px] top-[200px] w-[3px] h-[64px] rounded-r-sm"
            style={{ background: "linear-gradient(to left, #1a1a1a, #0a0a0a)" }}
          />
        </div>
      </motion.div>
    </div>
  );
}
