"use client";

import { useSelector } from "react-redux";
import { RootState } from "@/app/redux/store";
import Link from "next/link";
import {useEffect, useState} from "react";
import {useRouter} from "next/navigation";
import {logoutUser} from "@/app/utils/route";

export default function Navbar() {
    const user = useSelector((state: RootState) => state.auth.user);
    const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
    const [, setIsAuthenticated] = useState(false);
    const router = useRouter();

    useEffect(() => {
        const token = localStorage.getItem("auth_token");
        setIsAuthenticated(!!token);
    }, []);

    const handleLogout = async () => {
        try {
            await logoutUser();
            localStorage.removeItem("auth_token");
            setIsAuthenticated(false);
            router.push("/login");
        } catch (error) {
            console.error("Logout failed", error);
        }
    };

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
