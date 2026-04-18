import { Link } from "react-router"


export default function NotFound() {
    return (
        <div className="container mx-auto p-4 flex justify-center items-center min-h-screen">
            <div className="text-center space-y-4">
                <h1 className="text-3xl font-bold text-red-500">OOPS! Not Found</h1>
                <p>The page you are looking for does not exist.</p>
                <Link to="/">
                    <button className="btn bg-textPurple text-white">Go Home</button>
                </Link>
            </div>
        </div>
    )
}
