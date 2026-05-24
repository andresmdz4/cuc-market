import {
  BrowserRouter,
  Routes,
  Route
} from "react-router-dom"

import Home from "./pages/Home"
import Products from "./pages/Products"
import Login from "./pages/Login"
import Register from "./pages/Register"
import AddProduct from "./pages/AddProduct"
import ProductDetail from "./pages/ProductDetail"
import Admin from "./pages/Admin"

import Footer from "./components/Footer"
import AdminRoute from "./components/AdminRoute"

function App() {

  return (

    <BrowserRouter>

      <Routes>

        {/* HOME */}
        <Route
          path="/"
          element={<Home />}
        />

        {/* PRODUCTS */}
        <Route
          path="/products"
          element={<Products />}
        />

        {/* PRODUCT DETAIL */}
        <Route
          path="/product/:id"
          element={<ProductDetail />}
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

        {/* ADD PRODUCT */}
        <Route
          path="/add-product"
          element={<AddProduct />}
        />

        {/* ADMIN */}
<Route
  path="/admin"
  element={

    <AdminRoute>

      <Admin />

    </AdminRoute>

  }
/>

      </Routes>

      <Footer />

    </BrowserRouter>

  )

}

export default App