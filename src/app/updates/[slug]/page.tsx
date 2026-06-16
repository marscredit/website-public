"use client"

import Image from "next/image"
import { use } from "react"
import { motion } from "framer-motion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { site } from "@/lib/config"
import { CalendarDays, Clock, ArrowLeft, ExternalLink, Instagram, Send, MessageCircle } from "lucide-react"

// Mock data - in a real app this would come from MDX files
const updates: Record<string, {
  title: string
  date: string
  readTime: string
  tags: string[]
  content: React.ReactNode
}> = {
  "mining-on-apple-silicon-2026": {
    title: "Mining Cryptocurrency on Apple Silicon in 2026: A Complete Guide",
    date: "2026-06-16",
    readTime: "9 min read",
    tags: ["mining", "macos", "apple-silicon", "guide"],
    content: (
      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-xl text-text-med leading-relaxed">
          For a decade, mining cryptocurrency on a laptop has been treated as a joke. The conventional wisdom: if you don't own a dedicated GPU rig or an ASIC, don't bother. That wisdom was largely right.
        </p>
        <p className="text-text-med leading-relaxed">
          It's also out of date.
        </p>
        <p className="text-text-med leading-relaxed">
          In 2026, mining a real, working Layer 1 cryptocurrency on an Apple Silicon MacBook isn't a meme. It's a viable on-ramp into proof-of-work mining for people who never considered themselves miners. The chip in your M-series MacBook is fast enough, the algorithms are efficient enough, and at least one cryptocurrency — Mars Credit (MARS) — ships a native macOS mining app that does the work for you.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Why mining on a MacBook works now</h2>
        <p className="text-text-med leading-relaxed">Three things have changed since the "you need a GPU" era.</p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>Unified memory architecture.</strong> M1, M2, M3, and M4 chips share memory between CPU and GPU. Ethash and similar memory-hard proof-of-work algorithms care about memory bandwidth more than raw compute. Apple Silicon's unified memory delivers bandwidth (200-800 GB/s on Pro/Max chips) that would have been datacenter-class a decade ago.</li>
          <li>• <strong>Metal acceleration.</strong> Native macOS miners now use Metal — Apple's GPU compute framework — instead of CUDA. No Wine, no Boot Camp, no nonsense. The miner is a native Mac app.</li>
          <li>• <strong>Idle laptop cycles are free electricity.</strong> Mining on a MacBook plugged in at your desk while you work consumes electricity you're already paying for. Marginal cost is rounding error.</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What you can mine on Apple Silicon</h2>
        <p className="text-text-med leading-relaxed">The honest list is short. Most cryptocurrencies still require an NVIDIA GPU, an ASIC, or both. The exceptions are:</p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>Monero (XMR)</strong> — RandomX, CPU-mineable, runs fine on Apple Silicon but profitability is low without a serious thread count</li>
          <li>• <strong>Mars Credit (MARS)</strong> — Ethash, ships a native Apple Silicon miner, the focus of this guide</li>
          <li>• <strong>A handful of niche CPU coins</strong> — most are abandoned or low-quality</li>
        </ul>
        <p className="text-text-med leading-relaxed">
          This guide focuses on Mars Credit because it has the cleanest setup, a working Apple Silicon miner, and is the only mineable Layer 1 in 2026 with a first-class macOS experience.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What Mars Credit is</h2>
        <ul className="text-text-med space-y-2">
          <li>• Algorithm: Ethash (the algorithm Ethereum used pre-Merge)</li>
          <li>• Codebase: go-ethereum v1.10.18 fork, London hard fork</li>
          <li>• Block time: ~13 seconds</li>
          <li>• EVM-compatible: Yes (Chain ID 110110)</li>
          <li>• Launch: Fair launch, no premine, no ICO</li>
          <li>• Block height (mid-2026): 4.2 million+</li>
          <li>• Time on mainnet: ~18 months</li>
        </ul>
        <p className="text-text-med leading-relaxed">
          In plain English: it's a working blockchain that runs the same kind of code Ethereum did before The Merge, but as a separate independent chain. You can deploy Ethereum smart contracts to it. You can use MetaMask with it. And — relevant to this guide — you can mine it on a MacBook.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">How to mine MARS on your Mac in 4 steps</h2>
        <h3 className="text-xl font-semibold text-text-hi mt-6 mb-3">Step 1: Get a wallet address</h3>
        <p className="text-text-med leading-relaxed">
          Install MetaMask, Zerion, or any Ethereum-compatible wallet. Create a new wallet. Save your seed phrase somewhere safe (this is non-negotiable — if you lose the seed, you lose any MARS you mine). Copy your wallet's public address — it'll start with <code>0x</code> and be 42 characters long.
        </p>
        <h3 className="text-xl font-semibold text-text-hi mt-6 mb-3">Step 2: Download the Mars miner app</h3>
        <p className="text-text-med leading-relaxed">
          Go to <a href="https://marscredit.xyz" className="text-mars-400 hover:text-mars-300">marscredit.xyz</a>. The homepage has direct downloads for macOS (Apple Silicon), macOS (Intel), and Windows.
        </p>
        <h3 className="text-xl font-semibold text-text-hi mt-6 mb-3">Step 3: Open the app, paste your wallet, start</h3>
        <p className="text-text-med leading-relaxed">
          On first launch, right-click and choose "Open" (standard for indie Mac apps that aren't notarized through the App Store). Approve the dialog. Paste your wallet address. Click start. You're mining.
        </p>
        <h3 className="text-xl font-semibold text-text-hi mt-6 mb-3">Step 4: Monitor your hashrate and rewards</h3>
        <p className="text-text-med leading-relaxed">
          The app shows your current hashrate. Check your wallet balance and incoming MARS payouts on the block explorer — paste your wallet address into the search bar.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What hashrate to expect</h2>
        <ul className="text-text-med space-y-2">
          <li>• <strong>M1 / M2 (base):</strong> Low single-digit MH/s</li>
          <li>• <strong>M1 Pro / M2 Pro:</strong> Mid single-digit MH/s</li>
          <li>• <strong>M1 Max / M2 Max / M3 Max:</strong> 10-20+ MH/s</li>
          <li>• <strong>M3 Ultra:</strong> 25-40+ MH/s</li>
        </ul>
        <p className="text-text-med leading-relaxed">
          For context: a single high-end NVIDIA RTX 4090 runs Ethash at roughly 120 MH/s. So a top-tier Mac is roughly 1/6th to 1/4 the hashrate of a dedicated GPU. That sounds bad. It's not — your MacBook was already running, and network difficulty is still low on a small-cap chain. A few hundred Mac miners can find a meaningful share of blocks.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">How much MARS will you earn?</h2>
        <p className="text-text-med leading-relaxed">Honest answer: not a lot.</p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>M1/M2 base:</strong> A few MARS per day</li>
          <li>• <strong>M1 Pro / M2 Pro:</strong> Tens of MARS per day</li>
          <li>• <strong>M1 Max / M3 Max:</strong> Possibly 100+ MARS per day during low-difficulty periods</li>
        </ul>
        <p className="text-text-med leading-relaxed">
          You're not mining to pay rent. You're mining the early phase of a fair-launch chain on a device you already own, accumulating a position in case the project grows. The miners who made fortunes on Bitcoin in 2010 weren't running calculators showing they'd be rich — they were running laptops to see what happens.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Will my MacBook overheat?</h2>
        <p className="text-text-med leading-relaxed">
          Probably not, if you're using the official Mars Credit Apple Silicon miner. The app is built with Apple Silicon's thermal profile in mind. Keep your MacBook plugged in, on a hard flat surface, with vents unobstructed. If you have a MacBook Air (fanless), expect some thermal throttling.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">When does this stop working?</h2>
        <p className="text-text-med leading-relaxed">
          As more miners join, difficulty adjusts upward. Eventually GPU miners will dominate and laptop mining will become uneconomical. That window is real, and finite. The Bitcoin parallel is instructive — CPU-mineable on laptops from 2009 to 2010, then GPUs, then ASICs. The miners who got in during the laptop era of Bitcoin — and held — did well.
        </p>
        <p className="text-text-med leading-relaxed">
          We're not predicting Mars Credit will be Bitcoin. But the structure — fair launch, low difficulty, accessible mining — is the same window. It closes at some point.
        </p>

        <div className="bg-mars-950/50 border border-mars-500/20 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-mars-300 mb-2">Honest risks</h3>
          <ul className="text-text-med text-sm space-y-2">
            <li>• The MARS price could go to zero. Mine with the expectation your bag might be worth nothing.</li>
            <li>• Exchange liquidity is thin (LA Token only). Plan to hold what you mine.</li>
            <li>• The project is small. The team is small. This is a fair-launch experiment, not a VC-backed enterprise.</li>
          </ul>
        </div>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">FAQ</h2>
        <p className="text-text-med leading-relaxed"><strong>Is this legal?</strong> Yes. Proof-of-work mining is explicitly classified as non-securities activity by the SEC (Corporation Finance Statement, March 2025).</p>
        <p className="text-text-med leading-relaxed"><strong>Do I need to KYC?</strong> No. You generate a wallet, mine into it, and the chain doesn't know who you are.</p>
        <p className="text-text-med leading-relaxed"><strong>Can I mine on a PC and a Mac simultaneously?</strong> Yes. Point both at the same wallet address.</p>
        <p className="text-text-med leading-relaxed"><strong>Is the source code open?</strong> Yes — <a href="https://github.com/marscredit" className="text-mars-400 hover:text-mars-300">github.com/marscredit</a>.</p>
        <p className="text-text-med leading-relaxed"><strong>Where do I get help?</strong> Discord (discord.gg/57bg77dCV8) and Telegram (t.me/marscreditxyz).</p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Conclusion</h2>
        <p className="text-text-med leading-relaxed">
          Mining cryptocurrency on a MacBook in 2026 isn't a get-rich-quick scheme. It's a low-stakes way to participate in the early phase of a fair-launch proof-of-work chain using hardware you already own. If the worst case is "I learned how mining works and gained a small position in an experimental altcoin," the upside math gets interesting at very modest assumptions about whether the project grows.
        </p>
        <p className="text-text-med leading-relaxed">
          The download is at <a href="https://marscredit.xyz" className="text-mars-400 hover:text-mars-300">marscredit.xyz</a>. Setup takes 5 minutes. Difficulty is still low. The window is open.
        </p>
      </div>
    )
  },
  "solana-bridge-paused": {
    title: "Solana Bridge Paused",
    date: "2025-11-01",
    readTime: "3 min read",
    tags: ["bridge", "solana", "infrastructure"],
    content: (
      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-xl text-text-med leading-relaxed">
          We're temporarily pausing the Solana bridge to focus our efforts on strengthening 
          the core Mars Credit network infrastructure. This decision allows us to dedicate 
          our resources to improving the primary blockchain while planning a more robust 
          bridge solution for the future.
        </p>
        
        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Why We're Pausing</h2>
        <p className="text-text-med leading-relaxed">
          Running a self-hosted bridge requires significant ongoing maintenance and monitoring. 
          We've decided to pause operations to:
        </p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>Focus on Core Network:</strong> Dedicate resources to Mars Credit's primary blockchain</li>
          <li>• <strong>Improve Reliability:</strong> Address infrastructure challenges with our self-hosted solution</li>
          <li>• <strong>Plan Better Solution:</strong> Research integration with established bridge providers</li>
          <li>• <strong>Enhance Security:</strong> Leverage proven bridge infrastructure instead of self-hosting</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What This Means for Users</h2>
        <p className="text-text-med leading-relaxed">
          If you currently have MARS tokens on Solana, they remain safe. However, new bridging 
          operations are temporarily unavailable. We recommend holding your tokens until we 
          relaunch the bridge with a more reliable solution.
        </p>

        <div className="bg-mars-950/50 border border-mars-500/20 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-mars-300 mb-2">Important Notice</h3>
          <p className="text-text-med text-sm">
            Existing MARS tokens on Solana remain valid. We'll provide advance notice and 
            clear migration instructions when the new bridge solution is ready.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Future Plans</h2>
        <p className="text-text-med leading-relaxed">
          We're exploring partnerships with established bridge providers like Wormhole and other 
          trusted cross-chain infrastructure services. This approach will offer:
        </p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>Better Reliability:</strong> Professional bridge infrastructure with 24/7 monitoring</li>
          <li>• <strong>Enhanced Security:</strong> Battle-tested bridge technology</li>
          <li>• <strong>Lower Maintenance:</strong> Managed services reduce our operational burden</li>
          <li>• <strong>Multi-Chain Support:</strong> Potential expansion to additional blockchains</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Stay Updated</h2>
        <p className="text-text-med leading-relaxed">
          We'll announce our new bridge solution once we've selected a partner and completed 
          integration testing. Follow our updates page and social channels for the latest news.
        </p>
      </div>
    )
  },
  "solana-bridge-live": {
    title: "Solana Bridge Now Live",
    date: "2025-08-15",
    readTime: "3 min read",
    tags: ["bridge", "solana", "trading"],
    content: (
      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-xl text-text-med leading-relaxed">
          We're excited to announce that Mars Credit (MARS) is now available on Solana! 
          This integration marks a significant milestone in our mission to make MARS 
          accessible across multiple blockchain ecosystems.
        </p>
        
        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What This Means</h2>
        <p className="text-text-med leading-relaxed">
          The Solana bridge opens up new opportunities for MARS holders:
        </p>
        <ul className="text-text-med space-y-2">
          <li>• <strong>Enhanced Liquidity:</strong> Trade MARS on Solana's vibrant DEX ecosystem</li>
          <li>• <strong>Lower Fees:</strong> Benefit from Solana's low transaction costs</li>
          <li>• <strong>Faster Trades:</strong> Near-instant transaction finality</li>
          <li>• <strong>DeFi Integration:</strong> Use MARS in Solana DeFi protocols</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">How to Use the Bridge</h2>
        <p className="text-text-med leading-relaxed">
          Bridging your MARS tokens to Solana is straightforward:
        </p>
        <ol className="text-text-med space-y-2">
          <li>1. Visit our bridge interface at <code>bridge.marscredit.org</code></li>
          <li>2. Connect your Mars Credit and Solana wallets</li>
          <li>3. Specify the amount of MARS to bridge</li>
          <li>4. Confirm the transaction and wait for confirmation</li>
        </ol>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Trading on Solana</h2>
        <p className="text-text-med leading-relaxed">
          Once your MARS tokens are on Solana, you can trade them on popular DEX platforms. 
          We recommend using established platforms like Jupiter or Raydium for the best 
          trading experience.
        </p>

        <div className="bg-mars-950/50 border border-mars-500/20 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-mars-300 mb-2">Security Notice</h3>
          <p className="text-text-med text-sm">
            Always verify contract addresses and use official bridge interfaces. 
            The Mars Credit team will never ask for your private keys or seed phrases.
          </p>
        </div>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">What's Next</h2>
        <p className="text-text-med leading-relaxed">
          This bridge is just the beginning. We're working on additional integrations 
          and features to make Mars Credit the most accessible interplanetary currency. 
          Stay tuned for more updates!
        </p>
      </div>
    )
  },
  "macos-mining-app-released": {
    title: "MacOS Mining App Released", 
    date: "2025-07-28",
    readTime: "2 min read",
    tags: ["mining", "macos", "app"],
    content: (
      <div className="prose prose-lg max-w-none prose-invert">
        <p className="text-xl text-text-med leading-relaxed">
          Mining Mars Credit just got easier! We're thrilled to announce the release 
          of our native MacOS mining application, making it simple for Mac users to 
          start mining MARS tokens.
        </p>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Features</h2>
        <ul className="text-text-med space-y-2">
          <li>• <strong>One-Click Mining:</strong> Start mining with minimal configuration</li>
          <li>• <strong>Real-time Stats:</strong> Monitor hashrate, earnings, and network status</li>
          <li>• <strong>Wallet Integration:</strong> Built-in wallet management</li>
          <li>• <strong>Energy Efficient:</strong> Optimized for Mac hardware</li>
        </ul>

        <h2 className="text-2xl font-bold text-text-hi mt-8 mb-4">Download and Install</h2>
        <p className="text-text-med leading-relaxed">
          The app is available for download from our official GitHub releases page. 
          Simply download the .dmg file, install, and you're ready to start mining!
        </p>

        <div className="bg-mars-950/50 border border-mars-500/20 rounded-lg p-6 my-8">
          <h3 className="text-lg font-semibold text-mars-300 mb-2">System Requirements</h3>
          <ul className="text-text-med text-sm space-y-1">
            <li>• macOS 11.0 or later</li>
            <li>• 4GB RAM minimum (8GB recommended)</li>
            <li>• Stable internet connection</li>
          </ul>
        </div>
      </div>
    )
  }
}

const tagColors: Record<string, string> = {
  bridge: "bg-blue-500/20 text-blue-300",
  solana: "bg-purple-500/20 text-purple-300", 
  trading: "bg-green-500/20 text-green-300",
  mining: "bg-mars-500/20 text-mars-300",
  macos: "bg-gray-500/20 text-gray-300",
  app: "bg-cyan-500/20 text-cyan-300",
  "apple-silicon": "bg-slate-500/20 text-slate-200",
  guide: "bg-teal-500/20 text-teal-300",
  infrastructure: "bg-red-500/20 text-red-300",
  mainnet: "bg-mars-400/20 text-mars-200",
  milestone: "bg-yellow-500/20 text-yellow-300",
  pow: "bg-orange-500/20 text-orange-300",
  grants: "bg-emerald-500/20 text-emerald-300",
  community: "bg-pink-500/20 text-pink-300",
  development: "bg-indigo-500/20 text-indigo-300",
}

interface UpdatePageProps {
  params: Promise<{
    slug: string
  }>
}

export default function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = use(params)
  const update = updates[slug]
  
  if (!update) {
    notFound()
  }

  const articleJsonLd = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: update.title,
    datePublished: update.date,
    author: {
      "@type": "Organization",
      name: site.name,
    },
    url: `${site.url}/updates/${slug}`,
  }

  return (
    <div className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleJsonLd) }}
      />
      <Navigation />
      
      {/* Header */}
      <section className="py-12 border-b border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <Button variant="ghost" asChild className="mb-6">
                <Link href="/updates" className="inline-flex items-center text-text-med hover:text-text-hi">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Back to Updates
                </Link>
              </Button>
              
              <div className="flex items-center space-x-4 mb-4 text-sm text-text-lo">
                <div className="flex items-center">
                  <CalendarDays className="h-4 w-4 mr-1" />
                  {formatDate(update.date)}
                </div>
                <div className="flex items-center">
                  <Clock className="h-4 w-4 mr-1" />
                  {update.readTime}
                </div>
              </div>
              
              <h1 className="text-4xl sm:text-5xl font-display font-bold text-text-hi mb-6 text-balance">
                {update.title}
              </h1>
              
              <div className="flex flex-wrap gap-2 mb-8">
                {update.tags.map((tag) => (
                  <span
                    key={tag}
                    className={`text-xs px-3 py-1 rounded-full ${
                      tagColors[tag] || "bg-panel text-text-med"
                    }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.article
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="prose prose-lg max-w-none"
            >
              {update.content}
            </motion.article>
          </div>
        </div>
      </section>

      {/* Navigation */}
      <section className="py-12 border-t border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <div className="flex justify-between items-center">
              <Button variant="outline" asChild>
                <Link href="/updates">
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  All Updates
                </Link>
              </Button>
              
              <div className="flex space-x-2">
                <Button variant="ghost" size="sm" asChild>
                  <a 
                    href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(`Check out: ${update.title}`)}&url=${encodeURIComponent(`https://marscredit.org/updates/${slug}`)}`}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <ExternalLink className="h-4 w-4" />
                  </a>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center space-y-6">
            {/* Social Links */}
            <div className="flex items-center space-x-4">
              <a 
                href="https://instagram.com/marscredit.xyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-lo hover:text-white transition-colors"
              >
                <Instagram className="h-5 w-5" />
              </a>
              <a 
                href="https://x.com/marscredit" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-lo hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                </svg>
              </a>
              <a 
                href="https://t.me/marscreditxyz" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-lo hover:text-white transition-colors"
              >
                <Send className="h-5 w-5" />
              </a>
              <a 
                href="https://t.me/MarscreditOfficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-lo hover:text-white transition-colors"
              >
                <MessageCircle className="h-5 w-5" />
              </a>
              <a 
                href="https://discord.gg/57bg77dCV8" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-text-lo hover:text-white transition-colors"
              >
                <svg className="h-5 w-5" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.317 4.37a19.791 19.791 0 0 0-4.885-1.515a.074.074 0 0 0-.079.037c-.21.375-.444.864-.608 1.25a18.27 18.27 0 0 0-5.487 0a12.64 12.64 0 0 0-.617-1.25a.077.077 0 0 0-.079-.037A19.736 19.736 0 0 0 3.677 4.37a.07.07 0 0 0-.032.027C.533 9.046-.32 13.58.099 18.057a.082.082 0 0 0 .031.057a19.9 19.9 0 0 0 5.993 3.03a.078.078 0 0 0 .084-.028a14.09 14.09 0 0 0 1.226-1.994a.076.076 0 0 0-.041-.106a13.107 13.107 0 0 1-1.872-.892a.077.077 0 0 1-.008-.128a10.2 10.2 0 0 0 .372-.292a.074.074 0 0 1 .077-.01c3.928 1.793 8.18 1.793 12.062 0a.074.074 0 0 1 .078.01c.12.098.246.198.373.292a.077.077 0 0 1-.006.127a12.299 12.299 0 0 1-1.873.892a.077.077 0 0 0-.041.107c.36.698.772 1.362 1.225 1.993a.076.076 0 0 0 .084.028a19.839 19.839 0 0 0 6.002-3.03a.077.077 0 0 0 .032-.054c.5-5.177-.838-9.674-3.549-13.66a.061.061 0 0 0-.031-.03zM8.02 15.33c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.956-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.956 2.418-2.157 2.418zm7.975 0c-1.183 0-2.157-1.085-2.157-2.419c0-1.333.955-2.419 2.157-2.419c1.21 0 2.176 1.096 2.157 2.42c0 1.333-.946 2.418-2.157 2.418z" />
                </svg>
              </a>
            </div>

            {/* Logo and tagline */}
            <div className="flex flex-col md:flex-row justify-between items-center w-full">
              <div className="flex items-center space-x-3 mb-4 md:mb-0">
                <Image
                  src="/brand/marscredit_wide_transparent.png"
                  alt="Mars Credit"
                  width={120}
                  height={24}
                  className="h-6 w-auto brightness-200"
                />
                <span className="text-xs bg-mars-400/20 text-mars-400 px-2 py-1 rounded-full">
                  Open Source
                </span>
              </div>
              <div className="text-sm text-text-lo">
                Built for the Red Planet. Mineable. EVM-compatible.
              </div>
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

