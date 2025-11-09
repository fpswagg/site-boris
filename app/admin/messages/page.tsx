import { redirect } from "next/navigation"
import { createClient } from "@/lib/supabase/server"
import { AdminNav } from "@/components/admin-nav"
import { Card, CardContent } from "@/components/ui/card"
import { Mail } from "lucide-react"

export default async function AdminMessagesPage() {
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

  const { data: messages } = await supabase
    .from("contact_messages")
    .select("*")
    .order("created_at", { ascending: false })

  return (
    <div className="flex min-h-screen bg-background">
      <AdminNav />

      <main className="flex-1 p-8">
        <div className="max-w-5xl mx-auto space-y-8">
          <div>
            <h1 className="text-3xl font-bold text-foreground">Messages de contact</h1>
            <p className="text-muted-foreground mt-2">Consultez les messages reçus via le formulaire de contact</p>
          </div>

          {messages && messages.length > 0 ? (
            <div className="space-y-4">
              {messages.map((message) => (
                <Card key={message.id} className="border-border/50">
                  <CardContent className="pt-6 pb-6">
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                        <Mail className="h-5 w-5 text-primary" />
                      </div>
                      <div className="flex-1 space-y-3">
                        <div className="flex items-start justify-between gap-4">
                          <div>
                            <h3 className="font-semibold text-foreground">{message.name}</h3>
                            <p className="text-sm text-muted-foreground">{message.email}</p>
                          </div>
                          <span className="text-xs text-muted-foreground">
                            {new Date(message.created_at).toLocaleDateString("fr-FR", {
                              year: "numeric",
                              month: "long",
                              day: "numeric",
                              hour: "2-digit",
                              minute: "2-digit",
                            })}
                          </span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-foreground mb-1">Sujet: {message.subject}</p>
                          <p className="text-muted-foreground leading-relaxed">{message.message}</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          ) : (
            <Card className="border-border/50">
              <CardContent className="pt-8 pb-8 text-center">
                <p className="text-muted-foreground">Aucun message pour le moment.</p>
              </CardContent>
            </Card>
          )}
        </div>
      </main>
    </div>
  )
}
