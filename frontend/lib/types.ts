// Tipos para la aplicación

export interface Category {
  id: number
  name: string
  description: string | null
  image_url: string | null
  active: boolean
  created_at: string
}

export interface Product {
  id: number
  category_id: number | null
  name: string
  description: string | null
  price: number
  image_url: string | null
  available: boolean
  featured: boolean
  created_at: string
  category_name?: string
}

export interface Table {
  id: number
  table_number: string
  capacity: number
  status: "available" | "occupied" | "reserved"
  created_at: string
}

export interface Order {
  id: number
  table_id: number | null
  customer_name: string | null
  customer_phone: string | null
  order_type: "dine_in" | "takeout" | "delivery"
  status: "pending" | "preparing" | "ready" | "delivered" | "cancelled"
  notes: string | null
  total: number
  created_at: string
  updated_at: string
  table_number?: string
  items?: OrderItem[]
}

export interface OrderItem {
  id: number
  order_id: number
  product_id: number | null
  quantity: number
  unit_price: number
  subtotal: number
  notes: string | null
  created_at: string
  product_name?: string
}

export interface CartItem {
  product: Product
  quantity: number
  notes?: string
}
