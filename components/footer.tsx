"use client"

import Link from "next/link"
import { Leaf, Mail, Phone, MapPin, Facebook, Instagram, Twitter, Send } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useState } from "react"

export function Footer() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    // TODO: Implement newsletter subscription
    setSubscribed(true)
    setEmail("")
    setTimeout(() => setSubscribed(false), 3000)
  }

  return (
    <footer className="w-full border-t border-border/40 bg-gradient-to-br from-secondary/30 via-background to-accent/10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-8 lg:gap-12">
          {/* Brand & Newsletter */}
          <div className="lg:col-span-5 space-y-6">
            <div className="space-y-4">
              <Link href="/" className="inline-flex items-center gap-2 group">
                <div className="relative">
                  <Leaf className="h-8 w-8 text-primary group-hover:scale-110 transition-transform duration-300" />
                  <div className="absolute inset-0 bg-primary/20 rounded-full blur-md group-hover:bg-primary/30 transition-all" />
                </div>
                <span className="text-2xl font-bold text-foreground">NaturaVie</span>
              </Link>
              <p className="text-sm text-muted-foreground leading-relaxed max-w-md">
                Votre partenaire bien-être pour une vie naturelle et équilibrée. Découvrez nos produits biologiques et
                naturels pour prendre soin de vous au quotidien.
              </p>
            </div>

            {/* Newsletter */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Newsletter</h3>
              <p className="text-sm text-muted-foreground">Recevez nos offres et conseils bien-être.</p>
              <form onSubmit={handleSubscribe} className="flex gap-2">
                <Input
                  type="email"
                  placeholder="votre@email.fr"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1"
                  required
                />
                <Button type="submit" size="icon" className="flex-shrink-0">
                  <Send className="h-4 w-4" />
                </Button>
              </form>
              {subscribed && (
                <p className="text-xs text-primary animate-in fade-in duration-200">Merci pour votre inscription !</p>
              )}
            </div>

            {/* Social Links */}
            <div className="space-y-3">
              <h3 className="text-sm font-semibold text-foreground">Suivez-nous</h3>
              <div className="flex gap-2">
                <a
                  href="https://facebook.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Facebook"
                >
                  <Facebook className="h-5 w-5" />
                </a>
                <a
                  href="https://instagram.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Instagram"
                >
                  <Instagram className="h-5 w-5" />
                </a>
                <a
                  href="https://twitter.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg bg-primary/10 text-primary hover:bg-primary hover:text-primary-foreground transition-all"
                  aria-label="Twitter"
                >
                  <Twitter className="h-5 w-5" />
                </a>
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Accueil</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Produits</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Témoignages</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Contact</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="lg:col-span-2 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Catégories</h3>
            <ul className="space-y-2.5">
              <li>
                <Link
                  href="/products?category=Huiles Essentielles"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Huiles Essentielles</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Tisanes"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Tisanes</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Compléments"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Compléments</span>
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Cosmétiques"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors inline-flex items-center group"
                >
                  <span className="group-hover:translate-x-1 transition-transform">Cosmétiques</span>
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="mailto:contact@naturavie.fr" className="hover:text-primary transition-colors">
                  contact@naturavie.fr
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <a href="tel:+33123456789" className="hover:text-primary transition-colors">
                  +33 1 23 45 67 89
                </a>
              </li>
              <li className="flex items-start gap-3 text-sm text-muted-foreground group">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0 group-hover:scale-110 transition-transform" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-12 pt-8 border-t border-border/40 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} NaturaVie. Tous droits réservés.
          </p>
          <div className="flex gap-6 text-sm text-muted-foreground">
            <Link href="/legal" className="hover:text-primary transition-colors">
              Mentions légales
            </Link>
            <Link href="/privacy" className="hover:text-primary transition-colors">
              Confidentialité
            </Link>
            <Link href="/terms" className="hover:text-primary transition-colors">
              CGV
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
