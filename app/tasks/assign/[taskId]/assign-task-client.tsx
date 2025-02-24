"use client";
import { useEffect, useState } from "react";
import { assignTask } from "@/app/utils/route";
import { useParams, useRouter } from "next/navigation";
import {AxiosError} from "axios";

export default function AssignTaskClient() {
    const { taskId } = useParams();
    const router = useRouter();
    const [users, setUsers] = useState<any[]>([]);
    const [selectedUser, setSelectedUser] = useState("");
    const [error, setError] = useState("");

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch("http://127.0.0.1:8000/api/users");
                const data = await response.json();
                setUsers(data);
            } catch (err) {
                const axiosError = err as AxiosError<{ message: string }>;
                setError(axiosError.response?.data?.message || "Failed to assign task")
            }
        };
        fetchUsers().catch(console.error);
    }, []);

    const handleAssign = async () => {
        try {
            await assignTask(parseInt(taskId as string), parseInt(selectedUser as string));
            router.push("/tasks/list");
        } catch (err) {
            const axiosError = err as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || "Failed to assign task");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6">
            <h2 className="text-2xl font-bold mb-4">Assign Task</h2>
            {error && <p className="text-red-500">{error}</p>}
            <select className="w-full p-2 border rounded" value={selectedUser} onChange={(e) => setSelectedUser(e.target.value)}>
                <option value="">Select a user</option>
                {users.map((user) => (
                    <option key={user.id} value={user.id}>{user.name}</option>
                ))}
            </select>
            <button onClick={handleAssign} className="w-full mt-4 p-2 bg-green-500 text-white rounded">Assign</button>
        </div>
    );
}
