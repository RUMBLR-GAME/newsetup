/* eslint-disable */
/**
 * Generate a fresh Solana devnet keypair for the demo payment button.
 *
 * Usage:
 *   node scripts/generate-demo-wallet.js
 *
 * Then:
 *   1. Copy the SECRET KEY value
 *   2. Paste into Vercel → Settings → Environment Variables → SOLANA_DEMO_SECRET_KEY
 *   3. Fund the PUBLIC ADDRESS with devnet SOL:
 *        - Go to https://faucet.solana.com
 *        - Paste the public address, get 1-2 SOL
 *   4. Trigger a redeploy on Vercel
 *
 * The wallet only ever holds devnet (test) SOL — there's no financial risk.
 */
const { Keypair } = require("@solana/web3.js");

const kp = Keypair.generate();
const publicKey = kp.publicKey.toBase58();
const secretKey = "[" + Array.from(kp.secretKey).join(",") + "]";

console.log("");
console.log("=================================================");
console.log("  Fluid Demo Wallet — Solana Devnet");
console.log("=================================================");
console.log("");
console.log("PUBLIC ADDRESS (fund this on devnet):");
console.log("  " + publicKey);
console.log("");
console.log("Faucet: https://faucet.solana.com  (paste the public address above)");
console.log("");
console.log("---");
console.log("");
console.log("SOLANA_DEMO_SECRET_KEY  (paste this entire array into Vercel):");
console.log("");
console.log(secretKey);
console.log("");
console.log("=================================================");
console.log("");
console.log("Next steps:");
console.log("  1. Go to https://faucet.solana.com");
console.log("     Paste the PUBLIC ADDRESS above. Get 1-2 SOL.");
console.log("");
console.log("  2. Vercel → Project → Settings → Environment Variables");
console.log("     Add new:");
console.log("       Key:   SOLANA_DEMO_SECRET_KEY");
console.log("       Value: (the array above, including the brackets)");
console.log("       Apply to: Production, Preview, Development");
console.log("");
console.log("  3. Redeploy from Vercel → Deployments → ⋯ → Redeploy");
console.log("");
