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
        <section className="relative w-full py-24 md:py-32 lg:py-44 bg-gradient-to-br from-background via-secondary/30 to-accent/20 overflow-hidden">
          {/* Background Pattern */}
          <div className="absolute inset-0 bg-[url('/natural-leaves-pattern.jpg')] opacity-5 bg-cover bg-center" />
          
          {/* Floating Decorative Elements */}
          <div className="absolute top-20 left-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl animate-pulse" />
          <div className="absolute bottom-20 right-10 w-40 h-40 bg-accent/10 rounded-full blur-3xl animate-pulse delay-700" />
          
          <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col items-center text-center space-y-8 max-w-4xl mx-auto animate-in fade-in slide-in-from-bottom-4 duration-1000">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/10 border border-primary/20 shadow-lg backdrop-blur-sm hover:scale-105 transition-transform duration-300">
                <Leaf className="h-4 w-4 text-primary animate-pulse" />
                <span className="text-sm font-semibold text-primary">Naturopathie & Bien-être</span>
              </div>

              {/* Main Heading */}
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-foreground leading-tight text-balance tracking-tight">
                Retrouvez votre{" "}
                <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent animate-gradient">
                  équilibre naturel
                </span>
              </h1>

              {/* Description */}
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed text-pretty max-w-2xl">
                Découvrez notre sélection de produits naturels et biologiques pour prendre soin de vous au quotidien.
                Huiles essentielles, tisanes, compléments et cosmétiques naturels certifiés.
              </p>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 pt-6">
                <Button 
                  asChild 
                  size="lg" 
                  className="text-base shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 group"
                >
                  <Link href="/products">
                    Découvrir nos produits
                    <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                  </Link>
                </Button>
                <Button 
                  asChild 
                  size="lg" 
                  variant="outline" 
                  className="text-base border-2 hover:bg-primary/5 hover:scale-105 transition-all duration-300"
                >
                  <Link href="/contact">Nous contacter</Link>
                </Button>
              </div>

              {/* Trust Indicators */}
              <div className="flex flex-wrap justify-center gap-8 pt-8 text-sm text-muted-foreground">
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse" />
                  <span>100% Naturel</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-100" />
                  <span>Bio Certifié</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-2 h-2 bg-primary rounded-full animate-pulse delay-200" />
                  <span>Livraison Rapide</span>
                </div>
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
              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-gradient-to-br from-card to-card/50">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Leaf className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    100% Naturel
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Tous nos produits sont issus de l'agriculture biologique et certifiés sans additifs chimiques.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-gradient-to-br from-card to-card/50">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Shield className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Qualité Garantie
                  </h3>
                  <p className="text-muted-foreground leading-relaxed">
                    Sélection rigoureuse de nos fournisseurs et contrôle qualité à chaque étape.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 group bg-gradient-to-br from-card to-card/50">
                <CardContent className="pt-8 pb-8 space-y-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 shadow-lg">
                    <Heart className="h-7 w-7 text-primary group-hover:rotate-12 transition-transform" />
                  </div>
                  <h3 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
                    Conseils Personnalisés
                  </h3>
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
                    className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 overflow-hidden group bg-gradient-to-br from-card to-card/80"
                  >
                    <Link href={`/products/${product.id}`} className="block">
                      <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-secondary/30 to-accent/20">
                        <img
                          src={product.image_url || "/placeholder.svg?height=400&width=400"}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-110 transition-transform duration-500"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                          Nouveau
                        </div>
                      </div>
                      <CardContent className="pt-6 pb-6 space-y-4">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full" />
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</p>
                          </div>
                          <h3 className="text-lg font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-2xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                            {product.price.toFixed(2)} €
                          </span>
                          <Button size="sm" variant="outline" className="group-hover:bg-primary group-hover:text-primary-foreground transition-all">
                            Voir détails
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
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

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <Card 
                    key={testimonial.id} 
                    className="border-border/50 bg-gradient-to-br from-card to-card/80 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 relative overflow-hidden group"
                    style={{ animationDelay: `${index * 100}ms` }}
                  >
                    {/* Decorative Quote */}
                    <div className="absolute top-4 right-4 text-8xl text-primary/5 font-serif leading-none">"</div>
                    
                    <CardContent className="pt-8 pb-8 space-y-5 relative">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: testimonial.rating }).map((_, i) => (
                          <Sparkles 
                            key={i} 
                            className="h-5 w-5 text-primary fill-primary animate-pulse" 
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Content */}
                      <p className="text-muted-foreground leading-relaxed italic text-base">
                        "{testimonial.content}"
                      </p>
                      
                      {/* Author */}
                      <div className="flex items-center gap-3 pt-2">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center">
                          <span className="text-sm font-bold text-primary">
                            {testimonial.author_name.charAt(0)}
                          </span>
                        </div>
                        <p className="text-sm font-bold text-foreground">
                          {testimonial.author_name}
                        </p>
                      </div>
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
