import { Router } from "express"
import { sql } from "../db.js"

const router = Router()

// GET /api/categories - Listar todas las categorías
router.get("/", async (req, res) => {
  try {
    const categories = await sql`
      SELECT * FROM categories 
      WHERE active = true 
      ORDER BY name
    `
    res.json(categories)
  } catch (error) {
    console.error("Error fetching categories:", error)
    res.status(500).json({ error: "Error al obtener categorías" })
  }
})

// POST /api/categories - Crear categoría
router.post("/", async (req, res) => {
  try {
    const { name, description, image_url } = req.body
    const result = await sql`
      INSERT INTO categories (name, description, image_url)
      VALUES (${name}, ${description}, ${image_url})
      RETURNING *
    `
    res.status(201).json(result[0])
  } catch (error) {
    console.error("Error creating category:", error)
    res.status(500).json({ error: "Error al crear categoría" })
  }
})

export default router
