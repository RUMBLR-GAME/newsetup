"use client";

import {
  motion,
  useMotionValue,
  useSpring,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef, useState, useEffect } from "react";
import SolanaMark from "./SolanaMark";

/**
 * Mouse-reactive iPhone mockup that cycles through three app screens to
 * simulate a payment flow:
 *   1. Home — balance + recent transactions
 *   2. Send — entering an amount + recipient
 *   3. Sent — success confirmation, settles in 0.4s
 *
 * - Tilts ±12°/±8° based on cursor position over container
 * - Inner layers parallax at different depths for holographic feel
 * - Touch devices: tilt off, gentle 6s float instead
 */

// === Reusable Fluid logo SVG ===
function FluidLogo({
  height = 28,
  letterColor = "#FFFFFF",
  dotColor = "#66CD83",
}: {
  height?: number;
  letterColor?: string;
  dotColor?: string;
}) {
  return (
    <svg
      viewBox="0 0 197.65 117.46"
      style={{ height, width: "auto" }}
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="Fluid"
    >
      <path
        fill={letterColor}
        d="M131.72,50.07c4.75-4.63,10.74-5.41,16.77-2.72l2.7-11.58c.24-1.04,2.27-2.63,3.32-2.66,1.23-.04,3.51,2.37,3.22,3.63l-6.53,28.33c-.84,3.66,3.12,2.47,5.55,5.55.68.86-.83,3.78-1.94,4.09-2.79.77-6.34-.87-8.64-2.98-5.4,4.66-12.62,5.1-17.75-.06-4.3,3.94-9.91,4.54-14.44,1.01-4.78,3.22-10.47,3.24-14.55-.97-5.26,4.54-12.11,4.18-16.9.26-2.7,1.77-6.02,3.12-8.79,3.11-2.2-.01-6.12-2.2-6.96-4.83-1.15-3.62-.22-7.55.51-11.96l-13.1,7.79c.51,8.2.94,16.63-1.31,24.27-1.71,5.81-6.87,8.54-12.14,7.51s-8.06-6.13-7.31-12c1.06-8.3,5.43-15.36,11.98-20.87,1.37-1.15,2-3.24,1.59-5.46l-10.23,4.86c-1.17.56-4.06-1.3-4.25-2.51s1.21-3.21,2.5-3.9l11.44-6.11c-.4-11.81-1.81-26.73,6.19-32.47,2.58-1.86,7.91-2.33,10.59-.77,10.11,5.91,3.94,23.79-8.62,34.89-.99.88-1.35,3.53-.67,4.74,23.49-9.55,17.91-34.77,24.7-34.81,1.2,0,2.95,1.93,3.38,3.4l-9.86,41.05c3.91,1.19,6.66-.74,7.47-3.76l5.45-20.18c.32-1.2,2.64-2.37,3.66-2.32,1.22.07,3.01,2.75,2.68,4.01l-4.51,17.23c-.31,1.18.57,4.32,1.52,5,3.11,2.22,9.2-1.48,10.79-7.95l2.93-11.92c.31-1.24,3.19-2.51,4.23-2.13,1.22.44,2.43,2.75,2.03,4.42l-3.89,16.3c-.21.87,3.22,2.27,3.93,1.75.89-.65,2.69-2.15,2.98-3.35l3.13-12.87c.44-1.81,2.38-3.45,3.93-3.14,1.87.36,2.9,2.73,2.5,4.57l-3.04,14.13c9.91,3.21,5.55-9.61,13.76-17.61ZM53.09,45.31c9.02-8.03,10.63-21.55,5.84-21.25-5.94.36-7.05,11.61-5.84,21.25ZM139.7,68.06c4.72-1.71,9.1-11.84,4.26-14.78-5.72-3.48-11.93,5.03-11.26,10.42.24,1.92,1.23,4.24,2.35,4.76.94.43,3.09.16,4.66-.41ZM47.85,71.79c-7.59,6.91-10.31,19.17-5.31,19.85s6.18-10.55,5.31-19.85Z"
      />
      <circle fill={dotColor} cx="120.45" cy="41.01" r="3.99" />
    </svg>
  );
}

// === Status bar (shared across all screens) ===
function StatusBar() {
  return (
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
          <rect
            x="0"
            y="0"
            width="19"
            height="11"
            rx="2.5"
            stroke="currentColor"
            strokeOpacity="0.4"
            fill="none"
          />
          <rect x="2" y="2" width="15" height="7" rx="1" fill="currentColor" />
          <rect
            x="20"
            y="3.5"
            width="1.5"
            height="4"
            rx="0.5"
            fill="currentColor"
            fillOpacity="0.4"
          />
        </svg>
      </div>
    </div>
  );
}

// === Screen 1 — Home (v1: no card) ===
function HomeScreen({
  cardX,
  cardY,
  sheenBg,
}: {
  cardX: ReturnType<typeof useMotionValue<number>> | any;
  cardY: ReturnType<typeof useMotionValue<number>> | any;
  sheenBg: any;
}) {
  // cardX/cardY/sheenBg are kept in props for type compat with the other screens —
  // we don't render the card surface anymore.
  void cardX; void cardY; void sheenBg;

  return (
    <div className="px-5 pt-2 h-full">
      {/* Header: avatar + bell */}
      <div className="flex items-center justify-between mb-6">
        <div className="w-9 h-9 rounded-full bg-mint-mid/[0.08] border border-mint-mid/[0.15] flex items-center justify-center">
          <span className="text-[11px] font-bold text-mint-glow">G</span>
        </div>
        <div className="w-9 h-9 rounded-full flex items-center justify-center text-white/70">
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
            <path d="M18 8a6 6 0 10-12 0c0 7-3 9-3 9h18s-3-2-3-9" />
            <path d="M13.7 21a2 2 0 01-3.4 0" />
          </svg>
        </div>
      </div>

      {/* Balance hero — centred */}
      <div className="flex flex-col items-center text-center pt-4 pb-2">
        <p className="text-[10px] tracking-[0.14em] text-mint-glow/70 uppercase font-bold mb-3">
          Available
        </p>
        <div className="flex items-baseline tabular-nums">
          <span className="text-white text-[22px] font-semibold">$</span>
          <span className="text-white text-[56px] font-semibold tracking-[-0.04em] leading-none">
            4,287
          </span>
          <span className="text-white/60 text-[22px] font-semibold">.34</span>
        </div>

        {/* Earning pill */}
        <div className="mt-4 inline-flex items-center gap-2 rounded-full bg-mint-mid/[0.08] border border-mint-mid/[0.15] px-3 py-1.5">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-mint-mid opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-mint-mid" />
          </span>
          <span className="text-[12px] font-semibold text-mint-glow">
            Earning 4.20% p.a.
          </span>
        </div>
      </div>

      {/* Three action tiles */}
      <div className="grid grid-cols-3 gap-3 mt-6 mb-6">
        {[
          { label: "Send", icon: "M22 2L11 13M22 2l-7 20-4-9-9-4 20-7z" },
          { label: "Receive", icon: "M17 7L7 17M17 17H7V7" },
          { label: "Top up", icon: "M12 5v14M5 12h14" },
        ].map((t) => (
          <div key={t.label} className="flex flex-col items-center gap-2">
            <div className="w-14 h-14 rounded-full bg-mint-mid/[0.08] border border-mint-mid/[0.14] flex items-center justify-center text-mint-glow">
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
                <path d={t.icon} />
              </svg>
            </div>
            <span className="text-[13px] font-semibold text-white/85">{t.label}</span>
          </div>
        ))}
      </div>

      {/* Recent label */}
      <div className="flex items-center justify-between mb-2">
        <p className="text-white text-[16px] font-bold tracking-[-0.02em]">Recent</p>
        <p className="text-mint-glow text-[11px] font-semibold">See all</p>
      </div>

      {/* Tx rows */}
      <TxRow incoming label="From Maya" sub="Just now · 0.4s" amount="+$48" />
      <TxRow
        label="Marcus · Thai dinner"
        sub="8:14 AM"
        amount="−$47.50"
      />
      <TxRow incoming label="Payday" sub="Yesterday · 0.4s" amount="+$2,100" />
    </div>
  );
}

function TxRow({
  incoming,
  label,
  sub,
  amount,
}: {
  incoming?: boolean;
  label: string;
  sub: string;
  amount: string;
}) {
  return (
    <div className="flex items-center gap-3 mb-2.5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
      <div
        className={`w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 ${
          incoming ? "bg-mint-mid/15" : "bg-white/[0.06]"
        }`}
      >
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d={incoming ? "M3 7L7 11L11 7M7 11V3" : "M3 7L7 3L11 7M7 3V11"}
            stroke={incoming ? "#66CD83" : "white"}
            strokeOpacity={incoming ? 1 : 0.7}
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>
      <div className="flex-1 min-w-0">
        <p className="text-white text-[13px] font-semibold leading-tight">
          {label}
        </p>
        <p className="text-white/40 text-[11px] mt-0.5">{sub}</p>
      </div>
      <p
        className={`font-bold text-[14px] tabular-nums ${
          incoming ? "text-mint-glow" : "text-white/85"
        }`}
      >
        {amount}
      </p>
    </div>
  );
}

// === Screen 2 — Send ===
function SendScreen() {
  return (
    <div className="px-5 pt-2 h-full">
      {/* Header: back arrow + title */}
      <div className="flex items-center justify-between mb-7">
        <div className="w-9 h-9 rounded-full bg-white/[0.05] border border-white/[0.06] flex items-center justify-center">
          <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
            <path
              d="M9 3L5 7L9 11"
              stroke="white"
              strokeOpacity="0.85"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
        <p className="text-white text-[14px] font-bold tracking-tight">Send</p>
        <div className="w-9 h-9" />
      </div>

      {/* Recipient pill */}
      <div className="flex items-center gap-3 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04] mb-7">
        <div className="w-10 h-10 rounded-full bg-mint-mid flex items-center justify-center flex-shrink-0">
          <span className="text-mint-ink text-[14px] font-bold">M</span>
        </div>
        <div className="flex-1">
          <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase font-bold mb-0.5">
            To
          </p>
          <p className="text-white text-[14px] font-semibold leading-tight">
            Maya · @maya
          </p>
        </div>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 6L7 10L11 6"
            stroke="white"
            strokeOpacity="0.4"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Amount entry */}
      <div className="text-center mb-2 mt-4">
        <p className="text-[10px] tracking-[0.18em] text-white/40 uppercase font-bold mb-3">
          Amount
        </p>
        <div className="flex items-baseline justify-center gap-1">
          <span className="text-white/55 text-[28px] font-bold tracking-tight">
            A$
          </span>
          <span
            className="text-white text-[64px] font-bold tracking-tight tabular-nums leading-none"
            style={{
              textShadow: "0 0 40px rgba(102,205,131,0.3)",
            }}
          >
            48
          </span>
          <motion.span
            className="text-white text-[64px] font-bold tracking-tight tabular-nums leading-none"
            animate={{ opacity: [1, 0, 1] }}
            transition={{ duration: 1, repeat: Infinity }}
            aria-hidden
          >
            |
          </motion.span>
        </div>
        <p className="text-mint-glow text-[12px] mt-3 font-semibold">
          Settles instantly
        </p>
      </div>

      {/* Note */}
      <div className="mt-7 mb-5 p-3 rounded-2xl bg-white/[0.03] border border-white/[0.04]">
        <p className="text-[10px] tracking-[0.16em] text-white/40 uppercase font-bold mb-1">
          Note
        </p>
        <p className="text-white/85 text-[13px] font-medium">Coffee 🙏</p>
      </div>

      {/* Send button */}
      <div className="flex items-center justify-center gap-2 py-4 rounded-full bg-mint-mid">
        <span className="text-mint-ink text-[15px] font-bold">Send A$48</span>
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
          <path
            d="M3 7H11M11 7L7 3M11 7L7 11"
            stroke="#0F2E1A"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </div>

      {/* Network line */}
      <div className="flex items-center justify-center gap-1.5 mt-4">
        <SolanaMark markOnly height={10} />
        <span className="text-white/45 text-[10px] tracking-[0.14em] uppercase font-bold">
          via Solana · ~$0.0008 fee
        </span>
      </div>
    </div>
  );
}

// === Screen 3 — Sent ===
function SentScreen() {
  return (
    <div className="px-5 pt-2 h-full flex flex-col">
      {/* Spacer to push content down a bit */}
      <div className="h-14" />

      {/* Animated success ring */}
      <div className="flex flex-col items-center mb-8">
        <motion.div
          className="relative w-24 h-24 rounded-full flex items-center justify-center mb-7"
          initial={{ scale: 0.6, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{
            type: "spring",
            stiffness: 200,
            damping: 16,
            delay: 0.05,
          }}
        >
          {/* Glowing ring */}
          <div
            aria-hidden
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "radial-gradient(circle, rgba(102,205,131,0.5) 0%, transparent 70%)",
              filter: "blur(12px)",
            }}
          />
          <div
            className="absolute inset-0 rounded-full"
            style={{
              background:
                "linear-gradient(135deg, #66CD83 0%, #4CB66A 100%)",
            }}
          />
          {/* Checkmark */}
          <motion.svg
            width="40"
            height="40"
            viewBox="0 0 40 40"
            fill="none"
            className="relative"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
          >
            <motion.path
              d="M11 20L17 26L29 14"
              stroke="#0F2E1A"
              strokeWidth="3.5"
              strokeLinecap="round"
              strokeLinejoin="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ duration: 0.4, delay: 0.25, ease: "easeOut" }}
            />
          </motion.svg>
        </motion.div>

        <motion.p
          className="text-[10px] tracking-[0.2em] text-mint-glow uppercase font-bold mb-3"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
        >
          Sent
        </motion.p>
        <motion.p
          className="text-white text-[36px] font-bold tracking-tight tabular-nums leading-none mb-2"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.45 }}
        >
          A$48.00
        </motion.p>
        <motion.p
          className="text-white/55 text-[14px] font-medium"
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: 0.5 }}
        >
          To Maya
        </motion.p>
      </div>

      {/* Receipt details */}
      <motion.div
        className="rounded-2xl bg-white/[0.03] border border-white/[0.04] divide-y divide-white/[0.04]"
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.55 }}
      >
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-white/45 text-[12px] font-medium">
            Settled in
          </span>
          <span className="text-white text-[13px] font-bold tabular-nums">
            0.4 seconds
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-white/45 text-[12px] font-medium">
            Network fee
          </span>
          <span className="text-white text-[13px] font-bold tabular-nums">
            $0.0008
          </span>
        </div>
        <div className="flex items-center justify-between px-4 py-3">
          <span className="text-white/45 text-[12px] font-medium">Network</span>
          <div className="flex items-center gap-1.5">
            <SolanaMark markOnly height={10} />
            <span className="text-white text-[13px] font-bold">Solana</span>
          </div>
        </div>
      </motion.div>

      <motion.p
        className="text-center text-white/30 text-[10px] tracking-[0.14em] uppercase font-bold mt-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
      >
        View on Solscan ↗
      </motion.p>
    </div>
  );
}

// === Main component ===
const SCREENS = ["home", "send", "sent"] as const;
type Screen = (typeof SCREENS)[number];

// How long each screen stays visible (ms)
const HOLD_DURATIONS: Record<Screen, number> = {
  home: 4200,
  send: 3400,
  sent: 3800,
};

export default function PhoneMockup() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isTouch, setIsTouch] = useState(false);
  const [screen, setScreen] = useState<Screen>("home");

  // === Tilt motion values ===
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

  // === Touch detection ===
  useEffect(() => {
    setIsTouch(window.matchMedia("(pointer: coarse)").matches);
  }, []);

  // === Auto-advance through screens ===
  useEffect(() => {
    const t = setTimeout(() => {
      const currentIdx = SCREENS.indexOf(screen);
      const nextIdx = (currentIdx + 1) % SCREENS.length;
      setScreen(SCREENS[nextIdx]);
    }, HOLD_DURATIONS[screen]);
    return () => clearTimeout(t);
  }, [screen]);

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
      {/* Floating purple orb */}
      <div
        aria-hidden
        className="absolute top-[12%] left-[8%] w-32 h-32 rounded-full pointer-events-none"
        style={{
          background:
            "radial-gradient(circle, rgba(153,69,255,0.4) 0%, transparent 70%)",
          filter: "blur(30px)",
        }}
      />
      {/* Floating mint orb */}
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
            <StatusBar />

            {/* Screen content with parallax + crossfade between screens */}
            <motion.div
              style={{ x: contentX, y: contentY }}
              className="relative h-full"
            >
              <AnimatePresence mode="wait">
                <motion.div
                  key={screen}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                  className="absolute inset-0"
                >
                  {screen === "home" && (
                    <HomeScreen
                      cardX={cardX}
                      cardY={cardY}
                      sheenBg={sheenBg}
                    />
                  )}
                  {screen === "send" && <SendScreen />}
                  {screen === "sent" && <SentScreen />}
                </motion.div>
              </AnimatePresence>
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
            style={{
              background: "linear-gradient(to left, #1a1a1a, #0a0a0a)",
            }}
          />
          <div
            aria-hidden
            className="absolute left-[-1.5px] top-[200px] w-[3px] h-[64px] rounded-r-sm"
            style={{
              background: "linear-gradient(to left, #1a1a1a, #0a0a0a)",
            }}
          />
        </div>
      </motion.div>
    </div>
  );
}
