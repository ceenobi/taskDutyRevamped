import { Loader } from "lucide-react";


export default function SuspenseUi() {
    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex gap-2 items-center">
                <Loader className="animate-spin" />
                <img src="/logo.png" alt="logo" />
            </div>
        </div>
    )
}
