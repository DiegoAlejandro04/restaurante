"use client"

import useSWR from "swr"
import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { fetcher, api } from "@/lib/api"
import { Clock, ChefHat, CheckCircle2, XCircle, RefreshCw } from "lucide-react"
import type { Order } from "@/lib/types"

const statusConfig = {
  pending: { label: "Pendiente", color: "bg-yellow-100 text-yellow-800", icon: Clock },
  preparing: { label: "Preparando", color: "bg-blue-100 text-blue-800", icon: ChefHat },
  ready: { label: "Listo", color: "bg-green-100 text-green-800", icon: CheckCircle2 },
  delivered: { label: "Entregado", color: "bg-gray-100 text-gray-800", icon: CheckCircle2 },
  cancelled: { label: "Cancelado", color: "bg-red-100 text-red-800", icon: XCircle },
}

export default function AdminPage() {
  const [filter, setFilter] = useState<string | null>(null)
  const {
    data: orders,
    mutate,
    isLoading,
  } = useSWR<Order[]>(filter ? `/orders?status=${filter}` : "/orders", fetcher, { refreshInterval: 10000 })

  const updateStatus = async (orderId: number, newStatus: string) => {
    try {
      await api.updateOrderStatus(orderId, newStatus)
      mutate()
    } catch (error) {
      console.error("Error updating order:", error)
      alert("Error al actualizar el pedido")
    }
  }

  const getNextStatus = (currentStatus: string): string | null => {
    const flow: Record<string, string> = {
      pending: "preparing",
      preparing: "ready",
      ready: "delivered",
    }
    return flow[currentStatus] || null
  }

  return (
    <div className="container px-4 py-8">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="font-serif text-3xl font-bold">Panel de Administración</h1>
          <p className="text-muted-foreground">Gestiona los pedidos del restaurante</p>
        </div>
        <Button variant="outline" onClick={() => mutate()}>
          <RefreshCw className="h-4 w-4 mr-2" />
          Actualizar
        </Button>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-2 mb-6">
        <Button variant={filter === null ? "default" : "outline"} size="sm" onClick={() => setFilter(null)}>
          Todos
        </Button>
        {Object.entries(statusConfig).map(([key, config]) => (
          <Button key={key} variant={filter === key ? "default" : "outline"} size="sm" onClick={() => setFilter(key)}>
            {config.label}
          </Button>
        ))}
      </div>

      {/* Orders Grid */}
      {isLoading ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-6 bg-muted rounded w-1/2" />
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : orders && orders.length > 0 ? (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {orders.map((order) => {
            const status = statusConfig[order.status]
            const StatusIcon = status.icon
            const nextStatus = getNextStatus(order.status)

            return (
              <Card key={order.id} className="overflow-hidden">
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">Pedido #{order.id}</CardTitle>
                    <Badge className={status.color}>
                      <StatusIcon className="h-3 w-3 mr-1" />
                      {status.label}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{new Date(order.created_at).toLocaleString("es")}</p>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="text-sm">
                    <p>
                      <span className="font-medium">Cliente:</span> {order.customer_name}
                    </p>
                    <p>
                      <span className="font-medium">Tel:</span> {order.customer_phone}
                    </p>
                    {order.table_number && (
                      <p>
                        <span className="font-medium">Mesa:</span> {order.table_number}
                      </p>
                    )}
                    <p>
                      <span className="font-medium">Tipo:</span>{" "}
                      {order.order_type === "dine_in"
                        ? "En restaurante"
                        : order.order_type === "takeout"
                          ? "Para llevar"
                          : "Delivery"}
                    </p>
                  </div>

                  {order.items && order.items.length > 0 && (
                    <div className="border-t pt-2">
                      <p className="font-medium text-sm mb-1">Productos:</p>
                      {order.items.map((item) => (
                        <p key={item.id} className="text-sm text-muted-foreground">
                          {item.quantity}x {item.product_name}
                        </p>
                      ))}
                    </div>
                  )}

                  <div className="flex items-center justify-between border-t pt-3">
                    <span className="font-bold text-lg">${Number(order.total).toFixed(2)}</span>
                    <div className="flex gap-2">
                      {nextStatus && (
                        <Button size="sm" onClick={() => updateStatus(order.id, nextStatus)}>
                          {nextStatus === "preparing" ? "Preparar" : nextStatus === "ready" ? "Listo" : "Entregar"}
                        </Button>
                      )}
                      {order.status === "pending" && (
                        <Button size="sm" variant="destructive" onClick={() => updateStatus(order.id, "cancelled")}>
                          Cancelar
                        </Button>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            )
          })}
        </div>
      ) : (
        <div className="text-center py-12">
          <p className="text-muted-foreground">No hay pedidos</p>
        </div>
      )}
    </div>
  )
}
