import {
  useState,
  useEffect
} from "react"
import { Link } from "react-router-dom"


import {
  Menu,
  X,
  Home,
  ShoppingBag,
  User,
  Lock,
  LogOut,
  Search,
  ChevronDown,
  Eye,
  EyeOff
} from "lucide-react"
import axios from "axios"

function Navbar() {

  const [profileOpen, setProfileOpen] =
    useState(false)

  const [menuOpen, setMenuOpen] =
    useState(false)

  // SEARCH
  const [search, setSearch] =
    useState("")
  
  const [products, setProducts] =
  useState([])


  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  const isLoggedIn =
    !!(
      userInfo?.user?.name ||
      userInfo?.name
    )

  const userName =
    userInfo?.user?.name ||
    userInfo?.name ||
    ""

  const userEmail =
    userInfo?.user?.email ||
    userInfo?.email ||
    ""

  const userInitial =
    userName.charAt(0).toUpperCase()

  const [profileModal, setProfileModal] =
  useState(false)

const [passwordModal, setPasswordModal] =
  useState(false)

const [deleteModal, setDeleteModal] =
  useState(false)

// EDIT PROFILE
const [editName, setEditName] =
  useState(userName)

const [editEmail, setEditEmail] =
  useState(userEmail)

const [editPassword, setEditPassword] =
  useState("")


// CHANGE PASSWORD
const [currentPassword,
  setCurrentPassword] =
  useState("")

const [newPassword,
  setNewPassword] =
  useState("")

const [confirmPassword,
  setConfirmPassword] =
  useState("")


// DELETE ACCOUNT
const [deletePassword,
  setDeletePassword] =
  useState("")

const [successMessage,
  setSuccessMessage] =
  useState("")

const [showCurrentPassword,
  setShowCurrentPassword] =
  useState(false)

const [showNewPassword,
  setShowNewPassword] =
  useState(false)

const [showConfirmPassword,
  setShowConfirmPassword] =
  useState(false)

const [errorMessage,
  setErrorMessage] =
  useState("")

const [showEditPassword,
  setShowEditPassword] =
  useState(false)

  const logoutHandler = () => {

    localStorage.removeItem("userInfo")

    window.location.href = "/login"

  }
// =====================================
// UPDATE PROFILE
// =====================================

const updateProfileHandler =
  async () => {

    try {

      const token =
        userInfo.token

      const { data } =
        await axios.put(

          "https://cuc-market.onrender.com/api/auth/profile",

          {
            name: editName,
            email: editEmail,
            password: editPassword
          },

          {
            headers: {
              Authorization:
                `Bearer ${token}`
            }
          }

        )

      localStorage.setItem(

        "userInfo",

        JSON.stringify({

          ...userInfo,
          user: data.user

        })

      )

      setSuccessMessage(
  "Perfil actualizado correctamente"
)

      setProfileModal(false)

    

    } catch (error) {

      setErrorMessage(

        error.response?.data?.message ||

        "Error"

      )

    }

  }



// =====================================
// CHANGE PASSWORD
// =====================================

const changePasswordHandler =
  async () => {

    if (
      newPassword !==
      confirmPassword
    ) {

      setErrorMessage(
        "Las contraseñas no coinciden"
      )

      return

    }

    const hasUppercase =
      /[A-Z]/.test(newPassword)

    const hasLowercase =
      /[a-z]/.test(newPassword)

    const hasNumber =
      /[0-9]/.test(newPassword)

    if (

      newPassword.length < 6 ||

      !hasUppercase ||

      !hasLowercase ||

      !hasNumber

    ) {

      setErrorMessage(
        "La contraseña debe tener mínimo 6 caracteres, una mayúscula, una minúscula y un número"
      )

      return

    }

    try {

      await axios.put(

        "https://cuc-market.onrender.com/api/auth/password",

        {
          currentPassword,
          newPassword
        },

        {
          headers: {
            Authorization:
              `Bearer ${userInfo.token}`
          }
        }

      )

      setSuccessMessage(
        "Contraseña actualizada correctamente"
      )

      setPasswordModal(false)

      setCurrentPassword("")
      setNewPassword("")
      setConfirmPassword("")

    } catch (error) {

      setErrorMessage(

        error.response?.data?.message ||

        "Ocurrió un error"

      )

    }

  }



// =====================================
// DELETE ACCOUNT
// =====================================

const deleteAccountHandler =
  async () => {

  
    try {

      await axios.delete(

        "https://cuc-market.onrender.com/api/auth/delete",

        {

          headers: {

            Authorization:
              `Bearer ${userInfo.token}`

          },

          data: {

            password:
              deletePassword

          }

        }

      )

      localStorage.removeItem(
        "userInfo"
      )

      setSuccessMessage(
  "Cuenta eliminada correctamente"
)

      window.location.href = "/"

    } catch (error) {

      setErrorMessage(

        error.response?.data?.message ||

        "Ocurrio un error"

      )

    }

  }
  useEffect(() => {

  const fetchProducts = async () => {

    try {

      const { data } =
        await axios.get(
          "https://cuc-market.onrender.com/api/products"
        )

      setProducts(data)

    } catch (error) {

      console.log(error)

    }

  }

  fetchProducts()

}, [])

useEffect(() => {

  if (
    successMessage ||
    errorMessage
  ) {

    const timer = setTimeout(() => {

      setSuccessMessage("")
      setErrorMessage("")

    }, 3000)

    return () => clearTimeout(timer)

  }

}, [successMessage, errorMessage])

  // FILTERED
  const filteredProducts =
    search.trim() !== ""

      ? products
          .filter((product) =>

            product.name
              ?.toLowerCase()
              .includes(search.toLowerCase())

          )
          .slice(0, 5)

      : []

  return (

<>
{/* SUCCESS MESSAGE */}

{/* ERROR MESSAGE */}
{errorMessage && (

  <div className="
  fixed
  top-24
  right-5
  z-[200]
  bg-red-50
  border
  border-red-200
  shadow-2xl
  rounded-3xl
  px-5
  py-4
  min-w-[320px]
  ">

    <div className="
    flex
    items-start
    gap-3
    ">

      <div className="
      w-10
      h-10
      rounded-full
      bg-red-500
      text-white
      flex
      items-center
      justify-center
      font-black
      ">

        !

      </div>

      <div>

        <p className="
        font-black
        text-red-700
        ">

          Error

        </p>

        <p className="
        text-sm
        text-red-500
        mt-1
        ">

          {errorMessage}

        </p>

      </div>

    </div>

  </div>

)}
{successMessage && (

  <div className="
  fixed
  top-5
  right-5
  z-[200]
  bg-white
  border
  border-gray-200
  shadow-2xl
  rounded-3xl
  px-5
  py-4
  min-w-[320px]
  ">

    <div className="
    flex
    items-start
    gap-3
    ">

      <div className="
      w-10
      h-10
      rounded-full
      bg-green-500
      text-white
      flex
      items-center
      justify-center
      font-black
      ">

        ✓

      </div>

      <div>

        <p className="
        font-black
        text-green-700
        ">

          Cambios realizados

        </p>

        <p className="
        text-sm
        text-green-600
        mt-1
        ">

          {successMessage}

        </p>

      </div>

    </div>

  </div>

)}
      {/* NAVBAR */}
      <header className="
      sticky
      top-0
      z-50
      bg-white/80
      backdrop-blur-xl
      border-b
      border-gray-100
      shadow-sm
      ">

        <div className="
        max-w-[1700px]
        mx-auto
        px-5
        md:px-8
        h-20
        flex
        items-center
        justify-between
        gap-5
        ">

          {/* LOGO */}
          <Link
            to="/"
            className="
            flex
            items-center
            flex-shrink-0
            "
          >

            <img
              src="/cucmarkk.png"
              alt="CUC Market"
              className="
              h-11
              object-contain
              "
            />

          </Link>

          {/* DESKTOP */}
          <div className="
          hidden
          md:flex
          items-center
          flex-1
          justify-between
          gap-6
          ml-8
          ">

            {/* SEARCH */}
            <div className="
            flex-1
            max-w-[720px]
            relative
            ">

              <div className="
              bg-white
              border
              border-gray-200
              rounded-2xl
              h-12
              px-4
              flex
              items-center
              gap-3
              shadow-sm
              hover:shadow-md
              hover:border-[#A3161A]/40
              focus-within:border-[#A3161A]
              focus-within:ring-4
              focus-within:ring-[#A3161A]/10
              transition-all
              duration-300
              ">

                <Search
                  size={18}
                  className="
                  text-gray-400
                  "
                />

                <input
                  type="text"
                  placeholder="Buscar productos..."
                  value={search}
                  onChange={(e) =>
                    setSearch(e.target.value)
                  }
                  className="
                  flex-1
                  bg-transparent
                  outline-none
                  text-sm
                  text-black
                  placeholder:text-gray-400
                  "
                />

              </div>

              {/* RESULTS */}
              {filteredProducts.length > 0 && (

                <div className="
                absolute
                top-14
                left-0
                w-full
                bg-white
                border
                border-gray-100
                rounded-3xl
                shadow-2xl
                overflow-hidden
                z-50
                ">

                  {filteredProducts.map((product) => (

                    <Link
                      key={product._id}
                      to={`/product/${product._id}`}
                      onClick={() =>
                        setSearch("")
                      }
                      className="
                      flex
                      items-center
                      gap-4
                      p-3
                      hover:bg-gray-50
                      transition
                      border-b
                      border-gray-100
                      last:border-none
                      "
                    >

                      <img
                        src={product.image}
                        alt={product.name}
                        className="
                        w-14
                        h-14
                        rounded-2xl
                        object-cover
                        "
                      />

                      <div className="
                      flex-1
                      min-w-0
                      ">

                        <h3 className="
                        font-bold
                        text-black
                        truncate
                        ">

                          {product.name}

                        </h3>

                        <p className="
                        text-sm
                        text-[#A3161A]
                        font-black
                        mt-1
                        ">

                          $
                          {new Intl.NumberFormat(
                            "es-CO"
                          ).format(product.price)}

                        </p>

                      </div>

                    </Link>

                  ))}

                </div>

              )}

            </div>

            {/* RIGHT */}
            <div className="
            flex
            items-center
            gap-6
            ">

              {/* LINKS */}
              <div className="
              flex
              items-center
              gap-5
              ">

                <Link
                  to="/"
                  className="
                  flex
                  items-center
                  gap-2
                  text-black
                  font-semibold
                  hover:text-[#A3161A]
                  transition
                  "
                >

                  <Home size={19} />

                  <span>

                    Inicio

                  </span>

                </Link>

                <Link
                  to="/products"
                  className="
                  flex
                  items-center
                  gap-2
                  text-black
                  font-semibold
                  hover:text-[#A3161A]
                  transition
                  "
                >

                  <ShoppingBag size={19} />

                  <span>

                    Productos

                  </span>

                </Link>

              </div>

              {/* ADD PRODUCT */}
              {isLoggedIn && (

                <Link
                  to="/add-product"
                  className="
                  bg-[#A3161A]
                  hover:bg-[#8d1216]
                  transition
                  text-white
                  px-5
                  h-12
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  font-bold
                  shadow-sm
                  whitespace-nowrap
                  "
                >

                  + Añadir Producto

                </Link>

              )}

              {/* PROFILE */}
              {isLoggedIn ? (

                <div className="
                relative
                ">

                  <button
                    onClick={() =>
                      setProfileOpen(
                        !profileOpen
                      )
                    }
                    className="
                    flex
                    items-center
                    gap-3
                    bg-white
                    border
                    border-gray-200
                    rounded-2xl
                    px-3
                    h-12
                    shadow-sm
                    hover:shadow-md
                    hover:border-[#A3161A]/30
                    transition-all
                    duration-300
                    "
                  >

                    <div className="
                    w-9
                    h-9
                    rounded-full
                    bg-[#A3161A]
                    text-white
                    flex
                    items-center
                    justify-center
                    font-black
                    "
                    >

                      {userInitial}

                    </div>

                    <span className="
                    font-semibold
                    text-black
                    max-w-[100px]
                    truncate
                    ">

                      {userName}

                    </span>

                    <ChevronDown
                      size={18}
                      className="
                      text-gray-500
                      "
                    />

                  </button>

                  {/* DROPDOWN */}
                  {profileOpen && (

                    <div className="
                    absolute
                    right-0
                    top-14
                    w-64
                    bg-white/95
                    backdrop-blur-xl
                    border
                    border-gray-100
                    rounded-3xl
                    shadow-2xl
                    p-3
                    ">

                      {/* USER */}
                      <div className="
                      flex
                      items-center
                      gap-3
                      p-3
                      border-b
                      border-gray-100
                      ">

                        <div className="
                        w-12
                        h-12
                        rounded-full
                        bg-[#A3161A]
                        text-white
                        flex
                        items-center
                        justify-center
                        font-black
                        text-lg
                        "
                        >

                          {userInitial}

                        </div>

                        <div className="
                        min-w-0
                        ">

                          <p className="
                          font-black
                          text-black
                          truncate
                          ">

                            {userName}

                          </p>

                          <p className="
                          text-sm
                          text-gray-500
                          truncate
                          ">

                            {userEmail}

                          </p>

                        </div>

                      </div>

                      {/* OPTIONS */}
                      <div className="
                      mt-2
                      flex
                      flex-col
                      gap-1
                      ">

                       <button
  onClick={() =>
    setProfileModal(true)
  }
  className="
  flex
  items-center
  gap-3
  h-12
  px-3
  rounded-2xl
  hover:bg-gray-100
  transition
  "
>

  <User size={18} />

  <span className="
  font-medium
  text-black
  ">

    Mi Perfil

  </span>

</button>

                        <button
  onClick={() =>
    setPasswordModal(true)
  }
  className="
  flex
  items-center
  gap-3
  h-12
  px-3
  rounded-2xl
  hover:bg-gray-100
  transition
  "
>

  <Lock size={18} />

  <span className="
  font-medium
  text-black
  ">

    Cambiar Contraseña

  </span>

</button>
 <button
  onClick={() =>
    setDeleteModal(true)
  }
  className="
  flex
  items-center
  gap-3
  h-12
  px-3
  rounded-2xl
  hover:bg-red-50
  transition
  text-red-500
  w-full
  "
>

  <span className="
  text-xl
  ">

    🗑️

  </span>

  <span className="
  font-semibold
  ">

    Eliminar Cuenta

  </span>

</button>
                        <button
                          onClick={logoutHandler}
                          className="
                          flex
                          items-center
                          gap-3
                          h-12
                          px-3
                          rounded-2xl
                          hover:bg-red-50
                          transition
                          text-red-500
                          "
                        >

                          <LogOut size={18} />

                          <span className="
                          font-semibold
                          ">
   
                            Cerrar Sesión

                          </span>

                        </button>


                      </div>

                    </div>

                  )}

                </div>

              ) : (

                <Link
                  to="/login"
                  className="
                  bg-[#A3161A]
                  hover:bg-[#8d1216]
                  transition-all
                  duration-300
                  h-12
                  px-5
                  rounded-2xl
                  flex
                  items-center
                  justify-center
                  font-semibold
                  text-white
                  shadow-sm
                  hover:shadow-md
                  "
                >

                  Iniciar sesión

                </Link>

              )}

            </div>

          </div>

          {/* MOBILE BUTTON */}
          <button
            onClick={() =>
              setMenuOpen(true)
            }
            className="
            md:hidden
            text-[#A3161A]
            "
          >

            <Menu size={34} />

          </button>

        </div>

      </header>
            {/* OVERLAY */}
      {menuOpen && (

        <div
          onClick={() =>
            setMenuOpen(false)
          }
          className="
          fixed
          inset-0
          bg-black/30
          backdrop-blur-sm
          z-40
          md:hidden
          "
        />

      )}

      {/* MOBILE DRAWER */}
      <div className={`
      fixed
      top-0
      right-0
      h-full
      w-[85%]
      max-w-[340px]
      bg-white/95
      backdrop-blur-2xl
      shadow-2xl
      z-50
      transform
      transition-transform
      duration-300
      md:hidden

      ${
        menuOpen
          ? "translate-x-0"
          : "translate-x-full"
      }
      `}>

        {/* TOP */}
        <div className="
        h-20
        px-5
        flex
        items-center
        justify-between
        border-b
        border-gray-100
        ">

          <img
            src="/cucmarkk.png"
            alt="logo"
            className="
            h-10
            "
          />

          <button
            onClick={() =>
              setMenuOpen(false)
            }
            className="
            w-10
            h-10
            rounded-full
            bg-gray-100
            flex
            items-center
            justify-center
            "
          >

            <X size={20} />

          </button>

        </div>

        {/* CONTENT */}
        <div className="
        p-5
        flex
        flex-col
        gap-3
        ">

          {/* SEARCH */}
          <div className="
          bg-white
          border
          border-gray-200
          rounded-2xl
          h-12
          px-4
          flex
          items-center
          gap-3
          shadow-sm
          ">

            <Search
              size={18}
              className="
              text-gray-400
              "
            />

            <input
              type="text"
              placeholder="Buscar productos..."
              value={search}
              onChange={(e) =>
                setSearch(e.target.value)
              }
              className="
              flex-1
              bg-transparent
              outline-none
              text-sm
              "
            />

          </div>

          {/* MOBILE RESULTS */}
          {filteredProducts.length > 0 && (

            <div className="
            bg-white
            border
            border-gray-100
            rounded-3xl
            shadow-xl
            overflow-hidden
            ">

              {filteredProducts.map((product) => (

                <Link
                  key={product._id}
                  to={`/product/${product._id}`}
                  onClick={() => {

                    setSearch("")
                    setMenuOpen(false)

                  }}
                  className="
                  flex
                  items-center
                  gap-3
                  p-3
                  border-b
                  border-gray-100
                  last:border-none
                  "
                >

                  <img
                    src={product.image}
                    alt={product.name}
                    className="
                    w-12
                    h-12
                    rounded-2xl
                    object-cover
                    "
                  />

                  <div className="
                  min-w-0
                  flex-1
                  ">

                    <h3 className="
                    font-bold
                    text-black
                    truncate
                    ">

                      {product.name}

                    </h3>

                    <p className="
                    text-sm
                    text-[#A3161A]
                    font-black
                    ">

                      $
                      {new Intl.NumberFormat(
                        "es-CO"
                      ).format(product.price)}

                    </p>

                  </div>

                </Link>

              ))}

            </div>

          )}

          {/* LINKS */}
          <Link
            to="/"
            onClick={() =>
              setMenuOpen(false)
            }
            className="
            flex
            items-center
            gap-3
            h-14
            px-4
            rounded-2xl
            bg-white
            border
            border-gray-100
            shadow-sm
            "
          >

            <Home size={20} />

            <span className="
            font-semibold
            text-black
            ">

              Inicio

            </span>

          </Link>

          <Link
            to="/products"
            onClick={() =>
              setMenuOpen(false)
            }
            className="
            flex
            items-center
            gap-3
            h-14
            px-4
            rounded-2xl
            bg-white
            border
            border-gray-100
            shadow-sm
            "
          >

            <ShoppingBag size={20} />

            <span className="
            font-semibold
            text-black
            ">

              Productos

            </span>

          </Link>

          {/* ADD */}
          {isLoggedIn && (

            <Link
              to="/add-product"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
              bg-[#A3161A]
              text-white
              rounded-2xl
              h-14
              flex
              items-center
              justify-center
              font-bold
              shadow-sm
              mt-2
              "
            >

              + Añadir Producto

            </Link>

          )}

          {/* USER */}
          {isLoggedIn ? (

            <div className="
            mt-4
            bg-white
            border
            border-gray-100
            rounded-3xl
            p-4
            shadow-sm
            ">

              <div className="
              flex
              items-center
              gap-3
              ">

                <div className="
                w-14
                h-14
                rounded-full
                bg-[#A3161A]
                text-white
                flex
                items-center
                justify-center
                font-black
                text-xl
                "
                >

                  {userInitial}

                </div>

                <div className="
                min-w-0
                ">

                  <p className="
                  font-black
                  text-black
                  truncate
                  ">

                    {userName}

                  </p>

                  <p className="
                  text-sm
                  text-gray-500
                  truncate
                  ">

                    {userEmail}

                  </p>

                </div>

              </div>

              {/* OPTIONS */}
              <div className="
mt-4
flex
flex-col
gap-2
">

  <button
    onClick={() =>
      setProfileModal(true)
    }
    className="
    flex
    items-center
    gap-3
    h-12
    px-3
    rounded-2xl
    hover:bg-gray-100
    transition
    "
  >

    <User size={18} />

    <span className="
    font-medium
    text-black
    ">

      Mi Perfil

    </span>

  </button>

  <button
    onClick={() => {

      setPasswordModal(true)
      setMenuOpen(false)

    }}
    className="
    flex
    items-center
    gap-3
    h-12
    px-3
    rounded-2xl
    hover:bg-gray-100
    transition
    "
  >

    <Lock size={18} />

    <span className="
    font-medium
    text-black
    ">

      Cambiar Contraseña

    </span>

  </button>

  <button
    onClick={() => {

      setDeleteModal(true)
      setMenuOpen(false)

    }}
    className="
    flex
    items-center
    gap-3
    h-12
    px-3
    rounded-2xl
    hover:bg-red-50
    transition
    text-red-500
    "
  >

    <span className="
    text-xl
    ">

      🗑️

    </span>

    <span className="
    font-semibold
    ">

      Eliminar Cuenta

    </span>

  </button>

  <button
    onClick={logoutHandler}
    className="
    flex
    items-center
    gap-3
    h-12
    px-3
    rounded-2xl
    hover:bg-red-50
    text-red-500
    transition
    "
  >

    <LogOut size={18} />

    <span className="
    font-semibold
    ">

      Cerrar Sesión

    </span>

  </button>

</div>

            </div>

          ) : (

            <Link
              to="/login"
              onClick={() =>
                setMenuOpen(false)
              }
              className="
              mt-4
              bg-[#A3161A]
              text-white
              rounded-2xl
              h-14
              flex
              items-center
              justify-center
              font-bold
              shadow-sm
              "
            >

              Iniciar sesión

            </Link>

          )}

        </div>

      </div>
    {/* PROFILE MODAL */}
{profileModal && (

  <div className="
  fixed
  inset-0
  bg-black/40
  backdrop-blur-sm
  z-[100]
  flex
  items-center
  justify-center
  p-4
  ">

    <div className="
    w-full
    max-w-md
    bg-white
    rounded-[32px]
    p-6
    shadow-2xl
    ">

      {/* TOP */}
      <div className="
      flex
      items-center
      justify-between
      mb-6
      ">

        <h2 className="
        text-2xl
        font-black
        text-black
        ">

          Mi Perfil

        </h2>

        <button
          onClick={() =>
            setProfileModal(false)
          }
          className="
          w-10
          h-10
          rounded-full
          bg-gray-100
          flex
          items-center
          justify-center
          "
        >

          <X size={20} />

        </button>

      </div>

      {/* INPUTS */}
      <div className="
      flex
      flex-col
      gap-4
      ">

        <input
          type="text"
          placeholder="Nombre"
          value={editName}
          onChange={(e) =>
            setEditName(e.target.value)
          }
          className="
          h-12
          rounded-2xl
          border
          border-gray-200
          px-4
          outline-none
          "
        />

        <input
          type="email"
          placeholder="Correo"
          value={editEmail}
          onChange={(e) =>
            setEditEmail(e.target.value)
          }
          className="
          h-12
          rounded-2xl
          border
          border-gray-200
          px-4
          outline-none
          "
        />

<div className="
relative
">

  <input
    type={
      showEditPassword
        ? "text"
        : "password"
    }
    placeholder="Contraseña actual"
    value={editPassword}
    onChange={(e) =>
      setEditPassword(
        e.target.value
      )
    }
    className="
    w-full
    h-12
    rounded-2xl
    border
    border-gray-200
    px-4
    pr-12
    outline-none
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowEditPassword(
        !showEditPassword
      )
    }
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-gray-400
    "
  >

    {showEditPassword
      ? <EyeOff size={20} />
      : <Eye size={20} />
    }

  </button>

</div>

</div>

{/* BUTTONS */}
<div className="
mt-6
flex
gap-3
">

        <button
          onClick={() =>
            setProfileModal(false)
          }
          className="
          flex-1
          h-12
          rounded-2xl
          bg-gray-100
          font-bold
          "
        >

          Cancelar

        </button>

        <button
          onClick={updateProfileHandler}
          className="
          flex-1
          h-12
          rounded-2xl
          bg-[#A3161A]
          text-white
          font-bold
          "
        >

          Guardar

        </button>

      </div>

    </div>

  </div>

)}
{/* PASSWORD MODAL */}
{passwordModal && (

  <div className="
  fixed
  inset-0
  bg-black/40
  backdrop-blur-sm
  z-[100]
  flex
  items-center
  justify-center
  p-4
  ">

    <div className="
    w-full
    max-w-md
    bg-white
    rounded-[32px]
    p-6
    shadow-2xl
    ">

      {/* TOP */}
      <div className="
      flex
      items-center
      justify-between
      mb-6
      ">

        <h2 className="
        text-2xl
        font-black
        text-black
        ">

          Cambiar Contraseña

        </h2>

        <button
          onClick={() => {

  setPasswordModal(false)

  setCurrentPassword("")
  setNewPassword("")
  setConfirmPassword("")

}}

        >

          <X size={20} />

        </button>

      </div>

      {/* INPUTS */}
      <div className="
      flex
      flex-col
      gap-4
      ">

        <div className="
relative
">

<input
  type={
    showCurrentPassword
      ? "text"
      : "password"
  }
  placeholder="Contraseña actual"
  value={currentPassword}
  onChange={(e) =>
    setCurrentPassword(
      e.target.value
    )
  }
  className="
  w-full
  h-12
  rounded-2xl
  border
  border-gray-200
  px-4
  pr-12
  outline-none
  "
/>
  <button
    type="button"
    onClick={() =>
      setShowCurrentPassword(
  !showCurrentPassword
)
    }
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-gray-400
    "
  >

    {showCurrentPassword
      ? <EyeOff size={20} />
      : <Eye size={20} />
    }

  </button>

</div>

        <div className="
relative
">

  <input
    type={
      showNewPassword
        ? "text"
        : "password"
    }
    placeholder="Nueva contraseña"
    value={newPassword}
    onChange={(e) =>
      setNewPassword(
        e.target.value
      )
    }
    className="
    w-full
    h-12
    rounded-2xl
    border
    border-gray-200
    px-4
    pr-12
    outline-none
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowNewPassword(
        !showNewPassword
      )
    }
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-gray-400
    "
  >

    {showNewPassword
      ? <EyeOff size={20} />
      : <Eye size={20} />
    }

  </button>

</div>

        <div className="
relative
">

  <input
    type={
      showConfirmPassword
        ? "text"
        : "password"
    }
    placeholder="Confirmar contraseña"
    value={confirmPassword}
    onChange={(e) =>
      setConfirmPassword(
        e.target.value
      )
    }
    className="
    w-full
    h-12
    rounded-2xl
    border
    border-gray-200
    px-4
    pr-12
    outline-none
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowConfirmPassword(
        !showConfirmPassword
      )
    }
    className="
    absolute
    right-4
    top-1/2
    -translate-y-1/2
    text-gray-400
    "
  >

    {showConfirmPassword
      ? <EyeOff size={20} />
      : <Eye size={20} />
    }

 </button>

</div>

</div>


{/* BUTTONS */}
      <div className="
      mt-6
      flex
      gap-3
      ">

        <button
          onClick={() =>
            setPasswordModal(false)
          }
          className="
          flex-1
          h-12
          rounded-2xl
          bg-gray-100
          font-bold
          "
        >

          Cancelar

        </button>

        <button
          onClick={changePasswordHandler}
          className="
          flex-1
          h-12
          rounded-2xl
          bg-[#A3161A]
          text-white
          font-bold
          "
        >

          Actualizar

        </button>

      </div>

    </div>

  </div>

)}
{/* DELETE MODAL */}
{deleteModal && (

  <div className="
  fixed
  inset-0
  bg-black/40
  backdrop-blur-sm
  z-[100]
  flex
  items-center
  justify-center
  p-4
  ">

    <div className="
    w-full
    max-w-md
    bg-white
    rounded-[32px]
    p-6
    shadow-2xl
    ">

      <h2 className="
      text-2xl
      font-black
      text-red-500
      mb-3
      ">

        Eliminar Cuenta

      </h2>

      <p className="
      text-gray-500
      mb-6
      ">

        ¿Seguro que deseas eliminar tu cuenta?
        Todos tus datos serán eliminados permanentemente.

      </p>

      <div className="
      flex
      gap-3
      ">

        <button
          onClick={() =>
            setDeleteModal(false)
          }
          className="
          flex-1
          h-12
          rounded-2xl
          bg-gray-100
          font-bold
          "
        >

          Cancelar

        </button>

        <button
          onClick={deleteAccountHandler}
          className="
          flex-1
          h-12
          rounded-2xl
          bg-red-500
          text-white
          font-bold
          "
        >

          Eliminar

        </button>

      </div>

    </div>

  </div>

)}
    </>

  )

}

export default Navbar