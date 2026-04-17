import { z } from 'zod'

export const createTaskSchema = z.object({
    title: z.string().min(5, {
        message: "Title should not be less than 5 characters"
    }).max(50, {
        message: "Title should not be greater than 50 characters"
    }),
    description: z.string().min(10, {
        message: "Description should not be less than 10 characters"
    }).max(200, {
        message: "Description should not be greater than 200 characters"
    }),
    tag: z.enum(["urgent", "important"])
})

export type createTaskType = z.infer<typeof createTaskSchema>

export const loginSchema = z.object({
    username: z.string().min(5, {
        message: "Username should be at least 5 characters"
    }),
    password: z.string().min(5, {
        message: "Password should be at least 5 characters"
    })
})

export type loginSchemaType = z.infer<typeof loginSchema>

export const registerSchema = z.object({
    username: z.string().min(5, {
        message: "Username should be at least 5 characters"
    }),
    email: z.email({
        message: "Please enter a valid email"
    }),
    password: z.string().min(5, {
        message: "Password should be at least 5 characters"
    })
})

export type registerSchemaType = z.infer<typeof registerSchema>