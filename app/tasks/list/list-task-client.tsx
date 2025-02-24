"use client";
import { useEffect, useState } from "react";
import {assignTask, fetchAssignedTasks, getTasks} from "@/app/utils/route";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/app/redux/taskSlice";
import { RootState } from "@/app/redux/store";
import {AxiosError} from "axios";
import {User} from "@/app/types/user";

export default function ListTaskClient() {
    const dispatch = useDispatch();
    const router = useRouter();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    // @ts-ignore
    const user: User= useSelector((state: RootState) => state.auth.user);

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                const response =
                    user?.role === "admin" || user?.role === "manager"
                        ? await getTasks()
                        : await fetchAssignedTasks(user?.id);

                dispatch(setTasks(response.data));
            } catch (err) {
                const axiosError = err as AxiosError<{ message: string }>;
                setError(axiosError.response?.data?.message || "Failed to fetch tasks");
            } finally {
                setLoading(false);
            }
        };

        fetchTasks().catch(console.error);
    }, [dispatch]);

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            {loading ? <p>Loading tasks...</p> : error ? <p className="text-red-500">{error}</p> : (
                <ul className="space-y-4">
                    {tasks.map((task) => (
                        <li key={task.id} className="p-4 border rounded shadow-md">
                            <h3 className="text-lg font-semibold">{task.title}</h3>
                            <p>{task.description}</p>
                            <p className="text-sm text-gray-500">Status: {task.status}</p>
                            <div className="mt-2 space-x-2">
                                <button onClick={() => router.push(`/tasks/update/${task.id}`)} className="px-4 py-2 bg-blue-500 text-white rounded">Edit</button>
                                <button onClick={() => router.push(`/tasks/delete/${task.id}`)} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
                                <button onClick={() => router.push(`/tasks/assign/${task.id}`)} className="px-4 py-2 bg-green-500 text-white rounded">Assign</button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
