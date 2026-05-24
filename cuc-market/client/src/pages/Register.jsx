import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"

import axios from "axios"

import Navbar from "../components/Navbar"
import PageTransition from "../components/PageTransition"

function Register() {

  // NAVIGATION
  const navigate = useNavigate()

  // STATES
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")

  // SHOW PASSWORD
  const [showPassword, setShowPassword] = useState(false)

  // FOCUS PASSWORD
  const [passwordFocused, setPasswordFocused] = useState(false)

  // ERROR
  const [error, setError] = useState("")

  // LOADING
  const [loading, setLoading] = useState(false)

  // VALIDAR EMAIL
  const emailIsValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  // VALIDACIONES PASSWORD
  const hasMinLength = password.length >= 6
  const hasUppercase = /[A-Z]/.test(password)
  const hasNumber = /[0-9]/.test(password)

  // PASSWORD VÁLIDA
  const isPasswordValid = (
    hasMinLength &&
    hasUppercase &&
    hasNumber
  )

  // SUBMIT
  const handleSubmit = async (e) => {

    e.preventDefault()

    setError("")

    // VALIDAR EMAIL
    if (!emailIsValid) {

      return setError(
        "Ingresa un correo válido"
      )

    }

    // VALIDAR PASSWORDS
    if (password !== confirmPassword) {

      return setError(
        "Las contraseñas no coinciden"
      )

    }

    // VALIDAR PASSWORD
    if (!isPasswordValid) {

      return setError(
        "La contraseña no cumple los requisitos"
      )

    }

    try {

      setLoading(true)

      // REQUEST
      const { data } = await axios.post(

        "https://cuc-market.onrender.com/api/auth/register",

        {
          name,
          email,
          password
        }

      )

      // GUARDAR SESIÓN
      localStorage.setItem(
        "userInfo",
        JSON.stringify(data)
      )

      // REDIRECT
      navigate("/")

    } catch (error) {

      setError(

        error.response?.data?.message ||

        "Error al registrar usuario"

      )

    } finally {

      setLoading(false)

    }

  }

  return (

    <PageTransition>

      <div
  className="
  min-h-screen
  relative
  overflow-hidden
  bg-cover
  bg-center
  bg-no-repeat
  "
  style={{
    backgroundImage:
      "url('/cuc-rend.png')"
  }}
>

        {/* NAVBAR */}
        <Navbar />

        {/* CONTENT */}
        <section className="flex items-center justify-center px-6 py-20">

          {/* CARD */}
          <div className="w-full max-w-md backdrop-blur-2xl bg-white/40 border border-white/50 rounded-3xl shadow-2xl p-10">

            {/* TITLE */}
            <h1 className="text-4xl font-black text-gray-800 text-center">
              Crear Cuenta
            </h1>

            <p className="text-gray-500 text-center mt-4">
              Únete a CUC Market y publica tus emprendimientos
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
                placeholder="Nombre completo"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/70 outline-none focus:border-[#A3161A] focus:ring-2 focus:ring-[#A3161A]/20 transition"
              />

              {/* EMAIL */}
              <div>

                <input
                  type="email"
                  placeholder="Correo electrónico"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className={`w-full px-5 py-4 rounded-2xl border bg-white/70 outline-none transition
                  
                  ${email.length > 0 && !emailIsValid
                    ? "border-red-400 focus:ring-red-200"
                    : "border-gray-200 focus:border-[#A3161A] focus:ring-2 focus:ring-[#A3161A]/20"
                  }`}
                />

                {/* EMAIL ERROR */}
                {email.length > 0 && !emailIsValid && (

                  <p className="text-red-500 text-sm mt-2">
                    Ingresa un correo válido
                  </p>

                )}

              </div>

              {/* PASSWORD */}
              <div className="relative">

                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Contraseña"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setPasswordFocused(true)}
                  onBlur={() => setPasswordFocused(false)}
                  className="w-full px-5 py-4 pr-14 rounded-2xl border border-gray-200 bg-white/70 outline-none focus:border-[#A3161A] focus:ring-2 focus:ring-[#A3161A]/20 transition"
                />

                {/* TOGGLE */}
                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(!showPassword)
                  }
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#A3161A]"
                >

                  {showPassword ? "🙈" : "👁️"}

                </button>

              </div>

              {/* PASSWORD REQUIREMENTS */}
              {passwordFocused && (

                <div className="space-y-2 text-sm">

                  <p className={hasMinLength ? "text-green-600" : "text-red-500"}>
                    {hasMinLength ? "✅" : "❌"} Mínimo 6 caracteres
                  </p>

                  <p className={hasUppercase ? "text-green-600" : "text-red-500"}>
                    {hasUppercase ? "✅" : "❌"} Una mayúscula
                  </p>

                  <p className={hasNumber ? "text-green-600" : "text-red-500"}>
                    {hasNumber ? "✅" : "❌"} Un número
                  </p>

                </div>

              )}

              {/* CONFIRM PASSWORD */}
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Confirmar contraseña"
                value={confirmPassword}
                onChange={(e) =>
                  setConfirmPassword(e.target.value)
                }
                className="w-full px-5 py-4 rounded-2xl border border-gray-200 bg-white/70 outline-none focus:border-[#A3161A] focus:ring-2 focus:ring-[#A3161A]/20 transition"
              />

              {/* BUTTON */}
              <button
                type="submit"
                disabled={loading}
                className="w-full bg-[#A3161A] text-white py-4 rounded-2xl hover:bg-[#8d1316] transition-all duration-300 shadow-xl font-semibold hover:scale-[1.02]"
              >

                {loading
                  ? "Creando cuenta..."
                  : "Crear Cuenta"}

              </button>

            </form>

            {/* LOGIN */}
            <p className="text-center text-gray-600 mt-8">

              ¿Ya tienes cuenta?

              <Link
                to="/login"
                className="text-[#A3161A] font-semibold ml-2 hover:underline"
              >
                Inicia sesión
              </Link>

            </p>

          </div>

        </section>

      </div>

    </PageTransition>

  )
}

export default Register