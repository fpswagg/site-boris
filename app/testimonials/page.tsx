import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { createClient } from "@/lib/supabase/server"
import { Card, CardContent } from "@/components/ui/card"
import { Sparkles } from "lucide-react"

export default async function TestimonialsPage() {
  const supabase = await createClient()

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  // Calculate average rating
  const averageRating =
    testimonials && testimonials.length > 0
      ? testimonials.reduce((sum, t) => sum + t.rating, 0) / testimonials.length
      : 0

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Témoignages Clients</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Découvrez ce que nos clients pensent de nos produits naturels et de notre service
              </p>
              {testimonials && testimonials.length > 0 && (
                <div className="flex items-center justify-center gap-3 pt-4">
                  <div className="flex gap-1">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Sparkles
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.round(averageRating) ? "text-primary fill-primary" : "text-muted-foreground/30"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm font-medium text-muted-foreground">
                    {averageRating.toFixed(1)} / 5 ({testimonials.length} avis)
                  </span>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Testimonials Grid */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            {testimonials && testimonials.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
                {testimonials.map((testimonial, index) => (
                  <Card
                    key={testimonial.id}
                    className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-xl hover:-translate-y-1 bg-gradient-to-br from-card to-card/80 relative overflow-hidden group"
                    style={{ animationDelay: `${index * 50}ms` }}
                  >
                    {/* Decorative Quote */}
                    <div className="absolute top-4 right-4 text-7xl text-primary/5 font-serif leading-none">"</div>
                    
                    <CardContent className="pt-8 pb-8 space-y-5 relative">
                      {/* Rating Stars */}
                      <div className="flex gap-1">
                        {Array.from({ length: 5 }).map((_, i) => (
                          <Sparkles
                            key={i}
                            className={`h-5 w-5 transition-all ${
                              i < testimonial.rating 
                                ? "text-primary fill-primary animate-pulse" 
                                : "text-muted-foreground/20"
                            }`}
                            style={{ animationDelay: `${i * 100}ms` }}
                          />
                        ))}
                      </div>
                      
                      {/* Testimonial Content */}
                      <p className="text-muted-foreground leading-relaxed italic text-base min-h-[4rem]">
                        "{testimonial.content}"
                      </p>
                      
                      {/* Author Info */}
                      <div className="pt-3 border-t border-border/40 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center flex-shrink-0">
                          <span className="text-sm font-bold text-primary">
                            {testimonial.author_name.charAt(0)}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-foreground">{testimonial.author_name}</p>
                          <p className="text-xs text-muted-foreground">
                            {new Date(testimonial.created_at).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                            })}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <Card className="border-border/50 max-w-2xl mx-auto">
                <CardContent className="pt-12 pb-12 text-center">
                  <p className="text-lg text-muted-foreground">Aucun témoignage pour le moment.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </section>

        {/* CTA Section */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-primary/10 via-accent/10 to-secondary/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-foreground text-balance">
                Vous aussi, partagez votre expérience
              </h2>
              <p className="text-lg text-muted-foreground text-pretty">
                Après avoir essayé nos produits, n'hésitez pas à laisser un avis sur la page du produit concerné.
              </p>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
