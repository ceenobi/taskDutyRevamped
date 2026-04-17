import { Link } from "react-router";
import type { TaskProps } from "../libs/types";
import { SquarePen } from "lucide-react";
import DeleteModal from "./DeleteModal";


export default function TaskCard({ task }: { task: TaskProps }) {
    return (
        <div key={task._id} className="border border-gray-200 rounded-md p-4">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4">
                <h1 className="text-red-400 text-xl">{task.tag}</h1>
                <div className="flex gap-6 items-center">
                    <Link to={`/edit-task/${task._id}`}>
                        <button className="btn bg-textPurple text-white"> <SquarePen /> Edit</button>
                    </Link>
                    <DeleteModal task={task} />
                </div>
            </div>
            <div className='py-2'>
                <h1 className="text-xl lg:text-[35px] text-textBlack font-medium">{task.title}</h1>
                <p className="text-textGray text-base lg:text-[24px]">{task.description}</p>
            </div>
        </div>
    )
}
