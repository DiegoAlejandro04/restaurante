"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import useSWR from "swr"
import { useCart } from "@/lib/cart-context"
import { fetcher, api } from "@/lib/api"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Trash2, Plus, Minus, ShoppingBag } from "lucide-react"
import Link from "next/link"
import type { Table } from "@/lib/types"

export default function PedidoPage() {
  const router = useRouter()
  const { items, updateQuantity, removeItem, clearCart, total } = useCart()
  const [loading, setLoading] = useState(false)
  const [orderType, setOrderType] = useState<"dine_in" | "takeout" | "delivery">("dine_in")
  const [formData, setFormData] = useState({
    customer_name: "",
    customer_phone: "",
    table_id: "",
    notes: "",
  })

  const { data: tables } = useSWR<Table[]>("/tables?status=available", fetcher)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (items.length === 0) return

    setLoading(true)
    try {
      const orderData = {
        customer_name: formData.customer_name,
        customer_phone: formData.customer_phone,
        table_id: orderType === "dine_in" ? Number.parseInt(formData.table_id) : null,
        order_type: orderType,
        notes: formData.notes,
        items: items.map((item) => ({
          product_id: item.product.id,
          quantity: item.quantity,
          unit_price: item.product.price,
        })),
      }

      const order = await api.createOrder(orderData)
      clearCart()
      router.push(`/pedido/confirmacion?id=${order.id}`)
    } catch (error) {
      console.error("Error creating order:", error)
      alert("Error al crear el pedido. Intenta de nuevo.")
    } finally {
      setLoading(false)
    }
  }

  if (items.length === 0) {
    return (
      <div className="container px-4 py-16 text-center">
        <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="font-serif text-2xl font-bold mb-2">Tu carrito está vacío</h1>
        <p className="text-muted-foreground mb-6">Agrega algunos platillos deliciosos de nuestro menú</p>
        <Link href="/menu">
          <Button>Ver Menú</Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="container px-4 py-8">
      <h1 className="font-serif text-3xl font-bold mb-8">Finalizar Pedido</h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* Cart Items */}
        <div className="lg:col-span-2">
          <Card>
            <CardHeader>
              <CardTitle>Tu Pedido</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {items.map((item) => (
                <div key={item.product.id} className="flex items-center gap-4 py-4 border-b last:border-0">
                  <div className="flex-1">
                    <h3 className="font-semibold">{item.product.name}</h3>
                    <p className="text-sm text-muted-foreground">${Number(item.product.price).toFixed(2)} c/u</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                    >
                      <Minus className="h-4 w-4" />
                    </Button>
                    <span className="w-8 text-center">{item.quantity}</span>
                    <Button
                      variant="outline"
                      size="icon"
                      className="h-8 w-8 bg-transparent"
                      onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                    >
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                  <div className="text-right w-20">
                    <p className="font-semibold">${(Number(item.product.price) * item.quantity).toFixed(2)}</p>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-destructive"
                    onClick={() => removeItem(item.product.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Order Form */}
        <div>
          <Card>
            <CardHeader>
              <CardTitle>Datos del Pedido</CardTitle>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Nombre</Label>
                  <Input
                    id="name"
                    required
                    value={formData.customer_name}
                    onChange={(e) => setFormData({ ...formData, customer_name: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="phone">Teléfono</Label>
                  <Input
                    id="phone"
                    type="tel"
                    required
                    value={formData.customer_phone}
                    onChange={(e) => setFormData({ ...formData, customer_phone: e.target.value })}
                  />
                </div>

                <div className="space-y-2">
                  <Label>Tipo de Pedido</Label>
                  <RadioGroup value={orderType} onValueChange={(v) => setOrderType(v as typeof orderType)}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dine_in" id="dine_in" />
                      <Label htmlFor="dine_in">Comer aquí</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="takeout" id="takeout" />
                      <Label htmlFor="takeout">Para llevar</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="delivery" id="delivery" />
                      <Label htmlFor="delivery">A domicilio</Label>
                    </div>
                  </RadioGroup>
                </div>

                {orderType === "dine_in" && (
                  <div className="space-y-2">
                    <Label htmlFor="table">Mesa</Label>
                    <select
                      id="table"
                      required
                      className="w-full h-10 px-3 rounded-md border border-input bg-background"
                      value={formData.table_id}
                      onChange={(e) => setFormData({ ...formData, table_id: e.target.value })}
                    >
                      <option value="">Selecciona una mesa</option>
                      {tables?.map((table) => (
                        <option key={table.id} value={table.id}>
                          Mesa {table.table_number} (Cap: {table.capacity})
                        </option>
                      ))}
                    </select>
                  </div>
                )}

                <div className="space-y-2">
                  <Label htmlFor="notes">Notas adicionales</Label>
                  <Textarea
                    id="notes"
                    placeholder="Instrucciones especiales..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                  />
                </div>

                <div className="border-t pt-4 mt-4">
                  <div className="flex justify-between text-lg font-bold">
                    <span>Total:</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>

                <Button type="submit" className="w-full" size="lg" disabled={loading}>
                  {loading ? "Procesando..." : "Confirmar Pedido"}
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
