"use client"

import Image from "next/image"
import { motion } from "framer-motion"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { formatDate } from "@/lib/utils"
import { links } from "@/lib/config"
import { CalendarDays, Clock, ArrowRight, Zap } from "lucide-react"

// Mock data for now - in a real app this would come from MDX files or a CMS
const updates = [
  {
    slug: "solana-bridge-live",
    title: "Solana Bridge Now Live",
    date: "2024-08-15",
    summary: "Mars Credit is now available on Solana! Trade MARS tokens with improved liquidity and access through our new bridge integration.",
    tags: ["bridge", "solana", "trading"],
    readTime: "3 min read",
  },
  {
    slug: "macos-mining-app-released",
    title: "MacOS Mining App Released",
    date: "2024-07-28",
    summary: "Mining Mars Credit is now easier than ever with our native MacOS application. Download and start mining with just a few clicks.",
    tags: ["mining", "macos", "app"],
    readTime: "2 min read",
  },
  {
    slug: "mainnet-milestone-2-5m-blocks",
    title: "Mainnet Milestone: 2.5M+ Blocks Mined",
    date: "2024-06-12",
    summary: "The Mars Credit network has successfully mined over 2.5 million blocks, demonstrating the strength and reliability of our proof-of-work consensus.",
    tags: ["mainnet", "milestone", "pow"],
    readTime: "4 min read",
  },
  {
    slug: "grants-program-launched", 
    title: "Mars Credit Grants Program Launched",
    date: "2024-05-20",
    summary: "Supporting developers and innovators building on Mars Credit with our new grants program. Apply now to bring your Mars-focused projects to life.",
    tags: ["grants", "community", "development"],
    readTime: "5 min read",
  },
]

const tagColors: Record<string, string> = {
  bridge: "bg-blue-500/20 text-blue-300",
  solana: "bg-purple-500/20 text-purple-300", 
  trading: "bg-green-500/20 text-green-300",
  mining: "bg-mars-500/20 text-mars-300",
  macos: "bg-gray-500/20 text-gray-300",
  app: "bg-cyan-500/20 text-cyan-300",
  mainnet: "bg-mars-400/20 text-mars-200",
  milestone: "bg-yellow-500/20 text-yellow-300",
  pow: "bg-orange-500/20 text-orange-300",
  grants: "bg-emerald-500/20 text-emerald-300",
  community: "bg-pink-500/20 text-pink-300",
  development: "bg-indigo-500/20 text-indigo-300",
}

function isNew(dateString: string): boolean {
  const postDate = new Date(dateString)
  const weekAgo = new Date()
  weekAgo.setDate(weekAgo.getDate() - 7)
  return postDate > weekAgo
}

export default function UpdatesPage() {
  return (
    <div className="min-h-screen">
      <Navigation />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden py-20 sm:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Zap className="h-16 w-16 text-mars-400 mx-auto mb-6" />
              <h1 className="text-4xl sm:text-6xl font-display font-bold text-text-hi mb-6 text-balance">
                Mars Credit{" "}
                <span className="text-transparent bg-gradient-to-r from-mars-400 to-mars-200 bg-clip-text">
                  Updates
                </span>
              </h1>
              <p className="text-xl text-text-med mb-8 max-w-2xl mx-auto text-balance">
                Stay informed about the latest developments, milestones, and announcements 
                from the Mars Credit ecosystem.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Updates List */}
      <section className="py-12">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            {updates.length > 0 ? (
              <div className="space-y-8">
                {updates.map((update, index) => (
                  <motion.article
                    key={update.slug}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                  >
                    <Card className="group hover:shadow-2xl hover:shadow-mars-500/10 transition-all duration-300">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center space-x-3 mb-3">
                              <div className="flex items-center text-sm text-text-lo">
                                <CalendarDays className="h-4 w-4 mr-1" />
                                {formatDate(update.date)}
                              </div>
                              <div className="flex items-center text-sm text-text-lo">
                                <Clock className="h-4 w-4 mr-1" />
                                {update.readTime}
                              </div>
                              {isNew(update.date) && (
                                <span className="text-xs bg-mars-500/20 text-mars-300 px-2 py-1 rounded-full animate-pulse">
                                  New
                                </span>
                              )}
                            </div>
                            <CardTitle className="text-2xl mb-3 group-hover:text-mars-300 transition-colors">
                              {update.title}
                            </CardTitle>
                            <p className="text-text-med leading-relaxed mb-4">
                              {update.summary}
                            </p>
                            <div className="flex flex-wrap gap-2">
                              {update.tags.map((tag) => (
                                <span
                                  key={tag}
                                  className={`text-xs px-2 py-1 rounded-full ${
                                    tagColors[tag] || "bg-panel text-text-med"
                                  }`}
                                >
                                  {tag}
                                </span>
                              ))}
                            </div>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <Button variant="ghost" asChild className="group/btn p-0 h-auto">
                          <Link 
                            href={`/updates/${update.slug}`}
                            className="inline-flex items-center text-mars-400 hover:text-mars-300 transition-colors"
                          >
                            Read full update
                            <ArrowRight className="ml-2 h-4 w-4 group-hover/btn:translate-x-1 transition-transform" />
                          </Link>
                        </Button>
                      </CardContent>
                    </Card>
                  </motion.article>
                ))}
              </div>
            ) : (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="text-center py-20"
              >
                <Zap className="h-16 w-16 text-text-lo mx-auto mb-6 opacity-50" />
                <h2 className="text-2xl font-semibold text-text-hi mb-4">
                  Silence before the storm
                </h2>
                <p className="text-text-med text-balance">
                  Updates land here soon. Follow our progress on GitHub and Discord 
                  to stay informed about the latest developments.
                </p>
              </motion.div>
            )}
          </div>
        </div>
      </section>

      {/* Newsletter CTA */}
      <section className="py-20 bg-gradient-to-r from-mars-950/50 to-mars-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-6">
                Stay in the Loop
              </h2>
              <p className="text-lg text-text-med mb-8 text-balance">
                Join our community to get the latest updates about Mars Credit development, 
                mining opportunities, and ecosystem growth.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <a href={links.discord} target="_blank" rel="noopener noreferrer">
                    Join Discord
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={links.twitter} target="_blank" rel="noopener noreferrer">
                    Follow on X
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href={links.github} target="_blank" rel="noopener noreferrer">
                    Watch on GitHub
                  </a>
                </Button>
              </div>
            </motion.div>
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

