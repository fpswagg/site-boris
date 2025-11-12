import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ContactFormComponent } from "@/components/contact-form-component"
import { Card, CardContent } from "@/components/ui/card"
import { Mail, Phone, MapPin, Clock } from "lucide-react"

export default function ContactPage() {
  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />

      <main className="flex-1">
        {/* Header */}
        <section className="w-full py-16 md:py-20 bg-gradient-to-br from-background via-secondary/30 to-accent/20">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="max-w-3xl mx-auto text-center space-y-4">
              <h1 className="text-4xl md:text-5xl font-bold text-foreground text-balance">Contactez-nous</h1>
              <p className="text-lg text-muted-foreground text-pretty">
                Notre équipe est à votre écoute pour répondre à toutes vos questions sur nos produits et services
              </p>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="w-full py-12 md:py-16">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Information */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-4">Nos coordonnées</h2>
                  <p className="text-muted-foreground leading-relaxed">
                    N'hésitez pas à nous contacter pour toute question concernant nos produits naturels, pour un conseil
                    personnalisé ou pour passer commande.
                  </p>
                </div>

                <div className="space-y-5">
                  <Card className="border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/80 group">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <Mail className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Email</h3>
                          <a href="mailto:contact@naturavie.fr" className="text-muted-foreground hover:text-primary transition-colors">
                            contact@naturavie.fr
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/80 group">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <Phone className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Téléphone</h3>
                          <a href="tel:+33123456789" className="text-muted-foreground hover:text-primary transition-colors">
                            +33 1 23 45 67 89
                          </a>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/80 group">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <MapPin className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Adresse</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            123 Rue de la Nature
                            <br />
                            75001 Paris, France
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card className="border-border/50 hover:border-primary/50 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 bg-gradient-to-br from-card to-card/80 group">
                    <CardContent className="pt-6 pb-6">
                      <div className="flex items-start gap-4">
                        <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary/20 to-primary/10 flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform shadow-lg">
                          <Clock className="h-6 w-6 text-primary group-hover:rotate-12 transition-transform" />
                        </div>
                        <div>
                          <h3 className="font-bold text-foreground mb-1 group-hover:text-primary transition-colors">Horaires</h3>
                          <p className="text-muted-foreground leading-relaxed">
                            Lundi - Vendredi: 9h00 - 18h00
                            <br />
                            Samedi: 10h00 - 16h00
                            <br />
                            Dimanche: Fermé
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>

              {/* Contact Form */}
              <div>
                <ContactFormComponent />
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}
