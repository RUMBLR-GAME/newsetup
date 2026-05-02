"use client";

import { useEffect, useRef, useState } from "react";
import { useSolanaRiver, type RiverTx } from "@/lib/useSolanaRiver";

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

// Speed: viewport-widths-per-second
const MIN_SPEED = 0.55;
const MAX_SPEED = 0.9;

type SolanaRiverProps = {
  height?: number;
  className?: string;
  ambient?: boolean;
};

function formatAud(n: number): string {
  if (n >= 1000) return `$${n.toLocaleString("en-AU", { maximumFractionDigits: 0 })}`;
  if (n >= 100) return `$${n.toFixed(0)}`;
  return `$${n.toFixed(2)}`;
}

/** Detect mobile via viewport width + touch capability — avoids UA sniffing pitfalls */
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
  ambient = false,
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
  // On touch devices, "previewed" replaces "hovered" — first tap shows the
  // tooltip, second tap on the same dot opens Solscan.
  const [previewed, setPreviewed] = useState<{
    tx: RiverTx;
    x: number;
    lane: number;
  } | null>(null);

  // Detect mobile + react to resize / orientation changes
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

  // Queue new txs as they arrive
  useEffect(() => {
    if (!txs.length) return;
    const incoming = txs.slice(-60);
    queueRef.current = [...queueRef.current, ...incoming].slice(-300);
  }, [txs]);

  // prefers-reduced-motion
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduceMotionRef.current = mq.matches;
    const handler = (e: MediaQueryListEvent) => {
      reduceMotionRef.current = e.matches;
    };
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  // Setup canvas + DPR
  useEffect(() => {
    const canvas = canvasRef.current;
    const container = containerRef.current;
    if (!canvas || !container) return;

    function resize() {
      if (!canvas || !container) return;
      const rect = container.getBoundingClientRect();
      // Cap DPR at 1.5 on mobile (vs 2 on desktop) for performance —
      // a 2× canvas on a 6.7" phone is 4M pixels, that's expensive.
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

  // Animation loop
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

      // Trail fade
      ctx!.fillStyle = "rgba(0, 0, 0, 0.14)";
      ctx!.fillRect(0, 0, w, h);

      const activeLanes = mobile ? LANES_MOBILE : LANES_DESKTOP;
      const laneHeight = h / activeLanes;

      // Mobile gets ~half the spawn rate + lower max — keeps 60fps on midrange phones
      const spawnRate = reduceMotionRef.current
        ? 250
        : mobile
        ? 50
        : 25;
      const maxParticles = reduceMotionRef.current
        ? 30
        : mobile
        ? 50
        : 110;

      while (
        now - lastSpawn > spawnRate &&
        queueRef.current.length > 0 &&
        particlesRef.current.length < maxParticles
      ) {
        const tx = queueRef.current.shift()!;
        const speed = MIN_SPEED + Math.random() * (MAX_SPEED - MIN_SPEED);
        // Clamp lane to active lane count (in case mobile/desktop switched)
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

        // Mobile: shorter trail (fewer draw calls per particle)
        const maxTrail = mobile ? 10 : 16;
        p.trail.push({ x: p.x, alpha: 1 });
        if (p.trail.length > maxTrail) p.trail.shift();
        for (const t of p.trail) t.alpha *= 0.86;

        const px = p.x * w;
        const bob = Math.sin(p.age * 2 + p.tx.spawnAt) * 4;
        const py = (p.lane + 0.5) * laneHeight + bob;

        // Trail
        for (const t of p.trail) {
          const tx = t.x * w;
          ctx!.beginPath();
          ctx!.fillStyle = `rgba(102, 205, 131, ${t.alpha * 0.25})`;
          ctx!.arc(tx, py, 1.8 * p.size, 0, Math.PI * 2);
          ctx!.fill();
        }

        // Glow halo
        const radius = 4 + p.size;
        const glowGrad = ctx!.createRadialGradient(px, py, 0, px, py, radius * 6);
        glowGrad.addColorStop(0, "rgba(156, 224, 174, 0.85)");
        glowGrad.addColorStop(0.4, "rgba(102, 205, 131, 0.35)");
        glowGrad.addColorStop(1, "rgba(102, 205, 131, 0)");
        ctx!.fillStyle = glowGrad;
        ctx!.beginPath();
        ctx!.arc(px, py, radius * 6, 0, Math.PI * 2);
        ctx!.fill();

        // Core
        ctx!.fillStyle = "#9CE0AE";
        ctx!.beginPath();
        ctx!.arc(px, py, radius, 0, Math.PI * 2);
        ctx!.fill();

        // Hot center
        ctx!.fillStyle = "rgba(255, 255, 255, 0.9)";
        ctx!.beginPath();
        ctx!.arc(px, py, radius * 0.45, 0, Math.PI * 2);
        ctx!.fill();

        // AUD label
        let labelAlpha = 1;
        if (p.x < 0.05) labelAlpha = p.x / 0.05;
        else if (p.x > 0.92) labelAlpha = Math.max(0, (1.05 - p.x) / 0.13);

        if (labelAlpha > 0.02) {
          const labelText = formatAud(p.tx.audAmount);
          // Slightly smaller labels on mobile
          const fontSize = mobile ? 10 : ambient ? 11 : 12;
          ctx!.font = `600 ${fontSize}px Inter, system-ui, sans-serif`;
          ctx!.textBaseline = "middle";

          const labelX = px + radius + 8;
          const labelY = py;

          ctx!.fillStyle = `rgba(0, 0, 0, ${0.55 * labelAlpha})`;
          ctx!.fillText(labelText, labelX + 1, labelY + 1);

          ctx!.fillStyle = `rgba(156, 224, 174, ${labelAlpha})`;
          ctx!.fillText(labelText, labelX, labelY);
        }

        remaining.push(p);
      }
      particlesRef.current = remaining;

      animationRef.current = requestAnimationFrame(tick);
    }

    animationRef.current = requestAnimationFrame(tick);
    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current);
    };
  }, [ambient]);

  // ----- Pointer interactions: hover (desktop) + tap-preview (touch) -----
  function findNearestParticle(x: number, y: number, radius = 36) {
    const { w, h } = sizeRef.current;
    const activeLanes = isMobileRef.current ? LANES_MOBILE : LANES_DESKTOP;
    const laneHeight = h / activeLanes;
    let nearest: Particle | null = null;
    let nearestDist = Infinity;
    for (const p of particlesRef.current) {
      const px = p.x * w;
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
    if (isMobileRef.current) return; // touch devices use tap, not hover
    const container = containerRef.current;
    if (!container) return;
    const rect = container.getBoundingClientRect();
    setHovered(findNearestParticle(e.clientX - rect.left, e.clientY - rect.top, 28));
  }

  function onMouseLeave() {
    setHovered(null);
  }

  function onClick(e: React.MouseEvent<HTMLDivElement>) {
    // Desktop: hovered particle is what we open
    if (hovered) {
      window.open(
        `https://solscan.io/tx/${hovered.tx.signature}`,
        "_blank",
        "noopener,noreferrer"
      );
    }
  }

  function onTouchEnd(e: React.TouchEvent<HTMLDivElement>) {
    // On touch: first tap freezes a preview snapshot of the nearest particle
    // at the tap location, second tap on the preview (or the dot near it)
    // opens Solscan. This gives users time to see the AUD before committing.
    const container = containerRef.current;
    const touch = e.changedTouches[0];
    if (!container || !touch) return;
    const rect = container.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;
    const hit = findNearestParticle(x, y, 44); // larger touch target

    if (!hit) {
      setPreviewed(null);
      return;
    }

    // If we already had a preview and the tap is roughly the same area, open it
    if (previewed) {
      window.open(
        `https://solscan.io/tx/${previewed.tx.signature}`,
        "_blank",
        "noopener,noreferrer"
      );
      setPreviewed(null);
      return;
    }

    // First tap: freeze the preview at the tap location (particle is moving fast,
    // but the preview UI sits where the user can see it for 2.5s)
    setPreviewed({ tx: hit.tx, x: x / sizeRef.current.w, lane: hit.lane });

    // Auto-clear preview after 2.5s if user doesn't tap again
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

      {/* Edge fade gradients */}
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

      {/* Tooltip — desktop hover OR mobile tap-preview */}
      {showTooltipAt && (
        <div
          className="absolute pointer-events-none z-30 -translate-x-1/2 -translate-y-full bg-black/95 backdrop-blur-sm border border-mint-mid/50 rounded-lg px-3 py-2 text-[10px] tracking-wide font-mono shadow-[0_8px_32px_rgba(0,0,0,0.6)]"
          style={{
            left: `${showTooltipAt.x * 100}%`,
            top: `${((showTooltipAt.lane + 0.5) / activeLanes) * 100}%`,
            marginTop: "-14px",
          }}
        >
          <div className="text-mint-glow font-semibold mb-0.5 whitespace-nowrap">
            {formatAud(showTooltipAt.tx.audAmount)} AUD ·{" "}
            {previewed ? "tap again to open" : "open on Solscan ↗"}
          </div>
          <div className="text-white/60">
            {showTooltipAt.tx.signature.slice(0, 14)}…
            {showTooltipAt.tx.signature.slice(-8)}
          </div>
        </div>
      )}
    </div>
  );
}
