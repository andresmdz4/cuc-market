import {
  useEffect,
  useState
} from "react"

import axios from "axios"

import Navbar from "../components/Navbar"

function Admin() {

  const [users, setUsers] =
    useState([])

  const [products, setProducts] =
    useState([])
  
  const userInfo = JSON.parse(
  localStorage.getItem("userInfo")
)

  // DELETE PRODUCT
  const deleteProductHandler =
    async (id) => {

      const confirmDelete =
        window.confirm(
          "¿Eliminar producto?"
        )

      if (!confirmDelete) return

      try {

        await axios.delete(

  `https://cuc-market.onrender.com/api/admin/product/${id}`,

  {

    headers: {

      Authorization:
        `Bearer ${userInfo?.token}`

    }

  }

)

        setProducts(

          products.filter(
            (product) =>
              product._id !== id
          )

        )

      } catch (error) {

        console.log(error)

      }

    }

  useEffect(() => {

    const fetchData = async () => {

      try {

        // USERS
        const usersRes =
  await axios.get(

    "https://cuc-market.onrender.com/api/admin/users",

    {

      headers: {

        Authorization:
          `Bearer ${userInfo?.token}`

      }

    }

  )

        const productsRes =
  await axios.get(

    "https://cuc-market.onrender.com/api/admin/products",

    {

      headers: {

        Authorization:
          `Bearer ${userInfo?.token}`

      }

    }

  )

        setUsers(usersRes.data)
        setProducts(productsRes.data)

      } catch (error) {

        console.log(error)

      }

    }

    fetchData()

  }, [])

  return (

    <div className="
    min-h-screen
    bg-gray-50
    ">

      <Navbar />

      <div className="
      max-w-7xl
      mx-auto
      px-6
      py-14
      ">

        {/* TITLE */}
        <h1 className="
        text-5xl
        font-black
        text-black
        mb-12
        ">

          Panel Admin

        </h1>

        {/* USERS */}
        <div className="
        bg-white
        rounded-3xl
        p-8
        shadow-sm
        border
        border-gray-100
        mb-10
        ">

          <h2 className="
          text-3xl
          font-black
          mb-6
          ">

            Usuarios

          </h2>

          <div className="
          space-y-4
          ">

            {users.map((user) => (

              <div
                key={user._id}
                className="
                flex
                items-center
                justify-between
                bg-gray-50
                rounded-2xl
                p-4
                "
              >

                <div>

                  <p className="
                  font-bold
                  text-black
                  ">

                    {user.name}

                  </p>

                  <p className="
                  text-gray-500
                  text-sm
                  ">

                    {user.email}

                  </p>

                </div>

                <span className="
                text-sm
                font-bold
                text-[#A3161A]
                ">

                  {user.isAdmin
                    ? "ADMIN"
                    : "USER"}

                </span>

              </div>

            ))}

          </div>

        </div>

        {/* PRODUCTS */}
        <div className="
        bg-white
        rounded-3xl
        p-8
        shadow-sm
        border
        border-gray-100
        ">

          <h2 className="
          text-3xl
          font-black
          mb-6
          ">

            Productos

          </h2>

          <div className="
          grid
          grid-cols-1
          md:grid-cols-2
          gap-5
          ">

            {products.map((product) => (

              <div
                key={product._id}
                className="
                bg-gray-50
                rounded-3xl
                p-5
                "
              >

                <img
                  src={`https://cuc-market.onrender.com/${product.image}`}
                  alt={product.name}
                  className="
                  w-full
                  h-52
                  object-cover
                  rounded-2xl
                  "
                />

                <h3 className="
                text-xl
                font-black
                mt-4
                ">

                  {product.name}

                </h3>

                <p className="
                text-[#A3161A]
                font-bold
                mt-2
                ">

                  $
                  {new Intl.NumberFormat(
                    "es-CO"
                  ).format(
                    product.price
                  )}

                </p>

                <p className="
                text-sm
                text-gray-500
                mt-2
                ">

                  {product.user?.name}

                </p>

                <button
                  onClick={() =>
                    deleteProductHandler(
                      product._id
                    )
                  }
                  className="
                  mt-4
                  bg-red-500
                  hover:bg-red-600
                  transition
                  text-white
                  px-4
                  py-2
                  rounded-2xl
                  font-bold
                  "
                >

                  Eliminar

                </button>

              </div>

            ))}

          </div>

        </div>

      </div>

    </div>

  )

}

export default Admin