"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { createClient } from "@/lib/supabase/client"

export function ContactFormComponent() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [subject, setSubject] = useState("")
  const [message, setMessage] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)
    setSuccess(false)

    try {
      const supabase = createClient()
      const { error } = await supabase.from("contact_messages").insert({
        name,
        email,
        subject,
        message,
      })

      if (error) throw error

      setSuccess(true)
      setName("")
      setEmail("")
      setSubject("")
      setMessage("")
    } catch (err) {
      setError(err instanceof Error ? err.message : "Une erreur est survenue")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Card className="border-border/50 shadow-lg">
      <CardHeader>
        <CardTitle className="text-2xl">Envoyez-nous un message</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="name">Nom complet</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                placeholder="Jean Dupont"
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
                placeholder="jean@example.fr"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="subject">Sujet</Label>
            <Input
              id="subject"
              value={subject}
              onChange={(e) => setSubject(e.target.value)}
              required
              placeholder="Demande d'information sur vos produits"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea
              id="message"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              required
              placeholder="Bonjour, je souhaiterais obtenir des informations sur..."
              rows={6}
            />
          </div>

          {error && <p className="text-sm text-destructive">{error}</p>}

          {success && (
            <div className="p-4 rounded-lg bg-primary/10 border border-primary/20">
              <p className="text-sm text-primary font-medium">
                Merci pour votre message ! Nous vous répondrons dans les plus brefs délais.
              </p>
            </div>
          )}

          <Button type="submit" className="w-full" disabled={isLoading}>
            {isLoading ? "Envoi en cours..." : "Envoyer le message"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
