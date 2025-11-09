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
            <div className="mb-8 flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2 text-sm font-medium text-foreground">
                <Filter className="h-4 w-4" />
                <span>Catégories:</span>
              </div>
              <Button asChild variant={!params.category ? "default" : "outline"} size="sm">
                <Link href="/products">Tous</Link>
              </Button>
              {categories.map((category) => (
                <Button key={category} asChild variant={params.category === category ? "default" : "outline"} size="sm">
                  <Link href={`/products?category=${encodeURIComponent(category)}`}>{category}</Link>
                </Button>
              ))}
            </div>

            {/* Products Grid */}
            {products && products.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {products.map((product) => (
                  <Card
                    key={product.id}
                    className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden group"
                  >
                    <Link href={`/products/${product.id}`}>
                      <div className="aspect-square relative overflow-hidden bg-secondary/30">
                        <img
                          src={product.image_url || "/placeholder.svg?height=400&width=400"}
                          alt={product.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                        {product.stock <= 5 && product.stock > 0 && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-destructive/90 text-destructive-foreground text-xs font-medium rounded-full">
                            Stock limité
                          </div>
                        )}
                        {product.stock === 0 && (
                          <div className="absolute top-3 right-3 px-3 py-1 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                            Rupture
                          </div>
                        )}
                      </div>
                      <CardContent className="pt-5 pb-5 space-y-3">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-primary uppercase tracking-wide">{product.category}</p>
                          <h3 className="text-base font-semibold text-foreground line-clamp-1 group-hover:text-primary transition-colors">
                            {product.name}
                          </h3>
                          <p className="text-sm text-muted-foreground line-clamp-2 leading-relaxed">
                            {product.description}
                          </p>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                          <Button size="sm" variant="outline">
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
