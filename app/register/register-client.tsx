"use client";
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { loginSuccess } from '../redux/authSlice';
import {POST} from "../utils/route";
import {useRouter} from "next/navigation";
import {AxiosError} from "axios";
import {User} from "@/app/types/user";

export default function RegisterClient() {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');
    const [error, setError] = useState<string | null>(null);

    const dispatch = useDispatch();
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (password !== passwordConfirm) {
            setError('Passwords do not match');
            return;
        }

        try {
            const res = await POST('/register', { name, email, password, password_confirmation: passwordConfirm });
            dispatch(loginSuccess(res.data as User));
            // await router.push('/tasks'); // Redirect to tasks page after registration
        } catch (error) {
            const axiosError = error as AxiosError<{message: string}>;
            setError(axiosError.response?.data?.message || 'Registration failed');
        }
    };

    return (
        <div>
            <h2>Register</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            <form onSubmit={handleRegister}>
                <input type="text" placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} required />
                <input type="email" placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                <input type="password" placeholder="Confirm Password" value={passwordConfirm} onChange={(e) => setPasswordConfirm(e.target.value)} required />
                <button type="submit">Register</button>
            </form>
        </div>
    );
}
