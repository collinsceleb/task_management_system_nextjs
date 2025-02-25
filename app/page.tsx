"use client";
import { useEffect, useState } from "react";
import { getTasks } from "./utils/route";
import { useRouter } from "next/navigation";
import {Task} from "@/app/types/Task";

export default function Home() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        if (!token) {
            setIsAuthenticated(false);
        } else {
            setIsAuthenticated(true);
            fetchTasks().catch(console.error);
        }
    }, []);

    const fetchTasks = async () => {
        try {
            const response = await getTasks();
            setTasks(response.data);
        } catch (err: any) {
            setError("Failed to load tasks.");
        } finally {
            setLoading(false);
        }
    };

    if (!isAuthenticated) {
        return (
            <div className="text-center mt-20">
                <h1 className="text-2xl font-bold">Welcome to Task Manager</h1>
                <p className="text-gray-600">Please login or register to manage tasks.</p>
            </div>
        );
    }

    return (
        <div className="max-w-4xl mx-auto p-6">
            <h1 className="text-3xl font-bold mb-6">Dashboard</h1>

            {loading ? (
                <p>Loading tasks...</p>
            ) : error ? (
                <p className="text-red-500">{error}</p>
            ) : (
                <>
                    {tasks.length > 0 ? (
                        <ul className="space-y-4">
                            {tasks.map((task) => (
                                <li key={task.id} className="p-4 bg-gray-100 rounded shadow flex justify-between items-center">
                                    <div>
                                        <h3 className="text-xl font-semibold">{task.title}</h3>
                                        <p className="text-gray-600">{task.description}</p>
                                        <p className={`mt-1 font-medium ${task.status === "completed" ? "text-green-600" : "text-yellow-600"}`}>
                                            Status: {task.status}
                                        </p>
                                    </div>
                                    <button
                                        className="px-3 py-1 bg-blue-500 text-white rounded"
                                        onClick={() => router.push(`/tasks/update/${task.id}`)}
                                    >
                                        Edit
                                    </button>
                                </li>
                            ))}
                        </ul>
                    ) : (
                        <p className="text-gray-600">No tasks found.</p>
                    )}
                </>
            )}
        </div>
    );
}
