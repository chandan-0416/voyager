"use client";

import Link from "next/link";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";


export default function SignupPage() {
    const router = useRouter();
    const [user, setUser] = React.useState({
        email: "",
        password: "",
        username: "",
    })

    const [buttonDisabled, setButtonDisabled] = React.
        useState(false);
    const [loading, setLoading] = React.useState(false);

    const onSignup = async () => {
        try {
            setLoading(true);
            const response = await axios.post("/api/users/signup", user)
            console.log("Signup Success", response.data);

            router.push("/login");
        } catch (error: any) {

            console.log("Signup failed", error.message);

            toast.error(error.message);
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        if (user.email.length > 0 &&
            user.password.length > 0 &&
            user.username.length > 0) {
            setButtonDisabled(false);

        } else {
            setButtonDisabled(true);
        }
    }, [user]);


    return (
        <div className="flex flex-col p-5 m-5 items-center justify-between ">

            <h1 className="text-black text-center font-bold shadow-2xl"
            >
            {loading ? "Processing" : "Signup"}</h1>

            <hr className="bg-gray-300 mt-5" />

            <label
                htmlFor="username"
                className="text-black font-semibold ml-20 text-center"
            > user name</label>
            <input
                className="border border-gray-300 mx-4 mt-5 "
                id="username"
                type="text"
                placeholder="username"
                value={user.username}
                onChange={(e) => setUser({ ...user, username: e.target.value })}
            />


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
                onClick={onSignup}
                className="bg-white shadow-2xl rounded-2xl p-2 m-2 border border-gray-300 cursor-pointer"
            >
                {buttonDisabled ? "No signup" : "Signup"}
            </button>

            <Link
                className="bg-amber-50 p-2 m-2 rounded-2xl "
                href="/login"
            > visit login page</Link>
        </div>
    )
}