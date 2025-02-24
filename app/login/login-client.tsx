"use client"
import React, {useEffect, useState} from "react";
import {useDispatch} from "react-redux";
import {loginSuccess} from "../redux/authSlice";
import {loginUser, getCsrfToken, getUserProfile} from "../utils/route";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {User} from "@/app/types/user";


export default function LoginClient() {

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        getCsrfToken().catch(err => console.error("CSRF Token Error:", err));
    }, []);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            setLoading(true)
            await loginUser({email, password});
            const user: User = await getUserProfile();
            // dispatch(loginSuccess(res.data as User));
            if (user.role === 'admin' || user.role === 'manager') {
                router.push('/create-task');
            } else {
                router.push('/get-tasks');
            }
            router.push('/tasks');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Login failed');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className={"text-2xl font-bold mb-4 text-center text-black"}>Login</h2>
                {error && <p className={"text-red-500 mb-4"}>{error}</p>}
                <form onSubmit={handleLogin} className={"space-y-4"}>
                    <input className={"w-full p-2 mb-2 border rounded"} type="email" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)} required/>
                    <input className={"w-full p-2 mb-2 border rounded"} type="password" placeholder="Password"
                           value={password} onChange={(e) => setPassword(e.target.value)} required/>
                    <button
                        className={"w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"}
                        type="submit">
                        {loading ? 'Logging in...' : 'Login'}
                    </button>
                </form>
            </div>
        </div>
    );
}
