import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Leaf, Sparkles, Heart, Shield, ArrowRight } from "lucide-react"
import { createClient } from "@/lib/supabase/server"

export default async function HomePage() {
  const supabase = await createClient()

  // Fetch featured products
  const { data: products } = await supabase.from("products").select("*").limit(3)

  // Fetch featured testimonials
  const { data: testimonials } = await supabase.from("testimonials").select("*").eq("is_featured", true).limit(2)

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Hero Section */}
        <section className="relative w-full py-20 md:py-32 lg:py-40 bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden">
          <div className="absolute inset-0 bg-[url('/natural-leaves-pattern.jpg')] opacity-5 bg-cover bg-center" />
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-8 max-w-3xl mx-auto">
              <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20">
                <Leaf className="h-4 w-4 text-primary" />
                <span className="text-sm font-medium text-primary">Naturopathie & Bien-être</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight text-balance">
                Retrouvez votre équilibre naturel
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                Découvrez notre sélection de produits naturels et biologiques pour prendre soin de vous au quotidien.
                Huiles essentielles, tisanes, compléments et cosmétiques naturels.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 pt-4">
                <Button asChild size="lg" className="text-base">
                  <Link href="/products">
                    Découvrir nos produits
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline" className="text-base bg-transparent">
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>

        {/* Features Section */}
        <section className="w-full py-16 md:py-24 bg-background">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center space-y-4 mb-12">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Pourquoi choisir NaturaVie ?
              </h2>
              <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                Notre engagement pour votre bien-être naturel
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Leaf className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">100% Naturel</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tous nos produits sont issus de l'agriculture biologique et certifiés sans additifs chimiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Shield className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Qualité Garantie</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sélection rigoureuse de nos fournisseurs et contrôle qualité à chaque étape.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center">
                    <Heart className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground">Conseils Personnalisés</h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Notre équipe de naturopathes vous accompagne dans votre démarche bien-être.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>

        {/* Featured Products Section */}
        {products && products.length > 0 && (
          <section className="w-full py-16 md:py-24 bg-secondary/20">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Nos produits phares</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Découvrez notre sélection de produits les plus appréciés
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden group"
                  >
                    <div className="aspect-square relative overflow-hidden bg-secondary/30">
                      <img
                        src={product.image_url || "/placeholder.svg?height=400&width=400"}
                        alt={product.name}
                        className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                    <CardContent className="pt-6 pb-6 space-y-3">
                      <div className="space-y-2">
                        <p className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</p>
                        <h3 className="text-lg font-semibold text-foreground line-clamp-1">{product.name}</h3>
                        <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                          {product.description}
                        </p>
                      </div>
                      <div className="flex items-center justify-between pt-2">
                        <span className="text-2xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                        <Button asChild size="sm" variant="outline">
                          <Link href={`/products/${product.id}`}>Voir</Link>
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/products">
                    Voir tous les produits
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* Testimonials Section */}
        {testimonials && testimonials.length > 0 && (
          <section className="w-full py-16 md:py-24 bg-background">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <div className="text-center space-y-4 mb-12">
                <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">Ils nous font confiance</h2>
                <p className="text-lg text-muted-foreground max-w-2xl mx-auto text-pretty">
                  Découvrez les témoignages de nos clients satisfaits
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {testimonials.map((testimonial) => (
                  <Card key={testimonial.id} className="border-border/50 bg-card">
                    <CardContent className="pt-8 pb-8 space-y-4">
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Sparkles key={i} className="h-5 w-5 text-primary fill-primary" />
                        ))}
                      </div>
                      <p className="text-muted-foreground leading-relaxed italic">"{testimonial.content}"</p>
                      <p className="text-sm font-semibold text-foreground">— {testimonial.author_name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <div className="text-center mt-12">
                <Button asChild size="lg" variant="outline">
                  <Link href="/testimonials">
                    Voir tous les témoignages
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
              </div>
            </div>
          </section>
        )}

        {/* CTA Section */}
        <section className="w-full py-16 md:py-24 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-8">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Prêt à commencer votre voyage vers le bien-être ?
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Contactez-nous pour un conseil personnalisé ou découvrez notre gamme complète de produits naturels.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
                <Button asChild size="lg">
                  <Link href="/contact">
                    Nous contacter
                    <ArrowRight className="ml-2 h-5 w-5" />
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link href="/products">Voir les produits</Link>
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
