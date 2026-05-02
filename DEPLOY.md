# Deploy Guide — fluid-landing

Quick-start steps to get this on Vercel. ~5 minutes total.

## 1. Push to GitHub

**Critical:** when you create the repo, make sure `package.json` ends up at the **top level** of the repo (not nested in a subfolder). Vercel needs to find `package.json` at the repo root.

```bash
# Inside the extracted fluid-landing folder
cd fluid-landing
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/YOUR_REPO_NAME.git
git push -u origin main
```

After pushing, open your repo on github.com. You should see `package.json`, `next.config.js`, `tailwind.config.ts`, `vercel.json`, `src/`, `public/`, etc. directly at the top — NOT inside a `fluid-landing/` folder.

If you accidentally pushed it nested (e.g. you ran `git init` from one level higher), you have two options:
- (a) Re-clone, copy the *contents* (not the folder), commit again
- (b) In Vercel project settings, set **Root Directory** to `fluid-landing`

## 2. Deploy to Vercel

1. Go to vercel.com → **Add New → Project**
2. Import your GitHub repo
3. Vercel should auto-detect everything (because of `vercel.json`):
   - Framework: **Next.js**
   - Build Command: `next build`
   - Output Directory: `.next`
   - Install Command: `npm install`
4. Click **Deploy**

If Vercel asks about Root Directory — leave it blank unless your `package.json` is in a subfolder (see step 1).

## 3. Set environment variables

After the first deploy, go to **Project → Settings → Environment Variables** and add:

| Name | Value | Required? |
|---|---|---|
| `SOLANA_DEMO_SECRET_KEY` | Your devnet keypair JSON array (see below) | Required for demo button |
| `NEXT_PUBLIC_FORMSPREE_ID` | Your Formspree form ID | Optional — waitlist signups |
| `NEXT_PUBLIC_SOLANA_RPC` | (Helius URL is already baked in as default) | Optional |

After adding env vars, trigger a **Redeploy** from the Deployments tab so they take effect.

### Generating a devnet keypair

```bash
solana-keygen new -o demo-wallet.json --no-bip39-passphrase
solana airdrop 1 --keypair demo-wallet.json --url devnet
cat demo-wallet.json   # paste this entire array as SOLANA_DEMO_SECRET_KEY
```

Don't have Solana CLI? Install: `sh -c "$(curl -sSfL https://release.solana.com/stable/install)"`

## 4. Disable deployment protection (if needed)

By default, some Vercel team plans gate deployments with auth. To make the site public:

1. **Project → Settings → Deployment Protection**
2. Set **Vercel Authentication** to **Disabled** (or "Only Preview Deployments")
3. Save

## 5. Custom domain

1. **Project → Settings → Domains**
2. Add your domain (e.g. `fluid.au`)
3. Add the DNS records Vercel provides at your registrar
4. Wait 5-30 min for DNS + SSL provisioning

---

## Troubleshooting

**404 on the deployed URL:**
- Check the build log in Vercel → Deployments → latest → Build Logs. Scroll to the **end** of the log. Look for `Build Completed` and `Deployment completed`. If those are missing, the build failed silently.
- Confirm Framework Preset is **Next.js** in Settings → General
- Confirm `package.json` is at the repo root on GitHub

**401 (Unauthorized):**
- That's deployment protection — see step 4 above

**Demo payment button shows error:**
- `SOLANA_DEMO_SECRET_KEY` env var isn't set in Vercel — see step 3
- After setting env vars, you must **redeploy** for them to apply

**River is grey / no live data:**
- Helius key is baked in as default, but if you want to use your own, set `NEXT_PUBLIC_SOLANA_RPC` env var. Free Helius accounts at helius.dev — 100k req/day.

---

## Verifying it built correctly

Locally before pushing:
```bash
npm install
npm run build
```

You should see:
```
Route (app)                              Size     First Load JS
┌ ○ /                                    61.9 kB         149 kB
├ ○ /_not-found                          873 B          88.4 kB
└ ƒ /api/demo-payment                    0 B                0 B
```

The `/` route as `Static` and `/api/demo-payment` as `Dynamic` — that's correct.
