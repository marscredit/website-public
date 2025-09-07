"use client"

import { motion } from "framer-motion"
import { Card } from "@/components/ui/card"
import { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface FeatureCardProps {
  icon: LucideIcon
  title: string
  description: string
  className?: string
  delay?: number
}

export function FeatureCard({ 
  icon: Icon, 
  title, 
  description, 
  className, 
  delay = 0 
}: FeatureCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, delay }}
      whileHover={{ 
        scale: 1.02, 
        y: -4,
        transition: { duration: 0.2 }
      }}
      className={cn("group cursor-default", className)}
    >
      <Card className="h-full p-6 transition-all duration-300 group-hover:shadow-2xl group-hover:shadow-mars-500/20">
        <div className="flex flex-col items-center text-center space-y-4">
          <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-mars-500/20 to-mars-600/10 group-hover:from-mars-500/30 group-hover:to-mars-500/20 transition-all duration-300">
            <Icon className="h-8 w-8 text-mars-500 group-hover:text-mars-300 transition-colors duration-300" />
          </div>
          
          <div className="space-y-2">
            <h3 className="text-xl font-semibold text-text-hi group-hover:text-mars-300 transition-colors duration-300">
              {title}
            </h3>
            <p className="text-text-med text-balance leading-relaxed">
              {description}
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

