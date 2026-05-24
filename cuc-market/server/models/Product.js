import mongoose from "mongoose"

const productSchema = mongoose.Schema(

  {

    user: {

      type: mongoose.Schema.Types.ObjectId,

      required: true,

      ref: "User"

    },

    name: {

      type: String,

      required: true,

      trim: true

    },

    price: {

      type: Number,

      required: true

    },

    description: {

      type: String,

      default: ""

    },

    category: {

      type: String,

      required: true

    },

    image: {

      type: String,

      required: true

    },

    businessName: {

      type: String,

      default: ""

    },

    whatsapp: {

      type: String,

      default: ""

    },

    instagram: {

      type: String,

      default: ""

    },

    // LIKES
    likes: [

      {

        type: mongoose.Schema.Types.ObjectId,

        ref: "User"

      }

    ]

  },

  {

    timestamps: true

  }

)

const Product = mongoose.model(
  "Product",
  productSchema
)

export default Product