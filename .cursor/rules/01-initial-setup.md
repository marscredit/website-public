# Mars Credit Website v1 — Technical & Content Spec

> **Goal**: Ship a stunning, high‑performance, dark‑themed website for **Mars Credit** (unofficial currency of Mars) with a single landing page and two subpages (**Story**, **Updates**). Built with **Next.js 15 (App Router)**, **TypeScript**, **Tailwind CSS**, **shadcn/ui**, and **Framer Motion**. Deployed to **Vercel (Hobby)**. Includes animated visuals, sexy gradient cards, and resilient on‑chain + price data widgets.

---

## 1) High‑Level Requirements

* **Pages**

  * `/` — **Landing** (hero animation, value prop, live network stats, mining quickstart, feature cards, ecosystem links, CTA)
  * `/story` — **Lore / Vision** (narrative, timeline, design art)
  * `/updates` — **Changelog/Blog** (MDX based; auto OG images)
* **Theme**: Dark, Mars‑inspired (deep reds, ember oranges, space blacks). Accessible contrast.
* **Animations**: Rich but performant (Framer Motion page transitions, parallax “orbit” backgrounds, card hover 3D tilt, counters, spark trails).
* **Data**: Price widget with **fallback providers** (GeckoTerminal → CoinGecko On‑Chain → placeholder) and a **Network status** widget (RPC block number / TPS estimate).
* **DX**: TypeScript everywhere, ESLint, Prettier, Husky pre-commit, simple CI.
* **Hosting**: Vercel Hobby (open‑source, non‑commercial), Edge runtime when possible.

---

## 2) Tech Stack & Libraries

* **Framework**: Next.js 15 (App Router, RSC) with TypeScript.
* **Styling**: Tailwind CSS (v4 if available; otherwise v3). Dark mode via `class` strategy and `next-themes`.
* **UI Kit**: **shadcn/ui** (Radix primitives) — buttons, cards, dialogs, sheet, dropdown, toasts.
* **Icons**: `lucide-react`.
* **Animations**: `framer-motion` (page transitions, staggered reveals), `motion` utilities.
* **Charts (optional)**: `recharts` for simple sparkline/area charts (price/history).
* **Content**: MDX for `/updates` (Contentlayer or `next-mdx-remote`), auto‑generated OG images with `next/og`.
* **Analytics (optional)**: Plausible (no cookies) — can toggle off.
* **Lint/Format**: ESLint, Prettier; `@typescript-eslint`.

> **Design note**: Keep bundle lean. Prefer RSC/SSR for data fetching. Cache aggressively. Avoid heavy 3D; if needed, use CSS/Canvas starfield instead of three.js for v1.

---

## 3) Repository Layout

```
apps/web (single app repo or monorepo-ready)
├─ app/
│  ├─ (site)/
│  │  ├─ page.tsx                # Landing
│  │  ├─ story/page.tsx          # Story page
│  │  ├─ updates/page.tsx        # Updates index
│  │  ├─ updates/[slug]/page.tsx # MDX post route
│  │  ├─ api/
│  │  │  ├─ price/route.ts       # Price aggregator (Edge)
│  │  │  └─ network/route.ts     # Block height + peers, etc.
│  ├─ layout.tsx                 # Root layout, font, theme provider
│  ├─ og-image.tsx               # Default OG generator
│  └─ globals.css
├─ components/
│  ├─ ui/                        # shadcn components
│  ├─ common/                    # Site wrappers
│  ├─ hero/
│  ├─ pricing/
│  ├─ network/
│  ├─ cards/
│  └─ animations/
├─ content/updates/              # MDX posts
├─ lib/
│  ├─ price.ts                   # Price fetch + fallback logic
│  ├─ rpc.ts                     # JSON-RPC helpers
│  ├─ format.ts                  # number/date helpers
│  ├─ config.ts                  # site + network config
│  └─ mdx.ts                     # MDX loader/config
├─ public/
│  ├─ brand/                     # logos, favicon, social images
│  └─ media/                      
├─ styles/
│  └─ tokens.css                 # CSS variables for theme
├─ .env.example
└─ package.json
```

---

## 4) Environment & Config

**`.env.example`**

```
# Pricing providers
NEXT_PUBLIC_GECKOTERMINAL_API=https://api.geckoterminal.com/api/v2
NEXT_PUBLIC_COINGECKO_API=https://api.coingecko.com/api/v3
COINGECKO_API_KEY= # optional (paid/demo), leave blank for public

# Chain RPC(s) (public endpoints or our own)
MARS_RPC_PRIMARY=https://rpc.marscredit.org # placeholder
MARS_RPC_FALLBACK=https://rpc2.marscredit.org # placeholder

# Network metadata
MARS_CHAIN_ID=12345
MARS_CHAIN_NAME="Mars Credit"
MARS_SYMBOL=MARS
MARS_DECIMALS=18
MARS_EXPLORER_URL=https://explorer.marscredit.org

# Analytics (optional)
NEXT_PUBLIC_PLAUSIBLE_DOMAIN=marscredit.org
```

**`lib/config.ts`** (typed config, importable by server/client)

```ts
export const site = {
  name: "Mars Credit",
  url: "https://marscredit.org",
  twitter: "marscredit",
  description: "Mineable, EVM-compatible Layer‑1 tuned for the Red Planet.",
} as const;

export const network = {
  chainId: Number(process.env.MARS_CHAIN_ID ?? 0),
  name: process.env.MARS_CHAIN_NAME ?? "Mars Credit",
  symbol: process.env.MARS_SYMBOL ?? "MARS",
  decimals: Number(process.env.MARS_DECIMALS ?? 18),
  rpc: [
    process.env.MARS_RPC_PRIMARY!,
    process.env.MARS_RPC_FALLBACK!,
  ].filter(Boolean),
  explorer: process.env.MARS_EXPLORER_URL ?? "",
} as const;
```

---

## 5) Design System (Dark, Mars‑themed)

**Color tokens** (CSS variables in `styles/tokens.css`)

```css
:root {
  /* space blacks */
  --bg: #0b0b0e;            /* page */
  --panel: #121218;         /* surfaces */
  --muted: #1a1a22;         
  /* embers & mars reds */
  --mars-950: #1a0404;
  --mars-900: #2a0909;
  --mars-800: #3b0e0e;
  --mars-700: #611616;
  --mars-600: #8b1d1d;
  --mars-500: #bb2d1b;      /* primary */
  --mars-400: #ff512f;      /* gradient start */
  --mars-300: #ff6a3d;
  --mars-200: #ff8a4d;      /* gradient mid */
  --mars-100: #ffd2a1;      /* accents */
  /* text */
  --text-hi: #ffffff;
  --text-med: #c9c9d1;
  --text-lo: #9a9aa3;
  --success: #2ecc71;
  --warning: #f1c40f;
  --danger: #e74c3c;
}
```

**Gradients** (for “sexy cards”)

```css
/* Orbit glow */
.bg-orbit {
  background: radial-gradient(120% 120% at 10% 10%, rgba(255,81,47,.25), transparent 60%),
              radial-gradient(120% 120% at 90% 90%, rgba(255,138,77,.2), transparent 55%),
              linear-gradient(180deg, #121218 0%, #0b0b0e 100%);
}
/* Mars flare */
.bg-mars {
  background: conic-gradient(from 220deg at 50% 50%, #ff512f, #ff8a4d, #bb2d1b, #2a0909 75%, #121218 100%);
}
```

**Typography**

* Headings: *Sora* or *Aldrich* (techy, spacey)
* Body: *Inter* or *Geist*
* Tight tracking for display, relaxed for body; use `text-balance` where supported.

**Components** (shadcn/ui as base + custom skins)

* Card variants: `CardGlow`, `CardOrbit`, `StatCard`
* CTA Button: `Button` with orbit glow shadow, gradient background
* Nav: sticky, semi‑transparent blur, subtle bottom border glow
* Badge: gradient pill for statuses (Mainnet / Testnet / Open Source)

**Motion Patterns**

* Page load: fade + upward translate; stagger sections
* Card hover: scale 1.02 + tilt (perspective + rotate) + ember shadow
* Background: subtle parallax stars + slow conic rotation (CPU-friendly)
* Counters: odometer‑style easing for block height/hashrate/price

> Target **Lighthouse**: 95+ PWA/Perf/SEO/Accessibility on desktop; 90+ mobile.

---

## 6) Landing Page Content & Layout (`/`)

### 6.1 Hero

* **Tagline**: “**Mars Credit** — the mineable, EVM‑compatible Layer‑1 for the Red Planet.”
* **Subcopy**: “Forked from Ethereum proof‑of‑work. Fair launch. Transparent economics. Built for relentless explorers.”
* **CTAs**: `Get Started` (scroll to Mining), `Read the Story` (/story)
* **Visual**: Animated Mars orb (CSS conic gradient) with slow rotation and solar flare sweep; subtle starfield.
* **Stats strip** (live, cached):

  * Latest Block, Network Hashrate (if available), Price (USD), 24h Volume (if available), Total Addresses (optional)

### 6.2 What is Mars Credit?

* **Pillars** (3‑4 cards):

  1. *Mineable Layer‑1*: Proof‑of‑Work security.
  2. *EVM Compatible*: Drop‑in tooling & wallets.
  3. *Open Source & Fair*: No premine. Community governed. (Adjust copy to match truth.)
  4. *Built for Builders*: Pragmatic gas model; predictable block times. (Confirm block time.)

### 6.3 Quickstart — Mining & Node

* **Step 1**: Install a wallet (MetaMask) & add network (1‑click button using `wallet_addEthereumChain`).
* **Step 2**: Run a node (Geth‑compatible) **\[parameters below are placeholders; replace with real values]**.
* **Step 3**: Start mining (CPU/GPU) — point your miner to your node or supported pools.

**Add Network (client‑side button)**

```ts
await (window as any).ethereum?.request({
  method: 'wallet_addEthereumChain',
  params: [{
    chainId: `0x${Number(process.env.NEXT_PUBLIC_CHAIN_ID ?? 0).toString(16)}`,
    chainName: 'Mars Credit',
    nativeCurrency: { name: 'Mars Credit', symbol: 'MARS', decimals: 18 },
    rpcUrls: [process.env.NEXT_PUBLIC_MARS_RPC ?? ''],
    blockExplorerUrls: ['https://explorer.marscredit.org'],
  }],
});
```

**Run a Node (example, replace bootnodes/genesis)**

```bash
geth --datadir ~/.marscredit \
  --networkid <CHAIN_ID> \
  --http --http.addr 0.0.0.0 --http.api eth,net,web3 \
  --bootnodes <enode://...> \
  --syncmode snap
```

**Start Mining (example)**

```bash
geth attach --exec "miner.setEtherbase('0xYOURADDRESS'); miner.start(4)"
# or external miner pointed to your node/pool (algorithm: Ethash/ProgPoW — CONFIRM)
```

### 6.4 Feature Cards (sexy gradients)

* *Ember Security*: Robust PoW consensus.
* *EVM Tooling*: Solidity, Hardhat, Foundry work out‑of‑the‑box (links in Ecosystem).
* *Gas You Can Predict*: Simple fee market tuned for miners and builders. (Confirm London basefee/priority tips.)
* *Transparent Economics*: Clear issuance schedule. (Replace with actual numbers.)

### 6.5 Ecosystem & Links

* Explorer, RPC endpoints, GitHub org, Docs, Wallets, Community (Discord/Twitter), Mining pools (if any).

### 6.6 Call to Action

* “Spin up a node. Point a rig. **Help secure Mars.**” Buttons: *Run a Node*, *Start Mining*, *Join Discord*.

---

## 7) Story Page (`/story`)

* **Sections**: Origin (why a PoW fork), The London DNA (what we kept/changed), The Vision (settlement currency for Mars), The Principles (fairness, simplicity, durability), Roadmap (Q1‑Q4 milestones), Acknowledgements.
* **Visuals**: Timeline with glowing nodes; parallax imagery (Mars terrain silhouettes), concept art.
* **Copy seed**:

  > "Mars Credit is a proof‑of‑work, EVM chain that chooses simplicity over spectacle. If you can run a node, you can help secure the network. If you can ship a contract, you can deploy on day one."

---

## 8) Updates Page (`/updates`)

* **Tech**: MDX posts from `content/updates/*.mdx`
* **Features**: Tagging, auto‑generated OG images per post, search/filter.
* **Post frontmatter**

```md
---
slug: v1-launch
title: Mainnet Launch
date: 2025-08-28
summary: We mined the first block and published public RPCs.
tags: [launch, mainnet]
---
```

* **OG Images**: `app/updates/[slug]/opengraph-image.tsx` uses `next/og` drawing Mars gradient background + title.

---

## 9) Data Integrations

### 9.1 Price Aggregator (API Route: `/api/price`)

**Strategy**

1. **GeckoTerminal** pool price for our token — by pool address (best for DEX‑traded assets).
2. **CoinGecko On‑Chain** endpoints (if token isn’t listed globally but has DEX data).
3. **Manual/placeholder** values with clear "Data Unavailable" state.

**Types**

```ts
export type PricePoint = { usd: number; source: 'geckoterminal' | 'coingecko' | 'none'; updatedAt: string };
```

**Edge‑friendly fetch with caching**

```ts
export const runtime = 'edge';
export const revalidate = 30; // ISR for server components that call this

async function fetchGeckoTerminal(tokenPool: string) {
  const url = `${process.env.NEXT_PUBLIC_GECKOTERMINAL_API}/pools/${tokenPool}`;
  const res = await fetch(url, { next: { revalidate: 15 } });
  if (!res.ok) throw new Error('GT bad response');
  const json = await res.json();
  const price = Number(json?.data?.attributes?.base_token_price_usd ?? 0);
  if (!price) throw new Error('GT no price');
  return { usd: price, source: 'geckoterminal' as const };
}

async function fetchCoinGeckoOnchain(params: { chainId: number; address: string }) {
  const base = process.env.NEXT_PUBLIC_COINGECKO_API ?? 'https://api.coingecko.com/api/v3';
  const key = process.env.COINGECKO_API_KEY;
  const url = new URL(`${base}/onchain/networks/${params.chainId}/tokens/${params.address}`);
  if (key) url.searchParams.set('x_cg_pro_api_key', key);
  const res = await fetch(url, { next: { revalidate: 20 } });
  if (!res.ok) throw new Error('CG bad response');
  const json = await res.json();
  const price = Number(json?.data?.attributes?.price_usd ?? 0);
  if (!price) throw new Error('CG no price');
  return { usd: price, source: 'coingecko' as const };
}

export async function GET() {
  try {
    // TODO: wire real pool/address
    const gt = await fetchGeckoTerminal('<POOL_ADDRESS>');
    return Response.json({ ...gt, updatedAt: new Date().toISOString() });
  } catch (e) {
    try {
      const cg = await fetchCoinGeckoOnchain({ chainId: 1, address: '<TOKEN_ADDRESS>' });
      return Response.json({ ...cg, updatedAt: new Date().toISOString() });
    } catch {
      return Response.json({ usd: 0, source: 'none', updatedAt: new Date().toISOString() }, { status: 200 });
    }
  }
}
```

**UI**: A `StatCard` with price, 24h change (if provided), and a sparkline chart if we have historical points. When data is missing, show a graceful "Data coming online" state.

### 9.2 Network Status (API Route: `/api/network`)

* **RPC**: call `eth_blockNumber` to get latest block, optionally `net_peerCount`.
* **Compute**: naive TPS/throughput estimates if gasTarget/blockTime provided (placeholder until we have real metrics).

```ts
async function jsonRpc<T>(method: string, params: any[] = []) {
  const rpc = process.env.MARS_RPC_PRIMARY!;
  const res = await fetch(rpc, {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }),
    next: { revalidate: 5 },
  });
  return (await res.json()) as { result: T };
}

export async function GET() {
  const { result: hexBlock } = await jsonRpc<string>('eth_blockNumber');
  const block = parseInt(hexBlock, 16);
  return Response.json({ block, updatedAt: new Date().toISOString() });
}
```

---

## 10) Components (Key)

* **`<Starfield />`** — canvas‑less CSS background with twinkle keyframes + parallax wrapper.
* **`<MarsOrb />`** — conic‑gradient circle with slow rotate + flare sweep (clip‑path + mask). Optional: small particles orbiting.
* **`<StatCard />`** — label, value, delta, small sparkline.
* **`<FeatureCard />`** — gradient skin (`bg-mars`), icon from lucide, hover tilt.
* **`<MiningSteps />`** — 3‑step cards: Add Network → Run Node → Start Mining.
* **`<UpdatesList />`** — MDX list with tags, date, “New” badge for 7 days.
* **`<Footer />`** — compact, with social icons and OSS badge.

---

## 11) Motion & Page Transitions

* Wrap `(site)` segment with a transition provider using Framer Motion’s `AnimatePresence`.
* Each section reveals with staggered `fadeInUp`. Cards spring slightly on hover.
* Reduce motion for users with `prefers-reduced-motion`.

```tsx
<motion.main initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, ease: 'easeOut' }}>
  {/* content */}
</motion.main>
```

---

## 12) Content Drafts

### Landing — section copy

* **Hero kicker**: *“Currency for harsh frontiers.”*

* **Hero h1**: *“Mineable. EVM‑native. Built for Mars.”*

* **Hero sub**: *“Mars Credit is an Ethereum‑PoW‑style Layer‑1 with simple, predictable economics and battle‑tested tooling.”*

* **Pillars**

  * *Proof‑of‑Work that anyone can join.*
  * *EVM compatibility from day one.*
  * *Fair launch. Open code. No nonsense.*

* **Mining CTA**: *“Point your rigs and help push the frontier.”*

### Story — section copy

* **Why PoW?** Determinism, hardware‑rooted security, and minimal governance.
* **What we kept from London**: Base fee + priority tips (confirm). Predictable block targets (confirm actual seconds).
* **What we changed**: (Fill in with real parameter diffs.)
* **Vision**: A settlement layer you can run in adverse environments.

### Updates — empty state copy

* *“Silence before the storm. Updates land here soon.”*

> **Replace all “confirm” and placeholder items with the project’s final network parameters before launch.**

---

## 13) Accessibility & Performance

* Color contrast ≥ WCAG AA.
* Keyboard focus rings, skip‑to‑content link, semantic landmarks.
* Image `alt` everywhere; motion reduced when requested.
* Performance budgets: LCP ≤ 2.5s, CLS ≤ 0.1, JS ≤ 180kb hydrated on landing.

---

## 14) SEO & Social

* Route metadata with canonical tags, JSON‑LD for Organization + Article on posts.
* Dynamic OG/Twitter images via `next/og` for posts and base routes.
* `sitemap.xml` + `robots.txt`.

---

## 15) Analytics (optional)

* Plausible with custom events for CTA clicks (`get_started`, `run_node`, `start_mining`).
* Respect DNT.

---

## 16) Deployment (Vercel)

1. Create Vercel project; connect repo.
2. Add env vars from `.env.example`.
3. Build command: `next build` (opt into `--turbopack` when stable if desired).
4. Set `Edge` runtime for API routes where used.
5. Add custom domain `marscredit.org` (placeholder).

**Hobby plan guardrails**: personal/open‑source use; expect monthly quotas on builds/bandwidth. Monitor usage.

---

## 17) Roadmap (Post‑v1)

* **Docs microsite** (typed content + code samples for devs).
* **Live explorer widgets** (latest blocks/tx, mempool preview) if explorer API exists.
* **Community**: build with Comments on updates (Giscus), RSS feed.
* **Status page** for RPCs.
* **Theming**: light theme variant with Martian dawn palette.

---

## 18) Implementation Checklist

* [ ] Next.js 15 + TS app bootstrapped
* [ ] Tailwind + shadcn/ui set up; tokens & gradients added
* [ ] Layout & navigation with Framer Motion transitions
* [ ] Hero with Mars orb + starfield
* [ ] Stat strip: price + block height (graceful degrade)
* [ ] Mining quickstart (network add button, node/miner snippets)
* [ ] Feature cards (3–4), Ecosystem links
* [ ] Story page content & visuals
* [ ] Updates MDX pipeline + OG images
* [ ] SEO, sitemap, robots
* [ ] Analytics (optional)
* [ ] Env vars on Vercel; deploy `main`

---

## 19) Acceptance Criteria

* Dark theme with red/orange gradients; looks premium on desktop & mobile.
* Animations: smooth, not janky; honors reduced‑motion.
* Price widget: degrades gracefully when upstream data missing; shows source tag.
* Network widget: shows latest block reliably; revalidates ≤10s.
* Pages: `/`, `/story`, `/updates` all score ≥90 Lighthouse (mobile desktop mix per above).
* No blocking CLS; keyboard accessible.

---

## 20) Quick Start Commands (for the coder)

```bash
# Create app
npx create-next-app@latest mars-credit-web --typescript --eslint --app
cd mars-credit-web

# Tailwind (v4 or v3 depending on current release)
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# shadcn/ui
npx shadcn@latest init
npx shadcn@latest add button card badge navigation-menu toast dialog dropdown-menu

# Motion, icons, theming
npm i framer-motion lucide-react next-themes recharts

# MDX & content tooling (choose one)
npm i @next/mdx  # or contentlayer

# Analytics (optional)
npm i next-plausible

# Dev
npm run dev
```

---

## 21) Notes & Placeholders to Fill

* **Algorithm**: Confirm mining algorithm (Ethash/ProgPoW/other) and update copy/snippets.
* **London specifics**: Confirm basefee/tips behavior & block time for accurate descriptions.
* **Explorer**: Provide official explorer URL(s) and API endpoints.
* **RPCs**: Provide at least two public RPC endpoints and rate limits.
* **Token addresses**: Provide main token contract (if applicable) & pool addresses for GeckoTerminal integration.
* **Community links**: Discord, X/Twitter, GitHub org.

---

## 22) Visual Inspirations (for vibe, not cloning)

* Premium gradients, neon glows, clean grids; keep it tasteful and performance‑friendly. Focus on clarity over noise.

---

### Appendix A — Example Card Markup

```tsx
export function StatCard({ label, value, hint }: { label: string; value: string; hint?: string }) {
  return (
    <div className="relative rounded-2xl p-6 bg-orbit ring-1 ring-white/5 shadow-[0_0_80px_-30px_rgba(255,81,47,0.35)]">
      <div className="text-sm text-zinc-400">{label}</div>
      <div className="mt-1 text-3xl font-semibold tracking-tight text-white">{value}</div>
      {hint && <div className="mt-1 text-xs text-zinc-500">{hint}</div>}
      <div className="pointer-events-none absolute -inset-px rounded-2xl bg-gradient-to-tr from-[rgba(255,81,47,0.15)] to-[rgba(255,138,77,0.08)]" />
    </div>
  );
}
```

### Appendix B — Starfield (CSS‑only)

```css
.stars::before, .stars::after {
  content: "";
  position: absolute; inset: 0; pointer-events: none;
  background-image: radial-gradient(2px 2px at 20% 30%, rgba(255,255,255,.6) 40%, transparent 41%),
                    radial-gradient(1px 1px at 80% 70%, rgba(255,255,255,.4) 40%, transparent 41%),
                    radial-gradient(1px 1px at 40% 90%, rgba(255,255,255,.3) 40%, transparent 41%);
  animation: twinkle 8s linear infinite;
}
@keyframes twinkle { 50% { opacity: .7; } }
```

### Appendix C — Reduced Motion Guard (React)

```tsx
import { useEffect, useState } from 'react';
export function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);
  useEffect(() => {
    const m = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReduced(m.matches);
    const onChange = () => setReduced(m.matches);
    m.addEventListener('change', onChange);
    return () => m.removeEventListener('change', onChange);
  }, []);
  return reduced;
}
```

