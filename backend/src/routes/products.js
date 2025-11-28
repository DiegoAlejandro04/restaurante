import { Router } from "express"
import { sql } from "../db.js"

const router = Router()

// GET /api/products - Listar productos
router.get("/", async (req, res) => {
  try {
    const { category, featured } = req.query
    let products

    if (category) {
      products = await sql`
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.available = true AND p.category_id = ${category}
        ORDER BY p.name
      `
    } else if (featured === "true") {
      products = await sql`
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.available = true AND p.featured = true
        ORDER BY p.name
      `
    } else {
      products = await sql`
        SELECT p.*, c.name as category_name 
        FROM products p
        LEFT JOIN categories c ON p.category_id = c.id
        WHERE p.available = true
        ORDER BY c.name, p.name
      `
    }

    res.json(products)
  } catch (error) {
    console.error("Error fetching products:", error)
    res.status(500).json({ error: "Error al obtener productos" })
  }
})

// GET /api/products/:id - Obtener producto por ID
router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const result = await sql`
      SELECT p.*, c.name as category_name 
      FROM products p
      LEFT JOIN categories c ON p.category_id = c.id
      WHERE p.id = ${id}
    `
    if (result.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(result[0])
  } catch (error) {
    console.error("Error fetching product:", error)
    res.status(500).json({ error: "Error al obtener producto" })
  }
})

// POST /api/products - Crear producto
router.post("/", async (req, res) => {
  try {
    const { category_id, name, description, price, image_url, featured } = req.body
    const result = await sql`
      INSERT INTO products (category_id, name, description, price, image_url, featured)
      VALUES (${category_id}, ${name}, ${description}, ${price}, ${image_url}, ${featured || false})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error("Error creating product:", error)
    res.status(500).json({ error: "Error al crear producto" })
  }
})

// PUT /api/products/:id - Actualizar producto
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { category_id, name, description, price, image_url, featured, available } = req.body
    const result = await sql`
      UPDATE products
      SET category_id = ${category_id},
          name = ${name},
          description = ${description},
          price = ${price},
          image_url = ${image_url},
          featured = ${featured},
          available = ${available}
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      return res.status(404).json({ error: "Producto no encontrado" })
    }
    res.json(result[0])
  } catch (error) {
    console.error("Error updating product:", error)
    res.status(500).json({ error: "Error al actualizar producto" })
  }
})

// DELETE /api/products/:id - Eliminar producto
router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params
    await sql`DELETE FROM products WHERE id = ${id}`
    res.json({ message: "Producto eliminado" })
  } catch (error) {
    console.error("Error deleting product:", error)
    res.status(500).json({ error: "Error al eliminar producto" })
  }
})

export default router
