import { useNavigate, useLocation } from "react-router"
import { useEffect, type ReactNode } from "react"
import type { User } from "../context";

type RouteGuardProps = {
    children: ReactNode;
    user: User;
}

export function PrivateRoutes({ children, user }: RouteGuardProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/login"

    useEffect(() => {
        if (!user) {
            navigate(from, {
                state: { from: location },
                replace: true
            })
        }
    }, [user, from, location, navigate])

    return children
}


export function PublicRoutes({ children, user }: RouteGuardProps) {
    const location = useLocation()
    const navigate = useNavigate()
    const from = location.state?.from || "/"

    useEffect(() => {
        if (user) {
            navigate(from, {
                state: { from: location },
                replace: true
            })
        }
    }, [user, from, location, navigate])

    return children
}