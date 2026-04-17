import express from "express"
import { registerUser, loginUser, getUser } from "../controller/user.controller"
import verifyToken from "src/middleware/verifyToken"

const router = express.Router()

router.post("/create", registerUser)
router.post("/login", loginUser)
router.get("/get", verifyToken, getUser)

export default router