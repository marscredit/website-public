"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { CalendarDays, Clock, ArrowLeft, ExternalLink } from "lucide-react"

// Mock data - in a real app this would come from MDX files
const updates: Record<string, {
  title: string
  date: string
  readTime: string
  tags: string[]
  content: React.ReactNode
}> = {
  "solana-bridge-live": {
    title: "Solana Bridge Now Live",
    date: "2024-08-15",
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
    date: "2024-07-28",
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
}

interface UpdatePageProps {
  params: Promise<{
    slug: string
  }>
}

export default async function UpdatePage({ params }: UpdatePageProps) {
  const { slug } = await params
  const update = updates[slug]
  
  if (!update) {
    notFound()
  }

  return (
    <div className="min-h-screen">
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
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-3 mb-4 md:mb-0">
              <Image
                src="/brand/marscredit_wide_transparent-p-500.png"
                alt="Mars Credit"
                width={120}
                height={24}
                className="h-6 w-auto"
              />
              <span className="text-xs bg-mars-500/20 text-mars-300 px-2 py-1 rounded-full">
                Open Source
              </span>
            </div>
            <div className="text-sm text-text-lo">
              Built for the Red Planet. Mineable. EVM-compatible.
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
}

