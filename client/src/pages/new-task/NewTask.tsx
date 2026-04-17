import { useForm, type SubmitHandler } from "react-hook-form"
import { createTaskSchema, type createTaskType } from "../../libs/formValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import { ChevronLeft } from "lucide-react";
import { Link, useNavigate } from "react-router";
import { createTaskApi } from "../../api/task";
import { toast } from "sonner";
import { useAuth } from "../../context";
import axios from "axios"

export default function NewTask() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<createTaskType>({
        resolver: zodResolver(createTaskSchema)
    })
    const { accessToken } = useAuth()
    const navigate = useNavigate()


    const onFormSubmit: SubmitHandler<createTaskType> = async (data) => {
        try {
            const res = await createTaskApi(data, accessToken)
            if (res.status === 201) {
                toast.success(res.data.msg)
                navigate("/my-tasks")
            }
        } catch (error) {
            console.log(error)
            const message = axios.isAxiosError(error) && error?.response?.data && typeof (error?.response?.data as { error?: unknown }).error === "string" ? (error?.response?.data as { error: string }).error : "Something went wrong"
            toast.error(message)
        }
    }


    return (
        <div className="container py-8 px-4 mx-auto">
            <div className="flex gap-2 items-center text-[34px] text-textBlack">
                <Link to="/my-tasks">
                    <ChevronLeft size={30} />
                </Link>
                <h1>New Task</h1>
            </div>
            <form onSubmit={handleSubmit(onFormSubmit)} className="w-full space-y-6">
                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                    <legend className="fieldset-legend">Title</legend>
                    <input type="text" className="input w-full" placeholder="Eg: Project Defence, Assignment" {...register("title")} />
                    {errors?.title && <p className="text-red-500 label">{errors?.title?.message}</p>}
                </fieldset>

                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                    <legend className="fieldset-legend">Description</legend>
                    <textarea className="textarea w-full" placeholder="Briefly describe your task" {...register("description")} rows={8}></textarea>
                    {errors?.description && <p className="text-red-500 label">{errors?.description?.message}</p>}
                </fieldset>

                <fieldset className="fieldset bg-base-100 border-base-300 rounded-box w-full border p-4">
                    <legend className="fieldset-legend">Tag</legend>
                    <select defaultValue="Pick a tag" className="select w-full"
                        {...register("tag")}>
                        <option disabled={true}>Pick a tag</option>
                        <option value="urgent">Urgent</option>
                        <option value="important">Important</option>
                    </select>
                    {errors?.tag && <p className="text-red-500 label">{errors?.tag?.message}</p>}
                </fieldset>
                <button type="submit" className="btn bg-textPurple text-white w-full btn-lg" disabled={isSubmitting}>
                    {isSubmitting ?
                        <span className="loading loading-spinner loading-sm"></span> : "Submit"
                    }
                </button>
            </form>
        </div>
    )
}
