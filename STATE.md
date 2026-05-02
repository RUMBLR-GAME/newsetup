# Fluid Landing — Build State

**Last updated:** 2 May 2026
**Project:** Fluid — P2P payments for Australians on Solana, settled in AUDD
**Owner:** Gray Sunderland · gray@block9.co
**Built in:** Queensland (NEVER Townsville — fully removed everywhere)
**Hackathon:** Colosseum Frontier · deadline 11 May 2026
**Solana Foundation org key:** `organization::1179535733538188337`

---

## Status: V17 SHIPPED

Latest zip: `/mnt/user-data/outputs/fluid-landing.zip` (~146 KB, fresh-install verified)
Live: `https://fluid-xi-beryl.vercel.app/`
Repo: `RUMBLR-GAME/fluid` on GitHub

User signed off V16 with: "looking and feeling really strong" + "Great work today."

---

## What V17 ships

### Hero typography rebuild
- BOTH "Send AUD." and "Anywhere." now use the same medium weight (500), no italic
- Only difference: white vs `text-mint-mid` colour
- `font-weight: 500`, `letter-spacing: -0.03em`, `line-height: 0.95`, `font-size: clamp(56px, 11vw, 128px)`
- Removed `.hero-headline--accent` class entirely (was previously italic + weight 300)
- Subhead uses `<Balance>` component to prevent orphans

### Orphan prevention (site-wide)
- Global CSS rule in `globals.css`: `h1, h2, h3, h4, h5, h6 { text-wrap: balance; }` and `p { text-wrap: pretty; }`
- Modern browsers handle this automatically on every breakpoint
- For older browser fallback or specific tail control, `<Balance>` component in `src/components/Balance.tsx` joins the last N words with `\u00A0`
- Applied explicitly in Hero subhead (the at-risk paragraph)
- Older browsers degrade to normal wrapping (graceful)

### Demo wallet — proper setup path
- Generated a fresh devnet keypair, ready to use:
  - **PUBLIC ADDRESS** (fund this on faucet): `9PuwYvmCWCceEh1m8w1FzXax5UaJBM1uMBab7GinkQ47`
  - **SOLANA_DEMO_SECRET_KEY** (paste into Vercel — full array in setup steps below)
- Created `scripts/generate-demo-wallet.js` so user can regenerate at will: `node scripts/generate-demo-wallet.js`
- Improved API error from "Demo wallet is not configured. Set SOLANA_DEMO_SECRET_KEY env var." to friendlier "Demo isn't ready yet — wallet not configured." with details pointing to the script
- Returns 503 status (correct for "service not configured")

### Solid black backgrounds (V16 carried forward)
- `surface.raised` token = `#000000` (was `#0E0E0E`)
- LiveRiver, TryItLive — radial-gradient backgrounds no longer have `#050505` fallback
- Removed visible hairline section dividers (top/bottom of LiveRiver, border-y on Programmable, border-t on Footer)
- Sections now separate by spacing/padding only, not by tone shifts

### Footer — real working pages
Old footer had 7 dead `href="#"` links. Now:
- Product nav: How it works (#how), Try it live (#try-it), Card (#card), FAQ (#faq) — all real anchors
- Company nav: Contact (mailto:hello@fluid.au), Twitter / X, Security (`/security`), Compliance (#compliance)
- Bottom legal row: Privacy (`/privacy`), Terms (`/terms`), Security (`/security`) — all real Next.js routes
- Removed: About, Careers, Cookies (replaced Cookies with Security in legal row)

### New legal pages (`/privacy`, `/terms`, `/security`)
- Built `LegalPageLayout` shared component (Header + ScrollProgress + content area + Footer)
- Each page has proper `Metadata` export with `title`, `description`, canonical URL
- Original copy specific to Fluid's pre-launch state:
  - **Privacy:** waitlist email only, no third-party trackers, on-chain transparency note, deletion rights
  - **Terms:** pre-AFSL informational disclaimer, devnet demo explanation, Australian governing law
  - **Security:** AUDC custody chain, non-custodial Fluid wallet, on-chain auditability, phishing warning, security@fluid.au reporting

### SEO polish
- Sitemap.xml updated to include all 4 routes with priority + lastmod
- Each new page sets `alternates: { canonical: "https://fluid.au/<route>" }`
- Each new page has unique `description` for Google
- Per-page metadata title chains use template "%s · Fluid" set in root layout

---

## File structure

```
fluid-landing/
├── package.json (Next 14.2.18, React 18.3.1, Tailwind 3.4.15, Framer 11.11.17, TS 5)
├── vercel.json (explicit framework=nextjs)
├── tailwind.config.ts (surface.raised = #000000, mint family)
├── tsconfig.json
├── next.config.js
├── postcss.config.js
├── .env.example (Helius URL pre-filled)
├── .gitignore
├── README.md
├── DEPLOY.md
├── STATE.md ← this file
├── scripts/
│   └── generate-demo-wallet.js (one-shot devnet keypair generator)
├── public/
│   ├── og-image.png, favicon.ico, favicon-32.png, apple-touch-icon.png, icon-512.png
│   ├── manifest.json, robots.txt, sitemap.xml (4 routes)
└── src/
    ├── app/
    │   ├── layout.tsx (Metadata + Viewport)
    │   ├── page.tsx (Header → Hero → LiveRiver → TryItLive → … → Footer)
    │   ├── globals.css (text-wrap balance/pretty, hero-headline weight 500, mint glow)
    │   ├── api/demo-payment/route.ts (devnet payment, maxDuration=30, balance precheck, 20s confirm poll, friendly errors)
    │   ├── privacy/page.tsx (NEW V17)
    │   ├── terms/page.tsx (NEW V17)
    │   └── security/page.tsx (NEW V17)
    ├── lib/
    │   ├── useSolanaTPS.ts, useSolanaSlot.ts (mainnet stats with Helius default)
    │   ├── useSolanaRiver.ts (REAL signatures only, no synth, mint+purple)
    │   ├── useSolanaTxCount.ts (cumulative tx count + smooth interpolation @ 2400 TPS)
    │   └── server/wallet.ts (loadDemoKeypair from env)
    └── components/
        ├── Logo.tsx (Fluid logo SVG, color-prop)
        ├── SolanaMark.tsx (uses user's official SVG verbatim, full lockup or markOnly)
        ├── Balance.tsx (NEW V17: orphan prevention text wrapper)
        ├── LegalPageLayout.tsx (NEW V17: shared layout for /privacy, /terms, /security)
        ├── Header.tsx (sticky scroll-blur, logo h=44)
        ├── PhoneMockup.tsx (3D mouse-tilt, 3-screen flow: Home → Send → Sent)
        ├── FadeIn.tsx, ScrollProgress.tsx, CountUp.tsx, MagneticButton.tsx, TiltCard.tsx
        ├── LiveTPS.tsx, LiveSlot.tsx
        ├── DemoPayment.tsx (devnet button + result UI)
        ├── SolanaRiver.tsx (Canvas2D capsule particles, mint+purple, click to Solscan)
        └── sections/
            ├── Hero.tsx (split: text left + PhoneMockup right; both H1s medium weight no italic)
            ├── LiveRiver.tsx (subtle counter pill + 520px river hero)
            ├── TryItLive.tsx (lazy DemoPayment + LiveSlot)
            ├── HowItWorks.tsx, FeeComparison.tsx, Card.tsx, Programmable.tsx, Tax.tsx
            ├── Compliance.tsx, Testimonials.tsx, FAQ.tsx
            ├── FinalCTA.tsx (Formspree, Queensland)
            └── Footer.tsx (real working links + Next.js Link to legal pages)
```

---

## Build metrics

| Route | Size | First Load JS |
|---|---|---|
| `/` | 95.3 kB | 234 kB |
| `/privacy` | 2.1 kB | 141 kB |
| `/terms` | 2.1 kB | 141 kB |
| `/security` | 2.1 kB | 141 kB |
| `/api/demo-payment` | 0 B | 0 B (dynamic) |

- TypeScript: clean, zero errors
- Fresh-install verified: extract → npm install → tsc --noEmit → next build → all pass

---

## Environment variables (Vercel)

| Name | Required? | Notes |
|---|---|---|
| `SOLANA_DEMO_SECRET_KEY` | YES for demo button | Devnet keypair JSON array (64 bytes) or base58 string |
| `NEXT_PUBLIC_FORMSPREE_ID` | Optional | Waitlist form ID |
| `NEXT_PUBLIC_SOLANA_RPC` | Optional | Helius URL baked in as default |
| `SOLANA_DEVNET_RPC` | Optional | Default `https://api.devnet.solana.com` |

**Helius key currently baked in (rotate post-launch):**
`https://mainnet.helius-rpc.com/?api-key=fd23d5c6-3699-4e3e-8249-9bd774d3bdf6`

Hardcoded fallback in: `useSolanaRiver.ts`, `useSolanaTPS.ts`, `useSolanaSlot.ts`, `useSolanaTxCount.ts`.

---

## Demo wallet setup — DO THIS NOW

To make the "Try it live" button actually work, the user must complete this once:

### Pre-generated keypair (use this OR regenerate)

**Public address** (this gets funded with devnet SOL):
```
9PuwYvmCWCceEh1m8w1FzXax5UaJBM1uMBab7GinkQ47
```

**Secret key value** (paste this entire array into Vercel as `SOLANA_DEMO_SECRET_KEY`):
```
[23,83,91,147,163,61,203,101,133,222,130,148,136,144,240,97,63,188,205,118,92,72,204,91,229,163,192,32,147,43,31,254,124,188,34,28,225,200,221,254,148,5,221,4,108,183,20,43,113,121,42,222,73,211,122,25,27,255,119,136,121,152,86,216]
```

### Steps
1. Go to https://faucet.solana.com — paste the public address above, get 1-2 SOL
2. Vercel → Project → Settings → Environment Variables → Add:
   - Key: `SOLANA_DEMO_SECRET_KEY`
   - Value: the array above (including brackets)
   - Apply to: Production + Preview + Development
3. Vercel → Deployments → ⋯ → Redeploy
4. Test the "Try it live" button on the deployed site

### To regenerate at any time
```bash
node scripts/generate-demo-wallet.js
```
Outputs a fresh keypair in copy-pasteable form.

---

## Pages (4 routes total)

| Route | Purpose |
|---|---|
| `/` | Landing page — hero + LiveRiver + features + CTA + footer |
| `/privacy` | Privacy policy — waitlist data only, no trackers |
| `/terms` | Terms of use — pre-AFSL disclaimer, devnet demo info, Aus law |
| `/security` | Security overview — AUDC custody, non-custodial wallet, audits |

All legal pages use `LegalPageLayout` shared component for consistency.

---

## V8 → V17 chronology

- **V8:** River-as-hero. User said too busy/cheap.
- **V9:** Stripped river out of hero, dedicated LiveRiver section + counter.
- **V10:** Cleaned up. User said hero now bland; called out synthetic data.
- **V11:** Removed synthetic generator + fake AUD; built mouse-reactive PhoneMockup; polished LiveRiver.
- **V12:** Header logo +30%; SolanaMark with hand-rolled parallelograms.
- **V13:** Counter shrunk to subtle pill; river bumped to 520px.
- **V14:** User provided official Solana SVG verbatim. Replaced SolanaMark.
- **V15:** Particles changed circles → elongated capsules. Phone mockup animates Home → Send → Sent flow.
- **V16:** Unified all backgrounds to pure `#000`. Removed visible section seam dividers.
- **V17:** Hero H1s rebuilt to single weight (medium 500), no italic. Site-wide orphan prevention via `text-wrap: balance/pretty` + `Balance` component. Footer wired to real working links + 3 new legal pages (`/privacy`, `/terms`, `/security`). Demo wallet setup script + pre-generated keypair. SEO sitemap + per-page metadata.

---

## Critical decisions / non-negotiables

- **NEVER Townsville** anywhere — always Queensland.
- **NEVER synthetic transactions or fake AUD amounts** — real signatures only.
- **NEVER fake stats** like "500 beta users."
- **Solana logo MUST use user's official SVG verbatim** — hand-rolled rejected.
- **Hero H1s same weight, no italic** — colour-only differentiation.
- **All section backgrounds pure `#000`** — no banding, no seams.
- **No orphan/widow words** — `text-wrap: balance` on headings, `pretty` on body, explicit `<Balance>` for at-risk text.

---

## Tech gotchas

- Use `./node_modules/.bin/next` not `npx next` (npx may pull Next 16 globally)
- React 19-RC + framer-motion conflict — pinned React 18.3.1 + Next 14.2.18
- Inter font CDN download blocked in sandbox — use Poppins from `/usr/share/fonts/truetype/google-fonts/` for image generation
- Devnet RPC blocked from sandbox by allowlist — devnet payment API only fully testable on Vercel
- vercel.json with explicit `framework: "nextjs"` makes detection bulletproof
- 401 on Vercel = Deployment Protection — disable in Settings
- 404 on Vercel = framework not detected, root directory wrong, or build silently failed
- `text-wrap: balance` requires Chrome 114+, Edge 114+, Safari 17.4+, Firefox 121+. Older browsers fall back to normal wrap (graceful)
- Next.js `<Link>` for internal routes (client-side nav). Plain `<a href>` for hash anchors and external links.

---

## Output assets in `/mnt/user-data/outputs/`

| File | Purpose |
|---|---|
| `fluid-landing.zip` | Current V17 landing page bundle |
| `STATE.md` | This file (also lives inside the zip at project root) |
| `fluid-pfp-mint-500.png` | Twitter PFP, mint bg |
| `fluid-pfp-teal-bright-500.png` | Alt PFP variant |
| `fluid-pfp-teal-deep-500.png` | Alt PFP variant |
| `og-image.png` | 1200×630 social preview |
| `fluid-x-mockup.png` | 1800×1200 framed UI mockup |
| `fluid-x-mockup-framed.png` | 2200×1500 with depth + caption |

---

## Figma file (separate artifact)

**APP file:** `https://www.figma.com/design/5wIrvLs8SJJTQ79TRvYZGj`
- Pages: 📐 Foundations, 🧩 Components, 📱 Screens, 🎬 Flows, 🌐 Landing, 🎬 Handoff Notes

---

## Resume checklist for next session

1. Read this file first
2. Check `/mnt/user-data/outputs/fluid-landing.zip` for current bundle
3. Confirm with user whether `SOLANA_DEMO_SECRET_KEY` got set + wallet funded — if "Try it live" still failing, that's the cause
4. If user reports a live-site issue:
   - Is the env var set in Vercel?
   - Has Vercel redeployed since the env var was set?
   - Browser DevTools network tab response code?
5. Don't guess at hand-rolled SVGs for branded assets — ask user for official SVG
6. Don't add synthetic data or "filler" — user catches it
7. Check `package.json` for current React/Next versions before rewriting components
8. New copy/headings: `text-wrap: balance` handles orphans on every breakpoint automatically — no need to manually wrap

## Things still pending / nice-to-haves

- Test live: confirm `Try it live` button works after demo wallet env var is set + wallet funded
- Test live: confirm waitlist Formspree form is configured (ID env var) or remove form
- Optional: add Open Graph image per legal page (currently they all share root og-image.png)
- Optional: add `<JsonLd>` Organization + WebSite structured data on root page for richer Google results
- Optional: add `/api/og` dynamic OG image generator if needed
- Future: real product Terms/Privacy when app launches (current ones are pre-launch only)
