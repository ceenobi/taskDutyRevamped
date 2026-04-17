import { ChevronLeft } from "lucide-react";
import { Link, useParams, useNavigate } from "react-router";
import { useForm, type SubmitHandler } from "react-hook-form"
import { createTaskSchema, type createTaskType } from "../../libs/formValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import { getSingleTaskApi, updateTaskApi } from "../../api/task";
import { useState, useEffect } from "react";
import type { TaskProps } from "../../libs/types";
import { useAuth } from "../../context";
import axios from "axios";
import { toast } from "sonner";
import SuspenseUi from "../../components/SuspenseUi";


export default function EditTask() {
    const { taskId } = useParams()
    const [singleTask, setSingleTask] = useState<TaskProps | null>(null)
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false);
    const { accessToken } = useAuth()
    const navigate = useNavigate()

    //fetch the single task we need to update
    useEffect(() => {
        if (!taskId) {
            setError("Task id is missing")
            return
        }
        const getTask = async () => {
            setLoading(true)
            try {
                const res = await getSingleTaskApi(taskId, accessToken)
                if (res.status === 200) {
                    setSingleTask(res.data)
                }
            } catch (error) {
                console.log(error)
                const message = axios.isAxiosError(error) && error?.response?.data && typeof (error?.response?.data as { error?: unknown }).error === "string" ? (error?.response?.data as { error: string }).error : "Something went wrong"
                toast.error(message)
                setError(message)
            } finally {
                setLoading(false)
            }
        }
        getTask()
    }, [accessToken, taskId])

    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
        setValue,
    } = useForm<createTaskType>({
        resolver: zodResolver(createTaskSchema),
        defaultValues: {
            title: singleTask?.title || "",
            description: singleTask?.description || "",
            tag: singleTask?.tag || "urgent"
        }
    })

    console.log(singleTask)

    //autofill the form from the single task api we need
    useEffect(() => {
        if (singleTask) {
            setValue("description", singleTask.description)
            setValue("title", singleTask.title)
            setValue("tag", singleTask.tag)
        }

    }, [setValue, singleTask])

    //api call to update the task
    const onFormSubmit: SubmitHandler<createTaskType> = async (data) => {
        if (!taskId) {
            setError("Task id is missing")
            return
        }
        try {
            const res = await updateTaskApi(taskId, data, accessToken)
            if (res.status === 200) {
                toast.success(res.data.msg)
                navigate("/my-tasks")
            }
        } catch (error) {
            console.log(error)
            const message = axios.isAxiosError(error) && error?.response?.data && typeof (error?.response?.data as { error?: unknown }).error === "string" ? (error?.response?.data as { error: string }).error : "Something went wrong"
            toast.error(message)
            setError(message)
        }
    }


    //manage loading and error state
    if (loading) return <SuspenseUi />

    if (error) {
        return (
            <div className='container mx-auto py-8 px-4'>
                <h1 className='text-center font-medium text-2xl text-red-500'>
                    {error}
                </h1>
            </div>
        )
    }

    return (
        <div className="container mx-auto py-8 px-4">
            <div className="flex gap-2 items-center text-[34px] text-textBlack">
                <Link to="/my-tasks">
                    <ChevronLeft size={30} />
                </Link>
                <h1>Edit Task</h1>
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
