"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Edit, Trash2 } from "lucide-react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { createClient } from "@/lib/supabase/client"
import { useState } from "react"

interface Product {
  id: string
  name: string
  category: string
  price: number
  stock: number
  created_at: string
}

interface ProductsTableProps {
  products: Product[]
}

export function ProductsTable({ products }: ProductsTableProps) {
  const router = useRouter()
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    if (!confirm("Êtes-vous sûr de vouloir supprimer ce produit ?")) {
      return
    }

    setDeletingId(id)
    const supabase = createClient()

    const { error } = await supabase.from("products").delete().eq("id", id)

    if (error) {
      alert("Erreur lors de la suppression: " + error.message)
    } else {
      router.refresh()
    }
    setDeletingId(null)
  }

  if (products.length === 0) {
    return (
      <Card className="border-border/50">
        <CardContent className="pt-8 pb-8 text-center">
          <p className="text-muted-foreground">Aucun produit pour le moment.</p>
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border-border/50">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="border-b border-border/40 bg-secondary/20">
              <tr>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Produit</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Catégorie</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Prix</th>
                <th className="text-left p-4 text-sm font-semibold text-foreground">Stock</th>
                <th className="text-right p-4 text-sm font-semibold text-foreground">Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id} className="border-b border-border/40 hover:bg-secondary/20 transition-colors">
                  <td className="p-4">
                    <div className="font-medium text-foreground">{product.name}</div>
                  </td>
                  <td className="p-4">
                    <span className="text-sm text-muted-foreground">{product.category}</span>
                  </td>
                  <td className="p-4">
                    <span className="font-medium text-foreground">{product.price.toFixed(2)} €</span>
                  </td>
                  <td className="p-4">
                    <span
                      className={`text-sm ${product.stock <= 5 ? "text-destructive font-medium" : "text-muted-foreground"}`}
                    >
                      {product.stock}
                    </span>
                  </td>
                  <td className="p-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button asChild size="sm" variant="outline">
                        <Link href={`/admin/products/${product.id}/edit`}>
                          <Edit className="h-4 w-4" />
                        </Link>
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => handleDelete(product.id)}
                        disabled={deletingId === product.id}
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </CardContent>
    </Card>
  )
}
