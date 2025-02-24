import Image from "next/image";
import Link from "next/link";
import Register from "@/app/register/page";
import Login from "@/app/login/page";

export default function Home() {
    return (
        <div>
            <h1>Task Management System</h1>
            <Register/>
            <Login/>
        </div>
    );
}
