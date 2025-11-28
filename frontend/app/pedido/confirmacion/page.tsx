"use client"

import { useSearchParams } from "next/navigation"
import useSWR from "swr"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { CheckCircle2, Clock, Package } from "lucide-react"
import { fetcher } from "@/lib/api"
import type { Order } from "@/lib/types"
import { Suspense } from "react"

function ConfirmacionContent() {
  const searchParams = useSearchParams()
  const orderId = searchParams.get("id")

  const { data: order, isLoading } = useSWR<Order>(orderId ? `/orders/${orderId}` : null, fetcher, {
    refreshInterval: 5000,
  })

  if (isLoading) {
    return (
      <div className="container px-4 py-16 text-center">
        <div className="animate-pulse">
          <div className="h-16 w-16 mx-auto bg-muted rounded-full mb-4" />
          <div className="h-8 w-48 mx-auto bg-muted rounded mb-2" />
          <div className="h-4 w-64 mx-auto bg-muted rounded" />
        </div>
      </div>
    )
  }

  if (!order) {
    return (
      <div className="container px-4 py-16 text-center">
        <p className="text-muted-foreground">Pedido no encontrado</p>
        <Link href="/menu">
          <Button className="mt-4">Volver al Menú</Button>
        </Link>
      </div>
    )
  }

  const statusConfig = {
    pending: { label: "Pendiente", icon: Clock, color: "text-yellow-600" },
    preparing: { label: "Preparando", icon: Package, color: "text-blue-600" },
    ready: { label: "Listo", icon: CheckCircle2, color: "text-green-600" },
    delivered: { label: "Entregado", icon: CheckCircle2, color: "text-green-600" },
    cancelled: { label: "Cancelado", icon: Clock, color: "text-red-600" },
  }

  const status = statusConfig[order.status]
  const StatusIcon = status.icon

  return (
    <div className="container px-4 py-16 max-w-2xl mx-auto">
      <div className="text-center mb-8">
        <CheckCircle2 className="h-16 w-16 mx-auto text-green-600 mb-4" />
        <h1 className="font-serif text-3xl font-bold mb-2">¡Pedido Confirmado!</h1>
        <p className="text-muted-foreground">Tu pedido #{order.id} ha sido recibido</p>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <CardTitle className="flex items-center justify-between">
            <span>Estado del Pedido</span>
            <span className={`flex items-center gap-2 ${status.color}`}>
              <StatusIcon className="h-5 w-5" />
              {status.label}
            </span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-muted-foreground">Cliente</p>
                <p className="font-medium">{order.customer_name}</p>
              </div>
              <div>
                <p className="text-muted-foreground">Teléfono</p>
                <p className="font-medium">{order.customer_phone}</p>
              </div>
              {order.table_number && (
                <div>
                  <p className="text-muted-foreground">Mesa</p>
                  <p className="font-medium">{order.table_number}</p>
                </div>
              )}
              <div>
                <p className="text-muted-foreground">Tipo</p>
                <p className="font-medium">
                  {order.order_type === "dine_in"
                    ? "Comer aquí"
                    : order.order_type === "takeout"
                      ? "Para llevar"
                      : "A domicilio"}
                </p>
              </div>
            </div>

            {order.items && order.items.length > 0 && (
              <div className="border-t pt-4 mt-4">
                <h4 className="font-semibold mb-2">Productos</h4>
                {order.items.map((item) => (
                  <div key={item.id} className="flex justify-between text-sm py-1">
                    <span>
                      {item.quantity}x {item.product_name}
                    </span>
                    <span>${Number(item.subtotal).toFixed(2)}</span>
                  </div>
                ))}
                <div className="flex justify-between font-bold text-lg border-t mt-2 pt-2">
                  <span>Total</span>
                  <span>${Number(order.total).toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <div className="text-center">
        <Link href="/menu">
          <Button>Volver al Menú</Button>
        </Link>
      </div>
    </div>
  )
}

export default function ConfirmacionPage() {
  return (
    <Suspense
      fallback={
        <div className="container px-4 py-16 text-center">
          <div className="animate-pulse">
            <div className="h-16 w-16 mx-auto bg-muted rounded-full mb-4" />
            <div className="h-8 w-48 mx-auto bg-muted rounded mb-2" />
          </div>
        </div>
      }
    >
      <ConfirmacionContent />
    </Suspense>
  )
}
