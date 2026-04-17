import express from "express"
import { registerUser, loginUser, getUser } from "../controller/user.controller.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/create", registerUser)
router.post("/login", loginUser)
router.get("/get", verifyToken, getUser)

export default router