# Fluid · Landing page

Production-ready Next.js 14 landing page for Fluid — a free, instant Australian payments app on Solana, settled in AUDD.

Built for the Solana Frontier Hackathon (May 2026).

---

## What's in here

A single-page marketing site with **live Solana mainnet data** and a **clickable real-payment demo**:

- **Hero** — animated send loop, scroll-driven parallax, count-up stats, magnetic CTA
- **Live demo** — *click a button, sign a real transaction on Solana devnet, get back a Solscan link*. Real chain, real signature, no real money. ⭐ The signature wow moment.
- **Live TPS pill** in the header — pulls real Solana mainnet TPS from RPC, updates every 8 seconds
- **Live slot ticker** — current Solana mainnet slot, ticks ~1.5s
- **How it works** — three numbered cards (Speed / Stability / Spend)
- **Fee comparison** — $1,000 international remittance: Fluid vs PayID vs Wise. The wedge.
- **Card** — yield-earning AUDD-backed card with mouse-tilt 3D parallax
- **Programmable money** — scheduled rent, conditional sends, splits
- **Tax & compliance** — ATO-ready FY2026 statement mockup with count-up numbers
- **Compliance grid** — AUSTRAC · AFSL · Travel Rule · AFCA tiles
- **Testimonials** — three beta-user quotes
- **FAQ** — seven honest answers (accordion)
- **Final CTA** — waitlist email capture (Formspree)
- **Footer** — full legal disclosure

---

## Tech

- **Next.js 14** (App Router) — static + one dynamic API route
- **React 18** — stable
- **Tailwind CSS 3** — utility-first, brand tokens in `tailwind.config.ts`
- **Framer Motion** — scroll-triggered animation, parallax, count-ups, magnetic & tilt
- **@solana/web3.js** — live mainnet RPC + devnet payment signing
- **TypeScript** — strict mode

Initial bundle: **~155 KB First Load JS**. The `@solana/web3.js` library (~150KB) is lazy-loaded only when the live components mount, keeping critical render fast.

---

## Run locally

```bash
npm install
cp .env.example .env.local
# Fill in env.local — see "Environment variables" below
npm run dev
```

Visit [http://localhost:3000](http://localhost:3000).

For production:

```bash
npm run build
npm run start
```

---

## Environment variables

All env setup is documented in `.env.example`. The three you'll set:

| Var | Required? | Purpose |
|---|---|---|
| `NEXT_PUBLIC_FORMSPREE_ID` | recommended | Email capture for waitlist form |
| `NEXT_PUBLIC_SOLANA_RPC` | recommended | Mainnet RPC for live TPS + slot. Defaults to public endpoint (rate-limited). |
| `SOLANA_DEMO_SECRET_KEY` | required for demo | Devnet keypair that signs the live demo transactions. **Server-side only.** |

If `SOLANA_DEMO_SECRET_KEY` is unset, the live demo button shows a friendly error. The rest of the site works fine without it.

---

## Setting up the devnet payment demo

The live demo signs a tiny self-transfer (1000 lamports) on Solana devnet every time someone clicks the button. To enable it:

### 1. Generate a devnet keypair

You need the [Solana CLI](https://docs.solana.com/cli/install-solana-cli-tools) installed (or any tool that produces a 64-byte secret key).

```bash
solana-keygen new -o demo-wallet.json --no-bip39-passphrase
solana config set --url devnet --keypair demo-wallet.json
solana airdrop 1   # gets 1 SOL of devnet test tokens
solana balance     # confirm
```

### 2. Copy the secret key into env

```bash
cat demo-wallet.json
# Output looks like: [12,45,67,...,89]   (64 numbers)
```

Paste this entire array as the value of `SOLANA_DEMO_SECRET_KEY` in your `.env.local` (and in Vercel project settings for production).

### 3. Top up periodically

Each demo click costs ~5,000 lamports (transaction fee + the 1000 lamport transfer = ~0.000006 SOL). 1 SOL of devnet airdrop covers ~150,000 demo clicks. If the wallet runs dry, just `solana airdrop 1` again.

### Security note

This keypair only ever holds **devnet SOL** — test tokens with no real-world value. Even if it leaked, the worst-case is someone drains your devnet balance (which you can re-airdrop in 5 seconds). The code never touches Solana mainnet — read `src/lib/server/wallet.ts` and `src/app/api/demo-payment/route.ts` to verify.

### Rate limiting

The API route has a per-IP rate limit baked in: 4 demo payments per minute per IP. This is in-memory (resets when the Vercel instance recycles). For production-grade abuse protection, swap to Upstash or Vercel KV.

---

## Deploy to Vercel

### One-click

1. Push this folder to a GitHub repo
2. In Vercel: **New Project → Import** the repo
3. Framework Preset: **Next.js** (auto-detected)
4. Add environment variables (Settings → Environment Variables):
   - `NEXT_PUBLIC_FORMSPREE_ID` (your Formspree form ID)
   - `NEXT_PUBLIC_SOLANA_RPC` (recommended: free Helius/QuickNode endpoint)
   - `SOLANA_DEMO_SECRET_KEY` (your devnet keypair JSON array)
5. Deploy

### Custom domain

1. Vercel → Project → Settings → Domains
2. Add `fluid.au` (or whatever you bought)
3. Add the DNS records Vercel gives you at your registrar
4. Wait 5-30 min for DNS + SSL provisioning

---

## Solana RPC: which one to use

The site defaults to `https://api.mainnet-beta.solana.com` (Solana Foundation's public RPC). It works but is heavily rate-limited — fine for low landing-page traffic, but if you get a viral moment you'll see "live" pills go grey as RPC requests start failing.

Three free alternatives that handle real load:

| Provider | Free tier | Setup |
|---|---|---|
| **Helius** | 100k req/day | helius.dev → free signup → copy mainnet RPC URL |
| **QuickNode** | 10M req/month | quicknode.com → free trial |
| **Triton** | 50k req/day | triton.one → free Solana endpoint |

Set `NEXT_PUBLIC_SOLANA_RPC` to your endpoint URL. Same env var works for the API route too.

---

## Project structure

```
fluid-landing/
├── public/
│   ├── og-image.png            # 1200×630 social preview
│   ├── favicon.ico, favicon-32.png, apple-touch-icon.png, icon-512.png
│   ├── manifest.json           # PWA manifest
│   ├── robots.txt, sitemap.xml
├── src/
│   ├── app/
│   │   ├── layout.tsx          # metadata, OG, Twitter card
│   │   ├── page.tsx            # composes all sections
│   │   ├── globals.css
│   │   └── api/
│   │       └── demo-payment/
│   │           └── route.ts    # signs+submits Solana devnet tx
│   ├── lib/
│   │   ├── useSolanaTPS.ts     # client hook — polls mainnet TPS
│   │   ├── useSolanaSlot.ts    # client hook — polls current slot
│   │   └── server/
│   │       └── wallet.ts       # server-only — loads demo keypair
│   └── components/
│       ├── Logo.tsx            # color-prop SVG
│       ├── Header.tsx
│       ├── ScrollProgress.tsx  # mint scroll bar at top
│       ├── FadeIn.tsx          # scroll-triggered fade up
│       ├── CountUp.tsx         # animated number counter
│       ├── MagneticButton.tsx  # cursor-attractive button
│       ├── TiltCard.tsx        # 3D mouse-tilt
│       ├── SendAnimation.tsx   # 6s send loop (pure CSS)
│       ├── LiveTPS.tsx         # ⚡ live mainnet TPS pill
│       ├── LiveSlot.tsx        # ⚡ live mainnet slot ticker
│       ├── DemoPayment.tsx     # ⚡ clickable real Solana payment
│       └── sections/
│           ├── Hero.tsx
│           ├── TryItLive.tsx   # ⚡ the live demo section
│           ├── HowItWorks.tsx
│           ├── FeeComparison.tsx
│           ├── Card.tsx
│           ├── Programmable.tsx
│           ├── Tax.tsx
│           ├── Compliance.tsx
│           ├── Testimonials.tsx
│           ├── FAQ.tsx
│           ├── FinalCTA.tsx
│           └── Footer.tsx
├── tailwind.config.ts
├── next.config.js
├── tsconfig.json
├── postcss.config.js
├── package.json
└── .env.example
```

⚡ = lazy-loaded (Solana web3.js doesn't ship in initial bundle)

---

## Brand tokens

In `tailwind.config.ts`:

| Token | Value | Use |
|---|---|---|
| `mint-glow` | `#9CE0AE` | Highlight text, eyebrow text |
| `mint-mid` | `#66CD83` | **Primary brand colour.** Card, accents |
| `mint-deep` | `#3D9656` | Card gradient terminus |
| `mint-ink` | `#0F2E1A` | Text on mint surfaces |
| `surface-black` | `#000000` | Page background |
| `surface-raised` | `#0E0E0E` | Card / section backgrounds |
| `surface-elevated` | `#1A1A1A` | Avatar gradients |

Hero font weight is **Inter Bold** (700). Logo is an inline SVG component (`Logo.tsx`) — pass `letterColor` and `dotColor` props.

---

## Honest disclosure (in the footer)

The footer states accurately:

> Fluid is a Solana Frontier Hackathon project (May 2026). AUDD is real and issued by AUDC Pty Ltd under an AFSL granted by ASIC. AUDC is registered with AUSTRAC and is a member of AFCA. Fluid is pursuing its own AFSL pathway ahead of the June 2026 ASIC no-action expiry.

The TryItLive section also explicitly notes:

> Production Fluid uses Solana mainnet with AUDD (issued under ASIC AFSL by AUDC). This page demonstrates the technology on devnet — identical mechanics, test tokens.

**Don't change either of these without thinking carefully.** Misstating regulatory status is real legal risk in Australian financial services.

---

## Performance notes

- Static rendered (`○ Static`) — page HTML pre-built at deploy time
- API route (`ƒ Dynamic`) — runs on demand, returns JSON in <2s
- `@solana/web3.js` lazy-loaded — keeps initial bundle at ~155KB
- All animations respect `prefers-reduced-motion`
- Visible focus rings (mint outline, 3px offset)

Lighthouse target: 90+ Performance, 95+ Accessibility / Best Practices / SEO.

---

## Things to add later

- **Real founder photo** — drop into `/public`, replace the empty space below hero stats
- **Real testimonial photos** — currently initials in circles
- **Production AUDD demo** — once Fluid has its AFSL, swap devnet for mainnet AUDD transfers
- **Live transaction feed** — beyond the slot ticker, show actual recent payments on Fluid's program ID
- **`/about`** with founder story
- **`/legal/privacy`, `/legal/terms`** — currently placeholder

---

## Credits

Built by Gray Sunderland, Queensland. Designed in Figma. Coded with Claude.

---

## License

All rights reserved · Fluid 2026
