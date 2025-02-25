"use client";
import React, {useEffect, useState} from "react";
import {getTaskById, updateTask} from "@/app/utils/route";
import { useParams, useRouter } from "next/navigation";
import {AxiosError} from "axios";

export default function UpdateTaskClient() {
    const { taskId } = useParams();
    const router = useRouter();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    // ✅ Fetch task details when the page loads
    useEffect(() => {
        const fetchTask = async () => {
            try {
                const response = await getTaskById(parseInt(taskId as string));
                const task = response.data;
                setTitle(task.title);
                setDescription(task.description);
            } catch (err: any) {
                setError(err.response?.data?.message || "Failed to load task");
            } finally {
                setLoading(false);
            }
        };

        if (taskId) {
            fetchTask().catch(console.error);
        }
    }, [taskId]);

    // ✅ Handle task update
    const handleUpdate = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await updateTask(parseInt(taskId as string), { title, description });
            router.push("/tasks/list");
        } catch (err: any) {
            setError(err.response?.data?.message || "Update failed");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Update Task</h2>
            {error && <p className="text-red-500">{error}</p>}
            {loading ? (
                <p>Loading task details...</p>
            ) : (
                <form onSubmit={handleUpdate} className="space-y-4">
                    <input
                        type="text"
                        placeholder="Title"
                        className="w-full p-2 border rounded"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <textarea
                        placeholder="Description"
                        className="w-full p-2 border rounded"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                    />
                    <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">
                        Update Task
                    </button>
                </form>
            )}
        </div>
    );
}
