import { useForm, type SubmitHandler } from "react-hook-form"
import { loginSchema, type loginSchemaType } from "../../libs/formValidation";
import { zodResolver } from "@hookform/resolvers/zod"
import { Link } from "react-router"
import { loginUserApi } from "../../api/auth";
import { toast } from "sonner"
import { useAuth } from "../../context";
import axios from 'axios'

export default function Login() {
    const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
    } = useForm<loginSchemaType>({
        resolver: zodResolver(loginSchema)
    })
    const { setAccessToken } = useAuth()

    const onFormSubmit: SubmitHandler<loginSchemaType> = async (data) => {
        try {
            const res = await loginUserApi(data)
            if (res.status === 200) {
                setAccessToken(res.data.accessToken)
                toast.success(res.data.msg)
            }
        } catch (error) {
            console.log(error)
            const message = axios.isAxiosError(error) && error?.response?.data && typeof (error?.response?.data as { error?: unknown }).error === "string" ? (error?.response?.data as { error: string }).error : "Something went wrong"
            toast.error(message)
        }
    }

    return (
        <form className="shadow rounded-md bg-base-200 py-6 px-4 w-full space-y-4" onSubmit={handleSubmit(onFormSubmit)}>
            <h1 className="font-semibold text-center">Login to your account</h1>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Username</legend>
                <input type="text" className="input w-full" placeholder="Your username" {...register("username")} />
                {errors?.username && <p className="text-red-500 label">{errors?.username?.message}</p>}
            </fieldset>
            <fieldset className="fieldset">
                <legend className="fieldset-legend">Password</legend>
                <input type="password" className="input w-full" placeholder="******" {...register("password")} />
                {errors?.password && <p className="text-red-500 label">{errors?.password?.message}</p>}
            </fieldset>
            <button type="submit" className="btn bg-textPurple text-white w-full btn-lg" disabled={isSubmitting}>
                {isSubmitting ?
                    <span className="loading loading-spinner loading-sm"></span> : "Submit"
                }
            </button>
            <p className="text-sm">Do not have an account?
                <Link to="/register" className="font-semibold mx-1">Register</Link>
            </p>
        </form>
    )
}
