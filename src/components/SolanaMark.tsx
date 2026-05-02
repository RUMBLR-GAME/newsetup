type SolanaMarkProps = {
  className?: string;
  height?: number;
};

/**
 * Solana logomark — three slanted parallelograms with the brand gradient
 * (purple → pink → cyan). Rendered as inline SVG so it always loads.
 *
 * Used in a "Powered by Solana" badge alongside the wordmark "Solana"
 * rendered as text — this avoids approximating the trademarked wordmark
 * while still giving an instantly recognisable Solana credit.
 */
export default function SolanaMark({
  className = "",
  height = 18,
}: SolanaMarkProps) {
  // Logomark aspect ratio — roughly square at the official spec
  const width = height * 1.27;
  return (
    <svg
      role="img"
      aria-label="Solana"
      className={className}
      width={width}
      height={height}
      viewBox="0 0 397 311"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <linearGradient
          id="solana-mark-gradient"
          x1="50"
          y1="280"
          x2="350"
          y2="20"
          gradientUnits="userSpaceOnUse"
        >
          <stop offset="0%" stopColor="#9945FF" />
          <stop offset="50%" stopColor="#EB54BC" />
          <stop offset="100%" stopColor="#19FB9B" />
        </linearGradient>
      </defs>

      {/* Bottom slanted bar */}
      <path
        d="M64 237 L116 185 L333 185 L281 237 Z"
        fill="url(#solana-mark-gradient)"
      />
      {/* Middle slanted bar */}
      <path
        d="M64 130 L116 78 L333 78 L281 130 Z"
        fill="url(#solana-mark-gradient)"
      />
      {/* Top slanted bar */}
      <path
        d="M281 23 L333 75 L116 75 L64 23 Z"
        fill="url(#solana-mark-gradient)"
        transform="translate(0, -1)"
      />
    </svg>
  );
}
