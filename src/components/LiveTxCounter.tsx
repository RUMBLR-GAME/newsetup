"use client";

import { useSolanaTxCount } from "@/lib/useSolanaTxCount";

function formatCount(n: number | null): string {
  if (n === null) return "—";
  return n.toLocaleString("en-US");
}

export default function LiveTxCounter() {
  const { count, status } = useSolanaTxCount();
  const formatted = formatCount(count);

  return (
    <div className="flex flex-col items-start">
      <span className="eyebrow mb-3">
        <span className="relative flex h-1.5 w-1.5">
          <span
            aria-hidden
            className={`absolute inline-flex h-full w-full rounded-full bg-mint-mid ${
              status === "live" ? "animate-ping opacity-75" : "opacity-30"
            }`}
          />
          <span
            aria-hidden
            className="relative inline-flex rounded-full h-1.5 w-1.5 bg-mint-mid"
          />
        </span>
        Live Solana transactions
      </span>

      <p
        aria-live="polite"
        className="font-bold tabular-nums tracking-tight text-white text-2xl md:text-3xl leading-none"
      >
        {formatted}
      </p>
      <p className="text-xs text-white/40 mt-2 font-medium">
        Confirmed on mainnet · since genesis
      </p>
    </div>
  );
}
