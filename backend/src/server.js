import express from "express"
import cors from "cors"
import dotenv from "dotenv"

// Importar rutas
import categoriesRouter from "./routes/categories.js"
import productsRouter from "./routes/products.js"
import tablesRouter from "./routes/tables.js"
import ordersRouter from "./routes/orders.js"

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

// Middleware
app.use(express.json())
app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:3000",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
)

// Ruta de salud
app.get("/api/health", (req, res) => {
  res.json({ status: "ok", message: "API funcionando correctamente" })
})

// Rutas de la API
app.use("/api/categories", categoriesRouter)
app.use("/api/products", productsRouter)
app.use("/api/tables", tablesRouter)
app.use("/api/orders", ordersRouter)

// Manejo de errores global
app.use((err, req, res, next) => {
  console.error("Error:", err)
  res.status(500).json({ error: "Error interno del servidor" })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`
  ╔════════════════════════════════════════════╗
  ║   🍽️  API Restaurante funcionando          ║
  ║   Puerto: ${PORT}                            ║
  ║   URL: http://localhost:${PORT}              ║
  ╚════════════════════════════════════════════╝
  `)
})
