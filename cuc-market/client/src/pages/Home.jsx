import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import axios from "axios"

import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"

function Home() {

  // STATES
  const [products, setProducts] = useState([])

  // NUEVOS STATES
  const [filteredProducts, setFilteredProducts] =
    useState([])

  const [selectedCategory, setSelectedCategory] =
    useState("Todos")

  // FETCH PRODUCTS
  const fetchProducts = async () => {

    try {

      const { data } = await axios.get(
        "https://cuc-market.onrender.com/api/products"
      )

      // CAMBIO
      setProducts(data.slice(0, 8))
      setFilteredProducts(data.slice(0, 8))

    } catch (error) {

      console.log(error)

    }

  }

  // EFFECT
  useEffect(() => {

    fetchProducts()

  }, [])

  // NUEVO EFFECT FILTRO
  useEffect(() => {

    if (selectedCategory === "Todos") {

      setFilteredProducts(products)

    } else {

      const filtered = products.filter(

        (product) =>

          product.category === selectedCategory

      )

      setFilteredProducts(filtered)

    }

  }, [selectedCategory, products])

  // CATEGORY COLORS
  const categoryStyles = {

    Comida:
      "bg-orange-100/70 text-orange-700 border border-orange-200",

    Postres:
      "bg-pink-100/70 text-pink-700 border border-pink-200",

    Ropa:
      "bg-blue-100/70 text-blue-700 border border-blue-200",

    Tecnología:
      "bg-purple-100/70 text-purple-700 border border-purple-200",

    Otro:
      "bg-gray-100/70 text-gray-700 border border-gray-200"

  }

  return (

    <PageTransition>

      <div className="min-h-screen bg-[#f5f5f5]">

        <Navbar />

        {/* HERO */}
        <section className="
        relative
        px-4
        md:px-10
        pt-6
        md:pt-10
        pb-16
        md:pb-20
        overflow-hidden
        ">

          {/* IMAGEN FONDO */}
          <div className="
          absolute
          inset-0
          z-0
          ">

            <img
              src="/herocuc.png"
              alt="CUC Market"
              className="
              w-full
              h-full
              object-cover
              opacity-90
              "
            />

            {/* OVERLAY */}
            <div className="
            absolute
            inset-0
            bg-gradient-to-r
            from-[#f5f5f5]/85
            via-[#f5f5f5]/45
            to-transparent
            " />

          </div>

          {/* CONTENIDO */}
          <div className="
          relative
          z-10
          max-w-7xl
          mx-auto
          px-2
          sm:px-6
          md:px-4
          py-8
          md:py-14
          ">

            <div className="max-w-3xl">

              {/* TITULO */}
              <h1 className="
              text-[58px]
              sm:text-[72px]
              md:text-[88px]
              font-black
              text-black
              leading-[0.88]
              tracking-[-3px]
              max-w-[340px]
              sm:max-w-[520px]
              md:max-w-[780px]
              ">

                Compra y vende

                <br />

                dentro de la

                <span className="text-[#A3161A]">

                  {" "}U !

                </span>

              </h1>

              {/* TEXTO */}
              <p className="
              text-black
              text-[18px]
              sm:text-[22px]
              mt-7
              leading-relaxed
              max-w-[340px]
              sm:max-w-[520px]
              ">

                Descubre productos, postres,
                ropa, tecnología y emprendimientos
                universitarios en un solo lugar.

              </p>

              {/* BOTONES */}
              <div className="
              flex
              flex-col
              sm:flex-row
              gap-4
              mt-10
              ">

                {/* BOTON PRODUCTOS */}
                <Link
                  to="/products"
                  className="
                  bg-[#A3161A]
                  hover:bg-[#8d1316]
                  transition-all
                  duration-300
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  shadow-xl
                  w-full
                  sm:w-auto
                  flex
                  justify-center
                  items-center
                  hover:scale-[1.02]
                  "
                >

                  Explorar productos

                </Link>

                {/* BOTON PUBLICAR */}
                <Link
                  to="/add-product"
                  className="
                  bg-black
                  hover:bg-gray-800
                  transition-all
                  duration-300
                  text-white
                  px-8
                  py-4
                  rounded-2xl
                  font-bold
                  shadow-xl
                  w-full
                  sm:w-auto
                  flex
                  justify-center
                  items-center
                  hover:scale-[1.02]
                  "
                >

                  Publicar producto

                </Link>

              </div>

              {/* STATS */}
              <div className="
              flex
              flex-col
              sm:flex-row
              gap-8
              sm:gap-12
              mt-12
              ">

                {/* PRODUCTOS */}
                <div className="
                flex
                items-center
                gap-4
                ">

                  <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/85
                  backdrop-blur-xl
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  text-3xl
                  shrink-0
                  ">

                    🛍️

                  </div>

                  <div>

                    <h3 className="
                    text-4xl
                    font-black
                    text-[#A3161A]
                    leading-none
                    ">

                      +{products.length}

                    </h3>

                    <p className="
                    text-black
                    mt-1
                    ">

                      Productos recientes

                    </p>

                  </div>

                </div>

                {/* CATEGORIAS */}
                <div className="
                flex
                items-center
                gap-4
                ">

                  <div className="
                  w-16
                  h-16
                  rounded-2xl
                  bg-white/85
                  backdrop-blur-xl
                  shadow-lg
                  flex
                  items-center
                  justify-center
                  text-3xl
                  shrink-0
                  ">

                    📦

                  </div>

                  <div>

                    <h3 className="
                    text-4xl
                    font-black
                    text-[#A3161A]
                    leading-none
                    ">

                      5

                    </h3>

                    <p className="
                    text-black
                    mt-1
                    ">

                      Categorías

                    </p>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>

        {/* CATEGORIES */}
        <section className="px-6 md:px-12 pt-6 pb-10">

          <div className="max-w-7xl mx-auto">

            <div className="
            flex
            items-center
            justify-between
            mb-8
            ">

              <h2 className="
              text-4xl
              font-black
              text-black
              ">

                Categorías

              </h2>

              {/* BOTON TODOS */}
              <button
                onClick={() =>
                  setSelectedCategory("Todos")
                }
                className="
                bg-white/90
                backdrop-blur-xl
                text-[#A3161A]
                px-4
                py-2
                rounded-xl
                font-semibold
                text-sm
                shadow-md
                border
                border-[#A3161A]/10
                hover:shadow-lg
                transition
                "
                
              >

                Mostrar todos

              </button>

            </div>

            <div className="
            grid
            grid-cols-2
            md:grid-cols-5
            gap-5
            ">

              {[
                {
                  icon: "🍔",
                  name: "Comida",
                  color: "text-orange-700"
                },
                {
                  icon: "🧁",
                  name: "Postres",
                  color: "text-pink-700"
                },
                {
                  icon: "👕",
                  name: "Ropa",
                  color: "text-blue-700"
                },
                {
                  icon: "💻",
                  name: "Tecnología",
                  color: "text-purple-700"
                },
                {
                  icon: "📦",
                  name: "Otro",
                  color: "text-gray-700"
                }
              ].map((category) => (

                <button
                  key={category.name}
                  onClick={() =>
                    setSelectedCategory(category.name)
                  }
                  className={`
                  bg-white
                  rounded-3xl
                  py-5
                  px-4
                  shadow-lg
                  hover:-translate-y-1
                  transition
                  flex
                  flex-col
                  items-center
                  justify-center
                  text-center

                  ${
                    selectedCategory === category.name
                      ? "ring-4 ring-[#A3161A]/20 scale-[1.02]"
                      : ""
                  }
                  `}
                >

                  <div className="text-4xl">

                    {category.icon}

                  </div>

                  <h3 className={`
                  font-black
                  text-lg
                  mt-3
                  ${category.color}
                  `}>

                    {category.name}

                  </h3>

                </button>

              ))}

            </div>

          </div>

        </section>

        {/* RECENT PRODUCTS */}
        <section className="px-6 md:px-12 pb-20">

          <div className="max-w-7xl mx-auto">

            <div className="
            flex
            items-center
            justify-between
            mb-10
            ">

              <h2 className="
              text-4xl
              font-black
              text-black
              ">

                Últimos productos publicados

              </h2>

              <Link
                to="/products"
                className="
                text-[#A3161A]
                font-bold
                "
              >

                Ver todos

              </Link>

            </div>

            <div className="
            grid
            grid-cols-2
            md:grid-cols-3
            xl:grid-cols-4
            gap-3
            md:gap-5
            items-stretch
            ">

              {/* CAMBIO */}
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
                    <img
                      src={`https://cuc-market.onrender.com/${product.image}`}
                      alt={product.name}
                      className="
                      w-full
                      aspect-[4/3]
                      object-cover
                      object-top
                      "
                    />

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
                          className="
                          flex
                          items-center
                          gap-1
                          "
                        >

                          <div
                            className="
                            w-7 h-7
                            md:w-8 md:h-8
                            rounded-full
                            flex
                            items-center
                            justify-center
                            transition
                            duration-300
                            shadow-md
                            bg-white
                            border
                            border-gray-200
                            "
                          >

                            ❤️

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
                  min-h-[70px]
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

                  </div>

                </div>

              ))}

            </div>

          </div>

        </section>

      </div>

    </PageTransition>

  )

}

export default Home