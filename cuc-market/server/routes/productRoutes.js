import express from "express"
import upload from "../middleware/uploadMiddleware.js"

import Product from "../models/Product.js"

const router = express.Router()

// CREATE PRODUCT
router.post(

  "/",

  upload.single("image"),

  async (req, res) => {

    try {

      const {
        name,
        price,
        description,
        category,
        businessName,
        userId,
        whatsapp,
        instagram
      } = req.body

      // VALIDATIONS
      if (
        !name ||
        !price ||
        !category
      ) {

        return res.status(400).json({

          message:
            "Completa los campos obligatorios"

        })

      }

      // IMAGE REQUIRED
      if (!req.file) {

        return res.status(400).json({

          message:
            "Debes subir una imagen"

        })

      }

      // CONTACT REQUIRED
      if (!whatsapp && !instagram) {

        return res.status(400).json({

          message:
            "Debes agregar WhatsApp o Instagram"

        })

      }

      // CREATE
      const product = await Product.create({

        user: userId,

        name,

        price,

        description,

        category,

        businessName,

        whatsapp,

        instagram,

        image: req.file.path

      })

      res.status(201).json(product)

    } catch (error) {

      console.log(error)

      res.status(500).json({

        message: "Error creando producto"

      })

    }

  }

)

// GET PRODUCTS
router.get("/", async (req, res) => {

  try {

    const products = await Product.find()

      .populate("user", "name email")

      .sort({ createdAt: -1 })

    res.json(products)

  } catch (error) {

    res.status(500).json({

      message: "Error obteniendo productos"

    })

  }

})

// GET SINGLE PRODUCT
router.get("/:id", async (req, res) => {

  try {

    const product = await Product.findById(
      req.params.id
    ).populate(
      "user",
      "name email"
    )

    res.json(product)

  } catch (error) {

    res.status(500).json({

      message:
        "Producto no encontrado"

    })

  }

})

// LIKE PRODUCT
router.put("/:id/like", async (req, res) => {

  try {

    const { userId } = req.body

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

    // CHECK LIKE
    const alreadyLiked =
      product.likes.some(

        (id) =>

          id.toString() ===
          userId

      )

    // REMOVE LIKE
    if (alreadyLiked) {

      product.likes =
        product.likes.filter(

          (id) =>

            id.toString() !==
            userId

        )

    }

    // ADD LIKE
    else {

      product.likes.push(userId)

    }

    // SAVE
    await product.save()

    // UPDATED PRODUCT
    const updatedProduct =

      await Product.findById(
        req.params.id
      ).populate(
        "user",
        "name email"
      )

    res.json(updatedProduct)

  } catch (error) {

    console.log(error)

    res.status(500).json({

      message:
        "Error en likes"

    })

  }

})

// DELETE PRODUCT
router.delete("/:id", async (req, res) => {

  try {

    await Product.findByIdAndDelete(
      req.params.id
    )

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

})

export default router