import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { getUserTaskApi } from '../../api/task';
import { useAuth } from '../../context';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import type { TaskProps } from '../../libs/types';
import axios from "axios"
import SuspenseUi from '../../components/SuspenseUi';
import TaskCard from '../../components/TaskCard';

export default function MyTasks() {
  const [data, setData] = useState<TaskProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { accessToken } = useAuth()

  useEffect(() => {
    const getTasks = async () => {
      setLoading(true)
      try {
        const res = await getUserTaskApi(accessToken)
        if (res.status === 200) {
          setData(res.data)
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
    getTasks()
  }, [accessToken])

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
    <div className="container mx-auto py-8 px-4 space-y-4">
      <div className="flex justify-between items-center">
        <h1 className="font-medium text-2xl md:text-[50px] text-textBlack">My Tasks</h1>
        <Link to="/new-task">
          <button className="btn btn-ghost btn-lg text-textPurple">
            <Plus />
            Add New Task
          </button>
        </Link>
      </div>
      {data.map((task) => (
        <TaskCard task={task} key={task._id} />
      ))}
    </div>
  )
}
