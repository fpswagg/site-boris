"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Star, Trash2 } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface Testimonial {
  id: string
  author_name: string
  content: string
  rating: number
  is_featured: boolean
  created_at: string
}

interface TestimonialsManagerProps {
  testimonials: Testimonial[]
}

export function TestimonialsManager({ testimonials }: TestimonialsManagerProps) {
  const router = useRouter()
  const [loadingId, setLoadingId] = useState<string | null>(null)

  const handleToggleFeatured = async (id: string, currentStatus: boolean) => {
    setLoadingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("testimonials").update({ is_featured: !currentStatus }).eq("id", id)

    if (error) {
      alert("Erreur: " + error.message)
    } else {
      router.refresh()
    }
    setLoadingId(null)
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce témoignage ?")) {
      return
    }

    setLoadingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("testimonials").delete().eq("id", id)

    if (error) {
      alert("Erreur: " + error.message)
    } else {
      router.refresh()
    }
    setLoadingId(null)
  }

  if (testimonials.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-muted-foreground">Aucun témoignage pour le moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="space-y-4">
      {testimonials.map((testimonial) => (
        <Card key={testimonial.id} className="border-border/50">
          <CardContent className="pt-6 pb-6">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 space-y-3">
                <div className="flex items-start justify-between">
                  <div>
                    <h3 className="font-semibold text-foreground">{testimonial.author_name}</h3>
                    <div className="flex gap-1 mt-1">
                      {Array.from({ length: testimonial.rating }).map((_, i) => (
                        <Star key={i} className="h-4 w-4 text-primary fill-primary" />
                      ))}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {new Date(testimonial.created_at).toLocaleDateString("fr-FR")}
                  </span>
                </div>
                <p className="text-muted-foreground leading-relaxed">{testimonial.content}</p>
                <div className="flex items-center gap-2 pt-2">
                  <Button
                    size="sm"
                    variant={testimonial.is_featured ? "default" : "outline"}
                    onClick={() => handleToggleFeatured(testimonial.id, testimonial.is_featured)}
                    disabled={loadingId === testimonial.id}
                  >
                    <Star className="h-4 w-4 mr-2" />
                    {testimonial.is_featured ? "En vedette" : "Mettre en vedette"}
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => handleDelete(testimonial.id)}
                    disabled={loadingId === testimonial.id}
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}
