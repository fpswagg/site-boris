"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import Link from "next/link"
import { ArrowLeft } from "lucide-react"

interface Product {
  id: string
  name: string
  description: string
  price: number
  category: string
  stock: number
  image_url?: string
}

interface ProductFormProps {
  product?: Product
}

export function ProductForm({ product }: ProductFormProps) {
  const [name, setName] = useState(product?.name || "")
  const [description, setDescription] = useState(product?.description || "")
  const [price, setPrice] = useState(product?.price.toString() || "")
  const [category, setCategory] = useState(product?.category || "")
  const [stock, setStock] = useState(product?.stock.toString() || "")
  const [imageUrl, setImageUrl] = useState(product?.image_url || "")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const supabase = createClient()
      const productData = {
        name,
        description,
        price: Number.parseFloat(price),
        category,
        stock: Number.parseInt(stock),
        image_url: imageUrl || null,
      }

      if (product) {
        const { error } = await supabase.from("products").update(productData).eq("id", product.id)

        if (error) throw error
      } else {
        const { error } = await supabase.from("products").insert(productData)

        if (error) throw error
      }

      router.push("/admin/products")
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
          <div className="space-y-2">
            <Label htmlFor="name">Nom du produit</Label>
            <Input
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
              placeholder="Ex: Huile Essentielle de Lavande"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              required
              placeholder="Décrivez le produit en détail..."
              rows={4}
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="price">Prix (€)</Label>
              <Input
                id="price"
                type="number"
                step="0.01"
                min="0"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                placeholder="24.99"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="stock">Stock</Label>
              <Input
                id="stock"
                type="number"
                min="0"
                value={stock}
                onChange={(e) => setStock(e.target.value)}
                required
                placeholder="50"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="category">Catégorie</Label>
            <Input
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              required
              placeholder="Ex: Huiles Essentielles, Tisanes, Compléments, Cosmétiques"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="imageUrl">URL de l'image (optionnel)</Label>
            <Input
              id="imageUrl"
              type="url"
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              placeholder="https://example.com/image.jpg"
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          <div className="flex gap-4 pt-4">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Enregistrement..." : product ? "Mettre à jour" : "Créer le produit"}
            </Button>
            <Button type="button" variant="outline" asChild>
              <Link href="/admin/products">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Annuler
              </Link>
            </Button>
          </div>
        </form>
      </CardContent>
    </Card>
  )
}
