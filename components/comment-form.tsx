"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Sparkles } from "lucide-react"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"

interface CommentFormProps {
  productId: string
}

export function CommentForm({ productId }: CommentFormProps) {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [content, setContent] = useState("")
  const [rating, setRating] = useState(5)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("comments").insert({
        product_id: productId,
        author_name: name,
        author_email: email,
        content,
        rating,
      })

      if (error) throw error

      setSuccess(true)
      setName("")
      setEmail("")
      setContent("")
      setRating(5)
      router.refresh()
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50">
      <CardContent className="pt-6 pb-6">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Votre nom"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                placeholder="votre@email.fr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label>Note</Label>
            <div className="flex gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setRating(i + 1)}
                  className="transition-transform hover:scale-110"
                >
                  <Sparkles
                    className={`h-6 w-6 ${i < rating ? "text-primary fill-primary" : "text-muted-foreground/30"}`}
                  />
                </button>
              ))}
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="content">Votre avis</Label>
            <Textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
              placeholder="Partagez votre expérience avec ce produit..."
              rows={4}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {success && (
            <p className="text-sm text-primary font-medium">Merci pour votre avis ! Il a été publié avec succès.</p>
          )}

          <Button type="submit" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Publier mon avis"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
