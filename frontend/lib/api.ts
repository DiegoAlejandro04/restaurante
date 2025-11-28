// Configuración de la API
const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api"

// Fetcher para SWR
export const fetcher = async (endpoint: string) => {
  const res = await fetch(`${API_URL}${endpoint}`)
  if (!res.ok) {
    throw new Error("Error al obtener datos")
  }
  return res.json()
}

// Funciones de API
export const api = {
  // Categorías
  getCategories: () => fetcher("/categories"),

  // Productos
  getProducts: (categoryId?: number) => fetcher(categoryId ? `/products?category=${categoryId}` : "/products"),
  getFeaturedProducts: () => fetcher("/products?featured=true"),
  getProduct: (id: number) => fetcher(`/products/${id}`),

  // Mesas
  getTables: (status?: string) => fetcher(status ? `/tables?status=${status}` : "/tables"),

  // Pedidos
  getOrders: (status?: string) => fetcher(status ? `/orders?status=${status}` : "/orders"),
  getOrder: (id: number) => fetcher(`/orders/${id}`),

  createOrder: async (orderData: any) => {
    const res = await fetch(`${API_URL}/orders`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderData),
    })
    if (!res.ok) throw new Error("Error al crear pedido")
    return res.json()
  },

  updateOrderStatus: async (id: number, status: string) => {
    const res = await fetch(`${API_URL}/orders/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ status }),
    })
    if (!res.ok) throw new Error("Error al actualizar pedido")
    return res.json()
  },
}

export { API_URL }
