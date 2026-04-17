import Task from "../model/task.model"
import createHttpError from "http-errors"
import { Request, Response, NextFunction } from "express"

export const createTask = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id
    const { title, tag, description } = req.body
    try {
        if (!title || !tag || !description) {
            return next(createHttpError(400, "Form parameters are missing"))
        }
        //create note if all parameters are included
        const task = await Task.create({
            userId,
            title,
            tag,
            description
        })
        res.status(201).json({ task, msg: "Task created sucessfully", success: true })
    } catch (error) {
        next(error)
    }
}


export const getUserTasks = async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id
    try {
        const tasks = await Task.find({ userId }).lean()
        if (!tasks) {
            return next(createHttpError(404, "Tasks not found"))
        }
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const getAllTasks = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const tasks = await Task.find().lean().sort({ _id: -1 })
        if (!tasks) {
            return next(createHttpError(404, "Tasks not found"))
        }
        res.status(200).json(tasks)
    } catch (error) {
        next(error)
    }
}

export const getASingleTask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId
    try {
        if (!taskId) {
            return next(createHttpError(400, "Task id is required"))
        }
        //proceed to retrieving the task
        const task = await Task.findById(taskId).lean()
        if (!task) {
            return next(createHttpError(404, "Task not found"))
        }
        res.status(200).json(task)
    } catch (error) {
        next(error)
    }
}


export const updateATask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId
    const userId = req.user.id
    const { title, tag, description } = req.body
    try {
        if (!taskId) {
            return next(createHttpError(400, "Task id is required"))
        }
        const task = await Task.findById(taskId)
        if (!task) {
            return next(createHttpError(404, "Task not found"))
        }
        //check that only owner of task can update the task
        if (!task.userId.equals(userId)) {
            return next(createHttpError(403, "Unauthorized, you cannot perform this action"))
        }
        const updatedTask = {
            title: title || task.title,
            tag: tag || task.tag,
            description: description || task.description
        }
        const newTask = await Task.findByIdAndUpdate(taskId, updatedTask, {
            returnDocument: "after"
        })
        res.status(200).json({ msg: "Task update successful", task: newTask })
    } catch (error) {
        next(error)
    }
}



export const deleteATask = async (req: Request, res: Response, next: NextFunction) => {
    const taskId = req.params.taskId
    const userId = req.user.id
    try {
        if (!taskId) {
            return next(createHttpError(400, "Task id is required"))
        }
        const task = await Task.findById(taskId)
        if (!task) {
            return next(createHttpError(404, "Task not found"))
        }
        if (!task.userId.equals(userId)) {
            return next(createHttpError(403, "Unauthorized, you cannot perform this action"))
        }
        await Task.findByIdAndDelete(taskId)
        res.status(200).json({ msg: "Task deleted" })
    } catch (error) {
        next(error)
    }
}




