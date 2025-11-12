import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { Filter } from "lucide-react"

export default async function ProductsPage({
  searchParams,
}: {
  searchParams: Promise<{ category?: string }>
}) {
  const params = await searchParams
  const supabase = await createClient()

  // Fetch products with optional category filter
  let query = supabase.from("products").select("*").order("created_at", { ascending: false })

  if (params.category) {
    query = query.eq("category", params.category)
  }

  const { data: products } = await query

  // Get unique categories
  const { data: allProducts } = await supabase.from("products").select("category")
  const categories = Array.from(new Set(allProducts?.map((p) => p.category) || []))

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Nos Produits Naturels</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Découvrez notre gamme complète de produits biologiques et naturels pour votre bien-être quotidien
              </p>
            </div>
          </div>
        </section>

        {/* Filters and Products */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {/* Category Filters */}
            <div className="mb-10 p-6 rounded-xl bg-gradient-to-br from-card to-card/50 border border-border/50 shadow-lg">
              <div className="flex flex-wrap items-center gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-foreground mr-2">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Filter className="h-4 w-4 text-primary" />
                  </div>
                  <span>Catégories:</span>
                </div>
                <Button 
                  asChild 
                  variant={!params.category ? "default" : "outline"} 
                  size="sm"
                  className={!params.category ? "shadow-md" : "hover:bg-primary/5"}
                >
                  <Link href="/products">Tous</Link>
                </Button>
                {categories.map((category) => (
                  <Button 
                    key={category} 
                    asChild 
                    variant={params.category === category ? "default" : "outline"} 
                    size="sm"
                    className={params.category === category ? "shadow-md" : "hover:bg-primary/5"}
                  >
                    <Link href={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
                  </Button>
                ))}
              </div>
            </div>

            {/* Products Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
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
                        
                        {/* Stock Badges */}
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="absolute top-3 left-3 px-3 py-1.5 bg-destructive/90 backdrop-blur-sm text-destructive-foreground text-xs font-bold rounded-full shadow-lg">
                            Stock limité
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-3 left-3 px-3 py-1.5 bg-muted/90 backdrop-blur-sm text-muted-foreground text-xs font-bold rounded-full shadow-lg">
                            Rupture
                          </div>
                        )}
                        {product.stock > 5 && (
                          <div className="absolute top-3 right-3 px-3 py-1.5 bg-primary/90 backdrop-blur-sm text-primary-foreground text-xs font-bold rounded-full shadow-lg">
                            En stock
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-5 pb-5 space-y-3">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full" />
                            <p className="text-xs font-bold text-primary uppercase tracking-wider">{product.category}</p>
                          </div>
                          <h3 className="text-base font-bold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-3 border-t border-border/50">
                          <span className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
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
            ) : (
              <div className="text-center py-16">
                <p className="text-lg text-muted-foreground">Aucun produit trouvé dans cette catégorie.</p>
              </div>
            )}
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
