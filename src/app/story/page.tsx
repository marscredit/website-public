"use client"

import { motion } from "framer-motion"
import { Navigation } from "@/components/navigation"
import { MarsOrb } from "@/components/mars-orb"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { links } from "@/lib/config"
import { 
  Rocket, 
  Zap, 
  Users, 
  Globe, 
  Shield,
  ArrowRight,
  ExternalLink
} from "lucide-react"

const timeline = [
  {
    phase: "Genesis",
    title: "The Fork",
    description: "Mars Credit was born from Ethereum's Proof-of-Work foundation, preserving the security and decentralization that makes blockchain trustworthy.",
    icon: Shield,
    status: "completed"
  },
  {
    phase: "Launch",
    title: "First Blocks Mined",
    description: "The network came alive with miners securing the first blocks, establishing the foundation for Mars' economic infrastructure.",
    icon: Zap,
    status: "completed"
  },
  {
    phase: "Tools",
    title: "MacOS Mining App",
    description: "Making mining accessible to everyone with an intuitive desktop application for Mac users.",
    icon: Rocket,
    status: "completed"
  },
  {
    phase: "Bridge",
    title: "Solana Integration",
    description: "Expanding accessibility by bridging MARS to Solana, bringing liquidity and trading opportunities.",
    icon: Globe,
    status: "completed"
  },
  {
    phase: "Community",
    title: "Grants Program",
    description: "Supporting builders and innovators who share our vision of interplanetary commerce and settlement.",
    icon: Users,
    status: "active"
  },
  {
    phase: "Future",
    title: "Mars Settlement",
    description: "The ultimate goal: a robust economic system ready to support human civilization on Mars.",
    icon: Rocket,
    status: "future"
  },
]

const principles = [
  {
    title: "Fairness",
    description: "No premine, no insider allocations. Every MARS token is earned through mining or fair market exchange."
  },
  {
    title: "Simplicity", 
    description: "Clear economics, predictable behavior. No complex tokenomics or governance drama."
  },
  {
    title: "Durability",
    description: "Built to last. Proof-of-Work consensus that can survive in the harsh environment of space."
  },
  {
    title: "Compatibility",
    description: "EVM-native from day one. All Ethereum tools, wallets, and contracts work seamlessly."
  }
]

export default function StoryPage() {
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
              className="mb-8"
            >
              <MarsOrb size="lg" className="mx-auto mb-8" />
            </motion.div>
            
            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl sm:text-6xl font-display font-bold text-text-hi mb-6 text-balance"
            >
              The Mars Credit{" "}
              <span className="text-transparent bg-gradient-to-r from-mars-400 to-mars-200 bg-clip-text">
                Story
              </span>
            </motion.h1>
            
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-xl text-text-med mb-8 max-w-2xl mx-auto text-balance"
            >
              Currency for harsh frontiers. A blockchain designed not just for Earth, 
              but for the challenges of interplanetary commerce and settlement.
            </motion.p>
          </div>
        </div>
      </section>

      {/* Origin Story */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-8">
                Why Mars Credit Exists
              </h2>
              <div className="prose prose-lg max-w-none">
                <p className="text-text-med text-lg leading-relaxed mb-6">
                  Mars Credit (MARS) emerges at a pivotal moment in human history, where Earth's 
                  ecological and societal crises necessitate bold solutions. As humanity prepares 
                  for interplanetary expansion, we need economic systems that can operate reliably 
                  in the harsh environment of space.
                </p>
                <p className="text-text-med text-lg leading-relaxed mb-6">
                  Inspired by the vision of Mars colonization and the need for a decentralized, 
                  trustworthy currency, Mars Credit leverages blockchain technology to create 
                  the foundation for interplanetary commerce. Every aspect of our design prioritizes 
                  reliability, security, and simplicity—qualities essential for survival on Mars.
                </p>
                <p className="text-text-med text-lg leading-relaxed">
                  Mars Credit is both a technical blockchain and a symbolic mission for survival 
                  and exploration. It represents humanity's determination to build sustainable 
                  economic infrastructure wherever we choose to make our home.
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 border-y border-white/5">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-12 text-center"
            >
              Our Journey
            </motion.h2>

            <div className="space-y-8">
              {timeline.map((milestone, index) => {
                const Icon = milestone.icon
                return (
                  <motion.div
                    key={milestone.phase}
                    initial={{ opacity: 0, x: -20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.6, delay: index * 0.1 }}
                    viewport={{ once: true }}
                    className="relative"
                  >
                    <div className="flex items-start space-x-4">
                      <div className={`
                        flex h-12 w-12 items-center justify-center rounded-2xl
                        ${milestone.status === 'completed' ? 'bg-mars-500/20 text-mars-400' : 
                          milestone.status === 'active' ? 'bg-mars-400/30 text-mars-300' :
                          'bg-panel text-text-lo'}
                      `}>
                        <Icon className="h-6 w-6" />
                      </div>
                      
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <span className="text-xs font-semibold text-mars-400 uppercase tracking-wider">
                            {milestone.phase}
                          </span>
                          {milestone.status === 'completed' && (
                            <span className="text-xs bg-mars-500/20 text-mars-300 px-2 py-1 rounded-full">
                              ✓ Complete
                            </span>
                          )}
                          {milestone.status === 'active' && (
                            <span className="text-xs bg-mars-400/30 text-mars-200 px-2 py-1 rounded-full animate-pulse">
                              ⚡ Active
                            </span>
                          )}
                        </div>
                        <h3 className="text-xl font-semibold text-text-hi mb-2">
                          {milestone.title}
                        </h3>
                        <p className="text-text-med leading-relaxed">
                          {milestone.description}
                        </p>
                      </div>
                    </div>
                    
                    {index < timeline.length - 1 && (
                      <div className="absolute left-6 top-12 h-8 w-px bg-gradient-to-b from-mars-500/50 to-transparent" />
                    )}
                  </motion.div>
                )
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Vision */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="mb-16"
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-8">
                The Vision
              </h2>
              <div className="text-lg text-text-med leading-relaxed space-y-6 text-balance">
                <p>
                  Mars Credit is more than a cryptocurrency—it's the economic backbone for 
                  humanity's greatest adventure. When the first permanent settlements are 
                  established on Mars, they'll need a currency that works reliably in an 
                  environment where Earth-based financial systems simply cannot reach.
                </p>
                <p>
                  Our blockchain is designed to operate autonomously, secured by miners who 
                  understand that they're not just processing transactions—they're building 
                  the foundation for interplanetary civilization.
                </p>
                <p className="text-xl font-semibold text-text-hi">
                  "Mars Credit is a proof‑of‑work, EVM chain that chooses simplicity over spectacle. 
                  If you can run a node, you can help secure the network. If you can ship a contract, 
                  you can deploy on day one."
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Principles */}
      <section className="py-20 bg-gradient-to-r from-mars-950/50 to-mars-900/30">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-6xl">
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-12 text-center"
            >
              Our Principles
            </motion.h2>

            <div className="grid md:grid-cols-2 gap-8">
              {principles.map((principle, index) => (
                <motion.div
                  key={principle.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <Card className="h-full">
                    <h3 className="text-xl font-semibold text-text-hi mb-4">
                      {principle.title}
                    </h3>
                    <p className="text-text-med leading-relaxed">
                      {principle.description}
                    </p>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-text-hi mb-6">
                Join the Mission
              </h2>
              <p className="text-lg text-text-med mb-8 text-balance">
                Every miner, developer, and community member is helping build the economic 
                infrastructure for humanity's future among the stars.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button size="lg" asChild>
                  <a href={links.mining} target="_blank" rel="noopener noreferrer">
                    <Rocket className="mr-2 h-5 w-5" />
                    Start Mining
                  </a>
                </Button>
                <Button variant="outline" size="lg" asChild>
                  <a href={links.discord} target="_blank" rel="noopener noreferrer">
                    <Users className="mr-2 h-5 w-5" />
                    Join Community
                  </a>
                </Button>
                <Button variant="ghost" size="lg" asChild>
                  <a href="/updates">
                    Latest Updates
                    <ArrowRight className="ml-2 h-4 w-4" />
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
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="mars-orb h-6 w-6 rounded-full"></div>
              <span className="font-display font-bold text-text-hi">Mars Credit</span>
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

