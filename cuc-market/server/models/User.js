import mongoose from "mongoose"

// ESQUEMA USUARIO
const userSchema = new mongoose.Schema({

  // NOMBRE
  name: {
    type: String,
    required: true,
    trim: true
  },

  // EMAIL
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true
  },

  // PASSWORD
  password: {
    type: String,
    required: true,
    minlength: 6
  },

  // ADMIN
  isAdmin: {

    type: Boolean,

    default: false

  }

}, {

  timestamps: true

})

// EXPORTAR MODELO
const User = mongoose.model(
  "User",
  userSchema
)

export default User