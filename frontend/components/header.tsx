"use client"

import Link from "next/link"
import { useCart } from "@/lib/cart-context"
import { ShoppingCart, Menu, X, UtensilsCrossed } from "lucide-react"
import { useState } from "react"
import { Button } from "@/components/ui/button"

export function Header() {
  const { itemCount, total } = useCart()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 bg-orange-500/95 backdrop-blur border-b border-border">
  <div className="container flex h-16 items-center justify-between px-4">
    <Link href="/" className="flex items-center gap-2">
      <img src="/logo.png" alt="Logo" className="h-10 w-10" />
      <span className="font-serif text-xl font-bold text-white">Piko Riko</span>
    </Link>


        {/* Desktop Navigation */}
<nav className="hidden md:flex items-center gap-6">
  <Link href="/" className="text-white hover:text-gray-200 transition-colors">
    Inicio
  </Link>
  <Link href="/menu" className="text-white hover:text-gray-200 transition-colors">
    Menú
  </Link>
  <Link href="/admin" className="text-white hover:text-gray-200 transition-colors">
    Admin
  </Link>
</nav>


        {/* Cart Button */}
        <div className="flex items-center gap-4">
          <Link href="/pedido">
            <Button variant="outline" className="relative bg-transparent">
              <ShoppingCart className="h-5 w-5" />
              {itemCount > 0 && (
                <span className="absolute -top-2 -right-2 h-5 w-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center">
                  {itemCount}
                </span>
              )}
              <span className="hidden sm:inline ml-2">${total.toFixed(2)}</span>
            </Button>
          </Link>

          {/* Mobile Menu Button */}
          <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)} aria-label="Abrir menú">
            {menuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {menuOpen && (
        <nav className="md:hidden border-t border-border bg-background p-4">
          <div className="flex flex-col gap-4">
            <Link
              href="/"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Inicio
            </Link>
            <Link
              href="/menu"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Menú
            </Link>
            <Link
              href="/admin"
              className="text-foreground hover:text-primary transition-colors"
              onClick={() => setMenuOpen(false)}
            >
              Admin
            </Link>
          </div>
        </nav>
      )}
    </header>
  )
}
