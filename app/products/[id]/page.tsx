import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { ArrowLeft, Package, Sparkles } from "lucide-react"
import { notFound } from "next/navigation"
import { CommentForm } from "@/components/comment-form"
import { CommentsList } from "@/components/comments-list"

export default async function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const supabase = await createClient()

  // Fetch product
  const { data: product } = await supabase.from("products").select("*").eq("id", id).single()

  if (!product) {
    notFound()
  }

  // Fetch comments for this product
  const { data: comments } = await supabase
    .from("comments")
    .select("*")
    .eq("product_id", id)
    .order("created_at", { ascending: false })

  // Calculate average rating
  const averageRating =
    comments && comments.length > 0
      ? comments.reduce((sum, comment) => sum + (comment.rating || 0), 0) / comments.length
      : 0

  // Fetch related products (same category)
  const { data: relatedProducts } = await supabase
    .from("products")
    .select("*")
    .eq("category", product.category)
    .neq("id", id)
    .limit(3)

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Breadcrumb */}
        <section className="w-full py-6 border-b border-border/40 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <Button asChild variant="ghost" size="sm">
              <Link href="/products" className="gap-2">
                <ArrowLeft className="h-4 w-4" />
                Retour aux produits
              </Link>
            </Button>
          </div>
        </section>

        {/* Product Details */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Product Image */}
              <div className="space-y-4">
                <div className="aspect-square relative overflow-hidden rounded-xl bg-secondary/30 border border-border/50">
                  <img
                    src={product.image_url || "/placeholder.svg?height=600&width=600"}
                    alt={product.name}
                    className="object-cover w-full h-full"
                  />
                </div>
              </div>

              {/* Product Info */}
              <div className="space-y-6">
                <div className="space-y-3">
                  <Badge variant="secondary" className="text-xs font-medium">
                    {product.category}
                  </Badge>
                  <h1 className="text-3xl md:text-4xl font-bold text-foreground text-balance">{product.name}</h1>

                  {comments && comments.length > 0 && (
                    <div className="flex items-center gap-2">
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Sparkles
                            key={i}
                            className={`h-4 w-4 ${
                              i < Math.round(averageRating) ? "text-primary fill-primary" : "text-muted-foreground/30"
                            }`}
                          />
                        ))}
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({comments.length} {comments.length === 1 ? "avis" : "avis"})
                      </span>
                    </div>
                  )}
                </div>

                <div className="flex items-baseline gap-3">
                  <span className="text-4xl font-bold text-primary">{product.price.toFixed(2)} €</span>
                </div>

                <div className="space-y-2">
                  <h2 className="text-lg font-semibold text-foreground">Description</h2>
                  <p className="text-muted-foreground leading-relaxed">{product.description}</p>
                </div>

                <div className="flex items-center gap-2 p-4 rounded-lg bg-secondary/30 border border-border/50">
                  <Package className="h-5 w-5 text-primary flex-shrink-0" />
                  <div className="text-sm">
                    {product.stock > 5 ? (
                      <span className="text-foreground font-medium">En stock</span>
                    ) : product.stock > 0 ? (
                      <span className="text-destructive font-medium">
                        Stock limité - Plus que {product.stock} disponible{product.stock > 1 ? "s" : ""}
                      </span>
                    ) : (
                      <span className="text-muted-foreground font-medium">Rupture de stock</span>
                    )}
                  </div>
                </div>

                <div className="pt-4">
                  <Button asChild size="lg" className="w-full sm:w-auto">
                    <Link href="/contact">Nous contacter pour commander</Link>
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Comments Section */}
        <section className="w-full py-12 md:py-16 bg-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-4xl">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">Avis clients</h2>
                <p className="text-muted-foreground">Partagez votre expérience avec ce produit</p>
              </div>

              <CommentForm productId={id} />

              {comments && comments.length > 0 ? (
                <CommentsList comments={comments} />
              ) : (
                <Card className="border-border/50">
                  <CardContent className="pt-8 pb-8 text-center">
                    <p className="text-muted-foreground">
                      Aucun avis pour le moment. Soyez le premier à donner votre avis !
                    </p>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </section>

        {/* Related Products */}
        {relatedProducts && relatedProducts.length > 0 && (
          <section className="w-full py-12 md:py-16">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
              <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-8">Produits similaires</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedProducts.map((relatedProduct) => (
                  <Card
                    key={relatedProduct.id}
                    className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-lg overflow-hidden group"
                  >
                    <Link href={`/products/${relatedProduct.id}`}>
                      <div className="aspect-square relative overflow-hidden bg-secondary/30">
                        <img
                          src={relatedProduct.image_url || "/placeholder.svg?height=400&width=400"}
                          alt={relatedProduct.name}
                          className="object-cover w-full h-full group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>
                      <CardContent className="pt-5 pb-5 space-y-3">
                        <div className="space-y-2">
                          <p className="text-xs font-medium text-primary uppercase tracking-wide">
                            {relatedProduct.category}
                          </p>
                          <h3 className="text-base font-semibold text-foreground line-clamp-1">
                            {relatedProduct.name}
                          </h3>
                        </div>
                        <div className="flex items-center justify-between pt-2">
                          <span className="text-xl font-bold text-primary">{relatedProduct.price.toFixed(2)} €</span>
                          <Button size="sm" variant="outline">
                            Voir
                          </Button>
                        </div>
                      </CardContent>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          </section>
        )}
      </main>

      <Footer />
    </div>
  )
}
