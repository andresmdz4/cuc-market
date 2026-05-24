import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import axios from "axios"
import {
  Eye,
  EyeOff
} from "lucide-react"
import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"

function Login() {

  const navigate = useNavigate()

  const [email, setEmail] =
    useState("")

  const [password, setPassword] =
    useState("")

  const [showPassword,
  setShowPassword] =
  useState(false)

  const [loading, setLoading] =
    useState(false)

  const [error, setError] =
    useState("")

  const submitHandler = async (e) => {

    e.preventDefault()

    try {

      setLoading(true)

      setError("")

      const { data } = await axios.post(

        "https://cuc-market.onrender.com/api/auth/login",

        {
          email,
          password
        }

      )

      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      )

      navigate("/")

    } catch (err) {

      setError(
        err.response?.data?.message ||
        "Error al iniciar sesión"
      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <PageTransition>

      {/* CONTENEDOR */}
      <div className="
      min-h-screen
      relative
      overflow-hidden
      bg-gradient-to-br
      from-[#fff7f7]
      via-[#ffffff]
      to-[#f4f4f5]
      ">

        {/* LIGHT EFFECT TOP */}
        <div className="
        absolute
        top-[-120px]
        left-[-120px]
        w-[420px]
        h-[420px]
        bg-[#A3161A]/10
        rounded-full
        blur-3xl
        animate-pulse
        " />

        {/* RIGHT GLOW */}
        <div className="
        absolute
        top-[140px]
        right-[-120px]
        w-[350px]
        h-[350px]
        bg-red-300/10
        rounded-full
        blur-3xl
        " />

        {/* CENTER LIGHT */}
        <div className="
        absolute
        top-[45%]
        left-[50%]
        -translate-x-1/2
        -translate-y-1/2
        w-[500px]
        h-[500px]
        bg-[#A3161A]/5
        rounded-full
        blur-3xl
        " />

        {/* BOTTOM LIGHT */}
        <div className="
        absolute
        bottom-[-140px]
        left-[20%]
        w-[380px]
        h-[380px]
        bg-pink-200/10
        rounded-full
        blur-3xl
        " />

        {/* FLOATING GLASS 1 */}
        <div className="
        absolute
        top-[120px]
        left-[8%]
        w-[180px]
        h-[180px]
        rounded-[40px]
        border
        border-white/30
        bg-white/10
        backdrop-blur-2xl
        rotate-12
        shadow-2xl
        " />

        {/* FLOATING GLASS 2 */}
        <div className="
        absolute
        bottom-[120px]
        right-[10%]
        w-[220px]
        h-[220px]
        rounded-full
        border
        border-white/30
        bg-white/10
        backdrop-blur-2xl
        shadow-2xl
        " />

        {/* NAVBAR */}
        <div className="
        relative
        z-20
        ">

          <Navbar />

        </div>

        {/* CONTENIDO */}
        <section className="
        relative
        z-10
        flex
        items-center
        justify-center
        px-6
        py-28
        ">

          {/* CARD */}
          <div className="
          w-full
          max-w-md
          backdrop-blur-2xl
          bg-white/95
          border
          border-white/60
          rounded-3xl
          shadow-2xl
          p-10
          ">

            {/* TITULO */}
            <h1 className="
            text-4xl
            font-black
            text-black
            text-center
            ">

              Bienvenido

            </h1>

            <p className="
            text-gray-500
            text-center
            mt-4
            ">

              Inicia sesión para gestionar tus productos

            </p>

            {/* ERROR */}
            {error && (

              <div className="
              mt-5
              bg-red-50
              border
              border-red-200
              text-red-500
              rounded-2xl
              px-4
              py-3
              text-sm
              ">

                {error}

              </div>

            )}

            {/* FORM */}
            <form
              onSubmit={submitHandler}
              className="
              mt-10
              space-y-5
              "
            >

              {/* EMAIL */}
              <input
                type="email"
                placeholder="Correo electrónico"
                value={email}
                onChange={(e) =>
                  setEmail(e.target.value)
                }
                className="
                w-full
                px-5
                py-4
                rounded-2xl
                border
                border-gray-200
                bg-white/70
                outline-none
                focus:border-[#A3161A]
                focus:ring-2
                focus:ring-[#A3161A]/20
                transition
                "
              />

{/* PASSWORD */}
<div className="
relative
">

  <input
    type={
      showPassword
        ? "text"
        : "password"
    }
    placeholder="Contraseña"
    value={password}
    onChange={(e) =>
      setPassword(e.target.value)
    }
    className="
    w-full
    px-5
    py-4
    rounded-2xl
    border
    border-gray-200
    bg-white/70
    outline-none
    focus:border-[#A3161A]
    focus:ring-2
    focus:ring-[#A3161A]/20
    transition
    pr-14
    "
  />

  <button
    type="button"
    onClick={() =>
      setShowPassword(
        !showPassword
      )
    }
    className="
    absolute
    right-5
    top-1/2
    -translate-y-1/2
    text-gray-400
    "
  >

{showPassword
  ? "🙈"
  : "👁️"}

  </button>

</div>
              {/* BOTÓN */}
              <button
                type="submit"
                disabled={loading}
                className="
                w-full
                bg-[#A3161A]
                text-white
                py-4
                rounded-2xl
                hover:bg-[#8d1316]
                transition-all
                duration-300
                shadow-xl
                font-semibold
                hover:scale-[1.02]
                disabled:opacity-70
                "
              >

                {loading
                  ? "Ingresando..."
                  : "Iniciar Sesión"}

              </button>

            </form>

            {/* REGISTER */}
            <p className="
            text-center
            text-gray-600
            mt-8
            ">

              ¿No tienes cuenta?

              <Link
                to="/register"
                className="
                text-[#A3161A]
                font-semibold
                ml-2
                hover:underline
                "
              >

                Crear cuenta

              </Link>

            </p>

          </div>

        </section>

      </div>

    </PageTransition>

  )

}

export default Login