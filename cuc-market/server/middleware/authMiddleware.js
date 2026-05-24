import jwt from "jsonwebtoken"

import User from "../models/User.js"

export const protect = async (
  req,
  res,
  next
) => {

  let token

  // VALIDAR TOKEN
  if (

    req.headers.authorization &&

    req.headers.authorization.startsWith(
      "Bearer"
    )

  ) {

    try {

      // OBTENER TOKEN
      token =
        req.headers.authorization.split(
          " "
        )[1]

      // VERIFY
      const decoded =
        jwt.verify(

          token,

          process.env.JWT_SECRET

        )

      // USER
      req.user =
        await User.findById(
          decoded.id
        ).select("-password")

      next()

    } catch (error) {

      return res.status(401).json({

        message:
          "No autorizado"

      })

    }

  }

  // NO TOKEN
  if (!token) {

    return res.status(401).json({

      message:
        "No hay token"

    })

  }

}