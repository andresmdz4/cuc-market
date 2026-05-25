import { useEffect, useMemo, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"

function Products() {

  // STATES
  const [products, setProducts] =
    useState([])

  const [loading, setLoading] =
    useState(true)

  const [categoryFilter, setCategoryFilter] =
    useState("Todos")

  const [sortFilter, setSortFilter] =
    useState("Recientes")

  const [showCategoryMenu, setShowCategoryMenu] =
    useState(false)

  const [showSortMenu, setShowSortMenu] =
    useState(false)

  const [showDeleteModal, setShowDeleteModal] =
    useState(false)

  const [selectedProduct, setSelectedProduct] =
    useState(null)

  // USER
  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  const currentUserId =

    userInfo?.user?._id ||

    userInfo?.user?.id ||

    userInfo?._id ||

    userInfo?.id

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const { data } =
        await axios.get(

          "https://cuc-market.onrender.com/api/products"

        )

      setProducts(data)

    } catch (error) {

      console.log(error)

    } finally {

      setLoading(false)

    }

  }

  // EFFECT
  useEffect(() => {

    fetchProducts()

  }, [])

  // DELETE PRODUCT
  const openDeleteModal = (id) => {

    setSelectedProduct(id)

    setShowDeleteModal(true)

  }

  const deleteProduct = async () => {

    try {

      await axios.delete(

        `https://cuc-market.onrender.com/api/products/${selectedProduct}`

      )

      setShowDeleteModal(false)

      fetchProducts()

    } catch (error) {

      console.log(error)

    }

  }

  // LIKE PRODUCT
  const likeProduct = async (
    e,
    productId
  ) => {

    e.preventDefault()

    try {

      const userId =

        userInfo?.user?._id ||

        userInfo?.user?.id ||

        userInfo?._id ||

        userInfo?.id

      if (!userId) return

      const { data } =
        await axios.put(

          `https://cuc-market.onrender.com/api/products/${productId}/like`,

          { userId }

        )

      setProducts((prev) =>

        prev.map((p) =>

          p._id === productId
            ? data
            : p

        )

      )

    } catch (error) {

      console.log(error)

    }

  }

  // CATEGORY COLORS
  const categoryStyles = {

    Comida:
      "bg-orange-100/80 text-orange-700 border border-orange-200",

    Postres:
      "bg-pink-100/80 text-pink-700 border border-pink-200",

    Ropa:
      "bg-blue-100/80 text-blue-700 border border-blue-200",

    Tecnología:
      "bg-purple-100/80 text-purple-700 border border-purple-200",

    Otro:
      "bg-gray-100/80 text-gray-700 border border-gray-200"

  }

  // FILTER + SORT
  const filteredProducts = useMemo(() => {

    let filtered = [...products]

    filtered = filtered.filter((product) => {

      return (

        categoryFilter === "Todos" ||

        product.category ===
          categoryFilter

      )

    })

    if (sortFilter === "Más likes") {

      filtered.sort(

        (a, b) =>

          (b.likes?.length || 0) -
          (a.likes?.length || 0)

      )

    }

    if (sortFilter === "Precio alto") {

      filtered.sort(
        (a, b) => b.price - a.price
      )

    }

    if (sortFilter === "Precio bajo") {

      filtered.sort(
        (a, b) => a.price - b.price
      )

    }

    if (sortFilter === "Recientes") {

      filtered.sort(

        (a, b) =>

          new Date(b.createdAt) -
          new Date(a.createdAt)

      )

    }

    return filtered

  }, [
    products,
    categoryFilter,
    sortFilter
  ])

  return (

    <PageTransition>

      <div className="
      min-h-screen
      bg-[#f5f5f7]
      ">

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <section className="
        px-3
        md:px-10
        py-5
        md:py-8
        ">

          {/* TOP */}
          <div className="
          flex
          flex-col
          gap-4
          mb-6
          ">

            {/* TITLE */}
            <div>

              <div className="
              flex
              items-center
              gap-2
              ">

                <h1 className="
                text-[28px]
                md:text-5xl
                font-black
                text-black
                tracking-tight
                ">

                  Productos

                </h1>

                <span className="
                bg-white
                px-2.5
                py-1
                rounded-full
                text-[11px]
                md:text-sm
                font-bold
                text-gray-600
                shadow-sm
                ">

                  {filteredProducts.length}

                </span>

              </div>

              <p className="
              text-gray-500
              mt-1
              text-[13px]
              md:text-lg
              ">

                Explora emprendimientos universitarios

              </p>

            </div>

            {/* FILTERS */}
            <div className="
            flex
            gap-2
            overflow-x-auto
            scrollbar-hide
            pb-1
            ">

              {/* CATEGORY */}
              <div className="
              relative
              flex-shrink-0
              ">

                <button
                  onClick={() =>
                    setShowCategoryMenu(
                      !showCategoryMenu
                    )
                  }
                  className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  h-11
                  text-[13px]
                  text-black
                  font-semibold
                  shadow-sm
                  flex
                  items-center
                  gap-2
                  "
                >

                  {categoryFilter}

                  <span className="text-[10px]">

                    ▼

                  </span>

                </button>

                {showCategoryMenu && (

                  <div className="
                  absolute
                  top-12
                  left-0
                  w-44
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  border-gray-100
                  overflow-hidden
                  z-50
                  ">

                    {[
                      "Todos",
                      "Comida",
                      "Postres",
                      "Ropa",
                      "Tecnología",
                      "Otro"
                    ].map((category) => (

                      <button
                        key={category}
                        onClick={() => {

                          setCategoryFilter(category)

                          setShowCategoryMenu(false)

                        }}
                        className={`
                        w-full
                        text-left
                        px-4
                        py-3
                        transition
                        text-sm
                        font-medium

                        ${
                          categoryFilter === category
                            ? "bg-[#A3161A] text-white"
                            : "hover:bg-gray-100 text-black"
                        }
                        `}
                      >

                        {category}

                      </button>

                    ))}

                  </div>

                )}

              </div>

              {/* SORT */}
              <div className="
              relative
              flex-shrink-0
              ">

                <button
                  onClick={() =>
                    setShowSortMenu(
                      !showSortMenu
                    )
                  }
                  className="
                  bg-white
                  border
                  border-gray-200
                  rounded-2xl
                  px-4
                  h-11
                  text-[13px]
                  text-black
                  font-semibold
                  shadow-sm
                  flex
                  items-center
                  gap-2
                  "
                >

                  {sortFilter}

                  <span className="text-[10px]">

                    ▼

                  </span>

                </button>

                {showSortMenu && (

                  <div className="
                  absolute
                  top-12
                  left-0
                  w-44
                  bg-white
                  rounded-2xl
                  shadow-2xl
                  border
                  border-gray-100
                  overflow-hidden
                  z-50
                  ">

                    {[
                      "Recientes",
                      "Más likes",
                      "Precio alto",
                      "Precio bajo"
                    ].map((option) => (

                      <button
                        key={option}
                        onClick={() => {

                          setSortFilter(option)

                          setShowSortMenu(false)

                        }}
                        className={`
                        w-full
                        text-left
                        px-4
                        py-3
                        transition
                        text-sm
                        font-medium

                        ${
                          sortFilter === option
                            ? "bg-[#A3161A] text-white"
                            : "hover:bg-gray-100 text-black"
                        }
                        `}
                      >

                        {option}

                      </button>

                    ))}

                  </div>

                )}

              </div>

            </div>

          </div>

          {/* LOADING */}
          {loading ? (

            <div className="
            text-center
            py-20
            text-black
            text-xl
            ">

              Cargando productos...

            </div>

          ) : (

            <div className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3
            md:gap-5
            items-stretch
            ">

              {filteredProducts.map((product) => (

                <div
                  key={product._id}
                  className="
                  bg-white
                  rounded-[30px]
                  overflow-hidden
                  shadow-sm
                  hover:shadow-xl
                  transition
                  duration-300
                  flex
                  flex-col
                  h-full
                  "
                >

                  {/* LINK */}
                  <Link
                    to={`/product/${product._id}`}
                    className="
                    flex-1
                    flex
                    flex-col
                    "
                  >

                    {/* IMAGE */}
                    <div className="
w-full
h-64
overflow-hidden
rounded-t-[32px]
bg-gray-100
">

  <img
    src={product.image}
    alt={product.name}
    className="
    w-full
    h-full
    object-cover
    "
  />

</div>

                    {/* CONTENT */}
                    <div className="
                    p-3
                    pt-2.5
                    flex-1
                    flex
                    flex-col
                    ">

                      {/* CATEGORY */}
                      <span
                        className={`
                        px-2
                        py-1
                        rounded-full
                        text-[9px]
                        md:text-xs
                        font-semibold
                        w-fit
                        ${categoryStyles[product.category]}
                        `}
                      >

                        {product.category}

                      </span>

                      {/* NAME */}
                      <h2 className="
                      text-[15px]
                      md:text-2xl
                      font-black
                      text-black
                      mt-2
                      line-clamp-1
                      break-all
                      leading-tight
                      ">

                        {product.name}

                      </h2>

                      {/* DESCRIPTION */}
                      {product.description && (

                        <p className="
                        text-gray-500
                        text-[11px]
                        md:text-sm
                        mt-1
                        line-clamp-1
                        break-all
                        leading-tight
                        ">

                          {product.description}

                        </p>

                      )}

                      {/* PRICE + HEART */}
                      <div className="
                      flex
                      items-center
                      justify-between
                      mt-auto
                      pt-3
                      ">

                        {/* PRICE */}
                        <p className="
                        text-[17px]
                        md:text-3xl
                        font-black
                        text-[#A3161A]
                        truncate
                        max-w-[70%]
                        leading-none
                        ">

                          $
                          {new Intl.NumberFormat(
                            "es-CO"
                          ).format(product.price)}

                        </p>

                        {/* HEART */}
                        <button
                          onClick={(e) =>
                            likeProduct(
                              e,
                              product._id
                            )
                          }
                          className="
                          flex
                          items-center
                          gap-1
                          "
                        >

                          <div
                            className={`
                            w-7 h-7
                            md:w-8 md:h-8
                            rounded-full
                            flex
                            items-center
                            justify-center
                            transition
                            duration-300
                            shadow-md

                            ${
                              product.likes?.some(

                                (id) =>

                                  id.toString() ===
                                  currentUserId

                              )

                                ? "bg-gradient-to-br from-red-500 to-red-600"

                                : "bg-white border border-gray-200"
                            }
                            `}
                          >

                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              viewBox="0 0 24 24"
                              fill={
                                product.likes?.some(

                                  (id) =>

                                    id.toString() ===
                                    currentUserId

                                )

                                  ? "white"

                                  : "none"
                              }
                              stroke={
                                product.likes?.some(

                                  (id) =>

                                    id.toString() ===
                                    currentUserId

                                )

                                  ? "white"

                                  : "#ef4444"
                              }
                              className="
                              w-3.5 h-3.5
                              "
                            >

                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M12 21s-6.716-4.35-9.193-8.17C.31 8.99 2.16 4.5 6.633 4.5c2.02 0 3.39 1.11 4.367 2.39C11.977 5.61 13.347 4.5 15.367 4.5c4.473 0 6.323 4.49 3.826 8.33C18.716 16.65 12 21 12 21z"
                              />

                            </svg>

                          </div>

                          <span
                            className="
                            text-[11px]
                            font-bold
                            text-gray-700
                            "
                          >

                            {product.likes?.length || 0}

                          </span>

                        </button>

                      </div>

                    </div>

                  </Link>

                  {/* BUTTONS */}
                  <div className="
                  px-3
                  pb-3
                  pt-1
                  flex
                  flex-col
                  gap-2
                  min-h-[96px]
                  justify-end
                  ">

                    {/* CONTACT BUTTONS */}
                    <div className="
                    flex
                    gap-2
                    ">

                      {/* WHATSAPP */}
                      {product.whatsapp && (

                        <a
                          href={`https://wa.me/${product.whatsapp}`}
                          target="_blank"
                          rel="noreferrer"
                          className="
                          flex-1
                          text-center
                          bg-green-500
                          hover:bg-green-600
                          transition
                          text-white
                          h-9
                          rounded-xl
                          text-[11px]
                          font-semibold
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
                          text-center
                          bg-gradient-to-r
                          from-pink-500
                          via-red-500
                          to-yellow-500
                          text-white
                          h-9
                          rounded-xl
                          text-[11px]
                          font-semibold
                          flex
                          items-center
                          justify-center
                          "
                        >

                          Instagram

                        </a>

                      )}

                    </div>

                    {/* DELETE */}
                    {String(product.user?._id) ===
                      String(currentUserId) && (

                      <button
                        onClick={() =>
                          openDeleteModal(
                            product._id
                          )
                        }
                        className="
                        w-full
                        bg-red-50
                        text-red-500
                        h-8
                        rounded-xl
                        hover:bg-red-100
                        transition
                        text-[10px]
                        font-medium
                        "
                      >

                        Eliminar publicación

                      </button>

                    )}

                  </div>

                </div>

              ))}

            </div>

          )}

        </section>

        {/* DELETE MODAL */}
        {showDeleteModal && (

          <div className="
          fixed
          inset-0
          bg-black/40
          backdrop-blur-sm
          flex
          items-center
          justify-center
          z-50
          px-6
          ">

            <div className="
            bg-white
            rounded-3xl
            p-6
            w-full
            max-w-sm
            shadow-2xl
            ">

              <h2 className="
              text-2xl
              font-black
              text-black
              ">

                Eliminar producto

              </h2>

              <p className="
              text-gray-700
              mt-3
              text-sm
              ">

                ¿Seguro que quieres eliminar este producto?

              </p>

              <div className="
              flex
              justify-end
              gap-3
              mt-6
              ">

                <button
                  onClick={() =>
                    setShowDeleteModal(false)
                  }
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-gray-200
                  hover:bg-gray-300
                  transition
                  font-semibold
                  text-sm
                  "
                >

                  Cancelar

                </button>

                <button
                  onClick={deleteProduct}
                  className="
                  px-4
                  py-2
                  rounded-xl
                  bg-red-600
                  hover:bg-red-700
                  transition
                  text-white
                  font-semibold
                  text-sm
                  "
                >

                  Eliminar

                </button>

              </div>

            </div>

          </div>

        )}

      </div>

    </PageTransition>

  )

}

export default Products