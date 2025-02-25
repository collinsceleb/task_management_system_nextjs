"use client";
import {JSX, useEffect, useState} from "react";
import {fetchAssignedTasks, getCsrfToken, getTasks} from "@/app/utils/route";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { setTasks } from "@/app/redux/taskSlice";
import { RootState } from "@/app/redux/store";
import {AxiosError} from "axios";

export default function ListTaskClient() {
    const dispatch = useDispatch();
    const router = useRouter();
    const tasks = useSelector((state: RootState) => state.tasks.tasks);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const user = useSelector((state: RootState) => state.auth.user);
    console.log(user)

    useEffect(() => {
        const fetchTasks = async () => {
            try {
                let response;
                if (user?.role === "admin" || user?.role === "manager") {
                    response = await getTasks();
                    console.log("response.data", JSON.stringify(response.data))
                } else {
                    if (typeof user?.id !== "number") {
                        throw new Error("User ID is not a number");
                    }
                    response = await fetchAssignedTasks(user.id);
                    console.log("response.data", JSON.stringify(response.data))
                }

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
    console.log("Redux Tasks:", tasks)
    console.log("Tasks array:", tasks, "Is array:", Array.isArray(tasks))
    return (
        <div className="max-w-4xl mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Tasks</h2>
            {loading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : Array.isArray(tasks) && tasks.length > 0 ? (
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
            ) : (
                <p>No tasks available</p>
            )}
        </div>
    );
}
