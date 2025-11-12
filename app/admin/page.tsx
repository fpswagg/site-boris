import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Package, MessageSquare, Star, Mail } from "lucide-react"

export default async function AdminDashboard() {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()
  if (!user) {
    redirect("/auth/login")
  }

  // Check if user is admin
  const { data: profile, error } = await supabase.from("profiles").select("role").eq("id", user.id).single()

  if (error) {
    console.error("Error fetching profile:", error)
    redirect("/")
  }

  console.log("Profile:", profile)
  console.log("User:", user)

  if (!profile || profile.role !== "admin") {
    redirect("/")
  }

  // Fetch statistics
  const { count: productsCount } = await supabase.from("products").select("*", { count: "exact", head: true })

  const { count: commentsCount } = await supabase.from("comments").select("*", { count: "exact", head: true })

  const { count: testimonialsCount } = await supabase.from("testimonials").select("*", { count: "exact", head: true })

  const { count: messagesCount } = await supabase.from("contact_messages").select("*", { count: "exact", head: true })

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-7xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Tableau de bord</h1>
            <p className="text-muted-foreground mt-2">Bienvenue dans votre espace d'administration NaturaVie</p>
          </div>

          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Produits</CardTitle>
                <Package className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{productsCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Produits au catalogue</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Avis clients</CardTitle>
                <MessageSquare className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{commentsCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Commentaires publiés</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Témoignages</CardTitle>
                <Star className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{testimonialsCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Témoignages actifs</p>
              </CardContent>
            </Card>

            <Card className="border-border/50">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-muted-foreground">Messages</CardTitle>
                <Mail className="h-4 w-4 text-primary" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-foreground">{messagesCount || 0}</div>
                <p className="text-xs text-muted-foreground mt-1">Messages reçus</p>
              </CardContent>
            </Card>
          </div>

          {/* Quick Actions */}
          <Card className="border-border/50">
            <CardHeader>
              <CardTitle>Actions rapides</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href="/admin/products"
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-secondary/30 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-1">Gérer les produits</h3>
                  <p className="text-sm text-muted-foreground">Ajouter, modifier ou supprimer des produits</p>
                </a>
                <a
                  href="/admin/messages"
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-secondary/30 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-1">Voir les messages</h3>
                  <p className="text-sm text-muted-foreground">Consulter les messages de contact</p>
                </a>
                <a
                  href="/admin/testimonials"
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-secondary/30 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-1">Gérer les témoignages</h3>
                  <p className="text-sm text-muted-foreground">Modérer et mettre en avant les témoignages</p>
                </a>
                <a
                  href="/"
                  className="p-4 rounded-lg border border-border/50 hover:border-primary/50 hover:bg-secondary/30 transition-all"
                >
                  <h3 className="font-semibold text-foreground mb-1">Voir le site</h3>
                  <p className="text-sm text-muted-foreground">Accéder à la version publique du site</p>
                </a>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  )
}
