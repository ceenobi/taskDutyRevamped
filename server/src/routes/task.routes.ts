import express from "express"
import { createTask, getAllTasks, getUserTasks, getASingleTask, updateATask, deleteATask } from "src/controller/task.controller"
import verifyToken from "src/middleware/verifyToken"

const router = express.Router()

router.post("/create", verifyToken, createTask)
router.get("/all", verifyToken, getAllTasks)
router.get("/user", verifyToken, getUserTasks)
router.get("/get/:taskId", verifyToken, getASingleTask)
router.patch("/update/:taskId", verifyToken, updateATask)
router.delete("/delete/:taskId", verifyToken, deleteATask)

export default router