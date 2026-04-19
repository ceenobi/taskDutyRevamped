import { Plus } from 'lucide-react';
import { Link } from 'react-router';
import { getUserTaskApi, searchTasksApi } from '../../api/task';
import { useAuth } from '../../context';
import { toast } from 'sonner';
import { useState, useEffect } from 'react';
import type { TaskProps } from '../../libs/types';
import { useDebounce } from '../../hooks/useDebounce';
import axios from "axios"
import SuspenseUi from '../../components/SuspenseUi';
import TaskCard from '../../components/TaskCard';
import TaskSearch from '../../components/TaskSearch';

export default function MyTasks() {
  const [data, setData] = useState<TaskProps[]>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const debouncedSearch = useDebounce(searchQuery, 350);
  const { accessToken } = useAuth()

  useEffect(() => {
    if (!accessToken) return
    const getTasks = async () => {
      setLoading(true)
      try {
        setError(null)
        const trimmed = debouncedSearch.trim()
        const res = trimmed === ""
          ? await getUserTaskApi(accessToken)
          : await searchTasksApi(accessToken, trimmed)
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
  }, [accessToken, debouncedSearch])

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
      <div className="flex flex-col gap-4 md:flex-row md:justify-between md:items-center">
        <h1 className="font-medium text-2xl md:text-[50px] text-textBlack">My Tasks</h1>
        <Link to="/new-task" className="shrink-0">
          <button className="btn btn-ghost btn-lg text-textPurple">
            <Plus />
            Add New Task
          </button>
        </Link>
      </div>
      <TaskSearch value={searchQuery} onChange={setSearchQuery} />
      {debouncedSearch.trim() !== "" && data.length === 0 ? (
        <p className="text-textGray text-center py-8">No tasks match your search.</p>
      ) : (
        data.map((task) => (
          <TaskCard task={task} key={task._id} />
        ))
      )}
    </div>
  )
}
