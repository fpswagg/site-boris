import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { TestimonialsManager } from "@/components/testimonials-manager"

export default async function AdminTestimonialsPage() {
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

  const { data: testimonials } = await supabase
    .from("testimonials")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Gestion des témoignages</h1>
            <p className="text-muted-foreground mt-2">Gérez et mettez en avant les témoignages clients</p>
          </div>

          <TestimonialsManager testimonials={testimonials || []} />
        </div>
      </main>
    </div>
  )
}
