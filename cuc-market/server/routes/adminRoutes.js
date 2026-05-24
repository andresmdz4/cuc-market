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
  protect,
  adminMiddleware,
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
  protect,
  adminMiddleware,
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
  protect,
  adminMiddleware,
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

// =====================================
// DELETE USER
// =====================================

router.delete(
  "/user/:id",
  protect,
  adminMiddleware,
  async (req, res) => {

    try {

      // NO ELIMINARSE A SI MISMO
      if (

        req.user._id.toString() ===
        req.params.id

      ) {

        return res.status(400).json({

          message:
            "No puedes eliminarte a ti mismo"

        })

      }

      const user =
        await User.findById(
          req.params.id
        )

      if (!user) {

        return res.status(404).json({

          message:
            "Usuario no encontrado"

        })

      }

      // ELIMINAR PRODUCTOS
      await Product.deleteMany({

        user: user._id

      })

      // ELIMINAR USER
      await user.deleteOne()

      res.json({

        message:
          "Usuario eliminado"

      })

    } catch (error) {

      res.status(500).json({

        message:
          "Error eliminando usuario"

      })

    }

  }
)

export default router