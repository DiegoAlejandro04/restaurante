"use client"

import Image from "next/image"
import { Plus, Minus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { useCart } from "@/lib/cart-context"
import type { Product } from "@/lib/types"

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const { items, addItem, updateQuantity, removeItem } = useCart()

  const cartItem = items.find((item) => item.product.id === product.id)
  const quantity = cartItem?.quantity || 0

  return (
    <Card className="overflow-hidden group hover:shadow-lg transition-shadow">
      <div className="aspect-[4/3] relative overflow-hidden bg-muted">
        <Image
          src={product.image_url || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(product.name)}`}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        {product.featured && (
          <span className="absolute top-2 left-2 bg-primary text-primary-foreground text-xs px-2 py-1 rounded-full">
            Destacado
          </span>
        )}
      </div>
      <CardContent className="p-4">
        <div className="flex justify-between items-start mb-2">
          <div>
            <h3 className="font-semibold text-foreground">{product.name}</h3>
            {product.category_name && <p className="text-xs text-muted-foreground">{product.category_name}</p>}
          </div>
          <span className="font-bold text-primary text-lg">${Number(product.price).toFixed(2)}</span>
        </div>

        {product.description && (
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">{product.description}</p>
        )}

        {/* Add to cart controls */}
        {quantity === 0 ? (
          <Button className="w-full" onClick={() => addItem(product)}>
            <Plus className="h-4 w-4 mr-2" />
            Agregar
          </Button>
        ) : (
          <div className="flex items-center justify-center gap-4">
            <Button variant="outline" size="icon" onClick={() => updateQuantity(product.id, quantity - 1)}>
              <Minus className="h-4 w-4" />
            </Button>
            <span className="font-semibold text-lg w-8 text-center">{quantity}</span>
            <Button variant="outline" size="icon" onClick={() => addItem(product)}>
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
