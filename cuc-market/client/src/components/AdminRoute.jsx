import {
  Navigate
} from "react-router-dom"

function AdminRoute({
  children
}) {

  const userInfo = JSON.parse(
    localStorage.getItem("userInfo")
  )

  // NO LOGUEADO
  if (!userInfo) {

    return <Navigate to="/login" />

  }

  // NO ADMIN
  if (
    !userInfo?.user?.isAdmin
  ) {

    return <Navigate to="/" />

  }

  // ADMIN
  return children

}

export default AdminRoute