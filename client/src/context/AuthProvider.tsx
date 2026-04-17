import { type ReactNode, useState, useEffect } from 'react'
import { AuthProviderContext, type User } from '.'
import { getAuthUserApi } from '../api/auth'
import SuspenseUi from '../components/SuspenseUi'
import axios from 'axios'

type AuthProviderProps = {
    children: ReactNode
}


export default function AuthProvider({ children }: AuthProviderProps) {
    const [user, setUser] = useState<User | null>(null)
    const [accessToken, setAccessToken] = useState<string>(() => {
        //retrieve data from localstorage
        const persistedState = localStorage.getItem("TaskDutyAuthKey")
        return persistedState ? persistedState : ""
    })
    const [authenticating, setAuthenticating] = useState<boolean>(false)

    useEffect(() => {
        localStorage.setItem("TaskDutyAuthKey", accessToken)
    }, [accessToken])

    useEffect(() => {
        if (!accessToken) return
        const getUser = async () => {
            setAuthenticating(true)
            try {
                const res = await getAuthUserApi(accessToken)
                if (res.status === 200) {
                    setUser(res.data.user)
                }
            } catch (error: unknown) {
                const message =
                    axios.isAxiosError(error) &&
                        error.response?.data &&
                        typeof (error.response.data as { error?: unknown }).error === "string"
                        ? (error.response.data as { error: string }).error
                        : "Failed to authenticate user";
                console.log(message)
            } finally {
                setAuthenticating(false)
            }
        }
        getUser()
    }, [accessToken])

    if (authenticating) return <SuspenseUi />

    const contextValue = { user, setUser, accessToken, setAccessToken }

    return (
        <AuthProviderContext.Provider value={contextValue}>
            {children}
        </AuthProviderContext.Provider>
    )
}