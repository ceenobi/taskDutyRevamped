import axiosClient from "../libs/axiosClient";
import type { createTaskType } from "../libs/formValidation";

export const createTaskApi = async (formData: createTaskType, accessToken: string) => {
    return await axiosClient.post("/api/tasks/create", formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getUserTaskApi = async (accessToken: string) => {
    return await axiosClient.get("/api/tasks/user", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const getSingleTaskApi = async (taskId: string, accessToken: string) => {
    return await axiosClient.get(`/api/tasks/get/${taskId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const updateTaskApi = async (taskId: string, formData: createTaskType, accessToken: string) => {
    return await axiosClient.patch(`/api/tasks/update/${taskId}`, formData, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}

export const deleteTaskApi = async (taskId: string, accessToken: string) => {
    return await axiosClient.delete(`/api/tasks/delete/${taskId}`, {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}