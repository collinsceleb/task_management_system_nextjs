"use client";
import React, {useState} from 'react';
import {useDispatch} from 'react-redux';
import {loginSuccess} from '../redux/authSlice';
import {registerUser} from "../utils/route";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {User} from "@/app/types/user";

export default function RegisterClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            setLoading(true)
            const res = await registerUser({name, email, password});
            dispatch(loginSuccess(res.data as User));
            router.push('/login');
        } catch (error) {
            const axiosError = error as AxiosError<{ message: string }>;
            setError(axiosError.response?.data?.message || 'Registration failed');
        } finally {
            setLoading(false)
        }
    };

    return (
        <div className="flex justify-center items-center h-screen bg-gray-100">
            <div className="bg-white p-8 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4 text-center text-black">Register</h2>
                {error && <p className="text-red-500 text-center mb-4">{error}</p>}
                <form onSubmit={handleRegister} className={"space-y-4"}>
                    <input className="w-full p-2 mb-4 border rounded" type="text" placeholder="Name" value={name}
                           onChange={(e) => setName(e.target.value)}
                           required/>
                    <input className="w-full p-2 mb-4 border rounded" type="email" placeholder="Email" value={email}
                           onChange={(e) => setEmail(e.target.value)}
                           required/>
                    <input className="w-full  p-2 mb-4 border rounded" type="password" placeholder="Password"
                           value={password}
                           onChange={(e) => setPassword(e.target.value)} required/>
                    <input className="w-full  p-2 mb-4 border rounded" type="password" placeholder="Confirm Password"
                           value={passwordConfirm}
                           onChange={(e) => setPasswordConfirm(e.target.value)} required/>
                    <button
                        className={"w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700, disabled:bg-gray-400"}
                        type="submit" disabled={loading}>{loading ? 'Registering...' : 'Register'}
                    </button>
                </form>
                <p className="text-center mt-4">
                    Already have an account? <a href="/login" className="text-blue-600 hover:underline">Login</a>
                </p>
            </div>
        </div>
    );
}
