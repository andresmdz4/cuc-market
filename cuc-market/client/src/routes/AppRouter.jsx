import { BrowserRouter, Routes, Route } from "react-router-dom"

// PÁGINAS
import Home from "../pages/Home"
import Products from "../pages/Products"
import Login from "../pages/Login"
import Register from "../pages/Register"
import ProductDetail from "../pages/ProductDetail"

function AppRouter() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PRODUCTOS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* LOGIN */}
        <Route
          path="/login"
          element={<Login />}
        />

        {/* REGISTER */}
        <Route
          path="/register"
          element={<Register />}
        />

        {/* DETALLE PRODUCTO */}
        <Route
          path="/product/:id"
          element={<ProductDetail />}
        />

      </Routes>

    </BrowserRouter>

  )

}

export default AppRouter