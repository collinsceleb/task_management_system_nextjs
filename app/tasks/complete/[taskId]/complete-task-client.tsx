"use client";
import { useRouter, useParams } from "next/navigation";
import { completeTask } from "@/app/utils/route";
import { useState } from "react";
import {AxiosError} from "axios";

export default function CompleteTaskClient() {
    const { taskId } = useParams();
    const router = useRouter();
    const [error, setError] = useState("");

    const handleComplete = async () => {
        try {
            await completeTask(parseInt(taskId as string));
            router.push("/tasks/list");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "Failed to mark task as completed");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 text-center">
            <h2 className="text-2xl font-bold mb-4">Mark Task as Completed?</h2>
            {error && <p className="text-red-500 mb-4">{error}</p>}
            <button onClick={handleComplete} className="px-4 py-2 bg-green-500 text-white rounded">Mark as Completed</button>
            <button onClick={() => router.push("/tasks/list")} className="ml-4 px-4 py-2 bg-gray-500 text-white rounded">Cancel</button>
        </div>
    );
}
