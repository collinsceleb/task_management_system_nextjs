"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";

export default function Navbar() {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);

    return (
        <nav className="bg-gray-900 text-white p-4">
            <div className="container mx-auto flex justify-between">
                <h1 className="text-xl font-bold">Task Manager</h1>
                <div>
                    {isAuthenticated ? (
                        <>
                            <span className="mr-2">Welcome, {user?.name} ({user?.role})</span>
                            <Link className="mx-2" href="/tasks/list">Tasks</Link>
                            {user?.role === "admin" || user?.role === "manager" ? (
                                <Link className="mx-2" href="/tasks/create">Create Task</Link>
                            ) : null}
                            <Link className="mx-2" href="/logout">Logout</Link>
                        </>
                    ) : (
                        <>
                            <Link className="mx-2" href="/login">Login</Link>
                            <Link className="mx-2" href="/register">Register</Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
}
