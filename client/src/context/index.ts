import { createContext, useContext } from 'react'

export type User = {
    _id: string;
    username: string;
    email: string;
    role: string;
}

export type AuthProviderState = {
    user: User | null;
    setUser: (user: User | null) => void;
    accessToken: string;
    setAccessToken: (accessToken: string) => void;
}

const initialState: AuthProviderState = {
    user: null,
    setUser: () => { },
    accessToken: "",
    setAccessToken: () => { }
}


export const AuthProviderContext = createContext(initialState)


//useAuth is the custom hook meant to consume any data we have put inside our provider store
export const useAuth = () => {
    const context = useContext(AuthProviderContext)
    if (context === undefined) {
        throw new Error("UseAuth must be used within a provider context")
    }
    return context
}