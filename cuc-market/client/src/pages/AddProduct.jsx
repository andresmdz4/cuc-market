import { useState } from "react"
import { useNavigate } from "react-router-dom"

import axios from "axios"

import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"

function AddProduct() {

  // NAVIGATION
  const navigate = useNavigate()

  // USER INFO
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  // STATES
  const [name, setName] = useState("")
  const [price, setPrice] = useState("")
  const [description, setDescription] =
    useState("")
  const [category, setCategory] =
    useState("")
  const [businessName, setBusinessName] =
    useState("")

  // CONTACTS
  const [countryCode, setCountryCode] =
    useState("57")

  const [phone, setPhone] =
    useState("")

  const [instagram, setInstagram] =
    useState("")

  // IMAGE
  const [image, setImage] = useState(null)

  // PREVIEW
  const [preview, setPreview] = useState("")

  // ERROR
  const [error, setError] = useState("")

  // FIELD ERRORS
  const [fieldErrors, setFieldErrors] =
    useState({})

  // LOADING
  const [loading, setLoading] =
    useState(false)

  // FORMAT PRICE
  const formatPrice = (value) => {

    const number = value.replace(/\D/g, "")

    return new Intl.NumberFormat(
      "es-CO"
    ).format(number)

  }

  // HANDLE IMAGE
  const handleImage = (e) => {

    const file = e.target.files[0]

    if (file) {

      setImage(file)

      setPreview(
        URL.createObjectURL(file)
      )

      setFieldErrors((prev) => ({
        ...prev,
        image: false
      }))

    }

  }

  // VALIDATE
  const validateForm = () => {

    const errors = {}

    if (!name)
      errors.name = true

    if (!price)
      errors.price = true

    if (!category)
      errors.category = true

    if (!image)
      errors.image = true

    if (!phone && !instagram)
      errors.contact = true

    setFieldErrors(errors)

    if (
      Object.keys(errors).length > 0
    ) {

      setError(
        "Completa los campos obligatorios"
      )

      return false

    }

    return true

  }

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    const isValid = validateForm()

    if (!isValid) return

    try {

      setLoading(true)

      const formData = new FormData()

      formData.append("name", name)

      formData.append(
        "price",
        price.replace(/\./g, "")
      )

      formData.append(
        "description",
        description
      )

      formData.append(
        "category",
        category
      )

      formData.append(
        "businessName",
        businessName
      )

      formData.append(

        "whatsapp",

        phone
          ? `${countryCode}${phone}`
          : ""

      )

      formData.append(
        "instagram",
        instagram
      )

      formData.append(

        "userId",

        userInfo?.user?._id ||

        userInfo?.user?.id ||

        userInfo?._id ||

        userInfo?.id

      )

      formData.append(
        "image",
        image
      )

      await axios.post(

        "http://localhost:5000/api/products",

        formData,

        {

          headers: {

            "Content-Type":
              "multipart/form-data"

          }

        }

      )

      navigate("/products")

    } catch (error) {

      console.log(error)

      setError(

        error.response?.data?.message ||

        "Error creando producto"

      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <PageTransition>

      <div className="min-h-screen bg-gray-100">

        <Navbar />

        <section className="flex items-center justify-center px-6 py-16">

          <div className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl p-10">

            {/* TITLE */}
            <h1 className="text-4xl font-black text-black text-center">

              Publicar Producto

            </h1>

            <p className="text-gray-600 text-center mt-4">

              Comparte tu tienda con estudiantes de la CUC

            </p>

            {/* ERROR */}
            {error && (

              <div className="bg-red-100 border border-red-300 text-red-700 p-4 rounded-2xl mt-6">

                {error}

              </div>

            )}

            {/* FORM */}
            <form
              onSubmit={handleSubmit}
              className="mt-10 space-y-5"
            >

              {/* NAME */}
              <input
                type="text"
                placeholder="Nombre del producto *"
                value={name}
                onChange={(e) =>
                  setName(e.target.value)
                }
                className={`w-full px-5 py-4 rounded-2xl border outline-none
                ${
                  fieldErrors.name
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              />

              {/* PRICE */}
              <div className="relative">

                <span className="absolute left-5 top-1/2 -translate-y-1/2 text-gray-500 font-semibold">

                  $

                </span>

                <input
                  type="text"
                  placeholder="3.200 *"
                  value={price}
                  onChange={(e) =>
                    setPrice(
                      formatPrice(
                        e.target.value
                      )
                    )
                  }
                  className={`w-full pl-10 pr-5 py-4 rounded-2xl border outline-none
                  ${
                    fieldErrors.price
                      ? "border-red-500 bg-red-50"
                      : "border-gray-200"
                  }`}
                />

              </div>

              {/* CATEGORY */}
              <select
                value={category}
                onChange={(e) =>
                  setCategory(e.target.value)
                }
                className={`w-full px-5 py-4 rounded-2xl border outline-none
                ${
                  fieldErrors.category
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >

                <option value="">
                  Selecciona una categoría *
                </option>

                <option value="Comida">
                  Comida
                </option>

                <option value="Postres">
                  Postres
                </option>

                <option value="Ropa">
                  Ropa
                </option>

                <option value="Tecnología">
                  Tecnología
                </option>

                <option value="Otro">
                  Otro
                </option>

              </select>

              {/* STORE */}
              <input
                type="text"
                placeholder="Nombre de la tienda"
                value={businessName}
                onChange={(e) =>
                  setBusinessName(e.target.value)
                }
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none"
              />

              {/* CONTACTS */}
              <div
                className={`space-y-4 p-5 rounded-3xl border
                ${
                  fieldErrors.contact
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200 bg-gray-50"
                }`}
              >

                <p className="font-semibold text-black">

                  Agrega al menos un dato de contacto *

                </p>

                {/* WHATSAPP */}
                <div className="flex gap-3">

                  <select
                    value={countryCode}
                    onChange={(e) =>
                      setCountryCode(e.target.value)
                    }
                    className="w-32 px-4 py-4 rounded-2xl border border-gray-200 outline-none"
                  >

                    <option value="57">
                      🇨🇴 +57
                    </option>

                    <option value="1">
                      🇺🇸 +1
                    </option>

                    <option value="34">
                      🇪🇸 +34
                    </option>

                    <option value="52">
                      🇲🇽 +52
                    </option>

                    <option value="54">
                      🇦🇷 +54
                    </option>

                  </select>

                  <input
                    type="text"
                    placeholder="WhatsApp"
                    value={phone}
                    onChange={(e) =>
                      setPhone(
                        e.target.value.replace(
                          /\D/g,
                          ""
                        )
                      )
                    }
                    className="flex-1 px-5 py-4 rounded-2xl border border-gray-200 outline-none"
                  />

                </div>

                {/* INSTAGRAM */}
                <input
                  type="text"
                  placeholder="Instagram (Ej: cucmarket)"
                  value={instagram}
                  onChange={(e) =>
                    setInstagram(
                      e.target.value.replace(
                        "@",
                        ""
                      )
                    )
                  }
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none"
                />

              </div>

              {/* IMAGE */}
              <div
                className={`rounded-3xl border p-5
                ${
                  fieldErrors.image
                    ? "border-red-500 bg-red-50"
                    : "border-gray-200"
                }`}
              >

                <label className="block mb-3 font-semibold text-black">

                  Imagen del producto *

                </label>

                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImage}
                  className="w-full"
                />

              </div>

              {/* PREVIEW */}
              {preview && (

                <img
                  src={preview}
                  alt="Preview"
                  className="w-full h-64 object-cover rounded-2xl border border-gray-200"
                />

              )}

              {/* DESCRIPTION */}
              <div>

                <textarea
                  placeholder="Descripción del producto (Opcional)"
                  value={description}
                  onChange={(e) =>
                    setDescription(e.target.value)
                  }
                  rows="5"
                  maxLength={500}
                  className="w-full px-5 py-4 rounded-2xl border border-gray-200 outline-none resize-none"
                />

                <p className="text-sm text-gray-400 text-right mt-2">

                  {description.length}/500

                </p>

              </div>

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A3161A] text-white py-4 rounded-2xl hover:bg-[#8d1316] transition font-semibold disabled:opacity-60"
              >

                {loading
                  ? "Publicando..."
                  : "Publicar Producto"}

              </button>

            </form>

          </div>

        </section>

      </div>

    </PageTransition>

  )

}

export default AddProduct