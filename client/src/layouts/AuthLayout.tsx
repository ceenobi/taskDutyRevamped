import { Outlet, Link } from "react-router";


export default function AuthLayout() {
    return (
        <div className="container mx-auto p-4">
            <div className="w-full max-w-sm mx-auto flex flex-col justify-center items-center h-screen space-y-8">
                <Link to="/">
                    <img src="/logo.png" alt="logo" className="w-fit mx-auto" />
                </Link>
                <Outlet />
            </div>
        </div>
    )
}
