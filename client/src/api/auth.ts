import axiosClient from "../libs/axiosClient";
import type { registerSchemaType, loginSchemaType } from "../libs/formValidation";

export const registerUserApi = async (formData: registerSchemaType) => {
    return await axiosClient.post("/api/users/create", formData)
}

export const loginUserApi = async (formData: loginSchemaType) => {
    return await axiosClient.post("/api/users/login", formData)
}

export const getAuthUserApi = async (accessToken: string) => {
    return await axiosClient.get("/api/users/get", {
        headers: {
            Authorization: `Bearer ${accessToken}`
        }
    })
}