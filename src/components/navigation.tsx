"use client"

import * as React from "react"
import Link from "next/link"
import Image from "next/image"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { links } from "@/lib/config"
import { cn } from "@/lib/utils"
import { ExternalLink, Github, ArrowRightLeft, DollarSign } from "lucide-react"

const navigation = [
  { name: "Home", href: "/" },
  { name: "The Story", href: "/story" },
  { name: "Updates", href: "/updates" },
  { name: "Blockscan", href: links.blockscan, external: true },
  { name: "Grants", href: links.grants, external: true },
  { name: "Bridge", href: links.bridge, external: true },
]

const actionButtons = [
  { name: "Buy $MARS", href: links.trade, icon: DollarSign, variant: "outline" as const },
  { name: "GitHub", href: links.github, icon: Github, variant: "ghost" as const },
]

export function Navigation() {
  const pathname = usePathname()
  const [isScrolled, setIsScrolled] = React.useState(false)

  React.useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full border-b border-white/5 transition-all duration-200",
        isScrolled 
          ? "bg-background/80 backdrop-blur-xl shadow-lg shadow-mars-500/10" 
          : "bg-background/50"
      )}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <Image
              src="/brand/marscredit_wide_transparent-p-500.png"
              alt="Mars Credit"
              width={160}
              height={32}
              className="h-8 w-auto"
              priority
            />
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className={cn(
                  "text-sm font-medium transition-colors hover:text-mars-400",
                  pathname === item.href 
                    ? "text-mars-400" 
                    : "text-text-med"
                )}
                {...(item.external && { target: "_blank", rel: "noopener noreferrer" })}
              >
                {item.name}
                {item.external && <ExternalLink className="ml-1 h-3 w-3 inline" />}
              </Link>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            {actionButtons.map((button) => {
              const Icon = button.icon
              return (
                <Button
                  key={button.name}
                  variant={button.variant}
                  size="sm"
                  asChild
                >
                  <Link 
                    href={button.href} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-flex items-center"
                  >
                    <Icon className="mr-2 h-4 w-4" />
                    {button.name}
                  </Link>
                </Button>
              )
            })}
          </div>

          {/* Mobile menu button - TODO: Implement mobile menu */}
          <Button variant="ghost" size="icon" className="md:hidden">
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </Button>
        </div>
      </div>
    </header>
  )
}
