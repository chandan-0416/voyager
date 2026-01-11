/* eslint-disable @typescript-eslint/no-explicit-any */

"use client";
import axios from "axios";
import Link from "next/link";
import React, { useEffect } from "react";
import toast from "react-hot-toast";
import { useRouter } from "next/navigation";


export default function LoginPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })
    
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const [buttonDisabled, setButtonDisabled] = React.useState(false);
        
    
    const [loading, setLoading] = React.useState(false);

    useEffect(() => {
        if (user.email.length > 0 && user.password.length > 0) {
            setButtonDisabled(false);
        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    const onLogin = async () => {
        try {

            setLoading(true);
            const response = await axios.post("/api/users/login", user);

            console.log("Login Success", response.data);
            toast.success("Login success");
            router.push("/profile");

        } catch (error: any) {

            console.log("Login failed", error.message);
            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className=" ">

            <h1 className="text-black text-center font-bold shadow-2xl"
            >
                {loading ? "Processing": "Login"}</h1>
            <hr className="bg-gray-300 mt-5" />

            <label
                htmlFor="email"
                className="text-black font-semibold ml-20"
            > email</label>
            <input
                className="border border-gray-300 mx-4 mt-5 "
                id="email"
                type="text"
                placeholder="email"
                value={user.email}
                onChange={(e) => setUser({ ...user, email: e.target.value })}
            />

            <label
                htmlFor="password"
                className="text-black font-semibold ml-20"
            > password</label>
            <input
                className="border border-gray-300 mx-4 mt-5 "
                id="password"
                type="text"
                placeholder="password"
                value={user.password}
                onChange={(e) => setUser({ ...user, password: e.target.value })}
            />

            <button
                onClick={onLogin}
                className="bg-white shadow-2xl rounded-2xl p-2 m-2 border border-gray-300 cursor-pointer"
            >
                Login here
            </button>

            <Link
                className="bg-amber-50 p-2 m-2 rounded-2xl "
                href="/signup"
            > Visit Signup page</Link>
        </div>
    )
}