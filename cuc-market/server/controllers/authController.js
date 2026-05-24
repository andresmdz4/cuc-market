import bcrypt from "bcryptjs"
import jwt from "jsonwebtoken"

import User from "../models/User.js"
import Product from "../models/Product.js"

// GENERAR JWT
const generateToken = (id) => {

  return jwt.sign(

    { id },

    process.env.JWT_SECRET,

    {
      expiresIn: "30d"
    }

  )

}

// =====================================
// REGISTER
// =====================================

export const registerUser = async (
  req,
  res
) => {

  try {

    const {
      name,
      email,
      password
    } = req.body

    // VALIDAR CAMPOS
    if (
      !name ||
      !email ||
      !password
    ) {

      return res.status(400).json({
        message:
          "Todos los campos son obligatorios"
      })

    }

    // VALIDAR PASSWORD
    const hasUppercase =
      /[A-Z]/.test(password)

    const hasLowercase =
      /[a-z]/.test(password)

    const hasNumber =
      /[0-9]/.test(password)

    if (

      password.length < 6 ||

      !hasUppercase ||

      !hasLowercase ||

      !hasNumber

    ) {

      return res.status(400).json({

        message:
          "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número"

      })

    }

    // VALIDAR EMAIL EXISTENTE
    const existingUser =
      await User.findOne({
        email
      })

    if (existingUser) {

      return res.status(400).json({
        message:
          "El correo ya está registrado"
      })

    }

    // HASH PASSWORD
    const salt =
      await bcrypt.genSalt(10)

    const hashedPassword =
      await bcrypt.hash(
        password,
        salt
      )

    // CREAR USUARIO
    const user = await User.create({

      name,
      email,
      password: hashedPassword

    })

    // RESPUESTA
    res.status(201).json({

      message:
        "Usuario registrado correctamente",

      token:
        generateToken(user._id),

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        isAdmin: user.isAdmin

      }

    })

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}



// =====================================
// LOGIN
// =====================================

export const loginUser = async (
  req,
  res
) => {

  try {

    const {
      email,
      password
    } = req.body

    // BUSCAR USUARIO
    const user =
      await User.findOne({
        email
      })

    // VALIDAR USUARIO
    if (!user) {

      return res.status(400).json({
        message:
          "Correo no encontrado"
      })

    }

    // VALIDAR PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Contraseña incorrecta"
      })

    }

    // RESPUESTA
    res.status(200).json({

      message:
        "Login exitoso",

      token:
        generateToken(user._id),

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        isAdmin: user.isAdmin

      }

    })

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}



// =====================================
// UPDATE PROFILE
// =====================================

export const updateProfile = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      )

    if (!user) {

      return res.status(404).json({
        message:
          "Usuario no encontrado"
      })

    }

    const {
      name,
      email,
      password
    } = req.body

    // VALIDAR PASSWORD
    const isMatch =
      await bcrypt.compare(
        password,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Contraseña incorrecta"
      })

    }

    // ACTUALIZAR
    user.name =
      name || user.name

    user.email =
      email || user.email

    await user.save()

    res.status(200).json({

      message:
        "Perfil actualizado",

      user: {

        id: user._id,

        name: user.name,

        email: user.email,

        isAdmin: user.isAdmin

      }

    })

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}



// =====================================
// CHANGE PASSWORD
// =====================================

export const changePassword = async (
  req,
  res
) => {

  try {

    const user =
      await User.findById(
        req.user._id
      )

    if (!user) {

      return res.status(404).json({
        message:
          "Usuario no encontrado"
      })

    }

    const {
      currentPassword,
      newPassword
    } = req.body

    // VALIDAR ACTUAL
    const isMatch =
      await bcrypt.compare(
        currentPassword,
        user.password
      )

    if (!isMatch) {

      return res.status(400).json({
        message:
          "Contraseña actual incorrecta"
      })

    }

    // NUEVA PASSWORD
    const salt =
      await bcrypt.genSalt(10)

    user.password =
      await bcrypt.hash(
        newPassword,
        salt
      )

    await user.save()

    res.status(200).json({
      message:
        "Contraseña actualizada"
    })

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}



// =====================================
// DELETE ACCOUNT
// =====================================

export const deleteAccount = async (
  req,
  res
) => {

  try {

    // ELIMINAR PRODUCTOS
    await Product.deleteMany({
      user: req.user._id
    })

    // ELIMINAR USUARIO
    await User.findByIdAndDelete(
      req.user._id
    )

    res.status(200).json({
      message:
        "Cuenta eliminada correctamente"
    })

  } catch (error) {

    res.status(500).json({
      message:
        "Error del servidor"
    })

  }

}