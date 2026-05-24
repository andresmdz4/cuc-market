import express from "express"

import User from "../models/User.js"
import Product from "../models/Product.js"
import {
  protect
} from "../middleware/authMiddleware.js"
import adminMiddleware from "../middleware/adminMiddleware.js"

const router = express.Router()

// =====================================
// USERS
// =====================================

router.get(
  "/users",
  async (req, res) => {

    try {

      const users =
        await User.find()

      res.json(users)

    } catch (error) {

      res.status(500).json({
        message:
          "Error obteniendo usuarios"
      })

    }

  }
)

// =====================================
// PRODUCTS
// =====================================

router.get(
  "/products",
  async (req, res) => {

    try {

      const products =
        await Product.find()
        .populate(
          "user",
          "name email"
        )

      res.json(products)

    } catch (error) {

      res.status(500).json({
        message:
          "Error obteniendo productos"
      })

    }

  }
)

// =====================================
// DELETE PRODUCT
// =====================================

router.delete(
  "/product/:id",
  async (req, res) => {

    try {

      const product =
        await Product.findById(
          req.params.id
        )

      if (!product) {

        return res.status(404).json({
          message:
            "Producto no encontrado"
        })

      }

      await product.deleteOne()

      res.json({
        message:
          "Producto eliminado"
      })

    } catch (error) {

      res.status(500).json({
        message:
          "Error eliminando producto"
      })

    }

  }
)

export default router