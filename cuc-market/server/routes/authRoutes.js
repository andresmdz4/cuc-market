import express from "express"

const router = express.Router()

import {

  registerUser,
  loginUser,

  updateProfile,
  changePassword,
  deleteAccount

} from "../controllers/authController.js"

import {
  protect
} from "../middleware/authMiddleware.js"



// =====================================
// AUTH
// =====================================

router.post(
  "/register",
  registerUser
)

router.post(
  "/login",
  loginUser
)



// =====================================
// PROFILE
// =====================================

router.put(
  "/profile",
  protect,
  updateProfile
)

router.put(
  "/password",
  protect,
  changePassword
)

router.delete(
  "/delete",
  protect,
  deleteAccount
)



export default router