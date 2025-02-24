"use client";
import React, { useState } from "react";
import { createTask } from "../../utils/route";
import { useRouter } from "next/navigation";
import {AxiosError} from "axios";

export default function CreateTaskClient() {
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleCreate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await createTask({ title, description });
            router.push("/tasks/list");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "Task creation failed");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Create Task</h2>
            {error && <p className="text-red-500">{error}</p>}
            <form onSubmit={handleCreate} className="space-y-4">
                <input type="text" placeholder="Title" className="w-full p-2 border rounded" value={title} onChange={(e) => setTitle(e.target.value)} />
                <textarea placeholder="Description" className="w-full p-2 border rounded" value={description} onChange={(e) => setDescription(e.target.value)} />
                <button type="submit" className="w-full p-2 bg-blue-500 text-white rounded">Create Task</button>
            </form>
        </div>
    );
}
