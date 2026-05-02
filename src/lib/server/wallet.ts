import { Keypair } from "@solana/web3.js";

/**
 * Loads the demo wallet keypair from the server env var.
 *
 * SECURITY NOTE: This wallet ONLY ever holds devnet SOL (test tokens, no value).
 * Never put a mainnet keypair in env vars. The whole point of this demo is to
 * sign devnet transactions on behalf of the user — devnet SOL is free and
 * faucet-able, so even if the key leaked there's no financial loss.
 *
 * The keypair is stored as a base58-encoded secret key (the format Phantom and
 * solana-cli export). See README for setup steps.
 */
export function loadDemoKeypair(): Keypair {
  const secret = process.env.SOLANA_DEMO_SECRET_KEY;
  if (!secret) {
    throw new Error(
      "SOLANA_DEMO_SECRET_KEY env var is not set. The /api/demo-payment route requires a devnet keypair. See README for setup."
    );
  }

  // Two accepted formats:
  //  1. JSON array of bytes (Solana CLI default): [1,2,3,...,64 numbers]
  //  2. Base58 string (Phantom export): "5Kj..."
  const trimmed = secret.trim();
  if (trimmed.startsWith("[")) {
    const bytes = JSON.parse(trimmed) as number[];
    if (!Array.isArray(bytes) || bytes.length !== 64) {
      throw new Error(
        "SOLANA_DEMO_SECRET_KEY must be a 64-byte array or base58 string"
      );
    }
    return Keypair.fromSecretKey(Uint8Array.from(bytes));
  }

  // Base58 decode
  const bs58 = require("bs58");
  return Keypair.fromSecretKey(bs58.decode(trimmed));
}
