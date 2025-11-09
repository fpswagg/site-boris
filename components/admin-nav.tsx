"use client"

import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { Leaf, LayoutDashboard, Package, MessageSquare, Star, Mail, LogOut } from "lucide-react"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

export function AdminNav() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = async () => {
    const supabase = createClient()
    await supabase.auth.signOut()
    router.push("/")
    router.refresh()
  }

  const navItems = [
    { href: "/admin", label: "Tableau de bord", icon: LayoutDashboard },
    { href: "/admin/products", label: "Produits", icon: Package },
    { href: "/admin/messages", label: "Messages", icon: Mail },
    { href: "/admin/testimonials", label: "Témoignages", icon: Star },
  ]

  return (
    <aside className="w-64 border-r border-border/40 bg-secondary/20 p-6 flex flex-col">
      <Link href="/admin" className="flex items-center gap-2 mb-8">
        <Leaf className="h-6 w-6 text-primary" />
        <span className="text-lg font-semibold text-foreground">NaturaVie Admin</span>
      </Link>

      <nav className="flex-1 space-y-2">
        {navItems.map((item) => {
          const Icon = item.icon
          const isActive = pathname === item.href

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                isActive
                  ? "bg-primary text-primary-foreground"
                  : "text-muted-foreground hover:text-foreground hover:bg-secondary/50"
              }`}
            >
              <Icon className="h-4 w-4" />
              {item.label}
            </Link>
          )
        })}
      </nav>

      <div className="space-y-2 pt-4 border-t border-border/40">
        <Button variant="ghost" size="sm" className="w-full justify-start gap-3" asChild>
          <Link href="/">
            <MessageSquare className="h-4 w-4" />
            Voir le site
          </Link>
        </Button>
        <Button
          variant="ghost"
          size="sm"
          className="w-full justify-start gap-3 text-destructive hover:text-destructive hover:bg-destructive/10"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4" />
          Déconnexion
        </Button>
      </div>
    </aside>
  )
}
