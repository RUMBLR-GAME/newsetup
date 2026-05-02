"use client";

import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";

/**
 * Mouse-reactive iPhone mockup showing a Fluid payment flow.
 *
 * - Tilts up to ±10° on X/Y based on mouse position over its parent container.
 * - Internal layers (card, particles, content) parallax at different depths
 *   for a holographic feel.
 * - Springs are tuned to feel weighty but responsive (Apple-style).
 * - Touch devices: tilt is disabled, only the gentle floating animation runs.
 */
export default function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);

  // Raw mouse position (-0.5 to 0.5 from center)
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smoothed via spring — gives it weight
  const springConfig = { stiffness: 150, damping: 20, mass: 0.5 };
  const sx = useSpring(mouseX, springConfig);
  const sy = useSpring(mouseY, springConfig);

  // Tilt rotations
  const rotateY = useTransform(sx, [-0.5, 0.5], [12, -12]);
  const rotateX = useTransform(sy, [-0.5, 0.5], [-8, 8]);

  // Parallax for inner layers (deeper layers move less)
  const cardX = useTransform(sx, [-0.5, 0.5], [-14, 14]);
  const cardY = useTransform(sy, [-0.5, 0.5], [-10, 10]);
  const contentX = useTransform(sx, [-0.5, 0.5], [-22, 22]);
  const contentY = useTransform(sy, [-0.5, 0.5], [-16, 16]);
  const sheenX = useTransform(sx, [-0.5, 0.5], ["30%", "70%"]);

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
        animate={
          isTouch
            ? { y: [0, -8, 0] }
            : undefined
        }
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
        {/* Phone shadow underneath — heavy, soft */}
        <div
          aria-hidden
          className="absolute inset-0 rounded-[54px] pointer-events-none"
          style={{
            boxShadow:
              "0 30px 80px rgba(0,0,0,0.7), 0 60px 120px rgba(0,0,0,0.5), 0 0 80px rgba(102,205,131,0.15)",
            transform: "translateZ(-1px)",
          }}
        />

        {/* Phone body — pure black with subtle bezel highlight */}
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
              {/* Dynamic island */}
              <div className="absolute left-1/2 top-2 -translate-x-1/2 w-[100px] h-[28px] rounded-full bg-black" />
              <div className="flex items-center gap-1.5">
                {/* Signal */}
                <svg width="16" height="10" viewBox="0 0 16 10" fill="currentColor">
                  <rect x="0" y="7" width="2.5" height="3" rx="0.5" />
                  <rect x="3.5" y="5" width="2.5" height="5" rx="0.5" />
                  <rect x="7" y="3" width="2.5" height="7" rx="0.5" />
                  <rect x="10.5" y="0" width="2.5" height="10" rx="0.5" />
                </svg>
                {/* Battery */}
                <svg width="22" height="11" viewBox="0 0 22 11" fill="currentColor">
                  <rect x="0" y="0" width="19" height="11" rx="2.5" stroke="currentColor" strokeOpacity="0.4" fill="none" />
                  <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
                  <rect x="20" y="3.5" width="1.5" height="4" rx="0.5" fill="currentColor" fillOpacity="0.4" />
                </svg>
              </div>
            </div>

            {/* App content (parallaxes) */}
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative px-5 pt-2 h-full"
            >
              {/* Header row */}
              <div className="flex items-center justify-between mb-6">
                <div>
                  <p className="text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-1">
                    Balance
                  </p>
                  <p className="text-white text-[28px] font-bold tracking-tight tabular-nums leading-none">
                    $4,287<span className="text-white/40 text-[20px]">.34</span>
                  </p>
                </div>
                <div className="w-10 h-10 rounded-full bg-white/[0.06] border border-white/[0.08] flex items-center justify-center">
                  <div className="w-3.5 h-3.5 rounded-full bg-mint-mid" />
                </div>
              </div>

              {/* Hero card — the mint card, parallaxes deeper */}
              <motion.div
                style={{ x: cardX, y: cardY }}
                className="relative rounded-3xl p-5 mb-5 overflow-hidden"
                aria-hidden="false"
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
                  style={{
                    background: useTransform(
                      sheenX,
                      (v) =>
                        `radial-gradient(ellipse 80% 100% at ${v} 0%, rgba(255,255,255,0.4) 0%, transparent 60%)`
                    ),
                  }}
                />
                {/* Card content */}
                <div className="relative">
                  <div className="flex items-center justify-between mb-12">
                    <span className="text-[10px] tracking-[0.16em] text-mint-ink/70 uppercase font-bold">
                      Fluid · AUDD
                    </span>
                    <div className="w-7 h-7 rounded-full bg-mint-ink/15 backdrop-blur-sm" />
                  </div>
                  <p className="text-mint-ink/60 text-[10px] tracking-[0.14em] uppercase font-bold mb-1">
                    Available
                  </p>
                  <p className="text-mint-ink text-[26px] font-bold tracking-tight tabular-nums leading-none mb-4">
                    A$ 4,287.34
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-mint-ink/50 text-[10px] tracking-[0.14em] uppercase font-bold">
                      •••• 4321
                    </span>
                    <span className="text-mint-ink text-xs font-bold">
                      Solana
                    </span>
                  </div>
                </div>
              </motion.div>

              {/* Recent transactions */}
              <p className="text-[11px] tracking-[0.18em] text-white/40 uppercase font-bold mb-3">
                Recent
              </p>

              {/* Tx 1 — incoming */}
              <div className="flex items-center gap-3 mb-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-mint-mid/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L7 3L11 7M7 3V11"
                      stroke="#66CD83"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(180 7 7)"
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

              {/* Tx 2 — outgoing */}
              <div className="flex items-center gap-3 mb-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
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

              {/* Tx 3 — incoming, larger */}
              <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
                <div className="w-9 h-9 rounded-full bg-mint-mid/15 flex items-center justify-center flex-shrink-0">
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M3 7L7 3L11 7M7 3V11"
                      stroke="#66CD83"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      transform="rotate(180 7 7)"
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
