import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { ProductForm } from "@/components/product-form"

export default async function NewProductPage() {
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

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-3xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Nouveau produit</h1>
            <p className="text-muted-foreground mt-2">Ajoutez un nouveau produit à votre catalogue</p>
          </div>

          <ProductForm />
        </div>
      </main>
    </div>
  )
}
