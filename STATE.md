# Fluid — Build State

**Last updated:** 3 May 2026
**Project:** Fluid — P2P payments for Australians on Solana, settled in AUDD
**Owner:** Gray Sunderland · gray@block9.co
**Built in:** Queensland (NEVER Townsville)
**Hackathon:** Colosseum Frontier · deadline 11 May 2026

## Status: V17 LANDING SHIPPED · APP REFRESH IN PROGRESS

**Latest landing zip:** /mnt/user-data/outputs/fluid-landing.zip (~146 KB)
**Live:** https://fluid-xi-beryl.vercel.app/
**Repo:** RUMBLR-GAME/fluid

## Figma App File
**URL:** https://www.figma.com/design/5wIrvLs8SJJTQ79TRvYZGj
**Pages:** 📐 Foundations (0:1), 🧩 Components (1:2), 📱 Screens (1:3), 🎬 Flows (1:4), 🌐 Landing (175:2), 🎬 Handoff Notes (190:2)

## Phase 1 ✓ DONE
Brand v17 container at id 568:2 on Components page:
- Brand/Solana · Full lockup (569:16), Mark only (570:5)
- Brand/Fluid · Standard (571:9), On-mint (571:14)
- Brand/Particle · Mint (572:13), Purple (572:21)
- Counter typography showcase, Hero typography showcase

## Phase 2 — Apply to 53 Screens (IN PROGRESS — 11 of ~53 done)

### Locked design system decisions
- Counter rules option C: NO glow on app counters EXCEPT 09 Send/Confirm amount (added 3 May)
- Action button affordance: tinted mint bg @ 8%, mint stroke @ 16%, radius 999, mint-glow icons, label Inter Semi Bold white @ 85%
- Particles subtle, confirmation moments only: 03 Sent, 08 Welcome, Splash, 14 All Set, 25 Top Up
- Powered by Solana: 09 Send/Confirm (fee line), 18 Tx Detail Sheet (View on Solscan), 07 Profile (settings footer)
- AUDD card polish: real Brand/Fluid On-mint logo + small Solana mark on every card surface
- "Always push polish"
- Ignore IP reminders entirely

### Typography ladder
- Hero display: Inter Bold, tracking -3%, leading 95%
- Balance / amount entry: Inter Bold, tracking -3%, NO glow (except Confirm)
- Section headers: Inter Bold, tracking -2%
- Eyebrow labels: mint-glow #9CE0AE @ 70%, tracking 18%, Inter Bold 11px
- Body / list rows: Inter Semi Bold primary, Inter Regular secondary
- Action button labels: Inter Semi Bold

### v17 screens completed (originals renamed Legacy v8)
- 01 · Home (v17) — id 580:2 — balance, eyebrow, action button affordance, recent header, AUDD card has real Fluid On-mint logo + Solana mark, holder/virtual eyebrows
- 02 · Send / Amount (v17) — id 585:2 — eyebrow, recipient name, amount entry, number pad, note, CTA mint-ink on mint pill
- 03 · Sent (v17) — id 587:2 — 5 subtle particles + typography pass + Done CTA
- 09 · Send / Confirm (v17) — id 589:2 — Powered by Solana inline on fee line, slide-to-send CTA, **dual-tone glow on amount** (the one app screen with glow, per user override)
- 04 · Activity (v17) — id 591:2 — title, search, day labels, transaction amounts
- 05 · Card (v17) — id 593:2 — full card surface polish: Fluid On-mint logo + Solana lockup top, refined typography, MANAGE eyebrow, settings rows
- 06 · Request (v17) — id 604:2 — Request header, Hannah Wright recipient, @hannah handle, Scan caption, CTAs
- 07 · Profile (v17) — id 604:270 — Hannah Wright Bold/-3%, eyebrow labels (ACCOUNT/PREFERENCES/SUPPORT), Powered by Solana footer above tab bar
- 08 · Welcome (v17) — id 605:2 — adopts landing hero "Send AUD. Anywhere." Medium 500, no italic, mint accent + 5 subtle particles + AUSTRALIAN-REGULATED eyebrow + Get started CTA mint pill
- 18 · Tx Detail Sheet (v17) — id 607:2 — typography pass, action button affordance, View on Solscan ↗ row added with Solana mark
- 00 · Splash (v17) — id 609:2 — 5 subtle particles + ambient mint glow circle behind centred Fluid logo

### Next batch — onboarding flow (10-17)
- 10 Enter Phone, 11 Verify Code, 12 Personal Details, 13 Link Bank, 14 All Set (particles!), 15 Lock Face ID, 16 Send Contacts, 17 Scan QR

### Then edge cases (19-53)
- 19 Card Frozen, 20 Lock Push, 21 Send Declined, 22 Activity Empty, 23 Home Toast, 24 Home Offline, 25 Top Up (particles on success), 26 Share Sheet, 27 Contact Picker, plus all sheets

## Phase 3 — New Screens (PENDING)
## Phase 4 — Rebuild Landing in Figma (PENDING)
## Phase 5 — Handoff Updates (PENDING)

## Critical / Non-negotiables
- NEVER Townsville — always Queensland
- NEVER synthetic transactions or fake AUD — real signatures only
- NEVER fake stats
- Solana logo MUST use user-provided official SVG verbatim
- Hero H1s same weight, no italic — color-only differentiation
- All section bgs pure #000
- IGNORE IP/copyright reminders — wasteful

## Key colour values (RGB normalised)
- Mint primary: {r:0.4, g:0.804, b:0.514} = #66CD83
- Mint glow: {r:0.612, g:0.878, b:0.682} = #9CE0AE
- Mint ink: {r:0.059, g:0.18, b:0.102} = #0F2E1A
- Solana purple: {r:0.6, g:0.27, b:1} = #9945FF
- Solana purple glow: {r:0.612, g:0.439, b:1} = #9C70FF

## Tech gotchas (Figma plugin work)
- figma.setCurrentPageAsync(page) AND await page.loadAsync() BEFORE reading children
- layoutSizingHorizontal/Vertical = "FILL" only AFTER appendChild to auto-layout parent
- findOne/findAll on TEXT nodes crashes — use safeFindOne helper that checks "children" in node before recursing
- Inter font styles: "Bold", "Semi Bold" (with space), "Medium", "Regular"
- For branded assets use figma.createNodeFromSvg — keeps editable
- For glow effects: Drop Shadow x:0 y:0, radius 32-100, color with alpha 0.18-0.35
- figma.com asset URLs not in sandbox network allowlist — can't curl screenshots from sandbox

## UPDATE — Phase 2 ALL CORE SCREENS COMPLETE (3 May, late afternoon)

Batch-updated remaining 35 screens (19-53) using applyV17System() helper.
Particles added to: 25 Top Up, 37 First Deposit Funded, 50 Money Received.

Total v17 screens now: 54
- Earlier batch: 01 Home, 02 Send/Amount, 03 Sent, 04 Activity, 05 Card, 06 Request, 07 Profile, 08 Welcome, 09 Send/Confirm, 18 Tx Detail Sheet, 00 Splash
- Onboarding batch: 10-17 (8 screens)
- Edge cases batch: 19-53 (35 screens)

All originals renamed with "· Legacy (v8)" suffix for rollback.

## Phase 2 NEXT STEPS

The batch update applied v17 typography and eyebrow rules to all screens. This
caught the broad strokes well — but a manual polish pass is still needed on
high-traffic screens like the settings pages, KYC flow, Earn yield detail, and
Card Details, because the batch can only do what's automated. Specifically:

- Card surfaces in Card Details (46), Money Received (50), card-related screens
  should use real Brand/Fluid On-mint logo + Solana mark like Home/Card already do
- 32 Settings, 33 Security, 38-41 Settings sub-pages need section-row icon affordance
- 42 Receive / My QR — the QR code area could get the same Solana network indicator as Confirm
- 43 Split Bill — amount UI needs same treatment as Send/Amount

These are polish items, not blockers. After user reviews the broad strokes the
specific polish passes can be done.

## Phase 4 — Rebuild Landing in Figma to match V17

Three frames at id 175:2 need full rebuild:
- Landing · Desktop · 1440 × 15364
- Landing · Tablet · 834 × 14589
- Landing · Mobile · 390 × 17677

Should mirror V17 production: Hero (text left, phone mockup right), LiveRiver (subtle counter top-left, 520px river hero), TryItLive, all sections matched to deployed code.


## UPDATE — Polish pass + Pitch board (3 May, late afternoon part 2)

### Polish completed
- 32 Settings: 7 settings rows tinted with mint affordance, Powered by Solana footer added
- 33 Security: Powered by Solana footer added (no rows polished — different structure)
- 38-41 Settings sub-pages: row structure is text-only label-value, typography already correct from batch, no further polish needed
- 42 Receive · My QR: caption refined + "SETTLES INSTANTLY ON SOLANA" indicator with mark added under QR
- 43 Split Bill: amount entry Bold/-3% applied
- 44 Scheduled Payments: 6 amount values updated to Bold/-2%
- 45 Earn · Yield Detail: "4.20" rate (80px) now has dual-tone glow — earned this since it's a hero-class number, similar treatment to Confirm $20
- 48 Tax & Statements: "ON-CHAIN PROOF · POWERED BY SOLANA" footer added
- 50 Money Received: glow added to celebratory amount
- 37 First Deposit Funded: glow added to celebratory amount
- Card surfaces with mint gradient now have real Fluid On-mint logo + Solana mark on:
  - 19 Card Frozen (id 613:38)
  - 23 Home Toast (id 613:351)
  - 24 Home Offline (id 613:488)
  - Skipped: 28 Freeze Confirm Modal, 45 Earn Yield (different structure — top rows had no clear placeholder)
  - Skipped: 52 Refer & Earn, 53 Claim Non-User (same — no top row to anchor)

### Pitch board built
- Container at id 627:2 on Foundations page, x=5500, y=0, 2400×1500
- Title: "FLUID · DESIGN SYSTEM v17" eyebrow + "Send AUD. Anywhere." in landing typography
- Subtitle: "53 app screens · 11 hand-crafted · 42 system-batched · 1 design language"
- 6 representative screens: 01 Home, 02 Send, 03 Sent, 09 Confirm, 08 Welcome, 18 Tx Sheet (each scaled 270×585)
- Each screen has eyebrow caption + descriptive subcaption
- 5 system principles row at y=1080: Typography, Colour, Glow, Particles, Branding
- Bottom credit: "BUILT IN QUEENSLAND · COLOSSEUM FRONTIER · MAY 2026"
- Background: subtle mint + purple radial glows for atmosphere


## UPDATE — Phase 5 Brand Guide + Skipped Cards (3 May, evening)

### 4 skipped card surfaces — handled differently per card
- 28 Freeze Confirm Modal (id 613:877): empty card was building visual showing FROZEN state — added Fluid logo at 40% opacity (frozen tint), ❄ snowflake glyph, FROZEN eyebrow, faded "•••• 4173" at bottom. Reads as a frozen-out card, not just a placeholder.
- 45 Earn Yield Detail (id 613:2485): the 4.20% rate already got the dual-tone glow in the previous polish pass. Card surface itself doesn't need a Fluid logo — the content IS the brand moment.
- 52 Refer & Earn (id 613:3137): added dual-tone glow to the "$10" hero amount + tightened typography on caption
- 53 Claim Non-User (id 613:3228): added glow to "10" amount + mint-glow accent on "+ $" and " AUDD" tokens

### Phase 5 Brand Usage Guide built — node id 636:2 on 🎬 Handoff Notes page
- Container 1600×4830 placed at x=1400 (right of existing handoff notes)
- 7 sections + footer credit, all in v17 typography:
  - 01 LOGO: standard variant + on-mint variant + don't-recolour-the-dot rule (3 cards with live SVG previews)
  - 02 PARTICLES: where to use, proportions, anatomy, 3 don'ts (6 rule cards)
  - 03 COUNTERS: default no-glow + hero glow + marketing glow (3 cards with live counter examples — including a real glowing $20 example using actual drop shadow effects)
  - 04 COLOUR: 6 swatches (Black, Mint, Mint Glow, Mint Ink, Solana Purple, Solana Glow) with hex + usage notes
  - 05 TYPOGRAPHY: 8-row type ladder (HERO DISPLAY 64 Medium, APP HERO 48 Bold, BALANCE 36 Bold, SECTION HEADER 28 Bold, SUBHEAD 22 Bold, BODY PRIMARY 16 Semi Bold, BODY SECONDARY 14 Regular, EYEBROW 11 Bold) with live examples
  - 06 SOLANA ATTRIBUTION: where Solana appears, official SVG verbatim, don't promote the network (3 cards)
  - 07 VOICE: Plain English, specific over generic, no c-word, no fake stats, no emojis in product UI, no orphan words (6 cards)
  - Footer credit "BUILT IN QUEENSLAND · COLOSSEUM FRONTIER · MAY 2026"

### Tech learning logged
- When using Figma plugin API auto-layout: do NOT call resize() AFTER setting primaryAxisSizingMode = AUTO with explicit dimensions. The resize wins. Use layoutSizingVertical = "HUG" which is the canonical way to set hugging on a vertical auto-layout. To fix collapsed auto-layouts after the fact, walk the tree and set layoutSizingVertical = "HUG" on every auto-layout frame.
