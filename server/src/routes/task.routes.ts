import express from "express"
import { createTask, getAllTasks, getUserTasks, searchUserTasks, getASingleTask, updateATask, deleteATask } from "../controller/task.controller.js"
import verifyToken from "../middleware/verifyToken.js"

const router = express.Router()

router.post("/create", verifyToken, createTask)
router.get("/all", verifyToken, getAllTasks)
router.get("/user", verifyToken, getUserTasks)
router.get("/search", verifyToken, searchUserTasks)
router.get("/get/:taskId", verifyToken, getASingleTask)
router.patch("/update/:taskId", verifyToken, updateATask)
router.delete("/delete/:taskId", verifyToken, deleteATask)

export default router