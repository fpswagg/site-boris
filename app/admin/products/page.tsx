import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import Link from "next/link"
import { ProductsTable } from "@/components/products-table"

export default async function AdminProductsPage() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  const { data: profile } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  const { data: products } = await supabase.from("products").select("*").order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-foreground">Gestion des produits</h1>
              <p className="text-muted-foreground mt-2">Gérez votre catalogue de produits</p>
            </div>
            <Button asChild>
              <Link href="/admin/products/new">
                <Plus className="h-4 w-4 mr-2" />
                Nouveau produit
              </Link>
            </Button>
          </div>

          <ProductsTable products={products || []} />
        </div>
      </main>
    </div>
  )
}
