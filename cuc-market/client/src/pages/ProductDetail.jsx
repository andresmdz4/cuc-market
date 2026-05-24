import { useEffect, useState } from "react"

import { useParams } from "react-router-dom"

import axios from "axios"

import Navbar from "../components/Navbar"

function ProductDetail() {

  const { id } = useParams()

  const [product, setProduct] =
    useState(null)

  // FETCH PRODUCT
  useEffect(() => {

    const fetchProduct = async () => {

      try {

        const { data } =
          await axios.get(

            `http://localhost:5000/api/products/${id}`

          )

        setProduct(data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchProduct()

  }, [id])

  // LOADING
  if (!product) {

    return (

      <div className="
      min-h-screen
      bg-[#f5f5f7]
      ">

        <Navbar />

        <div className="
        flex
        justify-center
        items-center
        h-[80vh]
        text-xl
        font-bold
        text-black
        ">

          Cargando producto...

        </div>

      </div>

    )

  }

  return (

    <div className="
    min-h-screen
    bg-[#f5f5f7]
    ">

      {/* NAVBAR */}
      <Navbar />

      {/* CONTAINER */}
      <div className="
      max-w-7xl
      mx-auto
      px-3
      md:px-8
      py-4
      md:py-10
      ">

        {/* CARD */}
        <div className="
        bg-white
        rounded-[32px]
        overflow-hidden
        shadow-sm
        grid
        grid-cols-1
        lg:grid-cols-2
        ">

          {/* IMAGE */}
          <div className="
          bg-gray-100
          ">

            <img
              src={`http://localhost:5000/${product.image}`}
              alt={product.name}
              className="
              w-full
              aspect-[4/3]
              lg:h-full
              object-cover
              object-top
              "
            />

          </div>

          {/* CONTENT */}
          <div className="
          p-4
          md:p-10
          flex
          flex-col
          justify-between
          ">

            <div>

              {/* CATEGORY */}
              <span className="
              inline-flex
              items-center
              px-3
              py-1.5
              rounded-full
              text-[11px]
              md:text-sm
              font-semibold
              bg-red-50
              text-[#A3161A]
              border
              border-red-100
              mb-4
              ">

                {product.category}

              </span>

              {/* TITLE */}
              <h1 className="
              text-[24px]
              sm:text-[28px]
              md:text-6xl
              font-black
              text-black
              leading-tight
              break-words
              line-clamp-2
              tracking-tight
              ">

                {product.name}

              </h1>

              {/* PRICE */}
              <p className="
              text-[34px]
              sm:text-[38px]
              md:text-6xl
              font-black
              text-[#A3161A]
              mt-4
              break-words
              leading-none
              ">

                $
                {new Intl.NumberFormat(
                  "es-CO"
                ).format(product.price)}

              </p>

              {/* DESCRIPTION */}
              {product.description && (

                <div className="
                mt-6
                ">

                  <h2 className="
                  text-[20px]
                  md:text-3xl
                  font-black
                  text-black
                  mb-2
                  ">

                    Descripción

                  </h2>

                  <p className="
                  text-gray-600
                  text-[14px]
                  md:text-lg
                  leading-relaxed
                  break-words
                  ">

                    {product.description}

                  </p>

                </div>

              )}

              {/* USER */}
              <div className="
              mt-6
              flex
              items-center
              gap-3
              bg-gray-50
              rounded-2xl
              p-3
              ">

                {/* AVATAR */}
                <div className="
                w-11
                h-11
                md:w-14
                md:h-14
                rounded-full
                bg-[#A3161A]
                text-white
                flex
                items-center
                justify-center
                font-black
                text-lg
                shadow-md
                flex-shrink-0
                ">

                  {product.user?.name
                    ?.charAt(0)
                    ?.toUpperCase()}

                </div>

                {/* INFO */}
                <div className="
                min-w-0
                ">

                  <p className="
                  text-[15px]
                  md:text-xl
                  font-black
                  text-black
                  break-words
                  line-clamp-1
                  ">

                    {product.user?.name}

                  </p>

                  <p className="
                  text-gray-500
                  text-[12px]
                  md:text-sm
                  ">

                    Publicado por usuario

                  </p>

                </div>

              </div>

            </div>

            {/* BUTTONS */}
            <div className="
            flex
            flex-col
            sm:flex-row
            gap-3
            mt-7
            ">

              {/* WHATSAPP */}
              {product.whatsapp && (

                <a
                  href={`https://wa.me/${product.whatsapp}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  flex-1
                  h-12
                  text-center
                  bg-green-500
                  hover:bg-green-600
                  transition
                  text-white
                  rounded-2xl
                  text-[14px]
                  md:text-lg
                  font-bold
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  "
                >

                  WhatsApp

                </a>

              )}

              {/* INSTAGRAM */}
              {product.instagram && (

                <a
                  href={`https://instagram.com/${product.instagram}`}
                  target="_blank"
                  rel="noreferrer"
                  className="
                  flex-1
                  h-12
                  text-center
                  bg-gradient-to-r
                  from-pink-500
                  via-red-500
                  to-yellow-500
                  text-white
                  rounded-2xl
                  text-[14px]
                  md:text-lg
                  font-bold
                  shadow-sm
                  flex
                  items-center
                  justify-center
                  "
                >

                  Instagram

                </a>

              )}

            </div>

          </div>

        </div>

      </div>

    </div>

  )

}

export default ProductDetail