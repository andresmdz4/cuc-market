import User from "../models/User.js"

const adminMiddleware = async (
  req,
  res,
  next
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      )

    // NO EXISTE
    if (!user) {

      return res.status(404).json({
        message:
          "Usuario no encontrado"
      })

    }

    // NO ADMIN
    if (!user.isAdmin) {

      return res.status(403).json({
        message:
          "Acceso denegado"
      })

    }

    next()

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}

export default adminMiddleware