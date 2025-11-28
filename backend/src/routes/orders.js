import { Router } from "express"
import { sql } from "../db.js"

const router = Router()

// GET /api/orders - Listar pedidos
router.get("/", async (req, res) => {
  try {
    const { status } = req.query
    let orders

    if (status) {
      orders = await sql`
        SELECT o.*, t.table_number 
        FROM orders o
        LEFT JOIN tables t ON o.table_id = t.id
        WHERE o.status = ${status}
        ORDER BY o.created_at DESC
      `
    } else {
      orders = await sql`
        SELECT o.*, t.table_number 
        FROM orders o
        LEFT JOIN tables t ON o.table_id = t.id
        ORDER BY o.created_at DESC
        LIMIT 50
      `
    }

    // Obtener items para cada pedido
    for (const order of orders) {
      const items = await sql`
        SELECT oi.*, p.name as product_name
        FROM order_items oi
        LEFT JOIN products p ON oi.product_id = p.id
        WHERE oi.order_id = ${order.id}
      `
      order.items = items
    }

    res.json(orders)
  } catch (error) {
    console.error("Error fetching orders:", error)
    res.status(500).json({ error: "Error al obtener pedidos" })
  }
})

// GET /api/orders/:id - Obtener pedido por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const orders = await sql`
      SELECT o.*, t.table_number 
      FROM orders o
      LEFT JOIN tables t ON o.table_id = t.id
      WHERE o.id = ${id}
    `

    if (orders.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }

    const order = orders[0]
    const items = await sql`
      SELECT oi.*, p.name as product_name
      FROM order_items oi
      LEFT JOIN products p ON oi.product_id = p.id
      WHERE oi.order_id = ${id}
    `
    order.items = items

    res.json(order)
  } catch (error) {
    console.error("Error fetching order:", error)
    res.status(500).json({ error: "Error al obtener pedido" })
  }
})

// POST /api/orders - Crear pedido
router.post("/", async (req, res) => {
  try {
    const { table_id, customer_name, customer_phone, order_type, notes, items } = req.body

    // Calcular total
    let total = 0
    for (const item of items) {
      total += item.unit_price * item.quantity
    }

    // Crear pedido
    const orderResult = await sql`
      INSERT INTO orders (table_id, customer_name, customer_phone, order_type, notes, total)
      VALUES (${table_id || null}, ${customer_name}, ${customer_phone}, ${order_type || "dine_in"}, ${notes}, ${total})
      RETURNING *
    `
    const order = orderResult[0]

    // Insertar items
    for (const item of items) {
      await sql`
        INSERT INTO order_items (order_id, product_id, quantity, unit_price, subtotal, notes)
        VALUES (${order.id}, ${item.product_id}, ${item.quantity}, ${item.unit_price}, ${item.unit_price * item.quantity}, ${item.notes || null})
      `
    }

    // Actualizar estado de la mesa si es dine_in
    if (table_id && order_type === "dine_in") {
      await sql`UPDATE tables SET status = 'occupied' WHERE id = ${table_id}`
    }

    res.status(201).json(order)
  } catch (error) {
    console.error("Error creating order:", error)
    res.status(500).json({ error: "Error al crear pedido" })
  }
})

// PUT /api/orders/:id - Actualizar estado del pedido
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body

    const result = await sql`
      UPDATE orders 
      SET status = ${status}, updated_at = NOW()
      WHERE id = ${id}
      RETURNING *
    `

    if (result.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" })
    }

    const order = result[0]

    // Si el pedido se entrega o cancela, liberar la mesa
    if ((status === "delivered" || status === "cancelled") && order.table_id) {
      await sql`UPDATE tables SET status = 'available' WHERE id = ${order.table_id}`
    }

    res.json(order)
  } catch (error) {
    console.error("Error updating order:", error)
    res.status(500).json({ error: "Error al actualizar pedido" })
  }
})

export default router
