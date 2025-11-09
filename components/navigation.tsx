"use client"

import Link from "next/link"
import { Leaf, Menu, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"

export function Navigation() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <nav className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
            <Leaf className="h-7 w-7 text-primary" />
            <span className="text-xl font-semibold text-foreground">NaturaVie</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            <Link href="/" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Accueil
            </Link>
            <Link href="/products" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Produits
            </Link>
            <Link
              href="/testimonials"
              className="text-sm font-medium text-foreground hover:text-primary transition-colors"
            >
              Témoignages
            </Link>
            <Link href="/contact" className="text-sm font-medium text-foreground hover:text-primary transition-colors">
              Contact
            </Link>
            <Button asChild size="sm" className="ml-4">
              <Link href="/products">Découvrir</Link>
            </Button>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-foreground hover:text-primary transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-border/40">
            <div className="flex flex-col gap-4">
              <Link
                href="/"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Accueil
              </Link>
              <Link
                href="/products"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Produits
              </Link>
              <Link
                href="/testimonials"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Témoignages
              </Link>
              <Link
                href="/contact"
                className="text-sm font-medium text-foreground hover:text-primary transition-colors"
                onClick={() => setIsMenuOpen(false)}
              >
                Contact
              </Link>
              <Button asChild size="sm" className="w-full">
                <Link href="/products" onClick={() => setIsMenuOpen(false)}>
                  Découvrir
                </Link>
              </Button>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}
