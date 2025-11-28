import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { UtensilsCrossed, Clock, MapPin, Phone, ChefHat, Star, Truck } from "lucide-react"

export default function HomePage() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image src="/elegant-restaurant-interior.png" alt="Restaurante" fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
        </div>

        <div className="relative container px-4 py-20">
          <div className="max-w-2xl text-white">
            <h1 className="font-serif text-5xl md:text-6xl font-bold mb-6 leading-tight">Sabor & Tradición</h1>
            <p className="text-xl md:text-2xl mb-8 text-white/90">
              Bienvenido a Piko Riko en el encontraras multiples platos de la comida colombiana
            </p>
            <div className="flex flex-wrap gap-4">
              <Link href="/menu">
                <Button size="lg" className="text-lg px-8">
                  Ver Menú
                </Button>
              </Link>
              <Link href="/pedido">
                <Button
                  size="lg"
                  variant="outline"
                  className="text-lg px-8 bg-white/10 border-white text-white hover:bg-white hover:text-foreground"
                >
                  Hacer Pedido
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 bg-secondary/50">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <ChefHat className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Comida Colombiana</h3>
                <p className="text-muted-foreground">
                  Nuestra cocina es como en casa con amor y dedicacion
                </p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Star className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Pollo colombiano</h3>
                <p className="text-muted-foreground">Nuestro pollo es colombiano, fresco y de alta calidad.</p>
              </CardContent>
            </Card>
            <Card className="text-center p-6">
              <CardContent className="pt-6">
                <Truck className="h-12 w-12 mx-auto text-primary mb-4" />
                <h3 className="font-serif text-xl font-semibold mb-2">Entrega Rápida</h3>
                <p className="text-muted-foreground">Recibe tu pedido caliente y fresco en la puerta de tu casa.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-16">
        <div className="container px-4">
          <h2 className="font-serif text-3xl font-bold text-center mb-12">Visítanos</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Ubicación</h3>
                <p className="text-muted-foreground">Carrera 1 #30-45, Soacha, San Mateo</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Clock className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Horario</h3>
                <p className="text-muted-foreground">Lun-Dom: 11:00 AM - 11:00 PM</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold">Teléfono</h3>
                <p className="text-muted-foreground">(57) 3137146971</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="font-serif text-3xl font-bold mb-4">¿Listo para ordenar?</h2>
          <p className="text-xl mb-8 opacity-90">Explora nuestro menú y haz tu pedido en línea</p>
          <Link href="/menu">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Ver Menú Completo
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-foreground text-background">
        <div className="container px-4 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <UtensilsCrossed className="h-6 w-6" />
            <span className="font-serif text-xl font-bold">Disfruta del mejor pollo al estilo americano</span>
          </div>
          <p className="text-background/70">© 2025 Piko Riko. Todos los derechos reservados.</p>
        </div>
      </footer>
    </div>
  )
}
