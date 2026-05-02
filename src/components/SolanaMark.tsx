type SolanaMarkProps = {
  className?: string;
  height?: number;
};

/**
 * Solana logomark — three slanted parallelograms with the official brand
 * gradient (purple #9945FF → green #14F195). Rendered as inline SVG so it
 * always loads regardless of asset hosting.
 *
 * Used in the "Powered by Solana" footer badge alongside the wordmark
 * "Solana" rendered as text — keeps the use trademark-respectful.
 */
export default function SolanaMark({
  className = "",
  height = 18,
}: SolanaMarkProps) {
  // Aspect ratio matches the official logomark proportions
  const width = height * 1.27;
  return (
    <svg
      role="img"
      aria-label="Solana"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 508 400"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Each bar gets the brand gradient — purple bottom-left to green top-right */}
        <linearGradient
          id="solana-mark-gradient-top"
          x1="0"
          y1="0"
          x2="508"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
        <linearGradient
          id="solana-mark-gradient-mid"
          x1="0"
          y1="0"
          x2="508"
          y2="0"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9945FF" />
          <stop offset="100%" stopColor="#14F195" />
        </linearGradient>
        <linearGradient
          id="solana-mark-gradient-bot"
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

      {/* Top parallelogram — slants down-right to up-left direction */}
      <path
        d="M82 18 H433 a18 18 0 0 1 14 7 L496 78 a8 8 0 0 1 -6 13 H75 a18 18 0 0 1 -14 -7 L12 32 a8 8 0 0 1 6 -13 H82 Z"
        fill="url(#solana-mark-gradient-top)"
      />
      {/* Middle parallelogram — slants the OPPOSITE direction (this is the key Solana detail) */}
      <path
        d="M75 154 H426 a18 18 0 0 1 14 7 L489 215 a8 8 0 0 1 -6 13 H82 a18 18 0 0 1 -14 -7 L19 167 a8 8 0 0 1 6 -13 H75 Z"
        transform="matrix(-1 0 0 1 508 0)"
        fill="url(#solana-mark-gradient-mid)"
      />
      {/* Bottom parallelogram — same direction as top */}
      <path
        d="M82 290 H433 a18 18 0 0 1 14 7 L496 350 a8 8 0 0 1 -6 13 H75 a18 18 0 0 1 -14 -7 L12 304 a8 8 0 0 1 6 -13 H82 Z"
        fill="url(#solana-mark-gradient-bot)"
      />
    </svg>
  );
}
