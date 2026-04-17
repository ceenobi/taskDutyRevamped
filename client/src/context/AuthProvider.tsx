import { type ReactNode, useState, useEffect } from 'react'
import { AuthProviderContext, type User } from '.'
import { getAuthUserApi } from '../api/auth'
import SuspenseUi from '../components/SuspenseUi'

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
            } catch (error) {
                console.log(error?.response?.data?.error)
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