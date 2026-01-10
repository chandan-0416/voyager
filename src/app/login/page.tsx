"use client";

import Link from "next/link";
import React from "react";
// import { useRouter } from "next/navigation";
// import { axois } from "axios";


export default function LoginPage() {
    const [user, setUser] = React.useState({
        email: "",
        password: "",
    })

    const onLogin = async () => {

    }

    return (
        <div className=" ">

            <h1 className="text-black text-center font-bold shadow-2xl"
            >
                Login</h1>
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