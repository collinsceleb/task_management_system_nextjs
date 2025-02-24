"use client";
import { useRouter, useParams } from "next/navigation";
import { deleteTask } from "@/app/utils/route";
import { useState } from "react";
import {AxiosError} from "axios";

export default function DeleteTaskClient() {
    const { taskId } = useParams();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleDelete = async () => {
        try {
            await deleteTask(parseInt(taskId as string));
            router.push("/tasks/list");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "Failed to delete task");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Are you sure?</h2>
            <p className="mb-4">This action cannot be undone.</p>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button onClick={handleDelete} className="px-4 py-2 bg-red-500 text-white rounded">Delete</button>
            <button onClick={() => router.push("/tasks/list")} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
        </div>
    );
}
