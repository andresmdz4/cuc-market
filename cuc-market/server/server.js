import express from "express"
import cors from "cors"
import dotenv from "dotenv"

import connectDB from "./config/db.js"

import authRoutes from "./routes/authRoutes.js"
import productRoutes from "./routes/productRoutes.js"
import adminRoutes from "./routes/adminRoutes.js"
// CONFIG
dotenv.config()

// DATABASE
connectDB()

// APP
const app = express()

// MIDDLEWARES
app.use(cors())
app.use(express.json())

// STATIC FOLDER
app.use(
  "/uploads",
  express.static("uploads")
)

// ROUTES
app.use("/api/auth", authRoutes)
app.use("/api/products", productRoutes)
app.use( "/api/admin",adminRoutes)

// ROOT
app.get("/", (req, res) => {

  res.json({

    message: "CUC Market API funcionando 🚀"

  })

})

// PORT
const PORT = process.env.PORT || 5000

// SERVER
app.listen(PORT, () => {

  console.log(
    `Servidor corriendo en puerto ${PORT}`
  )

})