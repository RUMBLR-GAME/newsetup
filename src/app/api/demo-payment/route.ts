import { NextResponse } from "next/server";
import {
  Connection,
  SystemProgram,
  Transaction,
  LAMPORTS_PER_SOL,
} from "@solana/web3.js";
import { loadDemoKeypair } from "@/lib/server/wallet";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";
// Devnet confirmations occasionally take 8-12s; Vercel's default 10s timeout
// can kill the request mid-flight. 30s gives plenty of headroom.
export const maxDuration = 30;

const DEVNET_RPC =
  process.env.SOLANA_DEVNET_RPC || "https://api.devnet.solana.com";

// Tiny self-transfer — proves the chain works without burning faucet SOL fast
const TRANSFER_LAMPORTS = 1_000; // 0.000001 SOL

// Simple in-memory rate limit (per Vercel instance). Resets when instance recycles.
// For production-grade rate limiting use Upstash / Vercel KV. This is a
// reasonable abuse-floor for a hackathon demo.
const RATE_LIMIT_WINDOW_MS = 60_000; // 1 minute
const RATE_LIMIT_MAX = 4; // 4 demo payments per IP per minute
const ipHits = new Map<string, number[]>();

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const hits = ipHits.get(ip) ?? [];
  const recent = hits.filter((t) => now - t < RATE_LIMIT_WINDOW_MS);
  if (recent.length >= RATE_LIMIT_MAX) {
    return true;
  }
  recent.push(now);
  ipHits.set(ip, recent);
  return false;
}

export async function POST(req: Request) {
  // Identify caller for rate limiting
  const ip =
    req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ||
    req.headers.get("x-real-ip") ||
    "unknown";

  if (isRateLimited(ip)) {
    return NextResponse.json(
      { error: "Too many demo payments — try again in a minute." },
      { status: 429 }
    );
  }

  let keypair;
  try {
    keypair = loadDemoKeypair();
  } catch (err: any) {
    return NextResponse.json(
      {
        error:
          "Demo wallet is not configured. Set SOLANA_DEMO_SECRET_KEY env var.",
      },
      { status: 503 }
    );
  }

  try {
    const connection = new Connection(DEVNET_RPC, "confirmed");

    // Pre-flight balance check — gives the user a clear "wallet is empty"
    // error instead of a confusing "Transaction failed" generic one.
    const balance = await connection.getBalance(keypair.publicKey);
    if (balance < TRANSFER_LAMPORTS + 5_000) {
      return NextResponse.json(
        {
          error:
            "Demo wallet is out of devnet SOL. Refill at faucet.solana.com.",
          details: `Wallet ${keypair.publicKey.toBase58()} has ${balance} lamports.`,
        },
        { status: 503 }
      );
    }

    // Build a 1000-lamport self-transfer
    const { blockhash, lastValidBlockHeight } =
      await connection.getLatestBlockhash("confirmed");

    const tx = new Transaction({
      feePayer: keypair.publicKey,
      blockhash,
      lastValidBlockHeight,
    }).add(
      SystemProgram.transfer({
        fromPubkey: keypair.publicKey,
        toPubkey: keypair.publicKey,
        lamports: TRANSFER_LAMPORTS,
      })
    );

    tx.sign(keypair);
    const startedAt = Date.now();
    const signature = await connection.sendRawTransaction(tx.serialize(), {
      skipPreflight: false,
      maxRetries: 3,
    });

    // Wait for confirmation with our own timeout — devnet's confirmTransaction
    // can hang on busy slots. We poll the signature status manually so we can
    // bail at 20s and still return the signature for Solscan lookup.
    const CONFIRM_TIMEOUT_MS = 20_000;
    const confirmDeadline = Date.now() + CONFIRM_TIMEOUT_MS;
    let confirmed = false;
    let confirmErr: any = null;

    while (Date.now() < confirmDeadline) {
      const status = await connection.getSignatureStatus(signature, {
        searchTransactionHistory: false,
      });
      const s = status.value;
      if (s) {
        if (s.err) {
          confirmErr = s.err;
          break;
        }
        if (
          s.confirmationStatus === "confirmed" ||
          s.confirmationStatus === "finalized"
        ) {
          confirmed = true;
          break;
        }
      }
      await new Promise((r) => setTimeout(r, 600));
    }
    const durationMs = Date.now() - startedAt;

    if (confirmErr) {
      return NextResponse.json(
        {
          error: "Transaction confirmed with error",
          details: JSON.stringify(confirmErr),
          signature,
          explorerUrl: `https://solscan.io/tx/${signature}?cluster=devnet`,
        },
        { status: 502 }
      );
    }

    // Even if we hit the timeout without seeing "confirmed" status, we DID
    // submit the transaction — return the signature so the user can verify
    // on Solscan themselves. Not a hard failure.
    return NextResponse.json({
      signature,
      cluster: "devnet",
      explorerUrl: `https://solscan.io/tx/${signature}?cluster=devnet`,
      lamports: TRANSFER_LAMPORTS,
      durationMs,
      confirmed,
      from: keypair.publicKey.toBase58(),
      to: keypair.publicKey.toBase58(),
    });
  } catch (err: any) {
    console.error("[demo-payment] failed:", err);
    return NextResponse.json(
      {
        error: "Transaction failed",
        details: err?.message ?? String(err) ?? "unknown",
      },
      { status: 500 }
    );
  }
}
