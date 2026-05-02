# Fluid Landing — Build State

**Last updated:** 2 May 2026
**Project:** Fluid — P2P payments for Australians on Solana, settled in AUDD
**Owner:** Gray Sunderland · gray@block9.co
**Built in:** Queensland (NEVER Townsville — fully removed everywhere)
**Hackathon:** Colosseum Frontier · deadline 11 May 2026
**Solana Foundation org key:** `organization::1179535733538188337`

---

## Status: V15 SHIPPED

Latest zip: `/mnt/user-data/outputs/fluid-landing.zip` (~136 KB, fresh-install verified)
Live: `https://fluid-xi-beryl.vercel.app/`
Repo: `RUMBLR-GAME/fluid` on GitHub

User signed off: "ok we are good for now, great work."

---

## What V14 ships

### Hero (clean, split layout)
- Left col (`lg:col-span-7`): eyebrow pill, "Send AUD." (bold) + "Anywhere." (light italic mint via `.hero-headline--accent`), short subhead with "Built in Queensland. Made for Australia." in white semibold, mint "Try it live" CTA + outlined "Join the waitlist", 3-stat row (0.4s settle / $0.00 fee / AUDC AFSL)
- Right col (`lg:col-span-5`): `<PhoneMockup />` lazy-loaded, hidden on mobile (`hidden md:block`)
- Background: scroll-parallax mint glow + faint 64px grid texture at 2.5% opacity. NO river behind hero anymore.

### LiveRiver section (river is the hero)
- Subtle pill badge top-left: pulsing mint dot + "Live Solana txs" + count from `useSolanaTxCount`
- Quiet description top-right
- River canvas at **520px height**, full-bleed
- Bottom: single quiet uppercase line "Solana mainnet · ~2,400 tx/sec · 500ms settlement · $0.0008 median fee"
- Top + bottom hairline gradient dividers

### Phone mockup (mouse-reactive)
- 300×612 with 54px corner radius, Dynamic Island, side buttons
- Mouse tilt ±12°/±8°, multi-layer parallax, sheen reacts to cursor X
- Floating purple + mint orbs, mint underglow
- Touch devices: tilt off, gentle 6s float animation
- Real Fluid logo SVG twice (white at top of screen, dark on mint card)
- Real Solana logomark (`SolanaMark markOnly`) on bottom of card next to "Solana" text
- Three transaction rows: From Maya +$48 / Coffee The Edge -$5.50 / Payday +$2,100

### River particles (REAL signatures only — no synthetic)
- `useSolanaRiver.ts` polls `getSignaturesForAddress` against 4 hot programs every 800ms (Jupiter v6, Raydium AMM v4, Pump.fun, Phoenix)
- Each particle: real signature, real slot, mint or purple colour (~70/30)
- NO synthetic filler particles, NO fake AUD amounts (was added then user called it out — removed entirely)
- Tooltip on hover/tap: "Solana mainnet tx · open on Solscan ↗" + sig snippet + slot number
- Click/tap → opens `https://solscan.io/tx/{signature}` in new tab
- Mobile: 4 lanes, 50 max particles, 50ms spawn, DPR cap 1.5
- Desktop: 6 lanes, 110 max particles, 25ms spawn, DPR cap 2

### Counter (ticks up smoothly)
- `useSolanaTxCount.ts` polls `getTransactionCount("confirmed")` every 5s
- Between polls, `requestAnimationFrame` interpolates at `ESTIMATED_TPS = 2400` so digit row never stalls
- Only re-anchors if RPC value > current projection (avoids snap-back)

### Solana branding (using user's exact official SVG)
- `SolanaMark.tsx` uses verbatim SVG from solana.com/branding (provided by user)
- Two render modes:
  - Default: full lockup (logomark + SOLANA wordmark) — used in footer "Powered by"
  - `markOnly={true}`: just the three-stripe logomark — used in phone card
- Wordmark uses `currentColor`, logomark stripes use official gradient (`#9945FF → #8752F3 → #5497D5 → #43B4CA → #28E0B9 → #19FB9B`)

### Header
- Fluid logo at `height={44}` (was 26 → 34 → 44, two +30% bumps)
- Sticky scroll-blur, lazy LiveTPS pill
- "Join waitlist" white pill on the right

---

## File structure

```
fluid-landing/
├── package.json (Next 14.2.18, React 18.3.1, Tailwind 3.4.15, Framer 11.11.17, TS 5, @solana/web3.js, bs58)
├── vercel.json (explicit framework=nextjs, buildCommand, outputDirectory)
├── tailwind.config.ts (mint family + surfaces tokens)
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.example (Helius URL pre-filled)
├── .gitignore
├── README.md
├── DEPLOY.md
├── STATE.md  ← this file
├── public/
│   ├── og-image.png, favicon.ico, favicon-32.png, apple-touch-icon.png, icon-512.png
│   ├── manifest.json, robots.txt, sitemap.xml
└── src/
    ├── app/
    │   ├── layout.tsx (Metadata + Viewport, "Built in Queensland" desc)
    │   ├── page.tsx (Header → Hero → LiveRiver → TryItLive → HowItWorks → FeeComparison → Card → Programmable → Tax → Compliance → Testimonials → FAQ → FinalCTA → Footer)
    │   ├── globals.css (includes .hero-headline--accent class for italic Anywhere)
    │   └── api/demo-payment/route.ts (signs devnet self-transfer, maxDuration=30, balance precheck, custom 20s confirm poll)
    ├── lib/
    │   ├── useSolanaTPS.ts (mainnet TPS, Helius default)
    │   ├── useSolanaSlot.ts (mainnet slot, Helius default)
    │   ├── useSolanaRiver.ts (REAL sigs only, no synth, mint/purple colour variants)
    │   ├── useSolanaTxCount.ts (cumulative tx count + smooth interpolation at 2400 TPS)
    │   └── server/wallet.ts (server-only keypair loader)
    └── components/
        ├── Logo.tsx (color-prop SVG component, full Fluid logo)
        ├── SolanaMark.tsx (uses user's official SVG verbatim, full lockup or markOnly)
        ├── Header.tsx (sticky scroll-blur, logo h=44, lazy LiveTPS)
        ├── PhoneMockup.tsx (mouse-reactive 3D tilt phone with full Fluid app UI)
        ├── FadeIn.tsx, ScrollProgress.tsx, CountUp.tsx, MagneticButton.tsx, TiltCard.tsx
        ├── LiveTPS.tsx (header pill)
        ├── LiveSlot.tsx ("Live · slot N" ticker)
        ├── DemoPayment.tsx (clickable devnet payment, phone-style card)
        ├── SolanaRiver.tsx (Canvas2D, mint+purple particles, mobile detection, click-to-Solscan)
        └── sections/
            ├── Hero.tsx (clean text-led left + PhoneMockup right)
            ├── LiveRiver.tsx (subtle counter badge + 520px river hero)
            ├── TryItLive.tsx (lazy-loads DemoPayment + LiveSlot)
            ├── HowItWorks.tsx, FeeComparison.tsx, Card.tsx, Programmable.tsx, Tax.tsx
            ├── Compliance.tsx, Testimonials.tsx, FAQ.tsx
            ├── FinalCTA.tsx (Formspree, Queensland copy, no fake "500 beta users")
            └── Footer.tsx (Queensland, full SolanaMark lockup, no duplicate text)
```

---

## Build metrics

- First Load JS: **225 KB** (was 145 KB before phone mockup; phone is lazy-loaded so it's not on critical path)
- Routes: `/` static, `/api/demo-payment` dynamic
- TypeScript: clean, zero errors
- Fresh-install verified: extract → npm install → tsc --noEmit → next build → all pass

---

## Environment variables (Vercel)

| Name | Required? | Notes |
|---|---|---|
| `SOLANA_DEMO_SECRET_KEY` | YES for demo button | Devnet keypair JSON array `[12,45,...]` (64 bytes) or base58 string |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional | Waitlist form ID; if unset form fake-succeeds |
| `NEXT_PUBLIC_SOLANA_RPC` | Optional | Helius URL baked in as default in 3 lib files |
| `SOLANA_DEVNET_RPC` | Optional | Default `https://api.devnet.solana.com` |

**Helius key currently baked in (rotate post-launch):**
`https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6`

Hardcoded fallback in: `useSolanaRiver.ts`, `useSolanaTPS.ts`, `useSolanaSlot.ts`, `useSolanaTxCount.ts`.

---

## Known pending issues

1. **Devnet payment button** — needs `SOLANA_DEMO_SECRET_KEY` set in Vercel + funded devnet wallet (~0.01 SOL). User indicated it wasn't working pre-V14; we improved error handling in V11 with maxDuration=30, balance precheck, custom poll loop. Test the live one once env is set.
2. **`NEXT_PUBLIC_FORMSPREE_ID`** — unknown if user has set this; waitlist form will fake-succeed otherwise.
3. **Counter speed tuning** — `ESTIMATED_TPS = 2400` in `useSolanaTxCount.ts`. Bump to 2800 for faster feel, 2000 for calmer.

---

## What changed across V8 → V14 (chronological)

- **V8:** River-as-hero (full bleed under hero text). User said too busy/cheap.
- **V9:** Stripped river out of hero, made dedicated LiveRiver section underneath with mint+purple variety + live counter.
- **V10:** Cleaned up + shipped. User said hero now bland; asked for phone mockup; called out synthetic AUD amounts.
- **V11:** Removed synthetic generator + fake AUD entirely; built mouse-reactive PhoneMockup; polished LiveRiver.
- **V12:** Header logo +30% (34→44); built SolanaMark with hand-rolled parallelograms.
- **V13:** Counter shrunk to subtle pill; river bumped to 520px. PhoneMockup got real Fluid logo SVG inline + (still hand-rolled) Solana mark.
- **V14:** User provided official Solana SVG verbatim. Replaced SolanaMark to use exact official SVG with proper gradient stops. Footer no longer has duplicate "Solana" text since wordmark is now in the SVG.
- **V15:** Particles changed from circles to **horizontally-elongated capsules** (3.6:1 desktop, 4.5:1 mobile) — reads as motion streaks not generic dots. Phone mockup now **animates through 3 screens**: Home → Send → Sent, auto-cycling every ~3.5-4s with crossfade + horizontal slide. Includes animated success ring + checkmark on Sent screen. Mouse tilt preserved.

---

## Critical decisions / non-negotiables

- **NEVER Townsville** anywhere. Always Queensland.
- **NEVER synthetic transactions or fake AUD amounts** in the river. Real signatures only.
- **NEVER fake stats** like "500 beta users" — removed entirely.
- **Solana logo MUST use user's official SVG verbatim** — hand-rolled parallelograms got rejected.
- **Hero must stay clean** — text-led with phone on right, NO river behind text.
- **River must be the hero of LiveRiver section** — counter is a subtle indicator, not the focal point.

---

## Tech gotchas to remember

- Use `./node_modules/.bin/next` not `npx next` — npx may pull Next 16 globally
- React 19-RC + framer-motion conflict — pinned React 18.3.1 + Next 14.2.18
- Inter font npm/CDN download blocked in sandbox — use Poppins from `/usr/share/fonts/truetype/google-fonts/` (Bold, LightItalic, Regular, Medium — NO SemiBold)
- Devnet RPC blocked from sandbox by allowlist — devnet payment API only fully testable on Vercel
- For Vercel: vercel.json with explicit `framework: "nextjs"` makes detection bulletproof
- 401 on Vercel = Deployment Protection — disable in Settings
- 404 = framework not detected, root directory wrong, or build silently failed
- Read full build log to end, not just first lines
- For PIL: `(*tuple := (...), alpha)` walrus inside tuple unpack is INVALID syntax
- `fetch` to non-allowlisted domains will fail with "Host not in allowlist" — for sandbox curl too

---

## Output assets in `/mnt/user-data/outputs/`

| File | Purpose |
|---|---|
| `fluid-landing.zip` | Current V14 landing page bundle |
| `fluid-pfp-mint-500.png` | 500×500 Twitter PFP, mint bg |
| `fluid-pfp-teal-bright-500.png` | Alt PFP variant |
| `fluid-pfp-teal-deep-500.png` | Alt PFP variant |
| `og-image.png` | 1200×630 social preview |
| `fluid-x-mockup.png` | 1800×1200 framed UI mockup |
| `fluid-x-mockup-framed.png` | 2200×1500 with depth + caption |

---

## Figma file (separate artifact)

**APP file:** `https://www.figma.com/design/5wIrvLs8SJJTQ79TRvYZGj`
- Pages: 📐 Foundations (0:1), 🧩 Components (1:2), 📱 Screens (1:3), 🎬 Flows (1:4), 🌐 Landing (175:2), 🎬 Handoff Notes (190:2)
- Design language: Apple Wallet/Cash genre. #000 phone shells, mint #66CD83 mesh-gradient card, white surfaces. Inter Bold, 8pt grid, phone radius 54.

---

## Resume checklist for next session

1. Read this file first
2. Check `/mnt/user-data/outputs/fluid-landing.zip` for the current bundle
3. If user reports a live-site issue, first ask:
   - Is the env var set in Vercel?
   - Is the latest deploy from main branch?
   - Browser DevTools network tab response code?
4. Don't guess at hand-rolled SVGs for branded assets — ask user for official SVG
5. Don't add synthetic data or "filler" — user prefers real-only and will catch it
6. Check `package.json` for current React/Next versions before rewriting components
