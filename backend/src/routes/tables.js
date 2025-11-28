import { Router } from "express"
import { sql } from "../db.js"

const router = Router()

// GET /api/tables - Listar mesas
router.get("/", async (req, res) => {
  try {
    const { status } = req.query
    let tables

    if (status) {
      tables = await sql`
        SELECT * FROM tables 
        WHERE status = ${status}
        ORDER BY table_number
      `
    } else {
      tables = await sql`
        SELECT * FROM tables 
        ORDER BY table_number
      `
    }

    res.json(tables)
  } catch (error) {
    console.error("Error fetching tables:", error)
    res.status(500).json({ error: "Error al obtener mesas" })
  }
})

// PUT /api/tables/:id - Actualizar estado de mesa
router.put("/:id", async (req, res) => {
  try {
    const { id } = req.params
    const { status } = req.body
    const result = await sql`
      UPDATE tables SET status = ${status}
      WHERE id = ${id}
      RETURNING *
    `
    if (result.length === 0) {
      return res.status(404).json({ error: "Mesa no encontrada" })
    }
    res.json(result[0])
  } catch (error) {
    console.error("Error updating table:", error)
    res.status(500).json({ error: "Error al actualizar mesa" })
  }
})

export default router
