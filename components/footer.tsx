import Link from "next/link"
import { Leaf, Mail, Phone, MapPin } from "lucide-react"

export function Footer() {
  return (
    <footer className="w-full border-t border-border/40 bg-secondary/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link href="/" className="flex items-center gap-2">
              <Leaf className="h-6 w-6 text-primary" />
              <span className="text-lg font-semibold text-foreground">NaturaVie</span>
            </Link>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Votre partenaire bien-être pour une vie naturelle et équilibrée.
            </p>
          </div>

          {/* Navigation */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Navigation</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/products" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Produits
                </Link>
              </li>
              <li>
                <Link
                  href="/testimonials"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Témoignages
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Catégories</h3>
            <ul className="space-y-2">
              <li>
                <Link
                  href="/products?category=Huiles Essentielles"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Huiles Essentielles
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Tisanes"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Tisanes
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Compléments"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Compléments
                </Link>
              </li>
              <li>
                <Link
                  href="/products?category=Cosmétiques"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors"
                >
                  Cosmétiques
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-4">
            <h3 className="text-sm font-semibold text-foreground">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Mail className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>contact@naturavie.fr</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <Phone className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>+33 1 23 45 67 89</span>
              </li>
              <li className="flex items-start gap-2 text-sm text-muted-foreground">
                <MapPin className="h-4 w-4 mt-0.5 text-primary flex-shrink-0" />
                <span>Paris, France</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border/40">
          <p className="text-center text-sm text-muted-foreground">
            © {new Date().getFullYear()} NaturaVie. Tous droits réservés.
          </p>
        </div>
      </div>
    </footer>
  )
}
