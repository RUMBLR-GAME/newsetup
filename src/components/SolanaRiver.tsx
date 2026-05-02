"use client";

import { useEffect, useRef, useState } from "react";
import { useSolanaRiver, type RiverTx, type RiverColour } from "@/lib/useSolanaRiver";

type Particle = {
  tx: RiverTx;
  x: number;
  lane: number;
  speed: number;
  age: number;
  size: number;
  trail: Array<{ x: number; alpha: number }>;
};

const LANES_DESKTOP = 6;
const LANES_MOBILE = 4;

const MIN_SPEED = 0.55;
const MAX_SPEED = 0.9;

const MINT_GLOW = "rgba(156, 224, 174, ALPHA)";
const MINT_MID = "rgba(102, 205, 131, ALPHA)";
const PURPLE_GLOW = "rgba(199, 159, 255, ALPHA)";
const PURPLE_MID = "rgba(153, 69, 255, ALPHA)";

function colourStops(c: RiverColour): { glow: string; mid: string } {
  return c === "purple"
    ? { glow: PURPLE_GLOW, mid: PURPLE_MID }
    : { glow: MINT_GLOW, mid: MINT_MID };
}

function rgba(template: string, alpha: number): string {
  return template.replace("ALPHA", alpha.toFixed(3));
}

/**
 * Draw a horizontally-oriented capsule (rounded rectangle with full
 * semicircular ends) centred at (cx, cy). Width is the long axis, height
 * is the short axis. If width <= height, falls back to a circle.
 */
function drawCapsule(
  ctx: CanvasRenderingContext2D,
  cx: number,
  cy: number,
  width: number,
  height: number
) {
  const r = height / 2;
  if (width <= height) {
    ctx.beginPath();
    ctx.arc(cx, cy, r, 0, Math.PI * 2);
    ctx.fill();
    return;
  }
  const halfW = width / 2;
  const left = cx - halfW + r;
  const right = cx + halfW - r;
  ctx.beginPath();
  ctx.moveTo(left, cy - r);
  ctx.lineTo(right, cy - r);
  ctx.arc(right, cy, r, -Math.PI / 2, Math.PI / 2);
  ctx.lineTo(left, cy + r);
  ctx.arc(left, cy, r, Math.PI / 2, -Math.PI / 2);
  ctx.closePath();
  ctx.fill();
}

type SolanaRiverProps = {
  height?: number;
  className?: string;
};

function detectIsMobile(): boolean {
  if (typeof window === "undefined") return false;
  return (
    window.innerWidth < 768 ||
    (window.matchMedia("(pointer: coarse)").matches && window.innerWidth < 1024)
  );
}

export default function SolanaRiver({
  height = 320,
  className = "",
}: SolanaRiverProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const particlesRef = useRef<Particle[]>([]);
  const queueRef = useRef<RiverTx[]>([]);
  const dprRef = useRef(1);
  const sizeRef = useRef({ w: 1200, h: height });
  const animationRef = useRef<number | null>(null);
  const reduceMotionRef = useRef(false);
  const isMobileRef = useRef(false);

  const [isMobile, setIsMobile] = useState(false);
  const lanes = isMobile ? LANES_MOBILE : LANES_DESKTOP;

  const { txs } = useSolanaRiver(lanes);
  const [hovered, setHovered] = useState<Particle | null>(null);
  const [previewed, setPreviewed] = useState<{
    tx: RiverTx;
    x: number;
    lane: number;
  } | null>(null);

  useEffect(() => {
    const update = () => {
      const m = detectIsMobile();
      isMobileRef.current = m;
      setIsMobile(m);
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  useEffect(() => {
    if (!txs.length) return;
    const incoming = txs.slice(-60);
    queueRef.current = [...queueRef.current, ...incoming].slice(-300);
  }, [txs]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      const dprCap = isMobileRef.current ? 1.5 : 2;
      const dpr = Math.min(window.devicePixelRatio || 1, dprCap);
      dprRef.current = dpr;
      sizeRef.current = { w: rect.width, h: rect.height };
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      canvas.style.width = `${rect.width}px`;
      canvas.style.height = `${rect.height}px`;
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(container);
    return () => ro.disconnect();
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    let lastSpawn = 0;
    let lastTime = performance.now();

    function tick(now: number) {
      const dt = Math.min(now - lastTime, 50) / 1000;
      lastTime = now;
      const { w, h } = sizeRef.current;
      const dpr = dprRef.current;
      const mobile = isMobileRef.current;
      ctx!.setTransform(dpr, 0, 0, dpr, 0, 0);

      ctx!.fillStyle = "rgba(0, 0, 0, 0.14)";
      ctx!.fillRect(0, 0, w, h);

      const activeLanes = mobile ? LANES_MOBILE : LANES_DESKTOP;
      const laneHeight = h / activeLanes;

      const spawnRate = reduceMotionRef.current ? 250 : mobile ? 50 : 25;
      const maxParticles = reduceMotionRef.current ? 30 : mobile ? 50 : 110;

      while (
        now - lastSpawn > spawnRate &&
        queueRef.current.length > 0 &&
        particlesRef.current.length < maxParticles
      ) {
        const tx = queueRef.current.shift()!;
        const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
        const lane = tx.lane % activeLanes;
        particlesRef.current.push({
          tx,
          x: -0.05,
          lane,
          speed,
          age: 0,
          size: tx.size,
          trail: [],
        });
        lastSpawn = now;
      }

      const remaining: Particle[] = [];
      for (const p of particlesRef.current) {
        p.x += p.speed * dt;
        p.age += dt;
        if (p.x > 1.15) continue;

        const maxTrail = mobile ? 10 : 16;
        p.trail.push({ x: p.x, alpha: 1 });
        if (p.trail.length > maxTrail) p.trail.shift();
        for (const t of p.trail) t.alpha *= 0.86;

        const px = p.x * w;
        const bob = Math.sin(p.age * 2 + p.tx.spawnAt) * 4;
        const py = (p.lane + 0.5) * laneHeight + bob;

        const stops = colourStops(p.tx.colour);

        // === Capsule particles — elongated rounded rects, wider than tall ===
        // The aspect ratio reads as a streak of light moving through space,
        // rather than a generic round dot. Mobile gets even more elongation
        // since the lanes are narrower.
        const aspectRatio = mobile ? 4.5 : 3.6;

        // Trail: small thin capsules with strong horizontal stretch
        for (const t of p.trail) {
          const tx = t.x * w;
          const trailH = 1.6 * p.size;
          const trailW = trailH * (aspectRatio + 1);
          ctx!.fillStyle = rgba(stops.mid, t.alpha * 0.22);
          drawCapsule(ctx!, tx, py, trailW, trailH);
        }

        // Body height (and derived width) of the main capsule
        const capH = 5 + p.size * 1.4;          // tall axis (vertical)
        const capW = capH * aspectRatio;        // long axis (horizontal)
        const haloRadius = capH * 5;            // halo is still radial — looks natural

        // Soft radial glow around the capsule
        const glowGrad = ctx!.createRadialGradient(px, py, 0, px, py, haloRadius);
        glowGrad.addColorStop(0, rgba(stops.glow, 0.85));
        glowGrad.addColorStop(0.4, rgba(stops.mid, 0.32));
        glowGrad.addColorStop(1, rgba(stops.mid, 0));
        ctx!.fillStyle = glowGrad;
        ctx!.beginPath();
        ctx!.arc(px, py, haloRadius, 0, Math.PI * 2);
        ctx!.fill();

        // Main capsule body — coloured fill
        ctx!.fillStyle = p.tx.colour === "purple" ? "#C79FFF" : "#9CE0AE";
        drawCapsule(ctx!, px, py, capW, capH);

        // Hot core — a smaller, brighter capsule slightly toward the leading edge
        // (gives a sense of direction — the bright bit "leads" the trail)
        const hotW = capW * 0.55;
        const hotH = capH * 0.5;
        const hotCx = px + capW * 0.12;  // shift slightly forward (right)
        ctx!.fillStyle = "rgba(255, 255, 255, 0.9)";
        drawCapsule(ctx!, hotCx, py, hotW, hotH);

        remaining.push(p);
      }
      particlesRef.current = remaining;

      animationRef.current = requestAnimationFrame(tick);
    }

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, []);

  function findNearestParticle(x: number, y: number, radius = 36) {
    const { h } = sizeRef.current;
    const activeLanes = isMobileRef.current ? LANES_MOBILE : LANES_DESKTOP;
    const laneHeight = h / activeLanes;
    let nearest: Particle | null = null;
    let nearestDist = Infinity;
    for (const p of particlesRef.current) {
      const px = p.x * sizeRef.current.w;
      const py = (p.lane + 0.5) * laneHeight;
      const d = Math.hypot(px - x, py - y);
      if (d < radius && d < nearestDist) {
        nearest = p;
        nearestDist = d;
      }
    }
    return nearest;
  }

  function onMouseMove(e: React.MouseEvent<HTMLDivElement>) {
    if (isMobileRef.current) return;
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setHovered(findNearestParticle(e.clientX - rect.left, e.clientY - rect.top, 28));
  }

  function onMouseLeave() {
    setHovered(null);
  }

  function onClick() {
    if (hovered) {
      window.open(
        `https://solscan.io/tx/${hovered.tx.signature}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    const container = containerRef.current;
    const touch = e.changedTouches[0];
    if (!container || !touch) return;
    const rect = container.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const hit = findNearestParticle(x, y, 44);

    if (!hit) {
      setPreviewed(null);
      return;
    }
    if (previewed) {
      window.open(
        `https://solscan.io/tx/${previewed.tx.signature}`,
        "_blank",
        "noopener,noreferrer"
      );
      setPreviewed(null);
      return;
    }
    setPreviewed({ tx: hit.tx, x: x / sizeRef.current.w, lane: hit.lane });
    window.setTimeout(() => {
      setPreviewed((p) => (p?.tx.signature === hit.tx.signature ? null : p));
    }, 2500);
  }

  const showTooltipAt = hovered
    ? { tx: hovered.tx, x: hovered.x, lane: hovered.lane }
    : previewed;

  const activeLanes = isMobile ? LANES_MOBILE : LANES_DESKTOP;

  return (
    <div
      ref={containerRef}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
      onClick={onClick}
      onTouchEnd={onTouchEnd}
      className={`relative w-full ${className} ${
        hovered ? "cursor-pointer" : "cursor-default"
      }`}
      style={{ height, touchAction: "manipulation" }}
      role="img"
      aria-label="Live stream of real Solana mainnet transactions, flowing left to right at network speed"
    >
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full pointer-events-none"
      />

      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-24 md:w-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to right, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />
      <div
        aria-hidden
        className="absolute inset-y-0 right-0 w-24 md:w-48 pointer-events-none"
        style={{
          background:
            "linear-gradient(to left, rgba(0,0,0,1) 0%, rgba(0,0,0,0) 100%)",
        }}
      />

      {showTooltipAt && (
        <div
          className={`absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full bg-black/95 backdrop-blur-sm rounded-lg px-3 py-2 text-[10px] tracking-wide font-mono shadow-[0_8px_32px_rgba(0,0,0,0.6)] border ${
            showTooltipAt.tx.colour === "purple"
              ? "border-[#C79FFF]/50"
              : "border-mint-mid/50"
          }`}
          style={{
            left: `${showTooltipAt.x * 100}%`,
            top: `${((showTooltipAt.lane + 0.5) / activeLanes) * 100}%`,
            marginTop: "-14px",
          }}
        >
          <div
            className={`font-semibold mb-0.5 whitespace-nowrap ${
              showTooltipAt.tx.colour === "purple" ? "text-[#C79FFF]" : "text-mint-glow"
            }`}
          >
            Solana mainnet tx ·{" "}
            {previewed ? "tap again to open" : "open on Solscan ↗"}
          </div>
          <div className="text-white/60">
            {showTooltipAt.tx.signature.slice(0, 14)}…
            {showTooltipAt.tx.signature.slice(-8)}
          </div>
          <div className="text-white/40 mt-0.5">slot {showTooltipAt.tx.slot.toLocaleString()}</div>
        </div>
      )}
    </div>
  );
}
